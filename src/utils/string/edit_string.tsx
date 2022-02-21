
import React from "react" ;

/* @ 編輯字串 */



// 擷取 _ 長字串 ( ... )
export const string_Short = ( str : string , length? : number ) : string => {

    if( !length && str.length > 3 )  return str.slice(0,3) +'...' ;

    if( length ) return str.length > length ? str.slice(0,length) +'...' : str

    return str


};