var express = require('express');
var app = express();
var fortunes = [1,2,3,4,5,6,7];

// 设置handlebars模板引擎
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

// 设置静态文件
app.use(express.static(__dirname + '/public')); 

app.set('port',process.env.PORT || 3000);

app.get('/',function (req,res){
    res.render('home');
});

app.get('/about', function (req,res){
    var number = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune: number});
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