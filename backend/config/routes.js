const permission = require('./permissions')

module.exports = app => {
    //-------------//
    //Account Tools//
    //-------------//
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateAccount', app.api.auth.validateAccount)
    app.post('/validateToken', app.api.auth.validateToken)

    //-----------//
    //GET JSONS //
    //----------//
    app.get('/getCountries', app.api.country.getCountries)

    //--------------------------//
    //Configuration Pack Website//
    //--------------------------//
    app.route('/admin')
    .all(app.config.passport.authenticate())
    .get(permission(app.api.admin.get))
    .post(permission(app.api.admin.deleteRestore))

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/userprofile')
        .all(app.config.passport.authenticate())
        .get(app.api.user.profile)
}