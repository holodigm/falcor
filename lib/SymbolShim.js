var objectTypes = {
    "boolean": false,
    "function": true,
    "object": true,
    "number": false,
    "string": false,
    "undefined": false
};

/*eslint-disable */
var _root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
var freeGlobal = objectTypes[typeof global] && global;

if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    _root = freeGlobal;
}
/*eslint-enable */

var _id = 0;

function ensureSymbol(root) {
    if (!root.Symbol) {
        root.Symbol = function symbolFuncPolyfill(description) {
            return "@@Symbol(" + description + "):" + (_id++) + "}";
        };
    }
    return root.Symbol;
}

function ensureObservable(Symbol) {
    /* eslint-disable dot-notation */
    if (!Symbol.observable) {
        if (typeof Symbol.for === "function") {
            Symbol["observable"] = Symbol.for("observable");
        } else {
            Symbol["observable"] = "@@observable";
        }
    }
    /* eslint-disable dot-notation */
}

function symbolForPolyfill(key) {
    return "@@" + key;
}

function ensureFor(Symbol) {
    /* eslint-disable dot-notation */
    if (!Symbol.for) {
        Symbol["for"] = symbolForPolyfill;
    }
    /* eslint-enable dot-notation */
}


function polyfillSymbol(root) {
    var Symbol = ensureSymbol(root);
    ensureObservable(Symbol);
    ensureFor(Symbol);
    return Symbol;
}

module.exports = polyfillSymbol(_root);
