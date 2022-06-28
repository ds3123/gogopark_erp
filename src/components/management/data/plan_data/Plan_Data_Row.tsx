

import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Update_Custom_Plan from "components/plan/custom_plan/Update_Custom_Plan" ;
import axios from "utils/axios";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import { useHistory } from "react-router-dom";



const Plan_Data_Row = ( { data } : { data : any } ) => {

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    // 點選 _ 新增 : 方案類型
    const click_Plan = ( plan : any ) => dispatch( set_Modal( true , <Update_Custom_Plan /> , { data : plan , modal_Style : { width : "90%" , height:"auto" , left : "5%" } } )) ;
    
   
    // 點選 _ 刪除方案
    const click_Delete_Plan = ( plan_Id : string ) => {

      if( !plan_Id ){ alert( '刪除錯誤' ); return false; }
      

       axios.delete( `/custom_plans/${ plan_Id }` ).then( res => {


         toast( `🦄 已刪除自訂方案`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

         // 設定 cookie ( for 前往 : 資料管理 > 方案資料 / 5 秒後銷毀 )
         cookie.save( 'after_Delete_CustomPlan' , '方案資料' , { path : '/' , maxAge : 5 } ) ;

         history.push("/wrongpath");   // 錯誤路徑
         history.push("/management");  // 正確路徑
         
                
       }).catch( err => {


          alert(  `自訂方案刪除失敗 ( ${ err } )` )  


      }) ;




    
    } ; 

    
    
    const bt         = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;




    return <tr>
                <td className="td_Left"> 
                   <b className="tag is-medium pointer" style={ bt } onClick = { () => click_Plan( data ) } > { data['plan_name'] } </b> 
                </td>      
                <td> { data['bath_num'] }       </td>      
                <td> { data['beauty_num'] }     </td>      
                <td> { data['plan_period'] }    </td>      
                <td> { data['default_price'] }  </td>    
                <td> { data['created_at'].slice(0,10) } </td>        
                <td className="td_Left"> { data['plan_note'] }      </td>    
                <td>
                      <b className="delete" onClick={ () => { if( window.confirm( "確認要刪除此自訂方案？" ) ) click_Delete_Plan( data?.id )  }  } ></b> 
                </td>      
           </tr> 

} ;

export default Plan_Data_Row
       