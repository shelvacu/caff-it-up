// Input: object with various params, eg
// {age:17,weightLbs:150,drinkSizemg:54,hours:4}
// Required: age, weightLbs, drinkSizemg, hours
//
// Output: Array of times and milligrams, eg
// [[Date, 55],[Date, 55]]
function inputToConsumption(params){ 
    var start = new Date()
    var res = [[start, 34]] // 34 - One coke
    
    var w = params.weightLbs;
    var Ao = params.drinkSizemg;
    var A = 20;
    console.log('A: ' + t);
    console.log('Ao: ' + Ao);
    
    var t = (Math.log( (A * (11.76 - 0.162))/(11.76 * Ao) ))/(Math.log( Math.pow(Math.E, -0.162)-Math.pow(Math.E, -11.76) )) //next dose, in hours.
    // var t = ((280-w)/26)*(( Math.log(20/Ao) )/(-Math.log(2))); Older equation
    
    if (t < 0) {
        console.log('inputToConsumption error: t < 0; t=' + t);
        return null;
    }
    
    var end = new Date();
    end.setTime(start.getTime());
    while(end.getTime() < (start.getTime()+(params.hours*60*60*1000))) {
        end.setTime(end.getTime()+(t*60*60*1000));
        var date = new Date();
        date.setTime(end.getTime());
        res.push([date,34]);
    }
    return res;
}
