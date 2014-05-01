var tracking = [];

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 'getData')
	{
		var now = new Date();

		var reloadData = function () {
			var user = {};
			$.ajax({
				url: 'https://dashboard.42.fr/crawler/pull/' + request.uid + '/',
				dataType: 'json',
				success: function (result) {
					user.host = result.last_host.replace('.42.fr', '');
					user.lastChecked = new Date();
					sendResponse({ 'host' : user.host });
					tracking[request.uid] = user;
				},
				error: function (result) {
					user.host = 'Logged out';
					user.lastChecked = new Date();
					sendResponse({ 'host' : user.host });
					tracking[request.uid] = user;
				}
			});
		};

		if (!tracking[request.uid]) {
			reloadData();
		}
		else {
			var diff = (now.getTime() - tracking[request.uid].lastChecked.getTime()) / 60 / 1000;
			if (diff < 5) {
				sendResponse({ 'host' : tracking[request.uid].host });
			}
			else {
				reloadData();
			}
		}
		return true
	}
});
