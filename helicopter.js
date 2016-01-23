// based on https://github.com/freinbichler/3d-touch
var touchElement = document.getElementById('forcearea');
var forceTextElement = document.getElementById('peso');
var helicopterElement = document.getElementById('helicopter');
var forceValue = 0;
var tareValue = 0;

var screenHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

function onTouchStartMove(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  touch = null;
}

function checkForce(e) {
  if (e.target.id == "buttonarea" || e.target.id == "tareButton") {
    tare();
  } else {
    touch = e.touches[0];
    setTimeout(refreshforceValue.bind(touch), 10);
  }
}

function checkMacForce(e) {
  // max value for trackpad is 3.0 compare to 1.0 on iOS
  forceValue = e.webkitForce / 3;
  // forceTextElement.innerHTML = ((forceValue - tareValue) * 1000).toFixed(2) + " <br><span style=\"color:red\">Uncalibrated for Mac, press \"t\" to tare.</span>";
}

function refreshforceValue() {
  var touchEvent = this;

  forceValue = 0;
  if (touchEvent) {
    forceValue = touchEvent.force || 0;
    setTimeout(refreshforceValue.bind(touch), 10);
  }
  //Remove the tareValue from the returned value
  var up = screenHeight / 385;
  var height = (fourceValue * up) / 385;

  helicopterElement.style.marginBottom = height + 'px';
}

function keypress(e) {
  if (e.keyCode == 116) {
    tare();
  }
}

function tare() {
  tareValue = forceValue;
}

(function() {
  touchElement.addEventListener('touchstart', onTouchStartMove, false);
  touchElement.addEventListener('touchmove', onTouchStartMove, false);
  touchElement.addEventListener('touchend', onTouchEnd, false);
  touchElement.addEventListener('webkitmouseforcewillbegin', checkMacForce, false);
  touchElement.addEventListener('webkitmouseforcechanged', checkMacForce, false);
  document.addEventListener('keypress', keypress, false)
})();
