import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import cookie from "react-cookies";


/* @ DELETE : 透過 Ajax _ 刪除資料 */

// 刪除 _ 價格 ( 各項服務 )
export const useDelete_Service_Price = ( ) => {

    const history  = useHistory() ;

    const delete_Service_Price = ( price_id : string ) => {

        // 刪除 _ 單一服務價格
        axios.delete(`/service_prices/${ price_id }` ).then(res => {

            // 刪除成功通知
            toast(`🦄 服務價格刪除成功 : `, { position: "top-left", autoClose: 1500 , hideProgressBar: false,} );

            history.push("/wrongpath");  // 錯誤路徑
            history.push( '/management' );

        }) ;

    } ;

    return delete_Service_Price ;

} ;

// 刪除 _ 寵物品種
export const useDelete_Pet_Species = ( ) => {

    const history  = useHistory() ;

    const delete_Pet_Species = ( species_Id : string ) => {

       // 刪除 _ 單一品種
       axios.delete(`/pet_species/${ species_Id }` ).then(res => {

           // 刪除 成功通知
           toast(`🦄 品種刪除成功 : `, { position: "top-left", autoClose: 1500 , hideProgressBar: false,} );

           // 設定 cookie ( for 前往 : 系統設定 > 寵物品種 / 5 秒後銷毀 )
           cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種'  ,  { path : '/' , maxAge : 5 } ) ;

           history.push("/wrongpath");  // 錯誤路徑
           history.push( '/management' );

       }) ;

    } ;

    return delete_Pet_Species ;

} ;

// 新增 _ 時間按鈕紀錄 ( 美容區中，美容師點選 _ 時間按鈕 )
export const useDelete_TimeRecord = ( ) => {

    const delete_TimeRecord = ( service_Id  : string , time_Button : string ) => {

        // 刪除資料
        axios.delete(`/time_records/destroy_by_id_button/${ service_Id }/${ time_Button }` ).then(res => {

            toast(`🦄 已刪除 : `, { position: "top-left", autoClose: 1500 , hideProgressBar: false,} );

        }) ;

    } ;

    return delete_TimeRecord ;

} ;
