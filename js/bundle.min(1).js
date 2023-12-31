/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-element-queries/src/ElementQueries.js":
/*!****************************************************************!*\
  !*** ./node_modules/css-element-queries/src/ElementQueries.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./ResizeSensor.js */ "./node_modules/css-element-queries/src/ResizeSensor.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function (ResizeSensor) {

    /**
     *
     * @type {Function}
     * @constructor
     */
    var ElementQueries = function () {
        //<style> element with our dynamically created styles
        var cssStyleElement;

        //all rules found for element queries
        var allQueries = {};

        //association map to identify which selector belongs to a element from the animationstart event.
        var idToSelectorMapping = [];

        /**
         *
         * @param element
         * @returns {Number}
         */
        function getEmSize(element) {
            if (!element) {
                element = document.documentElement;
            }
            var fontSize = window.getComputedStyle(element, null).fontSize;
            return parseFloat(fontSize) || 16;
        }

        /**
         * Get element size
         * @param {HTMLElement} element
         * @returns {Object} {width, height}
         */
        function getElementSize(element) {
            if (!element.getBoundingClientRect) {
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                }
            }

            var rect = element.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            }
        }

        /**
         *
         * @copyright https://github.com/Mr0grog/element-query/blob/master/LICENSE
         *
         * @param {HTMLElement} element
         * @param {*} value
         * @returns {*}
         */
        function convertToPx(element, value) {
            var numbers = value.split(/\d/);
            var units = numbers[numbers.length - 1];
            value = parseFloat(value);
            switch (units) {
                case "px":
                    return value;
                case "em":
                    return value * getEmSize(element);
                case "rem":
                    return value * getEmSize();
                // Viewport units!
                // According to http://quirksmode.org/mobile/tableViewport.html
                // documentElement.clientWidth/Height gets us the most reliable info
                case "vw":
                    return value * document.documentElement.clientWidth / 100;
                case "vh":
                    return value * document.documentElement.clientHeight / 100;
                case "vmin":
                case "vmax":
                    var vw = document.documentElement.clientWidth / 100;
                    var vh = document.documentElement.clientHeight / 100;
                    var chooser = Math[units === "vmin" ? "min" : "max"];
                    return value * chooser(vw, vh);
                default:
                    return value;
                // for now, not supporting physical units (since they are just a set number of px)
                // or ex/ch (getting accurate measurements is hard)
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {String} id
         * @constructor
         */
        function SetupInformation(element, id) {
            this.element = element;
            var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName;

            var attributes = ['min-width', 'min-height', 'max-width', 'max-height'];

            /**
             * Extracts the computed width/height and sets to min/max- attribute.
             */
            this.call = function () {
                // extract current dimensions
                elementSize = getElementSize(this.element);

                attrValues = {};

                for (key in allQueries[id]) {
                    if (!allQueries[id].hasOwnProperty(key)) {
                        continue;
                    }
                    option = allQueries[id][key];

                    value = convertToPx(this.element, option.value);

                    actualValue = option.property === 'width' ? elementSize.width : elementSize.height;
                    attrName = option.mode + '-' + option.property;
                    attrValue = '';

                    if (option.mode === 'min' && actualValue >= value) {
                        attrValue += option.value;
                    }

                    if (option.mode === 'max' && actualValue <= value) {
                        attrValue += option.value;
                    }

                    if (!attrValues[attrName]) attrValues[attrName] = '';
                    if (attrValue && -1 === (' ' + attrValues[attrName] + ' ').indexOf(' ' + attrValue + ' ')) {
                        attrValues[attrName] += ' ' + attrValue;
                    }
                }

                for (var k in attributes) {
                    if (!attributes.hasOwnProperty(k)) continue;

                    if (attrValues[attributes[k]]) {
                        this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1));
                    } else {
                        this.element.removeAttribute(attributes[k]);
                    }
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {Object}      id
         */
        function setupElement(element, id) {
            if (!element.elementQueriesSetupInformation) {
                element.elementQueriesSetupInformation = new SetupInformation(element, id);
            }
            if (!element.elementQueriesSensor) {
                element.elementQueriesSensor = new ResizeSensor(element, function () {
                    element.elementQueriesSetupInformation.call();
                });
            }

            element.elementQueriesSetupInformation.call();
        }

        /**
         * Stores rules to the selector that should be applied once resized.
         *
         * @param {String} selector
         * @param {String} mode min|max
         * @param {String} property width|height
         * @param {String} value
         */
        function queueQuery(selector, mode, property, value) {
            if (typeof(allQueries[selector]) === 'undefined') {
                allQueries[selector] = [];
                // add animation to trigger animationstart event, so we know exactly when a element appears in the DOM

                var id = idToSelectorMapping.length;
                cssStyleElement.innerHTML += '\n' + selector + ' {animation: 0.1s element-queries;}';
                cssStyleElement.innerHTML += '\n' + selector + ' > .resize-sensor {min-width: '+id+'px;}';
                idToSelectorMapping.push(selector);
            }

            allQueries[selector].push({
                mode: mode,
                property: property,
                value: value
            });
        }

        function getQuery(container) {
            var query;
            if (document.querySelectorAll) query = (container) ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document);
            if (!query && 'undefined' !== typeof $$) query = $$;
            if (!query && 'undefined' !== typeof jQuery) query = jQuery;

            if (!query) {
                throw 'No document.querySelectorAll, jQuery or Mootools\'s $$ found.';
            }

            return query;
        }

        /**
         * If animationStart didn't catch a new element in the DOM, we can manually search for it
         */
        function findElementQueriesElements(container) {
            var query = getQuery(container);

            for (var selector in allQueries) if (allQueries.hasOwnProperty(selector)) {
                // find all elements based on the extract query selector from the element query rule
                var elements = query(selector, container);

                for (var i = 0, j = elements.length; i < j; i++) {
                    setupElement(elements[i], selector);
                }
            }
        }

        /**
         *
         * @param {HTMLElement} element
         */
        function attachResponsiveImage(element) {
            var children = [];
            var rules = [];
            var sources = [];
            var defaultImageId = 0;
            var lastActiveImage = -1;
            var loadedImages = [];

            for (var i in element.children) {
                if (!element.children.hasOwnProperty(i)) continue;

                if (element.children[i].tagName && element.children[i].tagName.toLowerCase() === 'img') {
                    children.push(element.children[i]);

                    var minWidth = element.children[i].getAttribute('min-width') || element.children[i].getAttribute('data-min-width');
                    //var minHeight = element.children[i].getAttribute('min-height') || element.children[i].getAttribute('data-min-height');
                    var src = element.children[i].getAttribute('data-src') || element.children[i].getAttribute('url');

                    sources.push(src);

                    var rule = {
                        minWidth: minWidth
                    };

                    rules.push(rule);

                    if (!minWidth) {
                        defaultImageId = children.length - 1;
                        element.children[i].style.display = 'block';
                    } else {
                        element.children[i].style.display = 'none';
                    }
                }
            }

            lastActiveImage = defaultImageId;

            function check() {
                var imageToDisplay = false, i;

                for (i in children) {
                    if (!children.hasOwnProperty(i)) continue;

                    if (rules[i].minWidth) {
                        if (element.offsetWidth > rules[i].minWidth) {
                            imageToDisplay = i;
                        }
                    }
                }

                if (!imageToDisplay) {
                    //no rule matched, show default
                    imageToDisplay = defaultImageId;
                }

                if (lastActiveImage !== imageToDisplay) {
                    //image change

                    if (!loadedImages[imageToDisplay]) {
                        //image has not been loaded yet, we need to load the image first in memory to prevent flash of
                        //no content

                        var image = new Image();
                        image.onload = function () {
                            children[imageToDisplay].src = sources[imageToDisplay];

                            children[lastActiveImage].style.display = 'none';
                            children[imageToDisplay].style.display = 'block';

                            loadedImages[imageToDisplay] = true;

                            lastActiveImage = imageToDisplay;
                        };

                        image.src = sources[imageToDisplay];
                    } else {
                        children[lastActiveImage].style.display = 'none';
                        children[imageToDisplay].style.display = 'block';
                        lastActiveImage = imageToDisplay;
                    }
                } else {
                    //make sure for initial check call the .src is set correctly
                    children[imageToDisplay].src = sources[imageToDisplay];
                }
            }

            element.resizeSensorInstance = new ResizeSensor(element, check);
            check();
        }

        function findResponsiveImages() {
            var query = getQuery();

            var elements = query('[data-responsive-image],[responsive-image]');
            for (var i = 0, j = elements.length; i < j; i++) {
                attachResponsiveImage(elements[i]);
            }
        }

        var regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/mgi;
        var attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/mgi;

        /**
         * @param {String} css
         */
        function extractQuery(css) {
            var match, smatch, attrs, attrMatch;

            css = css.replace(/'/g, '"');
            while (null !== (match = regex.exec(css))) {
                smatch = match[1] + match[3];
                attrs = match[2];

                while (null !== (attrMatch = attrRegex.exec(attrs))) {
                    queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3]);
                }
            }
        }

        /**
         * @param {CssRule[]|String} rules
         */
        function readRules(rules) {
            var selector = '';

            if (!rules) {
                return;
            }

            if ('string' === typeof rules) {
                rules = rules.toLowerCase();
                if (-1 !== rules.indexOf('min-width') || -1 !== rules.indexOf('max-width')) {
                    extractQuery(rules);
                }
            } else {
                for (var i = 0, j = rules.length; i < j; i++) {
                    if (1 === rules[i].type) {
                        selector = rules[i].selectorText || rules[i].cssText;
                        if (-1 !== selector.indexOf('min-height') || -1 !== selector.indexOf('max-height')) {
                            extractQuery(selector);
                        } else if (-1 !== selector.indexOf('min-width') || -1 !== selector.indexOf('max-width')) {
                            extractQuery(selector);
                        }
                    } else if (4 === rules[i].type) {
                        readRules(rules[i].cssRules || rules[i].rules);
                    } else if (3 === rules[i].type) {
                        if(rules[i].styleSheet.hasOwnProperty("cssRules")) {
                            readRules(rules[i].styleSheet.cssRules);
                        }
                    }
                }
            }
        }

        var defaultCssInjected = false;

        /**
         * Searches all css rules and setups the event listener to all elements with element query rules..
         */
        this.init = function () {
            var animationStart = 'animationstart';
            if (typeof document.documentElement.style['webkitAnimationName'] !== 'undefined') {
                animationStart = 'webkitAnimationStart';
            } else if (typeof document.documentElement.style['MozAnimationName'] !== 'undefined') {
                animationStart = 'mozanimationstart';
            } else if (typeof document.documentElement.style['OAnimationName'] !== 'undefined') {
                animationStart = 'oanimationstart';
            }

            document.body.addEventListener(animationStart, function (e) {
                var element = e.target;
                var styles = element && window.getComputedStyle(element, null);
                var animationName = styles && styles.getPropertyValue('animation-name');
                var requiresSetup = animationName && (-1 !== animationName.indexOf('element-queries'));

                if (requiresSetup) {
                    element.elementQueriesSensor = new ResizeSensor(element, function () {
                        if (element.elementQueriesSetupInformation) {
                            element.elementQueriesSetupInformation.call();
                        }
                    });

                    var sensorStyles = window.getComputedStyle(element.resizeSensor, null);
                    var id = sensorStyles.getPropertyValue('min-width');
                    id = parseInt(id.replace('px', ''));
                    setupElement(e.target, idToSelectorMapping[id]);
                }
            });

            if (!defaultCssInjected) {
                cssStyleElement = document.createElement('style');
                cssStyleElement.type = 'text/css';
                cssStyleElement.innerHTML = '[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}';

                //safari wants at least one rule in keyframes to start working
                cssStyleElement.innerHTML += '\n@keyframes element-queries { 0% { visibility: inherit; } }';
                document.getElementsByTagName('head')[0].appendChild(cssStyleElement);
                defaultCssInjected = true;
            }

            for (var i = 0, j = document.styleSheets.length; i < j; i++) {
                try {
                    if (document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf('file://')) {
                        console.log("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href);
                    }

                    readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText);
                } catch (e) {
                }
            }

            findResponsiveImages();
        };

        /**
         * Go through all collected rules (readRules()) and attach the resize-listener.
         * Not necessary to call it manually, since we detect automatically when new elements
         * are available in the DOM. However, sometimes handy for dirty DOM modifications.
         *
         * @param {HTMLElement} container only elements of the container are considered (document.body if not set)
         */
        this.findElementQueriesElements = function (container) {
            findElementQueriesElements(container);
        };

        this.update = function () {
            this.init();
        };
    };

    ElementQueries.update = function () {
        ElementQueries.instance.update();
    };

    /**
     * Removes all sensor and elementquery information from the element.
     *
     * @param {HTMLElement} element
     */
    ElementQueries.detach = function (element) {
        if (element.elementQueriesSetupInformation) {
            //element queries
            element.elementQueriesSensor.detach();
            delete element.elementQueriesSetupInformation;
            delete element.elementQueriesSensor;

        } else if (element.resizeSensorInstance) {
            //responsive image

            element.resizeSensorInstance.detach();
            delete element.resizeSensorInstance;
        }
    };

    ElementQueries.init = function () {
        if (!ElementQueries.instance) {
            ElementQueries.instance = new ElementQueries();
        }

        ElementQueries.instance.init();
    };

    var domLoaded = function (callback) {
        /* Mozilla, Chrome, Opera */
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
        /* Safari, iCab, Konqueror */
        else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    callback();
                    clearInterval(DOMLoadTimer);
                }
            }, 10);
        }
        /* Other web browsers */
        else window.onload = callback;
    };

    ElementQueries.findElementQueriesElements = function (container) {
        ElementQueries.instance.findElementQueriesElements(container);
    };

    ElementQueries.listen = function () {
        domLoaded(ElementQueries.init);
    };

    return ElementQueries;

}));


/***/ }),

/***/ "./node_modules/css-element-queries/src/ResizeSensor.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-element-queries/src/ResizeSensor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (fn) {
            return window.setTimeout(fn, 20);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function(sizeInfo) {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call(this, sizeInfo);
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function() {
                return q.length;
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';
            var style = 'pointer-events: none; position: absolute; left: 0px; top: 0px; right: 0; bottom: 0; ' +
                'overflow: hidden; z-index: -1; visibility: hidden; max-width: 100%;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="' + style + '">' +
                    '<div style="' + styleChild + '"></div>' +
                '</div>' +
                '<div class="resize-sensor-shrink" style="' + style + '">' +
                    '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
                '</div>';
            element.appendChild(element.resizeSensor);

            var computedStyle = window.getComputedStyle(element);
            var position = computedStyle ? computedStyle.getPropertyValue('position') : null;
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
                element.style.position = 'relative';
            }

            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var dirty, rafId;
            var size = getElementSize(element);
            var lastWidth = size.width;
            var lastHeight = size.height;
            var initialHiddenCheck = true;
            var lastAnimationFrame = 0;

            var resetExpandShrink = function () {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                expandChild.style.width = (width + 10) + 'px';
                expandChild.style.height = (height + 10) + 'px';

                expand.scrollLeft = width + 10;
                expand.scrollTop = height + 10;

                shrink.scrollLeft = width + 10;
                shrink.scrollTop = height + 10;
            };

            var reset = function() {
                // Check if element is hidden
                if (initialHiddenCheck) {
                    var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;
                    if (invisible) {
                        // Check in next frame
                        if (!lastAnimationFrame){
                            lastAnimationFrame = requestAnimationFrame(function(){
                                lastAnimationFrame = 0;

                                reset();
                            });
                        }

                        return;
                    } else {
                        // Stop checking
                        initialHiddenCheck = false;
                    }
                }

                resetExpandShrink();
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = size.width;
                lastHeight = size.height;

                if (element.resizedAttached) {
                    element.resizedAttached.call(size);
                }
            };

            var onScroll = function() {
                size = getElementSize(element);
                dirty = size.width !== lastWidth || size.height !== lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements
            requestAnimationFrame(reset);
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            ResizeSensor.detach(element, ev);
        };

        this.reset = function() {
            element.resizeSensor.resetSensor();
        };
    };

    ResizeSensor.reset = function(element) {
        forEachElement(element, function(elem){
            elem.resizeSensor.resetSensor();
        });
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if (!elem) return;
            if(elem.resizedAttached && typeof ev === "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(function (mutations) {
            for (var i in mutations) {
                if (mutations.hasOwnProperty(i)) {
                    var items = mutations[i].addedNodes;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].resizeSensor) {
                            ResizeSensor.reset(items[j]);
                        }
                    }
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function (event) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    return ResizeSensor;

}));


/***/ }),

/***/ "./src/common/js/utilities.js":
/*!************************************!*\
  !*** ./src/common/js/utilities.js ***!
  \************************************/
/*! exports provided: restCall, isDefined, isEmpty, isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restCall", function() { return restCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * Performs a REST Call
 * 
 * @param {string}    endPoint - Endpoint of the REST call
 * @param {object}    data - Data to be sent in the call
 * @param {callback}  [onSuccess] - Function to be invoked if the call is successful
 * @param {callback}  [onFail] - Function to be invoked if the call fails
 * 
 * @return null
 */

function restCall() {
  var endPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var onFail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // Define the valid endpoints
  var validEndpoints = ['course_navigation']; // Check if the endPoint parameter is a valid endpoint

  if (validEndpoints.includes(endPoint)) {
    // Do AJAX
    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
      method: 'POST',
      url: UncannyToolkitPro.restURL + endPoint + '/',
      data: jquery__WEBPACK_IMPORTED_MODULE_0___default.a.param(data) + '&' + jquery__WEBPACK_IMPORTED_MODULE_0___default.a.param({
        doing_rest: 1
      }),
      // Attach Nonce the the header of the request
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', UncannyToolkitPro.nonce);
      },
      success: function success(response) {
        // Check if onSuccess
        if (isDefined(onSuccess)) {
          // Invoke callback
          onSuccess(response);
        }
      },
      statusCode: {
        403: function _() {
          location.reload();
        }
      },
      fail: function fail(response) {
        if (isDefined(onFail)) {
          onFail(response);
        }
      }
    });
  } else {
    console.error("The ".concat(endpoint, " endPoint does not exists"));
  }
}
/**
 * Determine if a variable is set and is not NULL
 *
 * @param  {mixed}      variable - The variable being evaluated
 * @return {boolean}    TRUE if the variable is defined
 */

var isDefined = function isDefined(variable) {
  // Returns true if the variable is undefined
  return typeof variable !== 'undefined' && variable !== null;
};
/**
 * Determine whether a variable is empty
 *
 * @param   {mixed}     variable - The variable being evaluated
 * @return  {boolean}   TRUE if the variable is empty
 */

var isEmpty = function isEmpty(variable) {
  var response = true; // Check if the variable is defined, otherwise is empty

  if (isDefined(variable)) {
    // Check if it's array
    if (variable.isArray) {
      response = variable.length == 0;
    } else if (isObject(variable)) {
      response = Object.keys(variable).length;
    } else {
      response = variable == '';
    }
  }

  return response;
};
/**
 * Determine whether a variable is an object
 *
 * @param   {mixed}     variable - The variable being evaluated
 * @return  {boolean}   TRUE if the variable is an object
 */

var isObject = function isObject(variable) {
  return _typeof(variable) === 'object' && variable !== null;
};

/***/ }),

/***/ "./src/frontend/index.js":
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ "./src/frontend/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_course_dashboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/course-dashboard.js */ "./src/frontend/js/course-dashboard.js");
/* harmony import */ var _js_lazy_course_navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/lazy-course-navigation.js */ "./src/frontend/js/lazy-course-navigation.js");


 // Do on DOM ready

document.addEventListener('DOMContentLoaded', function () {
  new _js_course_dashboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _js_lazy_course_navigation_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
});

/***/ }),

/***/ "./src/frontend/js/course-dashboard.js":
/*!*********************************************!*\
  !*** ./src/frontend/js/course-dashboard.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/js/utilities.js */ "./src/common/js/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElementQueries = __webpack_require__(/*! css-element-queries/src/ElementQueries */ "./node_modules/css-element-queries/src/ElementQueries.js");




var CourseDashboard =
/*#__PURE__*/
function () {
  function CourseDashboard() {
    _classCallCheck(this, CourseDashboard);

    // Check if the required container is defined
    if (this.hasDashboard()) {
      // Init ResizeSensor
      ElementQueries.init(); // Get elements

      this.getElements(); // Define global settings

      this.defineSettings(); // Create courses using the DOM elements

      this.createCourses(); // Add function to expand and collapse all containers

      this.slideAll(); // Listen filters

      this.filters();
    }
  }

  _createClass(CourseDashboard, [{
    key: "getElements",
    value: function getElements() {
      this.$elements = {
        filters: {
          form: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ultp-dashboard-filters-form'),
          selects: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ultp-dashboard-filters-form select')
        }
      };
    }
  }, {
    key: "defineSettings",
    value: function defineSettings() {
      // Create settings
      this.settings = {
        slideToggleDuration: 300
      };
    }
  }, {
    key: "createCourses",
    value: function createCourses() {
      var _this = this;

      // Get all courses
      var $courses = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ultp-dashboard-course'); // Create Courses

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($courses, function (index, $element) {
        // Create instance of Course
        new Course(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this.settings);
      });
    }
  }, {
    key: "hasDashboard",
    value: function hasDashboard() {
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ultp-dashboard-courses').length > 0;
    }
  }, {
    key: "slideAll",
    value: function slideAll() {
      // Listen to the clicks on the buttons
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ultp-dashboard .ultp-dashboard-btn--expand-all').on('click', function () {
        expandAll();
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ultp-dashboard .ultp-dashboard-btn--collapse-all').on('click', function () {
        collapseAll();
      });

      var expandAll = function expandAll() {
        // Get all the collapsed containers
        var collapsedContainers = {
          courses: {
            container: '.ultp-dashboard-course--collapsed',
            toggle: '.ultp-dashboard-course__toggle-btn'
          },
          lessons: {
            container: '.ultp-dashboard-lesson--collapsed',
            toggle: '.ultp-dashboard-lesson__toggle-btn'
          },
          quizzes: {
            container: '.ultp-dashboard-quizzes--collapsed',
            toggle: '.ultp-dashboard-quizzes__header-toggle-btn'
          }
        };
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(collapsedContainers, function (index, elementType) {
          // Get containers
          var $containers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elementType.container); // Iterate each container

          jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($containers, function (index, container) {
            // Get container element
            var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container); // Get toggle button

            var $toggleButton = $container.find(elementType.toggle); // Trigger click

            $toggleButton.trigger('click');
          });
        });
      };

      var collapseAll = function collapseAll() {
        // Get all the expanded containers
        var expandedContainers = {
          courses: {
            container: '.ultp-dashboard-course--expanded',
            toggle: '.ultp-dashboard-course__toggle-btn'
          },
          lessons: {
            container: '.ultp-dashboard-lesson--expanded',
            toggle: '.ultp-dashboard-lesson__toggle-btn'
          },
          quizzes: {
            container: '.ultp-dashboard-quizzes--expanded',
            toggle: '.ultp-dashboard-quizzes__header-toggle-btn'
          }
        };
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(expandedContainers, function (index, elementType) {
          // Get containers
          var $containers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elementType.container); // Iterate each container

          jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($containers, function (index, container) {
            // Get container element
            var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container); // Get toggle button

            var $toggleButton = $container.find(elementType.toggle); // Trigger click

            $toggleButton.trigger('click');
          });
        });
      };
    }
  }, {
    key: "filters",
    value: function filters() {
      var _this2 = this;

      // Listen to changes
      this.$elements.filters.selects.on('change', function () {
        // Submit form
        _this2.$elements.filters.form.trigger('submit');
      });
    }
  }]);

  return CourseDashboard;
}();

var Course =
/*#__PURE__*/
function () {
  function Course($container, settings) {
    _classCallCheck(this, Course);

    // Save settings in the object's instance
    this.dashboardSettings = settings; // Define the important CSS classes

    this.defineCssClasses(); // Get important elements from the container

    this.getElements($container); // Get course data

    this.getCourseData(); // Add toggle functionality

    this.toggleCourseContent(); // Create lessons using the DOM elements

    this.createLessons(); // Create quizzes using the DOM elements

    this.createQuizzes();
  }

  _createClass(Course, [{
    key: "getCourseData",
    value: function getCourseData() {
      this.courseData = {
        courseId: this.$elements.container.data('course-id'),
        status: this.$elements.container.data('status'),
        hasLessons: !!parseInt(this.$elements.container.data('has-lessons')),
        hasQuizzes: !!parseInt(this.$elements.container.data('has-quizzes')),
        hasCertificate: !!parseInt(this.$elements.container.data('has-certificate'))
      };
    }
  }, {
    key: "defineCssClasses",
    value: function defineCssClasses() {
      this.cssClasses = {
        toggle: {
          collapsed: 'ultp-dashboard-course--collapsed',
          collapsing: 'ultp-dashboard-course--collapsing',
          expanding: 'ultp-dashboard-course--expanding',
          expanded: 'ultp-dashboard-course--expanded'
        }
      };
    }
  }, {
    key: "getElements",
    value: function getElements($container) {
      this.$elements = {
        container: $container,
        toggleBtn: $container.find('.ultp-dashboard-course__toggle-btn'),
        content: $container.find('.ultp-dashboard-course__content')
      };
    }
  }, {
    key: "toggleCourseContent",
    value: function toggleCourseContent() {
      var _this3 = this;

      // Check if the course has lessons or quizzes
      if (this.courseData.hasLessons || this.courseData.hasQuizzes) {
        // Listen to clicks on the toggle button
        this.$elements.toggleBtn.on('click', function () {
          // Check if we have to close it or open it
          if (_this3.isCollapsed()) {
            // As it's collapsed, we have to expand it
            // Set status
            _this3.setToggleClass('expanding'); // Do the slideDown


            _this3.$elements.content.hide().slideDown(_this3.dashboardSettings.slideToggleDuration, function () {
              // Set status
              _this3.setToggleClass('expanded');
            });
          } else {
            // As it's expanded, we have to collapse it
            // Set status
            _this3.setToggleClass('collapsing'); // Do the slideDown


            _this3.$elements.content.show().slideUp(_this3.dashboardSettings.slideToggleDuration, function () {
              // Set status
              _this3.setToggleClass('collapsed');
            });
          }
        });
      }
    }
  }, {
    key: "createLessons",
    value: function createLessons() {
      var _this4 = this;

      // Get all lessons
      var $lessons = this.$elements.container.find('.ultp-dashboard-lesson'); // Create Courses

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($lessons, function (index, $element) {
        // Create instance of Course
        new Lesson(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this4.dashboardSettings, _this4.courseData);
      });
    }
  }, {
    key: "createQuizzes",
    value: function createQuizzes() {
      var _this5 = this;

      // Get all quizzes containers
      var $quizzesContainers = this.$elements.container.find('.ultp-dashboard-course__quizzes .ultp-dashboard-quizzes'); // Create Quizzes

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($quizzesContainers, function (index, $element) {
        // Create instance of Course
        new Quizzes(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this5.dashboardSettings, _this5.courseData);
      });
    }
  }, {
    key: "setToggleClass",
    value: function setToggleClass(status) {
      // First remove all the classes
      this.$elements.container.removeClass(Object.values(this.cssClasses.toggle).join(' ')); // Then add the correct class

      this.$elements.container.addClass(this.cssClasses.toggle[status]);
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      // Check if the container has the collapsed class
      return this.$elements.container.hasClass(this.cssClasses.toggle.collapsed);
    }
  }]);

  return Course;
}();

var Lesson =
/*#__PURE__*/
function () {
  function Lesson($container, settings, courseData) {
    _classCallCheck(this, Lesson);

    // Save settings in the object's instance
    this.dashboardSettings = settings; // Save courseData

    this.courseData = courseData; // Define the important CSS classes

    this.defineCssClasses(); // Get important elements from the container

    this.getElements($container); // Get lesson data

    this.getLessonData(); // Add toggle functionality

    this.toggleLessonContent(); // Create topics using the DOM elements

    this.createTopics(); // Create quizzes using the DOM elements

    this.createQuizzes();
  }

  _createClass(Lesson, [{
    key: "getLessonData",
    value: function getLessonData() {
      this.lessonData = {
        course: this.courseData,
        lessonId: this.$elements.container.data('lesson-id'),
        availableOn: !Object(_common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(this.$elements.container.data('available-on')) ? parseInt(this.$elements.container.data('available-on')) : null,
        isCompleted: !!parseInt(this.$elements.container.data('is-completed')),
        isAvailable: !!parseInt(this.$elements.container.data('is-available')),
        hasTopics: !!parseInt(this.$elements.container.data('has-topics')),
        hasQuizzes: !!parseInt(this.$elements.container.data('has-quizzes'))
      };
    }
  }, {
    key: "defineCssClasses",
    value: function defineCssClasses() {
      this.cssClasses = {
        toggle: {
          collapsed: 'ultp-dashboard-lesson--collapsed',
          collapsing: 'ultp-dashboard-lesson--collapsing',
          expanding: 'ultp-dashboard-lesson--expanding',
          expanded: 'ultp-dashboard-lesson--expanded'
        }
      };
    }
  }, {
    key: "getElements",
    value: function getElements($container) {
      this.$elements = {
        container: $container,
        toggleBtn: $container.find('.ultp-dashboard-lesson__toggle-btn'),
        content: $container.find('.ultp-dashboard-lesson__content')
      };
    }
  }, {
    key: "toggleLessonContent",
    value: function toggleLessonContent() {
      var _this6 = this;

      // Check if the lesson has topics or quizzes
      if (this.lessonData.hasTopics || this.lessonData.hasQuizzes) {
        // Listen to clicks on the toggle button
        this.$elements.toggleBtn.on('click', function () {
          // Check if we have to close it or open it
          if (_this6.isCollapsed()) {
            // As it's collapsed, we have to expand it
            // Set status
            _this6.setToggleClass('expanding'); // Do the slideDown


            _this6.$elements.content.hide().slideDown(_this6.dashboardSettings.slideToggleDuration, function () {
              // Set status
              _this6.setToggleClass('expanded');
            });
          } else {
            // As it's expanded, we have to collapse it
            // Set status
            _this6.setToggleClass('collapsing'); // Do the slideDown


            _this6.$elements.content.show().slideUp(_this6.dashboardSettings.slideToggleDuration, function () {
              // Set status
              _this6.setToggleClass('collapsed');
            });
          }
        });
      }
    }
  }, {
    key: "createTopics",
    value: function createTopics() {
      var _this7 = this;

      // Get all topics
      var $topics = this.$elements.container.find('.ultp-dashboard-topic'); // Create Courses

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($topics, function (index, $element) {
        // Create instance of Course
        new Topic(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this7.dashboardSettings, _this7.courseData, _this7.lessonData);
      });
    }
  }, {
    key: "createQuizzes",
    value: function createQuizzes() {
      var _this8 = this;

      // Get all quizzes containers
      var $quizzesContainers = this.$elements.container.find('.ultp-dashboard-lesson__quizzes .ultp-dashboard-quizzes'); // Create Quizzes

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($quizzesContainers, function (index, $element) {
        // Create instance of Course
        new Quizzes(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this8.dashboardSettings, _this8.courseData, _this8.lessonData);
      });
    }
  }, {
    key: "setToggleClass",
    value: function setToggleClass(status) {
      // First remove all the classes
      this.$elements.container.removeClass(Object.values(this.cssClasses.toggle).join(' ')); // Then add the correct class

      this.$elements.container.addClass(this.cssClasses.toggle[status]);
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      // Check if the container has the collapsed class
      return this.$elements.container.hasClass(this.cssClasses.toggle.collapsed);
    }
  }]);

  return Lesson;
}();

var Topic =
/*#__PURE__*/
function () {
  function Topic($container, settings, courseData, lessonData) {
    _classCallCheck(this, Topic);

    // Save settings in the object's instance
    this.dashboardSettings = settings; // Save course data

    this.courseData = courseData; // Save lesson data

    this.lessonData = lessonData; // Get elements

    this.getElements($container); // Get lesson data

    this.getTopicData();
  }

  _createClass(Topic, [{
    key: "getElements",
    value: function getElements($container) {
      this.$elements = {
        container: $container
      };
    }
  }, {
    key: "getTopicData",
    value: function getTopicData() {
      this.topicData = {
        course: this.courseData,
        lesson: this.lessonData,
        topicId: this.$elements.container.data('topic-id'),
        isCompleted: !!parseInt(this.$elements.container.data('is-completed'))
      };
      delete this.topicData.lesson.course;
    }
  }]);

  return Topic;
}();

var Quizzes =
/*#__PURE__*/
function () {
  function Quizzes($container, settings, courseData) {
    var lessonData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Quizzes);

    // Save settings in the object's instance
    this.dashboardSettings = settings; // Save course data

    this.courseData = courseData; // Save lesson data

    this.lessonData = lessonData; // Define the important CSS classes

    this.defineCssClasses(); // Get important elements from the container

    this.getElements($container); // Add toggle functionality

    this.toggleQuizzesContent(); // Create Quiz instances

    this.createIndividualQuizzes();
  }

  _createClass(Quizzes, [{
    key: "defineCssClasses",
    value: function defineCssClasses() {
      this.cssClasses = {
        individual: 'ultp-dashboard-quiz',
        toggle: {
          collapsed: 'ultp-dashboard-quizzes--collapsed',
          collapsing: 'ultp-dashboard-quizzes--collapsing',
          expanding: 'ultp-dashboard-quizzes--expanding',
          expanded: 'ultp-dashboard-quizzes--expanded'
        }
      };
    }
  }, {
    key: "getElements",
    value: function getElements($container) {
      this.$elements = {
        container: $container,
        toggleBtn: $container.find('.ultp-dashboard-quizzes__header-toggle-btn'),
        content: $container.find('.ultp-dashboard-quizzes__list')
      };
    }
  }, {
    key: "toggleQuizzesContent",
    value: function toggleQuizzesContent() {
      var _this9 = this;

      // Listen to clicks on the toggle button
      this.$elements.toggleBtn.on('click', function () {
        // Check if we have to close it or open it
        if (_this9.isCollapsed()) {
          // As it's collapsed, we have to expand it
          // Set status
          _this9.setToggleClass('expanding'); // Do the slideDown


          _this9.$elements.content.hide().slideDown(_this9.dashboardSettings.slideToggleDuration, function () {
            // Set status
            _this9.setToggleClass('expanded');
          });
        } else {
          // As it's expanded, we have to collapse it
          // Set status
          _this9.setToggleClass('collapsing'); // Do the slideDown


          _this9.$elements.content.show().slideUp(_this9.dashboardSettings.slideToggleDuration, function () {
            // Set status
            _this9.setToggleClass('collapsed');
          });
        }
      });
    }
  }, {
    key: "setToggleClass",
    value: function setToggleClass(status) {
      // First remove all the classes
      this.$elements.container.removeClass(Object.values(this.cssClasses.toggle).join(' ')); // Then add the correct class

      this.$elements.container.addClass(this.cssClasses.toggle[status]);
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      // Check if the container has the collapsed class
      return this.$elements.container.hasClass(this.cssClasses.toggle.collapsed);
    }
  }, {
    key: "createIndividualQuizzes",
    value: function createIndividualQuizzes() {
      var _this10 = this;

      // Find quizzes
      var $quizzes = this.$elements.container.find(".".concat(this.cssClasses.individual)); // Iterate each quiz

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each($quizzes, function (index, $element) {
        // Create instance of Course
        new Quiz(jquery__WEBPACK_IMPORTED_MODULE_0___default()($element), _this10.dashboardSettings, _this10.courseData, _this10.lessonData);
      });
    }
  }]);

  return Quizzes;
}();

var Quiz =
/*#__PURE__*/
function () {
  function Quiz($container, settings, courseData) {
    var lessonData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Quiz);

    // Save settings in the object's instance
    this.dashboardSettings = settings; // Save course data

    this.courseData = courseData; // Save lesson data. This will be false
    // if the quiz is not inside a lesson

    this.lessonData = lessonData; // Define the important CSS classes

    this.defineCssClasses(); // Get important elements from the container

    this.getElements($container); // Get quiz data

    this.getQuizData(); // Add toggle functionality

    this.openStatistics();
  }

  _createClass(Quiz, [{
    key: "getQuizData",
    value: function getQuizData() {
      this.quizData = {
        course: this.courseData,
        quizId: this.$elements.container.data('quiz-id'),
        isCompleted: !!parseInt(this.$elements.container.data('is-completed')),
        passed: !!parseInt(this.$elements.container.data('passed'))
      };

      if (Object(_common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(this.$elements.container.data('lesson-id'))) {
        this.quizData.lesson = this.lessonData;
        delete this.quizData.lesson.course;
      }
    }
  }, {
    key: "defineCssClasses",
    value: function defineCssClasses() {
      this.cssClasses = {
        statistics: {
          btn: 'ultp-dashboard-btn--statistics',
          content: ''
        }
      };
    }
  }, {
    key: "getElements",
    value: function getElements($container) {
      this.$elements = {
        container: $container,
        statistics: {
          btn: $container.find(".".concat(this.cssClasses.statistics.btn)) // content: $container.find( `.${ this.cssClasses.statistics.content }` )

        }
      };
    }
  }, {
    key: "openStatistics",
    value: function openStatistics() {
      var _this11 = this;

      // Listen clicks on the statistics button
      this.$elements.statistics.btn.on('click', function (event) {
        // Prevent default
        event.preventDefault(); // Open statistics

        console.log(_this11.quizData);
      });
    }
  }]);

  return Quiz;
}();

/* harmony default export */ __webpack_exports__["default"] = (CourseDashboard);

/***/ }),

/***/ "./src/frontend/js/lazy-course-navigation.js":
/*!***************************************************!*\
  !*** ./src/frontend/js/lazy-course-navigation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/js/utilities.js */ "./src/common/js/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var LazyCourseNavigation =
/*#__PURE__*/
function () {
  function LazyCourseNavigation() {
    var _this = this;

    _classCallCheck(this, LazyCourseNavigation);

    // Get elements
    this.getElements(); // Check if we have to execute the code

    if (this.isLazyCourseNavigation()) {
      // Get course navigation
      this.getCourseNavigation(function (courseNavigation) {
        // Set course navigation
        _this.setCourseNavigation(courseNavigation);
      });
    }
  }

  _createClass(LazyCourseNavigation, [{
    key: "getElements",
    value: function getElements() {
      // Create elements property
      this.$elements = {
        container: jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ultp-lazy-course-navigation')
      };
    }
  }, {
    key: "getCourseNavigation",
    value: function getCourseNavigation(callback) {
      // Do AJAX request
      Object(_common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__["restCall"])('course_navigation', {
        course_id: UncannyToolkitProLazyCourseNavigation.course_id,
        lesson_id: UncannyToolkitProLazyCourseNavigation.lesson_id,
        topic_id: UncannyToolkitProLazyCourseNavigation.topic_id,
        nonce: UncannyToolkitProLazyCourseNavigation.nonce
      }, function (response) {
        // On success
        callback(response);
      }, function () {
        // On fail
        console.error("We couldn't load the course navigation content.");
      });
    }
  }, {
    key: "setCourseNavigation",
    value: function setCourseNavigation(courseNavigation) {
      // Remove loading class
      this.$elements.container.removeClass('ultp-lazy-course-navigation--loading'); // Set the content in each container

      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.$elements.container, function (index, container) {
        // Get jQuery DOM element
        var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(container); // Set the content

        $container.html(courseNavigation.html);
      });
    }
  }, {
    key: "isLazyCourseNavigation",
    value: function isLazyCourseNavigation() {
      return this.$elements.container.length > 0 && Object(_common_js_utilities_js__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(UncannyToolkitProLazyCourseNavigation);
    }
  }]);

  return LazyCourseNavigation;
}();

/* harmony default export */ __webpack_exports__["default"] = (LazyCourseNavigation);

/***/ }),

/***/ "./src/frontend/scss/main.scss":
/*!*************************************!*\
  !*** ./src/frontend/scss/main.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=bundle.min.js.map