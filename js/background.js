var last;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == "getTime")
	{
		var now = new Date();
		now.getHours();
		now.getMinutes();
		var diff = Math.floor((now - last) / 1000 / 60);
		if (diff >= 10 || !last)
		{
			last = now;
			return true;
		}
	}
	return false;
});