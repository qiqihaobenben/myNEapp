var mongoose = require('mongoose');
var User = require('./model/user_model.js');
var express = require('express');
var app = express();
var fortunes = [1,2,3,4,5,6,7];

mongoose.connect('mongodb://localhost/demo')

// 设置handlebars模板引擎
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

// 设置静态文件
app.use(express.static(__dirname + '/public'));

app.set('port',process.env.PORT || 3000);

app.get('/',function (req,res){
    User.fetch(function (err,data){
        console.log(data)
        res.render('home',{list:data});
    })
});

app.get('/about', function (req,res){
    var number = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune: number});
})

app.get('/info/:id', function (req,res) {
    res.render('info',{title: '详情页面',mid: req.params.id})
})

app.get('/admin', function (req, res) {
    //res.render('admin', { title: '录入页面' })
    var _user = new User({
        name: 'cfangxu',
        age: 27
    })
    _user.save(function (err,user){
        res.redirect('/');
    })
})

app.get('/list', function (req, res) {
    res.render('list', { title: '录入列表页' })
})

// 定制404页面
app.use(function (req,res){
    res.status(404);
    res.render('404');
});

// 定制500页面
app.use(function (err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function (){
    console.log('Express started on http://localhost'+app.get('port') + ';');
});

console.log('服务启动……');

