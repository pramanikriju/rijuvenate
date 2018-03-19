'use strict';

var _ref3;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COLORS = {
  RED: '#ff0000',
  YELLOW: '#FFCEA5',
  BLACK: '#29363B',
  WHITE: 'white',
  VINOUS: 'purple'
};

var DURATION = 500;
var CNT = 10;
var PARENT_H = 50;
var BURST_R = 75;
var SHIFT = 300;

var makeDust = function makeDust() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;


  var parent = new mojs.Shape({
    left: 0, top: 0,
    width: 200,
    height: 50,
    radius: 0,
    x: { 0: dir * SHIFT },
    duration: 1.2 * DURATION,
    isShowStart: true,
    isTimelineLess: true,
    isForce3d: true
  });

  parent.el.style['overflow'] = 'hidden';

  var burst = new mojs.Burst({
    parent: parent.el,
    count: CNT,
    top: PARENT_H + BURST_R,
    degree: 90,
    radius: BURST_R,
    angle: dir === -1 ? _defineProperty({}, -90, 40) : _defineProperty({}, 0, -130),
    children: {
      fill: 'white',
      delay: dir === -1 ? 'stagger(' + DURATION + ', -' + DURATION / CNT + ')' : 'stagger(' + DURATION / CNT + ')',
      radius: 'rand(8, 25)',
      direction: -1,
      isSwirl: true,
      isForce3d: true
    }
  });

  var fadeBurst = new mojs.Burst({
    parent: parent.el,
    count: 2,
    degree: 0,
    angle: -1 * dir * 75,
    radius: { 0: 100 },
    top: '90%',
    timeline: { delay: .8 * DURATION },
    children: {
      fill: 'white',
      pathScale: [.65, 1],
      radius: 'rand(12, 15)',
      direction: [dir, -1 * dir],
      isSwirl: true,
      isForce3d: true
    }
  });

  var timeline = new mojs.Timeline();
  timeline.add(parent, burst, fadeBurst);

  return { parent: parent, timeline: timeline };
};

var circle = new mojs.Shape((_ref3 = {
  left: 0, top: 0,
  strokeWidth: 10,
  fill: 'none',
  radius: 150,
  scale: { 0: 1 },
  opacity: { 1: 0 },
  shape: 'circle',
  stroke: 'white'
}, _defineProperty(_ref3, 'strokeWidth', 10), _defineProperty(_ref3, 'fill', 'none'), _defineProperty(_ref3, 'duration', 1.5 * DURATION), _defineProperty(_ref3, 'isForce3d', true), _defineProperty(_ref3, 'isTimelineLess', true), _ref3));

var cloud = new mojs.Burst({
  left: 0, top: 0,
  radius: { 4: 49 },
  angle: 45,
  count: 12,
  children: {
    radius: 10,
    fill: 'white',
    scale: { 1: 0, easing: 'sin.in' },
    pathScale: [.7, null],
    degreeShift: [13, null],
    duration: [500, 700],
    isShowEnd: false,
    isForce3d: true
  }
});

var burst = new mojs.Burst({
  left: 0, top: 0,
  radius: { 0: 280 },
  count: 2,
  angle: 90,
  children: {
    shape: 'rect',
    fill: COLORS.VINOUS,
    radius: 15,
    duration: DURATION,
    isForce3d: true
  }
});

var burst2 = new mojs.Burst({
  left: 0, top: 0,
  count: 5,
  radius: { 0: 150 },
  angle: 90,
  children: {
    shape: 'line',
    stroke: COLORS.VINOUS,
    strokeWidth: 5,
    strokeLinecap: 'round',
    radius: 25,
    // angle:    {  0: 360  },
    scale: 1,
    scaleX: { 1: 0 },
    duration: DURATION,
    isForce3d: true
  }
});

var dust1 = makeDust(-1);
var dust2 = makeDust(1);

var timeline = new mojs.Timeline();
timeline.add(dust1.timeline, dust2.timeline).add(circle, cloud, burst, burst2);

document.addEventListener('click', function (e) {
  var x = e.pageX,
      y = e.pageY;

  var coords = { x: x, y: y };
  circle.tune(coords);cloud.tune(coords);
  burst.tune(coords);burst2.tune(coords);
  dust1.parent.tune({ x: _defineProperty({}, x, x - SHIFT), y: y });
  dust2.parent.tune({ x: _defineProperty({}, x, x + SHIFT), y: y });
  timeline.replay();
    var delay = 1000    
});

// new MojsPlayer({ add: timeline, isPlaying: true, isRepeat: true });