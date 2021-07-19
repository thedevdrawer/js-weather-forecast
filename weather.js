jQuery(function ($) {
	$.fn.weatherForecast = function (settings) {
		var defaults = {
			appID: "your-app-id-here",
			city: "",
			region: "",
			country: "",
			count: 5,
			days: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
			today: "Today",
			text: {
				humidity: "Humidity",
				pressure: "Pressure",
				wind: "Wind",
			},
			unit: "imperial",
			lang: "en",
			icon: "/icons/",
			theme: {
				backgroundColor: "#fff",
				color: "#333",
				forceImageWhite: false,
				border: "1px solid #c0c0c0",
			},
			showCity: true,
			orientation: "horizontal",
		};
		var settings = $.extend(defaults, settings);
		return this.each(function () {
			settings.id = $(this).attr("id");

			getForecast();

			function getForecast() {
				var city = settings.city;
				var region = settings.region;
				var country = settings.country;
				if (city == "" && (region == "") & (country == "")) {
					var location = getLocation();
					city = location.city;
					region = location.region;
					country = location.country;
				}
				$.ajax({
					url:
						"//api.openweathermap.org/data/2.5/forecast/daily?q=" +
						city +
						"," +
						region +
						"," +
						country +
						"&appid=" +
						settings.appID +
						"&cnt=" +
						settings.count +
						"&units=" +
						settings.unit +
						"&lang=" +
						settings.lang,
					async: false,
					dataType: "json",
					success: function (data) {
						console.log(data);
						$.each(data.list, function (key, value) {
							var timestamp = value.dt;
							var a = new Date(timestamp * 1000);
							if (settings.count == 1) {
								if (key == 0) {
									var str =
										"<h2>" +
										settings.today +
										"</h2><img src='" +
										settings.icon +
										value.weather[0].icon +
										".png' class='img-fluid icon'><div class='temp'>" +
										value.temp.day.toFixed(0) +
										"&deg;<div class='description'>" +
										value.weather[0].description +
										"<br><br><div class='extra'><div class='span'><div class='inner'>" +
										value.humidity +
										"%<br><small>" +
										settings.text.humidity +
										"</small></div></div><div class='span'><div class='inner'>" +
										value.pressure +
										"hPa<br><small>" +
										settings.text.pressure +
										"</small></div></div><div class='span'><div class='inner'>" +
										value.speed +
										"<br><small>" +
										settings.text.wind +
										"</small></div></div></div>";
									("</div>");
								}
							} else {
								var str =
									'<div class="singleweather"><h3>' +
									settings.days[a.getDay()] +
									"</h3><img src='" +
									settings.icon +
									value.weather[0].icon +
									".png' class='img-fluid icon'><div class='temp'>" +
									value.temp.day.toFixed(0) +
									"&deg;<div class='description'>" +
									value.weather[0].description +
									"</div></div></div>";
							}
							$("#" + settings.id).append(str);
							if (settings.theme.forceImageWhite == true) {
								$("#" + settings.id + " img").css({
									filter: "brightness(0) invert(1)",
								});
							}
							$("#" + settings.id).css({
								"background-color": settings.theme.backgroundColor,
								color: settings.theme.color,
								border: settings.theme.border,
							});
						});
						if (settings.orientation != "horizontal") {
							$("#" + settings.id).addClass("vertical");
						}
						if (settings.showCity == true) {
							if (settings.count != 1) {
								$("#" + settings.id).before(
									"<h4 class='city'>" +
										city +
										"," +
										region +
										"," +
										country +
										"</h4>"
								);
							} else {
								$("#" + settings.id).append(
									"<h4 class='city'>" +
										city +
										"," +
										region +
										"," +
										country +
										"</h4>"
								);
							}
						}
					},
				});
			}

			function getLocation() {
				var ret = [];
				$.ajax({
					url: "//ipapi.co/json",
					async: false,
					dataType: "json",
					success: function (data) {
						ret = data;
					},
				});
				return ret;
			}
		});
	};
});
