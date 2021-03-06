const jwt = require('jsonwebtoken');
const myToken = require('../config/token');
const User = require('../models/User');
const sequelize = require('../config/database');

const requireAuth = (req, res, next) => {
    const token = req.cookies.authToken;

    if(token){
        try{
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
        }catch(err){
            console.log(err);
            res.json({
                msg: "Terjadi kesalahan di server!"
            })
        }

    }else{
        res.redirect('/auth');
    }
}

const checkUser = async (req, res, next) => {
    const conn = await checkDbConn();
    
    if(conn){
        const token = req.cookies.authToken;
        res.locals.userRole = "Admin";
    
        if(token){
            try{
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
            }catch(err){
                console.log(err);
            }
        }else{
            res.locals.userLogin = null;
            next();
        }
    }else{
        res.status(500).render('500');
    }
}

const checkUserLogin = async (req, res, next) => {
    const conn = await checkDbConn();

    if(conn){
        const token = req.cookies.authToken;
        if(token){
            jwt.verify(token, myToken.secretKey, (err, decodedToken) => {
                if(err){
                    console.log(err);
                    next();
                }else{
                    console.log(decodedToken);
                    res.locals.baseUrl = "http://localhost:8888/"
                    res.redirect('/users');
                }
            });
    
        }else{
            next()
        }
    }else{
        res.status(500).render('500');
    }
}

const superAdminOnly = async (req, res, next) => {
    const conn = checkDbConn();
    res.locals.userRole = "Admin";

    if(conn){
        const token = req.cookies.authToken;
        if(token){
            jwt.verify(token, myToken.secretKey, async (err, decodedToken) => {
                if(err){
                    console.log(err);
                    res.status(404).render('404');
                }else{
                    let user = await User.findOne({
                        where: {
                            id: decodedToken.id
                        }
                    });
                    res.locals.userLogin = user;
                    if(user.role == 2){
                        res.locals.userRole = "Superadmin"
                        next();
                    }else{
                        res.status(404).render('404');
                    }
                }
            })
        }else{
            res.status(404).render('404')
        }
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

module.exports = {requireAuth, checkUser, checkUserLogin, superAdminOnly};