/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('test', {
			title: 'Express',
			body: "Henry is the coolest",
			seq: ["henry", "is", "pretty", "great"]
		});
	});

};