

import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Update_Custom_Plan from "components/plan/custom_plan/Update_Custom_Plan"


const Plan_Data_Row = ( { data } : { data : any } ) => {

    const dispatch   = useDispatch() ;

    // 點選 _ 新增 : 方案類型
    const click_Plan = ( plan : any ) => dispatch( set_Modal( true , <Update_Custom_Plan /> , { data : plan , modal_Style : { width : "90%" , height:"auto" , left : "5%" } } )) ;
    const bt         = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;
   

    return <tr>
                <td> 
                   <b className="tag is-medium pointer" style={ bt } onClick = { () => click_Plan( data ) } > { data['plan_name'] } </b> 
                </td>      
                <td> { data['bath_num'] }       </td>      
                <td> { data['beauty_num'] }     </td>      
                <td> { data['plan_period'] }    </td>      
                <td> { data['default_price'] }  </td>    
                <td> { data['created_at'].slice(0,10) } </td>        
                <td> { data['plan_note'] }      </td>    
                <td> <b className="delete"></b> </td>      
           </tr> 

} ;

export default Plan_Data_Row
       