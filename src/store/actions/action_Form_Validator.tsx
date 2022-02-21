
import React from "react" ;
import { Dispatch } from "redux";


// @ 自訂 _ 表單驗證邏輯



// # 設定 _ 因方案 ( 包月洗澡、包月美容 ) 條件不符，導致表單無效
export const set_Invalid_To_Plan = ( bool : boolean ) => {
    
    return ( dispatch : Dispatch ) => {

        dispatch({
            type            : "SET_INVALID_TO_PLAN" ,
            invalid_To_Plan : bool
        }) ;

    } ;

} ;


// # 設定 _ 員工表單是否有效
export const set_Invalid_To_Employee = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
                   type                : "SET_INVALID_TO_EMPLOYEE" ,
                   invalid_To_Employee : bool
                }) ;

    } ;

} ;


// 將表單驗證所有狀態，設回 _ 初始值
export const set_Form_States_To_Default = ( ) => {

    return ( dispatch : Dispatch ) => {

               dispatch({ type : "SET_FORM_STATES_TO_DEFAULT" }) ;

           } ;

} ;


