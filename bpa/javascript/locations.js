const locDiv = document.getElementById('target');

let locationBlock = [
	{
		Address: '3031 Center Rd A, Brunswick, OH 44212',
		Hours: 'Sales Hours',
		monToFri: 'Monday - Friday: &nbsp <span class="right">9:00 AM - 8:00 PM</span>',
		Saturday: 'Saturday: &nbsp <span class="right">9:00 AM - 5:00 PM</span>',
		Sunday: 'Sunday: &nbsp <span class="right">Closed</span>',
	},
];

for (let index = 0; index < locationBlock.length; index++) {
	const element = locationBlock[index];
	locDiv.innerHTML += `
    <div id="location-format">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d668.2193144666041!2d-81.79603913213133!3d41.239130138454655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830c1461cee59ab%3A0x534f3e33257b9b56!2sBrunswick%20Auto%20Mart!5e0!3m2!1sen!2sus!4v1674133807643!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <ul class="loc">
                <li class="loc"><h3>${element.Address}</h3></li>
                <br>
                <li class="loc"><h3>${element.Hours}</h3>
                    <ul class="loc">
                        <li class="loc">${element.monToFri}</li>
                        <li class="loc">${element.Saturday}</li>
                        <li class="loc">${element.Sunday}</li>
                    </ul>
                </li>
            </ul>
    </div>`;
}

/* <div id="location-format">
            <img src="../imgs/testLocation.PNG" alt="Google Maps Screenshot">
            <ul>
                <li><h3>3581 Center Rd, Brunswick, OH 44212</h3></li>
                <br>
                <li><h3>Sales Hours</h3>
                    <ul>
                        <li>Monday - Friday <span class="right">9:00 AM - 8:00 PM</span></li>
                        <li>Saturday <span class="right">9:00 AM - 5:00 PM</span></li>
                        <li>Sunday - Friday <span class="right">Closed</span></li>
                    </ul>
                </li>
            </ul>
        </div> */
