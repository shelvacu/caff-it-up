// Input: object with various params, eg
// {age:17,weightLbs:150,drinkSizemg:54,hours:4}
// Required: age, weightLbs, drinkSizemg, hours (time since first dose)
//
// Output: Array of times and milligrams, eg
// [[Date, 55],[Date, 55]]
function inputToConsumption(params){ 
    var start = new Date();
    var result = [];
    var w = params.weightLbs;
    
    var Ao = params.drinkSizeMg; // Current amount
    var A = ((w * 0.453592) * 1.5); // lower bound: 2-3 mg per kg for an observable effect
    var dosage = ((w * 0.453592) * 2);
    
    if (Ao < A) { // if current amount < lower bound, make greater
        result.push([start, Math.round((A-Ao) * 10) / 10]);
    }
    Ao = A;
    
    console.log("Ao: " + Ao);
    console.log("A: " + A);
    
    var timeIdx = new Date(start.getTime());
    while(timeIdx.getTime() < (start.getTime()+(params.hours*60*60*1000))) {
        var t = (Math.log( (A * (11.76 - 0.162))/(11.76 * Ao) ))/
            (Math.log( Math.pow(Math.E, -0.162)-Math.pow(Math.E, -11.76) )); // next dose time (ms)
        
        if (t < 0) { console.log('inputToConsumption error: t < 0; t=' + t); return null; }
        Ao = A + dosage;
        
        timeIdx.setTime(timeIdx.getTime()+(t*60*60*1000));
        
        var date = new Date(timeIdx.getTime());
        result.push([date, Math.round((dosage) * 10) / 10]);
    }
    return result;
}

function calculateCurrentAmount() { 
    var selected_drinks = $('.selected-drink').toArray();
    selected_drinks.sort(function (a, b) {
        if (parseInt($(a).find('.selected-drink-hours-input').val()) > parseInt($(b).find('.selected-drink-hours-input').val())) {
            return -1;
        }
        if (parseInt($(a).find('.selected-drink-hours-input').val()) < parseInt($(b).find('.selected-drink-hours-input').val())) {
            return 1;
        }
        return 0;
    });
    
    var initCaff = $(selected_drinks[0]).attr('data-caff');
    var initTimeHrs = parseInt($(selected_drinks[0]).find('.selected-drink-hours-input').val());
    
    var A = (11.76 * initCaff * (Math.pow(Math.E, -0.162 * initTimeHrs) - Math.pow(Math.E, -11.76 * initTimeHrs) ))/(11.76-0.162);
    for (var i = 1, len = selected_drinks.length; i < len; i++) {
        var e1_caff = $(selected_drinks[i]).attr('data-caff');
        var e2_caff = $(selected_drinks[i-1]).attr('data-caff'); // not being used?
        
        var e1_hours = parseInt($(selected_drinks[i]).find('.selected-drink-hours-input').val());
        var e2_hours = parseInt($(selected_drinks[i-1]).find('.selected-drink-hours-input').val());
        
        var T = Math.abs(e1_hours - e2_hours);
        A = (11.76 * A * (Math.pow(Math.E, -0.162 * T) - Math.pow(Math.E, -11.76 * T) ))/(11.76-0.162)
        A += (11.76 * e1_caff * (Math.pow(Math.E, -0.162 * e1_hours) - Math.pow(Math.E, -11.76 * e1_hours) ))/(11.76-0.162);
    }
    
    if (A == 0 || isNaN(A)) {
        A = 1;
    }
    return A;
}