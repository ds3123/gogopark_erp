
import React from "react" ;
import { Dispatch } from "redux";


/* @ 安親 */


// # 設定 _ 安親頁資料 _ 是否下載中
export const set_Care_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type           : "SET_CARE_ISLOADING" ,
                    Care_isLoading : bool
                }) ;

           } ;

} ;



// # 設定 _ 目前所使用的安親類型
export const set_current_care_type = ( type : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_CARE_TYPE" ,
            current_Care_Type : type
        }) ;

    } ;

} ;


// # 設定 _ 一般安親費用
export const set_care_ordinary_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                : "SET_CARE_ORDINARY_PRICE" ,
            Care_Ordinary_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 住宿 : 提早抵達
export const set_care_ahead_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type             : "SET_CARE_AHEAD_PRICE" ,
            Care_Ahead_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 住宿 : 延後帶走
export const set_care_postpone_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                : "SET_CARE_POSTPONE_PRICE" ,
            Care_Postpone_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 預計 _ 安親結束時間 ( for 一般安親 )
export const set_expect_care_end_time = ( time : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                 : "SET_EXPECT_CARE_END_TIME" ,
                    expect_Care_End_Time : time
                }) ;

           } ;

} ;

