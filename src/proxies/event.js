const evt = [];
const eventAggregator = func => new Proxy( func, {
    apply ( target, thisArg, argumentsList  ) {
        console.log( argumentsList[ 0 ] );
        evt.push( argumentsList[ 0 ] );
        return Reflect.apply( target, thisArg, argumentsList );
    }
} );

// HTMLElement.prototype.addEventListener = new Proxy(
//     HTMLElement.prototype.addEventListener,
//     {
//         apply ( ...args ) {
//             args[ 2 ][ 1 ] = eventAggregator( args[ 2 ][ 1 ] );
//             return Reflect.apply( ...args );
//         }
//     }
// );

// document.getElementById( 'root' ).addEventListener( 'click', () => console.log( 'root clicked' ) );

// setTimeout(
//     () => evt.forEach( event => {
//         event.target.dispatchEvent( event );
//     } ),
//     3000
// );
//
// setTimeout(
//     () => evt.forEach( event => {
//         event.target.dispatchEvent( event );
//     } ),
//     5000
// );
//
