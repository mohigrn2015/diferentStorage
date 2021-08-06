$(document).ready(function () {
	productNamespace.init();
});

(function () {
	this.productNamespace = this.productNamespace || {};
	var ns = this.productNamespace;
	var currentProduct;
	var request, db;
	if (!window.indexedDB) {
		console.log("Your Browser does not support IndexedDB");
	}
	else {
		request = window.indexedDB.open("myTestDB", 25);
		request.onerror = function (event) {
			console.log("Error opening DB", event);
		}
		request.onupgradeneeded = function (event) {
			console.log("Upgrading");
			db = event.target.result;
			var objectStore = db.createObjectStore("students", { keyPath: "rollNo", autoIncrement: true });
		}
		request.onsuccess = function (event) {
			console.log("Success opening DB");
			db = event.target.result;
		}
	}
	ns.init = function () {
		$('#prImage').on('change', bindImage);
		
	}
	function bindImage(e) {
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (evt) {
			var result = evt.target.result;
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', result);
		}
	}

	//ns.save = function () {

	//	var img = new Image();
	//	var firstName = $('#firstName').val();
	//	var lastName = $('#lastName').val();
	//	var city = $('#city').val();
	//	var mobile = $('#mobile').val();
	//	img.src = $('#holdImg').attr('src');
	//	var image = img.src;
	//	var transaction = db.transaction(["students"], "readwrite");

	//	var objectStore = transaction.objectStore("students");
	//	objectStore.add({ FirstName: firstName, LastName: lastName, City: city, Mobile: mobile, File: image });

	//	transaction.oncomplete = function (event) {
	//		console.log("Success :)");
	//		$('#result').html("Add: Successfully");

	//	};

	//	transaction.onerror = function (event) {
	//		console.log("Error :)");
	//		$('#result').html("Add: Error occurs in inserting");
	//	};
		

	//	//ClearTextBox();
	//	//showAllDataMethod();



		

	//}

	



})();