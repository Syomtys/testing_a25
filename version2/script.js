$(document).ready(function() {
	$.ajax({
		url: './version2/get_data.php',
		method: 'GET',
		success: function(response) {
			response.a25_products.forEach(element => {
				$("#form_select").append('<option>'+element.NAME+'</option>');
			});
			response.a25_settings.forEach(element => {
				Object.keys(element.set_value).forEach(key => {
					$("#form_checkbox").append('<input type="checkbox" name="dop" class="form-check-input" value="'+element.set_value[key]+'"/><label class="form-check-label">' + key + '</label><br/>');
				});
			});
		},
		error: function() {
			console.log('Ошибка загрузки данных');
		}
	});
	$("#days").on("input", function() {
		var val = $(this).val();
		if (val < 1) {
			$(this).val(1);
		}
	});
	
	$("#day_rem").click( function(){
		var val = $('#days').val();
		if (parseInt(val) >=2){         
			$('#days').val(parseInt(val)-1);
		}
	});
	
	$("#day_add").click( function(){ 
		var val = $('#days').val();
		$('#days').val(parseInt(val)+1);
	});
	
	$(document).ready(function() {
		$('#form_calculation').on('submit', function(e) {
			e.preventDefault(); 
			let dop_price = 0;
			let form_data = $(this).serializeArray();
			form_data.forEach(item => {
				if (item.name == 'dop') {
					dop_price = dop_price + parseInt(item.value);
				}
			})
			form_data.push({name: 'dop_price', value: dop_price});
			// console.log(form_data);
			// console.log(dop_price);
			
			$.post('version2/get_summ.php', form_data, function(data){
				var response = data.price;
				$('#result span').remove();
				$('#result').append('<span>'+response+'</span>');
			});
		});
	});
	
});
