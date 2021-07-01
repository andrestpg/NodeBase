const Kec = require('../models/Kecamatan');
const Kel = require('../models/Kelurahan');

module.exports.index = ( async (req, res) => {
    res.render('admin/index', {
        title: "Data Kecamatan",
        validation: "kecValidation.js",
        script: "kecamatan.js",
        path: "kecamatan"
    });
});

module.exports.get = ( async (req, res) => {
    const kec = await Kec.findAll({
        attributes: [
            'id',
            'nama',
            'nickname',
            'kodePos'
        ],
    });
    res.json(kec);
});

module.exports.detail = ( async (req, res ) => {
    let id = req.params.id;
    Kec.hasMany(Kel, {
        foreignKey: "kecamatanId"
    });
    Kel.belongsTo(Kec);
    let data = await Kec.findOne({
        attributes: [
            'id',
            'nama',
            'nickname',
            'kodePos'
        ],
        where: {
            id: id
        },
        include: Kel
    });
    data ? res.json(data) : res.send("data tidak ditemukan!");
});

module.exports.add = ( async (req, res) => {
    const {name, nickname, kodePos} = req.body;

    try{
        let data = await Kec.create({
            nama: name,
            nickname: nickname,
            kodePos: kodePos
        });
        res.json({
            status: 1,
            resId: data.id
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            msg: err['errors'][0]['message'],
        });
    }
});

module.exports.edit = ( async (req, res) => {
    const {name, nickname, kodePos} = req.body;
    const id = req.params.id;
    try{
        let data = await Kec.update({
            nama: name,
            nickname: nickname,
            kodePos: kodePos,
        },{
            where: {
                id: id
            }
        });
        res.json({
            status: 1,
            resId: data.id
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            msg: err['errors'][0]['message'],
        });
    }
});

module.exports.delete = ( async (req, res) => {
    const id = req.params.id;
    try{
        await Kec.destroy({
            where: {
                id: id
            }
        });
        res.json({
            status: 1,
            msg: "Data telah dihapus!"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            msg: err['errors'][0]['message'],
        });
    }
});