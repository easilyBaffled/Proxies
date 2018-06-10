/*eslint no-unused-expressions: 0*/

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Presentation from './Presentation';
import { trick, isA } from './proxies';

// import registerServiceWorker from './registerServiceWorker';

// TODO: silly names https://www.reddit.com/r/javascript/comments/1v6irn/til_javascript_allows_for_utf8_variable_names_so/

/*
 * Sources
 * - http://exploringjs.com/es6/ch_proxies.html#sec_proxy-use-cases
 * - https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/
 * - https://www.atyantik.com/proxy-javascript-es6-feature/
 * - https://ponyfoo.com/articles/es6-proxies-in-depth
*/

// https://caniuse.com/#feat=proxy
// Not available in IE 🙄

// https://node.green/#ES2015-built-ins-Proxy
// Available in Node 6 which is fine because https://github.com/nodejs/Release Node 4 is no longer maintained. 8 is active now.


/***************************
 Spell Checker
 ***************************/
/*
https://github.com/chaijs/chai/blob/master/lib/chai/utils/proxify.js
Spell check on property access - And if that is not enough to you we can do even better.
When someone accesses a property that does not exist on target you can use an algorithm
like Levenshtein to measure the distance between the accessed property’s name and the name of other
existent properties and then suggest correct possibilities on your error, making it even more informative.

They even memoize the spelling errors so they don't have to keep recalculate the options
*/

/*
const fetchAble = `
    const a = new Fetchable( url )
    a.value.then( ... )
    a.value1.then( ... )
    a.value.then(...) // <- this one was cahced
`
*/

/* Options
* Enum - https://github.com/gergob/jsProxy/blob/master/03-enum-nameof.js
*   get, set, deleteProperty
* */


ReactDOM.render( <Presentation />, document.getElementById( 'root' ) );
