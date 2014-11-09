var drink_data = null;

function drinkFilter(search_tags, data_tags){ 
    for (var i = 0 , len = search_tags.length; i < len; i++){
        if (!(data_tags.indexOf(search_tags[i]) > -1)) {
            return false;
        }
    }
    return true;
}
$(document).ready(function(){
    $.ajax({
        url: '/assets/data/drinks.json',
        dataType :"json",
        success: function(data){
            drink_data = data;
            var text = '';
            $.each(data, function(key, entry){
                text +=
                    '<div class="drink" data-tags="'+entry['Tags']+'" onclick="$(this).toggleClass(\'active\')"> \
                        <div class="drink-name">'+key+'</div> \
                        <img class="drink-image" src = "/assets/images/drinks/' + entry["Image"] +'" alt=""/> \
                        <div class="drink-caff">'+entry["Caffeine"]+' mg/12 fl oz</div> \
                        <div class="drink-notactive-msg"> \
                            Click to select \
                        </div> \
                        <div class="drink-active-msg"> \
                            <span class="drink-active-msg-normal"><i class="fa fa-check"></i> Selected</span> \
                            <span class="drink-active-msg-hover"><i class="fa fa-times"></i> Click to unselect</span> \
                        </div> \
                    </div>'
            });
            
            document.getElementById('drinks-data').innerHTML = text;
        },
        error : function(httpReq,status,exception){
            console.log(status + " " + exception);
        }
    });
    $('#drinks-search').keyup(function () {
        if ($('#drinks-search').val().length == 0) {
            $('.drink').show();
            return;
        }
        
        var search_tags = $('#drinks-search').val().split(' ');
        $('.drink').each(function() {
            var drink_tags = $(this).attr("data-tags");
            if (drinkFilter(search_tags, drink_tags)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
function updateSelectedDrinks() {
    $('.drink.active').each(function() {
    });
}