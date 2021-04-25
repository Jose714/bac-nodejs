const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const aspiranteSchema = new Schema({
	 
	nombre : {
		type : String,
		required : true	,
		trim : true
	},

	telefono: {
		type: Number,
		required:true,
		default:0,
	},
	cedula:{

		type: Number,
		required:true,
		default:0,
		lowercase: true,
		unique:true,
		
	
	},
	curso: {
		type: String,
		required:true	
	},

  });
  



aspiranteSchema.plugin(uniqueValidator);

const Aspirante = mongoose.model('Aspirante', aspiranteSchema);
module.exports = Aspirante