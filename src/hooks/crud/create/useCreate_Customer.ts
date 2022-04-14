
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Customer } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";


// @ 新增 _ 客戶
export const useCreate_Customer = () => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ; 

    // 資料庫已有 : 該客戶紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;

    const create_Customer = ( data : any ) => {

        // 轉換欄位
        const obj_Customer = columns_Covert_Customer( data ) ;


        // 新增資料
        if( !IsExisting_Customer ){

            axios.post( "/customers" , obj_Customer ).then( res => {

                // 新增成功通知
                toast( `🦄 已新增 : 客戶` , { position: "top-left", autoClose : 1500 , hideProgressBar : false }); 

                // 關掉右側面板
                dispatch( set_Side_Panel( false , null , {} ) ) ;

                // 前往相對應頁面
                history.push("/wrongpath") ;  // 錯誤路徑
                history.push("/customers") ;  // 正確路徑

            }).catch( err => {

                alert( `新增 "客戶" 錯誤 ( ${ err } )，請稍候再試．`  ) ;

            });

        }else{

            alert('資料庫已有該客戶資料') ;

        }

    } ;


    return create_Customer

} ;