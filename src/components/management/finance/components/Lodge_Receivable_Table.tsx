

import { useEffect , useState , FC } from "react" ;
import { useDispatch } from "react-redux";



// @  表單 : 應收款 ( 住宿、安親 )
const Lodge_Receivable_Table : FC< { data : any } > = ( { data } ) => {


    const dispatch = useDispatch() ;

    // 住宿、安親資料
    const [ care_Lodage_Data , set_Care_Lodage_Data ] = useState( [] ) ;

    useEffect( () => { 

      // 篩選、設定 _ 現金支付資料，並且服務類型為 : 安親、住宿 
      const _data = data.filter( ( x : any ) => {

        return x['payment_method'] === '現金' && ( x['service_status'] === '當日安親' || x['service_status'] === '預約安親' || x['service_status'] === '當日住宿' || x['service_status'] === '預約住宿' )

      }) ;

      set_Care_Lodage_Data( _data ) ;

  
    } , [ data ] ) ;

    return  <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                        <th> 項 目    </th>
                        <th> 寵物資訊 </th>
                        <th> 金 額  <span className="f_10 fDblue"> ( 應 收 ) </span>   </th>
                        <th> 折 扣    </th>
                        <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                        <th> 備 註    </th>
                    </tr>
                </thead>

                <tbody>

                   { 
                      
                      care_Lodage_Data.map( ( x : any , y : number )=> {

                            return <tr key = { y }>
                                       <td> { x['service_status'] } </td> 
                                       <td className="td_Left"> { x['pet']['name'] } ( { x['pet']['species'] } )</td> 
                                       <td> { x['amount_payable'] } </td> 
                                       <td> { x['amount_payable'] - x['amount_paid'] } </td> 
                                       <td> { x['amount_paid'] } </td> 
                                       <td className="td_Left"> { x['admin_service_note'] } </td> 
                                   </tr>

                      }) 
                        
                   }
                    
                </tbody>

            </table> 

} ;


export default Lodge_Receivable_Table
       