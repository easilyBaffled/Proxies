/***************************
 Negative Array Access
 ***************************/
const addWrap = arr =>
    new Proxy( arr, {
        get ( target, index ) 
        {
            return index.startsWith( '-' )
                ? target[ target.length + parseInt( index ) ]
                : target[ index ];
        }
    } );

// const nums = [ 4, 5, 6, 9, 8 ];
// nums[ -1 ]

export default addWrap;
