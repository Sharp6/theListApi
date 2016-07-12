var google = require('googleapis');

var VideoRetriever = function() {
	var yt = google.youtube('v3');

	this.retrieve = function(song) {
		return new Promise(function(resolve,reject) {
			yt.search.list({
				part: "snippet",
				maxResults: "3",
				q: song.title + " " + song.author + " cover",
				type: "video",
				key: process.env.GOOGLE_API_KEY
			}, function(err,data) {
				if(err) {
					reject(err);
				} else {
					var links = data.items.map(function(item) {
						return item.id.videoId;
					});
					/*.map(function(id) {
						return "https://youtube.com/watch?v=" + id;
					});*/

					song.videos = links;
					resolve(song);
				}
			});
		});
	};
};

module.exports = new VideoRetriever();