
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Service_Plans } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import cookie from 'react-cookies' ;
import { set_Side_Info } from "store/actions/action_Global_Layout" ;



// @ 新增 _ 預設方案：包月洗澡、包月美容
export const useCreate_Service_Plan = () => {

     const history  = useHistory() ;
     const dispatch = useDispatch() ; 


     // 資料庫已有 : 該客戶、寵物紀錄
     const IsExisting_Customer = useSelector( ( state : any ) => state.Customer.IsExisting_Customer ) ;

    
     const create_Plan = ( data  : any ) => {
 
         const dataArr = columns_Covert_Service_Plans( data ) ;
 
         // 轉換欄位
         const obj_Customer = dataArr[0] as any ; // 客戶
         const obj_Plan     = dataArr[1] ;        // 方案
 
         // # 新增資料
         // 新增 _ 客戶 ( 檢查是否已存在 )
         if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer ) ;

 
         // 新增 _ 預設方案
         axios.post( "/plans" , obj_Plan ).then( res => {
 
             // 新增成功通知
             toast( `🦄 已新增 : 預設方案` , { position : "top-left" , autoClose : 1500 , hideProgressBar : false } );
 
             // 關掉右側面板
             dispatch( set_Side_Panel(false , null ,{} ) ) ;

             
             // 關掉左側提示面板
             dispatch( set_Side_Info( false ) ) ;  
 
             // 設定 cookie ( for 前往 : 洗美 > 方案 / 5 秒後銷毀 )
             cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;
 
             history.push("/wrongpath");  // 錯誤路徑
             history.push("/services");   // 正確路徑
 
         }).catch( err => {
 
             alert( `新增 "方案" 錯誤 ( ${ err } )，請稍候再試．` ) ;  
            
         }) ;
 
     } ;
 
     return create_Plan ;


} ;

