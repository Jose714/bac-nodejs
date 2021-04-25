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
const jwt = require('jsonwebtoken');

require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)




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
						
						sesion : true						
						 })
	})	
})///termina ingreso
//fin inicio docente

module.exports = app