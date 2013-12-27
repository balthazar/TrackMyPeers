$.ajax({
	url: "https://dashboard.42.fr/crawler/pull/bgronon",
	dataType: "json",
	success: function(result){
		console.log(result);
	},
	error: function(result){
		console.log("logout");
	}
});