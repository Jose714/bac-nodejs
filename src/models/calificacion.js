const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const calificacionSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	curso: {
		type: String,
		required:true	
	},
	nota:{
		type:Number,
		min:1,
		max:5
	},
	date: {
		type: Date,
		default: Date.now
	  }

});

calificacionSchema.plugin(uniqueValidator);

const Calificacion = mongoose.model('Calificacion', calificacionSchema);
module.exports = Calificacion