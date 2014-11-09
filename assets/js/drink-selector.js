var drink_data = null;

function drinkFilter(search_tags, data_tags){ 
    for (var i = 0 , len = search_tags.length; i < len; i++){
        if (!(data_tags.indexOf(search_tags[i]) > -1)) {
            return false;
        }
    }
    return true;
}

var loaded_drink_data;
function drinksDataCallback(data) {
    drink_data = data;
    var text = '';
    var idx = 0;
    $.each(data, function(key, entry){
        text +=
            '<div class="drink" data-id="'+idx+'" data-name="'+key+'" data-image="'+entry["Image"]+'" data-caff="'+entry["Caffeine"]+'" data-tags="'+entry['Tags']+'" onclick="$(this).toggleClass(\'active\')"> \
                <!--<div class="drink-name">'+key+'</div>--> \
                <img class="drink-image" src = "assets/images/drinks/' + entry["Image"] +'" alt=""/> \
                <!--<div class="drink-caff">'+entry["Caffeine"]+' mg/12 fl oz</div>--> \
                <div class="drink-notactive-msg"> \
                    Click to select \
                </div> \
                <div class="drink-active-msg"> \
                    <span class="drink-active-msg-normal"><i class="fa fa-check"></i> Selected</span> \
                    <span class="drink-active-msg-hover"><i class="fa fa-times"></i> Click to unselect</span> \
                </div> \
            </div>';
        idx++;
    });
    
    loaded_drink_data = text;
}

$(document).ready(function(){
    /*$.ajax({
        url: 'assets/data/drinks.json',
        dataType :"json",
        success: function(data){
            drinksDataCallback(data);
        },
        error : function(httpReq,status,exception){
            console.log(status + " " + exception);
        }
    });*/
    $('.drinks-data').html(loaded_drink_data);
    $('.drinks-search').keyup(function () {
        if ($(this).val().length == 0) {
            $('.drink').show();
            return;
        }
        
        var search_tags = $(this).val().split(' ');
        $(this).closest('.drinks-selector').find('.drink').each(function() {
            var drink_tags = $(this).attr("data-tags");
            if (drinkFilter(search_tags, drink_tags)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

function openDrinkSelector(selector) {
    $(selector).show();
    $(selector).find('.drink[active]').addClass('active');
}

function cancelDrinkSelector(selector) {
    $(selector).hide();
    $(selector).find('.drink.active').removeClass('active');
}

function removeSelectedDrink(selector, drink_id, $selected_drink) {
    $(selector).find('.drink[data-id='+drink_id+']').removeAttr('active').removeClass('active');
    
    $selected_drink.find('.selected-drink-inner').animate({
        "margin-left": "-25px",
        "opacity": "0",
    }, 100);
    setTimeout(function(){
        $selected_drink.animate({
            "height": "0",
        }, 50);
    }, 100);
    setTimeout(function(){
        $selected_drink.remove();
    }, 150);
}

function updateSelectedDrinks(selector, selected_selector) {
    $(selected_selector).html('');
    $(selector).find('.drink.active').each(function() {
        $(this).attr('active', '');
        var drink_image = $(this).attr('data-image');
        var drink_caff = $(this).attr('data-caff');
        var drink_name = $(this).attr('data-name');
        var drink_id = $(this).attr('data-id');
        
        $(selected_selector).append(
            '<div class="selected-drink" data-name="'+drink_name+'" data-caff="'+drink_caff+'"> \
                <div class="selected-drink-inner"> \
                    <div class="selected-drink-image-wrapper"> \
                        <img class="selected-drink-image" src="assets/images/drinks/'+drink_image+'" alt="" /> \
                    </div> \
                    <div class="selected-drink-info"> \
                        <div class="selected-drink-name">'+drink_name+'</div> \
                        <div class="selected-drink-caff">'+drink_caff+' mg/12 fl oz</div> \
                        <div class="selected-drink-amount"> \
                            <div class="selected-drink-amount-label">Amount:</div> \
                            <input class="selected-drink-amount-input" value="1" min="1" type="number" pattern="\d*" /> \
                        </div> \
                        <input class="selected-drink-hours-input"  min="0" type="number" /> \
                    </div> \
                    <div onclick="removeSelectedDrink(\''+selector+'\', '+drink_id+', $(this).closest(\'.selected-drink\'));" class="selected-drink-remove" title="Remove this selected drink"><i class="fa fa-times"></i></div> \
                </div> \
            </div>'
        );
    });
    $(selector).find('.drink:not(.active)').each(function() {
        $(this).removeAttr('active');
    });
}