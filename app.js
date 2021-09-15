require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');

const app = express();
app.listen(process.env.PORT);

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
// 404------------------
app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
});