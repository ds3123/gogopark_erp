
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Lodge } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import cookie from 'react-cookies'


// @ 新增 _ 住宿單
export const useCreate_Service_Lodge = () => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ; 

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;


    const create_Lodge = ( data  : any ) => {

        const dataArr = columns_Covert_Lodge( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Lodge     = dataArr[2] ;  // 住宿單

        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );  // 新增 _ 客戶 ( 檢查是否已存在 )
        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet );                 // 新增 _ 寵物 ( 檢查是否已存在 )


        // 新增 _ 住宿單
        axios.post( "/lodges" , obj_Lodge ).then( res => {

            // 新增成功通知
            toast(`🦄 已新增 : 住宿單`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 前往相對應頁面
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/lodge" ) ;   // 正確路徑

        }).catch( error => {

           console.log( error )

        }) ;

    } ;

    return create_Lodge ;




} ;

