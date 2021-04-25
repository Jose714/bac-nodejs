const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const estudianteSchema = new Schema({
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
	},
	avatar:{
		type:Buffer,
	
	}
});




estudianteSchema.plugin(uniqueValidator);

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante