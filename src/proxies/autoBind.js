import isA from './isA';

/**************
 AutoBind - http://2ality.com/2013/06/auto-binding.html
 may be too complext to talk about
 ***************/
const autoBind = obj =>
    new Proxy( obj, {
    // Talk about target vs receiver
    /*
        The wrapped object returned by autoBind may not be the first member in a chain of prototype objects.
        Then it only receives a get notification if the property hasn’t been found in a prior object.
        Thus, the result (*) must come from target. In contrast, this must be bound to receiver (**),
        so that the bound method has access to properties of prior objects.
    */
        get ( target, key, receiver ) 
        {
            const result = target[ key ]; // *
            return isA.function( result )
                ? result.bind( receiver ) // **
                : result;
        }
    } );

export default autoBind;

/*
const obj = {
    x: 1,
    incrimentX()
    {
        this.x += 1;
        return this.x;
    },
    getX: function ()
    {
        return this.x
    },
    troubleMaker: () => this.x
}

logOutput( obj.getX() )
logOutput( obj.incrimentX() )
const { incrimentX, getX } = obj;
logOutput( { incrimentX: incrimentX(), getX: getX() } );

const boundObj = autoBind( obj )
const { incrimentX: boundInc, getX: boundGet, troubleMaker } = boundObj;
logOutput( {
    boundInc: boundInc(),
    boundGet: boundGet(),
    troubleMaker: troubleMaker()
} );


ReactDOM.render(<Log output={output} />, document.getElementById("autoBind"));
output = [];
*/
