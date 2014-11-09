// Input: object with various params, eg
// {age:17,weightLbs:150,drinkSizemg:54,hours:4,doseTimeHrs:2}
// Required: age, weightLbs, drinkSizemg, hours, doseTimeHrs (time since first dose)
//
// Output: Array of times and milligrams, eg
// [[Date, 55],[Date, 55]]
function inputToConsumption(params){ 
    var start = new Date();
    var result = [];
    var w = params.weightLbs;
    
    var initT = params.doseTimeHrs;
    var Ao = (11.76 * params.drinkSizemg * (Math.pow(Math.E, -0.162 * initT) - Math.pow(Math.E, -11.76 * initT) ))/(11.76-0.162); // Current amount
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