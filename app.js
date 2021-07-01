const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');

const app = express();
app.listen(8888);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    limit: "10mb",
}));
app.use(cookieParser());
//Public Dir
app.use(express.static('assets'));

//View Engine
app.set('view engine', 'ejs');

// Home-----------------
app.get('/',async (req, res) => {
    res.render('public/index');
});
// Auth-----------------
app.use('/auth', require("./routes/authRoute"));
// Users-----------------
app.use('/users', requireAuth, require("./routes/userRoute"));
// Kecamatan-----------------
app.use('/kecamatan', requireAuth, require("./routes/kecRoute"));
// Kecamatan-----------------
app.use('/kelurahan', requireAuth, require("./routes/kelRoute"));

// 404------------------
app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
});