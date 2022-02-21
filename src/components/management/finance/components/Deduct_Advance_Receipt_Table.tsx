
import { useEffect , useState , FC } from "react" ;
import { useDispatch } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Update_Service from "components/services/edit/Update_Service" ;



// @ 表單 : 扣 _ 預收款 ( 洗澡、美容 )
const Deduct_Advance_Receipt_Table : FC< { data : any } > = ( { data } ) => {

    const dispatch = useDispatch() ; 

    // 扣預收款資料
    const [ advance_Receipt_Data , set_Advance_Receipt_Data ] = useState( [] ) ; 
  
    // 點選 _ 服務單
    const click_Service = ( service : any ) => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service['service_type'] ,  preLoadData : service } ) ) ;


    // 設定 _ 扣預收款資料
    useEffect( () => { 
    
      const _data = data.filter( ( x : any ) => x['payment_method'] === '方案' ) ;  // 篩選出 "方案"
      set_Advance_Receipt_Data( _data ) ;                                           // 設定 _ 方案資料 state 

  
    } , [ data ] ) ;

   return <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                        <th> 項 目    </th>
                        <th> 排 序    </th>
                        <th> 寵物資訊 </th> 
                        <th> 金 額    </th>
                        <th> 折 扣    </th>
                        <th> 應收帳款 </th>
                        <th> 備 註    </th>
                    </tr>
                </thead>

                <tbody>

                    { 
                     
                        advance_Receipt_Data.map( ( x : any , y : any ) => {

                            let service_Amount = 0 ;

                            const plan_Type = x['plan']['plan_type'] ; // 方案類型 ( Ex. 預設方案 : 包月洗澡 / 包月美容 ; 自訂方案 )

                            // 預設方案
                            if( plan_Type === '包月洗澡' ) service_Amount = x['bath_month_fee'] ;
                            if( plan_Type === '包月美容' ) service_Amount = x['beauty_month_fee'] ;
                          
                            // 自訂方案
                            if( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) service_Amount = x['plan']['service_price'] ;   

                            return <tr key = { y }>
                                      <td className="td_Left"> 
                                          <b className="tag is-medium pointer" onClick = { () => click_Service( x ) }  >
                                            { x['payment_type'] } 
                                          </b> 
                                      </td>
                                      <td>  Q { x['q_code'] }  </td>
                                      <td className="td_Left">  { x['pet']['name'] } ( { x['pet']['species'] } ) </td>
                                      <td> { service_Amount }  </td>
                                      <td> 0                   </td>
                                      <td> { service_Amount }  </td>
                                      <td className="td_Left"> 
                                      
                                          { x['plan']['plan_type'] === '包月洗澡' || x['plan']['plan_type'] === '包月美容' ? '預設' : '自訂' }方案 : 
                                           <b className="fDblue">  { x['plan']['plan_type'] } </b> 
                                               
                                       </td>
                                  </tr>

                        }) 
                    
                    }

                </tbody>

            </table>
                  
} ;

export default Deduct_Advance_Receipt_Table
       