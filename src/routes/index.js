const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const Estudiante = require('./../models/estudiante')
const Director = require('./../models/director')
const Docente = require('./../models/docente')
const Aspirante = require('./../models/aspirante')
const Calificacion = require('./../models/calificacion')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('./../usuarios');
const multer  = require('multer')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)
app.get('/regisEstudiante', (req, res ) => {
	res.render('index', {
		tituloPagina:'Pagina de inicio',
		titulo: 'Inicio',
	})	
});

//registrar estudiante
app.get('/', (req, res ) => {
	res.render('index', {
		tituloPagina:'Registro',
		titulo: 'Registro de estudiante',
	})	
});
var upload = multer({ dest: 'uploads/' })

app.post('/',upload.single('archivo'), (req, res ) => {

	let estudiante = new Estudiante ({
		nombre : req.body.nombre,
		password : bcrypt.hashSync(req.body.password, 10),
		email: req.body.email,
		cedula:req.body.cedula,
		telefono:req.body.telefono,
	
	
		
	})
	const msg = {
		to: req.body.email,
		from: 'jomicasierra@unac.edu.co',
		subject: 'Bienvenido',
		text: 'Bienvenido a la página de Node.JS'
		};
		sgMail.send(msg);		
	
	estudiante.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {	
			tituloPagina:'Bienvenido',		
				mostrar : resultado.nombre
			})		
	})			
});
//fin registrar estudiante

//SEN GRID





//inicio registrar docente
app.get('/regisDocente', (req, res ) => {
	Director.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		else
		res.render ('regisDocente',{
			tituloPagina:'pagina de registro',
			titulo:'Registro de docente',
			listado : respuesta
		})
	})
});//para obtener el listado de cursos en el menu desplegable
	
var upload = multer({ dest: 'uploads/' })

app.post('/regisDocente',upload.single('archivo'), (req, res ) => {

	let docente = new Docente ({
		nombre : req.body.nombre,
		password : bcrypt.hashSync(req.body.password, 10),
		email: req.body.email,
		cedula:req.body.cedula,
		telefono:req.body.telefono,
		curso:req.body.curso,
	
		
		
	})	
	const msg = {
		to: req.body.email,
		from: 'jomicasierra@unac.edu.co',
		subject: 'Bienvenido',
		text: 'Bienvenido a la página de Node.JS'
		};
		sgMail.send(msg);	
	
	docente.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {	
			tituloPagina:'Bienvenido',		
				mostrar : resultado.nombre
			})		
	})			
});
//fin registrar docente



app.get('/registrarCurso', (req, res ) => {
	Docente.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		else
	res.render('registrarCurso', {
		tituloPagina:'Registrar curso',
		titulo: 'Registro de Curso',
		listado : respuesta
		})
	})
		
});
//inicio registrar curso
app.post('/registrarCurso', (req, res ) => {

	let director = new Director ({
		
		curso : req.body.curso,
		id: req.body.id,
		duracion : 	req.body.duracion,
		valor: req.body.valor,
		nombre:	req.body.nombre
	})

	director.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : resultado.curso
			})		
	})			
});
//fin registrar curso



app.get('/verCurso', (req,res) => {

	Aspirante.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('verCurso',{
			tituloPagina:'Ver curso',
			listado : respuesta
		})
	})
})

//inicio registrar Aspirante

app.get('/regisAspirante', (req,res) => {
	
	Director.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		else
		res.render ('regisAspirante',{
			tituloPagina:'Matriculas',
			titulo:'Registro de aspirante',
			listado : respuesta
		})
	})
});//para obtener el listado de cursos en el menu desplegable



app.post('/regisAspirante', (req, res ) => {

	let aspirante = new Aspirante({
		nombre : req.body.nombre,
		telefono:req.body.telefono,
		cedula:req.body.cedula,
		curso:req.body.curso
		
	})

	aspirante.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				tituloPagina:'Error',
				mostrar : err
			})	
		}else
		res.render ('indexpost', {	
			tituloPagina:'Bienvenidos',		
			mostrar : resultado
		})	

	})	
});


app.get('/notas', (req, res ) => {
	Aspirante.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		else
		res.render ('notas',{
			tituloPagina:'Modulo de calificaciones',
			titulo:'Modulo de calificaciones',
			listado : respuesta
		})
	})
});
//inicio registrar notas
app.post('/notas', (req, res ) => {

	let calificacion = new Calificacion ({
		nombre:req.body.nombre,
		curso:req.body.curso,
		nota:parseInt( req.body.nota),
		date:req.body.date
	})

	calificacion.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : resultado
			})		
	})			
});
//fin de modulo de notas



app.get('/registro', (req,res) => {

	Estudiante.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('registro',{
			tituloPagina:'Listado',
			listado : respuesta
		})
	})
})

app.get('/verCursos', (req,res) => {

	Director.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('verCursos',{
			tituloPagina:'Ver cursos',
			listado : respuesta,
			mostrar:respuesta.curso
		})
	})
})
//inicio ver calificaciones

app.get('/calificacion', (req,res) => {

	Calificacion.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		 
		
		
		if (err){
			return console.log(err)
		}
		

		res.render ('calificacion',{
			tituloPagina:'Modulo de calificaciones',
			listado : respuesta,
		
		})
	})
})




//fin ver calificaciones
app.get('/verAspirante', (req,res) => {

	Aspirante.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('verAspirante',{
			tituloPagina:'Ver matriculados',
			listado : respuesta
		})
	})
})

//fin

//fin ver calificaciones
app.get('/login', (req,res) => {

		res.render ('login',{
			tituloPagina:'Inicio docente',
			titulo:'Inicio session Docente'
		
	})
})

//fin
app.get('/actualizar', (req, res) => {	

		Estudiante.findById(req.session.usuario, (err, usuario) =>{
			//Estudiante.findById(req.usuario, (err, usuario) =>{
			if (err){
				return console.log(err)
			}

			if (!usuario){
			return res.redirect('/')
		}
			res.render ('actualizar',{
				tituloPagina:'Actualizar datos',
				nombre : usuario.nombre,
				password : bcrypt.hashSync(usuario.password, 10),
				correo: usuario.correo,
				telefono:usuario.telefono
			})
		});
	})	

app.post('/actualizar', (req, res) => {
	
	Estudiante.findOneAndUpdate({nombre : req.body.nombre}, req.body, {new : true, runValidators: true, context: 'query' }, (err, resultados) => {
		if (err){
			return console.log(err)
		}

		res.render ('actualizar', {
		tituloPagina:'Actualizar datos',
		nombre : resultados.nombre,
		password : bcrypt.hashSync(resultados.password, 10),
		correo: resultados.correo,
		telefono:resultados.telefono
		})
	})	
})
//eliminar estudiante
app.post('/eliminar', (req, res) => {
	
	Estudiante.findOneAndDelete({nombre : req.body.nombre}, req.body, (err, resultado) => {
		if (err){
			return console.log(err)
		}

		if(!resultado){
			res.render ('eliminar', {
			tituloPagina:'Eliminar',
			nombre : "no encontrado"			
		})

		}

		res.render ('eliminar', {
			tituloPagina:'Eliminar',
			nombre : resultado.nombre			
		})
	})	
})
//eliminar matriculado
app.post('/eliminarA', (req, res) => {
	
	Aspirante.findOneAndDelete({nombre : req.body.nombre}, req.body, (err, resultado) => {
		if (err){
			return console.log(err)
		}

		if(!resultado){
			res.render ('eliminarA', {
				tituloPagina:'Eliminar aspirante',
			nombre : "no encontrado"			
		})

		}

		res.render ('eliminarA', {
			tituloPagina:'Eliminar aspirante',
			nombre : resultado.nombre			
		})
	})	
})

//fin eliminar matriculado


//eliminar curso
app.post('/eliminarC', (req, res) => {
	
	Director.findOneAndDelete({curso : req.body.curso}, req.body, (err, resultado) => {
		if (err){
			return console.log(err)
		}

		if(!resultado){
			res.render ('eliminarC', {
				tituloPagina:'Eliminar curso',
			curso : "no encontrado"			
		})

		}

		res.render ('eliminarC', {
			tituloPagina:'Eliminar curso',
			curso : resultado.curso			
		})
	})	
})


//ingresar usuario
app.post('/ingresar', (req, res) => {	
	Estudiante.findOne({nombre : req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){
			return res.render ('ingresar', {
			mensaje : "Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.password, resultados.password)){
			return res.render ('ingresar', {
			mensaje : "Contraseña no es correcta"			
			})
		}	
		
			//Para crear las variables de sesión
			req.session.usuario = resultados._id	
			req.session.nombre = resultados.nombre
		

			// let token = jwt.sign({
   //          	usuario: resultados
   //      	}, 'virtual-tdea', { expiresIn: '12h' });
			// console.log(token)

			// localStorage.setItem('token', token);
	
			res.render('ingresar', {
						mensaje : "Bienvenido " + resultados.nombre,
						nombre : resultados.nombre,
						sesion : true,
												
						 })
	})	
})///termina ingreso



//nicio de session docente
//ingresar usuario
app.post('/ingresarC', (req, res) => {	
	Docente.findOne({nombre : req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){
			return res.render ('ingresarC', {
			mensaje : "Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.password, resultados.password)){
			return res.render ('ingresarC', {
			mensaje : "Contraseña no es correcta"			
			})
		}	
		if(Docente){
		

		}
			//Para crear las variables de sesión
			req.session.usuario = resultados._id	
			req.session.nombre = resultados.nombre
			
			

			// let token = jwt.sign({
   //          	usuario: resultados
   //      	}, 'virtual-tdea', { expiresIn: '12h' });
			// console.log(token)

			// localStorage.setItem('token', token);
	
			res.render('ingresarC', {
						mensaje : "Bienvenido " + resultados.nombre,
						nombre : resultados.nombre,
						
						sesion : true,
								
						 })
	})	
})///termina ingreso
//fin inicio docente


app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})

app.get('*',(req,res)=> {
	res.render('error', {
		titulo: "Error 404",		
	})
});

module.exports = app