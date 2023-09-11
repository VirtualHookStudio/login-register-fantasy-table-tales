const configEmail = require('../config/configEmail')

module.exports = app => {
    const {existsOrError, notEqualsOrError ,equalsOrError, constructionTimer, encryptPass, stringGenerator, returnJsonCountry, saveImgBase64, convertImgBase64} = app.api.tool

    const save = async (req, res) => {
        const user = {...req.body}
        
        try{
            //START VALIDATION PARAMETERS
            existsOrError(user.name, 'Username required!')
            existsOrError(user.email, 'Email required!')
            existsOrError(user.phone, 'Phone required!')
            notEqualsOrError(user.country_id, 'Country', 'Country required!')

            //VALIDATE EDIT
            if(user.id){
                if(user.password || user.confirmPassword){
                    PasswordValidate(user.password, user.confirmPassword)
                }
            }else{
                PasswordValidate(user.password, user.confirmPassword)
            }

            
            if(!user.email.includes('@')) throw 'Email invalid!'
            if(user.name.length < 4) throw 'Username must contain at leats 4 digits!'
            if(user.phone.length < 15 || user.phone.length > 17) throw "Phone invalid!"

            const jsonData = await returnJsonCountry()
            if(!jsonData.countries.find(country => country.id == user.country_id)) throw 'Country required!'

            if(!/^\(\d{2}\) \d{5}-\d{4,6}$/.test(user.phone) ||
               user.name.length > 30 ||
               user.email.length > 40) throw 'Error regex!'
            
            var userFromDB = await app.db('users').where({email: user.email}).orWhere({phone: user.phone}).orWhere({name: user.name}).first()
            //VALIDATE EDIT
            if(user.id){
                if(userFromDB.id === user.id) {
                    userFromDB = null
                }
            }
            
            if(userFromDB){
                if(userFromDB.name === user.name) throw 'Username already exist!'
                if(userFromDB.email === user.email) throw 'Email already registered!'
                if(userFromDB.phone === user.phone) throw 'Phone already registered!'
            }
            if(!user.checkbox && !user.id) throw 'Terms and Conditions required!'
            //END VALIDATION PARAMETERS

            //START CREATE PARAMETERS
            //VALIDATE EDIT
            if(user.id){
                if(user.password || user.confirmPassword){
                    user.password = encryptPass(user.password)
                }
                const emailTest = await app.db('users as u').select('u.email', 'u.user_icon').where({id: user.id}).first()
                if(emailTest.email !== user.email){
                    user.validate = stringGenerator()
                    //SEND EMAIL EDIT ACCOUNT
                    sendEmail(user.email, user.validate, user.name, true)
                }
                console.log(user.img_verify)
                //SAVING USER ICON
                if(user.img_verify){
                    if(emailTest.user_icon){
                        user.user_icon = await saveImgBase64(user.user_icon, user.id, './assets/images/user_icons/', emailTest.user_icon)
                    }
                    else{
                        user.user_icon = await saveImgBase64(user.user_icon, user.id, './assets/images/user_icons/')
                    }
                }else{
                    delete user.user_icon
                }
                
                delete user.img_verify
                delete user.created_at
                delete user.description
            }
            else{
                delete user.checkbox
                user.password = encryptPass(user.password)
                user.validate = stringGenerator()
                user.permission = false
                user.created_at = new Date()

                //SEND EMAIL TO VALIDATE ACCOUNT
                sendEmail(user.email, user.validate, user.name)
            }
            delete user.confirmPassword
            //END CREATE PARAMETERS

            //START UPDATE INSERT
            //VALIDATE EDIT
            if(user.id){
                return app.db('users').update(user).where({id: user.id}).then(_ => {
                    if(user.validate){
                        res.status(205).send()
                    }else{
                        res.status(204).send()
                    }
                }).catch(err => res.status(500).send(err))
            }
            else{
                return app.db('users').insert(user).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
            }
        }catch(msg){
            return res.status(400).send(msg)
        }
    }

    const get = async (req, res) => {
        try{
            const users = await app.db('users').where({deleted_at: null}).andWhere({validate: null}).orderBy('id')

            for (let user of users) {
                if(user.user_icon){
                    user.user_icon = await convertImgBase64('./assets/images/user_icons/', user.user_icon)
                }
                user = constructionTimer(user)
            }
            return res.json(users)
        }catch(err){

            return res.status(500).send(err)
        }
    }

    const profile = async (req, res) => {
        try{
            user = await app.db('users as u')
                .select('u.id', 'u.name', 'u.email', 'u.phone', 'u.user_icon', 'u.description', 'country_id', 'u.created_at', 'u.deleted_at')
                .where({id: req.user.id})
                .first()

            if(user.user_icon){
               user.user_icon = await convertImgBase64('./assets/images/user_icons/', user.user_icon)
            }
            
            return res.json(constructionTimer(user))
        }catch(msg){
            return res.status(500).send(msg)
        }
    }

    const deleteRestore = (req, res) => {
        
    }

    const sendFriendship = (req, res) => {
        res.send('send friendship')
    }

    const acceptFriendship = (req, res) => {
        res.send('aceept friendship')
    }

    const removeFriendship = (req, res) => {
        res.send('delete friendship')
    }

    const PasswordValidate = (password, confirmPassword)=> {
        try{
            existsOrError(password, 'Password required!')
            existsOrError(confirmPassword, 'Confirm Password required!')
            equalsOrError(password, confirmPassword, 'Passwords not the same!')
            if(password.length < 8) throw 'Password must have 8 digits!'
            if(!/\d/.test(password) || !/[a-zA-Z]/.test(password)) throw 'Password must contain at least one number and one letter!';
            if(password.length > 40) throw 'Error regex!'
            if(confirmPassword.length > 40) throw 'Error regex!'
        }catch(msg){
            throw msg
        }
    }

    const sendEmail = (email, validate = null, name = null, edit = false) => {
        try{
            if(edit){
                configEmail.transporter.sendMail({
                    from: "VirtualHookStudio <virtualhookstudio@gmail.com>",
                    to: email,
                    subject: 'Account confirmation: Code',
                    html: configEmail.template({ key: validate, nameUser: name})
                })
            }else{
                configEmail.transporter.sendMail({
                    from: "VirtualHookStudio <virtualhookstudio@gmail.com>",
                    to: email,
                    subject: 'Alteration email account confirmation: Code',
                    html: configEmail.template({ key: validate, nameUser: name})
                })
            }
        }catch(msg){
            throw msg
        }
    }

    return {save, get, profile, deleteRestore, sendFriendship, acceptFriendship, removeFriendship}
}