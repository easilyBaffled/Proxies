import React from 'react';
import { CodePane, Slide } from 'spectacle';
import { stripIndent } from 'common-tags';

import { addLineNumbers } from '../../../util';

import Trick from './trick';

export default (
    <Slide background='linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)'>
        <CodePane
            transition={[ 'slide' ]}
            transitionDuration={800}
            lang='javascript'
            source={addLineNumbers( stripIndent`
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
                ` )}
        />
        <Trick />
    </Slide>
);
