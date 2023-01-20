const Grid = document.getElementById('car-grid');
const Stuff = [
	{
		Name: '1968 Mercury Cougar XR7',
		Def: '2 Door Coupe, 3.8 Liter V Engine, Automatic Transmission, Only 58,095 Original',
		Img: '../imgs/1968-Mercury-Cougar-XR7.jpg',
		Cost: '$49,000',
		Odometer: '76351',
	},
	{
		Name: '1968 Chevrolet C10',
		Def: 'Small Block 350ci with a healthy cam with 3 core aluminum radiator',
		Img: '../imgs/1968-Chevrolet-C10.jpg',
		Cost: '$32,995',
		Odometer: '32000',
	},
	{
		Name: '1969 Chevrolet Camaro RS Z28',
		Def: 'X-33 Z/28 that had a complete rotisserie restoration years ago',
		Img: '../imgs/1969-Chevrolet-Camaro-RS-Z28.jpg',
		Cost: '$109,900',
		Odometer: '110,000',
	},
	{
		Name: '2016 Jeep Renegade Limited',
		Def: '4WD/AWD, Front Seat Heaters, Leather Seats, Remote Start, Bluetooth Technology',
		Img: '../imgs/hero.png',
		Cost: '$19,998',
		Odometer: '64,000',
	},
	{
		Name: '2017 Honda Civic Type R',
		Def: 'Bluetooth Technology, Smart Key, Rear Spoiler, Turbo Charged Engine',
		Img: '../imgs/hondaCivic.png',
		Cost: '$40,998',
		Odometer: '21,000',
	},
	{
		Name: '2017 Ford Mustang GT',
		Def: 'Smart Key, Rear Defroster, Bluetooth Technology, Air Conditioning',
		Img: '../imgs/mustang.png',
		Cost: '$35,998',
		Odometer: '18,000',
	},
	{
		Name: '2021 Toyota Supra 3.0 Premium',
		Def: 'Navigation System, Head Up Display, Leather Seats, Rear View Camera, Front Seat Heaters',
		Img: '../imgs/supra.png',
		Cost: '$52,998',
		Odometer: '35,000',
	},
];

for (let index = 0; index < Stuff.length; index++) {
	const element = Stuff[index];
	Grid.innerHTML += `
    <div class="grid-item">
        <img class="image" src="${element.Img}">
        <div class="info-container">
            <div class="item-title">${element.Name}</div>
            <div class="item-description">${element.Def}</div>
            <div class="odometer">Mileage: ${element.Odometer}</div>
            <div class="item-cost">${element.Cost}</div>
        </div>
    </div>`;
}

/*

    {
        "Name":"",
        "Def":"",
        "Img":"../imgs/",
        "Cost":"",
        "Odometer":""
    
    },

*/
