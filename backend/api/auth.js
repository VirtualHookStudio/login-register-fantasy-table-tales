const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

module.exports = app => {
    const {existsOrError, encryptPass} = app.api.tool

    const signin = async (req, res) => {
        const user = await app.db('users').where({email: req.body.email}).where({validate: ''}).where({deleted_at: null}).first()
        
        try{
            existsOrError(req.body.email, 'Email required!')
            existsOrError(req.body.password, 'Password required!')

            if(!user) throw 'Invalid Email or Password!'
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if(!isMatch) throw 'Invalid Email or Password!'
        }catch(msg){
            return res.status(400).send(msg)
        }

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            user_icon: user.user_icon,
            name: user.name,
            email: user.email,
            permission: user.permission,
            iat: now,
            exp: now + (60 * 60 * 24 * 10)
        }

        res.json({
            ...payload, token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if( new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {

        }

        res.send(false)
    }

    const validateAccount = async (req, res) => {
        const key = req.body.keyValidate
        
        try{
            const user = await app.db('users').where({validate: key}).first()
            if(!user) throw 'User not found!'
            if(user){
                const validate = ''
                app.db('users')
                    .update({validate})
                    .where({id: user.id})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        }catch(msg){
            return res.status(400)
        }
    }

    return {signin, validateToken, validateAccount}
}
