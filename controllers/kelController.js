const Kel = require('../models/Kelurahan');
const Kec = require('../models/Kecamatan');

module.exports._get = ( async (req, res) => {
    let kecId = req.params.kecId;

    const kel = await Kel.findAll(
        {
            attributes: [
                'id',
                'nama',
                'nickname',
                'kodePos',
            ],
            where: {
                kecamatanId: kecId
            }
        }
    );
    res.json(kel);
});


module.exports.index = ( async (req, res) => {
    let kec = await Kec.findAll({
        attributes: [
            'id',
            'nama'
        ]
    });
    res.render('admin/index', {
        title: "Data Kelurahan",
        validation: "kelValidation.js",
        script: "kelurahan.js",
        path: "kelurahan",
        kecamatan: kec
    });
});

module.exports.get = ( async (req, res) => {
    const kel = await Kel.findAll({
        attributes: [
            'id',
            'nama',
            'nickname',
            'kodePos',
            'kecamatanId'
        ],
    });
    res.json(kel);
});

module.exports.add = ( async (req, res) => {
    const {name, nickname, kodePos, kecamatanId} = req.body;

    try{
        let kelurahan = await Kel.create({
            nama: name,
            nickname: nickname,
            kodePos: kodePos,
            kecamatanId: kecamatanId
        });
        res.json({
            status: 1,
            resId: kelurahan.id
        });
        console.log("INSERT ID: "+kelurahan.id)
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 0,
            msg: err['errors'][0]['message'],
        });
    }
});

module.exports.edit = ( async (req, res) => {
    const {name, nickname, kodePos, kecamatanId} = req.body;
    const id = req.params.id;
    try{
        let data = await Kel.update({
            nama: name,
            nickname: nickname,
            kodePos: kodePos,
            kecamatanId: kecamatanId
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
        await Kel.destroy({
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