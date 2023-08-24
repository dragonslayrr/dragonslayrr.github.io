let Pos = 90;
const duration = 1750;
let CurrentAnim = null;
let Anims = [];
$(window).scroll(function (ScrollThing) {
  for (let index = 0; index < document.getElementsByClassName("Anim").length; index++) {
    const element = document.getElementsByClassName("Anim")[index];
    if (Anims.length == 0) {
      if (isScrolledIntoView(element) && Anims[0] == null) {
        startTime = Date.now();
        Anims.push({ Element: element, Pos: 90 });
      }
      if (isScrolledOutView(element) && Anims[0] != null) {
        startTime = Date.now();
        Anims.splice(0, 1);
      }
    }
    Anims.forEach((Index, Anim) => {
      console.log(Anim["Element"]);
      if (isScrolledIntoView(Anim.Element) && Anim.Element == null) {
        startTime = Date.now();
        Anims.push({ Element: element, Pos: 90 });
      }
      if (isScrolledOutView(Anim.Element) && Anim.Element != null) {
        startTime = Date.now();
        Anims.splice(Index, 1);
      }
    });
  }
});

function Update() {
  const elapsed = Date.now() - startTime;
  Anims.forEach((Anim) => {
    if (Anim.Element == null) return;
    T = easeOutElastic(elapsed / duration);
    if (elapsed < duration) {
      Anim.Pos = lerp(90, 0, T);
    }

    Anim.Element.style.right = `${Anim.Pos}%`;
  });

  requestAnimationFrame(Update);
}

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

const lerp = (start, end, speed) => start + (end - start) * speed;
function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x);
}
function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 2;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -9 * x) * Math.sin((x * 4 - 0.75) * c4) + 1;
}
function isScrolledIntoView(elem) {
  var $elem = $(elem);
  var $window = $(window);

  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();

  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

function isScrolledOutView(elem) {
  var $elem = $(elem);
  var $window = $(window);

  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();

  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();

  return elemTop <= docViewBottom && elemBottom <= docViewTop;
}
startTime = Date.now();
aF = requestAnimationFrame(Update);
