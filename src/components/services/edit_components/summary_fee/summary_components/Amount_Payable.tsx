
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
   

   // 取得 _ 應收金額
   const get_Amount_Payable = ( data : any ) => {

      if( !data ) return 0 ;

      const pet          = data['pet'] ;
      const payment_Type = data['payment_type'] ;      // 付費類型( Ex. 單次洗澡、單次美容 ) 
      const plan_Type    = data['plan_type'] ;         // 方案類型( Ex. 包月洗澡、包月美容... )
 
      const self_Adjust  =  plan_Type ? data?.plan_adjust_price : data?.self_adjust_amount ;  // 自行調整 ( 方案服務與一般服務，資料表欄位名稱不同 )

      const extra_Item   = data?.extra_service_fee ;   // 加價項目
      const extra_Beauty = data?.extra_beauty_fee ;    // 加價美容

      const pickup       = data?.pickup_fee ;          // 接送費


    
      // # 該寵物，有自訂價格 :

      // 單次洗澡下
      if( payment_Type === '單次洗澡' && pet['single_bath_price'] )   return pet['single_bath_price'] + self_Adjust + extra_Item + extra_Beauty + pickup ;

      // 單次美容下
      if( payment_Type === '單次美容' && pet['single_beauty_price'] ) return pet['single_beauty_price'] + self_Adjust + extra_Item + pickup ;

      // 包月洗澡下
      if( plan_Type === '包月洗澡' && pet['month_bath_price'] )   return pet['month_bath_price'] + self_Adjust + pickup  ;
    
      // 包月美容下
      if( plan_Type === '包月美容' && pet['month_beauty_price'] ) return pet['month_beauty_price'] + self_Adjust + pickup ;


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

                        <b> 應收金額 :&nbsp;<span className="fRed" > { receivable }  </span> 元   </b>

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
       