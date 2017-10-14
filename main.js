(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @module  color-alpha
 */
const parse = require('color-parse');

module.exports = alpha;

function alpha (color, value) {
	let obj = parse(color);

	if (value == null) value = obj.alpha;

	//catch percent
	if (obj.space[0] === 'h') {
		return obj.space + `a(${obj.values[0]},${obj.values[1]}%,${obj.values[2]}%,${value})`;
	}

	return obj.space + `a(${obj.values},${value})`;
}
},{"color-parse":4}],2:[function(require,module,exports){
/**
 * @module  color-interpolate
 * Pick color from palette by index
 */

const parse = require('color-parse');
const hsl = require('color-space/hsl');
const lerp = require('lerp');
const clamp = require('mumath/clamp');

module.exports = interpolate;

function interpolate (palette) {
	palette = palette.map(c => {
		c = parse(c);
		if (c.space != 'rgb') {
			if (c.space != 'hsl') throw `${c.space} space is not supported.`;
			c.values = hsl.rgb(c.values);
		}
		c.values.push(c.alpha);
		return c.values;
	});

	return (t, mix = lerp) => {
		t = clamp(t, 0, 1);

		let idx = ( palette.length - 1 ) * t,
			lIdx = Math.floor( idx ),
			rIdx = Math.ceil( idx );

		t = idx - lIdx;

		let lColor = palette[lIdx], rColor = palette[rIdx];

		let result = lColor.map((v, i) => {
			v = mix(v, rColor[i], t);
			if (i < 3) v = Math.round(v);
			return v;
		});

		if (result[3] === 1) {
			return `rgb(${result.slice(0,3)})`;
		}
		return `rgba(${result})`;
	};
}

},{"color-parse":4,"color-space/hsl":5,"lerp":10,"mumath/clamp":11}],3:[function(require,module,exports){
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],4:[function(require,module,exports){
(function (global){
/**
 * @module color-parse
 */

'use strict'


module.exports = parse;


var names = require('color-name');
var isObject = require('is-plain-obj');


/**
 * Base hues
 * http://dev.w3.org/csswg/css-color/#typedef-named-hue
 */
//FIXME: use external hue detector
var baseHues = {
	red: 0,
	orange: 60,
	yellow: 120,
	green: 180,
	blue: 240,
	purple: 300
};


/**
 * Parse color from the string passed
 *
 * @return {Object} A space indicator `space`, an array `values` and `alpha`
 */
function parse (cstr) {
	var m, parts = [], alpha = 1, space;

	if (typeof cstr === 'string') {
		//keyword
		if (names[cstr]) {
			parts = names[cstr].slice();
			space = 'rgb'
		}

		//reserved words
		else if (cstr === 'transparent') {
			alpha = 0;
			space = 'rgb'
			parts = [0,0,0]
		}

		//hex
		else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
			var base = cstr.slice(1);
			var size = base.length;
			var isShort = size <= 4;
			alpha = 1;

			if (isShort) {
				parts = [
					parseInt(base[0] + base[0], 16),
					parseInt(base[1] + base[1], 16),
					parseInt(base[2] + base[2], 16)
				]
				if (size === 4) {
					alpha = parseInt(base[3] + base[3], 16) / 255
				}
			}
			else {
				parts = [
					parseInt(base[0] + base[1], 16),
					parseInt(base[2] + base[3], 16),
					parseInt(base[4] + base[5], 16)
				]
				if (size === 8) {
					alpha = parseInt(base[6] + base[7], 16) / 255
				}
			}

			if (!parts[0]) parts[0] = 0;
			if (!parts[1]) parts[1] = 0;
			if (!parts[2]) parts[2] = 0;

			space = 'rgb'
		}

		//color space
		else if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
			var name = m[1];
			var base = name.replace(/a$/, '');
			space = base;
			var size = base === 'cmyk' ? 4 : base === 'gray' ? 1 : 3;
			parts = m[2].trim()
				.split(/\s*,\s*/)
				.map(function (x, i) {
					//<percentage>
					if (/%$/.test(x)) {
						//alpha
						if (i === size)	return parseFloat(x) / 100;
						//rgb
						if (base === 'rgb') return parseFloat(x) * 255 / 100;
						return parseFloat(x);
					}
					//hue
					else if (base[i] === 'h') {
						//<deg>
						if (/deg$/.test(x)) {
							return parseFloat(x);
						}
						//<base-hue>
						else if (baseHues[x] !== undefined) {
							return baseHues[x];
						}
					}
					return parseFloat(x);
				});

			if (name === base) parts.push(1);
			alpha = parts[size] === undefined ? 1 : parts[size];
			parts = parts.slice(0, size);
		}

		//named channels case
		else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
			parts = cstr.match(/([0-9]+)/g).map(function (value) {
				return parseFloat(value);
			});

			space = cstr.match(/([a-z])/ig).join('').toLowerCase();
		}
	}

	//numeric case
	else if (typeof cstr === 'number') {
		space = 'rgb'
		parts = [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff];
	}

	//object case - detects css cases of rgb and hsl
	else if (isObject(cstr)) {
		if (cstr.r != null) {
			parts = [cstr.r, cstr.g, cstr.b];
			space = 'rgb'
		}
		else if (cstr.red != null) {
			parts = [cstr.red, cstr.green, cstr.blue];
			space = 'rgb'
		}
		else if (cstr.h != null) {
			parts = [cstr.h, cstr.s, cstr.l];
			space = 'hsl';
		}
		else if (cstr.hue != null) {
			parts = [cstr.hue, cstr.saturation, cstr.lightness];
			space = 'hsl';
		}

		if (cstr.a != null) alpha = cstr.a;
		else if (cstr.alpha != null) alpha = cstr.alpha;
		else if (cstr.opacity != null) alpha = cstr.opacity / 100;
	}

	//array
	else if (Array.isArray(cstr) || global.ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(cstr)) {
		parts = [cstr[0], cstr[1], cstr[2]];
		space = 'rgb'
		alpha = cstr.length === 4 ? cstr[3] : 1;
	}

	return {
		space: space,
		values: parts,
		alpha: alpha
	};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"color-name":3,"is-plain-obj":8}],5:[function(require,module,exports){
/**
 * @module color-space/hsl
 */
'use strict'

var rgb = require('./rgb');

module.exports = {
	name: 'hsl',
	min: [0,0,0],
	max: [360,100,100],
	channel: ['hue', 'saturation', 'lightness'],
	alias: ['HSL'],

	rgb: function(hsl) {
		var h = hsl[0] / 360,
				s = hsl[1] / 100,
				l = hsl[2] / 100,
				t1, t2, t3, rgb, val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		}
		else {
			t2 = l + s - l * s;
		}
		t1 = 2 * l - t2;

		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * - (i - 1);
			if (t3 < 0) {
				t3++;
			}
			else if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			}
			else if (2 * t3 < 1) {
				val = t2;
			}
			else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			}
			else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	}
};


//extend rgb
rgb.hsl = function(rgb) {
	var r = rgb[0]/255,
			g = rgb[1]/255,
			b = rgb[2]/255,
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			h, s, l;

	if (max === min) {
		h = 0;
	}
	else if (r === max) {
		h = (g - b) / delta;
	}
	else if (g === max) {
		h = 2 + (b - r) / delta;
	}
	else if (b === max) {
		h = 4 + (r - g)/ delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	}
	else if (l <= 0.5) {
		s = delta / (max + min);
	}
	else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

},{"./rgb":6}],6:[function(require,module,exports){
/**
 * RGB space.
 *
 * @module  color-space/rgb
 */
'use strict'

module.exports = {
	name: 'rgb',
	min: [0,0,0],
	max: [255,255,255],
	channel: ['red', 'green', 'blue'],
	alias: ['RGB']
};

},{}],7:[function(require,module,exports){
'use strict'

/**
 * Count up and down between two numbers.
 * @param {Number} min - Minimum number.
 * @param {Number} max - Maximum number.
 * @param {Number} initial - Initial number.
 * @returns {Function} instance - Count-between instance. Expects the following properties: modifier.
 */
module.exports = function(min, max, initial) {

	const length = max - min + 1

	let index = initial - min

	return (modifier = 0) => {

		index = (index + modifier) % length

		if (index>=0) index = 0 + index
		if (index<0)  index = length + index

		return min + index

	}

}
},{}],8:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

},{}],9:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Jump = factory());
}(this, (function () { 'use strict';

// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

return singleton;

})));

},{}],10:[function(require,module,exports){
function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
module.exports = lerp
},{}],11:[function(require,module,exports){
/**
 * Clamp value.
 * Detects proper clamp min/max.
 *
 * @param {number} a Current value to cut off
 * @param {number} min One side limit
 * @param {number} max Other side limit
 *
 * @return {number} Clamped value
 */
'use strict';
module.exports = function(a, min, max){
	return max > min ? Math.max(Math.min(a,max),min) : Math.max(Math.min(a,min),max);
};

},{}],12:[function(require,module,exports){
'use strict';

var _helpers = require('./_helpers');

var _color = require('./_color');

var run = (0, _helpers.single)(_color.steps);
var points = (0, _helpers.fifo)(_color.steps);

var header = document.querySelector('.header');
var canvas = document.querySelector('.canvas');
var context = canvas.getContext('2d');

var fixed = void 0;
var width = void 0;
var height = void 0;
var ratio = void 0;

var _x = void 0;
var _y = void 0;

var init = function init() {

	// Same as max-height in header and content CSS
	var minHeight = 750;

	var doc = document.documentElement;
	var header = document.querySelector('.header');

	var docSize = doc.getBoundingClientRect();
	var headerSize = header.getBoundingClientRect();

	fixed = docSize.height < minHeight ? false : true;
	width = headerSize.width;
	height = headerSize.height;
	ratio = window.devicePixelRatio;

	canvas.width = width * ratio;
	canvas.height = height * ratio;
};

var update = function update(e) {

	// Position calculation is different when hero is fixed
	var _ref = fixed === true ? (0, _helpers.positionFixed)(e) : (0, _helpers.positionRelative)(e),
	    x = _ref.x,
	    y = _ref.y;

	context.clearRect(0, 0, width * ratio, height * ratio);

	points({

		from: { x: _x, y: _y },
		to: { x: x, y: y }

	}).forEach(function (point, i) {

		var color = _color.gradient[i];

		context.beginPath();
		context.moveTo(point.from.x * ratio, point.from.y * ratio);
		context.lineTo(point.to.x * ratio, point.to.y * ratio);
		context.strokeStyle = color;
		context.lineWidth = 5 * ratio;
		context.stroke();
	});

	_x = x;
	_y = y;
};

// Safari calculates a wrong height for the header
// when calculating the height without a delay.
setTimeout(function () {

	init();

	window.addEventListener('resize', init);
	header.addEventListener('mousemove', function (e) {
		return run(function () {
			return update(e);
		});
	});
}, 500);

},{"./_color":13,"./_helpers":15}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.gradient = exports.steps = undefined;

var _countBetween = require('count-between');

var _countBetween2 = _interopRequireDefault(_countBetween);

var _helpers = require('./_helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h = [160, 280, 310, 340];

var elem = document.documentElement;
var index = (0, _countBetween2.default)(0, h.length - 1, 0);

var start = void 0;
var end = void 0;

var steps = exports.steps = 25;
var gradient = exports.gradient = void 0;

var update = function update() {

	var i = index();

	start = (0, _helpers.hsl)(h[i], 55, 45);
	end = (0, _helpers.hsl)(h[i] - 60, 45, 55);

	exports.gradient = gradient = (0, _helpers.alphaGradient)([start, end], steps);

	elem.style.setProperty('--start', start);
	elem.style.setProperty('--end', end);

	index(1);
};

elem.addEventListener('click', function (e) {

	var clickable = ['canvas', 'header__inner'];
	var isClickable = (0, _helpers.hasClassNames)(e.target, clickable);

	if (isClickable === false) return;

	update();
});

update();

},{"./_helpers":15,"count-between":7}],14:[function(require,module,exports){
"use strict";

if (NodeList.prototype.forEach == null) NodeList.prototype.forEach = Array.prototype.forEach;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.single = exports.positionRelative = exports.positionFixed = exports.fifo = exports.alphaGradient = exports.hsl = exports.hasClassNames = exports.createArray = undefined;

var _colorInterpolate = require('color-interpolate');

var _colorInterpolate2 = _interopRequireDefault(_colorInterpolate);

var _colorAlpha = require('color-alpha');

var _colorAlpha2 = _interopRequireDefault(_colorAlpha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createArray = exports.createArray = function createArray(length) {
	return Array.apply(null, Array(length));
};

var hasClassNames = exports.hasClassNames = function hasClassNames(elem, classNames) {
	return classNames.filter(function (className) {
		return elem.classList.contains(className);
	}).length > 0;
};

var hsl = exports.hsl = function hsl(h, s, l) {
	return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

var alphaGradient = exports.alphaGradient = function alphaGradient(colors, num) {

	var gradient = (0, _colorInterpolate2.default)(colors);

	return createArray(num).map(function (_, i, _ref) {
		var length = _ref.length;


		// Calculate value between 0 and 1 based on the total length
		var index = 1 / length * i;
		var color = gradient(index);

		return (0, _colorAlpha2.default)(color, index);
	});
};

var fifo = exports.fifo = function fifo(length) {

	var arr = [];

	return function (value) {

		if (value === undefined) return arr;
		if (arr.length >= length) arr.shift();

		arr.push(value);

		return arr;
	};
};

var positionFixed = exports.positionFixed = function positionFixed(e) {
	return {

		x: e.clientX,
		y: e.clientY

	};
};

var positionRelative = exports.positionRelative = function positionRelative(e) {
	return {

		x: e.pageX,
		y: e.pageY

	};
};

var single = exports.single = function single(max) {

	var id = void 0;
	var iterations = void 0;

	var loop = function loop(_id, fn) {

		if (id !== _id) return;
		if (max !== undefined && iterations >= max) return;

		++iterations;

		fn();
		requestAnimationFrame(function () {
			return loop(_id, fn);
		});
	};

	return function (fn) {

		id = Symbol();
		iterations = 0;

		loop(id, fn);

		return function () {
			return id = Symbol();
		};
	};
};

},{"color-alpha":1,"color-interpolate":2}],16:[function(require,module,exports){
'use strict';

var _jump = require('jump.js');

var _jump2 = _interopRequireDefault(_jump);

require('./_foreach');

require('./_color');

require('./_canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.querySelectorAll('a[href^="#"]').forEach(function (elem) {

	elem.onclick = function (e) {

		var href = elem.getAttribute('href');
		var target = document.querySelector(href);

		(0, _jump2.default)(target, {
			duration: 500,
			a11y: true
		});

		e.preventDefault();
		e.stopPropagation();
	};
});

},{"./_canvas":12,"./_color":13,"./_foreach":14,"jump.js":9}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29sb3ItYWxwaGEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29sb3ItaW50ZXJwb2xhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29sb3ItbmFtZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb2xvci1wYXJzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb2xvci1zcGFjZS9oc2wuanMiLCJub2RlX21vZHVsZXMvY29sb3Itc3BhY2UvcmdiLmpzIiwibm9kZV9tb2R1bGVzL2NvdW50LWJldHdlZW4vc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iai9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qdW1wLmpzL2Rpc3QvanVtcC5qcyIsIm5vZGVfbW9kdWxlcy9sZXJwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL211bWF0aC9jbGFtcC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9fY2FudmFzLmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL19jb2xvci5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9fZm9yZWFjaC5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9faGVscGVycy5qcyIsInNyYy9hc3NldHMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2RBOztBQUNBOztBQUVBLElBQU0sTUFBTSxrQ0FBWjtBQUNBLElBQU0sU0FBUyxnQ0FBZjs7QUFFQSxJQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLFNBQXZCLENB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QUU7O0FBSGtDLEVBQVI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNLDBCQUFTLFNBQVQsTUFBUyxDQUFDLEdBQUQsRUFBUzs7QUFFOUIsS0FBSSxXQUFKO0FBQ0EsS0FBSSxtQkFBSjs7QUFFQSxLQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsR0FBRCxFQUFNLEVBQU4sRUFBYTs7QUFFekIsTUFBSSxPQUFLLEdBQVQsRUFBYztBQUNkLE1BQUksUUFBTSxTQUFOLElBQW1CLGNBQVksR0FBbkMsRUFBd0M7O0FBRXhDLElBQUUsVUFBRjs7QUFFQTtBQUNBLHdCQUFzQjtBQUFBLFVBQU0sS0FBSyxHQUFMLEVBQVUsRUFBVixDQUFOO0FBQUEsR0FBdEI7QUFFQSxFQVZEOztBQVlBLFFBQU8sVUFBQyxFQUFELEVBQVE7O0FBRWQsT0FBSyxRQUFMO0FBQ0EsZUFBYSxDQUFiOztBQUVBLE9BQUssRUFBTCxFQUFTLEVBQVQ7O0FBRUEsU0FBTztBQUFBLFVBQU0sS0FBSyxRQUFYO0FBQUEsR0FBUDtBQUVBLEVBVEQ7QUFXQSxDQTVCTTs7Ozs7QUN4RFA7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsT0FBMUMsQ0FBa0QsVUFBQyxJQUFELEVBQVU7O0FBRTNELE1BQUssT0FBTCxHQUFlLFVBQUMsQ0FBRCxFQUFPOztBQUVyQixNQUFNLE9BQU8sS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQWI7QUFDQSxNQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQWY7O0FBRUEsc0JBQUssTUFBTCxFQUFhO0FBQ1osYUFBVSxHQURFO0FBRVosU0FBTTtBQUZNLEdBQWI7O0FBS0EsSUFBRSxjQUFGO0FBQ0EsSUFBRSxlQUFGO0FBRUEsRUFiRDtBQWVBLENBakJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBAbW9kdWxlICBjb2xvci1hbHBoYVxyXG4gKi9cclxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCdjb2xvci1wYXJzZScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhbHBoYTtcclxuXHJcbmZ1bmN0aW9uIGFscGhhIChjb2xvciwgdmFsdWUpIHtcclxuXHRsZXQgb2JqID0gcGFyc2UoY29sb3IpO1xyXG5cclxuXHRpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSBvYmouYWxwaGE7XHJcblxyXG5cdC8vY2F0Y2ggcGVyY2VudFxyXG5cdGlmIChvYmouc3BhY2VbMF0gPT09ICdoJykge1xyXG5cdFx0cmV0dXJuIG9iai5zcGFjZSArIGBhKCR7b2JqLnZhbHVlc1swXX0sJHtvYmoudmFsdWVzWzFdfSUsJHtvYmoudmFsdWVzWzJdfSUsJHt2YWx1ZX0pYDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBvYmouc3BhY2UgKyBgYSgke29iai52YWx1ZXN9LCR7dmFsdWV9KWA7XHJcbn0iLCIvKipcclxuICogQG1vZHVsZSAgY29sb3ItaW50ZXJwb2xhdGVcclxuICogUGljayBjb2xvciBmcm9tIHBhbGV0dGUgYnkgaW5kZXhcclxuICovXHJcblxyXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJ2NvbG9yLXBhcnNlJyk7XHJcbmNvbnN0IGhzbCA9IHJlcXVpcmUoJ2NvbG9yLXNwYWNlL2hzbCcpO1xyXG5jb25zdCBsZXJwID0gcmVxdWlyZSgnbGVycCcpO1xyXG5jb25zdCBjbGFtcCA9IHJlcXVpcmUoJ211bWF0aC9jbGFtcCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnBvbGF0ZTtcclxuXHJcbmZ1bmN0aW9uIGludGVycG9sYXRlIChwYWxldHRlKSB7XHJcblx0cGFsZXR0ZSA9IHBhbGV0dGUubWFwKGMgPT4ge1xyXG5cdFx0YyA9IHBhcnNlKGMpO1xyXG5cdFx0aWYgKGMuc3BhY2UgIT0gJ3JnYicpIHtcclxuXHRcdFx0aWYgKGMuc3BhY2UgIT0gJ2hzbCcpIHRocm93IGAke2Muc3BhY2V9IHNwYWNlIGlzIG5vdCBzdXBwb3J0ZWQuYDtcclxuXHRcdFx0Yy52YWx1ZXMgPSBoc2wucmdiKGMudmFsdWVzKTtcclxuXHRcdH1cclxuXHRcdGMudmFsdWVzLnB1c2goYy5hbHBoYSk7XHJcblx0XHRyZXR1cm4gYy52YWx1ZXM7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAodCwgbWl4ID0gbGVycCkgPT4ge1xyXG5cdFx0dCA9IGNsYW1wKHQsIDAsIDEpO1xyXG5cclxuXHRcdGxldCBpZHggPSAoIHBhbGV0dGUubGVuZ3RoIC0gMSApICogdCxcclxuXHRcdFx0bElkeCA9IE1hdGguZmxvb3IoIGlkeCApLFxyXG5cdFx0XHRySWR4ID0gTWF0aC5jZWlsKCBpZHggKTtcclxuXHJcblx0XHR0ID0gaWR4IC0gbElkeDtcclxuXHJcblx0XHRsZXQgbENvbG9yID0gcGFsZXR0ZVtsSWR4XSwgckNvbG9yID0gcGFsZXR0ZVtySWR4XTtcclxuXHJcblx0XHRsZXQgcmVzdWx0ID0gbENvbG9yLm1hcCgodiwgaSkgPT4ge1xyXG5cdFx0XHR2ID0gbWl4KHYsIHJDb2xvcltpXSwgdCk7XHJcblx0XHRcdGlmIChpIDwgMykgdiA9IE1hdGgucm91bmQodik7XHJcblx0XHRcdHJldHVybiB2O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHJlc3VsdFszXSA9PT0gMSkge1xyXG5cdFx0XHRyZXR1cm4gYHJnYigke3Jlc3VsdC5zbGljZSgwLDMpfSlgO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGByZ2JhKCR7cmVzdWx0fSlgO1xyXG5cdH07XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXHJcblx0XCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxyXG5cdFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXHJcblx0XCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXHJcblx0XCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXHJcblx0XCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxyXG5cdFwiYmxhY2tcIjogWzAsIDAsIDBdLFxyXG5cdFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxyXG5cdFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcclxuXHRcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXHJcblx0XCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxyXG5cdFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcclxuXHRcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcclxuXHRcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcclxuXHRcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcclxuXHRcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxyXG5cdFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxyXG5cdFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxyXG5cdFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxyXG5cdFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXHJcblx0XCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxyXG5cdFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcclxuXHRcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcclxuXHRcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXHJcblx0XCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxyXG5cdFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcclxuXHRcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcclxuXHRcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXHJcblx0XCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxyXG5cdFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXHJcblx0XCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxyXG5cdFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxyXG5cdFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcclxuXHRcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcclxuXHRcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxyXG5cdFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcclxuXHRcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxyXG5cdFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXHJcblx0XCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXHJcblx0XCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxyXG5cdFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcclxuXHRcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxyXG5cdFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxyXG5cdFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxyXG5cdFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJncmVlblwiOiBbMCwgMTI4LCAwXSxcclxuXHRcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxyXG5cdFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXHJcblx0XCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcclxuXHRcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxyXG5cdFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcclxuXHRcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcclxuXHRcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcclxuXHRcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcclxuXHRcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxyXG5cdFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXHJcblx0XCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxyXG5cdFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcclxuXHRcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxyXG5cdFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcclxuXHRcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcclxuXHRcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcclxuXHRcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxyXG5cdFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxyXG5cdFwibGlnaHRzZWFncmVlblwiOiBbMzIsIDE3OCwgMTcwXSxcclxuXHRcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXHJcblx0XCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXHJcblx0XCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXHJcblx0XCJsaW1lXCI6IFswLCAyNTUsIDBdLFxyXG5cdFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXHJcblx0XCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXHJcblx0XCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXHJcblx0XCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcclxuXHRcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXHJcblx0XCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXHJcblx0XCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTldLFxyXG5cdFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXHJcblx0XCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxyXG5cdFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcclxuXHRcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcclxuXHRcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcclxuXHRcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxyXG5cdFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcclxuXHRcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXHJcblx0XCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXHJcblx0XCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXHJcblx0XCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxyXG5cdFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXHJcblx0XCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxyXG5cdFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxyXG5cdFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXHJcblx0XCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxyXG5cdFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcclxuXHRcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxyXG5cdFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcclxuXHRcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxyXG5cdFwicGFsZXZpb2xldHJlZFwiOiBbMjE5LCAxMTIsIDE0N10sXHJcblx0XCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcclxuXHRcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXHJcblx0XCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxyXG5cdFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXHJcblx0XCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcclxuXHRcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxyXG5cdFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXHJcblx0XCJyZWJlY2NhcHVycGxlXCI6IFsxMDIsIDUxLCAxNTNdLFxyXG5cdFwicmVkXCI6IFsyNTUsIDAsIDBdLFxyXG5cdFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcclxuXHRcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcclxuXHRcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXHJcblx0XCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxyXG5cdFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcclxuXHRcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXHJcblx0XCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXHJcblx0XCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcclxuXHRcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXHJcblx0XCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcclxuXHRcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcclxuXHRcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXHJcblx0XCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxyXG5cdFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxyXG5cdFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcclxuXHRcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcclxuXHRcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxyXG5cdFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXHJcblx0XCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXHJcblx0XCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxyXG5cdFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxyXG5cdFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdLFxyXG5cdFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXHJcblx0XCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcclxuXHRcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBAbW9kdWxlIGNvbG9yLXBhcnNlXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcclxuXHJcblxyXG52YXIgbmFtZXMgPSByZXF1aXJlKCdjb2xvci1uYW1lJyk7XHJcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzLXBsYWluLW9iaicpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBCYXNlIGh1ZXNcclxuICogaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyN0eXBlZGVmLW5hbWVkLWh1ZVxyXG4gKi9cclxuLy9GSVhNRTogdXNlIGV4dGVybmFsIGh1ZSBkZXRlY3RvclxyXG52YXIgYmFzZUh1ZXMgPSB7XHJcblx0cmVkOiAwLFxyXG5cdG9yYW5nZTogNjAsXHJcblx0eWVsbG93OiAxMjAsXHJcblx0Z3JlZW46IDE4MCxcclxuXHRibHVlOiAyNDAsXHJcblx0cHVycGxlOiAzMDBcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUGFyc2UgY29sb3IgZnJvbSB0aGUgc3RyaW5nIHBhc3NlZFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgc3BhY2UgaW5kaWNhdG9yIGBzcGFjZWAsIGFuIGFycmF5IGB2YWx1ZXNgIGFuZCBgYWxwaGFgXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZSAoY3N0cikge1xyXG5cdHZhciBtLCBwYXJ0cyA9IFtdLCBhbHBoYSA9IDEsIHNwYWNlO1xyXG5cclxuXHRpZiAodHlwZW9mIGNzdHIgPT09ICdzdHJpbmcnKSB7XHJcblx0XHQvL2tleXdvcmRcclxuXHRcdGlmIChuYW1lc1tjc3RyXSkge1xyXG5cdFx0XHRwYXJ0cyA9IG5hbWVzW2NzdHJdLnNsaWNlKCk7XHJcblx0XHRcdHNwYWNlID0gJ3JnYidcclxuXHRcdH1cclxuXHJcblx0XHQvL3Jlc2VydmVkIHdvcmRzXHJcblx0XHRlbHNlIGlmIChjc3RyID09PSAndHJhbnNwYXJlbnQnKSB7XHJcblx0XHRcdGFscGhhID0gMDtcclxuXHRcdFx0c3BhY2UgPSAncmdiJ1xyXG5cdFx0XHRwYXJ0cyA9IFswLDAsMF1cclxuXHRcdH1cclxuXHJcblx0XHQvL2hleFxyXG5cdFx0ZWxzZSBpZiAoL14jW0EtRmEtZjAtOV0rJC8udGVzdChjc3RyKSkge1xyXG5cdFx0XHR2YXIgYmFzZSA9IGNzdHIuc2xpY2UoMSk7XHJcblx0XHRcdHZhciBzaXplID0gYmFzZS5sZW5ndGg7XHJcblx0XHRcdHZhciBpc1Nob3J0ID0gc2l6ZSA8PSA0O1xyXG5cdFx0XHRhbHBoYSA9IDE7XHJcblxyXG5cdFx0XHRpZiAoaXNTaG9ydCkge1xyXG5cdFx0XHRcdHBhcnRzID0gW1xyXG5cdFx0XHRcdFx0cGFyc2VJbnQoYmFzZVswXSArIGJhc2VbMF0sIDE2KSxcclxuXHRcdFx0XHRcdHBhcnNlSW50KGJhc2VbMV0gKyBiYXNlWzFdLCAxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChiYXNlWzJdICsgYmFzZVsyXSwgMTYpXHJcblx0XHRcdFx0XVxyXG5cdFx0XHRcdGlmIChzaXplID09PSA0KSB7XHJcblx0XHRcdFx0XHRhbHBoYSA9IHBhcnNlSW50KGJhc2VbM10gKyBiYXNlWzNdLCAxNikgLyAyNTVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cGFydHMgPSBbXHJcblx0XHRcdFx0XHRwYXJzZUludChiYXNlWzBdICsgYmFzZVsxXSwgMTYpLFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQoYmFzZVsyXSArIGJhc2VbM10sIDE2KSxcclxuXHRcdFx0XHRcdHBhcnNlSW50KGJhc2VbNF0gKyBiYXNlWzVdLCAxNilcclxuXHRcdFx0XHRdXHJcblx0XHRcdFx0aWYgKHNpemUgPT09IDgpIHtcclxuXHRcdFx0XHRcdGFscGhhID0gcGFyc2VJbnQoYmFzZVs2XSArIGJhc2VbN10sIDE2KSAvIDI1NVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFwYXJ0c1swXSkgcGFydHNbMF0gPSAwO1xyXG5cdFx0XHRpZiAoIXBhcnRzWzFdKSBwYXJ0c1sxXSA9IDA7XHJcblx0XHRcdGlmICghcGFydHNbMl0pIHBhcnRzWzJdID0gMDtcclxuXHJcblx0XHRcdHNwYWNlID0gJ3JnYidcclxuXHRcdH1cclxuXHJcblx0XHQvL2NvbG9yIHNwYWNlXHJcblx0XHRlbHNlIGlmIChtID0gL14oKD86cmdifGhzW2x2Yl18aHdifGNteWs/fHh5W3p5XXxncmF5fGxhYnxsY2h1P3Y/fFtseV11dnxsbXMpYT8pXFxzKlxcKChbXlxcKV0qKVxcKS8uZXhlYyhjc3RyKSkge1xyXG5cdFx0XHR2YXIgbmFtZSA9IG1bMV07XHJcblx0XHRcdHZhciBiYXNlID0gbmFtZS5yZXBsYWNlKC9hJC8sICcnKTtcclxuXHRcdFx0c3BhY2UgPSBiYXNlO1xyXG5cdFx0XHR2YXIgc2l6ZSA9IGJhc2UgPT09ICdjbXlrJyA/IDQgOiBiYXNlID09PSAnZ3JheScgPyAxIDogMztcclxuXHRcdFx0cGFydHMgPSBtWzJdLnRyaW0oKVxyXG5cdFx0XHRcdC5zcGxpdCgvXFxzKixcXHMqLylcclxuXHRcdFx0XHQubWFwKGZ1bmN0aW9uICh4LCBpKSB7XHJcblx0XHRcdFx0XHQvLzxwZXJjZW50YWdlPlxyXG5cdFx0XHRcdFx0aWYgKC8lJC8udGVzdCh4KSkge1xyXG5cdFx0XHRcdFx0XHQvL2FscGhhXHJcblx0XHRcdFx0XHRcdGlmIChpID09PSBzaXplKVx0cmV0dXJuIHBhcnNlRmxvYXQoeCkgLyAxMDA7XHJcblx0XHRcdFx0XHRcdC8vcmdiXHJcblx0XHRcdFx0XHRcdGlmIChiYXNlID09PSAncmdiJykgcmV0dXJuIHBhcnNlRmxvYXQoeCkgKiAyNTUgLyAxMDA7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly9odWVcclxuXHRcdFx0XHRcdGVsc2UgaWYgKGJhc2VbaV0gPT09ICdoJykge1xyXG5cdFx0XHRcdFx0XHQvLzxkZWc+XHJcblx0XHRcdFx0XHRcdGlmICgvZGVnJC8udGVzdCh4KSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC8vPGJhc2UtaHVlPlxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmIChiYXNlSHVlc1t4XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2VIdWVzW3hdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh4KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChuYW1lID09PSBiYXNlKSBwYXJ0cy5wdXNoKDEpO1xyXG5cdFx0XHRhbHBoYSA9IHBhcnRzW3NpemVdID09PSB1bmRlZmluZWQgPyAxIDogcGFydHNbc2l6ZV07XHJcblx0XHRcdHBhcnRzID0gcGFydHMuc2xpY2UoMCwgc2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9uYW1lZCBjaGFubmVscyBjYXNlXHJcblx0XHRlbHNlIGlmIChjc3RyLmxlbmd0aCA+IDEwICYmIC9bMC05XSg/Olxcc3xcXC8pLy50ZXN0KGNzdHIpKSB7XHJcblx0XHRcdHBhcnRzID0gY3N0ci5tYXRjaCgvKFswLTldKykvZykubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzcGFjZSA9IGNzdHIubWF0Y2goLyhbYS16XSkvaWcpLmpvaW4oJycpLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL251bWVyaWMgY2FzZVxyXG5cdGVsc2UgaWYgKHR5cGVvZiBjc3RyID09PSAnbnVtYmVyJykge1xyXG5cdFx0c3BhY2UgPSAncmdiJ1xyXG5cdFx0cGFydHMgPSBbY3N0ciA+Pj4gMTYsIChjc3RyICYgMHgwMGZmMDApID4+PiA4LCBjc3RyICYgMHgwMDAwZmZdO1xyXG5cdH1cclxuXHJcblx0Ly9vYmplY3QgY2FzZSAtIGRldGVjdHMgY3NzIGNhc2VzIG9mIHJnYiBhbmQgaHNsXHJcblx0ZWxzZSBpZiAoaXNPYmplY3QoY3N0cikpIHtcclxuXHRcdGlmIChjc3RyLnIgIT0gbnVsbCkge1xyXG5cdFx0XHRwYXJ0cyA9IFtjc3RyLnIsIGNzdHIuZywgY3N0ci5iXTtcclxuXHRcdFx0c3BhY2UgPSAncmdiJ1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoY3N0ci5yZWQgIT0gbnVsbCkge1xyXG5cdFx0XHRwYXJ0cyA9IFtjc3RyLnJlZCwgY3N0ci5ncmVlbiwgY3N0ci5ibHVlXTtcclxuXHRcdFx0c3BhY2UgPSAncmdiJ1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoY3N0ci5oICE9IG51bGwpIHtcclxuXHRcdFx0cGFydHMgPSBbY3N0ci5oLCBjc3RyLnMsIGNzdHIubF07XHJcblx0XHRcdHNwYWNlID0gJ2hzbCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChjc3RyLmh1ZSAhPSBudWxsKSB7XHJcblx0XHRcdHBhcnRzID0gW2NzdHIuaHVlLCBjc3RyLnNhdHVyYXRpb24sIGNzdHIubGlnaHRuZXNzXTtcclxuXHRcdFx0c3BhY2UgPSAnaHNsJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3N0ci5hICE9IG51bGwpIGFscGhhID0gY3N0ci5hO1xyXG5cdFx0ZWxzZSBpZiAoY3N0ci5hbHBoYSAhPSBudWxsKSBhbHBoYSA9IGNzdHIuYWxwaGE7XHJcblx0XHRlbHNlIGlmIChjc3RyLm9wYWNpdHkgIT0gbnVsbCkgYWxwaGEgPSBjc3RyLm9wYWNpdHkgLyAxMDA7XHJcblx0fVxyXG5cclxuXHQvL2FycmF5XHJcblx0ZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjc3RyKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3ICYmIEFycmF5QnVmZmVyLmlzVmlldyhjc3RyKSkge1xyXG5cdFx0cGFydHMgPSBbY3N0clswXSwgY3N0clsxXSwgY3N0clsyXV07XHJcblx0XHRzcGFjZSA9ICdyZ2InXHJcblx0XHRhbHBoYSA9IGNzdHIubGVuZ3RoID09PSA0ID8gY3N0clszXSA6IDE7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0c3BhY2U6IHNwYWNlLFxyXG5cdFx0dmFsdWVzOiBwYXJ0cyxcclxuXHRcdGFscGhhOiBhbHBoYVxyXG5cdH07XHJcbn1cclxuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbG9yLXNwYWNlL2hzbFxuICovXG4ndXNlIHN0cmljdCdcblxudmFyIHJnYiA9IHJlcXVpcmUoJy4vcmdiJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRuYW1lOiAnaHNsJyxcblx0bWluOiBbMCwwLDBdLFxuXHRtYXg6IFszNjAsMTAwLDEwMF0sXG5cdGNoYW5uZWw6IFsnaHVlJywgJ3NhdHVyYXRpb24nLCAnbGlnaHRuZXNzJ10sXG5cdGFsaWFzOiBbJ0hTTCddLFxuXG5cdHJnYjogZnVuY3Rpb24oaHNsKSB7XG5cdFx0dmFyIGggPSBoc2xbMF0gLyAzNjAsXG5cdFx0XHRcdHMgPSBoc2xbMV0gLyAxMDAsXG5cdFx0XHRcdGwgPSBoc2xbMl0gLyAxMDAsXG5cdFx0XHRcdHQxLCB0MiwgdDMsIHJnYiwgdmFsO1xuXG5cdFx0aWYgKHMgPT09IDApIHtcblx0XHRcdHZhbCA9IGwgKiAyNTU7XG5cdFx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHRcdH1cblxuXHRcdGlmIChsIDwgMC41KSB7XG5cdFx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHQyID0gbCArIHMgLSBsICogcztcblx0XHR9XG5cdFx0dDEgPSAyICogbCAtIHQyO1xuXG5cdFx0cmdiID0gWzAsIDAsIDBdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHR0MyA9IGggKyAxIC8gMyAqIC0gKGkgLSAxKTtcblx0XHRcdGlmICh0MyA8IDApIHtcblx0XHRcdFx0dDMrKztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHQzID4gMSkge1xuXHRcdFx0XHR0My0tO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdFx0dmFsID0gdDI7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2YWwgPSB0MTtcblx0XHRcdH1cblxuXHRcdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHRcdH1cblxuXHRcdHJldHVybiByZ2I7XG5cdH1cbn07XG5cblxuLy9leHRlbmQgcmdiXG5yZ2IuaHNsID0gZnVuY3Rpb24ocmdiKSB7XG5cdHZhciByID0gcmdiWzBdLzI1NSxcblx0XHRcdGcgPSByZ2JbMV0vMjU1LFxuXHRcdFx0YiA9IHJnYlsyXS8yNTUsXG5cdFx0XHRtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcblx0XHRcdG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuXHRcdFx0ZGVsdGEgPSBtYXggLSBtaW4sXG5cdFx0XHRoLCBzLCBsO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9XG5cdGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH1cblx0ZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH1cblx0ZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpLyBkZWx0YTtcblx0fVxuXG5cdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdHMgPSAwO1xuXHR9XG5cdGVsc2UgaWYgKGwgPD0gMC41KSB7XG5cdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdH1cblx0ZWxzZSB7XG5cdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXHR9XG5cblx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcbn07XG4iLCIvKipcbiAqIFJHQiBzcGFjZS5cbiAqXG4gKiBAbW9kdWxlICBjb2xvci1zcGFjZS9yZ2JcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRuYW1lOiAncmdiJyxcblx0bWluOiBbMCwwLDBdLFxuXHRtYXg6IFsyNTUsMjU1LDI1NV0sXG5cdGNoYW5uZWw6IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSxcblx0YWxpYXM6IFsnUkdCJ11cbn07XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBDb3VudCB1cCBhbmQgZG93biBiZXR3ZWVuIHR3byBudW1iZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiAtIE1pbmltdW0gbnVtYmVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCAtIE1heGltdW0gbnVtYmVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IGluaXRpYWwgLSBJbml0aWFsIG51bWJlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gaW5zdGFuY2UgLSBDb3VudC1iZXR3ZWVuIGluc3RhbmNlLiBFeHBlY3RzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczogbW9kaWZpZXIuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWluLCBtYXgsIGluaXRpYWwpIHtcblxuXHRjb25zdCBsZW5ndGggPSBtYXggLSBtaW4gKyAxXG5cblx0bGV0IGluZGV4ID0gaW5pdGlhbCAtIG1pblxuXG5cdHJldHVybiAobW9kaWZpZXIgPSAwKSA9PiB7XG5cblx0XHRpbmRleCA9IChpbmRleCArIG1vZGlmaWVyKSAlIGxlbmd0aFxuXG5cdFx0aWYgKGluZGV4Pj0wKSBpbmRleCA9IDAgKyBpbmRleFxuXHRcdGlmIChpbmRleDwwKSAgaW5kZXggPSBsZW5ndGggKyBpbmRleFxuXG5cdFx0cmV0dXJuIG1pbiArIGluZGV4XG5cblx0fVxuXG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCkge1xuXHR2YXIgcHJvdG90eXBlO1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgKHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSwgcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KSk7XG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsLkp1bXAgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8vIFJvYmVydCBQZW5uZXIncyBlYXNlSW5PdXRRdWFkXG5cbi8vIGZpbmQgdGhlIHJlc3Qgb2YgaGlzIGVhc2luZyBmdW5jdGlvbnMgaGVyZTogaHR0cDovL3JvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuLy8gZmluZCB0aGVtIGV4cG9ydGVkIGZvciBFUzYgY29uc3VtcHRpb24gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2pheGdlbGxlci9lei5qc1xuXG52YXIgZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICB0IC89IGQgLyAyO1xuICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcbiAgdC0tO1xuICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbnZhciBqdW1wZXIgPSBmdW5jdGlvbiBqdW1wZXIoKSB7XG4gIC8vIHByaXZhdGUgdmFyaWFibGUgY2FjaGVcbiAgLy8gbm8gdmFyaWFibGVzIGFyZSBjcmVhdGVkIGR1cmluZyBhIGp1bXAsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzXG5cbiAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7IC8vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvICAgICAgICAgICAgICAgICAgIChub2RlKVxuXG4gIHZhciBzdGFydCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0YXJ0cyAgICAgICAgICAgICAgICAgICAgKHB4KVxuICB2YXIgc3RvcCA9IHZvaWQgMDsgLy8gd2hlcmUgc2Nyb2xsIHN0b3BzICAgICAgICAgICAgICAgICAgICAgKHB4KVxuXG4gIHZhciBvZmZzZXQgPSB2b2lkIDA7IC8vIGFkanVzdG1lbnQgZnJvbSB0aGUgc3RvcCBwb3NpdGlvbiAgICAgIChweClcbiAgdmFyIGVhc2luZyA9IHZvaWQgMDsgLy8gZWFzaW5nIGZ1bmN0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKVxuICB2YXIgYTExeSA9IHZvaWQgMDsgLy8gYWNjZXNzaWJpbGl0eSBzdXBwb3J0IGZsYWcgICAgICAgICAgICAgKGJvb2xlYW4pXG5cbiAgdmFyIGRpc3RhbmNlID0gdm9pZCAwOyAvLyBkaXN0YW5jZSBvZiBzY3JvbGwgICAgICAgICAgICAgICAgICAgICAocHgpXG4gIHZhciBkdXJhdGlvbiA9IHZvaWQgMDsgLy8gc2Nyb2xsIGR1cmF0aW9uICAgICAgICAgICAgICAgICAgICAgICAgKG1zKVxuXG4gIHZhciB0aW1lU3RhcnQgPSB2b2lkIDA7IC8vIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQgICAgICAgICAgICAgICAgICAgIChtcylcbiAgdmFyIHRpbWVFbGFwc2VkID0gdm9pZCAwOyAvLyB0aW1lIHNwZW50IHNjcm9sbGluZyB0aHVzIGZhciAgICAgICAgICAobXMpXG5cbiAgdmFyIG5leHQgPSB2b2lkIDA7IC8vIG5leHQgc2Nyb2xsIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgIChweClcblxuICB2YXIgY2FsbGJhY2sgPSB2b2lkIDA7IC8vIHRvIGNhbGwgd2hlbiBkb25lIHNjcm9sbGluZyAgICAgICAgICAgIChmdW5jdGlvbilcblxuICAvLyBzY3JvbGwgcG9zaXRpb24gaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgfVxuXG4gIC8vIGVsZW1lbnQgb2Zmc2V0IGhlbHBlclxuXG4gIGZ1bmN0aW9uIHRvcChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc3RhcnQ7XG4gIH1cblxuICAvLyByQUYgbG9vcCBoZWxwZXJcblxuICBmdW5jdGlvbiBsb29wKHRpbWVDdXJyZW50KSB7XG4gICAgLy8gc3RvcmUgdGltZSBzY3JvbGwgc3RhcnRlZCwgaWYgbm90IHN0YXJ0ZWQgYWxyZWFkeVxuICAgIGlmICghdGltZVN0YXJ0KSB7XG4gICAgICB0aW1lU3RhcnQgPSB0aW1lQ3VycmVudDtcbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgdGltZSBzcGVudCBzY3JvbGxpbmcgc28gZmFyXG4gICAgdGltZUVsYXBzZWQgPSB0aW1lQ3VycmVudCAtIHRpbWVTdGFydDtcblxuICAgIC8vIGNhbGN1bGF0ZSBuZXh0IHNjcm9sbCBwb3NpdGlvblxuICAgIG5leHQgPSBlYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pO1xuXG4gICAgLy8gc2Nyb2xsIHRvIGl0XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIG5leHQpO1xuXG4gICAgLy8gY2hlY2sgcHJvZ3Jlc3NcbiAgICB0aW1lRWxhcHNlZCA8IGR1cmF0aW9uID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSAvLyBjb250aW51ZSBzY3JvbGwgbG9vcFxuICAgIDogZG9uZSgpOyAvLyBzY3JvbGxpbmcgaXMgZG9uZVxuICB9XG5cbiAgLy8gc2Nyb2xsIGZpbmlzaGVkIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgLy8gYWNjb3VudCBmb3IgckFGIHRpbWUgcm91bmRpbmcgaW5hY2N1cmFjaWVzXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHN0YXJ0ICsgZGlzdGFuY2UpO1xuXG4gICAgLy8gaWYgc2Nyb2xsaW5nIHRvIGFuIGVsZW1lbnQsIGFuZCBhY2Nlc3NpYmlsaXR5IGlzIGVuYWJsZWRcbiAgICBpZiAoZWxlbWVudCAmJiBhMTF5KSB7XG4gICAgICAvLyBhZGQgdGFiaW5kZXggaW5kaWNhdGluZyBwcm9ncmFtbWF0aWMgZm9jdXNcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuXG4gICAgICAvLyBmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGV4aXN0cywgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHRpbWUgZm9yIG5leHQganVtcFxuICAgIHRpbWVTdGFydCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQVBJXG5cbiAgZnVuY3Rpb24ganVtcCh0YXJnZXQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAvLyByZXNvbHZlIG9wdGlvbnMsIG9yIHVzZSBkZWZhdWx0c1xuICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwO1xuICAgIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0IHx8IDA7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrOyAvLyBcInVuZGVmaW5lZFwiIGlzIGEgc3VpdGFibGUgZGVmYXVsdCwgYW5kIHdvbid0IGJlIGNhbGxlZFxuICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nIHx8IGVhc2VJbk91dFF1YWQ7XG4gICAgYTExeSA9IG9wdGlvbnMuYTExeSB8fCBmYWxzZTtcblxuICAgIC8vIGNhY2hlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgc3RhcnQgPSBsb2NhdGlvbigpO1xuXG4gICAgLy8gcmVzb2x2ZSB0YXJnZXRcbiAgICBzd2l0Y2ggKHR5cGVvZiB0YXJnZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRhcmdldCkpIHtcbiAgICAgIC8vIHNjcm9sbCBmcm9tIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIG5vIGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgICAgIGExMXkgPSBmYWxzZTsgLy8gbWFrZSBzdXJlIGFjY2Vzc2liaWxpdHkgaXMgb2ZmXG4gICAgICAgIHN0b3AgPSBzdGFydCArIHRhcmdldDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50IChub2RlKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGVsZW1lbnQgPSB0YXJnZXQ7XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAoc2VsZWN0b3IpXG4gICAgICAvLyBib3VuZGluZyByZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgICAgICAgc3RvcCA9IHRvcChlbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBzY3JvbGwgZGlzdGFuY2UsIGFjY291bnRpbmcgZm9yIG9mZnNldFxuICAgIGRpc3RhbmNlID0gc3RvcCAtIHN0YXJ0ICsgb2Zmc2V0O1xuXG4gICAgLy8gcmVzb2x2ZSBkdXJhdGlvblxuICAgIHN3aXRjaCAoX3R5cGVvZihvcHRpb25zLmR1cmF0aW9uKSkge1xuICAgICAgLy8gbnVtYmVyIGluIG1zXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBmdW5jdGlvbiBwYXNzZWQgdGhlIGRpc3RhbmNlIG9mIHRoZSBzY3JvbGxcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uKGRpc3RhbmNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICB9XG5cbiAgLy8gZXhwb3NlIG9ubHkgdGhlIGp1bXAgbWV0aG9kXG4gIHJldHVybiBqdW1wO1xufTtcblxuLy8gZXhwb3J0IHNpbmdsZXRvblxuXG52YXIgc2luZ2xldG9uID0ganVtcGVyKCk7XG5cbnJldHVybiBzaW5nbGV0b247XG5cbn0pKSk7XG4iLCJmdW5jdGlvbiBsZXJwKHYwLCB2MSwgdCkge1xuICAgIHJldHVybiB2MCooMS10KSt2MSp0XG59XG5tb2R1bGUuZXhwb3J0cyA9IGxlcnAiLCIvKipcclxuICogQ2xhbXAgdmFsdWUuXHJcbiAqIERldGVjdHMgcHJvcGVyIGNsYW1wIG1pbi9tYXguXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIEN1cnJlbnQgdmFsdWUgdG8gY3V0IG9mZlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIE9uZSBzaWRlIGxpbWl0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggT3RoZXIgc2lkZSBsaW1pdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IENsYW1wZWQgdmFsdWVcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLCBtaW4sIG1heCl7XHJcblx0cmV0dXJuIG1heCA+IG1pbiA/IE1hdGgubWF4KE1hdGgubWluKGEsbWF4KSxtaW4pIDogTWF0aC5tYXgoTWF0aC5taW4oYSxtaW4pLG1heCk7XHJcbn07XHJcbiIsImltcG9ydCB7IGZpZm8sIHBvc2l0aW9uRml4ZWQsIHBvc2l0aW9uUmVsYXRpdmUsIHNpbmdsZSB9IGZyb20gJy4vX2hlbHBlcnMnXG5pbXBvcnQgeyBzdGVwcywgZ3JhZGllbnQgfSBmcm9tICcuL19jb2xvcidcblxuY29uc3QgcnVuID0gc2luZ2xlKHN0ZXBzKVxuY29uc3QgcG9pbnRzID0gZmlmbyhzdGVwcylcblxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzJylcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG5sZXQgZml4ZWRcbmxldCB3aWR0aFxubGV0IGhlaWdodFxubGV0IHJhdGlvXG5cbmxldCBfeFxubGV0IF95XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG5cblx0Ly8gU2FtZSBhcyBtYXgtaGVpZ2h0IGluIGhlYWRlciBhbmQgY29udGVudCBDU1Ncblx0Y29uc3QgbWluSGVpZ2h0ID0gNzUwXG5cblx0Y29uc3QgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKVxuXG5cdGNvbnN0IGRvY1NpemUgPSBkb2MuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0Y29uc3QgaGVhZGVyU2l6ZSA9IGhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdGZpeGVkID0gZG9jU2l6ZS5oZWlnaHQ8bWluSGVpZ2h0ID8gZmFsc2UgOiB0cnVlXG5cdHdpZHRoID0gaGVhZGVyU2l6ZS53aWR0aFxuXHRoZWlnaHQgPSBoZWFkZXJTaXplLmhlaWdodFxuXHRyYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG5cblx0Y2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpb1xuXHRjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogcmF0aW9cblxufVxuXG5jb25zdCB1cGRhdGUgPSAoZSkgPT4ge1xuXG5cdC8vIFBvc2l0aW9uIGNhbGN1bGF0aW9uIGlzIGRpZmZlcmVudCB3aGVuIGhlcm8gaXMgZml4ZWRcblx0Y29uc3QgeyB4LCB5IH0gPSBmaXhlZD09PXRydWUgPyBwb3NpdGlvbkZpeGVkKGUpIDogcG9zaXRpb25SZWxhdGl2ZShlKVxuXG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoICogcmF0aW8sIGhlaWdodCAqIHJhdGlvKVxuXG5cdHBvaW50cyh7XG5cblx0XHRmcm9tOiB7IHg6IF94LCB5OiBfeSB9LFxuXHRcdHRvOiB7IHgsIHkgfVxuXG5cdH0pLmZvckVhY2goKHBvaW50LCBpKSA9PiB7XG5cblx0XHRjb25zdCBjb2xvciA9IGdyYWRpZW50W2ldXG5cblx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0Y29udGV4dC5tb3ZlVG8ocG9pbnQuZnJvbS54ICogcmF0aW8sIHBvaW50LmZyb20ueSAqIHJhdGlvKVxuXHRcdGNvbnRleHQubGluZVRvKHBvaW50LnRvLnggKiByYXRpbywgcG9pbnQudG8ueSAqIHJhdGlvKVxuXHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvclxuXHRcdGNvbnRleHQubGluZVdpZHRoID0gNSAqIHJhdGlvXG5cdFx0Y29udGV4dC5zdHJva2UoKVxuXG5cdH0pXG5cblx0X3ggPSB4XG5cdF95ID0geVxuXG59XG5cbi8vIFNhZmFyaSBjYWxjdWxhdGVzIGEgd3JvbmcgaGVpZ2h0IGZvciB0aGUgaGVhZGVyXG4vLyB3aGVuIGNhbGN1bGF0aW5nIHRoZSBoZWlnaHQgd2l0aG91dCBhIGRlbGF5Llxuc2V0VGltZW91dCgoKSA9PiB7XG5cblx0aW5pdCgpXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXQpXG5cdGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4gcnVuKCgpID0+IHVwZGF0ZShlKSkpXG5cbn0sIDUwMCkiLCJpbXBvcnQgY291bnRCZXR3ZWVuIGZyb20gJ2NvdW50LWJldHdlZW4nXG5pbXBvcnQgeyBoYXNDbGFzc05hbWVzLCBoc2wsIGFscGhhR3JhZGllbnQgfSBmcm9tICcuL19oZWxwZXJzJ1xuXG5jb25zdCBoID0gW1xuXHQxNjAsXG5cdDI4MCxcblx0MzEwLFxuXHQzNDBcbl1cblxuY29uc3QgZWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuY29uc3QgaW5kZXggPSBjb3VudEJldHdlZW4oMCwgaC5sZW5ndGggLSAxLCAwKVxuXG5sZXQgc3RhcnRcbmxldCBlbmRcblxuZXhwb3J0IGNvbnN0IHN0ZXBzID0gMjVcbmV4cG9ydCBsZXQgZ3JhZGllbnRcblxuY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuXG5cdGNvbnN0IGkgPSBpbmRleCgpXG5cblx0c3RhcnQgPSBoc2woaFtpXSwgNTUsIDQ1KVxuXHRlbmQgPSBoc2woaFtpXSAtIDYwLCA0NSwgNTUpXG5cblx0Z3JhZGllbnQgPSBhbHBoYUdyYWRpZW50KFsgc3RhcnQsIGVuZCBdLCBzdGVwcylcblxuXHRlbGVtLnN0eWxlLnNldFByb3BlcnR5KCctLXN0YXJ0Jywgc3RhcnQpXG5cdGVsZW0uc3R5bGUuc2V0UHJvcGVydHkoJy0tZW5kJywgZW5kKVxuXG5cdGluZGV4KDEpXG5cbn1cblxuZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cblx0Y29uc3QgY2xpY2thYmxlID0gWyAnY2FudmFzJywgJ2hlYWRlcl9faW5uZXInIF1cblx0Y29uc3QgaXNDbGlja2FibGUgPSBoYXNDbGFzc05hbWVzKGUudGFyZ2V0LCBjbGlja2FibGUpXG5cblx0aWYgKGlzQ2xpY2thYmxlPT09ZmFsc2UpIHJldHVyblxuXG5cdHVwZGF0ZSgpXG5cbn0pXG5cbnVwZGF0ZSgpIiwiaWYgKE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoPT1udWxsKSBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoIiwiaW1wb3J0IGludGVycG9sYXRlIGZyb20gJ2NvbG9yLWludGVycG9sYXRlJ1xuaW1wb3J0IGFscGhhIGZyb20gJ2NvbG9yLWFscGhhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXJyYXkgPSAobGVuZ3RoKSA9PiBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW5ndGgpKVxuXG5leHBvcnQgY29uc3QgaGFzQ2xhc3NOYW1lcyA9IChlbGVtLCBjbGFzc05hbWVzKSA9PiBjbGFzc05hbWVzLmZpbHRlcigoY2xhc3NOYW1lKSA9PiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKS5sZW5ndGg+MFxuXG5leHBvcnQgY29uc3QgaHNsID0gKGgsIHMsIGwpID0+IGBoc2woJHsgaCB9LCAkeyBzIH0lLCAkeyBsIH0lKWBcblxuZXhwb3J0IGNvbnN0IGFscGhhR3JhZGllbnQgPSAoY29sb3JzLCBudW0pID0+IHtcblxuXHRjb25zdCBncmFkaWVudCA9IGludGVycG9sYXRlKGNvbG9ycylcblxuXHRyZXR1cm4gY3JlYXRlQXJyYXkobnVtKS5tYXAoKF8sIGksIHsgbGVuZ3RoIH0pID0+IHtcblxuXHRcdC8vIENhbGN1bGF0ZSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgYmFzZWQgb24gdGhlIHRvdGFsIGxlbmd0aFxuXHRcdGNvbnN0IGluZGV4ID0gKDEgLyBsZW5ndGgpICogaVxuXHRcdGNvbnN0IGNvbG9yID0gZ3JhZGllbnQoaW5kZXgpXG5cblx0XHRyZXR1cm4gYWxwaGEoY29sb3IsIGluZGV4KVxuXG5cdH0pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGZpZm8gPSAobGVuZ3RoKSA9PiB7XG5cblx0Y29uc3QgYXJyID0gW11cblxuXHRyZXR1cm4gKHZhbHVlKSA9PiB7XG5cblx0XHRpZiAodmFsdWU9PT11bmRlZmluZWQpIHJldHVybiBhcnJcblx0XHRpZiAoYXJyLmxlbmd0aD49bGVuZ3RoKSBhcnIuc2hpZnQoKVxuXG5cdFx0YXJyLnB1c2godmFsdWUpXG5cblx0XHRyZXR1cm4gYXJyXG5cblx0fVxuXG59XG5cbmV4cG9ydCBjb25zdCBwb3NpdGlvbkZpeGVkID0gKGUpID0+ICh7XG5cblx0eDogZS5jbGllbnRYLFxuXHR5OiBlLmNsaWVudFlcblxufSlcblxuZXhwb3J0IGNvbnN0IHBvc2l0aW9uUmVsYXRpdmUgPSAoZSkgPT4gKHtcblxuXHR4OiBlLnBhZ2VYLFxuXHR5OiBlLnBhZ2VZXG5cbn0pXG5cbmV4cG9ydCBjb25zdCBzaW5nbGUgPSAobWF4KSA9PiB7XG5cblx0bGV0IGlkXG5cdGxldCBpdGVyYXRpb25zXG5cblx0Y29uc3QgbG9vcCA9IChfaWQsIGZuKSA9PiB7XG5cblx0XHRpZiAoaWQhPT1faWQpIHJldHVyblxuXHRcdGlmIChtYXghPT11bmRlZmluZWQgJiYgaXRlcmF0aW9ucz49bWF4KSByZXR1cm5cblxuXHRcdCsraXRlcmF0aW9uc1xuXG5cdFx0Zm4oKVxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKF9pZCwgZm4pKVxuXG5cdH1cblxuXHRyZXR1cm4gKGZuKSA9PiB7XG5cblx0XHRpZCA9IFN5bWJvbCgpXG5cdFx0aXRlcmF0aW9ucyA9IDBcblxuXHRcdGxvb3AoaWQsIGZuKVxuXG5cdFx0cmV0dXJuICgpID0+IGlkID0gU3ltYm9sKClcblxuXHR9XG5cbn0iLCJpbXBvcnQganVtcCBmcm9tICdqdW1wLmpzJ1xuXG5pbXBvcnQgJy4vX2ZvcmVhY2gnXG5pbXBvcnQgJy4vX2NvbG9yJ1xuaW1wb3J0ICcuL19jYW52YXMnXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJykuZm9yRWFjaCgoZWxlbSkgPT4ge1xuXG5cdGVsZW0ub25jbGljayA9IChlKSA9PiB7XG5cblx0XHRjb25zdCBocmVmID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuXHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaHJlZilcblxuXHRcdGp1bXAodGFyZ2V0LCB7XG5cdFx0XHRkdXJhdGlvbjogNTAwLFxuXHRcdFx0YTExeTogdHJ1ZVxuXHRcdH0pXG5cblx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cblx0fVxuXG59KSJdfQ==
