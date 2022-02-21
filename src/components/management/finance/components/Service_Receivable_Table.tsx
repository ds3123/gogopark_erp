import { useEffect , useState , FC } from "react" ;
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";


// @ 表單 : 應收款 ( 洗澡、美容 )
const Service_Receivable_Table : FC< { data : any } > = ( { data } ) => {

    const dispatch = useDispatch() ;
    
    // 資料
    const [ receivable_Data , set_Receivable_Data ] = useState( [] ) ;

    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;


    useEffect( () => { 
    
      // 篩選、設定 _ 現金支付資料，並且服務類型為 : 基礎、洗澡、美容 ( 排除 : 安親、住宿 ) 
      const _data = data.filter( ( x : any ) => x['payment_method'] === '現金' && ( x['service_type'] === '基礎' || x['service_type'] === '洗澡' || x['service_type'] === '美容' ) ) ;
     
      set_Receivable_Data( _data ) ;

    
    } , [ data ] ) ;


   return  <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                      <th> 項 目    </th>
                      <th> 排 序    </th>
                      <th> 寵物資訊 </th> 
                      <th> 金 額 <span className="f_10 fDblue"> ( 應 收 ) </span>  </th>
                      <th> 折 扣    </th>
                      <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                      <th> 備 註    </th>
                    </tr>
                </thead>

                <tbody>

                    { 
                      
                      receivable_Data.map( ( x : any , y : number )=> {

                            return <tr key = { y }>
                                      <td className="td_Left">
                                         <b className="tag is-medium pointer" onClick = { () => click_Service( x ) } > 
                                          
                                           { x['payment_type'] }  &nbsp;
                                           <span className="f_9"> { x['service_status'] === '預約_今天' || x['service_status'] === '預約_未來' ? '( 預約 )' : '( 現場 )' } </span>
                                  
                                         </b>
                                      </td>
                                      <td> Q { x['q_code'] }                                                    </td>
                                      <td className="td_Left"> { x['pet']['name'] } ( { x['pet']['species'] } ) </td>
                                      <td> { x['amount_payable'] }                                              </td>
                                      <td>  0                                                                   </td>
                                      <td> { x['amount_paid'] }                                                 </td>
                                      <td> { x['admin_service_note'] }                                          </td>
                                   </tr>

                      }) 
                        
                    }

                </tbody>

           </table>

} ;


export default Service_Receivable_Table
       
