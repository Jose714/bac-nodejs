const hbs = require('hbs');

hbs.registerHelper('listar', (listado) => {
let texto = `	<form action="/eliminar" method="post">
		<table class='table table-striped table-hover'> 
				<thead class='thead-dark'>
				<th>Nombre</th>
				<th>Correo</th>
				<th>Cedula</th>
				<th>Telefono</th>
				
				
				<th></th>
				</thead>
				<tbody>`;
	listado.forEach(estudiante =>{
		texto = texto + 
				`<tr>
				<td> ${estudiante.nombre} </td>
				<td> ${estudiante.email} </td>
				<td> ${estudiante.cedula} </td>
				<td> ${estudiante.telefono} </td>
				
			
				
				<td><button class="btn btn-danger" name="nombre" value="${estudiante.nombre}">Eliminar</button></td>
				
				</tr> `;
	})
	texto = texto + '</tbody> </table></form>';	
	return texto;

});

hbs.registerHelper('ver', (listado) => {
	let texto = `	<form action="/eliminarC" method="post">
			<table class='table table-striped table-hover'> 
					<thead class='thead-dark'>
					<th>Nombre de curso</th>
					<th>id</th>
					<th>Duracion</th>
					<th>Valor</th>
					<th>Profesor</th>
					<th></th>
					</thead>
					<tbody>`;
		listado.forEach(director =>{
			texto = texto + 
					`<tr>
					<td > ${director.curso} </td>
					<td >${director.id}  </td>
					<td > ${director.duracion}</td>
					<td > ${director.valor} </td>
					<td >${director.nombre}  </td>
					<td><button class="btn btn-danger" name="curso" value="${director.curso}">Eliminar</button></td>
					
					</tr> `;
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
	
	});


		//cursos disponibles
		hbs.registerHelper('verC', (listado) => {
			let texto =``;
			 listado.forEach(verA =>{
				` <select type="spinner"  class="form-control" >`
								texto +=  
										`<option>
										 ${verA.curso}`;
	
										
							})
							texto+='</option></select>'
							return texto;		
				
			});


			hbs.registerHelper('aspirante', (listado) => {
				let texto = `	<form action="/eliminarA" method="post">
						<table class='table table-striped table-hover'> 
								<thead class='thead-dark'>
								<th>Nombre del aspirante</th>
								<th>curso inscrito</th>
								<th>Identificacion</th>
								<th></th>
								</thead>
								<tbody>`;
					listado.forEach(aspirante =>{
						texto = texto + 
								`<tr>
								<td> ${aspirante.nombre} </td>
								<td> ${aspirante.curso} </td>
								<td> ${aspirante.cedula}</td>
								
								<td><button class="btn btn-danger" name="nombre" value="${aspirante.nombre}">Eliminar</button></td>
								
								</tr> `;
					})
					texto = texto + '</tbody> </table></form>';	
					return texto;
				
				});


				//modulo de calificaciones
				hbs.registerHelper('nota', (listado) => {
					let texto = ``;
					listado.forEach(calificacion =>{
						` <select type="spinner"  class="form-control" >`
										texto +=  
												`<option>
												 ${calificacion.nombre}`;
			
												
									})
									texto+='</option></select>'
									return texto;		
						
					});

					hbs.registerHelper('calificar', (listado) => {
						let texto = ``;
								listado.forEach(aspirante =>{
									` <select type="spinner"  class="form-control" >`
													texto +=  
															`<option>
															 ${aspirante.curso}`;
						
															
												})
												texto+='</option></select>'
												return texto;		
									
								});

					//modulo para ver notas
					hbs.registerHelper('vernota', (listado) => {
						let texto = `	<form action="/calificacion" method="post">
								<table class='table table-striped table-hover'> 
										<thead class='thead-dark'>
										<th>Estudiante</th>
										<th>Nombre de curso</th>
										<th>Calificacion</th>
										<th>Fecha</th>
										
										</thead>
										<tbody>`;
							listado.forEach(calificacion =>{
								texto = texto + 
										`<tr>
										<td> ${calificacion.nombre}</td>
										<td> ${calificacion.curso}</td>
										<td>${calificacion.nota}</td>
										<td>${calificacion.date}</td>
										</tr> `;
							})
							texto = texto + '</tbody> </table></form>';	
							return texto;
						
						});
						//NOMBRE DEL PROFESOR
						hbs.registerHelper('profe', (listado) => {
							let texto =``;
							 listado.forEach(profesor =>{
								` <select type="spinner"  class="form-control" >`
												texto +=  
														`<option>
														 ${profesor.nombre}`;
					
														
											})
											texto+='</option></select>'
											return texto;		
								
							});