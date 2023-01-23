API = 'https://api.github.com/repos/dragonslayrr/dragonslayrr.github.io/contents';
var LocalStorage = window.localStorage;
var Cookies;
var Cookie;

CheckNewData = () => {
	Cookie = document.cookie.replace(' ', '').search('CheckData');
	if (Cookie == -1) {
		const d = new Date();
		d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = 'CheckData ' + '=' + ';' + expires + ';path=/';
		GetData();
	}
};
HandelData = (FileData) => {
	LocalStorage.setItem('Data', JSON.stringify(FileData));
};
GetData = () => {
	fetch(API, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		method: 'GET',
	})
		.then((response) => response.json())
		.then((response) => {
			HandelData(response);
		})
		.catch((Error) => {
			console.log(Error);
		});
};
CheckNewData();
Data = JSON.parse(localStorage.Data);
FRAGMENT = document.createDocumentFragment();
Data.forEach((Data) => {
	if (Data.type != 'dir') return;
	NewList = document.createElement('li');
	NewListA = document.createElement('a');
	NewListA.innerText = Data.name.toUpperCase();
	NewListA.setAttribute('href', `https://dragonslayrr.github.io/${Data.name}`);
	NewList.appendChild(NewListA);
	FRAGMENT.appendChild(NewList);
});
document.getElementsByTagName('ul')[0].appendChild(FRAGMENT);
