/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Caff-It-Up',
			body: "Henry is the coolest",
			seq: ["henry", "is", "pretty", "great"]
		});
	});
};