
import { useContext , FC , useEffect, useState } from "react" ;
import { useSelector } from "react-redux";



// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";
import { FeeDetail } from "components/services/edit_components/summary_fee/Fee_Detail"


// @ 應收金額
const Amount_Payable : FC< {  editType : any , current : any , receivable : number } > = ( { editType  , current , receivable } ) => {

   // 應收金額
   const [ amount , set_Amount ] = useState( 0 ) ;

   const value = useContext( SidePanelContext ) ;                      // 取得 context 值  
   const data  = value.preLoadData ?  value.preLoadData : value.data ; // 預先取得資料

   // 付款方式
   const paymentMethod = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;
   



   const get_Amount_Payable = ( data : any ) => {

      if( !data ) return 0 ;

      const pet       = data['pet'] ;
      const plan_Type = data[ 'plan_type' ] ;  // 方案類型( Ex. 包月洗澡、包月美容... )
 
      // 包月洗澡下，有自訂價錢
      if( plan_Type === '包月洗澡' && pet['month_bath_price'] )   return pet['month_bath_price'] ;
    
      // 包月美容下，有自訂價錢
      if( plan_Type === '包月美容' && pet['month_beauty_price'] ) return pet['month_beauty_price'] ;

      return data.amount_payable  

   } ;


   // 設定 _ 應收金額
   useEffect(() => {

     set_Amount( get_Amount_Payable( data ) )
  
   }, [ data ])
   


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
                                                                    
                        <b> 應收金額 :&nbsp;<span className="fRed" > { amount }  </span> 元   </b>

                    </span>

                }

                { /* 消費明細 */ }
                <FeeDetail current = { current }  editType = { editType } paymentMethod = { paymentMethod } />   

           </div> 

} ;


export default Amount_Payable
       