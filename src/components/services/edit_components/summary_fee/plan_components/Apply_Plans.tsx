
import { FC , useEffect } from "react"
import { useSelector , useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout";
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records"
import All_Plans from "./All_Plans";
import { usePlan_Validator } from "hooks/data/useForm_Validator";
import { get_Pet_All_Plans } from "store/actions/action_Plan"


type Plan = {
            
               current   : string ;
               editType : string | undefined ;
               register : any ;
               setValue : any ;     // Reach Hook Form 欄位註冊函式
            }



// @ 使用 _ 方案 ( 預設 : 包月洗澡、包月美容 / 自訂 )
const Apply_Plans : FC< Plan > = ( { setValue , register , current , editType } ) => {


     const dispatch                   = useDispatch();
     
     // 目前在寵物區，所點選寵物資料
     const current_Pet                = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
     const current_Pet_Serial         = current_Pet ? current_Pet['serial'] : '' ;   // 寵物編號

     // 使用本次方案的 _ 價格 ( 點選 _ 標籤 "使用此方案" 後設定 )
     const current_Plan_Service_Price = useSelector( ( state : any ) => state.Plan.current_Plan_Service_Price ) ;

     // 付款方式
     const paymentMethod              = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;

     // 方案相關驗證條件
     usePlan_Validator( paymentMethod ) ;

     
     // 點選 _ 檢視 : 寵物資訊 ( 尚未完成 2021.11.02 )
     const click_Check_Used_Records = ( plan_Data : any ) => {

        document.body.style.position = 'fixed' ;   // 固定、消除 _ 右側捲軸
        dispatch( set_Modal( true , <Plan_Used_Records /> , { data : plan_Data , modal_Style : { width : "70%" , left : "15%" , bottom : "0px" } } )) ;

     } ;


     // [1] 先取得 _ 寵物所有的 "方案紀錄" ( 當寵物區的 寵物編號( current_Pet_Serial ) 變動時 )
     useEffect( ( ) => { 
    
       if( current_Pet_Serial ) dispatch( get_Pet_All_Plans( current_Pet_Serial ) ) ;
   
     } , [ current_Pet_Serial , paymentMethod ] ) ;


  
     // 設定 _ 使用本次方案的 _ 價格 ( "此次價格" )
     useEffect( () => {
       
        setValue( 'current_Plan_Used_Fee' , current_Plan_Service_Price ) ;

     } , [ current_Plan_Service_Price ] ) ;




    return <div className="column is-8-desktop">
          
              <All_Plans register = { register } current = { current } editType = { editType } />  { /* 所有方案 */ } 
              
           </div>


} ;

export default Apply_Plans