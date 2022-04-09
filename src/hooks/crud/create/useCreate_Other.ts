
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Other } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";



// @ 新增 _ 其他收支
export const useCreate_Other = () => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ; 

    const create_Other = ( data  : any ) => {

        // 轉換欄位
        const obj_Other = columns_Covert_Other( data ) ;

        // 新增資料
        axios.post( "/others" , obj_Other ).then( res => {

            // 新增成功通知
            toast(`🦄 已新增 : 其他收支`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null ,{} ) ) ;

            // 前往相對應頁面
            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }).catch( error => {

            console.error( error.response.data ) ; // 顯示詳細錯誤訊息
         
        }) ;

       
    } ;


    return create_Other ; 

} ;


