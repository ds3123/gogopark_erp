

import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout"
import Update_Plan from "components/plan/edit/Update_Plan"
import Update_Service from "components/services/edit/Update_Service";




type Table = {

  data : any[] ;

}




// @ 表單 : 預收款 ( 方案 : 包月洗澡、包月美容 )
const Advance_Receipt_Table = ( { data } : Table ) => {

  const dispatch = useDispatch(); 

  // 點選 _ 方案
  const click_Plan_Type = ( plan : any ) => dispatch( set_Side_Panel( true , <Update_Plan /> , {  preLoadData : plan } ) ) ;


  // 點選 _ 服務單
  const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;



  return <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                  <th> 項 目    </th>
                  <th> 寵物資訊 </th>
                  {/* <th> 期 數    </th> */}
                  <th> 金 額  <span className="f_10 fDblue"> ( 應 收 ) </span>  </th>
                  {/* <th> 折 扣    </th> */}
                  <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                  <th style={{ width:'210px' }}> 付款方式  </th>
                  <th> 備 註    </th>
                </tr>
            </thead>

            <tbody>

                {

                  data.map( ( x : any , y : number ) => {

                      let amount_Payable = x['amount_payable'] ;

                      const pet = x['pet'] ;

                      // 包月洗澡下，有調整價格 
                      if( x?.plan_type === '包月洗澡' && pet['month_bath_price'] ) amount_Payable = pet['month_bath_price'] ;
                            
                      // 包月美容下，有調整價格  
                      if( x?.plan_type === '包月美容' && pet['month_beauty_price'] ) amount_Payable = pet['month_beauty_price'] ;
                     

                      return <tr key = { y }>

                                <td className="td_Left"> 


                                  { /* 方案  */ }
                                  { x['plan_type'] && 

                                      <b className="tag is-medium pointer" onClick={ () => click_Plan_Type( x ) } > 
                                        { x['plan_type'] } 
                                      </b>  

                                  }   

                                 { /* 服務：基礎、洗澡、美容 ( 預付 ) */ } 
                                 { ( x['plan_type'] === undefined && !x['start_date'] ) &&

                                    <b className="tag is-medium pointer" onClick = { () => click_Service( x ) } >     

                                        { x['payment_type'] }  &nbsp;
                                        
                                        <span className="f_9"> { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? '( 預約 )' : '( 現場 )' } </span>
                                      
                                        &nbsp; <b className="tag is-white is-rounded"> Q{ x['q_code'] } </b>

                                    </b>

                                }   

                                 { /* 服務：安親、住宿 ( 預付 ) */ } 
                                 { ( x['plan_type'] === undefined && x['start_date'] ) &&

                                    <>  &nbsp;  { x['service_status'] }  </>

                                }   


                                </td>

                                <td className="td_Left"> { x['pet'] ? x['pet']['name'] : '' } ( { x['pet'] ? x['pet']['species'] : '' } )  </td>
                                
                                {/* <td> 1                                               </td> */}
                                <td> { amount_Payable }                              </td>

                                {/* <td> { amount_Payable - x['amount_paid'] }       </td> */}
                                <td> { x['amount_paid'] }                            </td>
                                
                                <td className="td_Left relative">

                                    { x['payment_method'] }  

                                    <span className="absolute f_9" style={{ top:'4px' , right:'4px' }}> 
                                    
                                         付款日期 : { x['payment_date']?.slice(5,10) } 
                                         
                                    </span>  
                                    


                                    { ( x?.service_date || x?.start_date ) &&

                                      <span className="absolute f_9" style={{ top:'20px' , right:'0px' }}> 
                                          到店日期 : { x?.service_date ? x?.service_date?.slice(5,10) : x?.start_date?.slice(5,10)  } 
                                      </span>  

                                    }
                                
                                </td>
                               
                                <td className="td_Left"> { x['admin_service_note'] } </td>
                             
                             </tr>

                  }) 
                
                }

            </tbody>

        </table>

} ;


export default Advance_Receipt_Table
       