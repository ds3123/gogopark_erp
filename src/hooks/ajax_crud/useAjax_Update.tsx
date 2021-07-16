import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {set_Side_Panel} from "store/actions/action_Global_Layout";

import { columns_Covert_Customer , columns_Covert_Pet_Species , columns_Covert_Employee , columns_Covert_Service_Prices  } from "hooks/ajax_crud/useAjax_Create"

import {set_Current_Second_Tab} from "store/actions/action_Management";



/* @ PUT : 透過 Ajax _ 更新資料 */


export const useUpdate_Data = ( ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

    // 更新資料邏輯
    const update_Data = ( api : string  , data_id : string , data : any , redirect? : string , msg? : string | null , fullMsg? : string ) => {

        // 轉換資料欄位
        let submitData = data ;

        // 客戶
        if( api === '/customers' )  submitData = columns_Covert_Customer( data ) ;


        // 價格 ( 各項服務 )
        if( api === '/service_prices' ) submitData = columns_Covert_Service_Prices( data ) ;

        // 品種
        if( api === '/pet_species' ) submitData = columns_Covert_Pet_Species( data ) ;

        // 員工
        if( api === '/employees' )  submitData = columns_Covert_Employee( data ) ;


        // 更新資料
        axios.put(`${api}/${data_id}` , submitData ).then(res => {

            if( msg && !fullMsg ){
                // 更新成功通知
                toast(`🦄 已更新 : ${ msg }`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

            if( !msg && fullMsg ){
                // 更新成功通知 ( 完整自訂訊息 )
                toast(`🦄 ${ fullMsg }`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;


            // for 新增後，跳回 /management ，並點選 '員工管理' 頁籤
            if( api === '/employees' ){
               dispatch( set_Current_Second_Tab('員工管理') ) ;
            }

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            if( redirect ) history.push("/wrongpath");  // 錯誤路徑
            if( redirect ) history.push( redirect );         // 正確路徑

        });

    } ;

    return update_Data

} ;


// # 更新資料
export const useUpdate_Customer_Relatives = ( ) => {

    // 更新資料邏輯
    const create_Cus_Relatives = ( api : string , data_id : string , data : any ) => {

        // 轉換資料欄位
        const submitData = {

            customer_id  : data['customer_Id'] ,
            type         : data['customer_Relative_Type'] ,
            tag          : data['customer_Relative_Family'] ,
            name         : data['customer_Relative_Name'] ,
            mobile_phone : data['customer_Relative_Cellphone'] ,
            tel_phone    : data['customer_Relative_Telephone'] ,

        } ;

        // 更新資料
        axios.put(`${api}/${data_id}` , submitData ) ;

    } ;

    return create_Cus_Relatives



} ;

