
import React from "react" ;
import { Dispatch } from "redux";

import axios from "utils/axios";
import moment from "moment";


// # 設定 _ 首頁資料 _ 是否下載中
export const set_Index_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type            : "SET_INDEX_ISLOADING" ,
                    Index_isLoading : bool
                }) ;

           } ;

} ;


// # 設定 _ 首頁詳細模式 ( 展開所有統計資料 )
export const set_Detail_Mode = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type           : "SET_DETAIL_MODE" ,
                    is_Detail_Mode : bool
                }) ;

           } ;

} ;


// # 取得 _ 美容師請求櫃台確認訊息 
export const get_Customer_Confirm = ( today : string ) => {

    return ( dispatch : Dispatch ) => {

             if( today ){    

                axios.get( `/customer_confirms/show_by_service_date/${ today }` ).then( res => {

                    if( res.data.length > 0 ){

                        const filter = res.data.filter( ( x : any ) => ( x['confirm_status'] === '送交櫃台確認' || x['confirm_status'] === '櫃台確認中' )  ) ;
                    
                        dispatch({
                            type             : "GET_CUSTOMER_CONFIRM" ,
                            customer_Confirm : filter
                        }) ;
    
                    }else{

                        dispatch({
                            type             : "GET_CUSTOMER_CONFIRM" ,
                            customer_Confirm : []
                        }) ;

                    }

                }).catch( error => {

                    // console.error(error.response.data);  // 長時間擺著，會抓不到 .data 屬性，顯示錯誤 ( 2022.02.07 )
 
                    console.log( '首頁 _ 客戶確認訊息發生錯誤' , today ) ;
                    
                });

             }    
        
            
           } ;

} ;






