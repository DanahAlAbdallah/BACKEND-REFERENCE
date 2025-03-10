module.exports = app => {
    const Routes = require('./routeConstants')
    const adminRouter = require("../routes/admin.routes");


    app.use(Routes.BASE, adminRouter)}