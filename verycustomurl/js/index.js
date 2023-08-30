TitleElement = $("#Title")[0]
MainPage = document.getElementById("MainPageBody")
HomePage = document.getElementById("HomePage")
TitleElement.style.opacity = 1

function HandlePage(E) {
	Pages = {
		Home: 0,
		"Work in progress": HomePage.clientHeight + 10,
		Games: (HomePage.clientHeight + 10) * 2,
		"Meet The Team": (HomePage.clientHeight + 10) * 3
	}
	MainPage.scrollTo({
		top: Pages[E.innerText],
		behavior: "smooth"
	})
}
// class Timer {
// 	constructor(Function, Duration) {
// 		this.Timer = setTimeout(() => {
// 			Function()
// 			clearInterval(this.Update)
// 			this.CurrentTime = 0
//          this.EndTime = 0
// 		}, Duration)
// 		this.EndTime = new Date().getTime() + Duration
// 		this.CurrentTime = 0
// 		this.Update = setInterval(() => {
// 			this.CurrentTime = this.EndTime - new Date().getTime()
// 		}, 0)
// 	}
// 	GetTime() {
// 		var minutes = Math.floor(this.CurrentTime / 60000)
// 		var seconds = ((this.CurrentTime % 60000) / 1000).toFixed(0)
// 		return minutes + ":" + (this.CurrentTime < 10 ? "0" : "") + seconds
// 	}
// }

$("#MainPageBody").scroll(function (T) {
	var c = (MainPage.scrollHeight - MainPage.clientHeight) / MainPage.scrollTop
	TitleElement.style.height = Math.min(Math.max((c / 400).toFixed(1), 0), 100) + "%"
	TitleElement.style.opacity = Math.min(Math.max((c / 1000).toFixed(1), 0), 1)
	// console.log(c / 10)
	// T.eventPhase
	// 	TempIndex = 0
	// 	console.log("Test")
	// 	for (let index = 0; index < document.getElementsByClassName("Test").length; index++) {
	// 		const element = document.getElementsByClassName("Test")[index]
	// 		if (IsInViewport(element) && !$(element).hasClass("Animatied")) {
	// 			TempIndex++
	// 			LerpAnimate(
	// 				0, //Start
	// 				40, //End
	// 				(3000 * TempIndex) / 0.9, //Duration
	// 				120, //FPS
	// 				false, //Reverse
	// 				(Value, ArgsTable) => {
	// 					$(element).addClass("Animatied")
	// 					return element
	// 				}, //Start Callback
	// 				(Value, ArgsTable) => {
	// 					ArgsTable[0].Args.style.top = Value + "vh"
	// 				}, //Callback
	// 				(Value, ArgsTable) => {
	// 					$(element).addClass("DoneAnimatied")
	// 				}, //Done Callback
	// 				easeOutElastic //EaseFunction
	// 			)
	// 		}
	// 		if (!IsInViewport(element) && !$(element).hasClass("BackAnimatied") && $(element).hasClass("DoneAnimatied")) {
	// 			LerpAnimate(
	// 				0, //Start
	// 				40, //End
	// 				1, //Duration
	// 				120, //FPS
	// 				true, //Reverse
	// 				(Value, ArgsTable) => {
	// 					$(element).addClass("BackAnimatied")
	// 					return element
	// 				}, //Start Callback
	// 				(Value, ArgsTable) => {
	// 					ArgsTable[0].Args.style.top = Value + "vh"
	// 				}, //Callback
	// 				(Value, ArgsTable) => {
	// 					$(ArgsTable[0].Args).removeClass("BackAnimatied")
	// 					$(ArgsTable[0].Args).removeClass("Animatied")
	// 					$(ArgsTable[0].Args).removeClass("DoneAnimatied")
	// 				}, //Done Callback
	// 				easeOutElastic //EaseFunction
	// 			)
	// 		}
	// 	}
	// 	TempIndex = 0
})

// $("#MainPageBody")(function () {
// 	console.log("test")
// 	for (let index = 0; index < TargetElements.length; index++) {
// 		const element = TargetElements[index]
// 		if (getElementVisibility(element)) {
// 			LerpAnimate(
// 				0, //Start
// 				680, //End
// 				7000, //Duration
// 				(Value) => {
// 					element.style.right = Value + "px"
// 				}, //Callback
// 				120, //FPS
// 				true, //Reverse
// 				easeOutElastic, //EaseFunction
// 				(Value) => {} //Done Callback
// 			)
// 		}
// 	}
// })
// Start,
// 	End,
// 	Duration,
// 	(FPS = 120),
// 	(Reverse = false),
// 	(StartCallBack = (Value) => {}),
// 	CallBackFunction,
// 	(EaseFunction = (T) => {
// 		return T
// 	}),
// 	(DoneCallBack = (Value) => {})
