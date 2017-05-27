var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));

var i = 0;
var url = "http://www.dy2018.com"; 
var date = new Date();

function fetchPage(x) {
    startRequest(x); 
}

function startRequest(x){
	superagent.get(x).charset().end(function (err, res) {
		var context = "";
		var $ = cheerio.load(res.text);
		var video = $('.co_content222 a').toArray();
		
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();	
		var time = year + "-" + month + "-" + day;	
		for (var i = 0; i < video.length; i++) {
			var link = 'www.dy2018.com'+video[i].attribs.href;
			var title = video[i].attribs.title;
			context = context + title + "------------------" + link + "**************************"; 
		}
		fs.appendFile('./data/' + time + '.txt',context,'utf-8',function(err){
				if(err){
					console.log(err);
				}
			});
	});
}

fetchPage(url); 