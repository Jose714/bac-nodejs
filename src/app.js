//Requires
require('./config/config');
const express = require('express')
const app = express ()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
//### Para usar las variables de sesión
const session = require('express-session')
var MemoryStore = require('memorystore')(session)
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname , '../node_modules')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


//Static
app.use(express.static(dirPublic))
// app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
// app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

const { Usuarios } = require('./usuarios');
const usuarios = new Usuarios();

io.on('connection', client => {

	console.log("un usuario se ha conectado")

	// client.emit("mensaje", "Bienvenido a mi página")

	// client.on("mensaje", (informacion) =>{
	// console.log(informacion)
	// })

	// client.on("contador", () =>{
	// 	contador ++
	// 	console.log(contador)
	// 	io.emit("contador", contador )
	// })

	client.on('usuarioNuevo', (usuario) =>{
		let listado = usuarios.agregarUsuario(client.id, usuario)
		console.log(listado)
		let texto = `Se ha conectado ${usuario}`
		io.emit('nuevoUsuario', texto )
	})

	client.on('disconnect',()=>{
		let usuarioBorrado = usuarios.borrarUsuario(client.id)
		let texto = `Se ha desconectado ${usuarioBorrado.nombre}`
		io.emit('usuarioDesconectado', texto)
			})

	client.on("texto", (text, callback) =>{
		let usuario = usuarios.getUsuario(client.id)
		let texto = `${usuario.nombre} : ${text}`
		
		io.emit("texto", (texto))
		callback()
	})

	
});

//### Para usar las variables de sesión
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000 // prune expired entries every 24h
    	}),
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true
}))


app.use((req, res, next) =>{
	// let token = localStorage.getItem('token')
	
	//  jwt.verify(token, 'virtual-tdea', (err, decoded) => {

 //        if (err) {
 //            return next();
 //        }

 //        req.usuario = decoded.usuario;
 //        console.log(req.usuario)
 //        res.locals.sesion = true
 //        res.locals.nombre = req.usuario.nombre
 //        next();

 //    });
 
	//En caso de usar variables de sesión
	if(req.session.usuario){		
		res.locals.sesion = true
		res.locals.nombre = req.session.nombre
		res.locals.rol=req.session.rol
	}	
	next()
})


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(error)
	}
	console.log("conectado")
});


//....................

app.listen(port, () => {
	console.log ('servidor en el puerto ' + port)
});


