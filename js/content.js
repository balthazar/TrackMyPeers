//localStorage.setItem('field', null);
var field = JSON.parse(localStorage.getItem('field'));

if (!field) {
	field = {
		updated : new Date(),
		targets : []
	};

	localStorage.setItem('field', JSON.stringify(field));
}

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

/* Debug when no eval process */
$('.peering').html('<div class="user">bgronon</div><div class="user">mpillet</div><div class="user">fbeck</div><div class="user">janteuni</div><div class="user">hmassing</div>');

$('.peering .user').each(function() {
	var link = $(this);
	var login = $(this).text();
	if (field.targets.indexOf(login) == -1) {
		field.targets.push(login);
	}
	localStorage.setItem('field', JSON.stringify(field));
});

console.log(field);

/* */

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
