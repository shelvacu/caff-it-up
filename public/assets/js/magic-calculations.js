//Input: object with various params, eg
//{age:17,weightLbs:150,drinkSizemg:54,hours:4}
//required: weightLbs hours
//
//Output: Array of times and milligrams, eg
//[[Date, 55],[Date, 55]]
function inputToConsumption(params){
    var start = new Date()
    var res = [[start, 40]] // 40 - One coke
    var w = params.weightLbs;
    var Ao = params.drinkSizemg;
    var t = ((280-w)/26)*(( Math.log(20/Ao) )/(-Math.log(2))); //next dose, in hours.
    var end = new Date();
    end.setTime(start.getTime());
    console.log(t);
    console.log(end.getTime() + ", " + (start.getTime()+(params.hours*60*60*1000)));
    while(end.getTime() < (start.getTime()+(params.hours*60*60*1000))) {
        console.log(end.getTime() + ", " + (start.getTime()+(params.hours*60*60*1000)));
        
        end.setTime(end.getTime()+(t*60*60*1000));
        var date = new Date();
        date.setTime(end.getTime());
        res.push([date,40]);
    }
    return res;
}
