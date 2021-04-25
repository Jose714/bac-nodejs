const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const docenteSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	password :{
		type : String,
		required : true
	},
	email: {
		type : String,
		required : true,
		trim:true	
	},
	cedula : {
		type: Number,
		required : true	,
		default: 0,			
	},

	telefono : {
		type: Number,
		required : true	,
		default: 0	,
						
	},curso:{
		type:String,
		required:true
	},
	avatar:{
		type:Buffer,
		
	}
	
});




docenteSchema.plugin(uniqueValidator);

const Docente = mongoose.model('Docente', docenteSchema);

module.exports = Docente