
$(document).ready(function(){
	passangerNamespace.init();
});

(function(){
	this.passangerNamespace = this.passangerNamespace || {};
	var ns = this.passangerNamespace;
	var currentPassanger;

	ns.init = function(){
		$('#prImage').on('change', bindImage);
		$('#addBtn').on('click', function(e){
			e.preventDefault();
			ns.save();
		});
		$('#clearBtn').on('click', ns.clearProduct);
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
		var allpassanger = JSON.parse(localStorage.getItem('passanger'));
		return allpassanger ? allpassanger : [];
	}

	ns.display = function (){
		currentPassanger = {key:null, passanger:{}};
		var results = productRetreive();
		bindToGrid(results);
	}

	function bindToGrid(results){
		var html='';
		for(var i = 0; i<results.length; i++){
			var passanger = results[i];
			html +='<tr><td class="displayImg"><img class="img-responsive" src="'+passanger.image+'"/></td>';
			html +='<td>'+passanger.name+'</td>';
			html +='<td>'+passanger.ticket+'</td>';
			html +='<td>'+passanger.contact+'</td>';
			html +='<td>'+passanger.brif+'</td>';
			html +='<td><a class="edit" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-edit"></i></a></td>';
			html +='<td><a class="delete" href="javascript:void(0)" data-key="'+i+'"><i class="fa fa-trash"></i></a></td></tr>';
		}
		html = html || '<tr><td colspan="7">No Records Available</td></tr>';
		$('#passangerTable').html('<table id="passangerTable" class="table table-responsive table-bordered">' +
							'<tr><th>Photo</th><th>Name</th><th>Ticket SL</th>' +
								'<th>Contact No</th><th>Email</th><th>Edit</th><th>Delete</th>' +
							'</tr></table>');
		$('#passangerTable').append(html);
		$('a.edit').on('click', ns.loadProduct);
		$('a.delete').on('click', ns.deleteProduct);             								
	}

	ns.deleteProduct = function(){
		var key = parseInt($(this).attr('data-key')); 
		var results = productRetreive();
		$.each(results, function(index, obj){
	        results.splice(key,1);
	        localStorage.setItem('passanger', JSON.stringify(results));
	        ns.display();
	        return false;
		});
	}

	ns.loadProduct = function(){
		var key = parseInt($(this).attr('data-key'));
		var results = productRetreive();
		$('#headStatus, #addBtn').html('Update Student');
		$('.getImg-status').html('change image');
		currentPassanger = {key:key, passanger:results[key]};
		displayCurrentPassanger();
	}

	function displayCurrentPassanger(){
		var passanger = currentPassanger.passanger;
		$('#passangerName').val(passanger.name);
		$('#passangerSL').val(passanger.ticket);
		$('#PsContact').val(passanger.contact);
		$('#PsEmail').val(passanger.brif);                                     
		$('#holdImg').attr('src', passanger.image);
	}

	ns.save = function(){
		var img = new Image();
		var passanger = currentPassanger.passanger;
		passanger.name = $('#passangerName').val();
		passanger.ticket = $('#passangerSL').val();                        
		passanger.contact = $('#PsContact').val();             
		passanger.brif = $('#PsEmail').val();                   
		img.src = $('#holdImg').attr('src');
		passanger.image = img.src;

		var results = productRetreive();

		if(currentPassanger.key != null){
		    results[currentPassanger.key] = passanger;
            localStorage.setItem('passanger', JSON.stringify(results));
			clearInput();
			ns.display();
		}
		else {
			if(passanger.name && passanger.ticket && passanger.contact){
				results.push(passanger);
				localStorage.setItem('passanger', JSON.stringify(results));
				clearInput();
				ns.display();
			}else{
				var html ='';
					html +='<p style="color:red;">Fill required Field(eg. passanger Name, ticket, contact etc.)</p>';
				$('.passangerAdd-box').append(html);
			}
			
		}
		
	}

	function clearInput(){
		$('#passangerName').val(''); 
		$('#passangerSL').val('');
		$('#PsContact').val('');
		$('#PsEmail').val('');
		$('#holdImg').attr('src','images/placeholder.png');                 
	}

	ns.clearProduct = function(){
		if(localStorage.length != 0){
			localStorage.clear();
			$("#passangerTable").find("tr:gt(0)").remove();
			ns.display();
		}
	}



})();