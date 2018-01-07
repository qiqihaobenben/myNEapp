var http = require('http');
var fs = require('fs');
var EventEmitter = require('events');
var myEmitter = new EventEmitter();

http.createServer(function (req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js</h1>');
	res.end('<p>Hello World!</p>');
}).listen(3005);
console.log('HTTP server is listening at port 3005');
console.log(__dirname);
console.log(__filename);


// fs.createReadStream('neapp.js').pipe(process.stdout)
myEmitter.once('newListener', function (event, listener){
	if(event === 'event') {
		myEmitter.on('event', () => {
			console.log('b');
		})
	}
})
myEmitter.on('event', () => {
	console.log('a');
})
myEmitter.emit('event');

process.on('SIGINT', () => {
	console.log('SIGINT');
	process.exit(0);
})
process.on('exit', () => {
	console.log('goodbye')
})
Class Dog{
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
}
console.log(typeof Dog);
console.log(Dog === Dog.prototype.constructor);
