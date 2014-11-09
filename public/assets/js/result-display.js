function display_results() {
    $('#results').html('');
    
    var data = inputToConsumption({age: $('#age').val(), weightLbs: $('#weight').val(), drinkSizemg: sumDrinkSizeMg(), hours: $('#hours').val()});
    
    for (var i = 0, len = data.length; i < len; i++) {
        var pair = data[i];
        
        var date = pair[0];
        var dateN = date.toLocaleTimeString();
        var mg = pair[1];
        
        $('#results').append(
            '<div class="result-item"> \
                <div class="result-item-date">'+dateN+'</div> \
                <div>'+mg+' mg</div> \
            </div>'
        );
    }
}

function sumDrinkSizeMg() {
    var totalMg = 0;
    $('.selected-drink').each(function() {
        totalMg += parseInt($(this).attr('data-caff')) * $(this).find('.selected-drink-amount-input').val();
    });
    return totalMg;
}