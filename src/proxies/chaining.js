import isA from './isA';

/***************************
 Chaining
 ***************************/
const chain = func => new Proxy( func, {
    get ( target, key, proxy )
    {
        const prop = Reflect.get( target, key );
        return isA.function( prop )
            ? ( ...args ) => {
                return prop( ...args ) || proxy;
            }
            : prop;
    }
} );


/*
const _d = chain( document );
_d
    .addEventListener( 'click', () => console.log( 'click' ) )
    .addEventListener( 'mousemove', () => console.log( 'move' ) )

const x = `
    expect( x ).not.toBe.Truthy()
    expect( x ).not.toBe.Equal()
    expect( x ).not.toBe()
    expect( x ).not.toBe.String()
    x\` -> y\`
`
*/

export default chain;
