jQuery(function ($) {
	jQuery("#example1").weatherForecast({
		city: "Los Angeles",
		region: "Cailfornia",
		country: "US",
		count: 1,
		theme: {
			backgroundColor: "red",
			color: "#fff",
			forceImageWhite: true,
			border: "0px",
		},
	});
	jQuery("#example2").weatherForecast({
		city: "New York",
		region: "New York",
		country: "US",
		count: 1,
		theme: {
			backgroundColor: "green",
			color: "#fff",
			forceImageWhite: true,
			border: "0px",
		},
	});
	jQuery("#example3").weatherForecast({
		city: "New York",
		region: "New York",
		country: "US",
		count: 1,
		theme: {
			backgroundColor: "gold",
			color: "#333",
			border: "0px",
		},
	});

	jQuery("#example4").weatherForecast({
		city: "Lima",
		region: "Peru",
		country: "PE",
		count: 7,
		days: [
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
		],
		lang: "es",
	});

	jQuery("#example5").weatherForecast({
		count: 3,
		orientation: "vertical",
		city: "Lima",
		region: "Peru",
		country: "PE",
        theme: {
			backgroundColor: "red",
			color: "#fff",
			border: "0px",
            forceImageWhite: true
		},
	});
});
