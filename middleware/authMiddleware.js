const jwt = require('jsonwebtoken');
const myToken = require('../config/token');
const User = require('../models/User');
const sequelize = require('../config/database');

const requireAuth = (req, res, next) => {
    const token = req.cookies.authToken;

    if(token){
        jwt.verify(token, myToken.secretKey, (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/auth');
            }else{
                console.log(decodedToken);
                res.locals.baseUrl = "http://localhost:8888/"
                next();
            }
        });

    }else{
        res.redirect('/auth');
    }
}

const checkUser = async (req, res, next) => {
    let conn = await checkDbConn();
    if(conn){
        const token = req.cookies.authToken;
        res.locals.userRole = "Admin";
    
        if(token){
            jwt.verify(token, myToken.secretKey, async (err, decodedToken) => {
                if(err){
                    res.locals.userLogin = null;
                    next();
                }else{
                    let user = await User.findOne({
                        where: {
                            id: decodedToken.id
                        }
                    });

                    res.locals.userLogin = user;
                    user.role == 1 && (res.locals.userRole = "Superadmin");
                    next();
                }
            });
        }else{
            res.locals.userLogin = null;
            next();
        }
    }else{
        res.status(500).render('500', {title: "500"});
    }
}

const checkDbConn = async () => {
    try{
        await sequelize.authenticate();
        return 1;
    }catch(err){
        console.log(err);
        return 0;
    }
}

module.exports = {requireAuth, checkUser};