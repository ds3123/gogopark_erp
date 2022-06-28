
import { useDispatch } from "react-redux" 
import { set_Side_Panel } from "store/actions/action_Global_Layout" 
import Update_Service from "components/services/edit/Update_Service" 


type Table = {

    data : any[] ;
  
}
  

// @ 表單 : 扣 _ 預收款 ( 洗澡、美容 )
const Deduct_Advance_Receipt_Table = ( { data } : Table ) => {

    const dispatch = useDispatch() ; 


    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;


   return <table className="table is-fullwidth is-hoverable">

                <thead>

                    <tr>
                        <th> 項 目        </th>
                        <th> 寵物資訊      </th> 
                        <th> 金 額        </th>
                        {/* <th> 折 扣    </th> */}
                        <th> 應收帳款 </th>
                        <th style={{ width:'210px' }}> 付款方式 </th>
                        <th> 備 註    </th>
                    </tr>
                    
                </thead>

                <tbody>

                    { 
                     
                        data.map( ( x : any , y : any ) => {


                            let service_Amount_1 = 0 ;
                            let service_Amount_2 = 0 ;

                            const plan_Type    = x?.plan?.plan_type ;  // 方案類型 ( Ex. 預設方案 : 包月洗澡 / 包月美容 ; 自訂方案 )
                            const service_Type = x?.service_type ;     // 服務類型 ( Ex. 洗澡 / 美容 )      

                            // 預設方案
                            if( plan_Type === '包月洗澡' ){
                                service_Amount_1 = x['bath_month_fee'] ;
                                service_Amount_2 = x['bath_month_fee'] ;
                            } 
                            
                            if( plan_Type === '包月美容' && service_Type === '洗澡' ){
                                service_Amount_1 = x['bath_month_fee'] ;
                                service_Amount_2 = x['bath_month_fee'] ;
                            } 

                            if( plan_Type === '包月美容' && service_Type === '美容' ){
                                service_Amount_1 = x['beauty_month_fee'] ;
                                service_Amount_2 = x['beauty_month_fee'] ;
                            } 
                          

                            // 自訂方案
                            if( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ){
                                service_Amount_1 = x?.plan?.service_price ;
                                service_Amount_2 = x?.plan?.service_price ;
                            }    


                            // 服務為 “預付” ( 非採用方案 )
                            if( !plan_Type ){
                                service_Amount_1 = x?.amount_payable ;
                                service_Amount_2 = x?.amount_paid ;
                            }

                          
                            

                            return <tr key = { y } >

                                      <td className="td_Left"> 
                                          <b className="tag is-medium pointer" onClick = { () => click_Service( x ) }  >
                                            { x['payment_type'] } &nbsp; <b className="tag is-white is-rounded">  Q{ x['q_code'] } </b>
                                          </b> 
                                      </td>

                                      <td className="td_Left">  { x['pet']['name'] } ( { x['pet']['species'] } ) </td>
                                      
                                      <td> { service_Amount_1 }      </td>

                                      { /* <td>  0                  </td> */ }

                                      <td> { service_Amount_2 }      </td>

                                      <td className="td_Left relative"> 

                                         { x['payment_method'] } 
                                        
                                         <span className="absolute f_9" style={{ top:'4px' , right:'15px' }}>  
                                              
                                            付款日期 :&nbsp; 
                                            {  x.payment_date ? x.payment_date?.slice(5,10) : <span className="fRed">未填寫</span>  } 
                                         </span> 
                                         
                                         <span className="absolute f_9" style={{ top:'19px' , right:'15px' }}> 到店日期 : { x?.service_date.slice(5,10) } </span>
                                         
                                      </td>

                                      <td className="td_Left"> 

                                          &nbsp;&nbsp;&nbsp;    

                                          { x?.plan &&
                                            <>
                                               { ( x?.plan?.plan_type === '包月洗澡' || x?.plan?.plan_type === '包月美容' ) ? '預設' : '自訂' }方案 : 
                                                <b className="fDblue">  { x?.plan?.plan_type } </b> 
                                            </>
                                          }  

                                      </td>

                                  </tr>

                        }) 
                    
                    }

                </tbody>

            </table>
                  
} ;

export default Deduct_Advance_Receipt_Table
       