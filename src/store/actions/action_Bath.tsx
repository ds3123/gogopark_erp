
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 洗澡價格
export const set_Bath_Price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type  : "SET_BATH_PRICE" ,
                    price : price
                }) ;

           } ;

} ;
