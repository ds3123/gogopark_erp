
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Bath } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { set_Side_Info } from "store/actions/action_Global_Layout" ;
import { add_Plan_Used_Record } from 'store/actions/action_Plan' ;



// @ 新增 _ 洗澡單
export const useCreate_Service_Bath = () => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ; 

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;
 

    const create_Bath = ( data  : any ) => {

        const dataArr       = columns_Covert_Bath( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Bath      = dataArr[2] ;  // 洗澡單

        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer ) ;  // 新增 _ 客戶 ( 檢查是否已存在 )
        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet ) ;                 // 新增 _ 寵物 ( 檢查是否已存在 )


        // 新增 _ 洗澡單
        axios.post( "/bathes" , obj_Bath ).then( res => {

            dispatch( set_Side_Info( false ) ) ;   // 關掉左側提示面板

            //  # 如果付款方式是 "方案"，再新增 _ 方案 "使用紀錄" ( 資料表 : plan_used_records )
            if( data['payment_Method'] === '方案' ){
                console.log( 'aaaa' )
                dispatch( add_Plan_Used_Record( data , res , history ) ) ;
               
                return false ;
            }

        // # 一般洗澡單新增 ------------------------------------------------------------------------------------------------------

            // 新增成功通知
            toast( `🦄 已新增 : 洗澡單` , { position : "top-left" , autoClose: 1500 , hideProgressBar: false } );

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 前往相對應頁面
            history.push( "/wrongpath" ) ;  // 錯誤路徑
            history.push( "/services" ) ;   // 正確路徑

        }) ;

    } ;


    return create_Bath ;

} ;