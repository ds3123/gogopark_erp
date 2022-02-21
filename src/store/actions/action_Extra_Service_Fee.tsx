
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 各項服務自行增減費用
export const set_Self_Adjust_Amount = ( amount : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                                  type   : "SET_SELF_ADJUST_AMOUNT" ,
                                  amount : amount
                                }) ;

            } ;

} ;


// # 設定 _ 加價項目費用
export const set_Extra_Item_Fee = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type  : "SET_EXTRA_ITEM_FEE" ,
            price : price
        }) ;

    } ;

} ;


// # 設定 _ 加價美容費用
export const set_Extra_Beauty_Fee = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type  : "SET_EXTRA_BEAUTY_FEE" ,
            price : price
        }) ;

    } ;

} ;




// # 設定 _ 接送費
export const set_PickupFee = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type  : "SET_PICKUP_FEE" ,
            price : price
        }) ;

    } ;

} ;