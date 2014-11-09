window.notif = {};
notif.scheduled = [];
notif.loopSound = true;
notif.beepin = false; //we beepin?
notif.beeped = false; //have we beeped? i dunno man
soundManager.setup({
    url: 'assets/soundmanager/swf',
    //flashVersion: 9, // optional: shiny features (default = 8)
    // optional: ignore Flash where possible, use 100% HTML5 mode
    preferFlash: false,
    onready: function() {
	soundManager.createSound({
	    id: 'you-need-more-caffeine',
	    url: 'assets/sounds/you-need-to-drink-more-caffeine.mp3',
	    autoLoad: true,
	    autoPlay: false	    
	});
    }
});

function playSound(){
    var alert = soundManager.getSoundById('you-need-more-caffeine');
    alert.play();
}

notif.checkNewAlertInterval = setInterval(function(){
    var now = new Date();
    notif.scheduled.forEach(function(ob){
	if(ob.date < now && !ob.done){ //if this was supposed to execute in the past.
	    notif.beepin = true;
	    notif.beeped = false;
	    $.notify("You need to drink "+ob.whatToDrink+".",{autoHide:false,clickToHide:true});
	    $('.notify-wrapper').on('click',notif.shutup);
	    ob.done = true;
	}
    });
},1000);//check every second for when we need to bug them

notif.soundAlertInterval = setInterval(function(){
    if(notif.beepin && !notif.beeped){
	playSound();
	if(!notif.loopSound)
	    notif.beeped;
    }
},3000);

// date is a Date object of when to execute
// whatToDrink is a string displayed to the user, "you need to drink <var>!"
notif.addNotifAt = function(date,whatToDrink){
    notif.scheduled.push({date: date, whatToDrink:whatToDrink, done:false});
}

notif.alerted = notif.shutup = function(){
    notif.beepin = false;
    notif.beeped = false;
}


