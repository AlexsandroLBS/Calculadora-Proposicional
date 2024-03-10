// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/util/support/isBufferBrowser.js":[function(require,module,exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"node_modules/util/node_modules/inherits/inherits_browser.js":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"node_modules/util/util.js":[function(require,module,exports) {
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};
  for (var i = 0; i < keys.length; i++) {
    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
  }
  return descriptors;
};
var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }
  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
};
var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = undefined || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);
  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = '',
    array = false,
    braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }
  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}
function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }
  return name + ': ' + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }
  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;
function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;
function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;
function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' ||
  // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = require('./support/isBuffer');
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');
exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;
exports.promisify = function promisify(original) {
  if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');
  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }
  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });
    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }
    return promise;
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};
exports.promisify.custom = kCustomPromisifiedSymbol;
function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}
function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function () {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args).then(function (ret) {
      process.nextTick(cb, null, ret);
    }, function (rej) {
      process.nextTick(callbackifyOnRejected, rej, cb);
    });
  }
  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;
},{"./support/isBuffer":"node_modules/util/support/isBufferBrowser.js","inherits":"node_modules/util/node_modules/inherits/inherits_browser.js","process":"node_modules/process/browser.js"}],"node_modules/fregejs/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnrecognizedTokenException = exports.RuleSetter = exports.RuleApplier = exports.Reducer = exports.ProofChecker = exports.Parser = exports.Lexer = exports.InvalidProofSequenceException = exports.InvalidFormulaException = exports.InferenceException = exports.Frege = exports.Calculator = exports.Builder = void 0;
exports.biconditional = biconditional;
exports.buildConjunctionString = buildConjunctionString;
exports.conjunction = conjunction;
exports.disjunction = disjunction;
exports.eliminateDoubleNegations = eliminateDoubleNegations;
exports.frege = void 0;
exports.haveEvenNumberOfNegations = haveEvenNumberOfNegations;
exports.implication = implication;
exports.inferenceRulesMap = void 0;
exports.isArrayString = isArrayString;
exports.isBiconditional = isBiconditional;
exports.isBinaryOperationFormula = isBinaryOperationFormula;
exports.isConjunction = isConjunction;
exports.isContradiction = isContradiction;
exports.isDisjunction = isDisjunction;
exports.isEndOfHypothesis = isEndOfHypothesis;
exports.isHypothesis = isHypothesis;
exports.isImplication = isImplication;
exports.isMolecularFormula = isMolecularFormula;
exports.isNegation = isNegation;
exports.isProofItemInferred = isProofItemInferred;
exports.isPropositionalVariable = isPropositionalVariable;
exports.negation = negation;
exports.parseToFormulaObject = parseToFormulaObject;
exports.parseToFormulaString = parseToFormulaString;
exports.printTruthTable = printTruthTable;
var _util = require("util");
// src/exceptions/invalid-formula.exception.ts
var InvalidFormulaException = class extends Error {};

// src/exceptions/invalid-inference.exception.ts
exports.InvalidFormulaException = InvalidFormulaException;
var InferenceException = class extends Error {};

// src/exceptions/invalid-proof-sequence.exception.ts
exports.InferenceException = InferenceException;
var InvalidProofSequenceException = class extends Error {};

// src/exceptions/unrecognized-token.exception.ts
exports.InvalidProofSequenceException = InvalidProofSequenceException;
var UnrecognizedTokenException = class extends Error {};

// src/builder/Builder.ts
exports.UnrecognizedTokenException = UnrecognizedTokenException;
var _Builder = class _Builder {
  static biconditional(left, right) {
    return `(${left} <-> ${right})`;
  }
  static conjunction(left, right) {
    return `(${left} \u2227 ${right})`;
  }
  static disjunction(left, right) {
    return `(${left} \u2228 ${right})`;
  }
  static implication(left, right) {
    return `(${left} -> ${right})`;
  }
  static buildRecursively(formula) {
    if (typeof formula === "string") return formula;
    if ("operation" in formula && formula.operation === "Negation") return `\xAC(${this.buildFormula(formula.value)})`;
    if (!("operation" in formula)) throw new InvalidFormulaException("Invalid Formula.");
    const left = this.buildFormula(formula.left);
    const right = this.buildFormula(formula.right);
    const operation = formula.operation;
    return this.operations[operation](left, right);
  }
  /**
   * Builds a formula with the syntax of logic.
   * @param formula - The logical formula to build.
   * @returns The builded logical formula.
   * @throws {InvalidFormulaException}
   */
  static buildFormula(formula) {
    const result = this.buildRecursively(formula);
    return result;
  }
};
_Builder.operations = {
  Biconditional: _Builder.biconditional,
  Conjunction: _Builder.conjunction,
  Disjunction: _Builder.disjunction,
  Implication: _Builder.implication
};
var Builder = exports.Builder = _Builder;

// src/utils/isBinaryOperation.ts
function isBinaryOperationFormula(formula) {
  return !!(formula.operation && formula.left && formula.right);
}

// src/utils/isBiconditional.ts
function isBiconditional(formula) {
  return formula.operation === "Biconditional" && isBinaryOperationFormula(formula);
}

// src/utils/isConjunction.ts
function isConjunction(formula) {
  return formula.operation === "Conjunction" && isBinaryOperationFormula(formula);
}

// src/utils/isDisjunction.ts
function isDisjunction(formula) {
  return formula.operation === "Disjunction" && isBinaryOperationFormula(formula);
}

// src/utils/isImplication.ts
function isImplication(formula) {
  return formula.operation === "Implication" && isBinaryOperationFormula(formula);
}

// src/utils/isContradiction.ts

// src/utils/isNegation.ts
function isNegation(formula) {
  return formula.operation === "Negation" && !!formula.value;
}

// src/utils/eliminateDoubleNegation.ts
function eliminateDoubleNegations(formula) {
  if (isNegation(formula)) {
    const innerValue = formula.value;
    if (isNegation(innerValue)) {
      return eliminateDoubleNegations(innerValue.value);
    }
    return {
      operation: "Negation",
      value: eliminateDoubleNegations(innerValue)
    };
  }
  if (isBinaryOperationFormula(formula)) {
    return {
      operation: formula.operation,
      left: eliminateDoubleNegations(formula.left),
      right: eliminateDoubleNegations(formula.right)
    };
  }
  return formula;
}

// src/utils/isContradiction.ts
function isContradiction(formula) {
  formula = eliminateDoubleNegations(formula);
  const firstCondition = (0, _util.isDeepStrictEqual)(formula, {
    operation: "Conjunction",
    left: formula.left,
    right: {
      operation: "Negation",
      value: formula.left
    }
  });
  const secondCondition = (0, _util.isDeepStrictEqual)(formula, {
    operation: "Conjunction",
    left: {
      operation: "Negation",
      value: formula.right
    },
    right: formula.right
  });
  return firstCondition || secondCondition;
}

// src/utils/isArrayString.ts
function isArrayString(array) {
  return array.every(item => typeof item === "string");
}

// src/utils/isHypothesis.ts
function isHypothesis(x) {
  return x.type === "Hypothesis";
}

// src/utils/isEndOfHypothesis.ts
function isEndOfHypothesis(x) {
  return x.type === "End of Hypothesis";
}

// src/utils/isMolecularFormula.ts
function isMolecularFormula(formula) {
  if (typeof formula === "string") return false;
  if (formula.operation === "Negation") return false;
  return true;
}

// src/utils/isProofItemInferred.ts
function isProofItemInferred(x) {
  if (!(x == null ? void 0 : x.type)) return false;
  return ["Knowledge", "End of Hypothesis", "Conclusion"].includes(x.type);
}

// src/utils/isPropositionalVariable.ts
var propositionalVariablesList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function isPropositionalVariable(formula) {
  return typeof formula === "string" && propositionalVariablesList.includes(formula);
}

// src/utils/buildConjunctionString.ts
function buildConjunctionString(premises) {
  const conjunctionFormulaArray = premises.map(premise => `(${premise})`);
  const conjunctionFormulaString = conjunctionFormulaArray.join("\u2227");
  return conjunctionFormulaString;
}

// src/utils/haveEvenNumberOfNegations.ts
function haveEvenNumberOfNegations(formula) {
  if (!isNegation(formula)) return true;
  formula = eliminateDoubleNegations(formula);
  return !isNegation(formula);
}

// src/lexer/Lexer.ts
var Lexer = class {
  /**
   * Creates a new Lexer instance.
   * @param formula The propositional logic formula to tokenize.
   */
  constructor(formula) {
    this.tokens = [];
    this.pointer = 0;
    this.operator = "";
    this.input = formula;
  }
  /**
   * Tokenizes the propositional logic formula.
   * @returns An array of tokens representing the formula.
   */
  lex() {
    while (this.next()) {
      if (this.isSpecial(this.c)) {
        this.operator += this.c;
        if (this.operatorExists(this.operator)) {
          this.push({
            type: "operator",
            value: this.operator
          });
          this.operator = "";
        }
      } else {
        if (this.operator) this.throwTokenException(this.operator, this.pointer - this.operator.length - 1);else if (this.isWhiteSpace(this.c)) continue;else if (this.isVariable(this.c)) this.push({
          type: "variable",
          value: this.c
        });else if (this.isExpressionBoundary(this.c)) this.push({
          type: "boundary",
          value: this.c
        });else this.throwTokenException(this.c, this.pointer - 2);
      }
    }
    return this.tokens;
  }
  next() {
    return this.c = this.input[this.pointer++];
  }
  push(token) {
    this.tokens.push({
      type: token.type,
      value: token.value
    });
  }
  isWhiteSpace(c) {
    return /\s/.test(c);
  }
  isVariable(c) {
    return /[A-Z]/.test(c);
  }
  isSpecial(c) {
    return /[¬∧∨&!|\-><->]/.test(c);
  }
  isExpressionBoundary(c) {
    return /[\(\)]/.test(c);
  }
  operatorExists(op) {
    return ["\xAC", "!", "\u2227", "&", "\u2228", "|", "->", "<->"].indexOf(op) !== -1;
  }
  throwTokenException(token, position) {
    throw new UnrecognizedTokenException(`Unrecognized token "${token}" on position ${position}`);
  }
};

// src/exceptions/syntax-error.exception.ts
exports.Lexer = Lexer;
var SyntaxException = class extends Error {};

// src/parser/Parser.ts
var Parser = class {
  /**
   * Constructor of the Parser class.
   * @param tokens Array of tokens to be analyzed.
   */
  constructor(tokens) {
    this.lastIsVariable = false;
    this.tokens = JSON.parse(JSON.stringify(tokens));
  }
  /**
   * Performs the analysis of the tokens and returns the logical formula tree.
   * @returns The logical formula resulting from the analysis of the tokens.
   */
  parse() {
    return this.process();
  }
  process(operation) {
    var _a, _b, _c, _d, _e, _f;
    operation = operation || null;
    const args = [];
    while (this.next()) {
      if (this.lastIsVariable && ((_a = this.token) == null ? void 0 : _a.type) === "variable") throw new SyntaxException(`Token "${this.token.value}": Expected one variable, but received more than 1.`);
      if (this.token === void 0) break;
      if (((_b = this.token) == null ? void 0 : _b.type) === "boundary") {
        if (this.token.value === ")") return this.node(operation, args);
        args.push(this.process());
      }
      if (((_c = this.token) == null ? void 0 : _c.type) === "variable") {
        args.push(this.token.value);
        if (this.isUnary(operation)) return this.node(operation, args);
      }
      if (((_d = this.token) == null ? void 0 : _d.type) === "operator") {
        if (this.isUnary(this.token.value)) {
          args.push(this.process(this.token.value));
          continue;
        }
        if (operation) {
          const tmp = args.slice(0);
          args.length = 0;
          args.push(this.node(operation, tmp));
        }
        operation = this.token.value;
      }
      this.lastIsVariable = ((_e = this.token) == null ? void 0 : _e.type) === "variable" || this.lastIsVariable && ((_f = this.token) == null ? void 0 : _f.type) === "boundary";
    }
    return this.node(operation, args);
  }
  next() {
    return this.token = this.tokens.shift();
  }
  node(operator, args) {
    if (["->", "<->", "&", "|", "\u2227", "\u2228"].includes(operator)) {
      if (args.length !== 2) throw new SyntaxException(`
        Token "${operator}": expected 2 variables, but received 1.
      `);
    }
    if (operator === "\xAC" || operator === "!") return {
      operation: "Negation",
      value: args[0]
    };
    if (operator === "\u2228" || operator === "|") return {
      operation: "Disjunction",
      left: args[0],
      right: args[1]
    };
    if (operator === "\u2227" || operator === "&") return {
      operation: "Conjunction",
      left: args[0],
      right: args[1]
    };
    if (operator === "->") return {
      operation: "Implication",
      left: args[0],
      right: args[1]
    };
    if (operator === "<->") return {
      operation: "Biconditional",
      left: args[0],
      right: args[1]
    };
    return args[0];
  }
  isUnary(operator) {
    return operator === "\xAC" || operator === "!";
  }
};

// src/utils/parse.ts
exports.Parser = Parser;
function parseToFormulaObject(formula) {
  const tokens = new Lexer(formula).lex();
  return new Parser(tokens).parse();
}
function parseToFormulaString(formula) {
  return Builder.buildFormula(formula);
}

// src/utils/printTruthTable.ts
function printTruthTable(truthTable) {
  console.log(`\x1B[36m${truthTable.headers.join("	")}\x1B[0m`);
  for (let i = 0; i < truthTable.truthCombinations.length; i++) {
    const combination = truthTable.truthCombinations[i];
    const values = truthTable.truthValues[i];
    const formattedCombination = combination.map(value => value ? "\x1B[32mT\x1B[0m" : "\x1B[31mF\x1B[0m").join("	");
    const formattedValue = values ? "\x1B[32mT\x1B[0m" : "\x1B[31mF\x1B[0m";
    console.log(`${formattedCombination}	${formattedValue}`);
  }
}

// src/utils/objectBuilder.ts
function implication(left, right) {
  let implication2 = {
    operation: "Implication",
    left,
    right
  };
  return implication2;
}
function biconditional(left, right) {
  let biconditional2 = {
    operation: "Biconditional",
    left,
    right
  };
  return biconditional2;
}
function conjunction(left, right) {
  let conjunction2 = {
    operation: "Conjunction",
    left,
    right
  };
  return conjunction2;
}
function disjunction(left, right) {
  let disjunction2 = {
    operation: "Disjunction",
    left,
    right
  };
  return disjunction2;
}
function negation(value) {
  let negation2 = {
    operation: "Negation",
    value
  };
  return negation2;
}

// src/calculator/Calculator.ts
var Calculator = exports.Calculator = class _Calculator {
  /**
   * Generates a truth table for the given formula.
   *
   * @param formula - The logical formula to generate a truth table for.
   * @param stringfiedFormula - An optional string representation of the formula.
   * @returns The truth table as an array containing headers, truth combinations, and results.
   *
   * @example
   * const output = Calculator.generateTruthTable('P -> Q');
   * console.log(output);
   * // Output:
   * // {
   * //   headers: ['P', 'Q', '(P -> Q)'],
   * //   truthCombinations: [
   * //     [false, false], [false, true],
   * //     [true, false], [true, true]
   * //   ],
   * //   truthValues: [true, true, false, true]
   * // }
   */
  static generateTruthTable(formula, stringfiedFormula) {
    if (typeof formula === "string" && !isPropositionalVariable(formula)) {
      const parsedFormula = parseToFormulaObject(formula);
      return _Calculator.generateTruthTable(parsedFormula, formula);
    }
    const variables = /* @__PURE__ */new Set();
    _Calculator.collectVariables(formula, variables);
    const variableArray = Array.from(variables);
    const truthCombinations = _Calculator.generateTruthCombinations(variableArray.length);
    const table = {
      headers: [],
      truthCombinations: [],
      truthValues: []
    };
    variableArray.forEach(variable => {
      table.headers.push(variable);
    });
    stringfiedFormula = stringfiedFormula || Builder.buildFormula(formula);
    table.headers.push(stringfiedFormula);
    truthCombinations.forEach(combination => {
      const values = {};
      variableArray.forEach((variable, index) => {
        values[variable] = !!combination[index];
      });
      table.truthCombinations.push(combination);
      const result = _Calculator.evaluate(formula, values);
      table.truthValues.push(result);
    });
    return table;
  }
  /**
   * Evaluates the given logical formula with the provided truth values for variables.
   *
   * @param formula - The logical formula to evaluate.
   * @param values - An object representing truth values for propositional variables.
   * @returns The result of the evaluation (true or false).
   *
   * @example
   * const result = Calculator.evaluate('P -> Q', { P: true, Q: false });
   * console.log(result); // Output: false
   */
  static evaluate(formula, values) {
    if (typeof formula === "string" && !isPropositionalVariable(formula)) {
      const parsedFormula = parseToFormulaObject(formula);
      return _Calculator.evaluate(parsedFormula, values);
    }
    if (typeof formula === "string") return values[`${formula}`];
    if (formula.operation === "Implication") {
      return _Calculator.evaluateImplication(formula, values);
    }
    if (formula.operation === "Biconditional") {
      return _Calculator.evaluateBiconditional(formula, values);
    }
    if (formula.operation === "Conjunction") {
      return _Calculator.evaluateConjunction(formula, values);
    }
    if (formula.operation === "Disjunction") {
      return _Calculator.evaluateDisjunction(formula, values);
    }
    if (formula.operation === "Negation") {
      return _Calculator.evaluateNegation(formula, values);
    }
    throw new Error("Invalid formula operation");
  }
  /**
   * Checks if a given formula is a semantic consequence of the given premises.
   * A semantic consequence holds if, in every possible truth assignment to the propositional variables,
   * when all premises are true, the conclusion is also true.
   *
   * @param premises - An array of logical formulas or strings representing the premises.
   * @param conclusion - The conclusion formula to check as a semantic consequence.
   * @returns True if the conclusion is a semantic consequence of the premises, false otherwise.
   *
   * @example
   * const output = Calculator.isSemanticConsequence(['P->Q', 'P'], 'Q');
   * console.log(output); // Output: true
   */
  static isSemanticConsequence(premises, conclusion) {
    const variables = /* @__PURE__ */new Set();
    let conjunctionOfPremises;
    if (typeof conclusion === "string" && !isPropositionalVariable(conclusion)) conclusion = parseToFormulaObject(conclusion);
    if (premises.length === 1) {
      conjunctionOfPremises = typeof premises[0] === "object" ? premises[0] : parseToFormulaObject(premises[0]);
    } else {
      if (!isArrayString(premises)) {
        premises = premises.map(premise => parseToFormulaString(premise));
      }
      let conjunctionFormulaString = buildConjunctionString(premises);
      conjunctionOfPremises = parseToFormulaObject(conjunctionFormulaString);
    }
    _Calculator.collectVariables(conjunctionOfPremises, variables);
    const variableArray = Array.from(variables);
    const truthCombinations = _Calculator.generateTruthCombinations(variableArray.length);
    for (const combination of truthCombinations) {
      const values = {};
      variableArray.forEach((variable, index) => {
        values[variable] = !!combination[index];
      });
      const allPremisesAreTrue = _Calculator.evaluate(conjunctionOfPremises, values);
      if (allPremisesAreTrue && !_Calculator.evaluate(conclusion, values)) return false;
    }
    return true;
  }
  static evaluateImplication(formula, values) {
    const left = _Calculator.evaluate(formula.left, values);
    const right = _Calculator.evaluate(formula.right, values);
    return !left || right;
  }
  static evaluateBiconditional(formula, values) {
    const left = _Calculator.evaluate(formula.left, values);
    const right = _Calculator.evaluate(formula.right, values);
    return left && right || !left && !right;
  }
  static evaluateConjunction(formula, values) {
    const left = _Calculator.evaluate(formula.left, values);
    const right = _Calculator.evaluate(formula.right, values);
    return left && right;
  }
  static evaluateDisjunction(formula, values) {
    const left = _Calculator.evaluate(formula.left, values);
    const right = _Calculator.evaluate(formula.right, values);
    return left || right;
  }
  static evaluateNegation(formula, values) {
    const value = _Calculator.evaluate(formula.value, values);
    return !value;
  }
  static generateTruthCombinations(numVariables) {
    const combinations = [];
    const totalCombinations = 2 ** numVariables;
    for (let i = 0; i < totalCombinations; i++) {
      const binaryString = i.toString(2).padStart(numVariables, "0");
      const combination = binaryString.split("").map(bit => bit === "1");
      combinations.push(combination);
    }
    return combinations;
  }
  static collectVariables(formula, variables) {
    if (isPropositionalVariable(formula)) {
      variables.add(formula);
    } else if (isNegation(formula)) {
      _Calculator.collectVariables(formula.value, variables);
    } else {
      _Calculator.collectVariables(formula.left, variables);
      _Calculator.collectVariables(formula.right, variables);
    }
  }
};

// src/rulers/RuleApplier.ts

// src/rulers/RuleSetter.ts

var RuleSetter = class {
  static BiconditionalIntroduction(conditional1, conditional2) {
    if ((0, _util.isDeepStrictEqual)(conditional1.left, conditional2.right) && (0, _util.isDeepStrictEqual)(conditional1.right, conditional2.left)) return {
      operation: "Biconditional",
      left: conditional1.left,
      right: conditional1.right
    };
    const errorMsg = `Biconditional Introduction: cannot apply in ${parseToFormulaString(conditional1)} and ${parseToFormulaString(conditional2)}`;
    throw new InferenceException(errorMsg);
  }
  static BiconditionalElimination(biconditional2) {
    const implication1 = {
      operation: "Implication",
      left: biconditional2.left,
      right: biconditional2.right
    };
    const implication2 = {
      operation: "Implication",
      left: biconditional2.right,
      right: biconditional2.left
    };
    return {
      operation: "Conjunction",
      left: implication1,
      right: implication2
    };
  }
  static ConditionalProof(hypothesis, conclusionOfHypothesis) {
    const conditional = {
      operation: "Implication",
      left: hypothesis,
      right: conclusionOfHypothesis
    };
    return conditional;
  }
  static Conditionalization(formula, conditional) {
    if ((0, _util.isDeepStrictEqual)(formula, conditional.right)) return conditional;
    throw new InferenceException(`Conditionalization: cannot apply in ${parseToFormulaString(conditional)} with ${parseToFormulaString(formula)}`);
  }
  static Commutativity(formula) {
    const right = formula.right;
    formula.right = formula.left;
    formula.left = right;
    return formula;
  }
  static Contraposition(formula) {
    const contraposition = {
      operation: "Implication",
      left: {
        operation: "Negation",
        value: formula.right
      },
      right: {
        operation: "Negation",
        value: formula.left
      }
    };
    return eliminateDoubleNegations(contraposition);
  }
  static ConjunctionIntroduction(formula1, formula2) {
    return {
      operation: "Conjunction",
      left: formula1,
      right: formula2
    };
  }
  static ConjunctionElimination(conjunction2) {
    return [conjunction2.left, conjunction2.right];
  }
  static DeMorgan(formula) {
    if (isNegation(formula)) {
      if (isDisjunction(formula.value)) {
        return {
          operation: "Conjunction",
          left: {
            operation: "Negation",
            value: formula.value.left
          },
          right: {
            operation: "Negation",
            value: formula.value.right
          }
        };
      }
      if (isConjunction(formula.value)) {
        return {
          operation: "Disjunction",
          left: {
            operation: "Negation",
            value: formula.value.left
          },
          right: {
            operation: "Negation",
            value: formula.value.right
          }
        };
      }
    }
    if (isDisjunction(formula)) {
      if (!(isNegation(formula.left) && isNegation(formula.right))) throw new InferenceException(`De Morgan: cannot apply in ${parseToFormulaString(formula)}`);
      return {
        operation: "Negation",
        value: {
          operation: "Conjunction",
          left: formula.left.value,
          right: formula.right.value
        }
      };
    }
    if (isConjunction(formula)) {
      if (!(isNegation(formula.left) && isNegation(formula.right))) throw new InferenceException(`De Morgan: cannot apply in ${parseToFormulaString(formula)}`);
      return {
        operation: "Negation",
        value: {
          operation: "Disjunction",
          left: formula.left.value,
          right: formula.right.value
        }
      };
    }
    throw new InferenceException(`De Morgan: cannot apply in ${parseToFormulaString(formula)}`);
  }
  static DisjunctionIntroduction(formula, disjunction2) {
    if ((0, _util.isDeepStrictEqual)(disjunction2.left, formula)) return disjunction2;
    if ((0, _util.isDeepStrictEqual)(disjunction2.right, formula)) return disjunction2;
    const errorMsg = `Disjunction Introduction: cannot apply in ${parseToFormulaString(disjunction2)} with ${parseToFormulaString(formula)}`;
    throw new InferenceException(errorMsg);
  }
  static DisjunctiveSyllogism(disjunction2, negatedDisjunct) {
    if ((0, _util.isDeepStrictEqual)(disjunction2.left, negatedDisjunct.value)) return disjunction2.right;
    if ((0, _util.isDeepStrictEqual)(disjunction2.right, negatedDisjunct.value)) return disjunction2.left;
    const errorMsg = `Disjunctive Syllogism: cannot apply in ${parseToFormulaString(disjunction2)} with ${parseToFormulaString(negatedDisjunct)}`;
    throw new InferenceException(errorMsg);
  }
  static ImplicationElimination(conditional) {
    return {
      operation: "Disjunction",
      left: {
        operation: "Negation",
        value: conditional.left
      },
      right: conditional.right
    };
  }
  static ImplicationNegation(negation2) {
    if (!isImplication(negation2.value)) throw new InferenceException(`Implication Negation: cannot apply in ${parseToFormulaString(negation2)}`);
    return {
      operation: "Conjunction",
      left: negation2.value.left,
      right: {
        operation: "Negation",
        value: negation2.value.right
      }
    };
  }
  static DoubleNegation(formula) {
    return eliminateDoubleNegations(formula);
  }
  static DoubleNegationIntroduction(formula) {
    const negation2 = {
      operation: "Negation",
      value: {
        operation: "Negation",
        value: formula
      }
    };
    return negation2;
  }
  static ConjunctionOverDisjunctionDistribution(formula) {
    return this.Distribute(formula, isDisjunction);
  }
  static DisjunctionOverConjunctionDistribution(formula) {
    return this.Distribute(formula, isConjunction);
  }
  static ConjunctionAssociativity(formula) {
    return this.Associate(formula, isConjunction);
  }
  static DisjunctionAssociativity(formula) {
    return this.Associate(formula, isDisjunction);
  }
  static BiconditionalAssociativity(formula) {
    return this.Associate(formula, isBiconditional);
  }
  static HypotheticalSyllogism(conditional1, conditional2) {
    if ((0, _util.isDeepStrictEqual)(conditional1.right, conditional2.left)) {
      return {
        operation: "Implication",
        left: conditional1.left,
        right: conditional2.right
      };
    }
    if ((0, _util.isDeepStrictEqual)(conditional1.left, conditional2.right)) {
      return {
        operation: "Implication",
        left: conditional2.left,
        right: conditional1.right
      };
    }
    const errorMsg = `Hypothetical Syllogism: cannot apply in ${parseToFormulaString(conditional1)} with ${parseToFormulaString(conditional2)}`;
    throw new InferenceException(errorMsg);
  }
  static ModusPonens(conditional, antecedent) {
    if ((0, _util.isDeepStrictEqual)(conditional.left, antecedent)) return conditional.right;
    const errorMsg = `Modus Ponens: cannot apply in ${parseToFormulaString(conditional)} with ${parseToFormulaString(antecedent)}`;
    throw new InferenceException(errorMsg);
  }
  static ModusTollens(conditional, negatedConsequent) {
    if ((0, _util.isDeepStrictEqual)(conditional.right, negatedConsequent.value)) return {
      operation: "Negation",
      value: conditional.left
    };
    const errorMsg = `Modus Tollens: cannot apply in ${parseToFormulaString(conditional)} with ${parseToFormulaString(negatedConsequent)}`;
    throw new InferenceException(errorMsg);
  }
  static ReductioAdAbsurdum(conditional) {
    if (isContradiction(conditional.right)) return {
      operation: "Negation",
      value: conditional.left
    };
    throw new InferenceException(`Reductio Ad Absurdum: cannot apply in ${conditional} with ${conditional.right}`);
  }
  static DistributeRecursively(formula, isK) {
    try {
      return this.Distribute(formula, isK);
    } catch (e) {
      return formula;
    }
  }
  static Distribute(formula, isK) {
    let KFormula;
    let otherFormula;
    if (isK(formula.left)) {
      KFormula = formula.left;
      otherFormula = formula.right;
    } else if (isK(formula.right)) {
      KFormula = formula.right, otherFormula = formula.left;
    } else {
      throw new InferenceException(`Distribution: cannot apply in ${parseToFormulaString(formula)}`);
    }
    let distributedFormula = {
      operation: KFormula.operation,
      left: {
        operation: formula.operation,
        left: otherFormula,
        right: KFormula.left
      },
      right: {
        operation: formula.operation,
        left: otherFormula,
        right: KFormula.right
      }
    };
    if (!isPropositionalVariable(distributedFormula.left)) distributedFormula.left = this.DistributeRecursively(distributedFormula.left, isK);
    if (!isPropositionalVariable(distributedFormula.right)) distributedFormula.right = this.DistributeRecursively(distributedFormula.right, isK);
    return distributedFormula;
  }
  static Associate(formula, isT) {
    let mainFormula;
    let otherFormula;
    if (isT(formula.left)) {
      mainFormula = formula.left;
      otherFormula = formula.right;
      return {
        operation: formula.operation,
        left: mainFormula.left,
        right: {
          operation: formula.operation,
          left: mainFormula.right,
          right: otherFormula
        }
      };
    }
    if (isT(formula.right)) {
      mainFormula = formula.right;
      otherFormula = formula.left;
      return {
        operation: formula.operation,
        left: {
          operation: formula.operation,
          left: otherFormula,
          right: mainFormula.left
        },
        right: mainFormula.right
      };
    }
    throw new InferenceException(`Associativity: cannot apply in ${parseToFormulaString(formula)}`);
  }
};

// src/rulers/RuleApplier.ts
exports.RuleSetter = RuleSetter;
var RuleApplier = exports.RuleApplier = class _RuleApplier extends RuleSetter {
  static biconditionalIntroduction(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const formulas = [proof[requiredItens[0]].expression, proof[requiredItens[1]].expression];
    if (!isImplication(formulas[0]) || !isImplication(formulas[1])) throw new InferenceException(`Biconditional Introduction (Line ${line}): conditionals not found.`);
    const inferenceResult = _RuleApplier.BiconditionalIntroduction(formulas[0], formulas[1]);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static biconditionalElimination(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const biconditional2 = proof[requiredItem[0]].expression;
    if (!isBiconditional(biconditional2)) throw new InferenceException(`Biconditional Elimination (Line ${line}): biconditional not found.`);
    const inferenceResult = _RuleApplier.BiconditionalElimination(biconditional2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conditionalization(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    if (!isImplication(item.expression)) throw new InferenceException(`Conditionalization (Line ${line}): the formula is not an implication.`);
    const formula = proof[requiredItem[0]].expression;
    if (typeof formula === "string" && !isPropositionalVariable(formula)) throw new InferenceException(`Conditionalization (Line ${line}): formula not found.`);
    const inferenceResult = _RuleApplier.Conditionalization(formula, item.expression);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conjunctionIntroduction(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const firstFormula = proof[requiredItens[0]].expression;
    if (typeof firstFormula === "string" && !isPropositionalVariable(firstFormula)) throw new InferenceException(`Conjunction Introduction (Line ${line}): line ${requiredItens[0]} formula not found.`);
    const secondFormula = proof[requiredItens[1]].expression;
    if (typeof secondFormula === "string" && !isPropositionalVariable(secondFormula)) throw new InferenceException(`Conjunction Introduction (Line ${line}): line ${requiredItens[1]} formula not found.`);
    const inferenceResult = _RuleApplier.ConjunctionIntroduction(firstFormula, secondFormula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conjunctionElimination(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const conjunction2 = proof[requiredItem[0]].expression;
    if (!isConjunction(conjunction2)) throw new InferenceException(`Conjunction Elimination (Line ${line}): conjunction not found.`);
    const inferenceResults = _RuleApplier.ConjunctionElimination(conjunction2);
    if (!(0, _util.isDeepStrictEqual)(item.expression, inferenceResults[0]) && !(0, _util.isDeepStrictEqual)(item.expression, inferenceResults[1])) {
      throw new InferenceException(`Conjunction Elimination (Line ${line}): expected ${parseToFormulaString(inferenceResults[0])} or ${parseToFormulaString(inferenceResults[1])} but received ${parseToFormulaString(item.expression)}`);
    }
    return inferenceResults;
  }
  static commutativity(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (!isDisjunction(formula) && !isConjunction(formula) && !isBiconditional(formula)) throw new InferenceException(`Commutativity (Line ${line}): cannot find any conjunction, biconditional or disjunction.`);
    const inferenceResult = _RuleApplier.Commutativity(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static contraposition(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (!isImplication(formula)) throw new InferenceException(`Contraposition (Line ${line}): implication not found.`);
    const inferenceResult = _RuleApplier.Contraposition(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static deMorgan(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (!isNegation(formula) && !isConjunction(formula) && !isDisjunction(formula)) throw new InferenceException(`De Morgan (Line ${line}): formula is not a disjunction, conjunction or negation.`);
    const inferenceResult = _RuleApplier.DeMorgan(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static disjunctionIntroduction(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    if (!isDisjunction(item.expression)) throw new InferenceException(`Disjunction Introduction (Line ${line}): expression is not a disjunction`);
    const formula = proof[requiredItem[0]].expression;
    if (typeof formula === "string" && !isPropositionalVariable(formula)) throw new InferenceException(`Disjunction Introduction (Line ${line}): formula not found.`);
    const inferenceResult = _RuleApplier.DisjunctionIntroduction(formula, item.expression);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static disjunctiveSyllogism(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const firstFormula = proof[requiredItens[0]].expression;
    const secondFormula = proof[requiredItens[1]].expression;
    let remainingFormula;
    let disjunction2;
    if (isDisjunction(firstFormula)) {
      disjunction2 = firstFormula;
      remainingFormula = secondFormula;
    }
    if (isDisjunction(secondFormula)) {
      disjunction2 = secondFormula;
      remainingFormula = firstFormula;
    }
    if (!disjunction2) throw new InferenceException(`Disjunctive Syllogism (Line ${line}): disjunction not found`);
    let negation2;
    if (isNegation(remainingFormula)) negation2 = remainingFormula;
    if (!negation2) throw new InferenceException(`Disjunctive Syllogism (Line ${line}): negation not found`);
    const inferenceResult = _RuleApplier.DisjunctiveSyllogism(disjunction2, negation2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static doubleNegation(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (typeof formula === "string" && !isPropositionalVariable(formula)) throw new InferenceException(`Double Negation (Line ${line}): formula not found.`);
    const inferenceResult = _RuleApplier.DoubleNegation(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static doubleNegationIntroduction(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (typeof formula === "string" && !isPropositionalVariable(formula)) throw new InferenceException(`Double Negation Introduction (Line ${line}): negation not found.`);
    const inferenceResult = _RuleApplier.DoubleNegationIntroduction(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static hypotheticalSyllogism(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const firstFormula = proof[requiredItens[0]].expression;
    const secondFormula = proof[requiredItens[1]].expression;
    if (!isImplication(firstFormula) || !isImplication(secondFormula)) throw new InferenceException(`Hypothetical Syllogism (Line ${line}): both formulas should be conditionals.`);
    const inferenceResult = _RuleApplier.HypotheticalSyllogism(firstFormula, secondFormula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static implicationElimination(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const formula = proof[requiredItem[0]].expression;
    if (!isImplication(formula)) throw new InferenceException(`Implication Elimination (Line ${line}): implication not found.`);
    const inferenceResult = _RuleApplier.ImplicationElimination(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static implicationNegation(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    let formula = proof[requiredItem[0]].expression;
    if (!isNegation(formula)) throw new InferenceException(`Implication Negation (Line ${line}): negation not found`);
    const inferenceResult = _RuleApplier.ImplicationNegation(formula);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static modusPonens(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    let firstFormula = proof[requiredItens[0]].expression;
    let secondFormula = proof[requiredItens[1]].expression;
    let remainingFormula;
    let implication2;
    if (isImplication(firstFormula)) {
      implication2 = firstFormula;
      remainingFormula = secondFormula;
    }
    if (isImplication(secondFormula)) {
      implication2 = secondFormula;
      remainingFormula = firstFormula;
    }
    if (!implication2) throw new InferenceException(`Modus Ponens (Line ${line}): implication not found`);
    const antecedent = remainingFormula;
    if (!isPropositionalVariable(antecedent) && typeof antecedent === "string") throw new InferenceException(`Modus Ponens (Line ${line}): antecedent not found`);
    const inferenceResult = _RuleApplier.ModusPonens(implication2, antecedent);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static modusTollens(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const firstFormula = proof[requiredItens[0]].expression;
    const secondFormula = proof[requiredItens[1]].expression;
    let remainingFormula;
    let implication2;
    if (isImplication(firstFormula)) {
      implication2 = firstFormula;
      remainingFormula = secondFormula;
    }
    if (isImplication(secondFormula)) {
      implication2 = secondFormula;
      remainingFormula = firstFormula;
    }
    if (!implication2) throw new InferenceException(`Modus Tollens (Line ${line}): implication not found`);
    const consequent = remainingFormula;
    if (!isNegation(consequent)) throw new InferenceException(`Modus Tollens (Line ${line}): negated consequent not found`);
    const inferenceResult = _RuleApplier.ModusTollens(implication2, consequent);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conjunctionOverDisjunctionDistribution(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const conjunction2 = proof[requiredItem[0]].expression;
    if (!isConjunction(conjunction2)) throw new InferenceException(`Distribution (Line ${line}): conjunction not found.`);
    const inferenceResult = _RuleApplier.ConjunctionOverDisjunctionDistribution(conjunction2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static disjunctionOverConjunctionDistribution(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const disjunction2 = proof[requiredItem[0]].expression;
    if (!isDisjunction(disjunction2)) throw new InferenceException(`Distribution (Line ${line}): disjunction not found.`);
    const inferenceResult = _RuleApplier.DisjunctionOverConjunctionDistribution(disjunction2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conjunctionAssociativity(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const conjunction2 = proof[requiredItem[0]].expression;
    if (!isConjunction(conjunction2)) throw new InferenceException(`Associativity (Line ${line}): conjunction not found.`);
    const inferenceResult = _RuleApplier.ConjunctionAssociativity(conjunction2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static disjunctionAssociativity(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const disjunction2 = proof[requiredItem[0]].expression;
    if (!isDisjunction(disjunction2)) throw new InferenceException(`Associativity (Line ${line}): disjunction not found.`);
    const inferenceResult = _RuleApplier.DisjunctionAssociativity(disjunction2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static biconditionalAssociativity(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const biconditional2 = proof[requiredItem[0]].expression;
    if (!isBiconditional(biconditional2)) throw new InferenceException(`Associativity (Line ${line}): disjunction not found.`);
    const inferenceResult = _RuleApplier.BiconditionalAssociativity(biconditional2);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static conditionalProof(item, proof) {
    const requiredItens = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 2, requiredItens.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItens, proof);
    const item1 = proof[requiredItens[0]];
    const item2 = proof[requiredItens[1]];
    if (!isPropositionalVariable(item2.expression) && typeof item2.expression === "string") throw new InferenceException(`Conditional Proof (Line ${line}): cannot find a formula at line ${item2.id}`);
    if (!isPropositionalVariable(item1.expression) && typeof item1.expression === "string") throw new InferenceException(`Conditional Proof (Line ${line}): cannot find a formula at line ${item1.id}`);
    let hypothesis;
    let endOfHypothesis;
    if (isHypothesis(item1) && isEndOfHypothesis(item2)) {
      hypothesis = item1.expression;
      if (item2.hypothesisId != item1.id) throw new InferenceException(`Conditional Proof (Line ${line}): end of hypothesis references line ${item2.hypothesisId} hypothesis, but received line ${item1.id} hypothesis`);
      endOfHypothesis = item2.expression;
    } else if (isHypothesis(item2) && isEndOfHypothesis(item1)) {
      hypothesis = item2.expression;
      if (item1.hypothesisId != item2.id) throw new InferenceException(`Conditional Proof (Line ${line}): end of hypothesis references line ${item1.hypothesisId} hypothesis, but received line ${item2.id} hypothesis`);
      endOfHypothesis = item1.expression;
    } else {
      throw new InferenceException(`Conditional Proof: end of hypothesis or hypothesis not found.`);
    }
    const inferenceResult = _RuleApplier.ConditionalProof(hypothesis, endOfHypothesis);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static reductioAdAbsurdum(item, proof) {
    const requiredItem = item.from[0];
    const line = item.id;
    _RuleApplier.throwsIfLengthDoesntMatch(item, 1, requiredItem.length);
    _RuleApplier.throwsIfIndexDoesntExist(requiredItem, proof);
    const conditional = proof[requiredItem[0]].expression;
    if (!isImplication(conditional)) throw new InferenceException(`Reductio Ad Absurdum (Line ${line}): conditional not found.`);
    const inferenceResult = _RuleApplier.ReductioAdAbsurdum(conditional);
    _RuleApplier.throwsIfIsNotEqual(inferenceResult, item);
    return inferenceResult;
  }
  static throwsIfIsNotEqual(expectedFormula, actualItem) {
    const actualFormula = actualItem.expression;
    const inferenceMethod = actualItem.from[1];
    if (!(0, _util.isDeepStrictEqual)(expectedFormula, actualFormula)) {
      throw new InferenceException(`
        ${inferenceMethod} (Line ${actualItem.id}): expected ${parseToFormulaString(expectedFormula)} but received ${parseToFormulaString(actualFormula)}
      `);
    }
  }
  static throwsIfLengthDoesntMatch(item, expected, received) {
    const rule = item.from[1];
    const line = item.id;
    if (expected !== received) throw new InferenceException(`${rule} (Line ${line}): expect ${expected} formulas to apply the rule but received ${received}.`);
  }
  static throwsIfIndexDoesntExist(requiredItens, proof) {
    requiredItens.forEach(idx => {
      if (!proof[idx]) throw new InferenceException(`Cannot find a formula at index ${idx}`);
    });
  }
};

// src/types/syntactic/proof.ts
var inferenceRulesMap = exports.inferenceRulesMap = {
  "Associativity (Biconditional)": RuleApplier.biconditionalAssociativity,
  "Associativity (Conjunction)": RuleApplier.conjunctionAssociativity,
  "Associativity (Disjunction)": RuleApplier.disjunctionAssociativity,
  "Biconditional Elimination": RuleApplier.biconditionalElimination,
  "Biconditional Introduction": RuleApplier.biconditionalIntroduction,
  "Commutativity": RuleApplier.commutativity,
  "Conditional Proof": RuleApplier.conditionalProof,
  "Conditionalization": RuleApplier.conditionalization,
  "Contraposition": RuleApplier.contraposition,
  "Conjunction Elimination": RuleApplier.conjunctionElimination,
  "Conjunction Introduction": RuleApplier.conjunctionIntroduction,
  "De Morgan": RuleApplier.deMorgan,
  "Disjunction Introduction": RuleApplier.disjunctionIntroduction,
  "Disjunctive Syllogism": RuleApplier.disjunctiveSyllogism,
  "Distribution (Conjunction over Disjunction)": RuleApplier.conjunctionOverDisjunctionDistribution,
  "Distribution (Disjunction over Conjunction)": RuleApplier.disjunctionOverConjunctionDistribution,
  "Double Negation": RuleApplier.doubleNegation,
  "Double Negation Introduction": RuleApplier.doubleNegationIntroduction,
  "Hypothetical Syllogism": RuleApplier.hypotheticalSyllogism,
  "Implication Elimination": RuleApplier.implicationElimination,
  "Implication Negation": RuleApplier.implicationNegation,
  "Modus Ponens": RuleApplier.modusPonens,
  "Modus Tollens": RuleApplier.modusTollens,
  "Reductio Ad Absurdum": RuleApplier.reductioAdAbsurdum
};

// src/proof-checker/ProofChecker.ts
var ProofChecker = exports.ProofChecker = class _ProofChecker {
  /**
   * Checks the given proof for validity.
   *
   * @param {Proof} proof - The proof to be checked.
   * @returns {boolean} - `true` if the proof is valid, `InferenceError` or `Error` otherwise.
   */
  static check(proof) {
    const mappedProof = _ProofChecker.createMappedProof(proof);
    let premises = [];
    let conclusion;
    Object.keys(mappedProof).forEach((_, idx) => {
      const item = mappedProof[idx + 1];
      if (isProofItemInferred(item)) {
        const [requiredItens, inferenceRule] = item.from;
        _ProofChecker.validateScope(requiredItens, item, mappedProof);
        inferenceRulesMap[inferenceRule](item, proof);
        console.log("\x1B[32m", `Applied ${inferenceRule} with success at line ${item.id} \u2714\uFE0F`);
      }
      if (item.type === "Premise") {
        premises.push(item.expression);
      }
      if (item.type === "Conclusion") {
        conclusion = parseToFormulaString(item.expression);
      }
      premises = premises.map(formula => {
        return parseToFormulaString(formula);
      });
    });
    console.log("\x1B[0m", `
{ ${premises.join(", ")} } \u22A2 ${conclusion}`);
    return true;
  }
  /**
   * Creates a mapped version of the proof, with the representation of the scopes of each item.
   * @param {Proof} proof - The proof to be mapped.
   * @returns {MappedProof} - The mapped proof.
   */
  static createMappedProof(proof) {
    let layerIdx = 0;
    let blockIdx = 0;
    Object.keys(proof).forEach((_, idx) => {
      idx++;
      const item = proof[idx];
      if (isHypothesis(item)) {
        blockIdx++;
        layerIdx++;
        proof[idx]["scopeIdx"] = [layerIdx, blockIdx];
      } else if (isEndOfHypothesis(item)) {
        const itemBlockIdx = proof[item.hypothesisId]["scopeIdx"][1];
        proof[idx]["scopeIdx"] = [layerIdx, itemBlockIdx];
        layerIdx--;
      } else {
        proof[idx]["scopeIdx"] = layerIdx === 0 ? [0, 0] : [layerIdx, blockIdx];
        if (layerIdx !== 0 && proof[idx].type === "Conclusion") throw new Error(`(Line ${idx}): You cannot put your conclusion inside of a hypothesis.`);
      }
    });
    return proof;
  }
  /**
   * Validates the scope of inferred items.
   * @param {number[]} requiredItens - An array of required item IDs.
   * @param {ProofItemInferred} item - The inferred proof item to be validated.
   * @param {MappedProof} mappedProof - The mapped proof.
   */
  static validateScope(requiredItens, item, mappedProof) {
    requiredItens.forEach(requiredItemId => {
      const [actualLayer, actualBlock] = mappedProof[item.id].scopeIdx;
      const [requiredLayer, requiredBlock] = mappedProof[requiredItemId].scopeIdx;
      const [, inferenceRule] = item.from;
      if (actualLayer < requiredLayer && actualBlock != requiredBlock && inferenceRule != "Conditional Proof") throw new InferenceException(`Scope Error: cannot access line ${requiredItemId} by the ${item.id} line.`);
    });
  }
};

// src/reducer/Reducer.ts
var Reducer = class {
  /**
   * Recursively reduces a logical formula to its reduced form based on its operation.
   * @param x - The logical formula to reduce.
   * @returns The reduced logical formula.
   */
  static reduceFormula(x) {
    if (typeof x === "string") return x;
    switch (x.operation) {
      case "Biconditional":
        return this.biconditional(x);
      case "Implication":
        return this.implication(x);
      case "Conjunction":
        return this.conjunction(x);
      case "Disjunction":
        return this.disjunction(x);
      case "Negation":
        return this.negation(x);
      default:
        throw new Error("Invalid operation");
    }
  }
  /**
   * Reduces a Biconditional to a Conjunction.
   * @param x - The Biconditional operation to reduce.
   * @returns The reduced Conjunction formula.
   */
  static biconditional(x) {
    const left = this.reduceFormula(x.left);
    const right = this.reduceFormula(x.right);
    const reducedLeft = this.reduceFormula({
      operation: "Implication",
      left,
      right
    });
    const reducedRight = this.reduceFormula({
      operation: "Implication",
      left: right,
      right: left
    });
    return {
      operation: "Conjunction",
      left: reducedLeft,
      right: reducedRight
    };
  }
  /**
   * Reduces an Implication to a Disjunction
   * @param x - The formula to reduce.
   * @returns The reduced Disjunction formula.
   */
  static implication(x) {
    const left = this.reduceFormula(x.left);
    const right = this.reduceFormula(x.right);
    return {
      operation: "Disjunction",
      left: {
        operation: "Negation",
        value: left
      },
      right
    };
  }
  /**
   * Reduces both sides of a Conjunction
   * @param x - The formula to reduce.
   * @returns The reduced Conjunction formula.
   */
  static conjunction(x) {
    const left = this.reduceFormula(x.left);
    const right = this.reduceFormula(x.right);
    return {
      operation: "Conjunction",
      left,
      right
    };
  }
  /**
   * Reduces both sides of a Disjunction
   * @param x - The formula to reduce.
   * @returns The reduced Disjunction formula.
   */
  static disjunction(x) {
    const left = this.reduceFormula(x.left);
    const right = this.reduceFormula(x.right);
    return {
      operation: "Disjunction",
      left,
      right
    };
  }
  /**
   * Reduces the negated formula
   * @param x - The formula to reduce.
   * @returns The reduced Negation formula.
   */
  static negation(x) {
    const value = this.reduceFormula(x.value);
    return {
      operation: "Negation",
      value
    };
  }
};

// src/frege/Frege.ts
exports.Reducer = Reducer;
var Frege = class {
  constructor() {
    this.builder = Builder;
    this.reducer = Reducer;
    this.calculator = Calculator;
    this.proofChecker = ProofChecker;
    /**
     * The `parse` property provides functions to build and parse formulas in propositional logic.
     * @public
     */
    this.parse = {
      /**
       * Builds a formula object from a string, which contains a well-formed formula of the propositional logic.
       * @param formula - The logical formula to build.
       * @returns The built formula object.
       * @throws {UnrecognizedTokenException} If the provided formula contains unrecognized tokens.
       *
       * @example
       *
       * // Input: "P->Q"
       * // Output: { operation: 'Implication', left: 'P', right: 'Q' }
       * const parsedFormula = frege.parse.toFormulaObject<Implication>("P->Q");
       * console.log(parsedFormula);
       */
      toFormulaObject: formula => {
        const tokens = new Lexer(formula).lex();
        const parsedFormula = new Parser(tokens).parse();
        return parsedFormula;
      },
      /**
       * Builds a logical formula string from a formula object using the syntax of propositional logic.
       * @param formula - The formula object to build the string from.
       * @returns The built logical formula string.
       * @throws {InvalidFormulaException} If the provided formula object is invalid or incomplete.
       *
       * @example
       *
       * // Input: { operation: 'Implication', left: 'P', right: 'Q' }
       * // Output: "(P->Q)"
       * const implication: Implication = {
       *    operation: 'Implication',
       *    left: 'P',
       *    right: 'Q'
       * };
       *
       * const parsedFormula = frege.parse.toFormulaString(implication);
       * console.log(parsedFormula); // => "(P->Q)"
       */
      toFormulaString: formula => {
        return this.builder.buildFormula(formula);
      }
    };
    this.verifyConsequence = {
      semantic: this.calculator.isSemanticConsequence,
      syntactic: () => {}
    };
    /**
     * Reduces a formula object or a formula string to its reduced form.
     * @param formula - The formula object or formula string to reduce.
     * @returns The reduced formula in its string representation or as a formula object.
     *
     * @example
     * // Input: { operation: 'Implication', left: 'P', right: ' Q' }
     * // Output: { operation: 'Disjunction' left: { operation: 'Negation', value: 'P'}, right: 'Q' };
     *
     * const formulaObject: Implication = {
     *    operation: 'Implication',
     *    left: 'P',
     *    right: 'Q'
     * };
     *
     * const reducedFormula = frege.reduce(formulaObject);
     * console.log(reducedFormula); // => { operation: 'Disjunction' left: { operation: 'Negation', value: 'P'}, right: 'Q' };
     *
     *
     * // Input: "P<->Q"
     * // Output: '((¬(P) ∨ Q) ∧ (¬(Q) ∨ P))'
     *
     * const formulaString = "P<->Q";
     *
     * const reducedFormula = frege.reduce(formulaString);
     * console.log(reducedFormula); // => '((¬(P) ∨ Q) ∧ (¬(Q) ∨ P))'
     */
    this.reduce = formula => {
      if (typeof formula === "string") {
        let formulaObject = this.parse.toFormulaObject(formula);
        formulaObject = this.reducer["reduceFormula"](formulaObject);
        return this.parse.toFormulaString(formulaObject);
      }
      let operation = formula.operation.toLocaleLowerCase();
      const reducedFormula = this.reducer[operation](formula);
      return reducedFormula;
    };
    /**
     * Evaluates the given logical formula with the provided truth values for variables.
     *
     * @param formula - The logical formula to evaluate.
     * @param values - An object representing truth values for propositional variables.
     * @returns The result of the evaluation (true or false).
     *
     * @example
     * const result = Calculator.evaluate('P -> Q', { P: true, Q: false });
     * console.log(result); // Output: false
     */
    this.evaluate = this.calculator.evaluate;
    /**
     * Generates a truth table for the given formula.
     *
     * @param formula - The logical formula to generate a truth table for.
     * @param stringfiedFormula - An optional string representation of the formula.
     * @returns The truth table as an array containing headers, truth combinations, and results.
     *
     * @example
     * const output = Calculator.generateTruthTable('P -> Q');
     * console.log(output);
     * // Output:
     * {
     *    headers: ['P', 'Q', '(P -> Q)'],
     *    truthCombinations: [
     *      [false, false], [false, true],
     *      [true, false], [true, true]
     *    ],
     *    truthValues: [true, true, false, true]
     *  }
     */
    this.generateTruthTable = this.calculator.generateTruthTable;
    /**
       * Checks the given proof for validity.
       * 
       * @param {Proof} proof - The proof to be checked.
       * @returns {boolean} - `true` if the proof is valid, `InferenceError` or `Error` otherwise.
       * @example
       * ```
       * const proof = {
        // ... (Your proof object)
        };
    
        const isProofValid = ProofChecker.check(proof);
        console.log(`The proof is valid: ${isProofValid}`);
       * ```
       */
    this.checkProof = this.proofChecker.check;
    /**
     * Checks if the given formula is a tautology.
     *
     * @param {Formula | string} formula - The formula to check.
     */
    this.isTautology = formula => {
      const {
        truthValues
      } = this.calculator.generateTruthTable(formula);
      for (let i = 0; i < truthValues.length; i++) {
        if (!truthValues[i]) return false;
      }
      return true;
    };
    /**
     * Checks if the given formula is a contradiction.
     *
     * @param {Formula | string} formula - The formula to check.
     */
    this.isContradiction = formula => {
      const {
        truthValues
      } = this.calculator.generateTruthTable(formula);
      for (let i = 0; i < truthValues.length; i++) {
        if (truthValues[i]) return false;
      }
      return true;
    };
    /**
     * Checks if the given formula is a contingency.
     *
     * @param {Formula | string} formula - The formula to check.
     */
    this.isContingency = formula => {
      let firstTruthValue;
      const {
        truthValues
      } = this.calculator.generateTruthTable(formula);
      firstTruthValue = truthValues[0];
      for (let i = 1; i < truthValues.length; i++) {
        if (truthValues[i] != firstTruthValue) return true;
      }
      return false;
    };
  }
};

// src/index.ts
exports.Frege = Frege;
var frege = exports.frege = new Frege();
},{"util":"node_modules/util/util.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _fregejs = require("fregejs");
document.querySelectorAll(".logic-button").forEach(function (button) {
  button.addEventListener("click", function () {
    insert(this.textContent);
  });
});
document.querySelectorAll(".button").forEach(function (button) {
  button.addEventListener("click", function () {
    if (this.textContent === "DEL") {
      var telinha = document.getElementById("resultado");
      telinha.textContent = telinha.textContent.slice(0, -1);
    } else if (this.textContent === "AC") {
      var telinha = document.getElementById("resultado");
      telinha.textContent = "";
    }
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    deleteChar();
  } else if (event.key === "ArrowLeft") {
    moveCursorLeft();
  } else if (event.key === "ArrowRight") {
    moveCursorRight();
  } else event.preventDefault();
});
function insert(text) {
  var telinha = document.getElementById("resultado");
  telinha.textContent += text;
}
function analiseLexica(formula) {
  var regex = /^[~^v→↔]+$/;
  return regex.test(formula);
}
function analisadorSintatico(formula) {
  try {
    new Function("return " + formula);
    return true;
  } catch (error) {
    return false;
  }
}
function exibirResultados(formula, lexica, sintatica, tautologia) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "\n    <p>F\xF3rmula: ".concat(formula, "</p>\n    <p>An\xE1lise L\xE9xica: ").concat(lexica ? "Válida" : "Inválida", "</p>\n    <p>Analisador Sint\xE1tico: ").concat(sintatica ? "Válida" : "Inválida", "</p>\n    <p>Provador de Tautologia: ").concat(tautologia ? "É uma tautologia" : "Não é uma tautologia", "</p>\n\n  ");
}
document.querySelector(".button-calc").addEventListener("click", function () {
  var expressaoLogica = document.getElementById("resultado").textContent;
  var resultadoCalculo = calcularExpressaoLogica(expressaoLogica);
});
function calcularExpressaoLogica(expressao) {
  var expressaoNaoTratada = expressao;
  expressao = expressao.replace(/~/g, "¬");
  expressao = expressao.replace(/→/g, "->");
  expressao = expressao.replace(/↔/g, "<->");
  var truthTable = _fregejs.frege.generateTruthTable(expressao);
  // printTruthTable(truthTable);
  generateHTMLTruthTable(truthTable);
  var lexica = "";
  var sintatica = "";
  var tautologia = _fregejs.frege.isTautology(expressao);
  exibirResultados(expressaoNaoTratada, lexica, sintatica, tautologia);
}
function generateHTMLTruthTable(truthTable) {
  var htmlTable = '<table class="tabela-verdade">';
  htmlTable += '<tr>';
  truthTable.headers.forEach(function (header) {
    htmlTable += "<th>".concat(header, "</th>");
  });
  htmlTable += '</tr>';
  for (var i = 0; i < truthTable.truthCombinations.length; i++) {
    htmlTable += '<tr>';
    var combination = truthTable.truthCombinations[i];
    combination.forEach(function (value) {
      var formattedValue = value ? "<span style='color:green'>T</span>" : "<span style='color:red'>F</span>";
      htmlTable += "<td class=\"tabela-verdade\">".concat(formattedValue, "</td>");
    });
    var formattedValue = truthTable.truthValues[i] ? "<span style='color:green'>T</span>" : "<span style='color:red'>F</span>";
    htmlTable += "<td class=\"tabela-verdade\">".concat(formattedValue, "</td>");
    htmlTable += '</tr>';
  }
  htmlTable += '</table>';
  var resultsDiv = document.getElementById("tabela");
  resultsDiv.innerHTML = htmlTable;
}
},{"fregejs":"node_modules/fregejs/dist/index.mjs"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64968" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map