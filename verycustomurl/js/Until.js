const getElementVisibility = (element) => {
	const rect = element.getBoundingClientRect()
	return !(rect.top > window.innerHeight || rect.bottom < 0)
}
const IsInViewport = (element) => {
	var bounding = element.getBoundingClientRect()
	return bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
}
function easeOutElastic(x) {
	const c4 = (2 * Math.PI) / 3
	return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -15 * x) * Math.sin((x * 5 - 1) * c4) + 1
}

const LerpAnimate = (
	Start,
	End,
	Duration,
	FPS = 120,
	Reverse = false,
	StartCallBack = (Value, ArgsTable) => {
		return null
	},
	CallBackFunction = (Value, ArgsTable) => {
		return null
	},
	DoneCallBack = (Value, ArgsTable) => {
		return null
	},
	EaseFunction = (T) => {
		return T
	}
) => {
	let Value = Start
	let StartTime = Date.now()
	let lerp = (start, end, t) => {
		return start * (1 - t) + end * t
	}
	let ArgsTable = [
		(Name = {
			Name: "Start",
			Args: []
		}),
		{
			Name: "Going",
			Args: []
		},
		{
			Name: "Done",
			Args: []
		}
	]
	StartArg = StartCallBack(Value, ArgsTable)
	ArgsTable[0].Args = StartArg
	if (Reverse) {
		CheckValue = End
	} else {
		CheckValue = Start
	}
	let Update = setInterval(function () {
		let Progress = Date.now() - StartTime
		if (Progress < Duration || Math.round(Value) == CheckValue) {
			let Pct = EaseFunction(Progress / Duration)
			if (Reverse) {
				Pct = 1 - Pct
			}
			Value = lerp(Start, End, Pct)
			GoingArgs = CallBackFunction(Value, ArgsTable)
			ArgsTable[1].Args = GoingArgs
		} else {
			Value = Math.round(Value)
			GoingArgs = CallBackFunction(Value, ArgsTable)
			DoneArgs = DoneCallBack(Value, ArgsTable)
			ArgsTable[1].Args = GoingArgs
			ArgsTable[2].Args = DoneArgs
			clearInterval(Update)
		}
	}, 1000 / FPS)
	return Update
}

// LerpAnimate(
// 	0, //Start
// 	680, //End
// 	7000, //Duration
// 	120, //FPS
// 	true, //Reverse
// 	(Value) => {}, //Start Callback
// 	(Value) => {}, //Callback
// 	(Value) => {}, //Done Callback
// 	easeOutElastic //EaseFunction
// )
