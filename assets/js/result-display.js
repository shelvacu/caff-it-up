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
    
    var drinkSizeMg = sumDrinkSizeMg();
    
    if ($('#age').val() && overCaffMaxMg(drinkSizeMg, parseInt($('#age').val()))) {
        var $warning_item = $(
                '<div class="result-item error-card" style="position:absolute;top:0px;width:100%;margin-top:40px;opacity:0;"> \
                    <div><b>Warning</b></div> \
                    <div>You have passed the maximum recommended daily dosage amount.</div> \
                </div>');
        $('#results').append($warning_item);
        $warning_item.animate({
            "margin-top": "0px",
            "opacity": "1",
        }, 400);
        return;
    }
    
    var data = inputToConsumption({age: $('#age').val(), weightLbs: $('#weight').val(), drinkSizemg: drinkSizeMg, hours: $('#hours').val()});
    timeout = 0;
    
    var drinkSizeNewSumMg = drinkSizeMg;
    $('#results').css('height', ((data.length) * 84) + 'px');
    for (var i = 0, len = data.length; i < len; i++) {
        var pair = data[i];
        
        var date = pair[0];
        var dateN = date.toLocaleTimeString();
        var mg = pair[1];
        var topPx = 84 * i;
        var marginTopPx = 40;
        drinkSizeNewSumMg += mg;
        
        if ($('#age').val() && overCaffMaxMg(drinkSizeNewSumMg, parseInt($('#age').val()))) {
            var $warning_item = $(
                    '<div class="result-item error-card" style="position:absolute;top:'+topPx+'px;width:100%;margin-top:'+marginTopPx+'px;opacity:0;"> \
                        <div><b>Warning</b> Any more will exceed the maximum recommended daily dosage amount.</div> \
                    </div>');
            $('#results').append($warning_item);
            
            (function($warning_item) {
                setTimeout(function(){
                    $warning_item.animate({
                        "margin-top": "0px",
                        "opacity": "1",
                    }, 400);
                }, timeout);
            })($warning_item);
            timeout += 80;
            marginTopPx += 15;
            return;
        }
        
        var $result_item = $(
            '<div class="result-item" style="position:absolute;top:'+topPx+'px;width:100%;margin-top:'+marginTopPx+'px;opacity:0;"> \
                <div class="result-item-date">'+dateN+'</div> \
                <div>'+mg+' mg</div> \
            </div>');
        
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

function overCaffMaxMg(caff, age) {
    if (age > 12) {
        if (caff > 400) {
            return true;
        }
        
        // 1 lb = 0.453592 kg
        if ($('#weight').val() && caff > ((parseInt($('#weight').val()) * 0.453592) * 2.5)) {
            return true;
        }
    } else if (age > 9) {
        if (caff > 85) {
            return true;
        }
    } else if (age > 6) {
        if (caff > 62.5) {
            return true;
        }
    } else if (age > 4) {
        if (caff > 45) {
            return true;
        }
    }
    return false;
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
