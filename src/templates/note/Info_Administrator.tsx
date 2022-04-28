import { useDispatch } from "react-redux" ;
import { useContext } from "react" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import {SidePanelContext} from "templates/panel/Side_Panel";

import Customer_Consumption_Records from "components/customers/edit/info/Customer_Consumption_Records";
import To_Previous_Page from "templates/note/To_Previous_Page";





// @  提示 : 詢問系統管理員
const Info_Administrator = () => {

   const dispatch    = useDispatch() ; 
   const value       = useContext( SidePanelContext ) ;  // 取得 context 值
   const data        = value.preLoadData ;               // 預先取得資料
   const source_Page = value.source_Page as any ;        // 來源網頁 ( for 點選、回到上一個頁面 )


   // 點選、回到上一個頁面
   const back_To_Prev_Page = ( source : string , customer_Id? : string ) => {

      if( !source ) return false   
      if( source === 'Customer_Service_Records' ) dispatch( set_Side_Panel( true , <Customer_Consumption_Records customer_Id = { customer_Id } /> , {} ) ) ;
    
   } ;   

   

  return <div> 

             { /* 回上一頁 */ }    
             { source_Page && <To_Previous_Page action = { () => back_To_Prev_Page( source_Page , data?.customer.id ) } />  }

             <b className="tag is-large is-danger is-light m_Top_50" style={{ width:"100%" }}>
                 <i className="fas fa-user-lock"></i> &nbsp; 檢視功能尚未開放，請洽詢系統管理員。 
             </b>     
            
         </div>

} ;

export default Info_Administrator
       