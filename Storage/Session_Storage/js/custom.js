///<reference path="js/jquery-3.2.1.min.js"/>
$(document).ready(function(){
	PatientNamespace.init();
});

(function(){
	this.PatientNamespace = this.PatientNamespace || {};
	var ns = this.PatientNamespace;
	var currentPatient;

	ns.init = function(){
		$('#prImage').on('change', bindImage);
		$('#addBtn').on('click', function(e){
			e.preventDefault();
			ns.save();
		});
		$('#clearBtn').on('click', ns.clearProduct);                                               localStorage
		ns.display();
	}
	

	function bindImage(e){
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(evt){
			var result = evt.target.result;
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', result);
		}
	}

	function productRetreive(){
		var allPatient = JSON.parse(sessionStorage.getItem('Patient'));
		return allPatient ? allPatient : [];
	}

	ns.display = function (){
		currentPatient = {key:null, Patient:{}};
		var results = productRetreive();
		bindToGrid(results);
	}

	function bindToGrid(results){
		var html='';
		for(var i = 0; i<results.length; i++){
			var Patient = results[i];
			html +='<tr><td class="displayImg"><img class="img-responsive" src="'+Patient.image+'"/></td>';
			html +='<td>'+Patient.name+'</td>';
			html +='<td>'+Patient.cabin+'</td>';
			html +='<td>'+Patient.PsCabin+'</td>';												
			html +='<td>'+Patient.contact+'</td>';
			html +='<td>'+Patient.brif+'</td>';
			html +='<td><a class="edit" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-edit"></i></a></td>';
			html +='<td><a class="delete" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-trash"></i></a></td></tr>';
		}
		html = html || '<tr><td colspan="7">No Records Available</td></tr>';
		$('#PatientTable').html('<table id="PatientTable" class="table table-responsive table-bordered">' +
							'<tr><th>Photo</th><th>Name</th><th>Sl Number</th><th>Cabin No</th>' +
								'<th>Contact No</th><th>Email</th><th>Edit</th><th>Delete</th>' +
							'</tr></table>');
		$('#PatientTable').append(html);
		$('a.edit').on('click', ns.loadProduct);
		$('a.delete').on('click', ns.deleteProduct);             								
	}

	ns.deleteProduct = function(){
		var key = parseInt($(this).attr('data-key')); 
		var results = productRetreive();
		$.each(results, function(index, obj){
	        results.splice(key,1);
	        sessionStorage.setItem('Patient', JSON.stringify(results));
	        ns.display();
	        return false;
		});
	}

	ns.loadProduct = function(){
		var key = parseInt($(this).attr('data-key'));
		var results = productRetreive();
		$('#headStatus, #addBtn').html('Update Student');
		$('.getImg-status').html('change image');
		currentPatient = {key:key, Patient:results[key]};
		displayCurrentProduct();
	}

	function displayCurrentProduct(){
		var Patient = currentPatient.Patient;
		$('#PatientName').val(Patient.name);
		$('#PatientSL').val(Patient.PatientSL);
		$('#PsCabin').val(Patient.PsCabin);		
		$('#PsContact').val(Patient.contact);
		$('#PsEmail').val(Patient.brif);                                     
		$('#holdImg').attr('src', Patient.image);   PsCabin
	}

	ns.save = function(){
		var img = new Image();
		var Patient = currentPatient.Patient;
		Patient.name = $('#PatientName').val();
		Patient.PatientSL = $('#PatientSL').val();
		Patient.cabin = $('#PsCabin').val();
		
		Patient.contact = $('#PsContact').val();             
		Patient.brif = $('#PsEmail').val();                   
		img.src = $('#holdImg').attr('src');
		Patient.image = img.src;

		var results = productRetreive();

		if(currentPatient.key != null){
		    results[currentPatient.key] = Patient;
            sessionStorage.setItem('Patient', JSON.stringify(results));
			clearInput();
			ns.display();
		}
		else {
			if(Patient.name && Patient.cabin && Patient.contact){
				results.push(Patient);
				sessionStorage.setItem('Patient', JSON.stringify(results));
				clearInput();
				ns.display();
			}else{
				var html ='';
					html +='<p style="color:red;">Fill required Field(eg. Patient Name, cabin, contact etc.)</p>';
				$('.PatientAdd-box').append(html);
			}
			
		}
		
	}

	function clearInput(){
		$('#PatientName').val(''); 
		$('#PatientSL').val('');
		$('#PsCabin').val('');
		$('#PsContact').val('');
		$('#PsEmail').val('');
		$('#holdImg').attr('src','images/placeholder.png');                 
	}

	ns.clearProduct = function(){
		if(sessionStorage.length != 0){
			sessionStorage.clear();
			$("#PatientTable").find("tr:gt(0)").remove();
			ns.display();
		}
	}



})();