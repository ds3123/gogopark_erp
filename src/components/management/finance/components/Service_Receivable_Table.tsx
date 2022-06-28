import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";


type Table = {

  data : any[] ;

}


// @ 表單 : 應收款 ( 洗澡、美容 )
const Service_Receivable_Table = ( { data } : Table ) => {

    const dispatch = useDispatch() ;
    
    
    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;


   return  <table className="table is-fullwidth is-hoverable">

                <thead>

                    <tr>

                      <th> 項 目    </th>
                      <th> 寵物資訊  </th> 
                      <th> 金 額    <span className="f_10 fDblue"> ( 應 收 ) </span> </th>
                      {/* <th> 折 扣    </th> */}
                      <th> 應收帳款  <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                      <th style={{ width:'210px' }}> 付款方式  </th>
                      <th> 備 註    </th>

                    </tr>

                </thead>

                <tbody>

                    { 
                      
                      data.map( ( x : any , y : number ) => {
  
                            let amount_Payable = x['amount_payable'] ;
                            const pet          = x['pet'] ;
      
                            // 單次洗澡下，有調整價格 
                            if( x['payment_type'] === '單次洗澡' && pet?.single_bath_price ) amount_Payable = pet?.single_bath_price ;
                            
                            // 單次美容下，有調整價格  
                            if( x['payment_type'] === '單次美容' && pet?.single_beauty_price ) amount_Payable = pet?.single_beauty_price ;
                             
                            return <tr key = { y }>

                                      <td className="td_Left">

                                         <b className="tag is-medium pointer" onClick = { () => click_Service( x ) } >

                                           { /* 標示：方案加價  */ }
                                           {  x?.payment_method === '方案' &&  <b className="fRed m_Right_10"> 方案加價 </b> }  




                                           { x['payment_type'] }  &nbsp;

                                           <span className="f_9"> { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? '( 預約 )' : '( 現場 )' } </span>
                                         
                                           &nbsp; <b className="tag is-white is-rounded"> Q{ x['q_code'] } </b>
                                         </b>

                                      </td>

                                      <td className="td_Left"> 
                                         { 
                                            x?.pet?.name ?  
                                              <span> { x?.pet?.name } ( { x?.pet?.species } )  </span>  : 
                                              <span className="fRed"> 該寵物已刪除               </span>  
                                         }
                                      </td>
                                      
                                      <td style={{width:'130px'}}> { amount_Payable }                                  </td>
                                      {/* <td> { amount_Payable - x['amount_paid'] }               </td> */}
                                     
                                      <td style={{width:'160px'}}> { x['amount_paid'] }                                </td>
                                      
                                      <td className="td_Left relative"> 
                                      
                                        &nbsp;
                                        
                                        { /* 付款方式 */ }
                                        { x?.payment_method === '方案' ? '現金' : x['payment_method'] }   

                                          <span className="absolute f_9" style={{ top:'6px' , right:'-10px' }}>  
                                                付款日期 :&nbsp; 
                                                { x?.payment_date ? x.payment_date?.slice( 5 , 10 ) : <span className="fRed">未填寫</span> } 
                                          </span>  
                                    
                                          <span className="absolute f_9" style={{ top:'22px' , right:'-10px' }}> 到店日期 : { x?.service_date?.slice( 5 , 10 ) } </span>     
                                    
                                     </td>

                                     <td className="td_Left"> { x['admin_service_note'] }     </td>

                                   </tr>

                      }) 
                        
                    }

                </tbody>

           </table>

} ;


export default Service_Receivable_Table
       
