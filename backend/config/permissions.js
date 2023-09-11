module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.permission) {
            middleware(req, res, next)
        }else{
            res.status(402).send('User not Admin!')
        }
    }
}