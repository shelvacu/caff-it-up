function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function display_results() {
    var timeout = 0;
    
    $('.result-item').each(function() {
        var $result_item = $(this);
        setTimeout(function(){
            $result_item.animate({
                "margin-top": "-20px",
                "opacity": "0",
            }, 300);
            setTimeout(function(){
                $result_item.remove();
            }, 300);
        }, timeout);
        timeout += 80;
    });
    
    var data = inputToConsumption({age: $('#age').val(), weightLbs: $('#weight').val(), drinkSizemg: sumDrinkSizeMg(), hours: $('#hours').val()});
    timeout = 0;
    
    for (var i = 0, len = data.length; i < len; i++) {
        var pair = data[i];
        
        var date = pair[0];
        var dateN = date.toLocaleTimeString();
        var mg = pair[1];
        var topPx = 84 * i;
        var marginTopPx = 40;
        
        var $result_item = $(
            '<div class="result-item" style="position:absolute;top:'+topPx+'px;width:100%;margin-top:'+marginTopPx+'px;opacity:0;"> \
                <div class="result-item-date">'+dateN+'</div> \
                <div>'+mg+' mg</div> \
            </div>');
            
        console.log('create: ' + $result_item);
        $('#results').append($result_item);
        
        (function($result_item) {
            setTimeout(function(){
                $result_item.animate({
                    "margin-top": "0px",
                    "opacity": "1",
                }, 400);
            }, timeout);
        })($result_item);
        timeout += 80;
        marginTopPx += 15;
    }
}

function sumDrinkSizeMg() {
    var totalMg = 0;
    $('.selected-drink').each(function() {
        totalMg += parseInt($(this).attr('data-caff')) * $(this).find('.selected-drink-amount-input').val();
    });
    
    if (totalMg == 0) {
        totalMg = 34;
    }
    
    return totalMg;
}
