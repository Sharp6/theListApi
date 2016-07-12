var google = require('googleapis');

var VideoRetriever = function() {
	var yt = google.youtube('v3');

	this.retrieve = function(song, query) {
		return new Promise(function(resolve,reject) {
			yt.search.list({
				part: "snippet",
				maxResults: "3",
				q: song.title + " " + song.author + " " + query,
				type: "video",
				key: process.env.GOOGLE_API_KEY
			}, function(err,data) {
				if(err) {
					reject(err);
				} else {
					var ids = data.items.map(function(item) {
						return item.id.videoId;
					});
					/*.map(function(id) {
						return "https://youtube.com/watch?v=" + id;
					});*/

					if(!song.videos) {
						song.videos = {};
					}

					song.videos[query] = ids;
					resolve(song);
				}
			});
		});
	};
};

module.exports = new VideoRetriever();