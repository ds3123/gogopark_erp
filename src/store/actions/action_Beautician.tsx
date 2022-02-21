
import React from "react"
import { Dispatch } from "redux";


/* @  美容師專區  */


// # 設定 _ 資料庫中，某服務單，已有的點選時間紀錄
export const set_Existing_Time_Records = ( records : any[] ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                  : "SET_EXISTING_TIME_RECORDS" ,
            Existing_Time_Records : records
        }) ;

    } ;

} ;


// # 設定 _ 所點選 : 美容師
export const set_Current_Beautician = ( beautician : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_BEAUTICIAN" ,
            currentBeautician : beautician
        }) ;

    } ;

} ;


// # 設定 _ 所點選 : 寵物 ( 左側 )
export const set_Current_Pet = ( pet : any ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type       : "SET_CURRENT_PET" ,
            currentPet : pet
        }) ;

    } ;

} ;


// # 設定 _ 所點選 : 寵物 --> 已處理完畢
export const set_Current_Pet_Is_Done = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                : "SET_CURRENT_PET_IS_DONE" ,
                    Current_Pet_Is_Done : bool
                }) ;

           } ;

} ;

