$('.peering').css('width', '39%');
$('.final_note').css('width', '24%');

$('.peering ul:even a').each(function() {

	var link = $(this);
	var text = link.text();
	if (text !== 'avez donné la note' && text != 'devez noter')
	{
		text = text.replace(/.* (.*)$/, '$1');
		chrome.extension.sendMessage({ type: 'getData', uid: text }, function (response) {
			if (response.host === 'Logged out') {
				link.after(' (<span class="trackerror">Logged out</span>)');
			}
			else {
				link.after(' (<span class="tracksuccess">' + response.host + '</span>)');
			}
		});
	}
});

$('.peering ul:odd a[title]').each(function() {

	var link = $(this);
	chrome.extension.sendMessage({ type: 'getData', uid: link.text() }, function (response) {
		if (response.host === 'Logged out') {
			link.after(' (<span class="trackerror">Logged out</span>)');
		}
		else {
			link.after(' (<span class="tracksuccess">' + response.host + '</span>)');
		}
	});
});

$(document).on('DOMNodeInserted', function(e) {

	var that = e.target.firstChild;
	$('.ncompletion').css('height', '');
	$('.ncompletion').css('max-height', '300px');
	if (that && that.className == 'col1 login')
	{
		$('.ncompletion').css('width', '400px');
		var text = that.innerText;
		var magic = text.match(/^.*\((.*)\)/);
		chrome.extension.sendMessage({ type: 'getData', uid: magic[1] }, function (response) {
			if (response.host === 'Logged out') {
				$(that).html(text + ' (<span class="trackerror">x</span>)');
			}
			else {
				$(that).html(text + '<br>(<span class="tracksuccess">' + response.host + '</span>)');
			}
		});
	}

});
