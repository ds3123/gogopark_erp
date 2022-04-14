import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Employee } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import cookie from 'react-cookies' ;



// @ 新增 _ 員工
export const useCreate_Employee = () => {


    const history  = useHistory() ;
    const dispatch = useDispatch() ; 


    const create_Employee = ( data  : any  ) => {

        const dataObj = columns_Covert_Employee( data ) ;


        // 新增資料
        axios.post( "/employees" , dataObj ).then( res => {

            // 新增成功通知
            toast(`🦄 已新增 : 員工`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 設定 cookie ( for 前往 : 員工管理 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '員工管理'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }).catch( err => {

            alert( `新增 "員工" 錯誤 ( ${ err } )，請稍候再試．`  ) ;

        });

    } ;

    return create_Employee ;


} ;
