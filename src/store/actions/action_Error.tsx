
import { Dispatch } from "redux";
import axios from "utils/axios" ;
import { switch_Service_Type_Id } from "utils/data/switch"
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { toast } from "react-toastify";
import cookie from "react-cookies";



// 刪除 _ 使用方案的服務紀錄( 資料表 : plan_used_records )
export const delete_Plan_Service_Record = ( plan_Data : any ) => {

    // 刪除 _ 服務紀錄
    if( plan_Data['id'] ) axios.delete( `/plan_records/${ plan_Data['id'] }` ) ;


}

// # 點選 _ 提交異常 ( 服務轉異常 ) 
export const submit_Service_Error = ( data : any , error_Cause : string , current_User_Name : string , history : any ) => {

    return ( dispatch : any ) => {

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } = switch_Service_Type_Id( data ) ;
                
                // 更新 _ 異常狀態
                if( service_Id && service_Url ){
        
                    const obj = {
                                  is_error        : 1 ,
                                  error_cause     : error_Cause ,
                                  error_submitter : current_User_Name ? current_User_Name : '測試員'
                                } ;
        
                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {
        
                        toast( `🦄 已通報異常案件`, { position: "top-left", autoClose: 1500 , hideProgressBar: false });
        
                        dispatch( set_Side_Panel( false , null , {} ) ) ;
        
                        history.push("/wrongpath");  // 錯誤路徑

                        if( service_Url === '/lodges' || service_Url === '/cares' ){

                          history.push("/lodge") ;      

                        }else{

                          history.push("/index") ;    

                        }
        
                    })
        
                }

           } ;

} ;


// # 點選 _ 回復 : 提交異常
export const submit_Undo_Service_Error = ( data : any , history : any ) => {

    return ( dispatch : any ) => {


                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } =  switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){

                    const obj = {
                                    is_error        : 0 ,
                                    error_cause     : null ,
                                    error_submitter : null
                                } ;

                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {

                        toast(`🦄 已解除異常`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});

                        dispatch( set_Side_Panel(false , null ,{} ) ) ;

                        // 設定 cookie ( for 前往 : 資料管理 > 服務異常 / 5 秒後銷毀 )
                        cookie.save( 'after_Updated_Data' , '資料管理_服務異常' , { path : '/' , maxAge : 5 } ) ;

                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/management");  // 正確路徑

                    })

                }

               

           } ;

} ;

// # 點選 _ 銷單 ( 取消該單據 )
export const submit_Delete_Service = ( data : any , current_User_Name : string , history : any ) => {

    return ( dispatch : any ) => {

                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } = switch_Service_Type_Id( data ) ;

                // 銷單的服務若為 : 使用方案 
                if( data[ 'payment_method' ] === "方案" && data[ 'plan' ] ){
                    
                    // 刪除 _ 使用方案的服務紀錄( 資料表 : plan_used_records )
                    delete_Plan_Service_Record( data[ 'plan' ] ) ;

                }

             


                // 更新 _ 異常狀態
                if( service_Id && service_Url ){
        
                    const obj = {
                                    is_delete        : 1 ,
                                    delete_submitter : current_User_Name ? current_User_Name : '測試員'
                                } ;
        
                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {
        
                        toast(`🦄 已取消此服務單`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});
        
                        dispatch( set_Side_Panel(false , null ,{} ) ) ;
        
                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/index");      // 正確路徑
        
                    })
        
                }


           } ;

} ;

// # 點選 _ 回復 : 銷單 
export const submit_Undo_Delete_Service = ( data : any , history : any ) => {

    return ( dispatch : any ) => {

        
                // 取得 _ 服務單 id 、API Url
                const { service_Id , service_Url } =  switch_Service_Type_Id( data ) ;

                // 更新 _ 異常狀態
                if( service_Id && service_Url ){

                    const obj = {
                                  is_delete        : 0 ,
                                  delete_submitter : null
                                } ;

                    axios.put( `${ service_Url }/${ service_Id }` , obj ).then( res => {

                        toast(`🦄 已解除銷單`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});

                        dispatch( set_Side_Panel(false , null ,{} ) ) ;

                        // 設定 cookie ( for 前往 : 資料管理 > 銷單資料 / 5 秒後銷毀 )
                        cookie.save( 'after_Updated_Data' , '資料管理_銷單資料' , { path : '/' , maxAge : 5 } ) ;

                        history.push("/wrongpath");  // 錯誤路徑
                        history.push("/management");  // 正確路徑

                    })

                }

           } ;

} ;


// # 取得 _ 特定日期資料 : 異常 + 銷單
export const get_Error_Delete_By_Date = ( service_Date : string ) => {


    return ( dispatch : Dispatch ) => {
        
                axios.get( `/services/show_services_is_delete_error_by_date/${service_Date}` ).then( res => {

                    dispatch({
                               type                 : "GET_ERROR_DELETE_BY_DATE" ,
                               error_Delete_By_Date : res.data
                             }) ;

               })
        
           } ;

} ;






