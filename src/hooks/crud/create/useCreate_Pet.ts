
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Customer , columns_Covert_Pet } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";



// @ 新增 _ 寵物
export const useCreate_Pet = () => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ; 

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;
 

    const create_Pet = ( data : any ) => {

         // 轉換欄位
         const obj_Customer = columns_Covert_Customer( data ) ;
         const obj_Pet      = columns_Covert_Pet( data ) ;

         // 新增資料
         if( !IsExisting_Customer )  axios.post( "/customers" , obj_Customer ) ;

         if( !IsExisting_Pet ){

            axios.post( "/pets" , obj_Pet ).then( res => {

                // 新增成功通知
                toast(`🦄 已新增 : 寵物`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

                // 關掉右側面板
                dispatch( set_Side_Panel( false , null ,{} ) ) ;

                // 前往相對應頁面
                history.push("/wrongpath" ) ;  // 錯誤路徑
                history.push("/pets" ) ;       // 正確路徑

            }) ;

         }else{

            alert('資料庫已有該寵物資料') ;

         }

    }  

    return create_Pet

} ;
