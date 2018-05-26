/*eslint no-unused-expressions: 0*/

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Presentation from './Presentation';
import { trick, isA, protectProps } from './proxies';

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
// registerServiceWorker();
const urlBuilder = {
    url: [],
    addParam ( str )
    {
        this.url.push( str );
    },
    getUrl ()
    {
        return '/' + this.url.join( '/' );
    }
};

// magic.addParam( 'a' );
// magic.addParam( 'b' );
// console.log( magic.getUrl() );

// console.log( magic.c );
// console.log( magic.d().e().f().getUrl() );
// console.log( 'd' in magic, 'addParam' in magic );
// console.log( magic );

/* Small examples
* Negative Array Access
* Array in - https://github.com/gergob/jsProxy/blob/master/06-array-in.js
* Singleton - https://github.com/gergob/jsProxy/blob/master/07-singleton-pattern.js
*/

const slides = [
    () => 
    {
        // ===== Setup
        const urlBuilder = {
            url: [],
            addParam ( str )
            {
                this.url.push( str );
            },
            getUrl ()
            {
                return '/' + this.url.join( '/' );
            }
        };

        const builder = trick( urlBuilder );
        // ===== The Pledge
        console.log( Object.keys( builder ) );
        builder.addParam( 'a' );
        builder.addParam( 'b' );
        console.log( builder.getUrl() );
        // ====== The Turn
        console.log( builder.c );  // -> undefined ?
        // ====== The Turn Around
        console.log( builder.c );  // -> undefined ?
        console.log( builder.d().e().f().getUrl() );
        // ====== The Prestige
        console.log( 'd' in builder, 'e' in builder );
        console.log( 'addParam' in builder );
        console.log( Object.getOwnPropertyDescriptor( builder, 'url' ) );
    },
    {
        img: 'penn and teller: ball and cup',
        notes: 'magic bends reality, subverts understanding, mystefies the audiance',
        source: 'https://www.youtube.com/watch?v=8osRaFTtgHo'
    },
    {
        img: 'penn and teller blast off clear box: ball and cup',
        notes: 'once you know how it\'s done you see the mechanics, the work the control',
        source: 'https://www.youtube.com/watch?v=8osRaFTtgHo'
    },
    {
        img: 'mdn proxy',
        notes: 'it is a well detailed part of regular js, just nobdy seems to know aobut it, which is fine since it\'s invisible, ...'
    },
    {
        img: 'usablilty charts',
        notes: 'you can use it, but you can\'t babel it'
    },
    {
        img: 'list of traps',
        notes: 'how it works'
    },
    () => 
    {
        // ====== Things Before Proxies Prestige
        const urlBuilder = {
            url: [],
            addParam ( str )
            {
                this.url.push( str );
            },
            getUrl ()
            {
                return '/' + this.url.join( '/' );
            }
        };

        urlBuilder.c;
        // -> undefined
        urlBuilder.c.d;
        // -> Uncaught TypeError: Cannot read property 'd' of undefined
        urlBuilder.c();
        // -> Uncaught TypeError: urlBuilder.c is not a function
        urlBuilder.c[ urlBuilder.d ];
        // -> Uncaught TypeError: Cannot read property 'undefined' of undefined
    },
    () => 
    {
        // ====== A.B.T.
        const urlBuilder = {
            url: [],
            addParam ( str )
            {
                this.url.push( str );
            },
            getUrl ()
            {
                return '/' + this.url.join( '/' );
            }
        };

        const loudBuilder = new Proxy( urlBuilder, {
            get ( target, name, proxy )
            {
                const res = target[ name ];
                if ( res )
                    return res;
                throw new TypeError( `${name} is not in ${target}` );

            }
        } );

        console.log( loudBuilder.c );
        // -> Uncaught TypeError: c is not in [object Object]
        console.log( loudBuilder.c() );
        // -> Uncaught TypeError: c is not in [object Object]

    },
    ( key ) => 
    {
        // ====== Lucky Switch
        switch ( key )
        {
        case 'a':
            return 1;
        case 'b':
            return 2;
        case 'c':
            return 3;
        default:
            0;
        }
    },
    () => 
    {
        const urlBuilder = {
            url: [],
            addParam ( str )
            {
                this.url.push( str );
            },
            getUrl ()
            {
                return '/' + this.url.join( '/' );
            }
        };

        const defaultBuilder = new Proxy( urlBuilder, {
            get ( target, name, proxy )
            {
                const res = target[ name ];
                if ( res )
                    return res;
                return () => (                // Because of the ( ... )
                    target.addParam( name ), // <- this gets run
                    proxy                   // <- this gets returned
                );
            }
        } );
        defaultBuilder.c;
        // -> () => (
        //        target.addParam( name ),
        //        proxy
        //    );
        defaultBuilder.c();
        defaultBuilder.d();
        defaultBuilder.getUrl();
        // -> "/c/d"
        urlBuilder.getUrl();
        // -> "/c/d"
    },
    {
        // Type-Detect github image
    },
    {
        // ====== Making a whole lot of something out of nothing
        // isA
    },
    () => 
    {
        // ====== Moving On
        // ====== This is not too helpful
        const loudBuilder = new Proxy( urlBuilder, {
            get ( target, name, proxy )
            {
                const res = target[ name ];
                if ( res )
                    return res;
                throw new TypeError( `${name} is not in ${target}` );

            }
        } );
    },
    () => 
    {
        // ====== 💥Boom💥
        const isEven = num => !( parseInt( num ) % 2 );

        function finagleSomeNumbers ( target ) 
        {
            return target
                .map( JSON.parse )
                .filter( isEven )
                .join( ' | ' );
        }
        finagleSomeNumbers( [ '1', '2', '3', '4' ] );
        // -> 2 | 4
        finagleSomeNumbers( {} );
        // -> Uncaught TypeError: target.map is not a function
        finagleSomeNumbers( [] );
        // -> Uncaught ReferenceError: isEven is not defined
        finagleSomeNumbers( [ 1, 2, 3 ] );
        // -> Uncaught SyntaxError: Unexpected number
        finagleSomeNumbers( [ 'a', 'b' ] );
        // -> VM323:1 Uncaught SyntaxError: Unexpected token a in JSON at position 0
        finagleSomeNumbers( new Proxy( {},
            {
                get: () => 
                {
                    throw new Error( 'boom' ); 
                }
            }
        ) );
        // -> Uncaught Error: boom
    },
    () => 
    {
        const isEven = num => !( parseInt( num ) % 2 );

        function finagleSomeNumbers ( target )
        {
            if ( isA.array( target ) || !target.every( isA.string ) ) // 😑
                return '';

            const parsed = target.map( JSON.parse );

            return parsed.every( isA.number ) // 🤢
                ? parsed.filter( isEven ).join( ' | ' )
                : '';
        }
    },
    {
        // undefined
    },
    {
        // ====== We Just Used Apply
        // MDN Apply Docs
    },
    {
        // event recorder
    },
    {
        // ====== Transition to Set
        // MDN Set Docs
    },
    {
        // observable
    },
    {
        // ====== Another Set Example immer
        // Screenshot of immer Github
    },
    {
        // private with _
    },
    {
        // password
    },
    {
        // those were a lot of traps, here to see them in action
    }
];
