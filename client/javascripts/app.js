var main = function () {
	"use strict";

	// You can split long string into two lines and use
	// + to concatenate them together.

	// Be careful, the url is not the same as the one you just
	// typed into the url box in Chrome just now. It's got
	// &jsoncallback=? at the end also

	var url = "http://api.flickr.com/services/feeds" + 
	"/photos_public.gne?tags=dogs&format=json&jsoncallback=?";

	$.getJSON(url, function (flickrResponse) {
		flickrResponse.items.forEach(function (item) {
			// create a new jquery element to hold the image
			var $img = $("<img>").hide();
			// set the attribute to the url contained in the response
			console.log(item.media.m);
			$img.attr("src", item.media.m);
			// attach the img tag to <main>
			$("main .photo").append($img);
			$img.fadeIn();
		});
	});

};

$(document).ready(main);