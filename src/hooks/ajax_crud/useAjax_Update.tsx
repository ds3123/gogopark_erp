

import React from "react" ;
import axios from "utils/axios" ;
import { useDispatch , useSelector } from "react-redux" ;
import { useHistory } from "react-router-dom" ;
import { toast } from "react-toastify" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import {
          columns_Covert_Customer , columns_Covert_Pet , columns_Covert_Pet_Species , 
          columns_Covert_Employee , columns_Covert_Service_Prices ,
          columns_Covert_Care
       } from "hooks/ajax_crud/useAjax_Create"

import cookie from "react-cookies";



/* @ PUT : 透過 Ajax _ 更新資料 */
export const useUpdate_Data = ( ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;
    

    // 更新資料邏輯
    const update_Data = ( api : string  , data_id : string , data : any , redirect? : string , msg? : string | null , fullMsg? : string ) => {

        // 轉換資料欄位
        let submitData : any ;

        // 客戶
        if( api === '/customers' ) submitData = columns_Covert_Customer( data ) ;

        // 寵物
        if( api === '/pets' )      submitData = columns_Covert_Pet( data ) ;

        // 基礎、洗澡、美容   
        if( api === '/basics' || api === '/bathes' ||api === '/beauties' ) submitData = data

        // 安親
        if( api === '/cares' ) {

               submitData = {
                              way_leave : data['way_Leave'] === '請選擇' ? null : data['way_Leave'] , // 離店方式
                              end_time  : data['care_End_Time']                                      // 安親 : 結束時間
                            }

        }

        // 價格 ( 各項服務 )
        if( api === '/service_prices' ) submitData = columns_Covert_Service_Prices( data ) ;

        // 品種
        if( api === '/pet_species' )    submitData = columns_Covert_Pet_Species( data ) ;

        // 員工
        if( api === '/employees' )      submitData = columns_Covert_Employee( data ) ;


        // 更新資料
        axios.put( `${ api }/${ data_id }` , submitData ).then( res => {

            // 更新成功通知
            if( msg && !fullMsg ) toast( `🦄 已更新 : ${ msg }`, { position: "top-left", autoClose: 1500, hideProgressBar: false, closeOnClick: true });

            // 更新成功通知 ( 完整自訂訊息 )
            if( !msg && fullMsg ) toast( `🦄 ${ fullMsg }`, { position: "top-left", autoClose:1500, hideProgressBar: false, closeOnClick: true,});

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 恢復 _ 右側捲軸
            document.body.style.position = '' ;        

            // * 設定 cookie ( 5 秒後銷毀 )
            // @ 一般行政頁面  -----------------------------------------------

            // for # 前往 : 住宿 > 安親
            if( api === '/cares' ) cookie.save( 'after_Created_Care' , '住宿_安親' , { path : '/' , maxAge : 5 } ) ;

            // @ 管理區頁面  -----------------------------------------------

            // for # 前往 : 價格管理 > 基礎、洗澡、美容 ....
            if( api === '/service_prices' ){

                let value = '' ;
                if( submitData['service_type'] === '基礎' )     value = '價格管理_基礎' ;
                if( submitData['service_type'] === '洗澡' )     value = '價格管理_洗澡' ;
                if( submitData['service_type'] === '美容' )     value = '價格管理_美容' ;
                if( submitData['service_type'] === '安親' )     value = '價格管理_安親' ;
                if( submitData['service_type'] === '住宿' )     value = '價格管理_住宿' ;
                if( submitData['service_type'] === '加價項目' ) value = '價格管理_加價項目' ;
                if( submitData['service_type'] === '加價美容' ) value = '價格管理_加價美容' ;

                cookie.save( 'after_Updated_Prices' , value , { path : '/' , maxAge : 5 } ) ;

            }

            // for # 前往 : 系統設定 > 寵物品種
            if( api === '/pet_species' ) cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種' , { path : '/' , maxAge : 5 } ) ;

            // for # 前往 : 員工管理
            if( api === '/employees' ) cookie.save( 'after_Created_Redirect' , '員工管理' , { path : '/' , maxAge : 5 } ) ;


            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            if( redirect ) history.push( "/wrongpath" );  // 錯誤路徑
            if( redirect ) history.push( redirect );      // 正確路徑

        });

    } ;

    return update_Data

} ;


