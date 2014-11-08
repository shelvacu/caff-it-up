
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('test', { title: 'Express', body:"Henry is the coolest", seq:["henry", "is", "pretty", "great"] });
};