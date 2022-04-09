
import { FC , useEffect , useState } from "react"
import { Edit_Form_Type } from "utils/Interface_Type";
import { get_Today } from "utils/time/date";
import { usePrice_Service , usePrice_Care , usePrice_Lodge , usePrice_Plan } from "hooks/data/usePrice"

import Apply_Plans from "components/services/edit_components/summary_fee/plan_components/Apply_Plans";
import { useSelector } from "react-redux";

// 主要元件
import Amount_Payable from "components/services/edit_components/summary_fee/summary_components/Amount_Payable"
import Payment_Method from "components/services/edit_components/summary_fee/summary_components/Payment_Method"
import Amount_Paid from "components/services/edit_components/summary_fee/summary_components/Amount_Paid"
import Admin_User from "components/services/edit_components/summary_fee/summary_components/Admin_User"
import Admin_Note from "components/services/edit_components/summary_fee/summary_components/Admin_Note"


import Date_Picker from "templates/form/Date_Picker";

// React Hook Form
import { useForm } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type";



interface TS extends Edit_Form_Type {
    current      : string ;
    editType?    : string ;   // 新增狀態 --> undefined / 編輯狀態 --> "編輯" 
    serviceData? : any ;      // 此筆資料
}

/* 服務費用 _ 結算明細 */
const Summary_Fee : FC<TS> = ( { register , setValue , errors  , current, editType, serviceData } ) => {

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
          const { receivable : lodge_Receivable }                     = usePrice_Lodge( current , paymentMethod , setValue );

          // # 方案 ------
          const { current_Plan_Type , receivable : plan_Receivable  } = usePrice_Plan( current , paymentMethod , setValue ) ;



          // React Hook Form
          const { control } = useForm<ICustomer>({ mode : "all" }) ;


 
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

        
    return <>

              { hr }
             
              { /* # 費用明細 */ }
              <div className="columns is-multiline is-mobile">

                { /* 服務項目 */ }
                <div className="column is-4-desktop">
                    <span className="tag is-large is-white">
                        <b> 服務項目 :
                            <span className="fDblue" > { current } &nbsp;
                            <span className='f_10'>
                                { ( current === '方案' && editType !== '編輯' && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                { ( current === '安親' && editType !== '編輯' && current_Care_Type ) && `( ${ current_Care_Type } )` }
                            </span>
                            </span>
                        </b>
                    </span>
                </div>

                { /* 應收金額 */ }
                <Amount_Payable editType = { editType } current = { current }  receivable= { receivable } />  
                
                { /* 付款方式  */ }
                <Payment_Method editType = { editType } current = { current } register = { register } setValue = { setValue } />

                { /* 實收金額 */ }
                <Amount_Paid editType = { editType } receivable = { receivable } register = { register } setValue = { setValue }  />

                { /* 方案 ( 預設方案 : 包月洗澡、包月美容 ) */ }
                <Apply_Plans current = { current } editType = { editType } register = { register } setValue = { setValue } /> 
                

              </div>

              { /* # 櫃台經手資訊 */ }
              <div className="columns is-multiline  is-mobile">

                    { /* 櫃台人員  */ }
                    <Admin_User editType = { editType } register = { register }  setValue = { setValue}  />

                    { /* 櫃台備註  */ }
                    <Admin_Note editType = { editType } register = { register } />

                    { /* 建檔日期 */ }
                    <div className="column is-4-desktop">

                       <span className="tag is-large is-white">
                          <b> 建檔日期 : 
                            <span className="fDblue">
                              { /* for 新增  */ }
                              { editType !== '編輯' && <>&nbsp;{ get_Today() } </> }  
                              { /* for 編輯 */ }
                              { editType !== '編輯' || ( serviceData.created_at ? serviceData.created_at.slice(0,10) : '' )}
                            </span> 
                          </b>
                       </span>

                    </div>

                    { /* 收款日期 ( 僅方案 ) */ }
                    { current === '方案' && 

                        <div className="column is-6-desktop">

                            <div className="tag is-large is-white">
                            <b> 收款日期 : </b> &nbsp;&nbsp;
                                <Date_Picker control={ control } name="receive_Fee_Date" default_Date={ new Date } />
                            </div>

                        </div>

                    }

              </div>

           </>

} ;

export default Summary_Fee