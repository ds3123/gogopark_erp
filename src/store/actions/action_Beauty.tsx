


import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 美容價格
export const set_Beauty_Price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type  : "SET_BEAUTY_PRICE" ,
                    price : price
                }) ;

           } ;

} ;
