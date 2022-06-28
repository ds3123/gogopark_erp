

type Table = {

  data : any[] ;

}



// @  表單 : 應收款 ( 住宿、安親 )
const Lodge_Receivable_Table = ( { data } : Table ) => {



    return  <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                        <th> 項 目    </th>
                        <th> 寵物資訊 </th>
                        <th> 金 額  <span className="f_10 fDblue"> ( 應 收 ) </span>   </th>
                        {/* <th> 折 扣    </th> */}
                        <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                        <th style={{ width:'210px' }}> 付款方式 </th>
                        <th> 備 註    </th>
                    </tr>
                </thead>

                <tbody>

                   { 
                      
                      data.map( ( x : any , y : number )=> {

                            return <tr key = { y }>

                                       <td> { x['service_status'] }  </td> 

                                       <td className="td_Left"> { x['pet']['name'] } ( { x['pet']['species'] } )</td> 

                                       <td> { x['amount_payable'] } </td> 

                                       {/* <td> { x['amount_payable'] - x['amount_paid'] } </td>  */}

                                       <td> { x['amount_paid'] } </td> 

                                       <td className="td_Left relative"> 

                                            { x['payment_method'] } 

                                            <span className="absolute f_9" style={{ top:'6px' , right:'0px' }}>  付款日期 : { x['payment_date'] ? x['payment_date']?.slice(5,10) : <span className="fRed"> 未填寫 </span> } </span>  
                                            
                                            { /* 安親 */ }
                                            { ( x['service_status'] === '當日安親' || x['service_status'] === '預約安親' ) &&
                                                <span className="absolute f_9" style={{ top:'22px' , right:'0px' }}> 
                                                     到店日期 : {  x['start_date']?.slice(5,10) } 
                                                </span> 
                                            }
                                           
                                            { /* 住宿 */ } 
                                            { ( x['service_status'] === '當日住宿' || x['service_status'] === '預約住宿' ) &&
                                                <span className="absolute f_9" style={{ top:'22px' , right:'0px' }}> 到店日期 : { x['start_date']?.slice(5,10) } </span> 
                                            } 

                                       </td> 

                                       <td className="td_Left"> { x['admin_service_note'] } </td> 
                                       
                                   </tr>

                      }) 
                        
                   }
                    
                </tbody>

            </table> 

} ;


export default Lodge_Receivable_Table
       