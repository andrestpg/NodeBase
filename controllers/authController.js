const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myToken = require('../config/token');

module.exports.login_get = (req, res) => {
    res.render('admin/auth/login', {
        title: "login",
        validation : "authValidation.js", 
        script : "auth.js" 
    });
}
 
module.exports.login_post = async (req, res) => {

    const {username, password, saveDevice} = req.body;
    try{
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if(user){
            const auth = await bcrypt.compare(password,user.password);
            if(auth){
                const token = await createToken(user.id);

                let cookieConfig = { httpOnly:true };
                saveDevice == 1 && (cookieConfig = {httpOnly: true, maxAge: myToken.expire * 1000 });
                
                res.cookie("authToken", token, cookieConfig );
                res.json({
                    status: 1,
                    msg: "Autentikasi berhasil!"
                });
            }else{
                res.json({
                    status: 0,
                    msg: "Password tidak benar!"
                });
            }
        }else{
            res.json({
                status: 0,
                msg: "Username tidak terdaftar!"
            });
        }
    }catch(err){
        console.log(err);
    }
}

module.exports.logout = (req, res) => {
    res.cookie('authToken','',{maxAge: 1});
    res.redirect('/');
}

const createToken = (id) => {
    return jwt.sign({id}, myToken.secretKey, {
        expiresIn: myToken.expire
    });
}
 