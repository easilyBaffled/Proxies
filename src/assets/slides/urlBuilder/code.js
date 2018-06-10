import { improve } from '../../../proxies';

export default log =>
{
    // #### History
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

    // #### Boring
    urlBuilder.addParam( 'a' );
    urlBuilder.addParam( 'b' );
    log( urlBuilder.getUrl() );
    // -> /a/b

    // #### The Start
    const builder = improve( urlBuilder );
    // new same, same builder

    // #### Nothing Up my Sleeves
    builder.addParam( 'a' );
    builder.addParam( 'b' );
    log( builder.getUrl() );
    // -> /a/b/a/b

    log( Object.keys( builder ) );
    // -> [ 'url', 'addParam', 'getUrl' ]

    // #### Things get weird
    log( builder.c );  // -> undefined ?
    // -> () => (
    //      target.addParam( name ),
    //      p
    // );

    // #### curiouser and curiouser
    log( builder.d().e().f().getUrl() ); // -> ?
    // -> /d/e/f

    // #### It's a witch!
    log( 'd' in builder, 'e' in builder );
    // -> false, false

    // #### Nothing is the same
    log( 'addParam' in builder );
    // -> undefined

    log( Object.getOwnPropertyDescriptor( builder, 'url' ) );
    // -> undefined
};

