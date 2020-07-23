const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs');

let app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('port', process.env.PORT || 8080);

//Session
app.set('trust proxy', 1);
app.use(require('express-session')({
    secret: 'LDFL09PO09X034',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

//View Engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static(__dirname + '/static'));

//Body parser router
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Allow CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Allow-Methods', '*');    
    res.setHeader('Access-Control-Max-Age', '1000');

    next();
});

app.post('/', function (req, res, next) {    
    res.render('desktop',{
        timelineInstanceUrl: process.env.TIMELINE_INSTANCE_URL,
        agentInstanceUrl: process.env.AGENT_INSTANCE_URL,
        persons: req.body.persons,
        site: req.body.site,
        role: req.body.role,
        chart: req.body.chart,
        frameh: req.body.frameh,
        combo: req.body.combo
    });
});

app.get('/redirect', function (req, res, next) {
    res.render('redirect',{
        timelineInstanceUrl: process.env.TIMELINE_INSTANCE_URL,
        agentInstanceUrl: process.env.AGENT_INSTANCE_URL
    });
});

app.get('/post', function (req, res, next) {
    res.render('post');
});

app.listen(app.get('port'), function () {
    console.log('Server listening for HTTP on ' + app.get('port'));
});
