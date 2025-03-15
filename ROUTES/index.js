module.exports = app => {
    const Routes = require('./routeConstants')
    const userRouter = require("../ROUTES/user.routes");


    app.use(Routes.BASE, userRouter)}