import useServiceType from "hooks/layout/useServiceType";
import { useDispatch } from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Plan from "components/plan/edit/Update_Plan";





// @ 方案類型( "預設" / "自訂" )
const Plan_Type = ( { data } : { data : any } ) => {


   const dispatch = useDispatch() ; 

   // 方案類型
   const plan_Type  = data['plan_type'] ;     
   const _plan_Type = ( plan_Type === "包月洗澡" || plan_Type === "包月美容" ) ? plan_Type : null;

   // 方案類型欄位 : 顏色、Icon
   const { color , icon }  = useServiceType( _plan_Type, false , 'medium' ); 


   // 點選 _ 方案
   const click_Plan_Type = () => dispatch( set_Side_Panel( true , <Update_Plan /> , { preLoadData : data } ) ) ;
 

   return <>

                { /* 預設方案 */ } 
                { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) &&
                
                    <b className = { color+" pointer" } onClick = { click_Plan_Type } >
                        <i className = { icon } ></i> &nbsp;  [ 預設 :  { data['id'] } ]  { plan_Type }
                    </b>
                
                }
 
                { /* 自訂方案 */ } 
                { ( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) &&
                
                    <b className="tag is-medium is-warning is-light pointer" onClick = { click_Plan_Type } >
                        <i className="fas fa-ruler"></i> &nbsp; [ 自訂 : { data['id'] } ]  { plan_Type }
                    </b>
                
                }
   
          </>  

} ;

export default Plan_Type
       