
import React from "react"



// 產生一系列序號 Ex. 01、02、03...
export const useSerial = ( start : number , end : number ) => {

    let serialArr = [] ;

    for( let i : any = start ; i <= end ; i++ ){
        serialArr.push(i)
    }

    return serialArr ;

} ;