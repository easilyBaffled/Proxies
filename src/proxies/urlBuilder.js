function urlBuilder ( domain ) 
{
    var parts = [];
    var proxy = new Proxy(
        function () 
        {
            var returnValue = domain + '/' + parts.join( '/' );
            parts = [];
            return returnValue;
        },
        {
            has: function () 
            {
                return true;
            },
            get: function ( object, prop ) 
            {
                parts.push( prop );
                return proxy;
            }
        }
    );
    return proxy;
}
/*
var google = urlBuilder('http://google.com');
const x = google.search.products.bacon.and.eggs() === 'http://google.com/search/products/bacon/and/eggs')
*/

export default urlBuilder;
