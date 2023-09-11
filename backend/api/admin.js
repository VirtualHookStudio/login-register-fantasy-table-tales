module.exports = app => {
    const { constructionTimer, convertImgBase64} = app.api.tool

    const save = (req, res) => {
        res.send('admin save')
    }

    const get = async (req, res) => {
        try{
            const users = await app.db('users').orderBy('id')

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

    const deleteRestore = async (req, res) => {
        const user = await app.db('users').where({id: req.body.id}).first()
        if(user){
            user.deleted_at ? user.deleted_at = null : user.deleted_at = new Date()
            app.db('users').update(user).where({id: user.id}).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    return {save, get, deleteRestore}
}