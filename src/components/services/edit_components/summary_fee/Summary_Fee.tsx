
import { useEffect , useState } from "react"
import { Edit_Form_Type } from "utils/Interface_Type"
import { usePrice_Service , usePrice_Care , usePrice_Lodge , usePrice_Plan } from "hooks/data/usePrice"
import Apply_Plans from "components/services/edit_components/summary_fee/plan_components/Apply_Plans"
import { useSelector } from "react-redux"

// 主要元件
import Service_Item from "./summary_components/Service_Item"
import Amount_Payable from "components/services/edit_components/summary_fee/summary_components/Amount_Payable"
import Payment_Method from "components/services/edit_components/summary_fee/summary_components/Payment_Method"
import Amount_Paid from "components/services/edit_components/summary_fee/summary_components/Amount_Paid"
import Admin_User from "components/services/edit_components/summary_fee/summary_components/Admin_User"
import Admin_Note from "components/services/edit_components/summary_fee/summary_components/Admin_Note"
import Create_Date from "./summary_components/Create_Date"
import Payment_Date from "./summary_components/Payment_Date"



interface TS extends Edit_Form_Type {
    current      : string ;
    editType?    : string ;   // 新增狀態 --> undefined / 編輯狀態 --> "編輯" 
    serviceData? : any ;      // 此筆資料
}



/* 服務費用 _ 結算明細 */
const Summary_Fee = ( { register , setValue , control , current, editType, serviceData } : TS ) => {


          // 應收金額
          const [ receivable , set_Receivable ] = useState( 0 ) ;

          // 付款方式
          const paymentMethod = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;



          // @ 各服務類型，所應提供資料 ----------------------------------------------------

          // # 基礎、洗澡、美容
          const { receivable : service_Receivable }                   = usePrice_Service( current , paymentMethod , setValue , editType );

          // # 安親 ------
          const { current_Care_Type , receivable : care_Receivable }  = usePrice_Care( current , paymentMethod , setValue ) ;

          // # 住宿 ------
          const { receivable : lodge_Receivable }                     = usePrice_Lodge( current , paymentMethod , setValue ) ;

          // # 方案 ------
          const { current_Plan_Type , receivable : plan_Receivable  } = usePrice_Plan( current , paymentMethod , setValue ) ;


        
          // 設定 _ 應收金額 ( receivable )
          useEffect( () => {

             // 主要服務 ( 基礎、洗澡、美容 )
             if( current === '基礎' || current === '洗澡' || current === '美容' ) set_Receivable( service_Receivable ) ;

             // 住宿
             if( current === '住宿' ) set_Receivable( lodge_Receivable ) ;

             // 安親
             if( current === '安親' ) set_Receivable( care_Receivable ) ;

             // 方案( 包月洗澡、包月美容、住宿券 )
             if( current === '方案' ) set_Receivable( plan_Receivable ) ;

          } , [ current , service_Receivable , lodge_Receivable , care_Receivable , plan_Receivable ] ) ;
          

          const hr = editType ? "" : <><hr/><br/></> ;


          // 是否顯示：收款日期
          const is_Show_Payment_Date = current === '基礎' || 
                                       current === '洗澡' || 
                                       current === '美容' || 
                                       current === '安親' || 
                                       current === '住宿' ||
                                       current === '方案' ;
                                       
                
                                       
    return <>

              { hr }
             
              { /* # 費用明細 */ }
              <div className="columns is-multiline is-mobile">

                { /* 服務項目 */ }
                <Service_Item current={current}  editType={ editType } current_Plan_Type = { current_Plan_Type } current_Care_Type = { current_Care_Type } />
            
                { /* 應收金額 */ }
                <Amount_Payable editType = { editType } current = { current }  receivable= { receivable } register = { register  } setValue = { setValue } />  
                
                { /* 付款方式  */ }
                <Payment_Method editType = { editType } current = { current } register = { register } setValue = { setValue } />

                { /* 實收金額 */ }
                <Amount_Paid editType = { editType } receivable = { receivable } register = { register } setValue = { setValue }  />

                { /* 顯示方案以供點選使用 */ }
                <Apply_Plans current = { current } editType = { editType } register = { register } setValue = { setValue } /> 
                
              </div>

              { /* # 櫃台經手資訊 */ }
              <div className="columns is-multiline is-mobile">

                    { /* 櫃台人員 */ }
                    <Admin_User editType = { editType } register = { register }  setValue = { setValue}  />

                    { /* 櫃台備註 */ }
                    <Admin_Note editType = { editType } register = { register } />

                    { /* 建檔日期 */ }
                    <Create_Date editType = { editType }  serviceData = { serviceData }  />

                    { /* 收款日期 */ }
                    { is_Show_Payment_Date && 
                       <Payment_Date editType = { editType }  serviceData = { serviceData } control = { control } setValue = { setValue } /> 
                    }

              </div>

           </>

} ;

export default Summary_Fee