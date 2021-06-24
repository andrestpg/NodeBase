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
            ],
            where: {
                [Op.not]:{id: res.locals.userLogin.id}
            },
            order: [
                ['name', 'ASC']
            ]
        });
        res.json(userdata);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "gagal memuat data"});
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
                id: id
            }
        })
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "User tidak ditemukan!"});
    }
}

module.exports.user_get = (req, res) => {
    res.render('admin/index', {
        title: "Data User",
        validation: "userValidation.js",
        script: "user.js"
    });
}
 
module.exports.user_add = async (req, res) => {
    const {name, username, password} = req.body;
    const hashPass = await hashPassword(password);
    try{
        let user = await User.create({
            name: name,
            username: username,
            password: hashPass
        });
        res.json({
            status:1,
            resId: user.id
        });
    }catch(err){
        res.status(500).json({
            status: 0,
            message: "gagal menyimpan data",
            desc: err['errors'][0]['message'],
        });
    }
}
 
module.exports.user_edit = async (req, res) => {
    const id = req.params.id;
    const {name, username, password} = req.body;
    let hashPass = "";

    let postData = {
        name: name,
        username: username,
    };
    
    if(password != "" ){
        hashPass = await hashPassword(password);
        let postData = {
            name: name,
            username: username,
            password: hashPass
        };
    }

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
}

module.exports.user_delete = async (req, res) => {
    const id = req.params.id;
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
}

const hashPassword = async (string) => {
    const salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(string, salt);
    return passwordHash;
}