$(".peering").css("width", "40%");
$(".final_note").css("width", "24%");

$(".peering ul:first a").each(function(){

	$(this).text($(this).text().replace("noter le groupe " + $(".peering h3:first a:last").text(), "noter "));
	var link = $(this);
	var text = link.text().replace("devez noter  ", "")
	$.ajax({
		url: "https://dashboard.42.fr/crawler/pull/" + text + "/",
		dataType: "json",
		success: function(result){
			if (link.next().id != "review" + text)
				link.after(" (" + result.last_host.replace(".42.fr", "") + ")");
		},
		error: function(result){
			if (link.next().id != "review" + text)
				link.after(" (Logout)");
		}
	});
});

$(".peering a[title]").each(function(){

	var link = $(this);
	$.ajax({
		url: "https://dashboard.42.fr/crawler/pull/" + link.text() + "/",
		dataType: "json",
		success: function(result){
			if (link.next().id != "correc" + link.text())
				link.after(" (" + result.last_host.replace(".42.fr", "") + ")");
		},
		error: function(result){
			if (link.next().id != "correc" + link.text())
				link.after(" (Logout)");
		}
	});
});
