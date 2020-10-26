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
})({"../node_modules/@ui5/webcomponents-base/dist/thirdparty/isPlainObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);

var fnIsPlainObject = function (obj) {
  var proto, Ctor;

  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = Object.getPrototypeOf(obj);

  if (!proto) {
    return true;
  }

  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var _default = fnIsPlainObject;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/thirdparty/_merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isPlainObject = _interopRequireDefault(require("./isPlainObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oToken = Object.create(null);

var fnMerge = function () {
  var src,
      copyIsArray,
      copy,
      name,
      options,
      clone,
      target = arguments[2] || {},
      i = 3,
      length = arguments.length,
      deep = arguments[0] || false,
      skipToken = arguments[1] ? undefined : oToken;

  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (name === '__proto__' || target === copy) {
          continue;
        }

        if (deep && copy && ((0, _isPlainObject.default)(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && (0, _isPlainObject.default)(src) ? src : {};
          }

          target[name] = fnMerge(deep, arguments[1], clone, copy);
        } else if (copy !== skipToken) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
};

var _default = fnMerge;
exports.default = _default;
},{"./isPlainObject.js":"../node_modules/@ui5/webcomponents-base/dist/thirdparty/isPlainObject.js"}],"../node_modules/@ui5/webcomponents-base/dist/thirdparty/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge2 = _interopRequireDefault(require("./_merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnMerge = function () {
  var args = [true, false];
  args.push.apply(args, arguments);
  return _merge2.default.apply(null, args);
};

var _default = fnMerge;
exports.default = _default;
},{"./_merge.js":"../node_modules/@ui5/webcomponents-base/dist/thirdparty/_merge.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/whenDOMReady.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const whenDOMReady = () => {
  return new Promise(resolve => {
    if (document.body) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    }
  });
};

var _default = whenDOMReady;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes = {}) => {
  const style = document.createElement("style");
  style.type = "text/css";
  Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
  style.textContent = cssText;
  document.head.appendChild(style);
  return style;
};

var _default = createStyleInHead;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeature = exports.registerFeature = void 0;
const features = new Map();

const registerFeature = (name, feature) => {
  features.set(name, feature);
};

exports.registerFeature = registerFeature;

const getFeature = name => {
  return features.get(name);
};

exports.getFeature = getFeature;
},{}],"../node_modules/@ui5/webcomponents-base/dist/FontFace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createStyleInHead = _interopRequireDefault(require("./util/createStyleInHead.js"));

var _FeaturesRegistry = require("./FeaturesRegistry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CSS font face used for the texts provided by SAP.
 */

/* CDN Locations */
const font72RegularWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents`;
const font72RegularWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents`;
const font72RegularFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents`;
const font72RegularFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents`;
const font72BoldWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents`;
const font72BoldWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents`;
const font72BoldFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents`;
const font72BoldFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents`;
const fontFaceCSS = `
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(${font72RegularWoff2}) format("woff2"),
			url(${font72RegularWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 400;
		src: local('72-full'),
			url(${font72RegularFullWoff2}) format("woff2"),
			url(${font72RegularFullWoff}) format("woff");
		
	}
	
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold'),
			url(${font72BoldWoff2}) format("woff2"),
			url(${font72BoldWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold-full'),
			url(${font72BoldFullWoff2}) format("woff2"),
			url(${font72BoldFullWoff}) format("woff");
	}
`;

const insertFontFace = () => {
  if (document.querySelector(`head>style[data-ui5-font-face]`)) {
    return;
  } // If OpenUI5 is found, let it set the font


  const OpenUI5Support = (0, _FeaturesRegistry.getFeature)("OpenUI5Support");

  if (OpenUI5Support && OpenUI5Support.isLoaded()) {
    return;
  }

  (0, _createStyleInHead.default)(fontFaceCSS, {
    "data-ui5-font-face": ""
  });
};

var _default = insertFontFace;
exports.default = _default;
},{"./util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js","./FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js"}],"../node_modules/@ui5/webcomponents-base/dist/SystemCSSVars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createStyleInHead = _interopRequireDefault(require("./util/createStyleInHead.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const systemCSSVars = `
	:root {
		--_ui5_content_density:cozy;
	}
	
	[data-ui5-compact-size],
	.ui5-content-density-compact,
	.sapUiSizeCompact {
		--_ui5_content_density:compact;
	}
	
	[dir="rtl"] {
		--_ui5_dir:rtl;
	}
	
	[dir="ltr"] {
		--_ui5_dir:ltr;
	}
`;

const insertSystemCSSVars = () => {
  if (document.querySelector(`head>style[data-ui5-system-css-vars]`)) {
    return;
  }

  (0, _createStyleInHead.default)(systemCSSVars, {
    "data-ui5-system-css-vars": ""
  });
};

var _default = insertSystemCSSVars;
exports.default = _default;
},{"./util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js"}],"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_LOCALES = exports.DEFAULT_LOCALE = exports.DEFAULT_LANGUAGE = exports.DEFAULT_THEME = void 0;
const assetParameters = {
  "themes": {
    "default": "sap_fiori_3",
    "all": ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw"]
  },
  "languages": {
    "default": "en",
    "all": ["ar", "bg", "ca", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "hi", "hr", "hu", "it", "iw", "ja", "kk", "ko", "lt", "lv", "ms", "nl", "no", "pl", "pt", "ro", "ru", "sh", "sk", "sl", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"]
  },
  "locales": {
    "default": "en",
    "all": ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"]
  }
};
const DEFAULT_THEME = assetParameters.themes.default;
exports.DEFAULT_THEME = DEFAULT_THEME;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
const DEFAULT_LOCALE = assetParameters.locales.default;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
const SUPPORTED_LOCALES = assetParameters.locales.all;
exports.SUPPORTED_LOCALES = SUPPORTED_LOCALES;
},{}],"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetsPath = exports.getFormatSettings = exports.getCalendarType = exports.getNoConflict = exports.getUseDefaultLanguage = exports.getLanguage = exports.getRTL = exports.getTheme = exports.getAnimationMode = void 0;

var _merge = _interopRequireDefault(require("./thirdparty/merge.js"));

var _FeaturesRegistry = require("./FeaturesRegistry.js");

var _AssetParameters = require("./generated/AssetParameters.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let initialized = false;
let initialConfig = {
  animationMode: "full",
  theme: _AssetParameters.DEFAULT_THEME,
  rtl: null,
  language: null,
  calendarType: null,
  noConflict: false,
  // no URL
  formatSettings: {},
  useDefaultLanguage: false,
  assetsPath: ""
};
/* General settings */

const getAnimationMode = () => {
  initConfiguration();
  return initialConfig.animationMode;
};

exports.getAnimationMode = getAnimationMode;

const getTheme = () => {
  initConfiguration();
  return initialConfig.theme;
};

exports.getTheme = getTheme;

const getRTL = () => {
  initConfiguration();
  return initialConfig.rtl;
};

exports.getRTL = getRTL;

const getLanguage = () => {
  initConfiguration();
  return initialConfig.language;
};
/**
 * Returns if the default language, that is inlined build time,
 * should be used, instead of trying fetching the language over the network.
 * @returns {Boolean}
 */


exports.getLanguage = getLanguage;

const getUseDefaultLanguage = () => {
  initConfiguration();
  return initialConfig.useDefaultLanguage;
};

exports.getUseDefaultLanguage = getUseDefaultLanguage;

const getNoConflict = () => {
  initConfiguration();
  return initialConfig.noConflict;
};

exports.getNoConflict = getNoConflict;

const getCalendarType = () => {
  initConfiguration();
  return initialConfig.calendarType;
};

exports.getCalendarType = getCalendarType;

const getFormatSettings = () => {
  initConfiguration();
  return initialConfig.formatSettings;
};

exports.getFormatSettings = getFormatSettings;

const getAssetsPath = () => {
  initConfiguration();
  return initialConfig.assetsPath;
};

exports.getAssetsPath = getAssetsPath;
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

const parseConfigurationScript = () => {
  const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

  let configJSON;

  if (configScript) {
    try {
      configJSON = JSON.parse(configScript.innerHTML);
    } catch (err) {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
      /* eslint-disable-line */
    }

    if (configJSON) {
      initialConfig = (0, _merge.default)(initialConfig, configJSON);
    }
  }
};

const parseURLParameters = () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (!key.startsWith("sap-ui")) {
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const param = key.split("sap-ui-")[1];

    if (booleanMapping.has(value)) {
      value = booleanMapping.get(lowerCaseValue);
    }

    initialConfig[param] = value;
  });
};

const applyOpenUI5Configuration = () => {
  const OpenUI5Support = (0, _FeaturesRegistry.getFeature)("OpenUI5Support");

  if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
    return;
  }

  const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
  initialConfig = (0, _merge.default)(initialConfig, OpenUI5Config);
};

const initConfiguration = () => {
  if (initialized) {
    return;
  } // 1. Lowest priority - configuration script


  parseConfigurationScript(); // 2. URL parameters overwrite configuration script parameters

  parseURLParameters(); // 3. If OpenUI5 is detected, it has the highest priority

  applyOpenUI5Configuration();
  initialized = true;
};
},{"./thirdparty/merge.js":"../node_modules/@ui5/webcomponents-base/dist/thirdparty/merge.js","./FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js","./generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/FetchHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJsonOnce = exports.fetchTextOnce = void 0;
const fetchPromises = new Map();
const jsonPromises = new Map();
const textPromises = new Map();

const fetchTextOnce = async url => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }

  const response = await fetchPromises.get(url);

  if (!textPromises.get(url)) {
    textPromises.set(url, response.text());
  }

  return textPromises.get(url);
};

exports.fetchTextOnce = fetchTextOnce;

const fetchJsonOnce = async url => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }

  const response = await fetchPromises.get(url);

  if (!jsonPromises.get(url)) {
    jsonPromises.set(url, response.json());
  }

  return jsonPromises.get(url);
};

exports.fetchJsonOnce = fetchJsonOnce;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/getFileExtension.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * ""                        -> ""
 * "noExtension"             -> ""
 * "file.txt"                -> ".txt"
 * "file.with.many.dots.doc" -> ".doc"
 * ".gitignore"              -> ""
 *
 * @param fileName - the file name
 * @returns {string}
 */
const getFileExtension = fileName => {
  const dotPos = fileName.lastIndexOf(".");

  if (dotPos < 1) {
    return "";
  }

  return fileName.slice(dotPos);
};

var _default = getFileExtension;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/config/AssetsPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAssetsPath = exports.getAssetsPath = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

let assetsPath;

const getAssetsPath = () => {
  if (assetsPath === undefined) {
    assetsPath = (0, _InitialConfiguration.getAssetsPath)();
  }

  return assetsPath;
};

exports.getAssetsPath = getAssetsPath;

const setAssetsPath = newAssetsPath => {
  assetsPath = newAssetsPath;
}; // eslint-disable-line


exports.setAssetsPath = setAssetsPath;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/EffectiveAssetPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAssetPathMappingFunction = exports.getEffectiveAssetPath = void 0;

var _AssetsPath = require("../config/AssetsPath.js");

let assetPathMappingFn = assetName => assetName;

const getEffectiveAssetPath = assetName => {
  if (typeof assetName !== "string") {
    return assetName;
  }

  assetName = assetPathMappingFn(assetName);
  const assetsPathPrefix = (0, _AssetsPath.getAssetsPath)();

  if (assetsPathPrefix) {
    return `${assetsPathPrefix}${assetName}`;
  }

  return assetName;
};

exports.getEffectiveAssetPath = getEffectiveAssetPath;

const registerAssetPathMappingFunction = mappingFn => {
  assetPathMappingFn = mappingFn;
};

exports.registerAssetPathMappingFunction = registerAssetPathMappingFunction;
},{"../config/AssetsPath.js":"../node_modules/@ui5/webcomponents-base/dist/config/AssetsPath.js"}],"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isThemeRegistered = exports.getRegisteredPackages = exports.getThemeProperties = exports.registerThemeProperties = void 0;

var _FetchHelper = require("../util/FetchHelper.js");

var _AssetParameters = require("../generated/AssetParameters.js");

var _getFileExtension = _interopRequireDefault(require("../util/getFileExtension.js"));

var _EffectiveAssetPath = require("../util/EffectiveAssetPath.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
/**
 * Used to provide CSS Vars for a specific theme for a specific package.
 * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
 * This URL must point to a JSON file, containing a "_" property.
 *
 * Example usage:
 *  1) Pass the CSS Vars as a string directly.
 *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
 *  2) Pass the CSS Vars as an object directly
 *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
 *  3) Pass a URL to a CSS file, containing the CSS Vars. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.css");
 *  4) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of four options: a string, an object with a "_" property, URL to a CSS file, or URL to a JSON file with a "_" property
 */

const registerThemeProperties = (packageName, themeName, style) => {
  if (style._) {
    // JSON object like ({"_": ":root"})
    themeStyles.set(`${packageName}_${themeName}`, style._);
  } else if (style.includes(":root") || style === "") {
    // pure string, including empty string
    themeStyles.set(`${packageName}_${themeName}`, style);
  } else {
    // url for fetching
    themeURLs.set(`${packageName}_${themeName}`, style);
  }

  registeredPackages.add(packageName);
  registeredThemes.add(themeName);
};

exports.registerThemeProperties = registerThemeProperties;

const getThemeProperties = async (packageName, themeName) => {
  const style = themeStyles.get(`${packageName}_${themeName}`);

  if (style !== undefined) {
    // it's valid for style to be an empty string
    return style;
  }

  if (!registeredThemes.has(themeName)) {
    const regThemesStr = [...registeredThemes.values()].join(", ");
    console.warn(`You have requested a non-registered theme - falling back to ${_AssetParameters.DEFAULT_THEME}. Registered themes are: ${regThemesStr}`);
    /* eslint-disable-line */

    return themeStyles.get(`${packageName}_${_AssetParameters.DEFAULT_THEME}`);
  }

  const data = await fetchThemeProperties(packageName, themeName);
  const themeProps = data._ || data;
  themeStyles.set(`${packageName}_${themeName}`, themeProps);
  return themeProps;
};

exports.getThemeProperties = getThemeProperties;

const fetchThemeProperties = async (packageName, themeName) => {
  const url = themeURLs.get(`${packageName}_${themeName}`);

  if (!url) {
    throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
  }

  return (0, _getFileExtension.default)(url) === ".css" ? (0, _FetchHelper.fetchTextOnce)(url) : (0, _FetchHelper.fetchJsonOnce)((0, _EffectiveAssetPath.getEffectiveAssetPath)(url));
};

const getRegisteredPackages = () => {
  return registeredPackages;
};

exports.getRegisteredPackages = getRegisteredPackages;

const isThemeRegistered = theme => {
  return registeredThemes.has(theme);
};

exports.isThemeRegistered = isThemeRegistered;
},{"../util/FetchHelper.js":"../node_modules/@ui5/webcomponents-base/dist/util/FetchHelper.js","../generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js","../util/getFileExtension.js":"../node_modules/@ui5/webcomponents-base/dist/util/getFileExtension.js","../util/EffectiveAssetPath.js":"../node_modules/@ui5/webcomponents-base/dist/util/EffectiveAssetPath.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/createThemePropertiesStyleTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createStyleInHead = _interopRequireDefault(require("../util/createStyleInHead.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName) => {
  const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${packageName}"]`);

  if (styleElement) {
    styleElement.textContent = cssText || ""; // in case of undefined
  } else {
    const attributes = {
      "data-ui5-theme-properties": packageName
    };
    (0, _createStyleInHead.default)(cssText, attributes);
  }
};

var _default = createThemePropertiesStyleTag;
exports.default = _default;
},{"../util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/getThemeDesignerTheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getThemeMetadata = () => {
  // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
  let el = document.querySelector(".sapThemeMetaData-Base-baseLib");

  if (el) {
    return getComputedStyle(el).backgroundImage;
  }

  el = document.createElement("span");
  el.style.display = "none";
  el.classList.add("sapThemeMetaData-Base-baseLib");
  document.body.appendChild(el);
  const metadata = getComputedStyle(el).backgroundImage;
  document.body.removeChild(el);
  return metadata;
};

const parseThemeMetadata = metadataString => {
  const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);

  if (params && params.length >= 2) {
    let paramsString = params[1];
    paramsString = paramsString.replace(/\\"/g, `"`);

    if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
      try {
        paramsString = decodeURIComponent(paramsString);
      } catch (ex) {
        console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line

        return;
      }
    }

    try {
      return JSON.parse(paramsString);
    } catch (ex) {
      console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
    }
  }
};

const processThemeMetadata = metadata => {
  let themeName;
  let baseThemeName;

  try {
    themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
    baseThemeName = metadata.Extends[0];
  } catch (ex) {
    console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line

    return;
  }

  return {
    themeName,
    baseThemeName
  };
};

const getThemeDesignerTheme = () => {
  const metadataString = getThemeMetadata();

  if (!metadataString || metadataString === "none") {
    return;
  }

  const metadata = parseThemeMetadata(metadataString);
  return processThemeMetadata(metadata);
};

var _default = getThemeDesignerTheme;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/theming/CSSVarsPonyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schedulePonyfill = exports.runPonyfill = exports.ponyfillNeeded = void 0;
let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

exports.ponyfillNeeded = ponyfillNeeded;

const runPonyfill = () => {
  ponyfillTimer = undefined;
  window.CSSVarsPonyfill.cssVars({
    rootElement: document.head,
    variables: isCompact() ? getCompactModeVars() : {},
    silent: true
  });
};

exports.runPonyfill = runPonyfill;

const schedulePonyfill = () => {
  if (!ponyfillTimer) {
    ponyfillTimer = window.setTimeout(runPonyfill, 0);
  }
};

exports.schedulePonyfill = schedulePonyfill;

const isCompact = () => {
  const b = document.body;
  return b.hasAttribute("data-ui5-compact-size") || b.classList.contains("ui5-content-density-compact") || b.classList.contains("sapUiSizeCompact");
};

const getCompactModeVars = () => {
  const compactVars = {};
  [...document.querySelectorAll(`[data-ui5-theme-properties]`)].forEach(el => {
    const cssContent = el.textContent.replace("\n", "");
    let match;
    const regExp = new RegExp("data-ui5-compact-size[^{]*{(.*?)}", "g");

    while ((match = regExp.exec(cssContent)) !== null) {
      // eslint-disable-line
      const compactCSS = match[1];
      compactCSS.split(";").forEach(declaration => {
        const pair = declaration.split(":");
        compactVars[pair[0].trim()] = pair[1].trim();
      });
    }
  });
  return compactVars;
};
},{}],"../node_modules/@ui5/webcomponents-base/dist/EventProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class EventProvider {
  constructor() {
    this._eventRegistry = {};
  }

  attachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    let eventListeners = eventRegistry[eventName];

    if (!Array.isArray(eventListeners)) {
      eventRegistry[eventName] = [];
      eventListeners = eventRegistry[eventName];
    }

    eventListeners.push({
      "function": fnFunction
    });
  }

  detachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    let eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return;
    }

    eventListeners = eventListeners.filter(event => {
      return event["function"] !== fnFunction; // eslint-disable-line
    });

    if (eventListeners.length === 0) {
      delete eventRegistry[eventName];
    }
  }
  /**
   * Fires an event and returns the results of all event listeners as an array.
   * Example: If listeners return promises, you can: await fireEvent("myEvent") to know when all listeners have finished.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */


  fireEvent(eventName, data) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return [];
    }

    return eventListeners.map(event => {
      return event["function"].call(this, data); // eslint-disable-line
    });
  }

  isHandlerAttached(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return false;
    }

    for (let i = 0; i < eventListeners.length; i++) {
      const event = eventListeners[i];

      if (event["function"] === fnFunction) {
        // eslint-disable-line
        return true;
      }
    }

    return false;
  }

  hasListeners(eventName) {
    return !!this._eventRegistry[eventName];
  }

}

var _default = EventProvider;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/theming/ThemeLoaded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireThemeLoaded = exports.detachThemeLoaded = exports.attachThemeLoaded = void 0;

var _EventProvider = _interopRequireDefault(require("../EventProvider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventProvider = new _EventProvider.default();
const THEME_LOADED = "themeLoaded";

const attachThemeLoaded = listener => {
  eventProvider.attachEvent(THEME_LOADED, listener);
};

exports.attachThemeLoaded = attachThemeLoaded;

const detachThemeLoaded = listener => {
  eventProvider.detachEvent(THEME_LOADED, listener);
};

exports.detachThemeLoaded = detachThemeLoaded;

const fireThemeLoaded = theme => {
  return eventProvider.fireEvent(THEME_LOADED, theme);
};

exports.fireThemeLoaded = fireThemeLoaded;
},{"../EventProvider.js":"../node_modules/@ui5/webcomponents-base/dist/EventProvider.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/applyTheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("../asset-registries/Themes.js");

var _createThemePropertiesStyleTag = _interopRequireDefault(require("./createThemePropertiesStyleTag.js"));

var _getThemeDesignerTheme = _interopRequireDefault(require("./getThemeDesignerTheme.js"));

var _CSSVarsPonyfill = require("./CSSVarsPonyfill.js");

var _ThemeLoaded = require("./ThemeLoaded.js");

var _FeaturesRegistry = require("../FeaturesRegistry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";

const isThemeBaseRegistered = () => {
  const registeredPackages = (0, _Themes.getRegisteredPackages)();
  return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async theme => {
  if (!isThemeBaseRegistered()) {
    return;
  }

  const cssText = await (0, _Themes.getThemeProperties)(BASE_THEME_PACKAGE, theme);
  (0, _createThemePropertiesStyleTag.default)(cssText, BASE_THEME_PACKAGE);
};

const deleteThemeBase = () => {
  const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${BASE_THEME_PACKAGE}"]`);

  if (styleElement) {
    styleElement.parentElement.removeChild(styleElement);
  }
};

const loadComponentPackages = async theme => {
  const registeredPackages = (0, _Themes.getRegisteredPackages)();
  registeredPackages.forEach(async packageName => {
    if (packageName === BASE_THEME_PACKAGE) {
      return;
    }

    const cssText = await (0, _Themes.getThemeProperties)(packageName, theme);
    (0, _createThemePropertiesStyleTag.default)(cssText, packageName);
  });
};

const detectExternalTheme = () => {
  // If theme designer theme is detected, use this
  const extTheme = (0, _getThemeDesignerTheme.default)();

  if (extTheme) {
    return extTheme;
  } // If OpenUI5Support is enabled, try to find out if it loaded variables


  const OpenUI5Support = (0, _FeaturesRegistry.getFeature)("OpenUI5Support");

  if (OpenUI5Support) {
    const varsLoaded = OpenUI5Support.cssVariablesLoaded();

    if (varsLoaded) {
      return {
        themeName: OpenUI5Support.getConfigurationSettingsObject().theme // just themeName, baseThemeName is only relevant for custom themes

      };
    }
  }
};

const applyTheme = async theme => {
  const extTheme = detectExternalTheme(); // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded

  if (!extTheme || theme !== extTheme.themeName) {
    await loadThemeBase(theme);
  } else {
    deleteThemeBase();
  } // Always load component packages properties. For non-registered themes, try with the base theme, if any


  const packagesTheme = (0, _Themes.isThemeRegistered)(theme) ? theme : extTheme && extTheme.baseThemeName;
  await loadComponentPackages(packagesTheme); // When changing the theme, run the ponyfill immediately

  if ((0, _CSSVarsPonyfill.ponyfillNeeded)()) {
    (0, _CSSVarsPonyfill.runPonyfill)();
  }

  (0, _ThemeLoaded.fireThemeLoaded)(theme);
};

var _default = applyTheme;
exports.default = _default;
},{"../asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","./createThemePropertiesStyleTag.js":"../node_modules/@ui5/webcomponents-base/dist/theming/createThemePropertiesStyleTag.js","./getThemeDesignerTheme.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getThemeDesignerTheme.js","./CSSVarsPonyfill.js":"../node_modules/@ui5/webcomponents-base/dist/theming/CSSVarsPonyfill.js","./ThemeLoaded.js":"../node_modules/@ui5/webcomponents-base/dist/theming/ThemeLoaded.js","../FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js"}],"../node_modules/@ui5/webcomponents-base/dist/config/Theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.getTheme = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

var _applyTheme = _interopRequireDefault(require("../theming/applyTheme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let theme;

const getTheme = () => {
  if (theme === undefined) {
    theme = (0, _InitialConfiguration.getTheme)();
  }

  return theme;
};

exports.getTheme = getTheme;

const setTheme = async newTheme => {
  if (theme === newTheme) {
    return;
  }

  theme = newTheme; // Update CSS Custom Properties

  await (0, _applyTheme.default)(theme);
};

exports.setTheme = setTheme;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js","../theming/applyTheme.js":"../node_modules/@ui5/webcomponents-base/dist/theming/applyTheme.js"}],"../node_modules/@ui5/webcomponents-base/dist/compatibility/whenPolyfillLoaded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let polyfillLoadedPromise;

const whenPolyfillLoaded = () => {
  if (polyfillLoadedPromise) {
    return polyfillLoadedPromise;
  }

  polyfillLoadedPromise = new Promise(resolve => {
    if (window.WebComponents && !window.WebComponents.ready && window.WebComponents.waitFor) {
      // the polyfill loader is present
      window.WebComponents.waitFor(() => {
        // the polyfills are loaded, safe to execute code depending on their APIs
        resolve();
      });
    } else {
      // polyfill loader missing, modern browsers only
      resolve();
    }
  });
  return polyfillLoadedPromise;
};

var _default = whenPolyfillLoaded;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/boot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whenDOMReady = _interopRequireDefault(require("./util/whenDOMReady.js"));

var _FontFace = _interopRequireDefault(require("./FontFace.js"));

var _SystemCSSVars = _interopRequireDefault(require("./SystemCSSVars.js"));

var _Theme = require("./config/Theme.js");

var _applyTheme = _interopRequireDefault(require("./theming/applyTheme.js"));

var _whenPolyfillLoaded = _interopRequireDefault(require("./compatibility/whenPolyfillLoaded.js"));

var _FeaturesRegistry = require("./FeaturesRegistry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let bootPromise;

const boot = () => {
  if (bootPromise) {
    return bootPromise;
  }

  bootPromise = new Promise(async resolve => {
    const OpenUI5Support = (0, _FeaturesRegistry.getFeature)("OpenUI5Support");

    if (OpenUI5Support) {
      await OpenUI5Support.init();
    }

    await (0, _whenDOMReady.default)();
    await (0, _applyTheme.default)((0, _Theme.getTheme)());
    OpenUI5Support && OpenUI5Support.attachListeners();
    (0, _FontFace.default)();
    (0, _SystemCSSVars.default)();
    await (0, _whenPolyfillLoaded.default)();
    resolve();
  });
  return bootPromise;
};

var _default = boot;
exports.default = _default;
},{"./util/whenDOMReady.js":"../node_modules/@ui5/webcomponents-base/dist/util/whenDOMReady.js","./FontFace.js":"../node_modules/@ui5/webcomponents-base/dist/FontFace.js","./SystemCSSVars.js":"../node_modules/@ui5/webcomponents-base/dist/SystemCSSVars.js","./config/Theme.js":"../node_modules/@ui5/webcomponents-base/dist/config/Theme.js","./theming/applyTheme.js":"../node_modules/@ui5/webcomponents-base/dist/theming/applyTheme.js","./compatibility/whenPolyfillLoaded.js":"../node_modules/@ui5/webcomponents-base/dist/compatibility/whenPolyfillLoaded.js","./FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js"}],"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
  static isValid(value) {}

  static generataTypeAcessors(types) {
    Object.keys(types).forEach(type => {
      Object.defineProperty(this, type, {
        get() {
          return types[type];
        }

      });
    });
  }

}

var _default = DataType;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/isDescendantOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isDescendantOf = (klass, baseKlass, inclusive = false) => {
  if (typeof klass !== "function" || typeof baseKlass !== "function") {
    return false;
  }

  if (inclusive && klass === baseKlass) {
    return true;
  }

  let parent = klass;

  do {
    parent = Object.getPrototypeOf(parent);
  } while (parent !== null && parent !== baseKlass);

  return parent === baseKlass;
};

var _default = isDescendantOf;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/StringHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelToKebabCase = exports.kebabToCamelCase = void 0;
const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();

const kebabToCamelCase = string => {
  if (!kebabToCamelMap.has(string)) {
    const result = toCamelCase(string.split("-"));
    kebabToCamelMap.set(string, result);
  }

  return kebabToCamelMap.get(string);
};

exports.kebabToCamelCase = kebabToCamelCase;

const camelToKebabCase = string => {
  if (!camelToKebabMap.has(string)) {
    const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    camelToKebabMap.set(string, result);
  }

  return camelToKebabMap.get(string);
};

exports.camelToKebabCase = camelToKebabCase;

const toCamelCase = parts => {
  return parts.map((string, index) => {
    return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }).join("");
};
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/isSlot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isSlot = el => el && el instanceof HTMLElement && el.localName === "slot";

var _default = isSlot;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/CustomElementsScope.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEffectiveScopingSuffixForTag = exports.shouldScopeCustomElement = exports.getCustomElementsScopingRules = exports.setCustomElementsScopingRules = exports.getCustomElementsScopingSuffix = exports.setCustomElementsScopingSuffix = void 0;
let suf;
let rulesObj = {
  include: [/^ui5-/],
  exclude: []
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.

/**
 * Sets the suffix to be used for custom elements scoping, f.e. pass "demo" to get tags such as "ui5-button-demo".
 * Note: by default all tags starting with "ui5-" will be scoped, unless you change this by calling "setCustomElementsScopingRules"
 *
 * @public
 * @param suffix The scoping suffix
 */

const setCustomElementsScopingSuffix = suffix => {
  if (!suffix.match(/^[a-zA-Z0-9_-]+$/)) {
    throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
  }

  suf = suffix;
};
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */


exports.setCustomElementsScopingSuffix = setCustomElementsScopingSuffix;

const getCustomElementsScopingSuffix = () => {
  return suf;
};
/**
 * Sets the rules, governing which custom element tags to scope and which not, f.e.
 * setCustomElementsScopingRules({include: [/^ui5-/]}, exclude: [/^ui5-mylib-/, /^ui5-carousel$/]);
 * will scope all elements starting with "ui5-" but not the ones starting with "ui5-mylib-" and not "ui5-carousel".
 *
 * @public
 * @param rules Object with "include" and "exclude" properties, both arrays of regular expressions. Note that "include"
 * rules are applied first and "exclude" rules second.
 */


exports.getCustomElementsScopingSuffix = getCustomElementsScopingSuffix;

const setCustomElementsScopingRules = rules => {
  if (!rules || !rules.include) {
    throw new Error(`"rules" must be an object with at least an "include" property`);
  }

  if (!Array.isArray(rules.include) || rules.include.some(rule => !(rule instanceof RegExp))) {
    throw new Error(`"rules.include" must be an array of regular expressions`);
  }

  if (rules.exclude && (!Array.isArray(rules.exclude) || rules.exclude.some(rule => !(rule instanceof RegExp)))) {
    throw new Error(`"rules.exclude" must be an array of regular expressions`);
  }

  rules.exclude = rules.exclude || [];
  rulesObj = rules;
  tagsCache.clear(); // reset the cache upon setting new rules
};
/**
 * Returns the rules, governing which custom element tags to scope and which not. By default, all elements
 * starting with "ui5-" are scoped. The default rules are: {include: [/^ui5-/]}.
 *
 * @public
 * @returns {Object}
 */


exports.setCustomElementsScopingRules = setCustomElementsScopingRules;

const getCustomElementsScopingRules = () => {
  return rulesObj;
};
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */


exports.getCustomElementsScopingRules = getCustomElementsScopingRules;

const shouldScopeCustomElement = tag => {
  if (!tagsCache.has(tag)) {
    const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
    tagsCache.set(tag, result);
  }

  return tagsCache.get(tag);
};
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */


exports.shouldScopeCustomElement = shouldScopeCustomElement;

const getEffectiveScopingSuffixForTag = tag => {
  if (shouldScopeCustomElement(tag)) {
    return getCustomElementsScopingSuffix();
  }
};

exports.getEffectiveScopingSuffixForTag = getEffectiveScopingSuffixForTag;
},{}],"../node_modules/@ui5/webcomponents-base/dist/UI5ElementMetadata.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./types/DataType.js"));

var _isDescendantOf = _interopRequireDefault(require("./util/isDescendantOf.js"));

var _StringHelper = require("./util/StringHelper.js");

var _isSlot = _interopRequireDefault(require("./util/isSlot.js"));

var _CustomElementsScope = require("./CustomElementsScope.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
  constructor(metadata) {
    this.metadata = metadata;
  }
  /**
   * Only intended for use by UI5Element.js
   * @protected
   */


  static validatePropertyValue(value, propData) {
    const isMultiple = propData.multiple;

    if (isMultiple) {
      return value.map(propValue => validateSingleProperty(propValue, propData));
    }

    return validateSingleProperty(value, propData);
  }
  /**
   * Only intended for use by UI5Element.js
   * @protected
   */


  static validateSlotValue(value, slotData) {
    return validateSingleSlot(value, slotData);
  }
  /**
   * Returns the tag of the UI5 Element without the scope
   * @public
   */


  getPureTag() {
    return this.metadata.tag;
  }
  /**
   * Returns the tag of the UI5 Element
   * @public
   */


  getTag() {
    const pureTag = this.metadata.tag;
    const suffix = (0, _CustomElementsScope.getEffectiveScopingSuffixForTag)(pureTag);

    if (!suffix) {
      return pureTag;
    }

    return `${pureTag}-${suffix}`;
  }
  /**
   * Used to get the tag we need to register for backwards compatibility
   * @public
   */


  getAltTag() {
    const pureAltTag = this.metadata.altTag;

    if (!pureAltTag) {
      return;
    }

    const suffix = (0, _CustomElementsScope.getEffectiveScopingSuffixForTag)(pureAltTag);

    if (!suffix) {
      return pureAltTag;
    }

    return `${pureAltTag}-${suffix}`;
  }
  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   * @returns {boolean}
   */


  hasAttribute(propName) {
    const propData = this.getProperties()[propName];
    return propData.type !== Object && !propData.noAttribute;
  }
  /**
   * Returns an array with the properties of the UI5 Element (in camelCase)
   * @public
   * @returns {string[]}
   */


  getPropertiesList() {
    return Object.keys(this.getProperties());
  }
  /**
   * Returns an array with the attributes of the UI5 Element (in kebab-case)
   * @public
   * @returns {string[]}
   */


  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute, this).map(_StringHelper.camelToKebabCase);
  }
  /**
   * Returns an object with key-value pairs of slots and their metadata definitions
   * @public
   */


  getSlots() {
    return this.metadata.slots || {};
  }
  /**
   * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
   * @returns {boolean}
   */


  canSlotText() {
    const defaultSlot = this.getSlots().default;
    return defaultSlot && defaultSlot.type === Node;
  }
  /**
   * Determines whether this UI5 Element supports any slots
   * @public
   */


  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }
  /**
   * Determines whether this UI5 Element supports any slots with "individualSlots: true"
   * @public
   */


  hasIndividualSlots() {
    return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots);
  }
  /**
   * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
   * @public
   */


  slotsAreManaged() {
    return !!this.metadata.managedSlots;
  }
  /**
   * Returns an object with key-value pairs of properties and their metadata definitions
   * @public
   */


  getProperties() {
    return this.metadata.properties || {};
  }
  /**
   * Returns an object with key-value pairs of events and their metadata definitions
   * @public
   */


  getEvents() {
    return this.metadata.events || {};
  }
  /**
   * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
   * @returns {boolean}
   */


  isLanguageAware() {
    return !!this.metadata.languageAware;
  }

}

const validateSingleProperty = (value, propData) => {
  const propertyType = propData.type;

  if (propertyType === Boolean) {
    return typeof value === "boolean" ? value : false;
  }

  if (propertyType === String) {
    return typeof value === "string" || typeof value === "undefined" || value === null ? value : value.toString();
  }

  if (propertyType === Object) {
    return typeof value === "object" ? value : propData.defaultValue;
  }

  if ((0, _isDescendantOf.default)(propertyType, _DataType.default)) {
    return propertyType.isValid(value) ? value : propData.defaultValue;
  }
};

const validateSingleSlot = (value, slotData) => {
  if (value === null) {
    return value;
  }

  const getSlottedNodes = el => {
    if ((0, _isSlot.default)(el)) {
      return el.assignedNodes({
        flatten: true
      }).filter(item => item instanceof HTMLElement);
    }

    return [el];
  };

  const slottedNodes = getSlottedNodes(value);
  slottedNodes.forEach(el => {
    if (!(el instanceof slotData.type)) {
      throw new Error(`${el} is not of type ${slotData.type}`);
    }
  });
  return value;
};

var _default = UI5ElementMetadata;
exports.default = _default;
},{"./types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js","./util/isDescendantOf.js":"../node_modules/@ui5/webcomponents-base/dist/util/isDescendantOf.js","./util/StringHelper.js":"../node_modules/@ui5/webcomponents-base/dist/util/StringHelper.js","./util/isSlot.js":"../node_modules/@ui5/webcomponents-base/dist/util/isSlot.js","./CustomElementsScope.js":"../node_modules/@ui5/webcomponents-base/dist/CustomElementsScope.js"}],"../node_modules/@ui5/webcomponents-base/dist/renderer/executeTemplate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomElementsScope = require("../CustomElementsScope.js");

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 * @returns {*}
 */
const executeTemplate = (template, component) => {
  const tagsToScope = component.constructor.getUniqueDependencies().map(dep => dep.getMetadata().getPureTag()).filter(_CustomElementsScope.shouldScopeCustomElement);
  const scope = (0, _CustomElementsScope.getCustomElementsScopingSuffix)();
  return template(component, tagsToScope, scope);
};

var _default = executeTemplate;
exports.default = _default;
},{"../CustomElementsScope.js":"../node_modules/@ui5/webcomponents-base/dist/CustomElementsScope.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/getSingletonElementInstance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getSingletonElementInstance = (tag, parentElement = document.body) => {
  let el = document.querySelector(tag);

  if (el) {
    return el;
  }

  el = document.createElement(tag);
  return parentElement.insertBefore(el, parentElement.firstChild);
};

var _default = getSingletonElementInstance;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/StaticArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeStaticArea = exports.getStaticAreaInstance = void 0;

var _getSingletonElementInstance = _interopRequireDefault(require("./util/getSingletonElementInstance.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getStaticAreaInstance = () => (0, _getSingletonElementInstance.default)("ui5-static-area");

exports.getStaticAreaInstance = getStaticAreaInstance;

const removeStaticArea = () => {
  getStaticAreaInstance().destroy();
};

exports.removeStaticArea = removeStaticArea;

class StaticAreaElement extends HTMLElement {
  constructor() {
    super();
  }

  get isUI5Element() {
    return true;
  }

  destroy() {
    const staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
    staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
  }

}

if (!customElements.get("ui5-static-area")) {
  customElements.define("ui5-static-area", StaticAreaElement);
}
},{"./util/getSingletonElementInstance.js":"../node_modules/@ui5/webcomponents-base/dist/util/getSingletonElementInstance.js"}],"../node_modules/@ui5/webcomponents-base/dist/RenderQueue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const MAX_PROCESS_COUNT = 10;

class RenderQueue {
  constructor() {
    this.list = []; // Used to store the web components in order

    this.lookup = new Set(); // Used for faster search
  }

  add(webComponent) {
    if (this.lookup.has(webComponent)) {
      return;
    }

    this.list.push(webComponent);
    this.lookup.add(webComponent);
  }

  remove(webComponent) {
    if (!this.lookup.has(webComponent)) {
      return;
    }

    this.list = this.list.filter(item => item !== webComponent);
    this.lookup.delete(webComponent);
  }

  shift() {
    const webComponent = this.list.shift();

    if (webComponent) {
      this.lookup.delete(webComponent);
      return webComponent;
    }
  }

  isEmpty() {
    return this.list.length === 0;
  }

  isAdded(webComponent) {
    return this.lookup.has(webComponent);
  }
  /**
   * Processes the whole queue by executing the callback on each component,
   * while also imposing restrictions on how many times a component may be processed.
   *
   * @param callback - function with one argument (the web component to be processed)
   */


  process(callback) {
    let webComponent;
    const stats = new Map();
    webComponent = this.shift();

    while (webComponent) {
      const timesProcessed = stats.get(webComponent) || 0;

      if (timesProcessed > MAX_PROCESS_COUNT) {
        throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
      }

      callback(webComponent);
      stats.set(webComponent, timesProcessed + 1);
      webComponent = this.shift();
    }
  }

}

var _default = RenderQueue;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/setToArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// This is needed as IE11 doesn't have Set.prototype.keys/values/entries, so [...mySet.values()] is not an option
const setToArray = s => {
  const arr = [];
  s.forEach(item => {
    arr.push(item);
  });
  return arr;
};

var _default = setToArray;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/CustomElementsRegistry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordTagRegistrationFailure = exports.getAllRegisteredTags = exports.isTagRegistered = exports.registerTag = void 0;

var _setToArray = _interopRequireDefault(require("./util/setToArray.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Definitions = new Set();
const Failures = new Set();
let failureTimeout;

const registerTag = tag => {
  Definitions.add(tag);
};

exports.registerTag = registerTag;

const isTagRegistered = tag => {
  return Definitions.has(tag);
};

exports.isTagRegistered = isTagRegistered;

const getAllRegisteredTags = () => {
  return (0, _setToArray.default)(Definitions);
};

exports.getAllRegisteredTags = getAllRegisteredTags;

const recordTagRegistrationFailure = tag => {
  Failures.add(tag);

  if (!failureTimeout) {
    failureTimeout = setTimeout(() => {
      displayFailedRegistrations();
      failureTimeout = undefined;
    }, 1000);
  }
};

exports.recordTagRegistrationFailure = recordTagRegistrationFailure;

const displayFailedRegistrations = () => {
  console.warn(`The following tags have already been defined by a different UI5 Web Components version: ${(0, _setToArray.default)(Failures).join(", ")}`); // eslint-disable-line

  Failures.clear();
};
},{"./util/setToArray.js":"../node_modules/@ui5/webcomponents-base/dist/util/setToArray.js"}],"../node_modules/@ui5/webcomponents-base/dist/locale/RTLAwareRegistry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRtlAware = exports.markAsRtlAware = void 0;
const rtlAwareSet = new Set();

const markAsRtlAware = klass => {
  rtlAwareSet.add(klass);
};

exports.markAsRtlAware = markAsRtlAware;

const isRtlAware = klass => {
  return rtlAwareSet.has(klass);
};

exports.isRtlAware = isRtlAware;
},{}],"../node_modules/@ui5/webcomponents-base/dist/RenderScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RenderQueue = _interopRequireDefault(require("./RenderQueue.js"));

var _CustomElementsRegistry = require("./CustomElementsRegistry.js");

var _RTLAwareRegistry = require("./locale/RTLAwareRegistry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registeredElements = new Set(); // Queue for invalidated web components

const invalidatedWebComponents = new _RenderQueue.default();
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
/**
 * Class that manages the rendering/re-rendering of web components
 * This is always asynchronous
 */

class RenderScheduler {
  constructor() {
    throw new Error("Static class");
  }
  /**
   * Schedules a render task (if not already scheduled) to render the component
   *
   * @param webComponent
   * @returns {Promise}
   */


  static async renderDeferred(webComponent) {
    // Enqueue the web component
    invalidatedWebComponents.add(webComponent); // Schedule a rendering task

    await RenderScheduler.scheduleRenderTask();
  }
  /**
   * Renders a component synchronously
   *
   * @param webComponent
   */


  static renderImmediately(webComponent) {
    webComponent._render();
  }
  /**
   * Cancels the rendering of a component, added to the queue with renderDeferred
   *
   * @param webComponent
   */


  static cancelRender(webComponent) {
    invalidatedWebComponents.remove(webComponent);
  }
  /**
   * Schedules a rendering task, if not scheduled already
   */


  static async scheduleRenderTask() {
    if (!queuePromise) {
      queuePromise = new Promise(resolve => {
        window.requestAnimationFrame(() => {
          // Render all components in the queue
          invalidatedWebComponents.process(component => component._render()); // Resolve the promise so that callers of renderDeferred can continue

          queuePromise = null;
          resolve(); // Wait for Mutation observer before the render task is considered finished

          if (!mutationObserverTimer) {
            mutationObserverTimer = setTimeout(() => {
              mutationObserverTimer = undefined;

              if (invalidatedWebComponents.isEmpty()) {
                RenderScheduler._resolveTaskPromise();
              }
            }, 200);
          }
        });
      });
    }

    await queuePromise;
  }
  /**
   * return a promise that will be resolved once all invalidated web components are rendered
   */


  static whenDOMUpdated() {
    if (renderTaskPromise) {
      return renderTaskPromise;
    }

    renderTaskPromise = new Promise(resolve => {
      renderTaskPromiseResolve = resolve;
      window.requestAnimationFrame(() => {
        if (invalidatedWebComponents.isEmpty()) {
          renderTaskPromise = undefined;
          resolve();
        }
      });
    });
    return renderTaskPromise;
  }

  static whenAllCustomElementsAreDefined() {
    const definedPromises = (0, _CustomElementsRegistry.getAllRegisteredTags)().map(tag => customElements.whenDefined(tag));
    return Promise.all(definedPromises);
  }

  static async whenFinished() {
    await RenderScheduler.whenAllCustomElementsAreDefined();
    await RenderScheduler.whenDOMUpdated();
  }

  static _resolveTaskPromise() {
    if (!invalidatedWebComponents.isEmpty()) {
      // More updates are pending. Resolve will be called again
      return;
    }

    if (renderTaskPromiseResolve) {
      renderTaskPromiseResolve.call(this);
      renderTaskPromiseResolve = undefined;
      renderTaskPromise = undefined;
    }
  }

  static register(element) {
    registeredElements.add(element);
  }

  static deregister(element) {
    registeredElements.delete(element);
  }
  /**
   * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
   *
   * Usage:
   * reRenderAllUI5Elements() -> rerenders all components
   * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
   * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
   * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
   * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
   * etc...
   *
   * @public
   * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
   */


  static reRenderAllUI5Elements(filters) {
    registeredElements.forEach(element => {
      const tag = element.constructor.getMetadata().getTag();
      const rtlAware = (0, _RTLAwareRegistry.isRtlAware)(element.constructor);
      const languageAware = element.constructor.getMetadata().isLanguageAware();

      if (!filters || filters.tag === tag || filters.rtlAware && rtlAware || filters.languageAware && languageAware) {
        RenderScheduler.renderDeferred(element);
      }
    });
  }

}

var _default = RenderScheduler;
exports.default = _default;
},{"./RenderQueue.js":"../node_modules/@ui5/webcomponents-base/dist/RenderQueue.js","./CustomElementsRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/CustomElementsRegistry.js","./locale/RTLAwareRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/locale/RTLAwareRegistry.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/getStylesString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getStylesString = styles => {
  if (Array.isArray(styles)) {
    return flatten(styles).join(" ");
  }

  return styles;
};

const flatten = arr => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
};

var _default = getStylesString;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/StaticAreaItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StaticArea = require("./StaticArea.js");

var _RenderScheduler = _interopRequireDefault(require("./RenderScheduler.js"));

var _getStylesString = _interopRequireDefault(require("./theming/getStylesString.js"));

var _executeTemplate = _interopRequireDefault(require("./renderer/executeTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @author SAP SE
 * @private
 * Defines and takes care of ui5-static-are-item items
 */
class StaticAreaItem {
  constructor(_ui5ElementContext) {
    this.ui5ElementContext = _ui5ElementContext;
    this._rendered = false;
  }

  isRendered() {
    return this._rendered;
  }
  /**
   * @protected
   */


  _updateFragment() {
    const renderResult = (0, _executeTemplate.default)(this.ui5ElementContext.constructor.staticAreaTemplate, this.ui5ElementContext),
          stylesToAdd = window.ShadyDOM ? false : (0, _getStylesString.default)(this.ui5ElementContext.constructor.staticAreaStyles);

    if (!this.staticAreaItemDomRef) {
      // Initial rendering of fragment
      this.staticAreaItemDomRef = document.createElement("ui5-static-area-item");
      this.staticAreaItemDomRef.attachShadow({
        mode: "open"
      });
      this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

      (0, _StaticArea.getStaticAreaInstance)().appendChild(this.staticAreaItemDomRef);
      this._rendered = true;
    }

    this._updateContentDensity(this.ui5ElementContext.isCompact);

    this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, {
      eventContext: this.ui5ElementContext
    });
  }
  /**
   * @protected
   */


  _removeFragmentFromStaticArea() {
    if (!this.staticAreaItemDomRef) {
      return;
    }

    const staticArea = (0, _StaticArea.getStaticAreaInstance)();
    staticArea.removeChild(this.staticAreaItemDomRef);
    this.staticAreaItemDomRef = null; // remove static area

    if (staticArea.childElementCount < 1) {
      (0, _StaticArea.removeStaticArea)();
    }
  }
  /**
   * @protected
   */


  _updateContentDensity(isCompact) {
    if (!this.staticAreaItemDomRef) {
      return;
    }

    if (isCompact) {
      this.staticAreaItemDomRef.classList.add("sapUiSizeCompact");
      this.staticAreaItemDomRef.classList.add("ui5-content-density-compact");
    } else {
      this.staticAreaItemDomRef.classList.remove("sapUiSizeCompact");
      this.staticAreaItemDomRef.classList.remove("ui5-content-density-compact");
    }
  }
  /**
   * @protected
   * Returns reference to the DOM element where the current fragment is added.
   */


  async getDomRef() {
    if (!this._rendered || !this.staticAreaItemDomRef) {
      this._updateFragment();
    }

    await _RenderScheduler.default.whenDOMUpdated(); // Wait for the content of the ui5-static-area-item to be rendered

    return this.staticAreaItemDomRef.shadowRoot;
  }

}

class StaticAreaItemElement extends HTMLElement {
  constructor() {
    super();
  }

  get isUI5Element() {
    return true;
  }

}

if (!customElements.get("ui5-static-area-item")) {
  customElements.define("ui5-static-area-item", StaticAreaItemElement);
}

var _default = StaticAreaItem;
exports.default = _default;
},{"./StaticArea.js":"../node_modules/@ui5/webcomponents-base/dist/StaticArea.js","./RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/dist/RenderScheduler.js","./theming/getStylesString.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getStylesString.js","./renderer/executeTemplate.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/executeTemplate.js"}],"../node_modules/@ui5/webcomponents-base/dist/compatibility/DOMObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Shorthands
const w = window; // Map of observer objects per dom node

const observers = new WeakMap();
/**
 * Implements universal DOM node observation methods.
 */

class DOMObserver {
  constructor() {
    throw new Error("Static class");
  }
  /**
   * This function abstracts out mutation observer usage inside shadow DOM.
   * For native shadow DOM the native mutation observer is used.
   * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
   *
   * @throws Exception
   * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
   *
   * @param node
   * @param callback
   * @param options - Only used for the native mutation observer
   */


  static observeDOMNode(node, callback, options) {
    let observerObject = observers.get(node);

    if (observerObject) {
      throw new Error("A mutation/ShadyDOM observer is already assigned to this node.");
    }

    if (w.ShadyDOM) {
      observerObject = w.ShadyDOM.observeChildren(node, callback);
    } else {
      observerObject = new MutationObserver(callback);
      observerObject.observe(node, options);
    }

    observers.set(node, observerObject);
  }
  /**
   * De-registers the mutation observer, depending on its type
   * @param node
   */


  static unobserveDOMNode(node) {
    const observerObject = observers.get(node);

    if (!observerObject) {
      return;
    }

    if (observerObject instanceof MutationObserver) {
      observerObject.disconnect();
    } else {
      w.ShadyDOM.unobserveChildren(observerObject);
    }

    observers.delete(node);
  }

}

var _default = DOMObserver;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/config/NoConflict.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipOriginalEvent = exports.setNoConflict = exports.getNoConflict = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

// Fire these events even with noConflict: true
const excludeList = ["value-changed"];

const shouldFireOriginalEvent = eventName => {
  return excludeList.includes(eventName);
};

let noConflict;

const shouldNotFireOriginalEvent = eventName => {
  const nc = getNoConflict();
  return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};

const getNoConflict = () => {
  if (noConflict === undefined) {
    noConflict = (0, _InitialConfiguration.getNoConflict)();
  }

  return noConflict;
};

exports.getNoConflict = getNoConflict;

const skipOriginalEvent = eventName => {
  const nc = getNoConflict(); // Always fire these events

  if (shouldFireOriginalEvent(eventName)) {
    return false;
  } // Read from the configuration


  if (nc === true) {
    return true;
  }

  return !shouldNotFireOriginalEvent(eventName);
};

exports.skipOriginalEvent = skipOriginalEvent;

const setNoConflict = noConflictData => {
  noConflict = noConflictData;
};

exports.setNoConflict = setNoConflict;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js"}],"../node_modules/@ui5/webcomponents-base/dist/locale/languageChange.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireLanguageChange = exports.detachLanguageChange = exports.attachLanguageChange = void 0;

var _EventProvider = _interopRequireDefault(require("../EventProvider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventProvider = new _EventProvider.default();
const LANG_CHANGE = "languageChange";

const attachLanguageChange = listener => {
  eventProvider.attachEvent(LANG_CHANGE, listener);
};

exports.attachLanguageChange = attachLanguageChange;

const detachLanguageChange = listener => {
  eventProvider.detachEvent(LANG_CHANGE, listener);
};

exports.detachLanguageChange = detachLanguageChange;

const fireLanguageChange = lang => {
  return eventProvider.fireEvent(LANG_CHANGE, lang);
};

exports.fireLanguageChange = fireLanguageChange;
},{"../EventProvider.js":"../node_modules/@ui5/webcomponents-base/dist/EventProvider.js"}],"../node_modules/@ui5/webcomponents-base/dist/config/Language.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUseDefaultLanguage = exports.setUseDefaultLanguage = exports.setLanguage = exports.getLanguage = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

var _languageChange = require("../locale/languageChange.js");

var _RenderScheduler = _interopRequireDefault(require("../RenderScheduler.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let language;
let useDefaultLanguage;
/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */

const getLanguage = () => {
  if (language === undefined) {
    language = (0, _InitialConfiguration.getLanguage)();
  }

  return language;
};
/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done
 *
 * @param newLanguage
 * @returns {Promise<void>}
 */


exports.getLanguage = getLanguage;

const setLanguage = async newLanguage => {
  if (language === newLanguage) {
    return;
  }

  language = newLanguage;
  const listenersResults = (0, _languageChange.fireLanguageChange)(newLanguage);
  await Promise.all(listenersResults);

  _RenderScheduler.default.reRenderAllUI5Elements({
    languageAware: true
  });

  return _RenderScheduler.default.whenFinished();
};
/**
 * Defines if the default language, that is inlined, should be used,
 * instead of fetching the language over the network.
 * <b>Note:</b> By default the language will be fetched.
 *
 * @param {Boolean} useDefaultLanguage
 */


exports.setLanguage = setLanguage;

const setUseDefaultLanguage = useDefaultLang => {
  useDefaultLanguage = useDefaultLang;
};
/**
 * Returns if the default language, that is inlined, should be used.
 * @returns {Boolean}
 */


exports.setUseDefaultLanguage = setUseDefaultLanguage;

const getUseDefaultLanguage = () => {
  if (useDefaultLanguage === undefined) {
    setUseDefaultLanguage((0, _InitialConfiguration.getUseDefaultLanguage)());
  }

  return useDefaultLanguage;
};

exports.getUseDefaultLanguage = getUseDefaultLanguage;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js","../locale/languageChange.js":"../node_modules/@ui5/webcomponents-base/dist/locale/languageChange.js","../RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/dist/RenderScheduler.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/getDesigntimePropertyAsArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = value => {
  const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
  return m && m[2] ? m[2].split(/,/) : null;
};

exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/detectNavigatorLanguage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AssetParameters = require("../generated/AssetParameters.js");

var _default = () => {
  const browserLanguages = navigator.languages;

  const navigatorLanguage = () => {
    return navigator.language;
  };

  const rawLocale = browserLanguages && browserLanguages[0] || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;
  return rawLocale || _AssetParameters.DEFAULT_LANGUAGE;
};

exports.default = _default;
},{"../generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js"}],"../node_modules/@ui5/webcomponents-base/dist/config/RTL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRTL = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

var _Language = require("./Language.js");

var _getDesigntimePropertyAsArray = _interopRequireDefault(require("../util/getDesigntimePropertyAsArray.js"));

var _detectNavigatorLanguage = _interopRequireDefault(require("../util/detectNavigatorLanguage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const M_ISO639_OLD_TO_NEW = {
  "iw": "he",
  "ji": "yi",
  "in": "id",
  "sh": "sr"
};
const A_RTL_LOCALES = (0, _getDesigntimePropertyAsArray.default)("$cldr-rtl-locales:ar,fa,he$") || [];

const impliesRTL = language => {
  language = language && M_ISO639_OLD_TO_NEW[language] || language;
  return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getRTL = () => {
  const configurationRTL = (0, _InitialConfiguration.getRTL)();

  if (configurationRTL !== null) {
    return !!configurationRTL;
  }

  return impliesRTL((0, _Language.getLanguage)() || (0, _detectNavigatorLanguage.default)());
}; // eslint-disable-line


exports.getRTL = getRTL;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js","./Language.js":"../node_modules/@ui5/webcomponents-base/dist/config/Language.js","../util/getDesigntimePropertyAsArray.js":"../node_modules/@ui5/webcomponents-base/dist/util/getDesigntimePropertyAsArray.js","../util/detectNavigatorLanguage.js":"../node_modules/@ui5/webcomponents-base/dist/util/detectNavigatorLanguage.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/CustomStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detachCustomCSSChange = exports.attachCustomCSSChange = exports.getCustomCSS = exports.addCustomCSS = void 0;

var _RenderScheduler = _interopRequireDefault(require("../RenderScheduler.js"));

var _EventProvider = _interopRequireDefault(require("../EventProvider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventProvider = new _EventProvider.default();
const CUSTOM_CSS_CHANGE = "CustomCSSChange";

const attachCustomCSSChange = listener => {
  eventProvider.attachEvent(CUSTOM_CSS_CHANGE, listener);
};

exports.attachCustomCSSChange = attachCustomCSSChange;

const detachCustomCSSChange = listener => {
  eventProvider.detachEvent(CUSTOM_CSS_CHANGE, listener);
};

exports.detachCustomCSSChange = detachCustomCSSChange;

const fireCustomCSSChange = tag => {
  return eventProvider.fireEvent(CUSTOM_CSS_CHANGE, tag);
};

const customCSSFor = {};

const addCustomCSS = (tag, css) => {
  if (!customCSSFor[tag]) {
    customCSSFor[tag] = [];
  }

  customCSSFor[tag].push(css);
  fireCustomCSSChange(tag);

  _RenderScheduler.default.reRenderAllUI5Elements({
    tag
  });
};

exports.addCustomCSS = addCustomCSS;

const getCustomCSS = tag => {
  return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

exports.getCustomCSS = getCustomCSS;
},{"../RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/dist/RenderScheduler.js","../EventProvider.js":"../node_modules/@ui5/webcomponents-base/dist/EventProvider.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/getEffectiveStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomStyle = require("./CustomStyle.js");

var _getStylesString = _interopRequireDefault(require("./getStylesString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const effectiveStyleMap = new Map();
(0, _CustomStyle.attachCustomCSSChange)(tag => {
  effectiveStyleMap.delete(tag);
});

const getEffectiveStyle = ElementClass => {
  const tag = ElementClass.getMetadata().getTag();

  if (!effectiveStyleMap.has(tag)) {
    const customStyle = (0, _CustomStyle.getCustomCSS)(tag) || "";
    const builtInStyles = (0, _getStylesString.default)(ElementClass.styles);
    const effectiveStyle = `${builtInStyles} ${customStyle}`;
    effectiveStyleMap.set(tag, effectiveStyle);
  }

  return effectiveStyleMap.get(tag);
};

var _default = getEffectiveStyle;
exports.default = _default;
},{"./CustomStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/CustomStyle.js","./getStylesString.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getStylesString.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/getConstructableStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getEffectiveStyle = _interopRequireDefault(require("./getEffectiveStyle.js"));

var _CustomStyle = require("./CustomStyle.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const constructableStyleMap = new Map();
(0, _CustomStyle.attachCustomCSSChange)(tag => {
  constructableStyleMap.delete(tag);
});
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */

const getConstructableStyle = ElementClass => {
  const tag = ElementClass.getMetadata().getTag();

  if (!constructableStyleMap.has(tag)) {
    const styleContent = (0, _getEffectiveStyle.default)(ElementClass);
    const style = new CSSStyleSheet();
    style.replaceSync(styleContent);
    constructableStyleMap.set(tag, [style]);
  }

  return constructableStyleMap.get(tag);
};

var _default = getConstructableStyle;
exports.default = _default;
},{"./getEffectiveStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getEffectiveStyle.js","./CustomStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/CustomStyle.js"}],"../node_modules/@ui5/webcomponents-base/dist/theming/adaptCSSForIE.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const findClosingParenthesisPos = (str, openingParenthesisPos) => {
  let opened = 1;

  for (let pos = openingParenthesisPos + 1; pos < str.length; pos++) {
    const char = str.charAt(pos);

    if (char === "(") {
      opened++;
    } else if (char === ")") {
      opened--;
    }

    if (opened === 0) {
      return pos;
    }
  }
};

const replaceSelector = (str, selector, selectorStartPos, replacement) => {
  const charAfterSelectorPos = selectorStartPos + selector.length;
  const charAfterSelector = str.charAt(charAfterSelectorPos);
  const upToSelector = str.substring(0, selectorStartPos) + replacement;

  if (charAfterSelector === "(") {
    const closingParenthesisPos = findClosingParenthesisPos(str, charAfterSelectorPos);
    return upToSelector + str.substring(charAfterSelectorPos + 1, closingParenthesisPos) + str.substring(closingParenthesisPos + 1);
  }

  return upToSelector + str.substring(charAfterSelectorPos);
};
/**
 * :host => ui5-button
 * :host([expr]) => ui5-button[expr]
 * ::slotted(expr) => expr
 * @param str - source string
 * @param selector - :host or ::slotted
 * @param replacement - normally tag name
 * @returns {*}
 */


const replaceSelectors = (str, selector, replacement) => {
  let selectorStartPos = str.indexOf(selector);

  while (selectorStartPos !== -1) {
    str = replaceSelector(str, selector, selectorStartPos, replacement);
    selectorStartPos = str.indexOf(selector);
  }

  return str;
};

const adaptLinePart = (line, tag, pureTag) => {
  line = line.trim();
  line = replaceSelectors(line, "::slotted", ``); // first remove all ::slotted() occurrences
  // Host selector - replace it

  if (line.startsWith(":host")) {
    return replaceSelector(line, ":host", 0, tag);
  } // Leave out @keyframes and keyframe values (0%, 100%, etc...)
  // csso shortens '100%' -> 'to', make sure to leave it untouched


  if (line.match(/^[@0-9]/) || line === "to" || line === "to{") {
    return line;
  } // IE specific selector (directly written with the tag, f.e. ui5-button {}) - keep it


  if (line.match(new RegExp(`^${tag}[^a-zA-Z0-9-]`))) {
    return line;
  } // IE specific selector (directly written with the tag attribute, f.e. [ui5-button] {}) - keep it


  if (pureTag && line.startsWith(`[${pureTag}]`)) {
    return line;
  } // No host and no tag in the beginning of the selector - prepend the tag


  return `${tag} ${line}`;
};

const adaptCSSForIE = (str, tag, pureTag) => {
  str = str.replace(/\n/g, ` `);
  str = str.replace(/([{}])/g, `$1\n`);
  let result = ``;
  const lines = str.split(`\n`);
  lines.forEach(line => {
    const mustProcess = line.match(/{$/); // Only work on lines that end on {, otherwise just append to result

    if (mustProcess) {
      const lineParts = line.split(",");
      const processedLineParts = lineParts.map(linePart => {
        return adaptLinePart(linePart, tag, pureTag);
      });
      line = processedLineParts.join(",");
    }

    result = `${result}${line}`;
  });
  return result;
};

var _default = adaptCSSForIE;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/theming/createComponentStyleTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createStyleInHead = _interopRequireDefault(require("../util/createStyleInHead.js"));

var _getEffectiveStyle = _interopRequireDefault(require("./getEffectiveStyle.js"));

var _adaptCSSForIE = _interopRequireDefault(require("./adaptCSSForIE.js"));

var _CSSVarsPonyfill = require("./CSSVarsPonyfill.js");

var _CustomStyle = require("./CustomStyle.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IEStyleSet = new Set();
(0, _CustomStyle.attachCustomCSSChange)(tag => {
  IEStyleSet.delete(tag);
});

const getStaticStyle = ElementClass => {
  let componentStaticStyles = ElementClass.staticAreaStyles;

  if (Array.isArray(componentStaticStyles)) {
    componentStaticStyles = componentStaticStyles.join(" ");
  }

  return componentStaticStyles;
};
/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */


const createComponentStyleTag = ElementClass => {
  const tag = ElementClass.getMetadata().getTag();
  const pureTag = ElementClass.getMetadata().getPureTag();

  if (IEStyleSet.has(tag)) {
    return;
  }

  let cssContent = (0, _getEffectiveStyle.default)(ElementClass);
  cssContent = (0, _adaptCSSForIE.default)(cssContent, tag, pureTag); // Append static CSS, if any, for IE

  let staticCssContent = getStaticStyle(ElementClass);

  if (staticCssContent) {
    staticCssContent = (0, _adaptCSSForIE.default)(staticCssContent, "ui5-static-area-item");
    cssContent = `${cssContent} ${staticCssContent}`;
  }

  (0, _createStyleInHead.default)(cssContent, {
    "data-ui5-element-styles": tag
  });

  if ((0, _CSSVarsPonyfill.ponyfillNeeded)()) {
    (0, _CSSVarsPonyfill.schedulePonyfill)();
  }

  IEStyleSet.add(tag);
};

var _default = createComponentStyleTag;
exports.default = _default;
},{"../util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js","./getEffectiveStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getEffectiveStyle.js","./adaptCSSForIE.js":"../node_modules/@ui5/webcomponents-base/dist/theming/adaptCSSForIE.js","./CSSVarsPonyfill.js":"../node_modules/@ui5/webcomponents-base/dist/theming/CSSVarsPonyfill.js","./CustomStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/CustomStyle.js"}],"../node_modules/@ui5/webcomponents-base/dist/types/Integer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Integer extends _DataType.default {
  static isValid(value) {
    return Number.isInteger(value);
  }

}

var _default = Integer;
exports.default = _default;
},{"./DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents-base/dist/types/Float.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Float extends _DataType.default {
  static isValid(value) {
    // Assuming that integers are floats as well!
    return Number(value) === value;
  }

}

var _default = Float;
exports.default = _default;
},{"./DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/isValidPropertyName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = ["disabled", "title", "hidden", "role", "draggable"];
/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */

const isValidPropertyName = name => {
  if (allowList.includes(name) || name.startsWith("aria")) {
    return true;
  }

  const classes = [HTMLElement, Element, Node];
  return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

var _default = isValidPropertyName;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("./thirdparty/merge.js"));

var _boot = _interopRequireDefault(require("./boot.js"));

var _UI5ElementMetadata = _interopRequireDefault(require("./UI5ElementMetadata.js"));

var _executeTemplate = _interopRequireDefault(require("./renderer/executeTemplate.js"));

var _StaticAreaItem = _interopRequireDefault(require("./StaticAreaItem.js"));

var _RenderScheduler = _interopRequireDefault(require("./RenderScheduler.js"));

var _CustomElementsRegistry = require("./CustomElementsRegistry.js");

var _DOMObserver = _interopRequireDefault(require("./compatibility/DOMObserver.js"));

var _NoConflict = require("./config/NoConflict.js");

var _RTL = require("./config/RTL.js");

var _getConstructableStyle = _interopRequireDefault(require("./theming/getConstructableStyle.js"));

var _createComponentStyleTag = _interopRequireDefault(require("./theming/createComponentStyleTag.js"));

var _getEffectiveStyle = _interopRequireDefault(require("./theming/getEffectiveStyle.js"));

var _Integer = _interopRequireDefault(require("./types/Integer.js"));

var _Float = _interopRequireDefault(require("./types/Float.js"));

var _StringHelper = require("./util/StringHelper.js");

var _isValidPropertyName = _interopRequireDefault(require("./util/isValidPropertyName.js"));

var _isSlot = _interopRequireDefault(require("./util/isSlot.js"));

var _RTLAwareRegistry = require("./locale/RTLAwareRegistry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const metadata = {
  events: {
    "_property-change": {}
  }
};
let autoId = 0;
const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();
const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.UI5Element
 * @extends HTMLElement
 * @public
 */

class UI5Element extends HTMLElement {
  constructor() {
    super();
    this._propertyChangeListeners = new Set();

    this._initializeState();

    this._upgradeAllProperties();

    this._initializeContainers();

    this._upToDate = false;
    this._inDOM = false;
    this._fullyConnected = false;
    let deferredResolve;
    this._domRefReadyPromise = new Promise(resolve => {
      deferredResolve = resolve;
    });
    this._domRefReadyPromise._deferredResolve = deferredResolve;
    this._monitoredChildProps = new Map();
    this._shouldInvalidateParent = false;
  }

  addEventListener(type, listener, options) {
    if (type === "_property-change") {
      this._propertyChangeListeners.add(listener);
    }

    return super.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener, options) {
    if (type === "_property-change") {
      this._propertyChangeListeners.delete(listener);
    }

    return super.removeEventListener(type, listener, options);
  }

  _hasPropertyChangeListeners() {
    return !!this._propertyChangeListeners.size;
  }
  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */


  get _id() {
    if (!this.__id) {
      this.__id = `ui5wc_${++autoId}`;
    }

    return this.__id;
  }
  /**
   * @private
   */


  _initializeContainers() {
    const needsShadowDOM = this.constructor._needsShadowDOM();

    const needsStaticArea = this.constructor._needsStaticArea(); // Init Shadow Root


    if (needsShadowDOM) {
      this.attachShadow({
        mode: "open"
      });
    } // Init StaticAreaItem only if needed


    if (needsStaticArea) {
      this.staticAreaItem = new _StaticAreaItem.default(this);
    }
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */


  async connectedCallback() {
    this.setAttribute(this.constructor.getMetadata().getPureTag(), "");

    const needsShadowDOM = this.constructor._needsShadowDOM();

    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = true;

    if (slotsAreManaged) {
      // always register the observer before yielding control to the main thread (await)
      this._startObservingDOMChildren();

      await this._processChildren();
    } // Render the Shadow DOM


    if (needsShadowDOM) {
      if (!this.shadowRoot) {
        // Workaround for Firefox74 bug
        await Promise.resolve();
      }

      if (!this._inDOM) {
        // Component removed from DOM while _processChildren was running
        return;
      }

      _RenderScheduler.default.register(this);

      _RenderScheduler.default.renderImmediately(this);

      this._domRefReadyPromise._deferredResolve();

      this._fullyConnected = true;

      if (typeof this.onEnterDOM === "function") {
        this.onEnterDOM();
      }
    }
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */


  disconnectedCallback() {
    const needsShadowDOM = this.constructor._needsShadowDOM();

    const needsStaticArea = this.constructor._needsStaticArea();

    const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = false;

    if (slotsAreManaged) {
      this._stopObservingDOMChildren();
    }

    if (needsShadowDOM) {
      _RenderScheduler.default.deregister(this);

      if (this._fullyConnected) {
        if (typeof this.onExitDOM === "function") {
          this.onExitDOM();
        }

        this._fullyConnected = false;
      }
    }

    if (needsStaticArea) {
      this.staticAreaItem._removeFragmentFromStaticArea();
    }

    _RenderScheduler.default.cancelRender(this);
  }
  /**
   * @private
   */


  _startObservingDOMChildren() {
    const shouldObserveChildren = this.constructor.getMetadata().hasSlots();

    if (!shouldObserveChildren) {
      return;
    }

    const canSlotText = this.constructor.getMetadata().canSlotText();
    const mutationObserverOptions = {
      childList: true,
      subtree: canSlotText,
      characterData: true
    };

    _DOMObserver.default.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
  }
  /**
   * @private
   */


  _stopObservingDOMChildren() {
    _DOMObserver.default.unobserveDOMNode(this);
  }
  /**
   * Note: this method is also manually called by "compatibility/patchNodeValue.js"
   * @private
   */


  async _processChildren() {
    const hasSlots = this.constructor.getMetadata().hasSlots();

    if (hasSlots) {
      await this._updateSlots();
    }
  }
  /**
   * @private
   */


  async _updateSlots() {
    const slotsMap = this.constructor.getMetadata().getSlots();
    const canSlotText = this.constructor.getMetadata().canSlotText();
    const domChildren = Array.from(canSlotText ? this.childNodes : this.children); // Init the _state object based on the supported slots

    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      // eslint-disable-line
      this._clearSlot(slotName, slotData);
    }

    const autoIncrementMap = new Map();
    const slottedChildrenMap = new Map();
    const allChildrenUpgraded = domChildren.map(async (child, idx) => {
      // Determine the type of the child (mainly by the slot attribute)
      const slotName = this.constructor._getSlotName(child);

      const slotData = slotsMap[slotName]; // Check if the slotName is supported

      if (slotData === undefined) {
        const validValues = Object.keys(slotsMap).join(", ");
        console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line

        return;
      } // For children that need individual slots, calculate them


      if (slotData.individualSlots) {
        const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
        autoIncrementMap.set(slotName, nextIndex);
        child._individualSlot = `${slotName}-${nextIndex}`;
      } // Await for not-yet-defined custom elements


      if (child instanceof HTMLElement) {
        const localName = child.localName;
        const isCustomElement = localName.includes("-");

        if (isCustomElement) {
          const isDefined = window.customElements.get(localName);

          if (!isDefined) {
            const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet

            let timeoutPromise = elementTimeouts.get(localName);

            if (!timeoutPromise) {
              timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
              elementTimeouts.set(localName, timeoutPromise);
            }

            await Promise.race([whenDefinedPromise, timeoutPromise]);
          }

          window.customElements.upgrade(child);
        }
      }

      child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

      if (child.isUI5Element && slotData.listenFor) {
        this._attachChildPropertyUpdated(child, slotData.listenFor);
      }

      if (child.isUI5Element && slotData.invalidateParent) {
        child._shouldInvalidateParent = true;
      }

      if ((0, _isSlot.default)(child)) {
        this._attachSlotChange(child);
      }

      const propertyName = slotData.propertyName || slotName;

      if (slottedChildrenMap.has(propertyName)) {
        slottedChildrenMap.get(propertyName).push({
          child,
          idx
        });
      } else {
        slottedChildrenMap.set(propertyName, [{
          child,
          idx
        }]);
      }
    });
    await Promise.all(allChildrenUpgraded); // Distribute the child in the _state object, keeping the Light DOM order,
    // not the order elements are defined.

    slottedChildrenMap.forEach((children, slot) => {
      this._state[slot] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
    });

    this._invalidate("slots");
  }
  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */


  _clearSlot(slotName, slotData) {
    const propertyName = slotData.propertyName || slotName;
    let children = this._state[propertyName];

    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach(child => {
      if (child && child.isUI5Element) {
        this._detachChildPropertyUpdated(child);

        child._shouldInvalidateParent = false;
      }

      if ((0, _isSlot.default)(child)) {
        this._detachSlotChange(child);
      }
    });
    this._state[propertyName] = [];

    this._invalidate(propertyName, []);
  }
  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */


  attributeChangedCallback(name, oldValue, newValue) {
    const properties = this.constructor.getMetadata().getProperties();
    const realName = name.replace(/^ui5-/, "");
    const nameInCamelCase = (0, _StringHelper.kebabToCamelCase)(realName);

    if (properties.hasOwnProperty(nameInCamelCase)) {
      // eslint-disable-line
      const propertyTypeClass = properties[nameInCamelCase].type;

      if (propertyTypeClass === Boolean) {
        newValue = newValue !== null;
      }

      if (propertyTypeClass === _Integer.default) {
        newValue = parseInt(newValue);
      }

      if (propertyTypeClass === _Float.default) {
        newValue = parseFloat(newValue);
      }

      this[nameInCamelCase] = newValue;
    }
  }
  /**
   * @private
   */


  _updateAttribute(name, newValue) {
    if (!this.constructor.getMetadata().hasAttribute(name)) {
      return;
    }

    if (typeof newValue === "object") {
      return;
    }

    const attrName = (0, _StringHelper.camelToKebabCase)(name);
    const attrValue = this.getAttribute(attrName);

    if (typeof newValue === "boolean") {
      if (newValue === true && attrValue === null) {
        this.setAttribute(attrName, "");
      } else if (newValue === false && attrValue !== null) {
        this.removeAttribute(attrName);
      }
    } else if (attrValue !== newValue) {
      this.setAttribute(attrName, newValue);
    }
  }
  /**
   * @private
   */


  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      // eslint-disable-line
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  /**
   * @private
   */


  _upgradeAllProperties() {
    const allProps = this.constructor.getMetadata().getPropertiesList();
    allProps.forEach(this._upgradeProperty, this);
  }
  /**
   * @private
   */


  _initializeState() {
    const defaultState = this.constructor._getDefaultState();

    this._state = Object.assign({}, defaultState);
  }
  /**
   * @private
   */


  _attachChildPropertyUpdated(child, listenFor) {
    const slotName = this.constructor._getSlotName(child); // all slotted children have the same configuration


    let observedProps = [],
        notObservedProps = [];

    if (Array.isArray(listenFor)) {
      observedProps = listenFor;
    } else {
      observedProps = Array.isArray(listenFor.include) ? listenFor.include : [];
      notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
    }

    if (!this._monitoredChildProps.has(slotName)) {
      this._monitoredChildProps.set(slotName, {
        observedProps,
        notObservedProps
      });
    }

    child.addEventListener("_property-change", this._invalidateParentOnPropertyUpdate);
  }
  /**
   * @private
   */


  _detachChildPropertyUpdated(child) {
    child.removeEventListener("_property-change", this._invalidateParentOnPropertyUpdate);
  }
  /**
   *  @private
   */


  _propertyChange(name, value) {
    this._updateAttribute(name, value);

    if (this._hasPropertyChangeListeners()) {
      this.dispatchEvent(new CustomEvent("_property-change", {
        detail: {
          name,
          newValue: value
        },
        composed: false,
        bubbles: false
      }));
    }
  }
  /**
   * @private
   */


  _invalidateParentOnPropertyUpdate(prop) {
    // The web component to be invalidated
    const parentNode = this.parentNode;

    if (!parentNode) {
      return;
    }

    const slotName = parentNode.constructor._getSlotName(this);

    const propsMetadata = parentNode._monitoredChildProps.get(slotName);

    if (!propsMetadata) {
      return;
    }

    const {
      observedProps,
      notObservedProps
    } = propsMetadata;
    const allPropertiesAreObserved = observedProps.length === 1 && observedProps[0] === "*";
    const shouldObserve = allPropertiesAreObserved || observedProps.includes(prop.detail.name);
    const shouldSkip = notObservedProps.includes(prop.detail.name);

    if (shouldObserve && !shouldSkip) {
      parentNode._invalidate("_parent_", this);
    }
  }
  /**
   * @private
   */


  _attachSlotChange(child) {
    if (!this._invalidateOnSlotChange) {
      this._invalidateOnSlotChange = () => {
        this._invalidate("slotchange");
      };
    }

    child.addEventListener("slotchange", this._invalidateOnSlotChange);
  }
  /**
   * @private
   */


  _detachSlotChange(child) {
    child.removeEventListener("slotchange", this._invalidateOnSlotChange);
  }
  /**
   * Asynchronously re-renders an already rendered web component
   * @private
   */


  _invalidate() {
    if (this._shouldInvalidateParent) {
      this.parentNode._invalidate();
    }

    if (!this._upToDate) {
      // console.log("already invalidated", this, ...arguments);
      return;
    }

    if (this.getDomRef() && !this._suppressInvalidation) {
      this._upToDate = false; // console.log("INVAL", this, ...arguments);

      _RenderScheduler.default.renderDeferred(this);
    }
  }
  /**
   * Do not call this method directly, only intended to be called by RenderScheduler.js
   * @protected
   */


  _render() {
    const hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots(); // suppress invalidation to prevent state changes scheduling another rendering

    this._suppressInvalidation = true;

    if (typeof this.onBeforeRendering === "function") {
      this.onBeforeRendering();
    } // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered


    if (this._onComponentStateFinalized) {
      this._onComponentStateFinalized();
    } // resume normal invalidation handling


    delete this._suppressInvalidation; // Update the shadow root with the render result
    // console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);

    this._upToDate = true;

    this._updateShadowRoot();

    if (this._shouldUpdateFragment()) {
      this.staticAreaItem._updateFragment(this);
    } // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM


    if (hasIndividualSlots) {
      this._assignIndividualSlotsToChildren();
    } // Call the onAfterRendering hook


    if (typeof this.onAfterRendering === "function") {
      this.onAfterRendering();
    }
  }
  /**
   * @private
   */


  _updateShadowRoot() {
    if (!this.constructor._needsShadowDOM()) {
      return;
    }

    let styleToPrepend;
    const renderResult = (0, _executeTemplate.default)(this.constructor.template, this); // IE11, Edge

    if (window.ShadyDOM) {
      (0, _createComponentStyleTag.default)(this.constructor);
    } // Chrome


    if (document.adoptedStyleSheets) {
      this.shadowRoot.adoptedStyleSheets = (0, _getConstructableStyle.default)(this.constructor);
    } // FF, Safari


    if (!document.adoptedStyleSheets && !window.ShadyDOM) {
      styleToPrepend = (0, _getEffectiveStyle.default)(this.constructor);
    }

    this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, {
      eventContext: this
    });
  }
  /**
   * @private
   */


  _assignIndividualSlotsToChildren() {
    const domChildren = Array.from(this.children);
    domChildren.forEach(child => {
      if (child._individualSlot) {
        child.setAttribute("slot", child._individualSlot);
      }
    });
  }
  /**
   * @private
   */


  _waitForDomRef() {
    return this._domRefReadyPromise;
  }
  /**
   * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
   * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
   * @public
   */


  getDomRef() {
    if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
      return;
    }

    return this.shadowRoot.children.length === 1 ? this.shadowRoot.children[0] : this.shadowRoot.children[1];
  }
  /**
   * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */


  getFocusDomRef() {
    const domRef = this.getDomRef();

    if (domRef) {
      const focusRef = domRef.querySelector("[data-sap-focus-ref]");
      return focusRef || domRef;
    }
  }
  /**
   * Use this method in order to get a reference to element in the shadow root of a web component
   * @public
   * @param {String} refName Defines the name of the stable DOM ref
   */


  getStableDomRef(refName) {
    return this.getDomRef().querySelector(`[data-ui5-stable=${refName}]`);
  }
  /**
   * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
   * @public
   */


  async focus() {
    await this._waitForDomRef();
    const focusDomRef = this.getFocusDomRef();

    if (focusDomRef && typeof focusDomRef.focus === "function") {
      focusDomRef.focus();
    }
  }
  /**
   *
   * @public
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @param bubbles - true, if the event bubbles
   * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
   */


  fireEvent(name, data, cancelable = false, bubbles = true) {
    const eventResult = this._fireEvent(name, data, cancelable, bubbles);

    const camelCaseEventName = (0, _StringHelper.kebabToCamelCase)(name);

    if (camelCaseEventName !== name) {
      return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
    }

    return eventResult;
  }

  _fireEvent(name, data, cancelable = false, bubbles = true) {
    let compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"

    const noConflictEvent = new CustomEvent(`ui5-${name}`, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    }); // This will be false if the compat event is prevented

    compatEventResult = this.dispatchEvent(noConflictEvent);

    if ((0, _NoConflict.skipOriginalEvent)(name)) {
      return compatEventResult;
    }

    const customEvent = new CustomEvent(name, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    }); // This will be false if the normal event is prevented

    const normalEventResult = this.dispatchEvent(customEvent); // Return false if any of the two events was prevented (its result was false).

    return normalEventResult && compatEventResult;
  }
  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */


  getSlottedNodes(slotName) {
    const reducer = (acc, curr) => {
      if (!(0, _isSlot.default)(curr)) {
        return acc.concat([curr]);
      }

      return acc.concat(curr.assignedNodes({
        flatten: true
      }).filter(item => item instanceof HTMLElement));
    };

    return this[slotName].reduce(reducer, []);
  }

  get isCompact() {
    return getComputedStyle(this).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR) === "compact";
  }
  /**
   * Determines whether the component should be rendered in RTL mode or not.
   * Returns: "rtl", "ltr" or undefined
   *
   * @public
   * @returns {String|undefined}
   */


  get effectiveDir() {
    (0, _RTLAwareRegistry.markAsRtlAware)(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware

    const doc = window.document;
    const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations

    const locallyAppliedDir = getComputedStyle(this).getPropertyValue(GLOBAL_DIR_CSS_VAR); // In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)

    if (dirValues.includes(locallyAppliedDir)) {
      return locallyAppliedDir;
    }

    if (dirValues.includes(this.dir)) {
      return this.dir;
    }

    if (dirValues.includes(doc.documentElement.dir)) {
      return doc.documentElement.dir;
    }

    if (dirValues.includes(doc.body.dir)) {
      return doc.body.dir;
    } // Finally, check the configuration for explicitly set RTL or language-implied RTL


    return (0, _RTL.getRTL)() ? "rtl" : undefined;
  }

  updateStaticAreaItemContentDensity() {
    if (this.staticAreaItem) {
      this.staticAreaItem._updateContentDensity(this.isCompact);
    }
  }
  /**
   * Used to duck-type UI5 elements without using instanceof
   * @returns {boolean}
   * @public
   */


  get isUI5Element() {
    return true;
  }
  /**
   * Do not override this method in derivatives of UI5Element, use metadata properties instead
   * @private
   */


  static get observedAttributes() {
    return this.getMetadata().getAttributesList();
  }
  /**
   * @private
   */


  static _getSlotName(child) {
    // Text nodes can only go to the default slot
    if (!(child instanceof HTMLElement)) {
      return "default";
    } // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)


    const slot = child.getAttribute("slot");

    if (slot) {
      const match = slot.match(/^(.+?)-\d+$/);
      return match ? match[1] : slot;
    } // Use default slot as a fallback


    return "default";
  }
  /**
   * @private
   */


  static _needsShadowDOM() {
    return !!this.template;
  }

  _shouldUpdateFragment() {
    return this.constructor._needsStaticArea() && this.staticAreaItem.isRendered();
  }
  /**
   * @private
   */


  static _needsStaticArea() {
    return typeof this.staticAreaTemplate === "function";
  }
  /**
   * @public
   */


  getStaticAreaItemDomRef() {
    return this.staticAreaItem.getDomRef();
  }
  /**
   * @private
   */


  static _getDefaultState() {
    if (this._defaultState) {
      return this._defaultState;
    }

    const MetadataClass = this.getMetadata();
    const defaultState = {};
    const slotsAreManaged = MetadataClass.slotsAreManaged(); // Initialize properties

    const props = MetadataClass.getProperties();

    for (const propName in props) {
      // eslint-disable-line
      const propType = props[propName].type;
      const propDefaultValue = props[propName].defaultValue;

      if (propType === Boolean) {
        defaultState[propName] = false;

        if (propDefaultValue !== undefined) {
          console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
        }
      } else if (props[propName].multiple) {
        defaultState[propName] = [];
      } else if (propType === Object) {
        defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
      } else if (propType === String) {
        defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
      } else {
        defaultState[propName] = propDefaultValue;
      }
    } // Initialize slots


    if (slotsAreManaged) {
      const slots = MetadataClass.getSlots();

      for (const [slotName, slotData] of Object.entries(slots)) {
        // eslint-disable-line
        const propertyName = slotData.propertyName || slotName;
        defaultState[propertyName] = [];
      }
    }

    this._defaultState = defaultState;
    return defaultState;
  }
  /**
   * @private
   */


  static _generateAccessors() {
    const proto = this.prototype;
    const slotsAreManaged = this.getMetadata().slotsAreManaged(); // Properties

    const properties = this.getMetadata().getProperties();

    for (const [prop, propData] of Object.entries(properties)) {
      // eslint-disable-line
      if (!(0, _isValidPropertyName.default)(prop)) {
        console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        /* eslint-disable-line */
      }

      if (propData.type === Boolean && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
      }

      if (propData.type === Array) {
        throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      }

      if (propData.type === Object && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
      }

      if (propData.multiple && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
      }

      Object.defineProperty(proto, prop, {
        get() {
          if (this._state[prop] !== undefined) {
            return this._state[prop];
          }

          const propDefaultValue = propData.defaultValue;

          if (propData.type === Boolean) {
            return false;
          } else if (propData.type === String) {
            // eslint-disable-line
            return propDefaultValue;
          } else if (propData.multiple) {
            // eslint-disable-line
            return [];
          } else {
            return propDefaultValue;
          }
        },

        set(value) {
          value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);
          const oldState = this._state[prop];

          if (oldState !== value) {
            this._state[prop] = value;

            this._invalidate(prop, value);

            this._propertyChange(prop, value);
          }
        }

      });
    } // Slots


    if (slotsAreManaged) {
      const slots = this.getMetadata().getSlots();

      for (const [slotName, slotData] of Object.entries(slots)) {
        // eslint-disable-line
        if (!(0, _isValidPropertyName.default)(slotName)) {
          console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`);
          /* eslint-disable-line */
        }

        const propertyName = slotData.propertyName || slotName;
        Object.defineProperty(proto, propertyName, {
          get() {
            if (this._state[propertyName] !== undefined) {
              return this._state[propertyName];
            }

            return [];
          },

          set() {
            throw new Error("Cannot set slots directly, use the DOM APIs");
          }

        });
      }
    }
  }
  /**
   * Returns the metadata object for this UI5 Web Component Class
   * @protected
   */


  static get metadata() {
    return metadata;
  }
  /**
   * Returns the CSS for this UI5 Web Component Class
   * @protected
   */


  static get styles() {
    return "";
  }
  /**
   * Returns the Static Area CSS for this UI5 Web Component Class
   * @protected
   */


  static get staticAreaStyles() {
    return "";
  }
  /**
   * Returns an array with the dependencies for this UI5 Web Component, which could be:
   *  - composed components (used in its shadow root or static area item)
   *  - slotted components that the component may need to communicate with
   *
   * @protected
   */


  static get dependencies() {
    return [];
  }
  /**
   * Returns a list of the unique dependencies for this UI5 Web Component
   *
   * @public
   */


  static getUniqueDependencies() {
    if (!uniqueDependenciesCache.has(this)) {
      const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
      uniqueDependenciesCache.set(this, filtered);
    }

    return uniqueDependenciesCache.get(this);
  }
  /**
   * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
   *
   * @returns {Promise<any[]>}
   */


  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
  }
  /**
   * Hook that will be called upon custom element definition
   *
   * @protected
   * @returns {Promise<void>}
   */


  static async onDefine() {
    return Promise.resolve();
  }
  /**
   * Registers a UI5 Web Component in the browser window object
   * @public
   * @returns {Promise<UI5Element>}
   */


  static async define() {
    await (0, _boot.default)();
    await Promise.all([this.whenDependenciesDefined(), this.onDefine()]);
    const tag = this.getMetadata().getTag();
    const altTag = this.getMetadata().getAltTag();
    const definedLocally = (0, _CustomElementsRegistry.isTagRegistered)(tag);
    const definedGlobally = customElements.get(tag);

    if (definedGlobally && !definedLocally) {
      (0, _CustomElementsRegistry.recordTagRegistrationFailure)(tag);
    } else if (!definedGlobally) {
      this._generateAccessors();

      (0, _CustomElementsRegistry.registerTag)(tag);
      window.customElements.define(tag, this);

      if (altTag && !customElements.get(altTag)) {
        class oldClassName extends this {}

        (0, _CustomElementsRegistry.registerTag)(altTag);
        window.customElements.define(altTag, oldClassName);
      }
    }

    return this;
  }
  /**
   * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
   * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
   * @public
   * @returns {UI5ElementMetadata}
   */


  static getMetadata() {
    if (this.hasOwnProperty("_metadata")) {
      // eslint-disable-line
      return this._metadata;
    }

    const metadataObjects = [this.metadata];
    let klass = this; // eslint-disable-line

    while (klass !== UI5Element) {
      klass = Object.getPrototypeOf(klass);
      metadataObjects.unshift(klass.metadata);
    }

    const mergedMetadata = (0, _merge.default)({}, ...metadataObjects);
    this._metadata = new _UI5ElementMetadata.default(mergedMetadata);
    return this._metadata;
  }

}

var _default = UI5Element;
exports.default = _default;
},{"./thirdparty/merge.js":"../node_modules/@ui5/webcomponents-base/dist/thirdparty/merge.js","./boot.js":"../node_modules/@ui5/webcomponents-base/dist/boot.js","./UI5ElementMetadata.js":"../node_modules/@ui5/webcomponents-base/dist/UI5ElementMetadata.js","./renderer/executeTemplate.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/executeTemplate.js","./StaticAreaItem.js":"../node_modules/@ui5/webcomponents-base/dist/StaticAreaItem.js","./RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/dist/RenderScheduler.js","./CustomElementsRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/CustomElementsRegistry.js","./compatibility/DOMObserver.js":"../node_modules/@ui5/webcomponents-base/dist/compatibility/DOMObserver.js","./config/NoConflict.js":"../node_modules/@ui5/webcomponents-base/dist/config/NoConflict.js","./config/RTL.js":"../node_modules/@ui5/webcomponents-base/dist/config/RTL.js","./theming/getConstructableStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getConstructableStyle.js","./theming/createComponentStyleTag.js":"../node_modules/@ui5/webcomponents-base/dist/theming/createComponentStyleTag.js","./theming/getEffectiveStyle.js":"../node_modules/@ui5/webcomponents-base/dist/theming/getEffectiveStyle.js","./types/Integer.js":"../node_modules/@ui5/webcomponents-base/dist/types/Integer.js","./types/Float.js":"../node_modules/@ui5/webcomponents-base/dist/types/Float.js","./util/StringHelper.js":"../node_modules/@ui5/webcomponents-base/dist/util/StringHelper.js","./util/isValidPropertyName.js":"../node_modules/@ui5/webcomponents-base/dist/util/isValidPropertyName.js","./util/isSlot.js":"../node_modules/@ui5/webcomponents-base/dist/util/isSlot.js","./locale/RTLAwareRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/locale/RTLAwareRegistry.js"}],"../node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"../node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"../node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"../node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"../node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!(0, _template.isTemplatePartActive)(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${_template.marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = _template.lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : _template.nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + _template.boundAttributeSuffix + attributeMatch[3] + _template.marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};

exports.isPrimitive = isPrimitive;

const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */


exports.isIterable = isIterable;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */


exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */


exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = (0, _template.createMarker)());

    part.__insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"../node_modules/lit-html/lib/directive.js","./dom.js":"../node_modules/lit-html/lib/dom.js","./part.js":"../node_modules/lit-html/lib/part.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template-result.js":"../node_modules/lit-html/lib/template-result.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new _parts.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"../node_modules/lit-html/lib/parts.js"}],"../node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./parts.js":"../node_modules/lit-html/lib/parts.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js"}],"../node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isIterable", {
  enumerable: true,
  get: function () {
    return _parts.isIterable;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"../node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"../node_modules/lit-html/lib/template-result.js","./lib/directive.js":"../node_modules/lit-html/lib/directive.js","./lib/dom.js":"../node_modules/lit-html/lib/dom.js","./lib/part.js":"../node_modules/lit-html/lib/part.js","./lib/parts.js":"../node_modules/lit-html/lib/parts.js","./lib/render.js":"../node_modules/lit-html/lib/render.js","./lib/template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./lib/template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/@ui5/webcomponents-base/dist/renderer/scopeHTML.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const cache = new Map();

const scopeHTML = (strings, tags, suffix) => {
  if (suffix && tags && tags.length) {
    strings = strings.map(string => {
      if (cache.has(string)) {
        return cache.get(string);
      }
      /*
      const allTags = [...string.matchAll(/<(ui5-.*?)[> ]/g)].map(x => x[1]);
      allTags.forEach(t => {
      	if (!tags.includes(t)) {
      		throw new Error(`${t} not found in ${string}`);
      		// console.log(t, " in ", string);
      	}
      });
      */


      let result = string;
      tags.forEach(tag => {
        result = result.replace(new RegExp(`(</?)(${tag})(/?[> \t\n])`, "g"), `$1$2-${suffix}$3`);
      });
      cache.set(string, result);
      return result;
    });
  }

  return strings;
};

var _default = scopeHTML;
exports.default = _default;
},{}],"../node_modules/lit-html/directives/repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Helper functions for manipulating parts
// TODO(kschaaf): Refactor into Part API?
const createAndInsertPart = (containerPart, beforePart) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = beforePart === undefined ? containerPart.endNode : beforePart.startNode;
  const startNode = container.insertBefore((0, _litHtml.createMarker)(), beforeNode);
  container.insertBefore((0, _litHtml.createMarker)(), beforeNode);
  const newPart = new _litHtml.NodePart(containerPart.options);
  newPart.insertAfterNode(startNode);
  return newPart;
};

const updatePart = (part, value) => {
  part.setValue(value);
  part.commit();
  return part;
};

const insertPartBefore = (containerPart, part, ref) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = ref ? ref.startNode : containerPart.endNode;
  const endNode = part.endNode.nextSibling;

  if (endNode !== beforeNode) {
    (0, _litHtml.reparentNodes)(container, part.startNode, endNode, beforeNode);
  }
};

const removePart = part => {
  (0, _litHtml.removeNodes)(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
}; // Helper for generating a map of array item to its index over a subset
// of an array (used to lazily generate `newKeyToIndexMap` and
// `oldKeyToIndexMap`)


const generateMap = (list, start, end) => {
  const map = new Map();

  for (let i = start; i <= end; i++) {
    map.set(list[i], i);
  }

  return map;
}; // Stores previous ordered list of parts and map of key to index


const partListCache = new WeakMap();
const keyListCache = new WeakMap();
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * and removals.
 *
 * IMPORTANT: If providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when two or more items have the same key
 * is undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */

const repeat = (0, _litHtml.directive)((items, keyFnOrTemplate, template) => {
  let keyFn;

  if (template === undefined) {
    template = keyFnOrTemplate;
  } else if (keyFnOrTemplate !== undefined) {
    keyFn = keyFnOrTemplate;
  }

  return containerPart => {
    if (!(containerPart instanceof _litHtml.NodePart)) {
      throw new Error('repeat can only be used in text bindings');
    } // Old part & key lists are retrieved from the last update
    // (associated with the part for this instance of the directive)


    const oldParts = partListCache.get(containerPart) || [];
    const oldKeys = keyListCache.get(containerPart) || []; // New part list will be built up as we go (either reused from
    // old parts or created for new keys in this update). This is
    // saved in the above cache at the end of the update.

    const newParts = []; // New value list is eagerly generated from items along with a
    // parallel array indicating its key.

    const newValues = [];
    const newKeys = [];
    let index = 0;

    for (const item of items) {
      newKeys[index] = keyFn ? keyFn(item, index) : index;
      newValues[index] = template(item, index);
      index++;
    } // Maps from key to index for current and previous update; these
    // are generated lazily only when needed as a performance
    // optimization, since they are only required for multiple
    // non-contiguous changes in the list, which are less common.


    let newKeyToIndexMap;
    let oldKeyToIndexMap; // Head and tail pointers to old parts and new values

    let oldHead = 0;
    let oldTail = oldParts.length - 1;
    let newHead = 0;
    let newTail = newValues.length - 1; // Overview of O(n) reconciliation algorithm (general approach
    // based on ideas found in ivi, vue, snabbdom, etc.):
    //
    // * We start with the list of old parts and new values (and
    //   arrays of their respective keys), head/tail pointers into
    //   each, and we build up the new list of parts by updating
    //   (and when needed, moving) old parts or creating new ones.
    //   The initial scenario might look like this (for brevity of
    //   the diagrams, the numbers in the array reflect keys
    //   associated with the old parts or new values, although keys
    //   and parts/values are actually stored in parallel arrays
    //   indexed using the same head/tail pointers):
    //
    //      oldHead v                 v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [ ,  ,  ,  ,  ,  ,  ]
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6] <- reflects the user's new
    //                                      item order
    //      newHead ^                 ^ newTail
    //
    // * Iterate old & new lists from both sides, updating,
    //   swapping, or removing parts at the head/tail locations
    //   until neither head nor tail can move.
    //
    // * Example below: keys at head pointers match, so update old
    //   part 0 in-place (no need to move it) and record part 0 in
    //   the `newParts` list. The last thing we do is advance the
    //   `oldHead` and `newHead` pointers (will be reflected in the
    //   next diagram).
    //
    //      oldHead v                 v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  ,  ] <- heads matched: update 0
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
    //                                      & newHead
    //      newHead ^                 ^ newTail
    //
    // * Example below: head pointers don't match, but tail
    //   pointers do, so update part 6 in place (no need to move
    //   it), and record part 6 in the `newParts` list. Last,
    //   advance the `oldTail` and `oldHead` pointers.
    //
    //         oldHead v              v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  , 6] <- tails matched: update 6
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldTail
    //                                      & newTail
    //         newHead ^              ^ newTail
    //
    // * If neither head nor tail match; next check if one of the
    //   old head/tail items was removed. We first need to generate
    //   the reverse map of new keys to index (`newKeyToIndexMap`),
    //   which is done once lazily as a performance optimization,
    //   since we only hit this case if multiple non-contiguous
    //   changes were made. Note that for contiguous removal
    //   anywhere in the list, the head and tails would advance
    //   from either end and pass each other before we get to this
    //   case and removals would be handled in the final while loop
    //   without needing to generate the map.
    //
    // * Example below: The key at `oldTail` was removed (no longer
    //   in the `newKeyToIndexMap`), so remove that part from the
    //   DOM and advance just the `oldTail` pointer.
    //
    //         oldHead v           v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  , 6] <- 5 not in new map: remove
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    5 and advance oldTail
    //         newHead ^           ^ newTail
    //
    // * Once head and tail cannot move, any mismatches are due to
    //   either new or moved items; if a new key is in the previous
    //   "old key to old index" map, move the old part to the new
    //   location, otherwise create and insert a new part. Note
    //   that when moving an old part we null its position in the
    //   oldParts array if it lies between the head and tail so we
    //   know to skip it when the pointers get there.
    //
    // * Example below: neither head nor tail match, and neither
    //   were removed; so find the `newHead` key in the
    //   `oldKeyToIndexMap`, and move that old part's DOM into the
    //   next head position (before `oldParts[oldHead]`). Last,
    //   null the part in the `oldPart` array since it was
    //   somewhere in the remaining oldParts still to be scanned
    //   (between the head and tail pointers) so that we know to
    //   skip that old part on future iterations.
    //
    //         oldHead v        v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2,  ,  ,  ,  , 6] <- stuck: update & move 2
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    into place and advance
    //                                      newHead
    //         newHead ^           ^ newTail
    //
    // * Note that for moves/insertions like the one above, a part
    //   inserted at the head pointer is inserted before the
    //   current `oldParts[oldHead]`, and a part inserted at the
    //   tail pointer is inserted before `newParts[newTail+1]`. The
    //   seeming asymmetry lies in the fact that new parts are
    //   moved into place outside in, so to the right of the head
    //   pointer are old parts, and to the right of the tail
    //   pointer are new parts.
    //
    // * We always restart back from the top of the algorithm,
    //   allowing matching and simple updates in place to
    //   continue...
    //
    // * Example below: the head pointers once again match, so
    //   simply update part 1 and record it in the `newParts`
    //   array.  Last, advance both head pointers.
    //
    //         oldHead v        v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1,  ,  ,  , 6] <- heads matched: update 1
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
    //                                      & newHead
    //            newHead ^        ^ newTail
    //
    // * As mentioned above, items that were moved as a result of
    //   being stuck (the final else clause in the code below) are
    //   marked with null, so we always advance old pointers over
    //   these so we're comparing the next actual old value on
    //   either end.
    //
    // * Example below: `oldHead` is null (already placed in
    //   newParts), so advance `oldHead`.
    //
    //            oldHead v     v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6] <- old head already used:
    //   newParts: [0, 2, 1,  ,  ,  , 6]    advance oldHead
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
    //               newHead ^     ^ newTail
    //
    // * Note it's not critical to mark old parts as null when they
    //   are moved from head to tail or tail to head, since they
    //   will be outside the pointer range and never visited again.
    //
    // * Example below: Here the old tail key matches the new head
    //   key, so the part at the `oldTail` position and move its
    //   DOM to the new head position (before `oldParts[oldHead]`).
    //   Last, advance `oldTail` and `newHead` pointers.
    //
    //               oldHead v  v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4,  ,  , 6] <- old tail matches new
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]   head: update & move 4,
    //                                     advance oldTail & newHead
    //               newHead ^     ^ newTail
    //
    // * Example below: Old and new head keys match, so update the
    //   old head part in place, and advance the `oldHead` and
    //   `newHead` pointers.
    //
    //               oldHead v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4, 3,   ,6] <- heads match: update 3
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance oldHead &
    //                                      newHead
    //                  newHead ^  ^ newTail
    //
    // * Once the new or old pointers move past each other then all
    //   we have left is additions (if old list exhausted) or
    //   removals (if new list exhausted). Those are handled in the
    //   final while loops at the end.
    //
    // * Example below: `oldHead` exceeded `oldTail`, so we're done
    //   with the main loop.  Create the remaining part and insert
    //   it at the new head position, and the update is complete.
    //
    //                   (oldHead > oldTail)
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4, 3, 7 ,6] <- create and insert 7
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
    //                     newHead ^ newTail
    //
    // * Note that the order of the if/else clauses is not
    //   important to the algorithm, as long as the null checks
    //   come first (to ensure we're always working on valid old
    //   parts) and that the final else clause comes last (since
    //   that's where the expensive moves occur). The order of
    //   remaining clauses is is just a simple guess at which cases
    //   will be most common.
    //
    // * TODO(kschaaf) Note, we could calculate the longest
    //   increasing subsequence (LIS) of old items in new position,
    //   and only move those not in the LIS set. However that costs
    //   O(nlogn) time and adds a bit more code, and only helps
    //   make rare types of mutations require fewer moves. The
    //   above handles removes, adds, reversal, swaps, and single
    //   moves of contiguous items in linear time, in the minimum
    //   number of moves. As the number of multiple moves where LIS
    //   might help approaches a random shuffle, the LIS
    //   optimization becomes less helpful, so it seems not worth
    //   the code at this point. Could reconsider if a compelling
    //   case arises.

    while (oldHead <= oldTail && newHead <= newTail) {
      if (oldParts[oldHead] === null) {
        // `null` means old part at head has already been used
        // below; skip
        oldHead++;
      } else if (oldParts[oldTail] === null) {
        // `null` means old part at tail has already been used
        // below; skip
        oldTail--;
      } else if (oldKeys[oldHead] === newKeys[newHead]) {
        // Old head matches new head; update in place
        newParts[newHead] = updatePart(oldParts[oldHead], newValues[newHead]);
        oldHead++;
        newHead++;
      } else if (oldKeys[oldTail] === newKeys[newTail]) {
        // Old tail matches new tail; update in place
        newParts[newTail] = updatePart(oldParts[oldTail], newValues[newTail]);
        oldTail--;
        newTail--;
      } else if (oldKeys[oldHead] === newKeys[newTail]) {
        // Old head matches new tail; update and move to new tail
        newParts[newTail] = updatePart(oldParts[oldHead], newValues[newTail]);
        insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
        oldHead++;
        newTail--;
      } else if (oldKeys[oldTail] === newKeys[newHead]) {
        // Old tail matches new head; update and move to new head
        newParts[newHead] = updatePart(oldParts[oldTail], newValues[newHead]);
        insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
        oldTail--;
        newHead++;
      } else {
        if (newKeyToIndexMap === undefined) {
          // Lazily generate key-to-index maps, used for removals &
          // moves below
          newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
          oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
        }

        if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
          // Old head is no longer in new list; remove
          removePart(oldParts[oldHead]);
          oldHead++;
        } else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
          // Old tail is no longer in new list; remove
          removePart(oldParts[oldTail]);
          oldTail--;
        } else {
          // Any mismatches at this point are due to additions or
          // moves; see if we have an old part we can reuse and move
          // into place
          const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
          const oldPart = oldIndex !== undefined ? oldParts[oldIndex] : null;

          if (oldPart === null) {
            // No old part for this value; create a new one and
            // insert it
            const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead] = newPart;
          } else {
            // Reuse old part
            newParts[newHead] = updatePart(oldPart, newValues[newHead]);
            insertPartBefore(containerPart, oldPart, oldParts[oldHead]); // This marks the old part as having been used, so that
            // it will be skipped in the first two checks above

            oldParts[oldIndex] = null;
          }

          newHead++;
        }
      }
    } // Add parts for any remaining new values


    while (newHead <= newTail) {
      // For all remaining additions, we insert before last new
      // tail, since old pointers are no longer valid
      const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
      updatePart(newPart, newValues[newHead]);
      newParts[newHead++] = newPart;
    } // Remove any remaining unused old parts


    while (oldHead <= oldTail) {
      const oldPart = oldParts[oldHead++];

      if (oldPart !== null) {
        removePart(oldPart);
      }
    } // Save order of new parts for next round


    partListCache.set(containerPart, newParts);
    keyListCache.set(containerPart, newKeys);
  };
});
exports.repeat = repeat;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classMap = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
  constructor(element) {
    this.classes = new Set();
    this.changed = false;
    this.element = element;
    const classList = (element.getAttribute('class') || '').split(/\s+/);

    for (const cls of classList) {
      this.classes.add(cls);
    }
  }

  add(cls) {
    this.classes.add(cls);
    this.changed = true;
  }

  remove(cls) {
    this.classes.delete(cls);
    this.changed = true;
  }

  commit() {
    if (this.changed) {
      let classString = '';
      this.classes.forEach(cls => classString += cls + ' ');
      this.element.setAttribute('class', classString);
    }
  }

}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */


const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */

const classMap = (0, _litHtml.directive)(classInfo => part => {
  if (!(part instanceof _litHtml.AttributePart) || part instanceof _litHtml.PropertyPart || part.committer.name !== 'class' || part.committer.parts.length > 1) {
    throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
  }

  const {
    committer
  } = part;
  const {
    element
  } = committer;
  let previousClasses = previousClassesCache.get(part);

  if (previousClasses === undefined) {
    // Write static classes once
    // Use setAttribute() because className isn't a string on SVG elements
    element.setAttribute('class', committer.strings.join(' '));
    previousClassesCache.set(part, previousClasses = new Set());
  }

  const classList = element.classList || new ClassList(element); // Remove old classes that no longer apply
  // We use forEach() instead of for-of so that re don't require down-level
  // iteration.

  previousClasses.forEach(name => {
    if (!(name in classInfo)) {
      classList.remove(name);
      previousClasses.delete(name);
    }
  }); // Add or remove classes based on their classMap value

  for (const name in classInfo) {
    const value = classInfo[name];

    if (value != previousClasses.has(name)) {
      // We explicitly want a loose truthy check of `value` because it seems
      // more convenient that '' and 0 are skipped.
      if (value) {
        classList.add(name);
        previousClasses.add(name);
      } else {
        classList.remove(name);
        previousClasses.delete(name);
      }
    }
  }

  if (typeof classList.commit === 'function') {
    classList.commit();
  }
});
exports.classMap = classMap;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/directives/style-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleMap = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */

const styleMap = (0, _litHtml.directive)(styleInfo => part => {
  if (!(part instanceof _litHtml.AttributePart) || part instanceof _litHtml.PropertyPart || part.committer.name !== 'style' || part.committer.parts.length > 1) {
    throw new Error('The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.');
  }

  const {
    committer
  } = part;
  const {
    style
  } = committer.element;
  let previousStyleProperties = previousStylePropertyCache.get(part);

  if (previousStyleProperties === undefined) {
    // Write static styles once
    style.cssText = committer.strings.join(' ');
    previousStylePropertyCache.set(part, previousStyleProperties = new Set());
  } // Remove old properties that no longer exist in styleInfo
  // We use forEach() instead of for-of so that re don't require down-level
  // iteration.


  previousStyleProperties.forEach(name => {
    if (!(name in styleInfo)) {
      previousStyleProperties.delete(name);

      if (name.indexOf('-') === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style[name] = null;
      } else {
        style.removeProperty(name);
      }
    }
  }); // Add or update properties

  for (const name in styleInfo) {
    previousStyleProperties.add(name);

    if (name.indexOf('-') === -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style[name] = styleInfo[name];
    } else {
      style.setProperty(name, styleInfo[name]);
    }
  }
});
exports.styleMap = styleMap;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/directives/unsafe-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeHTML = void 0;

var _parts = require("../lib/parts.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */

const unsafeHTML = (0, _litHtml.directive)(value => part => {
  if (!(part instanceof _litHtml.NodePart)) {
    throw new Error('unsafeHTML can only be used in text bindings');
  }

  const previousValue = previousValues.get(part);

  if (previousValue !== undefined && (0, _parts.isPrimitive)(value) && value === previousValue.value && part.value === previousValue.fragment) {
    return;
  }

  const template = document.createElement('template');
  template.innerHTML = value; // innerHTML casts to string internally

  const fragment = document.importNode(template.content, true);
  part.setValue(fragment);
  previousValues.set(part, {
    value,
    fragment
  });
});
exports.unsafeHTML = unsafeHTML;
},{"../lib/parts.js":"../node_modules/lit-html/lib/parts.js","../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "repeat", {
  enumerable: true,
  get: function () {
    return _repeat.repeat;
  }
});
Object.defineProperty(exports, "classMap", {
  enumerable: true,
  get: function () {
    return _classMap.classMap;
  }
});
Object.defineProperty(exports, "styleMap", {
  enumerable: true,
  get: function () {
    return _styleMap.styleMap;
  }
});
Object.defineProperty(exports, "unsafeHTML", {
  enumerable: true,
  get: function () {
    return _unsafeHtml.unsafeHTML;
  }
});
exports.default = exports.svg = exports.html = exports.setSuffix = exports.setTags = void 0;

var _litHtml = require("lit-html/lit-html.js");

var _scopeHTML = _interopRequireDefault(require("./scopeHTML.js"));

var _repeat = require("lit-html/directives/repeat.js");

var _classMap = require("lit-html/directives/class-map.js");

var _styleMap = require("lit-html/directives/style-map.js");

var _unsafeHtml = require("lit-html/directives/unsafe-html.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tags;
let suffix;

const setTags = t => {
  tags = t;
};

exports.setTags = setTags;

const setSuffix = s => {
  suffix = s;
};

exports.setSuffix = setSuffix;

const litRender = (templateResult, domNode, styles, {
  eventContext
} = {}) => {
  if (styles) {
    templateResult = (0, _litHtml.html)`<style>${styles}</style>${templateResult}`;
  }

  (0, _litHtml.render)(templateResult, domNode, {
    eventContext
  });
};

const scopedHtml = (strings, ...values) => (0, _litHtml.html)((0, _scopeHTML.default)(strings, tags, suffix), ...values);

exports.html = scopedHtml;

const scopedSvg = (strings, ...values) => (0, _litHtml.svg)((0, _scopeHTML.default)(strings, tags, suffix), ...values);

exports.svg = scopedSvg;
var _default = litRender;
exports.default = _default;
},{"lit-html/lit-html.js":"../node_modules/lit-html/lit-html.js","./scopeHTML.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/scopeHTML.js","lit-html/directives/repeat.js":"../node_modules/lit-html/directives/repeat.js","lit-html/directives/class-map.js":"../node_modules/lit-html/directives/class-map.js","lit-html/directives/style-map.js":"../node_modules/lit-html/directives/style-map.js","lit-html/directives/unsafe-html.js":"../node_modules/lit-html/directives/unsafe-html.js"}],"../node_modules/@ui5/webcomponents-base/dist/Keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPageDownShiftCtrl = exports.isPageUpShiftCtrl = exports.isPageDownShift = exports.isPageUpShift = exports.isPageDown = exports.isPageUp = exports.isF4Shift = exports.isF4 = exports.isShow = exports.isDelete = exports.isBackSpace = exports.isTabPrevious = exports.isTabNext = exports.isEscape = exports.isEndCtrl = exports.isHomeCtrl = exports.isEnd = exports.isHome = exports.isDown = exports.isUp = exports.isRight = exports.isLeft = exports.isSpace = exports.isEnter = void 0;
const KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  OPEN_BRACKET: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
};

const isEnter = event => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);

exports.isEnter = isEnter;

const isSpace = event => (event.key ? event.key === "Spacebar" || event.key === " " : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);

exports.isSpace = isSpace;

const isLeft = event => (event.key ? event.key === "ArrowLeft" || event.key === "Left" : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);

exports.isLeft = isLeft;

const isRight = event => (event.key ? event.key === "ArrowRight" || event.key === "Right" : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);

exports.isRight = isRight;

const isUp = event => (event.key ? event.key === "ArrowUp" || event.key === "Up" : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);

exports.isUp = isUp;

const isDown = event => (event.key ? event.key === "ArrowDown" || event.key === "Down" : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);

exports.isDown = isDown;

const isHome = event => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);

exports.isHome = isHome;

const isEnd = event => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);

exports.isEnd = isEnd;

const isHomeCtrl = event => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && checkModifierKeys(event, true, false, false);

exports.isHomeCtrl = isHomeCtrl;

const isEndCtrl = event => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && checkModifierKeys(event, true, false, false);

exports.isEndCtrl = isEndCtrl;

const isEscape = event => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);

exports.isEscape = isEscape;

const isTabNext = event => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && !hasModifierKeys(event);

exports.isTabNext = isTabNext;

const isTabPrevious = event => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event,
/* Ctrl */
false,
/* Alt */
false,
/* Shift */
true);

exports.isTabPrevious = isTabPrevious;

const isBackSpace = event => (event.key ? event.key === "Backspace" : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);

exports.isBackSpace = isBackSpace;

const isDelete = event => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);

exports.isDelete = isDelete;

const isPageUp = event => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event);

exports.isPageUp = isPageUp;

const isPageDown = event => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event);

exports.isPageDown = isPageDown;

const isPageUpShift = event => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, false, false, true);

exports.isPageUpShift = isPageUpShift;

const isPageDownShift = event => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, false, false, true);

exports.isPageDownShift = isPageDownShift;

const isPageUpShiftCtrl = event => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && checkModifierKeys(event, true, false, true);

exports.isPageUpShiftCtrl = isPageUpShiftCtrl;

const isPageDownShiftCtrl = event => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && checkModifierKeys(event, true, false, true);

exports.isPageDownShiftCtrl = isPageDownShiftCtrl;

const isShow = event => {
  if (event.key) {
    return isF4(event) || isShowByArrows(event);
  }

  return event.keyCode === KeyCodes.F4 && !hasModifierKeys(event) || event.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(event,
  /* Ctrl */
  false,
  /* Alt */
  true,
  /* Shift */
  false);
};

exports.isShow = isShow;

const isF4 = event => {
  return event.key === "F4" && !hasModifierKeys(event);
};

exports.isF4 = isF4;

const isF4Shift = event => (event.key ? event.key === "F4" : event.keyCode === KeyCodes.F4) && checkModifierKeys(event, false, false, true);

exports.isF4Shift = isF4Shift;

const isShowByArrows = event => {
  return (event.key === "ArrowDown" || event.key === "Down" || event.key === "ArrowUp" || event.key === "Up") && checkModifierKeys(event,
  /* Ctrl */
  false,
  /* Alt */
  true,
  /* Shift */
  false);
};

const hasModifierKeys = event => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = event => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.


const checkModifierKeys = (event, bCtrlKey, bAltKey, bShiftKey) => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;
},{}],"../node_modules/@ui5/webcomponents-base/dist/locale/Locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

class Locale {
  constructor(sLocaleId) {
    const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));

    if (aResult === null) {
      throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
    }

    this.sLocaleId = sLocaleId;
    this.sLanguage = aResult[1] || null;
    this.sScript = aResult[2] || null;
    this.sRegion = aResult[3] || null;
    this.sVariant = aResult[4] && aResult[4].slice(1) || null;
    this.sExtension = aResult[5] && aResult[5].slice(1) || null;
    this.sPrivateUse = aResult[6] || null;

    if (this.sLanguage) {
      this.sLanguage = this.sLanguage.toLowerCase();
    }

    if (this.sScript) {
      this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
        return s.toUpperCase();
      });
    }

    if (this.sRegion) {
      this.sRegion = this.sRegion.toUpperCase();
    }
  }

  getLanguage() {
    return this.sLanguage;
  }

  getScript() {
    return this.sScript;
  }

  getRegion() {
    return this.sRegion;
  }

  getVariant() {
    return this.sVariant;
  }

  getVariantSubtags() {
    return this.sVariant ? this.sVariant.split("-") : [];
  }

  getExtension() {
    return this.sExtension;
  }

  getExtensionSubtags() {
    return this.sExtension ? this.sExtension.slice(2).split("-") : [];
  }

  getPrivateUse() {
    return this.sPrivateUse;
  }

  getPrivateUseSubtags() {
    return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
  }

  hasPrivateUseSubtag(sSubtag) {
    return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
  }

  toString() {
    const r = [this.sLanguage];

    if (this.sScript) {
      r.push(this.sScript);
    }

    if (this.sRegion) {
      r.push(this.sRegion);
    }

    if (this.sVariant) {
      r.push(this.sVariant);
    }

    if (this.sExtension) {
      r.push(this.sExtension);
    }

    if (this.sPrivateUse) {
      r.push(this.sPrivateUse);
    }

    return r.join("-");
  }

}

var _default = Locale;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/locale/getLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _detectNavigatorLanguage = _interopRequireDefault(require("../util/detectNavigatorLanguage.js"));

var _Language = require("../config/Language.js");

var _Locale = _interopRequireDefault(require("./Locale.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const convertToLocaleOrNull = lang => {
  try {
    if (lang && typeof lang === "string") {
      return new _Locale.default(lang);
    }
  } catch (e) {// ignore
  }
};
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */


const getLocale = lang => {
  if (lang) {
    return convertToLocaleOrNull(lang);
  }

  if ((0, _Language.getLanguage)()) {
    return new _Locale.default((0, _Language.getLanguage)());
  }

  return convertToLocaleOrNull((0, _detectNavigatorLanguage.default)());
};

var _default = getLocale;
exports.default = _default;
},{"../util/detectNavigatorLanguage.js":"../node_modules/@ui5/webcomponents-base/dist/util/detectNavigatorLanguage.js","../config/Language.js":"../node_modules/@ui5/webcomponents-base/dist/config/Language.js","./Locale.js":"../node_modules/@ui5/webcomponents-base/dist/locale/Locale.js"}],"../node_modules/@ui5/webcomponents-base/dist/locale/normalizeLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AssetParameters = require("../generated/AssetParameters.js");

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
/* Map for old language names for a few ISO639 codes. */

const M_ISO639_NEW_TO_OLD = {
  "he": "iw",
  "yi": "ji",
  "id": "in",
  "sr": "sh"
};
/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */

const normalizeLocale = locale => {
  let m;

  if (!locale) {
    return _AssetParameters.DEFAULT_LOCALE;
  }

  if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) {
    /* eslint-disable-line */
    let language = m[1].toLowerCase();
    let region = m[3] ? m[3].toUpperCase() : undefined;
    const script = m[2] ? m[2].toLowerCase() : undefined;
    const variants = m[4] ? m[4].slice(1) : undefined;
    const isPrivate = m[6];
    language = M_ISO639_NEW_TO_OLD[language] || language; // recognize and convert special SAP supportability locales (overwrites m[]!)

    if (isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate)) ||
    /* eslint-disable-line */
    variants && (m = SAPSupportabilityLocales.exec(variants))) {
      /* eslint-disable-line */
      return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
    } // Chinese: when no region but a script is specified, use default region for each script


    if (language === "zh" && !region) {
      if (script === "hans") {
        region = "CN";
      } else if (script === "hant") {
        region = "TW";
      }
    }

    return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : "");
    /* eslint-disable-line */
  }
};

var _default = normalizeLocale;
exports.default = _default;
},{"../generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js"}],"../node_modules/@ui5/webcomponents-base/dist/locale/nextFallbackLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AssetParameters = require("../generated/AssetParameters.js");

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = locale => {
  if (!locale) {
    return _AssetParameters.DEFAULT_LOCALE;
  }

  if (locale === "zh_HK") {
    return "zh_TW";
  } // if there are multiple segments (separated by underscores), remove the last one


  const p = locale.lastIndexOf("_");

  if (p >= 0) {
    return locale.slice(0, p);
  } // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)


  return locale !== _AssetParameters.DEFAULT_LOCALE ? _AssetParameters.DEFAULT_LOCALE : "";
};

var _default = nextFallbackLocale;
exports.default = _default;
},{"../generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js"}],"../node_modules/@ui5/webcomponents-base/dist/asset-registries/i18n.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getI18nBundleData = exports.setI18nBundleData = exports.registerI18nBundle = exports.fetchI18nBundle = void 0;

var _FeaturesRegistry = require("../FeaturesRegistry.js");

var _getLocale = _interopRequireDefault(require("../locale/getLocale.js"));

var _languageChange = require("../locale/languageChange.js");

var _FetchHelper = require("../util/FetchHelper.js");

var _normalizeLocale = _interopRequireDefault(require("../locale/normalizeLocale.js"));

var _nextFallbackLocale = _interopRequireDefault(require("../locale/nextFallbackLocale.js"));

var _AssetParameters = require("../generated/AssetParameters.js");

var _EffectiveAssetPath = require("../util/EffectiveAssetPath.js");

var _Language = require("../config/Language.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bundleData = new Map();
const bundleURLs = new Map();
/**
 * Sets a map with texts and ID the are related to.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} data an object with string locales as keys and text translataions as values
 * @public
 */

const setI18nBundleData = (packageName, data) => {
  bundleData.set(packageName, data);
};

exports.setI18nBundleData = setI18nBundleData;

const getI18nBundleData = packageName => {
  return bundleData.get(packageName);
};
/**
 * Registers a map of locale/url information, to be used by the <code>fetchI18nBundle</code> method.
 * Note: In order to be able to register ".properties" files, you must import the following module:
 * import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
 *
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} bundle an object with string locales as keys and the URLs (in .json or .properties format - see the note above) where the corresponding locale can be fetched from, f.e {"en": "path/en.json", ...}
 *
 * @public
 */


exports.getI18nBundleData = getI18nBundleData;

const registerI18nBundle = (packageName, bundle) => {
  const oldBundle = bundleURLs.get(packageName) || {};
  bundleURLs.set(packageName, Object.assign({}, oldBundle, bundle));
};
/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */


exports.registerI18nBundle = registerI18nBundle;

const fetchI18nBundle = async packageName => {
  const bundlesForPackage = bundleURLs.get(packageName);

  if (!bundlesForPackage) {
    console.warn(`Message bundle assets are not configured. Falling back to English texts.`,
    /* eslint-disable-line */
    ` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`);
    /* eslint-disable-line */

    return;
  }

  const language = (0, _getLocale.default)().getLanguage();
  const region = (0, _getLocale.default)().getRegion();
  const useDefaultLanguage = (0, _Language.getUseDefaultLanguage)();
  let localeId = (0, _normalizeLocale.default)(language + (region ? `-${region}` : ``));

  while (localeId !== _AssetParameters.DEFAULT_LANGUAGE && !bundlesForPackage[localeId]) {
    localeId = (0, _nextFallbackLocale.default)(localeId);
  }

  if (useDefaultLanguage && localeId === _AssetParameters.DEFAULT_LANGUAGE) {
    setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)

    return;
  }

  const bundleURL = bundlesForPackage[localeId];

  if (typeof bundleURL === "object") {
    // inlined from build
    setI18nBundleData(packageName, bundleURL);
    return;
  }

  const content = await (0, _FetchHelper.fetchTextOnce)((0, _EffectiveAssetPath.getEffectiveAssetPath)(bundleURL));
  let parser;

  if (content.startsWith("{")) {
    parser = JSON.parse;
  } else {
    const PropertiesFormatSupport = (0, _FeaturesRegistry.getFeature)("PropertiesFormatSupport");

    if (!PropertiesFormatSupport) {
      throw new Error(`In order to support .properties files, please: import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";`);
    }

    parser = PropertiesFormatSupport.parser;
  }

  const data = parser(content);
  setI18nBundleData(packageName, data);
}; // When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles


exports.fetchI18nBundle = fetchI18nBundle;
(0, _languageChange.attachLanguageChange)(() => {
  const allPackages = [...bundleData.keys()];
  return Promise.all(allPackages.map(fetchI18nBundle));
});
},{"../FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js","../locale/getLocale.js":"../node_modules/@ui5/webcomponents-base/dist/locale/getLocale.js","../locale/languageChange.js":"../node_modules/@ui5/webcomponents-base/dist/locale/languageChange.js","../util/FetchHelper.js":"../node_modules/@ui5/webcomponents-base/dist/util/FetchHelper.js","../locale/normalizeLocale.js":"../node_modules/@ui5/webcomponents-base/dist/locale/normalizeLocale.js","../locale/nextFallbackLocale.js":"../node_modules/@ui5/webcomponents-base/dist/locale/nextFallbackLocale.js","../generated/AssetParameters.js":"../node_modules/@ui5/webcomponents-base/dist/generated/AssetParameters.js","../util/EffectiveAssetPath.js":"../node_modules/@ui5/webcomponents-base/dist/util/EffectiveAssetPath.js","../config/Language.js":"../node_modules/@ui5/webcomponents-base/dist/config/Language.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/formatMessage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

const formatMessage = (text, values) => {
  values = values || [];
  return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
    if ($1) {
      return '\'';
      /* eslint-disable-line */
    }

    if ($2) {
      return $2.replace(/''/g, '\'');
      /* eslint-disable-line */
    }

    if ($3) {
      return String(values[parseInt($3)]);
    }

    throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
  });
};

var _default = formatMessage;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/i18nBundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "registerI18nBundle", {
  enumerable: true,
  get: function () {
    return _i18n.registerI18nBundle;
  }
});
Object.defineProperty(exports, "fetchI18nBundle", {
  enumerable: true,
  get: function () {
    return _i18n.fetchI18nBundle;
  }
});
exports.getI18nBundle = void 0;

var _i18n = require("./asset-registries/i18n.js");

var _formatMessage = _interopRequireDefault(require("./util/formatMessage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const I18nBundleInstances = new Map();
/**
 * @class
 * @public
 */

class I18nBundle {
  constructor(packageName) {
    this.packageName = packageName;
  }
  /**
   * Returns a text in the currently loaded language
   *
   * @param {Object|String} textObj key/defaultText pair or just the key
   * @param params Values for the placeholders
   * @returns {*}
   */


  getText(textObj, ...params) {
    if (typeof textObj === "string") {
      textObj = {
        key: textObj,
        defaultText: textObj
      };
    }

    if (!textObj || !textObj.key) {
      return "";
    }

    const bundle = (0, _i18n.getI18nBundleData)(this.packageName);
    const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText || textObj.key;
    return (0, _formatMessage.default)(messageText, params);
  }

}

const getI18nBundle = packageName => {
  if (I18nBundleInstances.has(packageName)) {
    return I18nBundleInstances.get(packageName);
  }

  const i18nBundle = new I18nBundle(packageName);
  I18nBundleInstances.set(packageName, i18nBundle);
  return i18nBundle;
};

exports.getI18nBundle = getI18nBundle;
},{"./asset-registries/i18n.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/i18n.js","./util/formatMessage.js":"../node_modules/@ui5/webcomponents-base/dist/util/formatMessage.js"}],"../node_modules/@ui5/webcomponents-base/dist/util/findNodeOwner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const findNodeOwner = node => {
  if (!(node instanceof HTMLElement)) {
    throw new Error("Argument node should be of type HTMLElement");
  }

  const ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
  let currentShadowRootFlag = true;
  let currentCustomElementFlag = true;

  while (node) {
    if (node.toString() === "[object ShadowRoot]") {
      // Web Component
      // or the shadow root of web component with attached shadow root
      if (currentShadowRootFlag) {
        currentShadowRootFlag = false;
      }

      if (!currentCustomElementFlag && !currentShadowRootFlag) {
        return node;
      }
    } else if (node.tagName && node.tagName.indexOf("-") > -1) {
      if (currentCustomElementFlag) {
        currentCustomElementFlag = false;
      } else {
        return node;
      }
    } else if (ownerTypes.indexOf(node.constructor) > -1) {
      // Document or Iframe reached
      return node;
    }

    node = node.parentNode || node.host;
  }
};

var _default = findNodeOwner;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/util/AriaLabelHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAriaLabelledByTexts = exports.getEffectiveAriaLabelText = void 0;

var _findNodeOwner = _interopRequireDefault(require("./findNodeOwner.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getEffectiveAriaLabelText = el => {
  if (!el.ariaLabelledby) {
    if (el.ariaLabel) {
      return el.ariaLabel;
    }

    return undefined;
  }

  return getAriaLabelledByTexts(el);
};
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 * @param {HTMLElement} ownerDocument (Optional) Defines the HTMLElement(might document or custom element) where the you want to search for the texts.
 * @param {String} readyIds (Optional) Defines a string of elements ids. The text of these elements will be returned. If used you should provide either el or ownerDocument
 */


exports.getEffectiveAriaLabelText = getEffectiveAriaLabelText;

const getAriaLabelledByTexts = (el, ownerDocument, readyIds = "") => {
  const ids = readyIds && readyIds.split(" ") || el.ariaLabelledby.split(" ");
  const owner = ownerDocument || (0, _findNodeOwner.default)(el);
  let result = "";
  ids.forEach((elementId, index) => {
    const element = owner.querySelector(`[id='${elementId}']`);
    result += `${element ? element.textContent : ""}`;

    if (index < ids.length - 1) {
      result += " ";
    }
  });
  return result;
};

exports.getAriaLabelledByTexts = getAriaLabelledByTexts;
},{"./findNodeOwner.js":"../node_modules/@ui5/webcomponents-base/dist/util/findNodeOwner.js"}],"../node_modules/@ui5/webcomponents/dist/types/ButtonDesign.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @lends sap.ui.webcomponents.main.types.ButtonDesign.prototype
 * @public
 */
const ButtonTypes = {
  /**
   * default type (no special styling)
   * @public
   * @type {Default}
   */
  Default: "Default",

  /**
   * accept type (green button)
   * @public
   * @type {Positive}
   */
  Positive: "Positive",

  /**
   * reject style (red button)
   * @public
   * @type {Negative}
   */
  Negative: "Negative",

  /**
   * transparent type
   * @public
   * @type {Transparent}
   */
  Transparent: "Transparent",

  /**
   * emphasized type
   * @public
   * @type {Emphasized}
   */
  Emphasized: "Emphasized"
};
/**
 * @class
 * Different types of Button.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ButtonDesign
 * @public
 * @enum {string}
 */

class ButtonDesign extends _DataType.default {
  static isValid(value) {
    return !!ButtonTypes[value];
  }

}

ButtonDesign.generataTypeAcessors(ButtonTypes);
var _default = ButtonDesign;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litHtml = require("lit-html/lit-html.js");

/*
	lit-html directive that removes and attribute if it is undefined
*/
var _default = (0, _litHtml.directive)(value => part => {
  if (value === undefined && part instanceof _litHtml.AttributePart) {
    if (value !== part.value) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (part.committer && part.committer.element && part.committer.element.getAttribute(part.committer.name) === value) {
    part.setValue(_litHtml.noChange);
  } else {
    part.setValue(value);
  }
});

exports.default = _default;
},{"lit-html/lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/@ui5/webcomponents/dist/generated/templates/ButtonTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return (0, _LitRenderer.html)`<button type="button" class="ui5-button-root" ?disabled="${context.disabled}" data-sap-focus-ref  dir="${(0, _ifDefined.default)(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} tabindex=${(0, _ifDefined.default)(context.tabIndexValue)} aria-expanded="${(0, _ifDefined.default)(context.accInfo.ariaExpanded)}" aria-controls="${(0, _ifDefined.default)(context.accInfo.ariaControls)}" aria-haspopup="${(0, _ifDefined.default)(context.accInfo.ariaHaspopup)}" aria-label="${(0, _ifDefined.default)(context.ariaLabelText)}" title="${(0, _ifDefined.default)(context.accInfo.title)}" part="button">${context.icon ? block1(context) : undefined}<span id="${(0, _ifDefined.default)(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${context.hasButtonType ? block2(context) : undefined}</button> `;
};

const block1 = context => {
  return (0, _LitRenderer.html)`<ui5-icon style="${(0, _LitRenderer.styleMap)(context.styles.icon)}" class="ui5-button-icon" name="${(0, _ifDefined.default)(context.icon)}" show-tooltip=${(0, _ifDefined.default)(context.iconOnly)}></ui5-icon>`;
};

const block2 = context => {
  return (0, _LitRenderer.html)`<span class="ui5-hidden-text">${(0, _ifDefined.default)(context.buttonTypeText)}</span>`;
};

const main = (context, tags, suffix) => {
  (0, _LitRenderer.setTags)(tags);
  (0, _LitRenderer.setSuffix)(suffix);
  return block0(context);
};

var _default = main;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents-base/dist/getSharedResource.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getSingletonElementInstance = _interopRequireDefault(require("./util/getSingletonElementInstance.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSharedResourcesInstance = () => (0, _getSingletonElementInstance.default)("ui5-shared-resources", document.head);
/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "head" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */


const getSharedResource = (namespace, initialValue) => {
  const parts = namespace.split(".");
  let current = getSharedResourcesInstance();

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const lastPart = i === parts.length - 1;

    if (!Object.prototype.hasOwnProperty.call(current, part)) {
      current[part] = lastPart ? initialValue : {};
    }

    current = current[part];
  }

  return current;
};

var _default = getSharedResource;
exports.default = _default;
},{"./util/getSingletonElementInstance.js":"../node_modules/@ui5/webcomponents-base/dist/util/getSingletonElementInstance.js"}],"../node_modules/@ui5/webcomponents-base/dist/SVGIconRegistry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCollectionPromise = exports.getRegisteredNames = exports.registerIcon = exports.getIconDataSync = exports.getIconData = void 0;

var _getSharedResource = _interopRequireDefault(require("./getSharedResource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registry = (0, _getSharedResource.default)("SVGIcons.registry", new Map());
const iconCollectionPromises = (0, _getSharedResource.default)("SVGIcons.promises", new Map());
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const DEFAULT_COLLECTION = "SAP-icons";

const calcKey = (name, collection) => {
  // silently support ui5-compatible URIs
  if (name.startsWith("sap-icon://")) {
    name = name.replace("sap-icon://", "");
    [name, collection] = name.split("/").reverse();
  }

  collection = collection || DEFAULT_COLLECTION;
  return `${collection}:${name}`;
};

const registerIcon = (name, {
  pathData,
  ltr,
  accData,
  collection
} = {}) => {
  // eslint-disable-line
  const key = calcKey(name, collection);
  registry.set(key, {
    pathData,
    ltr,
    accData
  });
};

exports.registerIcon = registerIcon;

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
  const key = calcKey(name, collection);
  return registry.get(key);
};

exports.getIconDataSync = getIconDataSync;

const getIconData = async (name, collection = DEFAULT_COLLECTION) => {
  const key = calcKey(name, collection);

  if (!iconCollectionPromises.has(collection)) {
    iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
  }

  const iconData = await iconCollectionPromises.get(collection);

  if (iconData === ICON_NOT_FOUND) {
    return iconData;
  }

  return registry.get(key);
};

exports.getIconData = getIconData;

const getRegisteredNames = async () => {
  if (iconCollectionPromises.has(DEFAULT_COLLECTION)) {
    await iconCollectionPromises.get(DEFAULT_COLLECTION);
  }

  return Array.from(registry.keys()).map(k => k.split(":")[1]);
};

exports.getRegisteredNames = getRegisteredNames;

const registerCollectionPromise = (collection, promise) => {
  iconCollectionPromises.set(collection, promise);
};

exports.registerCollectionPromise = registerCollectionPromise;
},{"./getSharedResource.js":"../node_modules/@ui5/webcomponents-base/dist/getSharedResource.js"}],"../node_modules/@ui5/webcomponents/dist/generated/templates/IconTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return (0, _LitRenderer.html)`<svg class="ui5-icon-root" tabindex="${(0, _ifDefined.default)(context.tabIndex)}" dir="${(0, _ifDefined.default)(context._dir)}" viewBox="0 0 512 512" role="${(0, _ifDefined.default)(context.role)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${(0, _ifDefined.default)(context.accessibleNameText)}" xmlns="http://www.w3.org/2000/svg" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick}>${blockSVG1(context)}</svg>`;
};

const block1 = context => {
  return (0, _LitRenderer.svg)`<title id="${(0, _ifDefined.default)(context._id)}-tooltip">${(0, _ifDefined.default)(context.accessibleNameText)}</title>`;
};

const blockSVG1 = context => {
  return (0, _LitRenderer.svg)`${context.hasIconTooltip ? block1(context) : undefined}<g role="presentation"><path transform="translate(0, 512) scale(1, -1)" d="${(0, _ifDefined.default)(context.pathData)}"/></g>`;
};

const main = (context, tags, suffix) => {
  (0, _LitRenderer.setTags)(tags);
  (0, _LitRenderer.setSuffix)(suffix);
  return block0(context);
};

var _default = main;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#e9730c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#e9730c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#e9730c;--sapInformativeTextColor:#053b70;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#e9730c;--sapWarningBorderColor:#e9730c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#e9730c;--sapIndicationColor_3_Hover_Background:#da6c0b;--sapIndicationColor_3_Active_Background:#cc650b;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:lucida console,monospace;--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#e0e0e0;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#e0e0e0 0%,#e0e0e0 35%,#d3d3d3 50%,#e0e0e0 65%,#e0e0e0);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#fff;--sapShell_Navigation_SelectedColor:#0854a0;--sapShell_Navigation_Selected_TextColor:#0854a0;--sapShell_Navigation_TextColor:#32363a;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#e9730c;--sapButton_Attention_TextColor:#e9730c;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#e9730c;--sapButton_Attention_Hover_TextColor:#e9730c;--sapButton_Attention_Active_Background:#d1670b;--sapButton_Attention_Active_BorderColor:#d1670b;--sapButton_Attention_Selected_Background:#d1670b;--sapButton_Attention_Selected_BorderColor:#d1670b;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#e9730c;--sapButton_Attention_Selected_Hover_BorderColor:#e9730c;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Critical_Background:#e9730c;--sapButton_Critical_BorderColor:#e9730c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#c7620a;--sapButton_Critical_Hover_BorderColor:#c7620a;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#b85b0a;--sapButton_Critical_Active_BorderColor:#b85b0a;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_WarningColor:#e9730c;--sapField_WarningBackground:#fff;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e4e4e4;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e4e4e4;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#fafafa;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d8d8d8;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d8d8d8;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d8d8d8;--sapList_TableFixedBorderColor:#d8d8d8;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":root{--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_custom_list_item_height:3rem;--_ui5_custom_list_item_rb_min_width:2.75rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_input_inner_padding:0 0.625rem;--_ui5_input_inner_padding_with_icon:0 0.25rem 0 0.625rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapMFontLargeSize);--_ui5_list_item_img_size:3rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2.75rem;--_ui5_list_item_icon_size:1.125rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_size:1rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_rb_height:2.75rem;--_ui5_rb_label_side_padding:.875rem;--_ui5_rb_focus_dist:.5rem;--_ui5_rb_inner_size:2.75rem;--_ui5_rb_svg_size:1.375rem;--_ui5_rb_label_width:calc(100% - 2.75rem);--_ui5_rb_rtl_focus_right:0.5rem;--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_text_text_only:3rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_size:1.5rem;--_ui5_tc_item_add_text_margin_top:0.625rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5-responnsive_popover_header_height:2.75rem;--ui5_side_navigation_item_height:2.75rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--_ui5_segmented_btn_border_radius:0.375rem;--ui5-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-avatar-initials-border:none;--ui5-avatar-accent1:var(--sapAccentColor1);--ui5-avatar-accent2:var(--sapAccentColor2);--ui5-avatar-accent3:var(--sapAccentColor3);--ui5-avatar-accent4:var(--sapAccentColor4);--ui5-avatar-accent5:var(--sapAccentColor5);--ui5-avatar-accent6:var(--sapAccentColor6);--ui5-avatar-accent7:var(--sapAccentColor7);--ui5-avatar-accent8:var(--sapAccentColor8);--ui5-avatar-accent9:var(--sapAccentColor9);--ui5-avatar-accent10:var(--sapAccentColor10);--ui5-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-badge-font-size:0.75em;--ui5-badge-color-scheme-1-background:var(--sapLegendBackgroundColor1);--ui5-badge-color-scheme-1-border:var(--sapLegendColor1);--ui5-badge-color-scheme-2-background:var(--sapLegendBackgroundColor2);--ui5-badge-color-scheme-2-border:var(--sapLegendColor2);--ui5-badge-color-scheme-3-background:var(--sapLegendBackgroundColor3);--ui5-badge-color-scheme-3-border:var(--sapLegendColor3);--ui5-badge-color-scheme-4-background:var(--sapLegendBackgroundColor5);--ui5-badge-color-scheme-4-border:var(--sapLegendColor5);--ui5-badge-color-scheme-5-background:var(--sapLegendBackgroundColor20);--ui5-badge-color-scheme-5-border:var(--sapLegendColor20);--ui5-badge-color-scheme-6-background:var(--sapLegendBackgroundColor6);--ui5-badge-color-scheme-6-border:var(--sapLegendColor6);--ui5-badge-color-scheme-7-background:var(--sapLegendBackgroundColor7);--ui5-badge-color-scheme-7-border:var(--sapLegendColor7);--ui5-badge-color-scheme-8-background:var(--sapLegendBackgroundColor8);--ui5-badge-color-scheme-8-border:var(--sapLegendColor8);--ui5-badge-color-scheme-9-background:var(--sapLegendBackgroundColor10);--ui5-badge-color-scheme-9-border:var(--sapLegendColor10);--ui5-badge-color-scheme-10-background:var(--sapLegendBackgroundColor9);--ui5-badge-color-scheme-10-border:var(--sapAccentColor9);--_ui5_button_base_min_compact_width:2rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_transparent_border_color:transparent;--_ui5_button_transparent_hover_border_color:var(--sapButton_BorderColor);--_ui5_button_active_border_color:var(--sapButton_Active_BorderColor);--_ui5_button_positive_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_positive_border_hover_color:var(--sapButton_Accept_Hover_BorderColor);--_ui5_button_positive_border_active_color:var(--sapButton_Accept_Active_BorderColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_negative_active_border_color:var(--sapButton_Reject_Active_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_border_radius:0.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_card_border_color:var(--sapTile_SeparatorColor);--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--_ui5_card_border_color);--_ui5_card_header_focus_border:1px dotted var(--sapContent_FocusColor);--ui5_carousel_button_size:2.5rem;--ui5_carousel_height:0.25rem;--ui5_carousel_width:0.25rem;--ui5_carousel_margin:0 0.375rem;--ui5_carousel_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5_carousel_dot_border:none;--ui5_carousel_dot_background:var(--sapContent_NonInteractiveIconColor);--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_focus_outline:1px dotted var(--sapContent_FocusColor);--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_datepicker_icon_border:none;--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.125rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.125rem);--_ui5_daypicker_item_selected_hover_background_color:var(--sapActiveColor_Lighten3);--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_compact_height:1.625rem;--_ui5_input_state_border_width:0.125rem;--_ui5-input-information_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_BorderColor);--_ui5_input_disabled_background:var(--sapField_Background);--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5_input_height:2.25rem;--_ui5_input_disabled_opacity:0.4;--_ui5_input_wrapper_border_radius:0.125rem;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_link_opacity:0.4;--_ui5_link_text_decoration:none;--_ui5_link_hover_text_decoration:underline;--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--_ui5_listitembase_focus_width:1px;--_ui5_product_switch_item_border:none;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_messagestrip_icon_width:2.5rem;--_ui5_messagestrip_border_radius:0.1875rem;--_ui5_messagestrip_button_border_width:0;--_ui5_messagestrip_button_border_style:none;--_ui5_messagestrip_button_border_color:transparent;--_ui5_messagestrip_button_border_radius:0;--_ui5_messagestrip_padding:0.4375rem 2.5rem 0.4375rem 2.5rem;--_ui5_messagestrip_padding_no_icon:0.4375rem 2.5rem 0.4375rem 1rem;--_ui5_messagestrip_button_height:1.625rem;--_ui5_messagestrip_border_width:1px;--_ui5_messagestrip_close_button_border:none;--_ui5_messagestrip_close_button_size:1.625rem;--_ui5_messagestrip_icon_top:0.4375rem;--_ui5_messagestrip_focus_width:1px;--_ui5_messagestrip_focus_offset:-2px;--_ui5_panel_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popup_content_padding:.4375em;--_ui5_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5_progress_indicator_color:var(--sapTextColor);--_ui5_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5_progress_indicator_bar_border_max:none;--_ui5_progress_indicator_icon_visibility:none;--_ui5_radiobutton_min_width:2.75rem;--_ui5_radiobutton_min_width_compact:2rem;--_ui5_radiobutton_hover_fill:var(--sapField_Hover_Background);--_ui5_radiobutton_border_width:1px;--_ui5_radiobutton_selected_fill:var(--sapSelectedColor);--_ui5_radiobutton_selected_error_fill:var(--sapField_InvalidColor);--_ui5_radiobutton_selected_warning_fill:var(--sapField_TextColor);--_ui5_radiobutton_warning_error_border_dash:0;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_outline:1px;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_compact_no_label_height:1rem;--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_hover_background_color:var(--sapButton_Track_Background);--_ui5_switch_track_hover_checked_background_color:var(--sapButton_Track_Selected_Background);--_ui5_switch_track_border_radius:0.75rem;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height:4.6875rem;--_ui5_tc_header_height_compact:3.6875rem;--_ui5_tc_header_height_text_only:3rem;--_ui5_tc_header_height_text_only_compact:2rem;--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_neutral_selected_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_selected_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_selected_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_selected_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_overflowItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItemContent_border_bottom:0.188rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapHighlightColor);--_ui5_tc_overflowItem_current_color:CurrentColor;--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_warning_border_width:2px;--_ui5_TimelineItem_arrow_size:1.625rem;--_ui5_TimelineItem_bubble_outline_width:0.0625rem;--_ui5_TimelineItem_bubble_outline_top:-0.125rem;--_ui5_TimelineItem_bubble_outline_right:-0.125rem;--_ui5_TimelineItem_bubble_outline_bottom:-0.125rem;--_ui5_TimelineItem_bubble_outline_left:-0.625rem;--_ui5_TimelineItem_bubble_rtl_left_offset:-0.125rem;--_ui5_TimelineItem_bubble_rtl_right_offset:-0.625rem;--_ui5_time_picker_border:0.0625rem solid transparent;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:15rem;--_ui5_wheelslider_mobile_height:27rem;--_ui5_wheelslider_arrows_visibility:hidden;--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_item_width:3rem;--_ui5_wheelslider_item_height:2.875rem;--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_header_row_outline_width:1px;--ui5_table_row_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_focus_outline_width:0.0625rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5_value_state_message_border:none;--_ui5-multi_combobox_token_margin_top:1px}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_list_item_selection_btn_margin_top:calc(-1*var(--_ui5_checkbox_wrapper_padding));--_ui5_token_wrapper_left_padding:0;--_ui5_button_icon_font_size:1rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2)}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_padding:0;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_custom_list_item_height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_item_icon_size:1rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_size:.75rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_rb_height:2rem;--_ui5_rb_label_side_padding:.5rem;--_ui5_rb_focus_dist:.375rem;--_ui5_rb_inner_size:2rem;--_ui5_rb_svg_size:1rem;--_ui5_rb_label_width:calc(100% - 2rem + 1px);--_ui5_rb_rtl_focus_right:0.375rem;--_ui5_wheelslider_item_width:4rem;--_ui5_wheelslider_item_height:2rem;--_ui5_wheelslider_height:14rem;--_ui5_wheelslider_arrows_visibility:visible;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_track_no_label_height:var(--_ui5_switch_track_compact_no_label_height);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_icon_size:1rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_radiobutton_min_width:var(--_ui5_radiobutton_min_width_compact);--_ui5-responnsive_popover_header_height:2.5rem;--ui5_side_navigation_item_height:2rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/generated/themes/Icon.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js");

var _parametersBundleCss = _interopRequireDefault(require("@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"));

var _parametersBundleCss2 = _interopRequireDefault(require("./sap_fiori_3/parameters-bundle.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Themes.registerThemeProperties)("@ui5/webcomponents-theme-base", "sap_fiori_3", _parametersBundleCss.default);
(0, _Themes.registerThemeProperties)("@ui5/webcomponents", "sap_fiori_3", _parametersBundleCss2.default);
var _default = ":host(:not([hidden])){display:inline-block}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scale(-1);transform-origin:center}.ui5-icon-root{display:flex;transform:scaleY(-1);transform-origin:center;outline:none}";
exports.default = _default;
},{"@ui5/webcomponents-base/dist/asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js","./sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"}],"../node_modules/@ui5/webcomponents/dist/Icon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/dist/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js"));

var _SVGIconRegistry = require("@ui5/webcomponents-base/dist/SVGIconRegistry.js");

var _createStyleInHead = _interopRequireDefault(require("@ui5/webcomponents-base/dist/util/createStyleInHead.js"));

var _i18nBundle = require("@ui5/webcomponents-base/dist/i18nBundle.js");

var _Keys = require("@ui5/webcomponents-base/dist/Keys.js");

var _IconTemplateLit = _interopRequireDefault(require("./generated/templates/IconTemplate.lit.js"));

var _IconCss = _interopRequireDefault(require("./generated/themes/Icon.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
/**
 * @public
 */

const metadata = {
  tag: "ui5-icon",
  languageAware: true,
  properties:
  /** @lends sap.ui.webcomponents.main.Icon.prototype */
  {
    /**
     * Defines if the icon is interactive (focusable and pressable)
     * @type {boolean}
     * @defaultvalue false
     * @public
     * @since 1.0.0-rc.8
     */
    interactive: {
      type: Boolean
    },

    /**
     * Defines the unique identifier (icon name) of each <code>ui5-icon</code>.
     * <br><br>
     * To browse all available icons, see the
     * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     * <br><br>
     * Example:
     * <br>
     * <code>name='add'</code>, <code>name='delete'</code>, <code>name='employee'</code>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
    */
    name: {
      type: String
    },

    /**
     * Defines the text alternative of the <code>ui5-icon</code>.
     * If not provided a default text alternative will be set, if present.
     * <br><br>
     * <b>Note:</b> Every icon should have a text alternative in order to
     * calculate its accessible name.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    accessibleName: {
      type: String
    },

    /**
     * Defines whether the <code>ui5-icon</code> should have a tooltip.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    showTooltip: {
      type: Boolean
    },

    /**
     * @private
     */
    pathData: {
      type: String,
      noAttribute: true
    },

    /**
     * @private
     */
    accData: {
      type: Object,
      noAttribute: true
    },

    /**
     * @private
     */
    focused: {
      type: Boolean
    },

    /**
    * @private
    */
    invalid: {
      type: Boolean
    }
  },
  events: {
    /**
     * Fired on mouseup, space and enter if icon is interactive
     * @private
     * @since 1.0.0-rc.8
     */
    click: {}
  }
};
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>name</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */

class Icon extends _UI5Element.default {
  constructor() {
    super();
    this.i18nBundle = (0, _i18nBundle.getI18nBundle)("@ui5/webcomponents");
  }

  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _IconTemplateLit.default;
  }

  static get styles() {
    return _IconCss.default;
  }

  static async onDefine() {
    this.createGlobalStyle(); // hide all icons until the first icon has rendered (and added the Icon.css)

    await (0, _i18nBundle.fetchI18nBundle)("@ui5/webcomponents");
  }

  _onfocusin(event) {
    if (this.interactive) {
      this.focused = true;
    }
  }

  _onfocusout(event) {
    this.focused = false;
  }

  _onkeydown(event) {
    if (this.interactive && (0, _Keys.isEnter)(event)) {
      this.fireEvent("click");
    }
  }

  _onkeyup(event) {
    if (this.interactive && (0, _Keys.isSpace)(event)) {
      this.fireEvent("click");
    }
  }

  _onclick(event) {
    if (this.interactive) {
      event.preventDefault(); // Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown

      this.fireEvent("click");
    }
  }

  get _dir() {
    if (!this.effectiveDir) {
      return;
    }

    if (this.ltr) {
      return "ltr";
    }

    return this.effectiveDir;
  }

  get tabIndex() {
    return this.interactive ? "0" : "-1";
  }

  get role() {
    if (this.interactive) {
      return "button";
    }

    return this.accessibleNameText ? "img" : "presentation";
  }

  static createGlobalStyle() {
    if (!window.ShadyDOM) {
      return;
    }

    const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);

    if (!styleElement) {
      (0, _createStyleInHead.default)(`ui5-icon { display: none !important; }`, {
        "data-ui5-icon-global": ""
      });
    }
  }

  static removeGlobalStyle() {
    if (!window.ShadyDOM) {
      return;
    }

    const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);

    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  }

  async onBeforeRendering() {
    const name = this.name;

    if (!name) {
      /* eslint-disable-next-line */
      return console.warn("Icon name property is required", this);
    }

    let iconData = (0, _SVGIconRegistry.getIconDataSync)(name);

    if (!iconData) {
      iconData = await (0, _SVGIconRegistry.getIconData)(name);
    }

    if (iconData === ICON_NOT_FOUND) {
      this.invalid = true;
      /* eslint-disable-next-line */

      return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/icons/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/Assets.js".`);
    }

    if (!iconData) {
      this.invalid = true;
      /* eslint-disable-next-line */

      return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
    }

    this.pathData = iconData.pathData;
    this.accData = iconData.accData;
    this.ltr = iconData.ltr;
  }

  get hasIconTooltip() {
    return this.showTooltip && this.accessibleNameText;
  }

  get accessibleNameText() {
    if (this.accessibleName) {
      return this.accessibleName;
    }

    return this.i18nBundle.getText(this.accData) || undefined;
  }

  async onEnterDOM() {
    setTimeout(() => {
      this.constructor.removeGlobalStyle(); // remove the global style as Icon.css is already in place
    }, 0);
  }

}

Icon.define();
var _default = Icon;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/UI5Element.js":"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js","@ui5/webcomponents-base/dist/SVGIconRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/SVGIconRegistry.js","@ui5/webcomponents-base/dist/util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/dist/util/createStyleInHead.js","@ui5/webcomponents-base/dist/i18nBundle.js":"../node_modules/@ui5/webcomponents-base/dist/i18nBundle.js","@ui5/webcomponents-base/dist/Keys.js":"../node_modules/@ui5/webcomponents-base/dist/Keys.js","./generated/templates/IconTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/generated/templates/IconTemplate.lit.js","./generated/themes/Icon.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/Icon.css.js"}],"../node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TABCONTAINER_NEXT_ICON_ACC_NAME = exports.SWITCH_OFF = exports.SWITCH_ON = exports.SELECT_ROLE_DESCRIPTION = exports.SEGMENTEDBUTTON_ARIA_DESCRIPTION = exports.RATING_INDICATOR_TEXT = exports.RATING_INDICATOR_TOOLTIP_TEXT = exports.PANEL_ICON = exports.MULTIINPUT_SHOW_MORE_TOKENS = exports.MULTICOMBOBOX_DIALOG_OK_BUTTON = exports.MESSAGE_STRIP_CLOSE_BUTTON = exports.ARIA_LABEL_LIST_ITEM_CHECKBOX = exports.LIST_ITEM_SELECTED = exports.LIST_ITEM_POSITION = exports.LINK_EMPHASIZED = exports.LINK_SUBTLE = exports.INPUT_SUGGESTIONS_NO_HIT = exports.INPUT_SUGGESTIONS_MORE_HITS = exports.INPUT_SUGGESTIONS_ONE_HIT = exports.INPUT_SUGGESTIONS_TITLE = exports.INPUT_SUGGESTIONS = exports.ICON_ACCESSIBLE_NAME = exports.ICON_ZOOM_OUT = exports.ICON_ZOOM_IN = exports.ICON_UPLOAD = exports.ICON_UP = exports.ICON_UNDO = exports.ICON_SYNCHRONIZE = exports.ICON_SORT_DESCENDING = exports.ICON_SORT_ASCENDING = exports.ICON_SORT = exports.ICON_SHOW = exports.ICON_SETTINGS = exports.ICON_SEARCH = exports.ICON_SAVE = exports.ICON_RESPONSE = exports.ICON_RESIZE_VERTICAL = exports.ICON_RESIZE_HORIZONTAL = exports.ICON_RESIZE = exports.ICON_REFRESH = exports.ICON_REDO = exports.ICON_OVERFLOW = exports.ICON_NAV_BACK = exports.ICON_MULTI_SELECT = exports.ICON_MOVE = exports.ICON_MESSAGE_WARNING = exports.ICON_MESSAGE_SUCCESS = exports.ICON_MESSAGE_INFORMATION = exports.ICON_MESSAGE_ERROR = exports.ICON_LAPTOP = exports.ICON_IPHONE_2 = exports.ICON_IPHONE = exports.ICON_IPAD_2 = exports.ICON_IPAD = exports.ICON_HIDE = exports.ICON_GROUP_2 = exports.ICON_GENERATE_SHORTCUT = exports.ICON_FULL_SCREEN = exports.ICON_FORWARD = exports.ICON_FLAG = exports.ICON_FILTER = exports.ICON_EXPAND_GROUP = exports.ICON_EXPAND = exports.ICON_EXIT_FULL_SCREEN = exports.ICON_ERROR = exports.ICON_DRILL_UP = exports.ICON_DRILL_DOWN = exports.ICON_DOWNLOAD = exports.ICON_DOWN = exports.ICON_DISPLAY = exports.ICON_DELETE = exports.ICON_DECLINE = exports.ICON_CROP = exports.ICON_COLLAPSE_GROUP = exports.ICON_COLLAPSE = exports.ICON_BACK_TO_TOP = exports.ICON_ADD_PHOTO = exports.ICON_ADD_FILTER = exports.ICON_ADD_CONTACT = exports.ICON_ADD = exports.ICON_ACTIVATE = exports.ICON_ACTION_SETTINGS = exports.GROUP_HEADER_TEXT = exports.FILEUPLOADER_TITLE = exports.FILEUPLOAD_BROWSE = exports.DELETE = exports.DATEPICKER_OPEN_ICON_TITLE = exports.CAROUSEL_DOT_TEXT = exports.CAROUSEL_OF_TEXT = exports.DATEPICKER_DATE_ACC_TEXT = exports.BUTTON_ARIA_TYPE_EMPHASIZED = exports.BUTTON_ARIA_TYPE_REJECT = exports.BUTTON_ARIA_TYPE_ACCEPT = exports.BUSY_INDICATOR_TITLE = exports.BADGE_DESCRIPTION = exports.AVATAR_TOOLTIP = exports.ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = exports.ARIA_ROLEDESCRIPTION_CARD_HEADER = exports.ARIA_ROLEDESCRIPTION_CARD = exports.ARIA_LABEL_CARD_CONTENT = void 0;
exports.DAY_PICKER_NON_WORKING_DAY = exports.DAY_PICKER_WEEK_NUMBER_TEXT = exports.CALENDAR_HEADER_PREVIOUS_BUTTON = exports.CALENDAR_HEADER_NEXT_BUTTON = exports.VALUE_STATE_SUCCESS = exports.VALUE_STATE_INFORMATION = exports.VALUE_STATE_WARNING = exports.VALUE_STATE_ERROR = exports.TOKENIZER_POPOVER_REMOVE = exports.TOKENIZER_ARIA_LABEL = exports.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS = exports.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN = exports.TOKENIZER_ARIA_CONTAIN_TOKEN = exports.TOKEN_ARIA_DELETABLE = exports.DATETIME_PICKER_TIME_BUTTON = exports.DATETIME_PICKER_DATE_BUTTON = exports.TIMEPICKER_CANCEL_BUTTON = exports.TIMEPICKER_SUBMIT_BUTTON = exports.TIMEPICKER_PERIODS_LABEL = exports.TIMEPICKER_SECONDS_LABEL = exports.TIMEPICKER_MINUTES_LABEL = exports.TIMEPICKER_HOURS_LABEL = exports.TIMELINE_ARIA_LABEL = exports.TEXTAREA_CHARACTERS_EXCEEDED = exports.TEXTAREA_CHARACTERS_LEFT = exports.TABCONTAINER_OVERFLOW_MENU_TITLE = exports.TABCONTAINER_PREVIOUS_ICON_ACC_NAME = void 0;
const ARIA_LABEL_CARD_CONTENT = {
  key: "ARIA_LABEL_CARD_CONTENT",
  defaultText: "Card Content"
};
exports.ARIA_LABEL_CARD_CONTENT = ARIA_LABEL_CARD_CONTENT;
const ARIA_ROLEDESCRIPTION_CARD = {
  key: "ARIA_ROLEDESCRIPTION_CARD",
  defaultText: "Card"
};
exports.ARIA_ROLEDESCRIPTION_CARD = ARIA_ROLEDESCRIPTION_CARD;
const ARIA_ROLEDESCRIPTION_CARD_HEADER = {
  key: "ARIA_ROLEDESCRIPTION_CARD_HEADER",
  defaultText: "Card Header"
};
exports.ARIA_ROLEDESCRIPTION_CARD_HEADER = ARIA_ROLEDESCRIPTION_CARD_HEADER;
const ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = {
  key: "ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER",
  defaultText: "Interactive Card Header"
};
exports.ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER;
const AVATAR_TOOLTIP = {
  key: "AVATAR_TOOLTIP",
  defaultText: "Avatar"
};
exports.AVATAR_TOOLTIP = AVATAR_TOOLTIP;
const BADGE_DESCRIPTION = {
  key: "BADGE_DESCRIPTION",
  defaultText: "Badge"
};
exports.BADGE_DESCRIPTION = BADGE_DESCRIPTION;
const BUSY_INDICATOR_TITLE = {
  key: "BUSY_INDICATOR_TITLE",
  defaultText: "Please wait"
};
exports.BUSY_INDICATOR_TITLE = BUSY_INDICATOR_TITLE;
const BUTTON_ARIA_TYPE_ACCEPT = {
  key: "BUTTON_ARIA_TYPE_ACCEPT",
  defaultText: "Positive Action"
};
exports.BUTTON_ARIA_TYPE_ACCEPT = BUTTON_ARIA_TYPE_ACCEPT;
const BUTTON_ARIA_TYPE_REJECT = {
  key: "BUTTON_ARIA_TYPE_REJECT",
  defaultText: "Negative Action"
};
exports.BUTTON_ARIA_TYPE_REJECT = BUTTON_ARIA_TYPE_REJECT;
const BUTTON_ARIA_TYPE_EMPHASIZED = {
  key: "BUTTON_ARIA_TYPE_EMPHASIZED",
  defaultText: "Emphasized"
};
exports.BUTTON_ARIA_TYPE_EMPHASIZED = BUTTON_ARIA_TYPE_EMPHASIZED;
const DATEPICKER_DATE_ACC_TEXT = {
  key: "DATEPICKER_DATE_ACC_TEXT",
  defaultText: "Date"
};
exports.DATEPICKER_DATE_ACC_TEXT = DATEPICKER_DATE_ACC_TEXT;
const CAROUSEL_OF_TEXT = {
  key: "CAROUSEL_OF_TEXT",
  defaultText: "of"
};
exports.CAROUSEL_OF_TEXT = CAROUSEL_OF_TEXT;
const CAROUSEL_DOT_TEXT = {
  key: "CAROUSEL_DOT_TEXT",
  defaultText: "Item {0} of {1} displayed"
};
exports.CAROUSEL_DOT_TEXT = CAROUSEL_DOT_TEXT;
const DATEPICKER_OPEN_ICON_TITLE = {
  key: "DATEPICKER_OPEN_ICON_TITLE",
  defaultText: "Open Picker"
};
exports.DATEPICKER_OPEN_ICON_TITLE = DATEPICKER_OPEN_ICON_TITLE;
const DELETE = {
  key: "DELETE",
  defaultText: "Delete"
};
exports.DELETE = DELETE;
const FILEUPLOAD_BROWSE = {
  key: "FILEUPLOAD_BROWSE",
  defaultText: "Browse..."
};
exports.FILEUPLOAD_BROWSE = FILEUPLOAD_BROWSE;
const FILEUPLOADER_TITLE = {
  key: "FILEUPLOADER_TITLE",
  defaultText: "Upload File"
};
exports.FILEUPLOADER_TITLE = FILEUPLOADER_TITLE;
const GROUP_HEADER_TEXT = {
  key: "GROUP_HEADER_TEXT",
  defaultText: "Group Header"
};
exports.GROUP_HEADER_TEXT = GROUP_HEADER_TEXT;
const ICON_ACTION_SETTINGS = {
  key: "ICON_ACTION_SETTINGS",
  defaultText: "Settings"
};
exports.ICON_ACTION_SETTINGS = ICON_ACTION_SETTINGS;
const ICON_ACTIVATE = {
  key: "ICON_ACTIVATE",
  defaultText: "Activate"
};
exports.ICON_ACTIVATE = ICON_ACTIVATE;
const ICON_ADD = {
  key: "ICON_ADD",
  defaultText: "Add"
};
exports.ICON_ADD = ICON_ADD;
const ICON_ADD_CONTACT = {
  key: "ICON_ADD_CONTACT",
  defaultText: "Add Contact"
};
exports.ICON_ADD_CONTACT = ICON_ADD_CONTACT;
const ICON_ADD_FILTER = {
  key: "ICON_ADD_FILTER",
  defaultText: "Add Filter"
};
exports.ICON_ADD_FILTER = ICON_ADD_FILTER;
const ICON_ADD_PHOTO = {
  key: "ICON_ADD_PHOTO",
  defaultText: "Add Photo"
};
exports.ICON_ADD_PHOTO = ICON_ADD_PHOTO;
const ICON_BACK_TO_TOP = {
  key: "ICON_BACK_TO_TOP",
  defaultText: "Back to Top"
};
exports.ICON_BACK_TO_TOP = ICON_BACK_TO_TOP;
const ICON_COLLAPSE = {
  key: "ICON_COLLAPSE",
  defaultText: "Collapse"
};
exports.ICON_COLLAPSE = ICON_COLLAPSE;
const ICON_COLLAPSE_GROUP = {
  key: "ICON_COLLAPSE_GROUP",
  defaultText: "Collapse Group"
};
exports.ICON_COLLAPSE_GROUP = ICON_COLLAPSE_GROUP;
const ICON_CROP = {
  key: "ICON_CROP",
  defaultText: "Crop"
};
exports.ICON_CROP = ICON_CROP;
const ICON_DECLINE = {
  key: "ICON_DECLINE",
  defaultText: "Decline"
};
exports.ICON_DECLINE = ICON_DECLINE;
const ICON_DELETE = {
  key: "ICON_DELETE",
  defaultText: "Delete"
};
exports.ICON_DELETE = ICON_DELETE;
const ICON_DISPLAY = {
  key: "ICON_DISPLAY",
  defaultText: "Display"
};
exports.ICON_DISPLAY = ICON_DISPLAY;
const ICON_DOWN = {
  key: "ICON_DOWN",
  defaultText: "Down"
};
exports.ICON_DOWN = ICON_DOWN;
const ICON_DOWNLOAD = {
  key: "ICON_DOWNLOAD",
  defaultText: "Download"
};
exports.ICON_DOWNLOAD = ICON_DOWNLOAD;
const ICON_DRILL_DOWN = {
  key: "ICON_DRILL_DOWN",
  defaultText: "Drill Down"
};
exports.ICON_DRILL_DOWN = ICON_DRILL_DOWN;
const ICON_DRILL_UP = {
  key: "ICON_DRILL_UP",
  defaultText: "Drill Up"
};
exports.ICON_DRILL_UP = ICON_DRILL_UP;
const ICON_ERROR = {
  key: "ICON_ERROR",
  defaultText: "Error"
};
exports.ICON_ERROR = ICON_ERROR;
const ICON_EXIT_FULL_SCREEN = {
  key: "ICON_EXIT_FULL_SCREEN",
  defaultText: "Exit Full Screen"
};
exports.ICON_EXIT_FULL_SCREEN = ICON_EXIT_FULL_SCREEN;
const ICON_EXPAND = {
  key: "ICON_EXPAND",
  defaultText: "Expand"
};
exports.ICON_EXPAND = ICON_EXPAND;
const ICON_EXPAND_GROUP = {
  key: "ICON_EXPAND_GROUP",
  defaultText: "Expand Group"
};
exports.ICON_EXPAND_GROUP = ICON_EXPAND_GROUP;
const ICON_FILTER = {
  key: "ICON_FILTER",
  defaultText: "Filter"
};
exports.ICON_FILTER = ICON_FILTER;
const ICON_FLAG = {
  key: "ICON_FLAG",
  defaultText: "Flag"
};
exports.ICON_FLAG = ICON_FLAG;
const ICON_FORWARD = {
  key: "ICON_FORWARD",
  defaultText: "Forward"
};
exports.ICON_FORWARD = ICON_FORWARD;
const ICON_FULL_SCREEN = {
  key: "ICON_FULL_SCREEN",
  defaultText: "Enter Full Screen"
};
exports.ICON_FULL_SCREEN = ICON_FULL_SCREEN;
const ICON_GENERATE_SHORTCUT = {
  key: "ICON_GENERATE_SHORTCUT",
  defaultText: "Create Shortcut"
};
exports.ICON_GENERATE_SHORTCUT = ICON_GENERATE_SHORTCUT;
const ICON_GROUP_2 = {
  key: "ICON_GROUP_2",
  defaultText: "Group"
};
exports.ICON_GROUP_2 = ICON_GROUP_2;
const ICON_HIDE = {
  key: "ICON_HIDE",
  defaultText: "Hide"
};
exports.ICON_HIDE = ICON_HIDE;
const ICON_IPAD = {
  key: "ICON_IPAD",
  defaultText: "Tablet"
};
exports.ICON_IPAD = ICON_IPAD;
const ICON_IPAD_2 = {
  key: "ICON_IPAD_2",
  defaultText: "Tablet"
};
exports.ICON_IPAD_2 = ICON_IPAD_2;
const ICON_IPHONE = {
  key: "ICON_IPHONE",
  defaultText: "Phone"
};
exports.ICON_IPHONE = ICON_IPHONE;
const ICON_IPHONE_2 = {
  key: "ICON_IPHONE_2",
  defaultText: "Phone"
};
exports.ICON_IPHONE_2 = ICON_IPHONE_2;
const ICON_LAPTOP = {
  key: "ICON_LAPTOP",
  defaultText: "Laptop"
};
exports.ICON_LAPTOP = ICON_LAPTOP;
const ICON_MESSAGE_ERROR = {
  key: "ICON_MESSAGE_ERROR",
  defaultText: "Error"
};
exports.ICON_MESSAGE_ERROR = ICON_MESSAGE_ERROR;
const ICON_MESSAGE_INFORMATION = {
  key: "ICON_MESSAGE_INFORMATION",
  defaultText: "Information"
};
exports.ICON_MESSAGE_INFORMATION = ICON_MESSAGE_INFORMATION;
const ICON_MESSAGE_SUCCESS = {
  key: "ICON_MESSAGE_SUCCESS",
  defaultText: "Successful"
};
exports.ICON_MESSAGE_SUCCESS = ICON_MESSAGE_SUCCESS;
const ICON_MESSAGE_WARNING = {
  key: "ICON_MESSAGE_WARNING",
  defaultText: "Warning"
};
exports.ICON_MESSAGE_WARNING = ICON_MESSAGE_WARNING;
const ICON_MOVE = {
  key: "ICON_MOVE",
  defaultText: "Move"
};
exports.ICON_MOVE = ICON_MOVE;
const ICON_MULTI_SELECT = {
  key: "ICON_MULTI_SELECT",
  defaultText: "Multi Select"
};
exports.ICON_MULTI_SELECT = ICON_MULTI_SELECT;
const ICON_NAV_BACK = {
  key: "ICON_NAV_BACK",
  defaultText: "Navigate Back"
};
exports.ICON_NAV_BACK = ICON_NAV_BACK;
const ICON_OVERFLOW = {
  key: "ICON_OVERFLOW",
  defaultText: "More"
};
exports.ICON_OVERFLOW = ICON_OVERFLOW;
const ICON_REDO = {
  key: "ICON_REDO",
  defaultText: "Redo"
};
exports.ICON_REDO = ICON_REDO;
const ICON_REFRESH = {
  key: "ICON_REFRESH",
  defaultText: "Refresh"
};
exports.ICON_REFRESH = ICON_REFRESH;
const ICON_RESIZE = {
  key: "ICON_RESIZE",
  defaultText: "Resize"
};
exports.ICON_RESIZE = ICON_RESIZE;
const ICON_RESIZE_HORIZONTAL = {
  key: "ICON_RESIZE_HORIZONTAL",
  defaultText: "Resize Horizontally"
};
exports.ICON_RESIZE_HORIZONTAL = ICON_RESIZE_HORIZONTAL;
const ICON_RESIZE_VERTICAL = {
  key: "ICON_RESIZE_VERTICAL",
  defaultText: "Resize Vertically"
};
exports.ICON_RESIZE_VERTICAL = ICON_RESIZE_VERTICAL;
const ICON_RESPONSE = {
  key: "ICON_RESPONSE",
  defaultText: "Reply"
};
exports.ICON_RESPONSE = ICON_RESPONSE;
const ICON_SAVE = {
  key: "ICON_SAVE",
  defaultText: "Save"
};
exports.ICON_SAVE = ICON_SAVE;
const ICON_SEARCH = {
  key: "ICON_SEARCH",
  defaultText: "Search"
};
exports.ICON_SEARCH = ICON_SEARCH;
const ICON_SETTINGS = {
  key: "ICON_SETTINGS",
  defaultText: "Settings"
};
exports.ICON_SETTINGS = ICON_SETTINGS;
const ICON_SHOW = {
  key: "ICON_SHOW",
  defaultText: "Show"
};
exports.ICON_SHOW = ICON_SHOW;
const ICON_SORT = {
  key: "ICON_SORT",
  defaultText: "Sort"
};
exports.ICON_SORT = ICON_SORT;
const ICON_SORT_ASCENDING = {
  key: "ICON_SORT_ASCENDING",
  defaultText: "Sort Ascending"
};
exports.ICON_SORT_ASCENDING = ICON_SORT_ASCENDING;
const ICON_SORT_DESCENDING = {
  key: "ICON_SORT_DESCENDING",
  defaultText: "Sort Descending"
};
exports.ICON_SORT_DESCENDING = ICON_SORT_DESCENDING;
const ICON_SYNCHRONIZE = {
  key: "ICON_SYNCHRONIZE",
  defaultText: "Synchronize"
};
exports.ICON_SYNCHRONIZE = ICON_SYNCHRONIZE;
const ICON_UNDO = {
  key: "ICON_UNDO",
  defaultText: "Undo"
};
exports.ICON_UNDO = ICON_UNDO;
const ICON_UP = {
  key: "ICON_UP",
  defaultText: "Up"
};
exports.ICON_UP = ICON_UP;
const ICON_UPLOAD = {
  key: "ICON_UPLOAD",
  defaultText: "Upload"
};
exports.ICON_UPLOAD = ICON_UPLOAD;
const ICON_ZOOM_IN = {
  key: "ICON_ZOOM_IN",
  defaultText: "Zoom In"
};
exports.ICON_ZOOM_IN = ICON_ZOOM_IN;
const ICON_ZOOM_OUT = {
  key: "ICON_ZOOM_OUT",
  defaultText: "Zoom Out"
};
exports.ICON_ZOOM_OUT = ICON_ZOOM_OUT;
const ICON_ACCESSIBLE_NAME = {
  key: "ICON_ACCESSIBLE_NAME",
  defaultText: "Select Options"
};
exports.ICON_ACCESSIBLE_NAME = ICON_ACCESSIBLE_NAME;
const INPUT_SUGGESTIONS = {
  key: "INPUT_SUGGESTIONS",
  defaultText: "Suggestions Available"
};
exports.INPUT_SUGGESTIONS = INPUT_SUGGESTIONS;
const INPUT_SUGGESTIONS_TITLE = {
  key: "INPUT_SUGGESTIONS_TITLE",
  defaultText: "Select"
};
exports.INPUT_SUGGESTIONS_TITLE = INPUT_SUGGESTIONS_TITLE;
const INPUT_SUGGESTIONS_ONE_HIT = {
  key: "INPUT_SUGGESTIONS_ONE_HIT",
  defaultText: "1 result available"
};
exports.INPUT_SUGGESTIONS_ONE_HIT = INPUT_SUGGESTIONS_ONE_HIT;
const INPUT_SUGGESTIONS_MORE_HITS = {
  key: "INPUT_SUGGESTIONS_MORE_HITS",
  defaultText: "{0} results are available"
};
exports.INPUT_SUGGESTIONS_MORE_HITS = INPUT_SUGGESTIONS_MORE_HITS;
const INPUT_SUGGESTIONS_NO_HIT = {
  key: "INPUT_SUGGESTIONS_NO_HIT",
  defaultText: "No results"
};
exports.INPUT_SUGGESTIONS_NO_HIT = INPUT_SUGGESTIONS_NO_HIT;
const LINK_SUBTLE = {
  key: "LINK_SUBTLE",
  defaultText: "Subtle"
};
exports.LINK_SUBTLE = LINK_SUBTLE;
const LINK_EMPHASIZED = {
  key: "LINK_EMPHASIZED",
  defaultText: "Emphasized"
};
exports.LINK_EMPHASIZED = LINK_EMPHASIZED;
const LIST_ITEM_POSITION = {
  key: "LIST_ITEM_POSITION",
  defaultText: "List item {0} of {1}"
};
exports.LIST_ITEM_POSITION = LIST_ITEM_POSITION;
const LIST_ITEM_SELECTED = {
  key: "LIST_ITEM_SELECTED",
  defaultText: "Is Selected"
};
exports.LIST_ITEM_SELECTED = LIST_ITEM_SELECTED;
const ARIA_LABEL_LIST_ITEM_CHECKBOX = {
  key: "ARIA_LABEL_LIST_ITEM_CHECKBOX",
  defaultText: "Multiple Selection Mode"
};
exports.ARIA_LABEL_LIST_ITEM_CHECKBOX = ARIA_LABEL_LIST_ITEM_CHECKBOX;
const MESSAGE_STRIP_CLOSE_BUTTON = {
  key: "MESSAGE_STRIP_CLOSE_BUTTON",
  defaultText: "Message Strip Close"
};
exports.MESSAGE_STRIP_CLOSE_BUTTON = MESSAGE_STRIP_CLOSE_BUTTON;
const MULTICOMBOBOX_DIALOG_OK_BUTTON = {
  key: "MULTICOMBOBOX_DIALOG_OK_BUTTON",
  defaultText: "OK"
};
exports.MULTICOMBOBOX_DIALOG_OK_BUTTON = MULTICOMBOBOX_DIALOG_OK_BUTTON;
const MULTIINPUT_SHOW_MORE_TOKENS = {
  key: "MULTIINPUT_SHOW_MORE_TOKENS",
  defaultText: "{0} More"
};
exports.MULTIINPUT_SHOW_MORE_TOKENS = MULTIINPUT_SHOW_MORE_TOKENS;
const PANEL_ICON = {
  key: "PANEL_ICON",
  defaultText: "Expand/Collapse"
};
exports.PANEL_ICON = PANEL_ICON;
const RATING_INDICATOR_TOOLTIP_TEXT = {
  key: "RATING_INDICATOR_TOOLTIP_TEXT",
  defaultText: "Rating"
};
exports.RATING_INDICATOR_TOOLTIP_TEXT = RATING_INDICATOR_TOOLTIP_TEXT;
const RATING_INDICATOR_TEXT = {
  key: "RATING_INDICATOR_TEXT",
  defaultText: "Rating Indicator"
};
exports.RATING_INDICATOR_TEXT = RATING_INDICATOR_TEXT;
const SEGMENTEDBUTTON_ARIA_DESCRIPTION = {
  key: "SEGMENTEDBUTTON_ARIA_DESCRIPTION",
  defaultText: "Segmented Button"
};
exports.SEGMENTEDBUTTON_ARIA_DESCRIPTION = SEGMENTEDBUTTON_ARIA_DESCRIPTION;
const SELECT_ROLE_DESCRIPTION = {
  key: "SELECT_ROLE_DESCRIPTION",
  defaultText: "Select"
};
exports.SELECT_ROLE_DESCRIPTION = SELECT_ROLE_DESCRIPTION;
const SWITCH_ON = {
  key: "SWITCH_ON",
  defaultText: "On"
};
exports.SWITCH_ON = SWITCH_ON;
const SWITCH_OFF = {
  key: "SWITCH_OFF",
  defaultText: "Off"
};
exports.SWITCH_OFF = SWITCH_OFF;
const TABCONTAINER_NEXT_ICON_ACC_NAME = {
  key: "TABCONTAINER_NEXT_ICON_ACC_NAME",
  defaultText: "Next"
};
exports.TABCONTAINER_NEXT_ICON_ACC_NAME = TABCONTAINER_NEXT_ICON_ACC_NAME;
const TABCONTAINER_PREVIOUS_ICON_ACC_NAME = {
  key: "TABCONTAINER_PREVIOUS_ICON_ACC_NAME",
  defaultText: "Previous"
};
exports.TABCONTAINER_PREVIOUS_ICON_ACC_NAME = TABCONTAINER_PREVIOUS_ICON_ACC_NAME;
const TABCONTAINER_OVERFLOW_MENU_TITLE = {
  key: "TABCONTAINER_OVERFLOW_MENU_TITLE",
  defaultText: "Overflow Menu"
};
exports.TABCONTAINER_OVERFLOW_MENU_TITLE = TABCONTAINER_OVERFLOW_MENU_TITLE;
const TEXTAREA_CHARACTERS_LEFT = {
  key: "TEXTAREA_CHARACTERS_LEFT",
  defaultText: "{0} characters remaining"
};
exports.TEXTAREA_CHARACTERS_LEFT = TEXTAREA_CHARACTERS_LEFT;
const TEXTAREA_CHARACTERS_EXCEEDED = {
  key: "TEXTAREA_CHARACTERS_EXCEEDED",
  defaultText: "{0} characters over limit"
};
exports.TEXTAREA_CHARACTERS_EXCEEDED = TEXTAREA_CHARACTERS_EXCEEDED;
const TIMELINE_ARIA_LABEL = {
  key: "TIMELINE_ARIA_LABEL",
  defaultText: "Timeline"
};
exports.TIMELINE_ARIA_LABEL = TIMELINE_ARIA_LABEL;
const TIMEPICKER_HOURS_LABEL = {
  key: "TIMEPICKER_HOURS_LABEL",
  defaultText: "Hours"
};
exports.TIMEPICKER_HOURS_LABEL = TIMEPICKER_HOURS_LABEL;
const TIMEPICKER_MINUTES_LABEL = {
  key: "TIMEPICKER_MINUTES_LABEL",
  defaultText: "Minutes"
};
exports.TIMEPICKER_MINUTES_LABEL = TIMEPICKER_MINUTES_LABEL;
const TIMEPICKER_SECONDS_LABEL = {
  key: "TIMEPICKER_SECONDS_LABEL",
  defaultText: "Seconds"
};
exports.TIMEPICKER_SECONDS_LABEL = TIMEPICKER_SECONDS_LABEL;
const TIMEPICKER_PERIODS_LABEL = {
  key: "TIMEPICKER_PERIODS_LABEL",
  defaultText: "AM/PM"
};
exports.TIMEPICKER_PERIODS_LABEL = TIMEPICKER_PERIODS_LABEL;
const TIMEPICKER_SUBMIT_BUTTON = {
  key: "TIMEPICKER_SUBMIT_BUTTON",
  defaultText: "OK"
};
exports.TIMEPICKER_SUBMIT_BUTTON = TIMEPICKER_SUBMIT_BUTTON;
const TIMEPICKER_CANCEL_BUTTON = {
  key: "TIMEPICKER_CANCEL_BUTTON",
  defaultText: "Cancel"
};
exports.TIMEPICKER_CANCEL_BUTTON = TIMEPICKER_CANCEL_BUTTON;
const DATETIME_PICKER_DATE_BUTTON = {
  key: "DATETIME_PICKER_DATE_BUTTON",
  defaultText: "Date"
};
exports.DATETIME_PICKER_DATE_BUTTON = DATETIME_PICKER_DATE_BUTTON;
const DATETIME_PICKER_TIME_BUTTON = {
  key: "DATETIME_PICKER_TIME_BUTTON",
  defaultText: "Time"
};
exports.DATETIME_PICKER_TIME_BUTTON = DATETIME_PICKER_TIME_BUTTON;
const TOKEN_ARIA_DELETABLE = {
  key: "TOKEN_ARIA_DELETABLE",
  defaultText: "Deletable"
};
exports.TOKEN_ARIA_DELETABLE = TOKEN_ARIA_DELETABLE;
const TOKENIZER_ARIA_CONTAIN_TOKEN = {
  key: "TOKENIZER_ARIA_CONTAIN_TOKEN",
  defaultText: "May contain tokens"
};
exports.TOKENIZER_ARIA_CONTAIN_TOKEN = TOKENIZER_ARIA_CONTAIN_TOKEN;
const TOKENIZER_ARIA_CONTAIN_ONE_TOKEN = {
  key: "TOKENIZER_ARIA_CONTAIN_ONE_TOKEN",
  defaultText: "Contains 1 token"
};
exports.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN = TOKENIZER_ARIA_CONTAIN_ONE_TOKEN;
const TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS = {
  key: "TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS",
  defaultText: "Contains {0} tokens"
};
exports.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS = TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS;
const TOKENIZER_ARIA_LABEL = {
  key: "TOKENIZER_ARIA_LABEL",
  defaultText: "Tokenizer"
};
exports.TOKENIZER_ARIA_LABEL = TOKENIZER_ARIA_LABEL;
const TOKENIZER_POPOVER_REMOVE = {
  key: "TOKENIZER_POPOVER_REMOVE",
  defaultText: "Remove"
};
exports.TOKENIZER_POPOVER_REMOVE = TOKENIZER_POPOVER_REMOVE;
const VALUE_STATE_ERROR = {
  key: "VALUE_STATE_ERROR",
  defaultText: "Invalid entry"
};
exports.VALUE_STATE_ERROR = VALUE_STATE_ERROR;
const VALUE_STATE_WARNING = {
  key: "VALUE_STATE_WARNING",
  defaultText: "Warning issued"
};
exports.VALUE_STATE_WARNING = VALUE_STATE_WARNING;
const VALUE_STATE_INFORMATION = {
  key: "VALUE_STATE_INFORMATION",
  defaultText: "Informative entry"
};
exports.VALUE_STATE_INFORMATION = VALUE_STATE_INFORMATION;
const VALUE_STATE_SUCCESS = {
  key: "VALUE_STATE_SUCCESS",
  defaultText: "Entry successfully validated"
};
exports.VALUE_STATE_SUCCESS = VALUE_STATE_SUCCESS;
const CALENDAR_HEADER_NEXT_BUTTON = {
  key: "CALENDAR_HEADER_NEXT_BUTTON",
  defaultText: "Next"
};
exports.CALENDAR_HEADER_NEXT_BUTTON = CALENDAR_HEADER_NEXT_BUTTON;
const CALENDAR_HEADER_PREVIOUS_BUTTON = {
  key: "CALENDAR_HEADER_PREVIOUS_BUTTON",
  defaultText: "Previous"
};
exports.CALENDAR_HEADER_PREVIOUS_BUTTON = CALENDAR_HEADER_PREVIOUS_BUTTON;
const DAY_PICKER_WEEK_NUMBER_TEXT = {
  key: "DAY_PICKER_WEEK_NUMBER_TEXT",
  defaultText: "Week number"
};
exports.DAY_PICKER_WEEK_NUMBER_TEXT = DAY_PICKER_WEEK_NUMBER_TEXT;
const DAY_PICKER_NON_WORKING_DAY = {
  key: "DAY_PICKER_NON_WORKING_DAY",
  defaultText: "Non-Working Day"
};
exports.DAY_PICKER_NON_WORKING_DAY = DAY_PICKER_NON_WORKING_DAY;
},{}],"../node_modules/@ui5/webcomponents/dist/generated/themes/Button.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js");

var _parametersBundleCss = _interopRequireDefault(require("@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"));

var _parametersBundleCss2 = _interopRequireDefault(require("./sap_fiori_3/parameters-bundle.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Themes.registerThemeProperties)("@ui5/webcomponents-theme-base", "sap_fiori_3", _parametersBundleCss.default);
(0, _Themes.registerThemeProperties)("@ui5/webcomponents", "sap_fiori_3", _parametersBundleCss2.default);
var _default = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit}:host(:not([active]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([active]:not([disabled])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--_ui5_button_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([active]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--_ui5_button_positive_border_color);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--_ui5_button_positive_border_hover_color)}:host([design=Positive][active]){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--_ui5_button_positive_border_active_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Positive][focused]){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([design=Negative][active]){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--_ui5_button_negative_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor)}:host([design=Empasized][active]){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]){outline-color:var(--sapContent_ContrastFocusColor);border-color:var(--_ui5_button_emphasized_focused_border_color)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--_ui5_button_transparent_border_color)}:host([design=Transparent]):hover{background-color:var(--sapButton_Lite_Hover_Background)}:host([design=Transparent][active]){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--_ui5_button_transparent_hover_border_color)}[ui5-button][focused]{outline:none}[ui5-button][focused] .ui5-button-root{position:relative}[ui5-button][focused] .ui5-button-root:after{content:\"\";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}[ui5-button][active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button] [ui5-icon].ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}";
exports.default = _default;
},{"@ui5/webcomponents-base/dist/asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js","./sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"}],"../node_modules/@ui5/webcomponents/dist/Button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/dist/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js"));

var _Keys = require("@ui5/webcomponents-base/dist/Keys.js");

var _FeaturesRegistry = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js");

var _i18nBundle = require("@ui5/webcomponents-base/dist/i18nBundle.js");

var _AriaLabelHelper = require("@ui5/webcomponents-base/dist/util/AriaLabelHelper.js");

var _ButtonDesign = _interopRequireDefault(require("./types/ButtonDesign.js"));

var _ButtonTemplateLit = _interopRequireDefault(require("./generated/templates/ButtonTemplate.lit.js"));

var _Icon = _interopRequireDefault(require("./Icon.js"));

var _i18nDefaults = require("./generated/i18n/i18n-defaults.js");

var _ButtonCss = _interopRequireDefault(require("./generated/themes/Button.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
let isGlobalHandlerAttached = false;
let activeButton = null;
/**
 * @public
 */

const metadata = {
  tag: "ui5-button",
  languageAware: true,
  properties:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Defines the <code>ui5-button</code> design.
     * <br><br>
     * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
     * "Negative", and "Transparent".
     *
     * @type {ButtonDesign}
     * @defaultvalue "Default"
     * @public
     */
    design: {
      type: _ButtonDesign.default,
      defaultValue: _ButtonDesign.default.Default
    },

    /**
     * Defines whether the <code>ui5-button</code> is disabled
     * (default is set to <code>false</code>).
     * A disabled <code>ui5-button</code> can't be pressed or
     * focused, and it is not in the tab chain.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
     * The SAP-icons font provides numerous options.
     * <br><br>
     * Example:
     * <br>
     * <pre>ui5-button icon="palette"</pre>
     *
     * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    icon: {
      type: String
    },

    /**
     * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    iconEnd: {
      type: Boolean
    },

    /**
     * Defines the size of the icon inside the <code>ui5-button</code>.
     *
     * @type {string}
     * @defaultvalue undefined
     * @public
     * @since 1.0.0-rc.8
     */
    iconSize: {
      type: String,
      defaultValue: undefined
    },

    /**
     * When set to <code>true</code>, the <code>ui5-button</code> will
     * automatically submit the nearest form element upon <code>press</code>.
     * <br><br>
     * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    submits: {
      type: Boolean
    },

    /**
     * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
     * @private
     */
    active: {
      type: Boolean
    },

    /**
     * Defines if a content has been added to the default slot
     * @private
     */
    iconOnly: {
      type: Boolean
    },

    /**
     * Indicates if the elements is on focus
     * @private
     */
    focused: {
      type: Boolean
    },

    /**
     * Indicates if the elements has a slotted icon
     * @private
     */
    hasIcon: {
      type: Boolean
    },

    /**
     * Defines the aria-label attribute for the button
     * @type {String}
     * @defaultvalue: ""
     * @private
     * @since 1.0.0-rc.7
     */
    ariaLabel: {
      type: String,
      defaultValue: undefined
    },

    /**
     * Receives id(or many ids) of the elements that label the button
     * @type {String}
     * @defaultvalue ""
     * @private
     * @since 1.0.0-rc.7
     */
    ariaLabelledby: {
      type: String,
      defaultValue: ""
    },

    /**
     * @type {String}
     * @defaultvalue ""
     * @private
     * @since 1.0.0-rc.8
     */
    ariaExpanded: {
      type: String
    },

    /**
     * Indicates if the element if focusable
     * @private
     */
    nonFocusable: {
      type: Boolean
    },
    _iconSettings: {
      type: Object
    },
    _buttonAccInfo: {
      type: Object
    },

    /**
     * Defines the tabIndex of the component.
     * @private
     */
    _tabIndex: {
      type: String,
      defaultValue: "0",
      noAttribute: true
    }
  },
  managedSlots: true,
  slots:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Defines the text of the <code>ui5-button</code>.
     * <br><br>
     * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    "default": {
      type: Node
    }
  },
  events:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Fired when the <code>ui5-button</code> is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event
     * @public
     */
    click: {}
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-button
 * @public
 */

class Button extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get styles() {
    return _ButtonCss.default;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _ButtonTemplateLit.default;
  }

  static get dependencies() {
    return [_Icon.default];
  }

  constructor() {
    super();

    this._deactivate = () => {
      if (activeButton) {
        activeButton.active = false;
      }
    };

    if (!isGlobalHandlerAttached) {
      document.addEventListener("mouseup", this._deactivate);
      isGlobalHandlerAttached = true;
    }

    this.i18nBundle = (0, _i18nBundle.getI18nBundle)("@ui5/webcomponents");
  }

  onBeforeRendering() {
    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (this.submits && !FormSupport) {
      console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
    }

    this.iconOnly = this.isIconOnly;
    this.hasIcon = !!this.icon;
  }

  _onclick(event) {
    event.isMarked = "button";
    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (FormSupport) {
      FormSupport.triggerFormSubmit(this);
    }
  }

  _onmousedown(event) {
    event.isMarked = "button";
    this.active = true;
    activeButton = this; // eslint-disable-line
  }

  _onmouseup(event) {
    event.isMarked = "button";
  }

  _onkeydown(event) {
    event.isMarked = "button";

    if ((0, _Keys.isSpace)(event) || (0, _Keys.isEnter)(event)) {
      this.active = true;
    }
  }

  _onkeyup(event) {
    if ((0, _Keys.isSpace)(event) || (0, _Keys.isEnter)(event)) {
      this.active = false;
    }
  }

  _onfocusout(_event) {
    this.active = false;
    this.focused = false;
  }

  _onfocusin(event) {
    event.isMarked = "button";
    this.focused = true;
  }

  get hasButtonType() {
    return this.design !== _ButtonDesign.default.Default && this.design !== _ButtonDesign.default.Transparent;
  }

  get isIconOnly() {
    return !Array.from(this.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).length;
  }

  get accInfo() {
    return {
      "ariaExpanded": this.ariaExpanded || this._buttonAccInfo && this._buttonAccInfo.ariaExpanded,
      "ariaControls": this._buttonAccInfo && this._buttonAccInfo.ariaControls,
      "ariaHaspopup": this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
      "title": this._buttonAccInfo && this._buttonAccInfo.title
    };
  }

  get ariaLabelText() {
    return (0, _AriaLabelHelper.getEffectiveAriaLabelText)(this);
  }

  static typeTextMappings() {
    return {
      "Positive": _i18nDefaults.BUTTON_ARIA_TYPE_ACCEPT,
      "Negative": _i18nDefaults.BUTTON_ARIA_TYPE_REJECT,
      "Emphasized": _i18nDefaults.BUTTON_ARIA_TYPE_EMPHASIZED
    };
  }

  get buttonTypeText() {
    return this.i18nBundle.getText(Button.typeTextMappings()[this.design]);
  }

  get tabIndexValue() {
    const tabindex = this.getAttribute("tabindex");

    if (tabindex) {
      return tabindex;
    }

    return this.nonFocusable ? "-1" : this._tabIndex;
  }

  get styles() {
    return {
      icon: {
        width: this.iconSize,
        height: this.iconSize
      }
    };
  }

  static async onDefine() {
    await (0, _i18nBundle.fetchI18nBundle)("@ui5/webcomponents");
  }

}

Button.define();
var _default = Button;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/UI5Element.js":"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js","@ui5/webcomponents-base/dist/Keys.js":"../node_modules/@ui5/webcomponents-base/dist/Keys.js","@ui5/webcomponents-base/dist/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/FeaturesRegistry.js","@ui5/webcomponents-base/dist/i18nBundle.js":"../node_modules/@ui5/webcomponents-base/dist/i18nBundle.js","@ui5/webcomponents-base/dist/util/AriaLabelHelper.js":"../node_modules/@ui5/webcomponents-base/dist/util/AriaLabelHelper.js","./types/ButtonDesign.js":"../node_modules/@ui5/webcomponents/dist/types/ButtonDesign.js","./generated/templates/ButtonTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/generated/templates/ButtonTemplate.lit.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./generated/i18n/i18n-defaults.js":"../node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js","./generated/themes/Button.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/Button.css.js"}],"../node_modules/@ui5/webcomponents/dist/generated/templates/AvatarTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return (0, _LitRenderer.html)`<div class="ui5-avatar-root">${context.image ? block1(context) : block2(context)}</div>`;
};

const block1 = context => {
  return (0, _LitRenderer.html)`<span class="ui5-avatar-img" style="${(0, _LitRenderer.styleMap)(context.styles.img)}" role="img" aria-label="${(0, _ifDefined.default)(context.accessibleNameText)}"></span>`;
};

const block2 = context => {
  return (0, _LitRenderer.html)`${context.icon ? block3(context) : block4(context)}`;
};

const block3 = context => {
  return (0, _LitRenderer.html)`<ui5-icon class="ui5-avatar-icon" name="${(0, _ifDefined.default)(context.icon)}" accessible-name="${(0, _ifDefined.default)(context.accessibleNameText)}"></ui5-icon>`;
};

const block4 = context => {
  return (0, _LitRenderer.html)`${context.initials ? block5(context) : undefined}`;
};

const block5 = context => {
  return (0, _LitRenderer.html)`<span class="ui5-avatar-initials">${(0, _ifDefined.default)(context.validInitials)}</span>`;
};

const main = (context, tags, suffix) => {
  (0, _LitRenderer.setTags)(tags);
  (0, _LitRenderer.setSuffix)(suffix);
  return block0(context);
};

var _default = main;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/generated/themes/Avatar.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js");

var _parametersBundleCss = _interopRequireDefault(require("@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"));

var _parametersBundleCss2 = _interopRequireDefault(require("./sap_fiori_3/parameters-bundle.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Themes.registerThemeProperties)("@ui5/webcomponents-theme-base", "sap_fiori_3", _parametersBundleCss.default);
(0, _Themes.registerThemeProperties)("@ui5/webcomponents", "sap_fiori_3", _parametersBundleCss2.default);
var _default = ":host(:not([hidden])){display:inline-block;box-sizing:border-box}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-avatar-initials-border);outline:none;color:var(--ui5-avatar-initials-color)}:host([shape=Square]){border-radius:.25rem}:host([shape=Square]) .ui5-avatar-root{border-radius:inherit}:host([shape=Square]) .ui5-avatar-img{border-radius:inherit}:host([size=XS]){height:2rem;width:2rem;font-size:.75rem}:host([size=S]){height:3rem;width:3rem;font-size:1.125rem}:host([size=M]){height:4rem;width:4rem;font-size:1.625rem}:host([size=L]){height:5rem;width:5rem;font-size:2rem}:host([size=XL]){height:7rem;width:7rem;font-size:2.75rem}:host .ui5-avatar-icon{height:1.5rem;width:1.5rem}:host([size=XS]) .ui5-avatar-icon{height:1rem;width:1rem}:host([size=S]) .ui5-avatar-icon{height:1.5rem;width:1.5rem}:host([size=M]) .ui5-avatar-icon{height:2rem;width:2rem}:host([size=L]) .ui5-avatar-icon{height:2.5rem;width:2.5rem}:host([size=XL]) .ui5-avatar-icon{height:3rem;width:3rem}:host(:not([image])){background-color:var(--ui5-avatar-accent6)}:host([background-color=Accent1]){background-color:var(--ui5-avatar-accent1)}:host([background-color=Accent2]){background-color:var(--ui5-avatar-accent2)}:host([background-color=Accent3]){background-color:var(--ui5-avatar-accent3)}:host([background-color=Accent4]){background-color:var(--ui5-avatar-accent4)}:host([background-color=Accent5]){background-color:var(--ui5-avatar-accent5)}:host([background-color=Accent6]){background-color:var(--ui5-avatar-accent6)}:host([background-color=Accent7]){background-color:var(--ui5-avatar-accent7)}:host([background-color=Accent8]){background-color:var(--ui5-avatar-accent8)}:host([background-color=Accent9]){background-color:var(--ui5-avatar-accent9)}:host([background-color=Accent10]){background-color:var(--ui5-avatar-accent10)}:host([background-color=Placeholder]){background-color:var(--ui5-avatar-placeholder)}:host(:not([image])) .ui5-avatar-icon{color:inherit}:host([image-fit-type=Contain]) .ui5-avatar-img{background-size:contain}.ui5-avatar-root{display:flex;align-items:center;justify-content:center}.ui5-avatar-img,.ui5-avatar-root{height:100%;width:100%;border-radius:50%}.ui5-avatar-img{background-repeat:no-repeat;background-position:50%;background-size:cover}.ui5-avatar-initials{color:inherit}";
exports.default = _default;
},{"@ui5/webcomponents-base/dist/asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js","./sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"}],"../node_modules/@ui5/webcomponents/dist/types/AvatarSize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of AvatarSize.
 * @lends sap.ui.webcomponents.main.types.AvatarSize.prototype
 * @public
 */
const AvatarSizes = {
  /**
   * component size - 2rem
   * font size - 1rem
   * @public
   * @type {XS}
   */
  XS: "XS",

  /**
   * component size - 3rem
   * font size - 1.5rem
   * @public
   * @type {S}
   */
  S: "S",

  /**
   * component size - 4rem
   * font size - 2rem
   * @public
   * @type {M}
   */
  M: "M",

  /**
   * component size - 5rem
   * font size - 2.5rem
   * @public
   * @type {L}
   */
  L: "L",

  /**
   * component size - 7rem
   * font size - 3rem
   * @public
   * @type {XL}
   */
  XL: "XL"
};
/**
 * @class
 * Different types of AvatarSize.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarSize
 * @public
 * @enum {string}
 */

class AvatarSize extends _DataType.default {
  static isValid(value) {
    return !!AvatarSizes[value];
  }

}

AvatarSize.generataTypeAcessors(AvatarSizes);
var _default = AvatarSize;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/AvatarShape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of AvatarShape.
 * @lends sap.ui.webcomponents.main.types.AvatarShape.prototype
 * @public
 */
const AvatarShapes = {
  /**
   * Circular shape.
   * @public
   * @type {Circle}
   */
  Circle: "Circle",

  /**
   * Square shape.
   * @public
   * @type {Square}
   */
  Square: "Square"
};
/**
 * @class
 * Different types of AvatarShape.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarShape
 * @public
 * @enum {string}
 */

class AvatarShape extends _DataType.default {
  static isValid(value) {
    return !!AvatarShapes[value];
  }

}

AvatarShape.generataTypeAcessors(AvatarShapes);
var _default = AvatarShape;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/AvatarFitType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of AvatarFitType.
 * @lends sap.ui.webcomponents.main.types.AvatarFitType.prototype
 * @public
 */
const AvatarFitTypes = {
  /**
   *
   * @type {Cover}
   * @public
   */
  Cover: "Cover",

  /**
   * @type {Contain}
   * @public
   */
  Contain: "Contain"
};
/**
 * @class
 * Different types of AvatarFitType.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarFitType
 * @public
 * @enum {string}
 */

class AvatarFitType extends _DataType.default {
  static isValid(value) {
    return !!AvatarFitTypes[value];
  }

}

AvatarFitType.generataTypeAcessors(AvatarFitTypes);
var _default = AvatarFitType;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/AvatarBackgroundColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of AvatarBackgroundColor.
 * @lends sap.ui.webcomponents.main.types.AvatarBackgroundColor.prototype
 * @public
 */
const AvatarBackGroundColors = {
  /**
   *
   * @public
   * @type {Accent1}
   */
  Accent1: "Accent1",

  /**
   *
   * @public
   * @type {Accent2}
   */
  Accent2: "Accent2",

  /**
   *
   * @public
   * @type {Accent3}
   */
  Accent3: "Accent3",

  /**
   *
   * @public
   * @type {Accent4}
   */
  Accent4: "Accent4",

  /**
   *
   * @public
   * @type {Accent5}
   */
  Accent5: "Accent5",

  /**
   *
   * @public
   * @type {Accent6}
   */
  Accent6: "Accent6",

  /**
   *
   * @public
   * @type {Accent7}
   */
  Accent7: "Accent7",

  /**
   *
   * @public
   * @type {Accent8}
   */
  Accent8: "Accent8",

  /**
   *
   * @public
   * @type {Accent9}
   */
  Accent9: "Accent9",

  /**
   *
   * @public
   * @type {Accent10}
   */
  Accent10: "Accent10",

  /**
   *
   * @public
   * @type {Placeholder}
   */
  Placeholder: "Placeholder"
};
/**
 * @class
 * Different types of AvatarBackgroundColor.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarBackgroundColor
 * @public
 * @enum {string}
 */

class AvatarBackgroundColor extends _DataType.default {
  static isValid(value) {
    return !!AvatarBackGroundColors[value];
  }

}

AvatarBackgroundColor.generataTypeAcessors(AvatarBackGroundColors);
var _default = AvatarBackgroundColor;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/Avatar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/dist/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js"));

var _i18nBundle = require("@ui5/webcomponents-base/dist/i18nBundle.js");

var _AvatarTemplateLit = _interopRequireDefault(require("./generated/templates/AvatarTemplate.lit.js"));

var _i18nDefaults = require("./generated/i18n/i18n-defaults.js");

var _AvatarCss = _interopRequireDefault(require("./generated/themes/Avatar.css.js"));

var _Icon = _interopRequireDefault(require("./Icon.js"));

var _AvatarSize = _interopRequireDefault(require("./types/AvatarSize.js"));

var _AvatarShape = _interopRequireDefault(require("./types/AvatarShape.js"));

var _AvatarFitType = _interopRequireDefault(require("./types/AvatarFitType.js"));

var _AvatarBackgroundColor = _interopRequireDefault(require("./types/AvatarBackgroundColor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-avatar",
  languageAware: true,
  properties:
  /** @lends sap.ui.webcomponents.main.Avatar.prototype */
  {
    /**
     * Defines the source path to the desired image.
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    image: {
      type: String
    },

    /**
     * Defines the name of the UI5 Icon, that would be displayed.
     * <br>
     * <b>Note:</b> If <code>image</code> is set, the property would be ignored.
     * <br>
     * <b>Note:</b> You should import the desired icon first, then use its name as "icon".
     * <br><br>
     * import "@ui5/webcomponents-icons/dist/icons/{icon_name}.js"
     * <br>
     * <pre>&lt;ui5-avatar icon-src="employee"></pre>
     *
     * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    icon: {
      type: String
    },

    /**
     * Defines the displayed initials.
     * <br>
     * Up to two Latin letters can be displayed as initials in a <code>ui5-avatar</code>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    initials: {
      type: String
    },

    /**
     * Defines the shape of the <code>ui5-avatar</code>.
     * <br><br>
     * Available options are:
     * <ul>
     * <li><code>Circle</code></li>
     * <li><code>Square</code></li>
     * <ul>
     * @type {AvatarShape}
     * @defaultvalue "Circle"
     * @public
     */
    shape: {
      type: String,
      defaultValue: _AvatarShape.default.Circle
    },

    /**
     * Defines predefined size of the <code>ui5-avatar</code>.
     * <br><br>
     * Available options are:
     * <ul>
     * <li><code>XS</code></li>
     * <li><code>S</code></li>
     * <li><code>M</code></li>
     * <li><code>L</code></li>
     * <li><code>XL</code></li>
     * <ul>
     * @type {AvatarSize}
     * @defaultvalue "S"
     * @public
     */
    size: {
      type: String,
      defaultValue: _AvatarSize.default.S
    },

    /**
     * Defines the fit type of the desired image.
     * <br><br>
     * Available options are:
     * <ul>
     * <li><code>Cover</code></li>
     * <li><code>Contain</code></li>
     * <ul>
     * @type {AvatarFitType}
     * @defaultvalue "Cover"
     * @public
     */
    imageFitType: {
      type: String,
      defaultValue: _AvatarFitType.default.Cover
    },

    /**
     * Defines the background color of the desired image.
     * <br><br>
     * Available options are:
     * <ul>
     * <li><code>Accent1</code></li>
     * <li><code>Accent2</code></li>
     * <li><code>Accent3</code></li>
     * <li><code>Accent4</code></li>
     * <li><code>Accent5</code></li>
     * <li><code>Accent6</code></li>
     * <li><code>Accent7</code></li>
     * <li><code>Accent8</code></li>
     * <li><code>Accent9</code></li>
     * <li><code>Accent10</code></li>
     * <li><code>Placeholder</code></li>
     * <ul>
     * @type {AvatarBackgroundColor}
     * @defaultvalue "Accent6"
     * @public
     */
    backgroundColor: {
      type: String,
      defaultValue: _AvatarBackgroundColor.default.Accent6
    },

    /**
     * Defines the text alternative of the <code>ui5-avatar</code>.
     * If not provided a default text alternative will be set, if present.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     * @since 1.0.0-rc.7
     */
    accessibleName: {
      type: String
    }
  },
  slots:
  /** @lends sap.ui.webcomponents.main.Avatar.prototype */
  {},
  events:
  /** @lends sap.ui.webcomponents.main.Avatar.prototype */
  {}
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An image-like control that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Avatar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Avatar
 * @extends UI5Element
 * @tagname ui5-avatar
 * @since 1.0.0-rc.6
 * @public
 */

class Avatar extends _UI5Element.default {
  constructor() {
    super();
    this.i18nBundle = (0, _i18nBundle.getI18nBundle)("@ui5/webcomponents");
  }

  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get styles() {
    return _AvatarCss.default;
  }

  static get template() {
    return _AvatarTemplateLit.default;
  }

  static get dependencies() {
    return [_Icon.default];
  }

  static async onDefine() {
    await (0, _i18nBundle.fetchI18nBundle)("@ui5/webcomponents");
  }

  get validInitials() {
    const validInitials = /^[a-zA-Z]{1,2}$/;

    if (this.initials && validInitials.test(this.initials)) {
      return this.initials;
    }

    return null;
  }

  get accessibleNameText() {
    if (this.accessibleName) {
      return this.accessibleName;
    }

    return this.i18nBundle.getText(_i18nDefaults.AVATAR_TOOLTIP) || undefined;
  }

  get styles() {
    const image = this.image.replace(/%/g, "%25").replace(/#/g, "%23");
    return {
      img: {
        "background-image": `url("${image}")`
      }
    };
  }

}

Avatar.define();
var _default = Avatar;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/UI5Element.js":"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js","@ui5/webcomponents-base/dist/i18nBundle.js":"../node_modules/@ui5/webcomponents-base/dist/i18nBundle.js","./generated/templates/AvatarTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/generated/templates/AvatarTemplate.lit.js","./generated/i18n/i18n-defaults.js":"../node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js","./generated/themes/Avatar.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/Avatar.css.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./types/AvatarSize.js":"../node_modules/@ui5/webcomponents/dist/types/AvatarSize.js","./types/AvatarShape.js":"../node_modules/@ui5/webcomponents/dist/types/AvatarShape.js","./types/AvatarFitType.js":"../node_modules/@ui5/webcomponents/dist/types/AvatarFitType.js","./types/AvatarBackgroundColor.js":"../node_modules/@ui5/webcomponents/dist/types/AvatarBackgroundColor.js"}],"../node_modules/@ui5/webcomponents-base/dist/Device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportTouch = exports.getBrowser = exports.getSystem = exports.getOS = exports.isAndroid = exports.isPhone = exports.isTablet = exports.isDesktop = exports.isMobile = exports.isSafari = exports.isFF = exports.isChrome = exports.isEdge = exports.isIE = void 0;

/**
 * Device and Feature Detection API: Provides information about the used browser / device and cross platform support for certain events
 * like media queries, orientation change or resizing.
 *
 * This API is independent from any other part of the UI5 framework. This allows it to be loaded beforehand, if it is needed, to create the UI5 bootstrap
 * dynamically depending on the capabilities of the browser or device.
 *
 * @namespace
 * @name Device
 */
const Device = {}; //* ******* OS Detection ********

/**
 * Contains information about the operating system of the Device.
 * @name Device.os
 */

/**
 * Enumeration containing the names of known operating systems.
 * @name Device.os.OS
 */

/**
 * The name of the operating system.
 * @name Device.os.name
 * @type String
 */

/**
 * The version of the operating system as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.os.versionStr
 * @type String
 */

/**
 * The version of the operating system as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.os.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, a Windows operating system is used.
 * @name Device.os.windows
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a Mac operating system is used.
 * @name Device.os.macintosh
 * @type boolean
 */

/*
 * If this flag is set to <code>true</code>, an iOS operating system is used.
 * @name Device.os.ios
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, an Android operating system is used.
 * @name Device.os.android
 * @type boolean
 */

/*
 * Windows operating system name.
 * @see Device.os.name
 * @name Device.os.OS.WINDOWS
 */

/**
 * MAC operating system name.
 * @see Device.os.name
 * @name Device.os.OS.MACINTOSH
 */

/**
 * iOS operating system name.
 * @see Device.os.name
 * @name Device.os.OS.IOS
 */

/**
 * Android operating system name.
 * @see Device.os.name
 * @name Device.os.OS.ANDROID
 */

const OS = {
  "WINDOWS": "win",
  "MACINTOSH": "mac",
  "IOS": "iOS",
  "ANDROID": "Android"
};

const _getMobileOS = () => {
  const userAgent = navigator.userAgent;
  let rPlatform, // regular expression for platform
  aMatches; // iOS, Android

  rPlatform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[)][^\d]*)([\d.]*)\s/;
  aMatches = userAgent.match(rPlatform);

  if (aMatches) {
    const rAppleDevices = /iPhone|iPad|iPod/;

    if (aMatches[0].match(rAppleDevices)) {
      aMatches[3] = aMatches[3].replace(/_/g, ".");
      return {
        "name": OS.IOS,
        "versionStr": aMatches[3]
      };
    }

    if (aMatches[2].match(/Android/)) {
      aMatches[2] = aMatches[2].replace(/\s/g, "");
      return {
        "name": OS.ANDROID,
        "versionStr": aMatches[3]
      };
    }
  } // Firefox on Android


  rPlatform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
  aMatches = userAgent.match(rPlatform);

  if (aMatches) {
    return {
      "name": OS.ANDROID,
      "versionStr": aMatches.length === 3 ? aMatches[2] : ""
    };
  }
};

const _getDesktopOS = () => {
  const sPlatform = navigator.platform;

  if (sPlatform.indexOf("Win") !== -1) {
    const rVersion = /Windows NT (\d+).(\d)/i; // userAgent since windows 10: Windows NT 10[...]

    const uaResult = navigator.userAgent.match(rVersion);
    return {
      "name": OS.WINDOWS,
      "versionStr": uaResult && uaResult[1] || ""
    };
  }

  if (sPlatform.indexOf("Mac") !== -1) {
    return {
      "name": OS.MACINTOSH,
      "versionStr": ""
    };
  }

  return null;
};

const _getOS = () => {
  return _getMobileOS() || _getDesktopOS();
};

const _setOS = () => {
  if (Device.os) {
    return;
  }

  Device.os = _getOS() || {};
  Device.os.OS = OS;
  Device.os.version = Device.os.versionStr ? parseFloat(Device.os.versionStr) : -1;

  if (Device.os.name) {
    Object.keys(OS).forEach(name => {
      if (OS[name] === Device.os.name) {
        Device.os[name.toLowerCase()] = true;
      }
    });
  }
};

const getOS = () => {
  if (!Device.os) {
    _setOS();
  }

  return Device.os;
};

exports.getOS = getOS;

const isAndroid = () => {
  if (!Device.os) {
    _setOS();
  }

  return !!Device.os.android;
}; //* ******* Browser Detection ********

/**
 * Contains information about the used browser.
 * @name Device.browser
 */

/**
 * Enumeration containing the names of known browsers.
 * @name Device.browser.BROWSER
 *
 * The name of the browser.
 * @name Device.browser.name
 * @type String
 */

/**
 * The version of the browser as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.browser.versionStr
 * @type String
 */

/**
 * The version of the browser as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.browser.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, the mobile variant of the browser is used or
 * a tablet or phone device is detected. This information might not be available for all browsers.
 * @name Device.browser.mobile
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.internet_explorer
 * @type boolean
 * @deprecated since 1.20, use {@link Device.browser.msie} instead.
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.msie
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Edge browser is used.
 * @name Device.browser.edge
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Mozilla Firefox browser is used.
 * @name Device.browser.firefox
 */

/**
 * If this flag is set to <code>true</code>, the Google Chrome browser is used.
 * @name Device.browser.chrome
 * @type boolean
 *
 * If this flag is set to <code>true</code>, the Apple Safari browser is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the standalone (fullscreen) mode or webview is used on iOS devices.
 * Please also note the flags {@link Device.browser.fullscreen} and {@link Device.browser.webview}.
 *
 * @name Device.browser.safari
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Webkit engine is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the used browser was based on the Webkit engine, but
 * uses another rendering engine in the meantime. For example the Chrome browser started from version 28 and above
 * uses the Blink rendering engine.
 *
 * @name Device.browser.webkit
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in standalone fullscreen mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.fullscreen
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in webview mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.webview
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Phantom JS browser is used.
 * @name Device.browser.phantomJS
 * @type boolean
 */

/**
 * The version of the used Webkit engine, if available.
 * @name Device.browser.webkitVersion
 * @type String
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Mozilla engine is used.
 * @name Device.browser.mozilla
 * @type boolean
 */

/**
 * Internet Explorer browser name.
 * @name Device.browser.BROWSER.INTERNET_EXPLORER
 */

/**
 * Edge browser name.
 * @name Device.browser.BROWSER.EDGE
 */

/**
 * Firefox browser name.
 * @name Device.browser.BROWSER.FIREFOX
 */

/**
 * Chrome browser name.
 * @name Device.browser.BROWSER.CHROME
 */

/**
 * Safari browser name.
 * @name Device.browser.BROWSER.SAFARI
 */

/**
 * Android stock browser name.
 * @name Device.browser.BROWSER.ANDROID
 */


exports.isAndroid = isAndroid;
const BROWSER = {
  "INTERNET_EXPLORER": "ie",
  "EDGE": "ed",
  "FIREFOX": "ff",
  "CHROME": "cr",
  "SAFARI": "sf",
  "ANDROID": "an"
};
/*!
* Taken from jQuery JavaScript Library v1.7.1
* http://jquery.com/
*
* Copyright 2011, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2011, The Dojo Foundation
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: Mon Nov 21 21:11:03 2011 -0500
*/

const _calcBrowser = () => {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const rwebkit = /(webkit)[ /]([\w.]+)/;
  const rmsie = /(msie) ([\w.]+)/;
  const rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
  const redge = /(edge)[ /]([\w.]+)/;
  const rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/; // WinPhone IE11 and MS Edge userAgents contain "WebKit" and "Mozilla" and therefore must be checked first

  const browserMatch = redge.exec(sUserAgent) || rmsie11.exec(sUserAgent) || rwebkit.exec(sUserAgent) || rmsie.exec(sUserAgent) || sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent) || [];
  const oRes = {
    browser: browserMatch[1] || "",
    version: browserMatch[2] || "0"
  };
  oRes[oRes.browser] = true;
  return oRes;
};

const _getBrowser = () => {
  const oBrowser = _calcBrowser();

  const sUserAgent = navigator.userAgent;
  const oNavigator = window.navigator; // jQuery checks for user agent strings. We differentiate between browsers

  let oExpMobile;
  let oResult;
  let fVersion; // Mozilla

  if (oBrowser.mozilla) {
    oExpMobile = /Mobile/;

    if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
      fVersion = parseFloat(RegExp.$1);
      oResult = {
        name: BROWSER.FIREFOX,
        versionStr: `${fVersion}`,
        version: fVersion,
        mozilla: true,
        mobile: oExpMobile.test(sUserAgent)
      };
    } else {
      // unknown mozilla browser
      oResult = {
        mobile: oExpMobile.test(sUserAgent),
        mozilla: true,
        version: -1
      };
    }
  } else if (oBrowser.webkit) {
    // webkit version is needed for calculation if the mobile android device is a tablet (calculation of other mobile devices work without)
    const regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[/]([\d.]+)/);
    let webkitVersion;

    if (regExpWebkitVersion) {
      webkitVersion = regExpWebkitVersion[1];
    }

    oExpMobile = /Mobile/;
    const aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
    const aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
    const aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

    if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
      let sName, sVersion, bMobile;

      if (aChromeMatch) {
        sName = BROWSER.CHROME;
        bMobile = oExpMobile.test(sUserAgent);
        sVersion = parseFloat(aChromeMatch[2]);
      } else if (aFirefoxMatch) {
        sName = BROWSER.FIREFOX;
        bMobile = true;
        sVersion = parseFloat(aFirefoxMatch[1]);
      } else if (aAndroidMatch) {
        sName = BROWSER.ANDROID;
        bMobile = oExpMobile.test(sUserAgent);
        sVersion = parseFloat(aAndroidMatch[1]);
      }

      oResult = {
        name: sName,
        mobile: bMobile,
        versionStr: `${sVersion}`,
        version: sVersion,
        webkit: true,
        webkitVersion
      };
    } else {
      // Safari might have an issue with sUserAgent.match(...); thus changing
      const oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
      const bStandalone = oNavigator.standalone;

      if (oExp.test(sUserAgent)) {
        const aParts = oExp.exec(sUserAgent);
        fVersion = parseFloat(aParts[2]);
        oResult = {
          name: BROWSER.SAFARI,
          versionStr: `${fVersion}`,
          fullscreen: false,
          webview: false,
          version: fVersion,
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion,
          phantomJS: aParts[1] === "PhantomJS"
        };
      } else if (/iPhone|iPad|iPod/.test(sUserAgent) && !/CriOS/.test(sUserAgent) && !/FxiOS/.test(sUserAgent) && (bStandalone === true || bStandalone === false)) {
        // WebView or Standalone mode on iOS
        oResult = {
          name: BROWSER.SAFARI,
          version: -1,
          fullscreen: bStandalone,
          webview: !bStandalone,
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion
        };
      } else {
        // other webkit based browser
        oResult = {
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion,
          version: -1
        };
      }
    }
  } else if (oBrowser.msie || oBrowser.trident) {
    fVersion = parseFloat(oBrowser.version);
    oResult = {
      name: BROWSER.INTERNET_EXPLORER,
      versionStr: `${fVersion}`,
      version: fVersion,
      msie: true,
      mobile: false
    };
  } else if (oBrowser.edge) {
    fVersion = parseFloat(oBrowser.version);
    oResult = {
      name: BROWSER.EDGE,
      versionStr: `${fVersion}`,
      version: fVersion,
      edge: true
    };
  } else {
    oResult = {
      name: "",
      versionStr: "",
      version: -1,
      mobile: false
    };
  }

  return oResult;
};

const _setBrowser = () => {
  Device.browser = _getBrowser();
  Device.browser.BROWSER = BROWSER;

  if (Device.browser.name) {
    Object.keys(BROWSER).forEach(b => {
      if (BROWSER[b] === Device.browser.name) {
        Device.browser[b.toLowerCase()] = true;
      }
    });
  }
};

const getBrowser = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return Device.browser;
};

exports.getBrowser = getBrowser;

const isIE = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.msie;
};

exports.isIE = isIE;

const isEdge = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.edge;
};

exports.isEdge = isEdge;

const isChrome = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.chrome;
};

exports.isChrome = isChrome;

const isFF = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.firefox;
};

exports.isFF = isFF;

const isSafari = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.safari;
}; //* ******* Support Detection ********


exports.isSafari = isSafari;

const _setSupport = () => {
  if (Device.support) {
    return;
  }

  if (!Device.browser) {
    _setBrowser();
  }

  Device.support = {};
  Device.support.touch = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch);
};

const supportTouch = () => {
  if (!Device.support) {
    _setSupport();
  }

  return !!Device.support.touch;
}; //* ******* System Detection ********

/**
 * Provides a basic categorization of the used device based on various indicators.
 *
 * <b>Note:</b> Depending on the capabilities of the device it is also possible that multiple flags are set to <code>true</code>.
 *
 * @namespace
 * @name Device.system
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a tablet.
 *
 * <b>Note:</b> This flag is also true for some browsers on desktop devices running on Windows 8 or higher.
 * Also see the documentation for {@link Device.system.combi} devices.
 * You can use the following logic to ensure that the current device is a tablet device:
 *
 * <pre>
 * if(Device.system.tablet && !Device.system.desktop){
 *	...tablet related commands...
 * }
 * </pre>
 *
 * @name Device.system.tablet
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a phone.
 *
 * @name Device.system.phone
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a desktop system.
 *
 * @name Device.system.desktop
 * @type boolean
 */

/**
 * Indicates if the device is recognized as a combination of a desktop system and tablet.
 *
 * <b>Note:</b> This property is mainly for Microsoft Windows 8 (and following) devices where the mouse and touch event may be supported
 * natively by the browser being used. This property is set to <code>true</code> only when both mouse and touch event are natively supported.
 *
 * @name Device.system.combi
 * @type boolean
 */

/**
 * @name Device.system.SYSTEMTYPE
 * Enumeration containing the names of known types of the devices.
 */


exports.supportTouch = supportTouch;
const SYSTEMTYPE = {
  "TABLET": "tablet",
  "PHONE": "phone",
  "DESKTOP": "desktop",
  "COMBI": "combi"
};

const _isTablet = () => {
  const sUserAgent = navigator.userAgent;

  if (Device.os.name === Device.os.OS.IOS) {
    return /ipad/i.test(sUserAgent);
  } // in real mobile device


  if (supportTouch()) {
    if (Device.os.windows && Device.os.version >= 8) {
      return true;
    }

    if (Device.browser.chrome && Device.os.android && Device.os.version >= 4.4) {
      // From Android version 4.4, WebView also uses Chrome as Kernel.
      // We can use the user agent pattern defined in Chrome to do phone/tablet detection
      // According to the information here: https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent,
      //  the existence of "Mobile" indicates it's a phone. But because the crosswalk framework which is used in Fiori Client
      //  inserts another "Mobile" to the user agent for both tablet and phone, we need to check whether "Mobile Safari/<Webkit Rev>" exists.
      return !/Mobile Safari\/[.0-9]+/.test(sUserAgent);
    }

    let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
    // On Android sometimes window.screen.width returns the logical CSS pixels, sometimes the physical device pixels;
    // Tests on multiple devices suggest this depends on the Webkit version.
    // The Webkit patch which changed the behavior was done here: https://bugs.webkit.org/show_bug.cgi?id=106460
    // Chrome 27 with Webkit 537.36 returns the logical pixels,
    // Chrome 18 with Webkit 535.19 returns the physical pixels.
    // The BlackBerry 10 browser with Webkit 537.10+ returns the physical pixels.
    // So it appears like somewhere above Webkit 537.10 we do not hve to divide by the devicePixelRatio anymore.

    if (Device.os.android && Device.browser.webkit && parseFloat(Device.browser.webkitVersion) > 537.10) {
      densityFactor = 1;
    } // this is how android distinguishes between tablet and phone
    // http://android-developers.blogspot.de/2011/07/new-tools-for-managing-screen-sizes.html


    const bTablet = Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600; // special workaround for Nexus 7 where the window.screen.width is 600px or 601px in portrait mode (=> tablet)
    // but window.screen.height 552px in landscape mode (=> phone), because the browser UI takes some space on top.
    // So the detected device type depends on the orientation :-(
    // actually this is a Chrome bug, as "width"/"height" should return the entire screen's dimensions and
    // "availWidth"/"availHeight" should return the size available after subtracting the browser UI

    /*
    		if (isLandscape() &&
    			(window.screen.height === 552 || window.screen.height === 553) // old/new Nexus 7
    			&&
    			(/Nexus 7/i.test(sUserAgent))) {
    			bTablet = true;
    		}
    		*/

    return bTablet;
  } // This simple android phone detection can be used here because this is the mobile emulation mode in desktop browser


  const bAndroidPhone = /(?=android)(?=.*mobile)/i.test(sUserAgent); // in desktop browser, it's detected as tablet when
  // 1. Windows 8 device with a touch screen where "Touch" is contained in the userAgent
  // 2. Android emulation and it's not an Android phone

  return Device.browser.msie && sUserAgent.indexOf("Touch") !== -1 || Device.os.android && !bAndroidPhone;
};

const _getSystem = () => {
  const bTabletDetected = _isTablet();

  const isWin8Upwards = Device.os.windows && Device.os.version >= 8;
  const oSystem = {};
  oSystem.tablet = !!((Device.support.touch || isWin8Upwards) && bTabletDetected);
  oSystem.phone = !!((Device.os.windows_phone || Device.support.touch) && !bTabletDetected);
  oSystem.desktop = !!(!oSystem.tablet && !oSystem.phone || isWin8Upwards);
  oSystem.combi = oSystem.desktop && oSystem.tablet;
  oSystem.SYSTEMTYPE = SYSTEMTYPE;
  return oSystem;
};

const _setSystem = () => {
  _setSupport();

  _setOS();

  Device.system = {};
  Device.system = _getSystem();

  if (Device.system.tablet || Device.system.phone) {
    Device.browser.mobile = true;
  }
};

const getSystem = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system;
};

exports.getSystem = getSystem;

const isDesktop = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.desktop;
};

exports.isDesktop = isDesktop;

const isTablet = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.tablet;
};

exports.isTablet = isTablet;

const isPhone = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.phone;
};

exports.isPhone = isPhone;

const isMobile = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.browser.mobile;
};

exports.isMobile = isMobile;
},{}],"../node_modules/@ui5/webcomponents-base/dist/animations/AnimationQueue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const tasks = new WeakMap();

class AnimationQueue {
  static get tasks() {
    return tasks;
  }

  static enqueue(element, task) {
    if (!tasks.has(element)) {
      tasks.set(element, []);
    }

    tasks.get(element).push(task);
  }

  static run(element, task) {
    if (!tasks.has(element)) {
      tasks.set(element, []);
    }

    return task().then(() => {
      const elementTasks = tasks.get(element);

      if (elementTasks.length > 0) {
        return AnimationQueue.run(element, elementTasks.shift());
      }

      tasks.delete(element);
    });
  }

  static push(element, task) {
    const elementTasks = tasks.get(element);

    if (elementTasks) {
      AnimationQueue.enqueue(element, task);
    } else {
      AnimationQueue.run(element, task);
    }
  }

}

var _default = AnimationQueue;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/animations/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  defaultDuration: 400,
  element: document.createElement("DIV"),
  identity: () => {}
};
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/animations/animate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnimationQueue = _interopRequireDefault(require("./AnimationQueue.js"));

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  beforeStart = _config.default.identity,
  duration = _config.default.defaultDuration,
  element = _config.default.element,
  progress: progressCallback = _config.default.identity
}) => {
  let start = null;
  let stopped = false;
  let animationFrame;
  let stop;
  let animate;
  const promise = new Promise((resolve, reject) => {
    animate = timestamp => {
      start = start || timestamp;
      const timeElapsed = timestamp - start;
      const remaining = duration - timeElapsed;

      if (timeElapsed <= duration) {
        const progress = 1 - remaining / duration; // easing formula (currently linear)

        progressCallback(progress);
        animationFrame = !stopped && requestAnimationFrame(animate);
      } else {
        progressCallback(1);
        resolve();
      }
    };

    stop = () => {
      stopped = true;
      cancelAnimationFrame(animationFrame);
      reject(new Error("animation stopped"));
    };
  }).catch(oReason => oReason);

  _AnimationQueue.default.push(element, () => {
    beforeStart();
    requestAnimationFrame(animate);
    return new Promise(resolve => {
      promise.then(() => resolve());
    });
  });

  return {
    promise: () => promise,
    stop: () => stop
  };
};

exports.default = _default;
},{"./AnimationQueue.js":"../node_modules/@ui5/webcomponents-base/dist/animations/AnimationQueue.js","./config.js":"../node_modules/@ui5/webcomponents-base/dist/animations/config.js"}],"../node_modules/@ui5/webcomponents-base/dist/animations/scroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _animate = _interopRequireDefault(require("./animate.js"));

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  element = _config.default.element,
  duration = _config.default.duration,
  progress: progressCallback = _config.default.identity,
  dx = 0,
  dy = 0
}) => {
  let scrollLeft;
  let scrollTop;
  return (0, _animate.default)({
    beforeStart: () => {
      scrollLeft = element.scrollLeft;
      scrollTop = element.scrollTop;
    },
    duration,
    element,
    progress: progress => {
      progressCallback(progress);
      element.scrollLeft = scrollLeft + progress * dx; // easing - linear

      element.scrollTop = scrollTop + progress * dy; // easing - linear
    }
  });
};

exports.default = _default;
},{"./animate.js":"../node_modules/@ui5/webcomponents-base/dist/animations/animate.js","./config.js":"../node_modules/@ui5/webcomponents-base/dist/animations/config.js"}],"../node_modules/@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Device = require("../Device.js");

var _EventProvider = _interopRequireDefault(require("../EventProvider.js"));

var _scroll = _interopRequireDefault(require("../animations/scroll.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scrollEventName = "scroll";
const touchEndEventName = (0, _Device.isPhone)() ? "touchend" : "mouseup";

class ScrollEnablement extends _EventProvider.default {
  constructor(containerComponent) {
    super();
    this.containerComponent = containerComponent;
    this.mouseMove = this.ontouchmove.bind(this);
    this.mouseUp = this.ontouchend.bind(this);
    this.touchStart = this.ontouchstart.bind(this);
    this.isPhone = (0, _Device.isPhone)(); // On Android devices touchmove is thrown one more time than neccessary (together with touchend)
    // so we have to cache the previus coordinates in order to provide correct parameters in the
    // event for Android

    this.cachedValue = {}; // In components like Carousel you need to know if the user has clicked on something or swiped
    // in order to throw the needed event or not

    this.startX = 0;
    this.startY = 0;

    if (this.isPhone) {
      containerComponent.addEventListener("touchstart", this.touchStart, {
        passive: true
      });
      containerComponent.addEventListener("touchmove", this.mouseMove, {
        passive: true
      });
      containerComponent.addEventListener("touchend", this.mouseUp, {
        passive: true
      });
    } else {
      containerComponent.addEventListener("mousedown", this.touchStart, {
        passive: true
      });
    }
  }

  set scrollContainer(container) {
    this._container = container;
  }

  get scrollContainer() {
    return this._container;
  }

  scrollTo(left, top) {
    this._container.scrollLeft = left;
    this._container.scrollTop = top;
  }

  move(dx, dy) {
    return (0, _scroll.default)({
      element: this._container,
      dx,
      dy
    });
  }

  getScrollLeft() {
    return this._container.scrollLeft;
  }

  getScrollTop() {
    return this._container.scrollTop;
  }

  _isTouchInside(touch) {
    const rect = this._container.getBoundingClientRect();

    const x = this.isPhone ? touch.clientX : touch.x;
    const y = this.isPhone ? touch.clientY : touch.y;
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  ontouchstart(event) {
    const touch = this.isPhone ? event.touches[0] : null;

    if (!this.isPhone) {
      document.addEventListener("mouseup", this.mouseUp, {
        passive: true
      });
      document.addEventListener("mousemove", this.mouseMove, {
        passive: true
      });
    } else {
      // Needed only on mobile
      this.startX = touch.pageX;
      this.startY = touch.pageY;
    }

    this._prevDragX = this.isPhone ? touch.pageX : event.x;
    this._prevDragY = this.isPhone ? touch.pageY : event.y;
    this._canScroll = this._isTouchInside(this.isPhone ? touch : event);
  }

  ontouchmove(event) {
    if (!this._canScroll) {
      return;
    }

    const container = this._container;
    const touch = this.isPhone ? event.touches[0] : null;
    const dragX = this.isPhone ? touch.pageX : event.x;
    const dragY = this.isPhone ? touch.pageY : event.y;
    container.scrollLeft += this._prevDragX - dragX;
    container.scrollTop += this._prevDragY - dragY;
    this.fireEvent(scrollEventName, {
      isLeft: dragX > this._prevDragX,
      isRight: dragX < this._prevDragX
    });
    this.cachedValue.dragX = this._prevDragX;
    this.cachedValue.dragY = this._prevDragY;
    this._prevDragX = dragX;
    this._prevDragY = dragY;
  }

  ontouchend(event) {
    if (this.isPhone) {
      const deltaX = Math.abs(event.changedTouches[0].pageX - this.startX);
      const deltaY = Math.abs(event.changedTouches[0].pageY - this.startY);

      if (deltaX < 10 && deltaY < 10) {
        return;
      }
    }

    if (!this._canScroll) {
      return;
    }

    const container = this._container;
    const dragX = this.isPhone ? event.changedTouches[0].pageX : event.x;
    const dragY = this.isPhone ? event.changedTouches[0].pageY : event.y;
    container.scrollLeft += this._prevDragX - dragX;
    container.scrollTop += this._prevDragY - dragY;
    const useCachedValues = dragX === this._prevDragX;

    const _dragX = useCachedValues ? this.cachedValue.dragX : dragX; // const _dragY = useCachedValues ? this.cachedValue.dragY : dragY; add if needed


    this.fireEvent(touchEndEventName, {
      isLeft: _dragX < this._prevDragX,
      isRight: _dragX > this._prevDragX
    });
    this._prevDragX = dragX;
    this._prevDragY = dragY;

    if (!this.isPhone) {
      document.removeEventListener("mousemove", this.mouseMove, {
        passive: true
      });
      document.removeEventListener("mouseup", this.mouseUp);
    }
  }

}

var _default = ScrollEnablement;
exports.default = _default;
},{"../Device.js":"../node_modules/@ui5/webcomponents-base/dist/Device.js","../EventProvider.js":"../node_modules/@ui5/webcomponents-base/dist/EventProvider.js","../animations/scroll.js":"../node_modules/@ui5/webcomponents-base/dist/animations/scroll.js"}],"../node_modules/@ui5/webcomponents-base/dist/delegate/NativeResize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class NativeResize {
  static initialize() {
    NativeResize.resizeObserver = new window.ResizeObserver(entries => {
      // call attached callbacks
      entries.forEach(entry => {
        const callbacks = NativeResize.observedObjects.get(entry.target);
        callbacks.forEach(el => el());
      });
    });
    NativeResize.observedObjects = new Map();
  }

  static attachListener(ref, callback) {
    const observedDOMs = NativeResize.observedObjects;
    const callbacks = observedDOMs.get(ref) || []; // if no callbacks has been added for this ref - start observing it

    if (!callbacks.length) {
      NativeResize.resizeObserver.observe(ref);
    } // save the callbacks in an array


    observedDOMs.set(ref, [...callbacks, callback]);
  }

  static detachListener(ref, callback) {
    const callbacks = NativeResize.observedObjects.get(ref) || [];
    const filteredCallbacks = callbacks.filter(fn => fn !== callback);

    if (!callbacks.length || callbacks.length === filteredCallbacks.length && callbacks.length !== 0) {
      return;
    }

    NativeResize.observedObjects.set(ref, filteredCallbacks);

    if (!filteredCallbacks.length) {
      NativeResize.resizeObserver.unobserve(ref);
    }
  }

}

var _default = NativeResize;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/delegate/CustomResize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const INTERVAL = 300;

class CustomResize {
  static initialize() {
    CustomResize.initialized = false;
    CustomResize.resizeInterval = undefined;
    CustomResize.resizeListeners = new Map();
  }

  static attachListener(ref, callback) {
    const observedObject = CustomResize.resizeListeners.get(ref);
    const existingCallbacks = observedObject ? observedObject.callbacks : [];
    CustomResize.resizeListeners.set(ref, {
      width: ref ? ref.offsetWidth : 0,
      height: ref ? ref.offsetHeight : 0,
      callbacks: existingCallbacks.concat(callback)
    });
    CustomResize.initListener();
  }

  static initListener() {
    if (CustomResize.resizeListeners.size > 0 && !CustomResize.initialized) {
      CustomResize.resizeInterval = setInterval(CustomResize.checkListeners.bind(CustomResize), INTERVAL);
    }
  }

  static checkListeners() {
    CustomResize.resizeListeners.forEach((entry, ref) => {
      const changed = CustomResize.checkSizes(entry, ref);

      if (changed || entry && !entry._hasBeenRendered) {
        CustomResize.updateSizes(entry, ref.offsetWidth, ref.offsetHeight);
        entry.callbacks.forEach(el => el());
        entry._hasBeenRendered = true;
      }
    });
  }

  static updateSizes(sizes, newWidth, newHeight) {
    sizes.width = newWidth;
    sizes.height = newHeight;
  }

  static checkSizes(entry, ref) {
    const oldHeight = entry.height;
    const oldWidth = entry.width;
    const newHeight = ref.offsetHeight;
    const newWidth = ref.offsetWidth;
    return oldHeight !== newHeight || oldWidth !== newWidth;
  }

  static detachListener(ref, callback) {
    const listenerObject = CustomResize.resizeListeners.get(ref);
    const callbacks = listenerObject ? listenerObject.callbacks : [];
    const filteredCallbacks = callbacks.filter(fn => fn !== callback);

    if (!listenerObject || callbacks.length === filteredCallbacks.length && callbacks.length !== 0) {
      return;
    }

    CustomResize.resizeListeners.set(ref, Object.assign(listenerObject, {
      callbacks: filteredCallbacks
    }));

    if (!filteredCallbacks.length) {
      listenerObject.callbacks = null;
      CustomResize.resizeListeners.delete(ref);
    }

    if (CustomResize.resizeListeners.size === 0) {
      CustomResize.initialized = false;
      clearInterval(CustomResize.resizeInterval);
    }
  }

}

var _default = CustomResize;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/delegate/ResizeHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NativeResize = _interopRequireDefault(require("./NativeResize.js"));

var _CustomResize = _interopRequireDefault(require("./CustomResize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResizeHandler {
  static initialize() {
    ResizeHandler.Implementation = window.ResizeObserver ? _NativeResize.default : _CustomResize.default;
    ResizeHandler.Implementation.initialize();
  }
  /**
   * @static
   * @private
   * @param {*} ref Reference to be observed
   * @param {*} callback Callback to be executed
   * @memberof ResizeHandler
   */


  static attachListener(ref, callback) {
    ResizeHandler.Implementation.attachListener.call(ResizeHandler.Implementation, ref, callback);
  }
  /**
   * @static
   * @private
   * @param {*} ref Reference to be unobserved
   * @memberof ResizeHandler
   */


  static detachListener(ref, callback) {
    ResizeHandler.Implementation.detachListener.call(ResizeHandler.Implementation, ref, callback);
  }
  /**
   * @static
   * @public
   * @param {*} ref Reference to a UI5 Web Component or DOM Element to be observed
   * @param {*} callback Callback to be executed
   * @memberof ResizeHandler
   */


  static register(ref, callback) {
    if (ref.isUI5Element) {
      ref = ref.getDomRef();
    }

    ResizeHandler.attachListener(ref, callback);
  }
  /**
   * @static
   * @public
   * @param {*} ref Reference to UI5 Web Component or DOM Element to be unobserved
   * @memberof ResizeHandler
   */


  static deregister(ref, callback) {
    if (ref.isUI5Element) {
      ref = ref.getDomRef();
    }

    ResizeHandler.detachListener(ref, callback);
  }

}

ResizeHandler.initialize();
var _default = ResizeHandler;
exports.default = _default;
},{"./NativeResize.js":"../node_modules/@ui5/webcomponents-base/dist/delegate/NativeResize.js","./CustomResize.js":"../node_modules/@ui5/webcomponents-base/dist/delegate/CustomResize.js"}],"../node_modules/@ui5/webcomponents-base/dist/types/AnimationMode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const AnimationMode = {
  Full: "full",
  Basic: "basic",
  Minimal: "minimal",
  None: "none"
};
var _default = AnimationMode;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/dist/config/AnimationMode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAnimationMode = exports.getAnimationMode = void 0;

var _InitialConfiguration = require("../InitialConfiguration.js");

var _AnimationMode = _interopRequireDefault(require("../types/AnimationMode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let animationMode;

const getAnimationMode = () => {
  if (animationMode === undefined) {
    animationMode = (0, _InitialConfiguration.getAnimationMode)();
  }

  return animationMode;
};

exports.getAnimationMode = getAnimationMode;

const setAnimationMode = newAnimationMode => {
  if (Object.values(_AnimationMode.default).includes(newAnimationMode)) {
    animationMode = newAnimationMode;
  }
};

exports.setAnimationMode = setAnimationMode;
},{"../InitialConfiguration.js":"../node_modules/@ui5/webcomponents-base/dist/InitialConfiguration.js","../types/AnimationMode.js":"../node_modules/@ui5/webcomponents-base/dist/types/AnimationMode.js"}],"../node_modules/@ui5/webcomponents/dist/types/CarouselArrowsPlacement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @lends sap.ui.webcomponents.main.types.CarouselArrowsPlacement.prototype
 * @public
 */
const CarouselArrowsPlacementTypes = {
  /**
   * Carousel arrows are placed on the sides of the current Carousel page.
   * @public
   * @type {Default}
   */
  Content: "Content",

  /**
   * Carousel arrows are placed on the sides of the page indicator of the Carousel.
   * @public
   * @type {Positive}
   */
  Navigation: "Navigation"
};
/**
 * @class
 * Different types of Arrow Placement for <code>ui5-carousel</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.CarouselArrowsPlacement
 * @public
 * @enum {string}
 */

class CarouselArrowsPlacement extends _DataType.default {
  static isValid(value) {
    return !!CarouselArrowsPlacementTypes[value];
  }

}

CarouselArrowsPlacement.generataTypeAcessors(CarouselArrowsPlacementTypes);
var _default = CarouselArrowsPlacement;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/types/DataType.js":"../node_modules/@ui5/webcomponents-base/dist/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/generated/templates/CarouselTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return (0, _LitRenderer.html)`<section class="ui5-carousel-root" tabindex="0" role="listbox" aria-activedescendant="${(0, _ifDefined.default)(context.ariaActiveDescendant)}" @keydown=${context._onkeydown}><div class="ui5-carousel-viewport ${(0, _LitRenderer.classMap)(context.classes.viewport)}"><div class="${(0, _LitRenderer.classMap)(context.classes.content)}" style="${(0, _LitRenderer.styleMap)(context.styles.content)}">${(0, _LitRenderer.repeat)(context.items, (item, index) => item._id || index, (item, index) => block1(item, index, context))}</div></div>${context.arrows.content ? block2(context) : undefined}${context.showNavigationArrows ? block3(context) : undefined}</div></section>`;
};

const block1 = (item, index, context) => {
  return (0, _LitRenderer.html)`<div id="${(0, _ifDefined.default)(item.id)}" class="ui5-carousel-item ${(0, _ifDefined.default)(item.classes)}" style="width: ${(0, _ifDefined.default)(item.width)}px;" role="option" aria-posinset="${(0, _ifDefined.default)(item.posinset)}" aria-setsize="${(0, _ifDefined.default)(item.setsize)}"><slot name="${(0, _ifDefined.default)(item.item._individualSlot)}" tabindex="${(0, _ifDefined.default)(item.tabIndex)}"></slot></div>`;
};

const block2 = context => {
  return (0, _LitRenderer.html)`<div class="ui5-carousel-navigation-arrows"><ui5-button arrow-back class="ui5-carousel-navigation-button ${(0, _LitRenderer.classMap)(context.classes.navPrevButton)}" icon="slim-arrow-left" tabindex="-1" @click=${context.navigateLeft}></ui5-button><ui5-button arrow-forward class="ui5-carousel-navigation-button ${(0, _LitRenderer.classMap)(context.classes.navNextButton)}" icon="slim-arrow-right" tabindex="-1" @click=${context.navigateRight}></ui5-button></div>`;
};

const block3 = context => {
  return (0, _LitRenderer.html)`<div class="${(0, _LitRenderer.classMap)(context.classes.navigation)}">${context.arrows.navigation ? block4(context) : undefined}<div class="ui5-carousel-navigation">${context.isPageTypeDots ? block5(context) : block7(context)}</div>${context.arrows.navigation ? block8(context) : undefined}</div>`;
};

const block4 = context => {
  return (0, _LitRenderer.html)`<ui5-button arrow-back class="ui5-carousel-navigation-button ${(0, _LitRenderer.classMap)(context.classes.navPrevButton)}" icon="slim-arrow-left" tabindex="-1" @click=${context.navigateLeft}></ui5-button>`;
};

const block5 = context => {
  return (0, _LitRenderer.html)`${(0, _LitRenderer.repeat)(context.dots, (item, index) => item._id || index, (item, index) => block6(item, index, context))}`;
};

const block6 = (item, index, context) => {
  return (0, _LitRenderer.html)`<div role="img" aria-label="${(0, _ifDefined.default)(item.ariaLabel)}" ?active="${item.active}" class="ui5-carousel-navigation-dot"></div>`;
};

const block7 = context => {
  return (0, _LitRenderer.html)`<ui5-label>${(0, _ifDefined.default)(context.selectedIndexToShow)}&nbsp;${(0, _ifDefined.default)(context.ofText)}&nbsp;${(0, _ifDefined.default)(context.pagesCount)}</ui5-label>`;
};

const block8 = context => {
  return (0, _LitRenderer.html)`<ui5-button arrow-forward class="ui5-carousel-navigation-button ${(0, _LitRenderer.classMap)(context.classes.navNextButton)}" icon="slim-arrow-right" tabindex="-1" @click=${context.navigateRight}></ui5-button>`;
};

const main = (context, tags, suffix) => {
  (0, _LitRenderer.setTags)(tags);
  (0, _LitRenderer.setSuffix)(suffix);
  return block0(context);
};

var _default = main;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SVGIconRegistry = require("@ui5/webcomponents-base/dist/SVGIconRegistry.js");

const name = "slim-arrow-left";
const pathData = "M351.5 421q12 12 0 23-5 5-11 5t-11-5l-166-165q-9-10-9-23t9-23l165-164q5-5 11.5-5t11.5 5 5 11-5 11l-159 159q-6 6 0 12z";
const ltr = false;
(0, _SVGIconRegistry.registerIcon)(name, {
  pathData,
  ltr
});
var _default = {
  pathData
};
exports.default = _default;
},{"@ui5/webcomponents-base/dist/SVGIconRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/SVGIconRegistry.js"}],"../node_modules/@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SVGIconRegistry = require("@ui5/webcomponents-base/dist/SVGIconRegistry.js");

const name = "slim-arrow-right";
const pathData = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
const ltr = false;
(0, _SVGIconRegistry.registerIcon)(name, {
  pathData,
  ltr
});
var _default = {
  pathData
};
exports.default = _default;
},{"@ui5/webcomponents-base/dist/SVGIconRegistry.js":"../node_modules/@ui5/webcomponents-base/dist/SVGIconRegistry.js"}],"../node_modules/@ui5/webcomponents/dist/generated/templates/LabelTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return (0, _LitRenderer.html)`<label class="ui5-label-root" dir="${(0, _ifDefined.default)(context.effectiveDir)}" @click=${context._onclick} for="${(0, _ifDefined.default)(context.for)}"><span class="ui5-label-text-wrapper"><bdi id="${(0, _ifDefined.default)(context._id)}-bdi"><slot></slot></bdi></span><span class="ui5-label-required-colon"></span></label>`;
};

const main = (context, tags, suffix) => {
  (0, _LitRenderer.setTags)(tags);
  (0, _LitRenderer.setSuffix)(suffix);
  return block0(context);
};

var _default = main;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/ifDefined.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/generated/themes/Label.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js");

var _parametersBundleCss = _interopRequireDefault(require("@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"));

var _parametersBundleCss2 = _interopRequireDefault(require("./sap_fiori_3/parameters-bundle.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Themes.registerThemeProperties)("@ui5/webcomponents-theme-base", "sap_fiori_3", _parametersBundleCss.default);
(0, _Themes.registerThemeProperties)("@ui5/webcomponents", "sap_fiori_3", _parametersBundleCss2.default);
var _default = ":host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}:host(:not([wrap])) .ui5-label-root{width:100%;font-weight:inherit;display:inline-block;white-space:nowrap;cursor:inherit;overflow:hidden}bdi{content:\"\";padding-right:.15625rem}:host(:not([wrap])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;max-width:100%}:host(:not([wrap])[required][show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .85rem)}:host(:not([wrap])[required]) .ui5-label-text-wrapper{max-width:calc(100% - .475rem)}:host(:not([wrap])[show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .2rem)}:host([show-colon]) .ui5-label-required-colon:before{content:\":\"}:host([required]) .ui5-label-required-colon:after{content:\"*\";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-right:0;margin-left:.125rem}:host([required][show-colon]) [dir=rtl] .ui5-label-required-colon:after{margin-right:.125rem;margin-left:0}";
exports.default = _default;
},{"@ui5/webcomponents-base/dist/asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js","./sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"}],"../node_modules/@ui5/webcomponents/dist/Label.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/dist/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js"));

var _LabelTemplateLit = _interopRequireDefault(require("./generated/templates/LabelTemplate.lit.js"));

var _LabelCss = _interopRequireDefault(require("./generated/themes/Label.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-label",
  properties:
  /** @lends sap.ui.webcomponents.main.Label.prototype */
  {
    /**
     * Defines whether an asterisk character is added to the <code>ui5-label</code> text.
     * <br><br>
     * <b>Note:</b> Usually indicates that user input is required.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    required: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-label</code> should wrap, when there is not enough space.
     * <br><br>
     * <b>Note:</b> By default the text would truncate.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    wrap: {
      type: Boolean
    },

    /**
     * Defines whether semi-colon is added to the <code>ui5-label</code> text.
     * <br><br>
     * <b>Note:</b> Usually used in forms.
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    showColon: {
      type: Boolean
    },

    /**
     * Defines the labeled input by providing its ID.
     * <br><br>
     * <b>Note:</b> Can be used with both <code>ui5-input</code> and native input.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    "for": {
      type: String
    }
  },
  slots:
  /** @lends sap.ui.webcomponents.main.Label.prototype */
  {
    /**
     * Defines the text of the <code>ui5-label</code>.
     * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    "default": {
      type: Node
    }
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label,
 * providing valuable information to the user.
 * Usually it is placed next to a value holder, such as a text field.
 * It informs the user about what data is displayed or expected in the value holder.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrap</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Label
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-label
 * @public
 */

class Label extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _LabelTemplateLit.default;
  }

  static get styles() {
    return _LabelCss.default;
  }

  _onclick() {
    const elementToFocus = document.getElementById(this.for);

    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

}

Label.define();
var _default = Label;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/UI5Element.js":"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js","./generated/templates/LabelTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/generated/templates/LabelTemplate.lit.js","./generated/themes/Label.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/Label.css.js"}],"../node_modules/@ui5/webcomponents/dist/generated/themes/Carousel.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Themes = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js");

var _parametersBundleCss = _interopRequireDefault(require("@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"));

var _parametersBundleCss2 = _interopRequireDefault(require("./sap_fiori_3/parameters-bundle.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Themes.registerThemeProperties)("@ui5/webcomponents-theme-base", "sap_fiori_3", _parametersBundleCss.default);
(0, _Themes.registerThemeProperties)("@ui5/webcomponents", "sap_fiori_3", _parametersBundleCss2.default);
var _default = ":host(:not([hidden])){display:inline-block}:host{width:100%;min-width:15.5rem;height:100%}.ui5-carousel-root:focus{outline:1px dotted var(--sapContent_FocusColor)}.ui5-carousel-root{height:inherit;position:relative;display:flex;flex-direction:column;align-items:center}.ui5-carousel-viewport{width:100%;height:inherit;position:relative;display:flex;flex-direction:column;align-items:flex-start;overflow:hidden}.ui5-carousel-viewport.ui5-carousel-viewport--single{align-items:center}.ui5-carousel-content{height:100%;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;background:var(--sapBackgroundColor);transition:transform .5s cubic-bezier(.46,0,.44,1);will-change:transform}.ui5-carousel-content.ui5-carousel-content-no-animation{transition:none}.ui5-carousel-content.ui5-carousel-content-has-navigation{height:calc(100% - 2.75rem)}.ui5-carousel-content.ui5-carousel-content-has-navigation.ui5-carousel-content-has-navigation-and-buttons{height:calc(100% - 3.5rem)}.ui5-carousel-item{height:100%;display:flex;align-items:center;justify-content:center;padding:0 .75rem;box-sizing:border-box;transition:visibility .5s linear;will-change:visibility}.ui5-carousel-item--hidden{visibility:hidden}.ui5-carousel-navigation-arrows{width:100%;padding:0 1.5rem;position:absolute;top:calc(50% - 2.5rem);left:0;display:flex;justify-content:space-between;box-sizing:border-box;pointer-events:none}.ui5-carousel-navigation-arrows>[ui5-button]{pointer-events:all}.ui5-carousel-navigation-wrapper{width:100%;height:2.75rem;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor)}.ui5-carousel-navigation-wrapper.ui5-carousel-navigation-with-buttons{height:3.5rem}.ui5-carousel-navigation-button{width:var(--ui5_carousel_button_size);height:var(--ui5_carousel_button_size);border-radius:50%;box-shadow:none;cursor:pointer;outline-offset:.1rem}.ui5-carousel-navigation-button--hidden{visibility:hidden;padding:0}.ui5-carousel-navigation{width:9rem;height:2rem;display:flex;justify-content:center;align-items:center}.ui5-carousel-navigation-dot{width:var(--ui5_carousel_width);height:var(--ui5_carousel_height);margin:var(--ui5_carousel_margin);border-radius:50%;background-color:var(--ui5_carousel_dot_background);border:var(--ui5_carousel_dot_border);transition:background-color .1s ease-in}.ui5-carousel-navigation-dot[active]{width:.5rem;height:.5rem;margin:0 .25rem;background-color:var(--sapSelectedColor);border:var(--ui5_carousel_dot_border)}";
exports.default = _default;
},{"@ui5/webcomponents-base/dist/asset-registries/Themes.js":"../node_modules/@ui5/webcomponents-base/dist/asset-registries/Themes.js","@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js","./sap_fiori_3/parameters-bundle.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js"}],"../node_modules/@ui5/webcomponents/dist/Carousel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/dist/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js"));

var _Integer = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/Integer.js"));

var _Keys = require("@ui5/webcomponents-base/dist/Keys.js");

var _i18nBundle = require("@ui5/webcomponents-base/dist/i18nBundle.js");

var _ScrollEnablement = _interopRequireDefault(require("@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js"));

var _ResizeHandler = _interopRequireDefault(require("@ui5/webcomponents-base/dist/delegate/ResizeHandler.js"));

var _Device = require("@ui5/webcomponents-base/dist/Device.js");

var _AnimationMode = _interopRequireDefault(require("@ui5/webcomponents-base/dist/types/AnimationMode.js"));

var _AnimationMode2 = require("@ui5/webcomponents-base/dist/config/AnimationMode.js");

var _i18nDefaults = require("./generated/i18n/i18n-defaults.js");

var _CarouselArrowsPlacement = _interopRequireDefault(require("./types/CarouselArrowsPlacement.js"));

var _CarouselTemplateLit = _interopRequireDefault(require("./generated/templates/CarouselTemplate.lit.js"));

require("@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js");

require("@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js");

var _Button = _interopRequireDefault(require("./Button.js"));

var _Label = _interopRequireDefault(require("./Label.js"));

var _CarouselCss = _interopRequireDefault(require("./generated/themes/Carousel.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-carousel",
  languageAware: true,
  properties:
  /** @lends sap.ui.webcomponents.main.Carousel.prototype */
  {
    /**
     * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    cyclic: {
      type: Boolean
    },

    /**
     * Sets the number of items per page on small size (up to 640px). One item per page shown by default.
     * @type {Integer}
     * @defaultvalue 1
     * @public
     */
    itemsPerPageS: {
      type: _Integer.default,
      defaultValue: 1
    },

    /**
     * Sets the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
     * @type {Integer}
     * @defaultvalue 1
     * @public
     */
    itemsPerPageM: {
      type: _Integer.default,
      defaultValue: 1
    },

    /**
     * Sets the number of items per page on large size (more than 1024px). One item per page shown by default.
     * @type {Integer}
     * @defaultvalue 1
     * @public
     */
    itemsPerPageL: {
      type: _Integer.default,
      defaultValue: 1
    },

    /**
     * If set to true the navigation is hidden.
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    hideNavigation: {
      type: Boolean
    },

    /**
     * Defines the index of the initially selected item.
     * @type {Integer}
     * @defaultvalue 0
     * @public
     */
    selectedIndex: {
      type: _Integer.default,
      defaultValue: 0
    },

    /**
     * Defines when the <code>load-more</code> event is thrown. If not applied the event will not be thrown.
     * @type {Integer}
     * @defaultvalue 1
     * @public
     * @since 1.0.0-rc.8
     */
    infiniteScrollOffset: {
      type: _Integer.default,
      defaultValue: 1
    },

    /**
     * Defines the position of arrows.
     * <br><br>
     * Available options are:
     * <ul>
     * <li><code>Content</code></li>
     * <li><code>Navigation</code></li>
     * </ul>
     * <br>
     * When set to "Content", the arrows are placed on the sides of the current page.
     * <br>
     * When set to "Navigation", the arrows are placed on the sides of the page indicator.
     * @type {CarouselArrowsPlacement}
     * @defaultvalue "Content"
     * @public
     */
    arrowsPlacement: {
      type: _CarouselArrowsPlacement.default,
      defaultValue: _CarouselArrowsPlacement.default.Content
    },

    /**
     * Defines the carousel width in pixels
     * @private
     */
    _width: {
      type: _Integer.default
    },

    /**
     * Defines the carousel item width in pixels
     * @private
     */
    _itemWidth: {
      type: _Integer.default
    }
  },
  managedSlots: true,
  slots:
  /** @lends sap.ui.webcomponents.main.Carousel.prototype */
  {
    /**
     * Defines the content of the <code>ui5-carousel</code>.
     * @type {HTMLElement[]}
     * @slot
     * @public
     */
    "default": {
      propertyName: "content",
      type: HTMLElement,
      individualSlots: true
    }
  },
  events:
  /** @lends sap.ui.webcomponents.main.Carousel.prototype */
  {
    /**
     * Fired whenever the <code>selectedIndex</code> changes due to user interaction,
     * when the user clicks on the navigation arrows or while resizing,
     * based on the <code>items-per-page-l</code>, <code>items-per-page-m</code> and <code>items-per-page-s</code> properties.
     *
     * @event
     * @param {Integer} selectedIndex the current <code>selectedIndex</code>.
     * @public
     * @since 1.0.0-rc.7
     */
    navigate: {
      detail: {
        selectedIndex: {
          type: _Integer.default
        }
      }
    },

    /**
     * Fired for the last items of the <code>ui5-carousel</code> if it is scrolled and the direction of scrolling is to the end.
     * The number of items for which the event is thrown is controlled by the <code>infiniteScrollOffset</code> property.
     * @event sap.ui.webcomponents.main.Carousel#load-more
     * @public
     * @since 1.0.0-rc.8
     */
    "load-more": {}
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The carousel allows the user to browse through a set of items by swiping right or left.
 * The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * <h3>Usage</h3>
 *
 * When to use
 *
 * - The items you want to display are very different from each other.
 * - You want to display the items one after the other.
 * When not to use
 *
 * - The items you want to display need to be visible at the same time.
 * - The items you want to display are uniform and very similar
 *
 * For the <code>ui5-carousel</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Carousel.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Carousel
 * @extends UI5Element
 * @tagname ui5-carousel
 * @since 1.0.0-rc.6
 * @public
 */

class Carousel extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get styles() {
    return _CarouselCss.default;
  }

  static get template() {
    return _CarouselTemplateLit.default;
  }

  static get pageTypeLimit() {
    return 9;
  }

  constructor() {
    super();
    this._scrollEnablement = new _ScrollEnablement.default(this);

    this._scrollEnablement.attachEvent("touchend", event => {
      this._updateScrolling(event);
    });

    this.i18nBundle = (0, _i18nBundle.getI18nBundle)("@ui5/webcomponents");
    this._onResizeBound = this._onResize.bind(this);
    this._resizing = false; // indicates if the carousel is in process of resizing
  }

  onBeforeRendering() {
    this.validateSelectedIndex();
  }

  onAfterRendering() {
    this._scrollEnablement.scrollContainer = this.getDomRef();
    this._resizing = false; // not invalidating
  }

  onEnterDOM() {
    _ResizeHandler.default.register(this, this._onResizeBound);
  }

  onExitDOM() {
    _ResizeHandler.default.deregister(this, this._onResizeBound);
  }

  validateSelectedIndex() {
    if (!this.isIndexInRange(this.selectedIndex)) {
      this.selectedIndex = 0;
      console.warn(`The "selectedIndex" is out of range, changed to: ${0}`); // eslint-disable-line
    }
  }

  _onResize() {
    const previousItemsPerPage = this.effectiveItemsPerPage; // Set the resizing flag to suppress animation while resizing

    this._resizing = true; // Change transitively effectiveItemsPerPage by modifying _width

    this._width = this.offsetWidth;
    this._itemWidth = Math.floor(this._width / this.effectiveItemsPerPage); // Items per page did not change or the current,
    // therefore page index does not need to be re-adjusted

    if (this.effectiveItemsPerPage === previousItemsPerPage) {
      return;
    }

    if (this.selectedIndex > this.pagesCount - 1) {
      this.selectedIndex = this.pagesCount - 1;
      this.fireEvent("navigate", {
        selectedIndex: this.selectedIndex
      });
    }
  }

  _updateScrolling(event) {
    if (!event) {
      return;
    }

    if (event.isLeft) {
      this.navigateLeft();
    } else if (event.isRight) {
      this.navigateRight();
    }
  }

  _onkeydown(event) {
    if (event.target !== this.getDomRef()) {
      return;
    }

    if ((0, _Keys.isLeft)(event) || (0, _Keys.isDown)(event)) {
      this.navigateLeft();
    } else if ((0, _Keys.isRight)(event) || (0, _Keys.isUp)(event)) {
      this.navigateRight();
    }
  }

  navigateLeft() {
    this._resizing = false;
    const peviousSelectedIndex = this.selectedIndex;

    if (this.selectedIndex - 1 < 0) {
      if (this.cyclic) {
        this.selectedIndex = this.pagesCount - 1;
      }
    } else {
      --this.selectedIndex;
    }

    if (peviousSelectedIndex !== this.selectedIndex) {
      this.fireEvent("navigate", {
        selectedIndex: this.selectedIndex
      });
    }
  }

  navigateRight() {
    this._resizing = false;
    const peviousSelectedIndex = this.selectedIndex;

    if (this.selectedIndex + 1 > this.pagesCount - 1) {
      if (this.cyclic) {
        this.selectedIndex = 0;
      } else {
        return;
      }
    } else {
      ++this.selectedIndex;
    }

    if (peviousSelectedIndex !== this.selectedIndex) {
      this.fireEvent("navigate", {
        selectedIndex: this.selectedIndex
      });
    }

    if (this.pagesCount - this.selectedIndex <= this.infiniteScrollOffset + 1) {
      this.fireEvent("load-more");
    }
  }
  /**
   * Assuming that all items have the same width
   * @private
   */


  get items() {
    return this.content.map((item, idx) => {
      return {
        id: `${this._id}-carousel-item-${idx + 1}`,
        item,
        tabIndex: idx === this.selectedIndex ? "0" : "-1",
        posinset: idx + 1,
        setsize: this.content.length,
        width: this._itemWidth,
        classes: this.isItemInViewport(idx) ? "" : "ui5-carousel-item--hidden"
      };
    });
  }

  get effectiveItemsPerPage() {
    if (this._width <= 640) {
      return this.itemsPerPageS;
    }

    if (this._width <= 1024) {
      return this.itemsPerPageM;
    }

    return this.itemsPerPageL;
  }

  isItemInViewport(index) {
    return index >= this.selectedIndex && index <= this.selectedIndex + this.effectiveItemsPerPage - 1;
  }

  isIndexInRange(index) {
    return index >= 0 && index <= this.pagesCount - 1;
  }

  get styles() {
    return {
      content: {
        transform: `translateX(${this._isRTL ? "" : "-"}${this.selectedIndex * this._itemWidth}px`
      }
    };
  }

  get classes() {
    return {
      viewport: {
        "ui5-carousel-viewport--single": this.pagesCount === 1
      },
      content: {
        "ui5-carousel-content": true,
        "ui5-carousel-content-no-animation": this.supressAimation,
        "ui5-carousel-content-has-navigation": this.showNavigationArrows,
        "ui5-carousel-content-has-navigation-and-buttons": this.showNavigationArrows && this.arrowsPlacement === _CarouselArrowsPlacement.default.Navigation
      },
      navigation: {
        "ui5-carousel-navigation-wrapper": true,
        "ui5-carousel-navigation-with-buttons": this.showNavigationArrows && this.arrowsPlacement === _CarouselArrowsPlacement.default.Navigation
      },
      navPrevButton: {
        "ui5-carousel-navigation-button--hidden": !this.hasPrev
      },
      navNextButton: {
        "ui5-carousel-navigation-button--hidden": !this.hasNext
      }
    };
  }

  get pagesCount() {
    const items = this.content.length;
    return items > this.effectiveItemsPerPage ? items - this.effectiveItemsPerPage + 1 : 1;
  }

  get isPageTypeDots() {
    return this.pagesCount < Carousel.pageTypeLimit;
  }

  get dots() {
    const dots = [];
    const pages = this.pagesCount;

    for (let index = 0; index < pages; index++) {
      dots.push({
        active: index === this.selectedIndex,
        ariaLabel: this.i18nBundle.getText(_i18nDefaults.CAROUSEL_DOT_TEXT, [index + 1], [pages])
      });
    }

    return dots;
  }

  get arrows() {
    const showArrows = this.showNavigationArrows && (0, _Device.isDesktop)();
    return {
      content: showArrows && this.arrowsPlacement === _CarouselArrowsPlacement.default.Content,
      navigation: showArrows && this.arrowsPlacement === _CarouselArrowsPlacement.default.Navigation
    };
  }

  get hasPrev() {
    return this.cyclic || this.selectedIndex - 1 >= 0;
  }

  get hasNext() {
    return this.cyclic || this.selectedIndex + 1 <= this.pagesCount - 1;
  }

  get supressAimation() {
    return this._resizing || (0, _AnimationMode2.getAnimationMode)() === _AnimationMode.default.None;
  }

  get _isRTL() {
    return this.effectiveDir === "rtl";
  }

  get selectedIndexToShow() {
    return this._isRTL ? this.pagesCount - (this.pagesCount - this.selectedIndex) + 1 : this.selectedIndex + 1;
  }

  get showNavigationArrows() {
    return !this.hideNavigation && this.pagesCount > 1;
  }

  get ofText() {
    return this.i18nBundle.getText(_i18nDefaults.CAROUSEL_OF_TEXT);
  }

  get ariaActiveDescendant() {
    return this.content.length ? `${this._id}-carousel-item-${this.selectedIndex + 1}` : undefined;
  }

  static get dependencies() {
    return [_Button.default, _Label.default];
  }

  static async onDefine() {
    await (0, _i18nBundle.fetchI18nBundle)("@ui5/webcomponents");
  }

}

Carousel.define();
var _default = Carousel;
exports.default = _default;
},{"@ui5/webcomponents-base/dist/UI5Element.js":"../node_modules/@ui5/webcomponents-base/dist/UI5Element.js","@ui5/webcomponents-base/dist/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/dist/renderer/LitRenderer.js","@ui5/webcomponents-base/dist/types/Integer.js":"../node_modules/@ui5/webcomponents-base/dist/types/Integer.js","@ui5/webcomponents-base/dist/Keys.js":"../node_modules/@ui5/webcomponents-base/dist/Keys.js","@ui5/webcomponents-base/dist/i18nBundle.js":"../node_modules/@ui5/webcomponents-base/dist/i18nBundle.js","@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js":"../node_modules/@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js","@ui5/webcomponents-base/dist/delegate/ResizeHandler.js":"../node_modules/@ui5/webcomponents-base/dist/delegate/ResizeHandler.js","@ui5/webcomponents-base/dist/Device.js":"../node_modules/@ui5/webcomponents-base/dist/Device.js","@ui5/webcomponents-base/dist/types/AnimationMode.js":"../node_modules/@ui5/webcomponents-base/dist/types/AnimationMode.js","@ui5/webcomponents-base/dist/config/AnimationMode.js":"../node_modules/@ui5/webcomponents-base/dist/config/AnimationMode.js","./generated/i18n/i18n-defaults.js":"../node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js","./types/CarouselArrowsPlacement.js":"../node_modules/@ui5/webcomponents/dist/types/CarouselArrowsPlacement.js","./generated/templates/CarouselTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/generated/templates/CarouselTemplate.lit.js","@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js":"../node_modules/@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js","@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js":"../node_modules/@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js","./Button.js":"../node_modules/@ui5/webcomponents/dist/Button.js","./Label.js":"../node_modules/@ui5/webcomponents/dist/Label.js","./generated/themes/Carousel.css.js":"../node_modules/@ui5/webcomponents/dist/generated/themes/Carousel.css.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("@ui5/webcomponents/dist/Button");

require("@ui5/webcomponents/dist/Avatar.js");

require("@ui5/webcomponents/dist/Carousel.js");
},{"@ui5/webcomponents/dist/Button":"../node_modules/@ui5/webcomponents/dist/Button.js","@ui5/webcomponents/dist/Avatar.js":"../node_modules/@ui5/webcomponents/dist/Avatar.js","@ui5/webcomponents/dist/Carousel.js":"../node_modules/@ui5/webcomponents/dist/Carousel.js"}],"../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61422" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map