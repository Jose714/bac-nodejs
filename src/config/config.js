process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.SENDGRID_API_KEY='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';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/asignaturas';
	
}
else {
	urlDB = 'mongodb+srv://nodejstdea:nodejstdea@nodejstdea-4jn4i.mongodb.net/asignaturas?retryWrites=true'
}

process.env.URLDB = urlDB