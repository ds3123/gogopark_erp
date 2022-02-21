
import { useContext , FC } from "react" ;
import { useSelector } from "react-redux";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";
import { FeeDetail } from "components/services/edit_components/summary_fee/Fee_Detail"


// @ 應收金額
const Amount_Payable : FC< {  editType : any , current : any , receivable : number } > = ( { editType  , current , receivable } ) => {


   const value = useContext( SidePanelContext ) ;                      // 取得 context 值  
   const data  = value.preLoadData ?  value.preLoadData : value.data ; // 預先取得資料

   // 付款方式
   const paymentMethod = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;
   
   return  <div className="column is-8-desktop">

                { /* @ 新增資料  */ }   
                { ( !editType && paymentMethod === '現金' ) &&

                    <span className="tag is-large is-white">

                        <b> 應收金額 :&nbsp;<span className="fRed" > {  receivable   }  </span> 元   </b>

                    </span>

                }

                { /* @ 編輯資料  */ }   
                { ( editType && data.payment_method === '現金' ) &&

                    <span className="tag is-large is-white">
                                                                    
                        <b> 應收金額 :&nbsp;<span className="fRed" > {  data.amount_payable  } </span> 元   </b>

                    </span>

                }

                { /* 消費明細 */ }
                <FeeDetail current = { current }  editType = { editType } paymentMethod = { paymentMethod } />   

           </div> 

} ;


export default Amount_Payable
       