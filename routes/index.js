
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('test', { title: 'Caff-It-Up', body:"Caffeine Caffeine Caffeine Caffeine Caffeine", seq:["Caffeine", "is", "pretty", "great"] });
};