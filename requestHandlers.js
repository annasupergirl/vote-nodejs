var fs = require('fs'),
    querystring = require('querystring'),
    mysql = require('mysql');

function connectDb(res) {
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'annad'
	});

	connection.connect(function(err) {
		if(err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
		}
	});

	return connection;
}

function start(response) {
	fs.readFile('view/start.html', function (err, html) {
		if (err) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
}

function vote(response, postData) {
	var connect_db = connectDb(response);
	connect_db.query('INSERT INTO people (name, surname, age) VALUES(?, ?, ?)', [querystring.parse(postData).name, querystring.parse(postData).surname, querystring.parse(postData).age], function(err, results) {
		if (err) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
		} else {
			fs.readFile('view/success.html', function (error, html) {
				if (error) {
					response.writeHead(500, {"Content-Type": "text/plain"});
					response.write(err + "\n");
					response.end();
				}
				response.writeHeader(200, {"Content-Type": "text/html"});
				response.write(html);
				response.end();
			});
		}
	});

	connect_db.end();
}

function show(response) {
	var connect_db = connectDb(response);
	connect_db.query('SELECT COUNT(*) AS namesCount FROM people', function(err, results) {
		if (err) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
		} else {
			response.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'});
			response.write("Нас уже: " + results[0].namesCount);
			response.end();
		}
	});

	connect_db.end();
}

exports.start = start;
exports.vote = vote;
exports.show = show;
