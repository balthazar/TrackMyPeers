var tracking = [];

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'getData') {
    var now = new Date();

    var reloadData = function () {
      var user = {};
      $.ajax({
        url: 'https://dashboard.42.fr/crawler/pull/' + request.uid + '/',
        dataType: 'json',
        success: function (result) {
          var match = result.last_host.match(/(e[0-9]{1,2}r[0-9]{1,2}p[0-9]{1,2})\.42\.fr/);
          user.host = match ? match[1] : 'Logged out';
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
    return (true);
  }
  else if (request.type === 'postField') {

    var now = new Date(request.data.updated);

    $.ajax({
      method: 'POST',
      url: 'http://ft-field.herokuapp.com/api/sync',
      dataType: 'json',
      data: { 'login' : request.data.login, 'targets' : request.data.targets, 'date' : now },
      success: function (res) {
        sendResponse({ 'state' : 'ok' });
      },
      error: function (err) {
        sendResponse({ 'state' : 'err' });
        console.log(err);
      }
    });
    return (true);
  }
});
