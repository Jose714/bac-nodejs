const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const directorSchema = new Schema({
	curso : {
		type : String,
		required : true	,
		trim : true,
		lowercase: true,
		unique:true,
		uniqueCaseInsensitive: true
	},
	id:{

		type: Number,
		required:true,
		default:0,
		min:1,
		max:9999,
		lowercase: true,
		unique:true
	},
	duracion : {
		type: Number,
		default: 0,
		min: 0,
		max:120				
	},
	valor: {
		type: Number,
		default: 0	,
		min: 0,
		max: 999999					
	},
	nombre:{
		type:String,
		required:true
	}

});

directorSchema.plugin(uniqueValidator);

const Director = mongoose.model('Director', directorSchema);
module.exports = Director