x = prompt("File?")
x = x.toString();
x = `./Num${x}.txt`

class InfiniteScroll {
	constructor(Element, Options) {
		this.Element = Element;
		this.Options = Options;
		this.FetchDataLoaded = '';
		this.FetchDataLoadedArray = [];
		this.Options.FetchDataFunction = async () => {
			await this.Options.FetchData.forEach(async (Data, Index) => {
				await fetch(Data)
					.then(async (Data) => await Data.text())
					.then(async (Data) => {
						this.FetchDataLoaded += Data;
					});
				console.log(Data);
			});
			setTimeout(() => {
				this.FetchDataLoadedArray = this.FetchDataLoaded.split('\n').reduce((all, one, i) => {
					const ch = Math.floor(i / 300);
					all[ch] = [].concat(all[ch] || [], one);
					return all;
				}, []);
				this.Options.LoadData(this.Element, this);
			}, this.Options.LoadWait);
		};
		this.LoadedElement = [];
		this.EndOfData = false;
		this.Page = 0;
		this.Element.addEventListener('scroll', (e) => this.Update(e));
		this.Options.FetchDataFunction();
	}
	Update() {
		this.documentHeight = this.Element.scrollHeight;
		this.currentScroll = this.Element.scrollTop + window.innerHeight;
		// When the user is [modifier]px from the bottom, fire the event.
		if (this.currentScroll + (this.Options.modifier || 0) >= this.documentHeight) {
			if (!this.EndOfData) {
				this.Page++;
			}
			this.Options.LoadData(this.Element, this);
		}
	}
}

Inf = new InfiniteScroll(document.getElementsByTagName('Container')[0], {
	LoadWait: 2050,
	FetchData: [x],
	LoadData: async (E, Inf) => {
		Inf.FetchDataLoadedArray[Inf.Page].forEach((Color) => {
			NewElement = document.createElement('div');
			NewElement.setAttribute('style', `background:${Color}`);
			E.appendChild(NewElement);
			Inf.LoadedElement.push(NewElement);
		});
	},
});
/*
			NewArray = 
			console.log(NewArray[Inf.Page][NewArray[Inf.Page].length - 1]);
			NewArray[Inf.Page].forEach((Color) => {
				NewElement = document.createElement('div');
				NewElement.setAttribute('style', `background:${Color}`);
				E.appendChild(NewElement);
				Inf.LoadedElement.push(NewElement);
			});
*/
