const User = require('../models/User');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');

module.exports.get_all = async (req, res) => {
    try{
        let userdata = await User.findAll({
            attributes: [
                'id',
                'name',
                'username',
                'role',
            ],
            where: {
                id: {
                    [Op.not]: res.locals.userLogin.id
                },
                role: {
                    [Op.not]: 2
                }
            },
            order: [
                ['name', 'ASC']
            ]
        });
        res.json(userdata);
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            message: "gagal memuat data"
        });
    }
}

module.exports.get_one = async (req, res) => {
    const id = req.params.id;

    try{
        let user = await User.findOne({
            attributes: [
                'id',
                'name',
                'username',
                'createdAt',
                'updatedAt'
            ],
            where: {
                id: id,
                [Op.not]:{role: 2}
            }
        })
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            message: "User tidak ditemukan!"
        });
    }
}

module.exports.user_get = (req, res) => {
    res.render('admin/index', {
        title: "Data User",
        validation: "userValidation.js",
        script: "user.js",
        path: "user"
    });
}
 
module.exports.user_add = async (req, res) => {
    const {name, username, password, role} = req.body;
    const hashPass = await hashPassword(password);

    if(res.locals.userLogin.role !== 0){
        try{
            let user = await User.create({
                name: name,
                username: username,
                role: role,
                password: hashPass,
            });
            res.json({
                status:1,
                resId: user.id
            });
        }catch(err){
            res.status(500).json({
                status: 0,
                msg: err['errors'][0]['message'],
            });
        }
    }
}
 
module.exports.user_edit = async (req, res) => {
    const id = req.params.id;
    const {name, username, password, role} = req.body;
    let hashPass = "";

    let postData = {
        name: name,
        username: username,
        role: role,
    };
    
    if(password != "" ){
        hashPass = await hashPassword(password);
        let postData = {
            name: name,
            username: username,
            role: role,
            password: hashPass
        };
    }

    if(res.locals.userLogin.role !== 0){
        try{
            await User.update( postData, {
                where: {
                    id: id
                }
            });
            res.json({status:1});
        }catch(err){
            console.log(err);
            res.status(500).json({
                status: 0,
                message: "gagal mengubah data",
                desc: err['errors'][0]['message'],
            });
        }
    }else{
        res.status(500).send("Anda tidak memiliki akses!");
    }

}

module.exports.user_delete = async (req, res) => {
    const id = req.params.id;
    
    if(res.locals.userLogin.role !== 0){
        try{
            await User.destroy({
                where: {
                    id: id
                }
            });
            res.json({status:1});
        }catch(err){
            res.status(500).json({
                status: 0,
                message: "gagal menghapus data"
            });
        }
    }else{
        res.status(500).send("Anda tidak memiliki akses!");
    }
}

module.exports.edit_profil_page = (req, res) => {
    res.render('admin/user/edit_profil', {
        title: "Edit Profil",
        validation: "editProfilValidation.js",
        script: "editProfil.js"
    });
}

module.exports.edit_profil_post = async (req, res) => {
    const id = req.params.id;
    const {name, username, password} = req.body;
    let hashPass = "";

    let postData = {
        name: name,
        username: username,
    };
    
    if(password != "" ){
        try{
            hashPass = await hashPassword(password);
            postData = {
                name: name,
                username: username,
                password: hashPass
            };
        }catch(err){
            console.log(err);
        }
    }

    if(res.locals.userLogin.id == id){
        try{
            await User.update( postData, {
                where: {
                    id: id
                }
            });
            res.json({status:1});
        }catch(err){
            console.log(err);
            res.status(500).json({
                status: 0,
                message: "gagal mengubah data",
                desc: err['errors'][0]['message'],
            });
        }
    }else{
        res.status(500).send("Anda tidak memiliki akses!");
    }
}

const hashPassword = async (string) => {
    const salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(string, salt);
    return passwordHash;
}