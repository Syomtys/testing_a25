var responseData;

function get_tarif(days, tariff) {
	var price;
	for (var key in tariff) {
	  if (tariff.hasOwnProperty(key)) {
		var value = tariff[key];
		if (parseInt(days) >= parseInt(key)) {
			price = value;
		}
	  }
	}
	return price;
}

function update_price() {
	var result;
	var price;
	var dop_item = 0;
	
	var isChecked = $('#form_checkbox input[type="checkbox"]:checked').each(function(){
		dop_item = dop_item+parseInt($(this).val());
	});;
	
	var days = $('#days').val();
	var product = $('#form_select').val();
	responseData.a25_products.forEach(item => {
		if (item.NAME == product) {
			product = item;
		}
	})
	if (product.TARIFF) {
		price = get_tarif(days, product.TARIFF);
	} else {
		price = product.PRICE;
	}
	
	result = parseInt(days)*(parseInt(price)+parseInt(dop_item));
	$('#result span').remove();
	$('#result').append('<span>'+result+'</span>');
}

$(document).ready(function() {
	$.ajax({
		url: './version1/get_data.php',
		method: 'GET',
		success: function(response) {
			console.log(response);
			responseData = response;
			response.a25_products.forEach(element => {
				$("#form_select").append('<option>'+element.NAME+'</option>');
			});
			response.a25_settings.forEach(element => {
				Object.keys(element.set_value).forEach(key => {
					$("#form_checkbox").append('<input type="checkbox" class="form-check-input" value="'+element.set_value[key]+'"/><label class="form-check-label">' + key + '</label><br/>');
				});
			});
		},
		error: function() {
			console.log('Ошибка загрузки данных');
		}
	});
});

$("#days").on("input", function() {
	console.log('test');
	var val = $(this).val();
	if (val < 1) {
		$(this).val(1);
	}
	update_price();
});

$("#day_rem").click( function(){
	var val = $('#days').val();
	if (parseInt(val) >=2){         
		$('#days').val(parseInt(val)-1);
		update_price();
	}
});

$("#day_add").click( function(){ 
	var val = $('#days').val();
	$('#days').val(parseInt(val)+1);
	update_price();
});

$( "#form_select" ).change(function() {
	update_price();
});

$(document).on('change', '#form_checkbox input[type="checkbox"]', function() {
	update_price();
});