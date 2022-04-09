import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Pet_Species } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import cookie from 'react-cookies' ;


// @ 新增 _ 品種
export const useCreate_Species = () => {


    const history  = useHistory() ;
    const dispatch = useDispatch() ; 


    const create_Pet_Species = ( data  : any ) => {

        // 轉換資料表欄位
        const obj = columns_Covert_Pet_Species( data ) ;

        // 新增資料
        axios.post( "/pet_species" , obj ).then( res => {

            // 新增資料後，所取得 id ( 尚未完成 2021.08.17 )
            const pet_Species_Id = res.data ;

            // 新增成功通知
            toast(`🦄 已新增 : 品種`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 設定 cookie ( for 前往 : 系統設定 > 寵物品種 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;


    return create_Pet_Species ;


} ; 
