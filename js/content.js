$(".peering").css("width", "39%");
$(".final_note").css("width", "24%");

$(".peering ul:even a").each(function(){

	var link = $(this);
	var text = $(this).text();
	if (text != "avez donné la note" && text != "devez noter")
	{
		text = text.replace(/.* (.*)$/, "$1");
		$.ajax({
			url: "https://dashboard.42.fr/crawler/pull/" + text + "/",
			dataType: "json",
			success: function(result){
				link.after(' (<span class="tracksuccess">' + result.last_host.replace(".42.fr", "") + "</span>)");
			},
			error: function(result){
				link.after(' (<span class="trackerror">Logged out</span>)');
			}
		});
	}

});

$(".peering ul:odd a[title]").each(function(){

	var link = $(this);
	$.ajax({
		url: "https://dashboard.42.fr/crawler/pull/" + link.text() + "/",
		dataType: "json",
		success: function(result){
			link.after(' (<span class="tracksuccess">' + result.last_host.replace(".42.fr", "") + "</span>)");
		},
		error: function(result){
			link.after(' (<span class="trackerror">Logged out</span>)');
		}
	});

});

$(document).on('DOMNodeInserted', function(e) {

	var that = e.target.firstChild;
	$('.ncompletion').css("height", "");
	$('.ncompletion').css("max-height", "300px");
	if (that && that.className == "col1 login")
	{
		$('.ncompletion').css("width", "400px");
		var text = that.innerText;
		var magic = text.match(/^.*\((.*)\)/);
		$.ajax({
			url: "https://dashboard.42.fr/crawler/pull/" + magic[1] + "/",
			dataType: "json",
			success: function(result)
			{
				$(that).html(text + '<br>(<span class="tracksuccess">' + result.last_host.replace(".42.fr", "") + "</span>)");
			},
			error: function(){
				$(that).html(text + ' (<span class="trackerror">x</span>)');
			}
		});
	}

});
