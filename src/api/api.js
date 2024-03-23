const getApiData = (url) => {
	console.log(url);
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

export { getApiData };
