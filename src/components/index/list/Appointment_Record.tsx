
import { useState , useEffect } from "react"

import { useRead_Service_Reservations } from "hooks/ajax_crud/useAjax_Read"
import useServiceType from "hooks/layout/useServiceType";
import { useDispatch , useSelector } from "react-redux";
import Date_Picker from "templates/form/Date_Picker";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type" ;
import Update_Pet from "components/pets/edit/Update_Pet" ;
import { useHistory } from "react-router" ;
import { switch_Appointment_Status , change_Amount_Paid } from "store/actions/action_Service"
import { string_Short } from "utils/string/edit_string"




{ /* 預約紀錄 */}
const Appointment_Records = ( ) => {

    const dispatch = useDispatch();
    const history  = useHistory();

    // Data_Picker 查詢日期 : 預設今日
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;

    // 今日預約來電
    const [ reservation_Today , set_Reservation_Today ] = useState( [] ) ;

    // 取得 : 從 DataPicker 目前日期起，所有【 預約 】資料
    const data = useRead_Service_Reservations( service_Date ) ;

    // React Hook Form
    const { control } = useForm<ICustomer>({ mode : "all" }) ;


    type modal = '服務' | '客戶' | '寵物' ;

    
    // 點選 _ 檢視 : 服務、客戶、寵物
    const click_Service = ( data : any , type : modal ) => {

       document.body.style.position = 'fixed' ;  // 固定、消除 _ 右側捲軸
        
       dispatch( set_Side_Panel( true , <Update_Service /> ,
                                  { source_Page : 'Appoint_Records' , service_Type : data.service_type ,  preLoadData : data } as { service_Type : string }
                                )) ;

    } ;

    // 取得 : 資料類型樣式
    const get_ServiceType = useServiceType( null , true , 'medium' ) ;

    // 切換 _ 預約狀態
    const click_Switch_Status = ( data : any ) => dispatch( switch_Appointment_Status( data , '到店等候中' , history ) ) ;

    // 處理已付變動 change_Amount_Paid
    const handle_Amount_Paid = ( data : any , e : any ) => dispatch( change_Amount_Paid( data , e ) ) ;  // 修改已付金額 
             
    // 篩選、處理資料
    const handle_Data = ( data : any , service_Date : string ) => {

       // 篩選 : 僅基礎、洗澡、美容 ( 不包含安親、住宿 )  
       const data_Today = data.filter( ( x:any ) => x['service_date'] === service_Date ) ;

       // 排序
       data_Today.sort( ( a : any , b : any ) : any => a['created_at'] < b['created_at'] ? 1 : -1 ) ;

       set_Reservation_Today( data_Today ) ;
    
    } ;


       
    // 依據 _ 特定查詢日期，篩選預約資料
    useEffect( () => {
       
      handle_Data( data , service_Date ) ;

    } , [ data , service_Date ] ) ;



    return <>  

              <b className="tag is-large is-primary is-light m_Bottom_30">
                 <i className="fas fa-list"></i> &nbsp; 今日預約來店 &nbsp;
                 <b className="tag is-medium is-white is-rounded"> { reservation_Today.length } </b>
              </b>

              { /* 查詢日期 */ } 
              <div className="columns is-multiline is-mobile relative m_Bottom_50">

                  <div className="column is-3-desktop">

                      <b className="f_14"> 查詢 : 預約日期 </b>
                      <Date_Picker control={control} name="service_Date" default_Date={new Date}/>

                  </div>

              </div>

              <table className="table is-fullwidth is-hoverable">

                  <thead>
                      <tr className="f_12">
                        <th> 預約類別  </th>
                        <th> 預約狀態  </th>
                        <th className="relative" style={{ width:"80px" }} > 應付 </th>
                        <th> 已付     </th>
                        <th> 狀態調整 </th>
                        <th> 寵物資訊 </th>
                        <th> 主人     </th>
                        <th> 手機     </th>
                        <th> 經手     </th>
                        <th> 預約建檔 </th>
                      </tr>
                  </thead>
                  <tbody>

                    {

                        reservation_Today.map( ( x : any , y ) => {

                             return <tr key={y} className="f_11">

                                       <td className="relative">

                                           <b className = { get_ServiceType( x['service_type'] , true , x['service_status'] )['color']  }  onClick={ ( ) => click_Service( x ,'服務') } >
                                               <i className = { get_ServiceType( x['service_type'] , true , x['service_status'])['icon'] } ></i> &nbsp; { x['service_type'] }
                                               &nbsp; Q{ x['q_code'] }
                                           </b>
                                       
                                       </td>
                                       <td> 
                                           { x['shop_status'] === '尚未到店' && <b className="fDred f_11">  { x['shop_status'] } </b> }
                                           { x['shop_status'] === '尚未到店' || <b className="fDblue f_11"> { x['shop_status'] } </b> }
                                       </td>
                                       <td> { x['amount_payable'] }  </td>     
                                       <td> 
                                           
                                         <input type="number" 
                                                className="input is-small f_10" 
                                                value={ x['amount_paid'] }
                                                onChange={ e => handle_Amount_Paid( x , e ) } 
                                                min={ 0 }  
                                                style={{width:"85px",padding:"3px"}} /> 
                                           
                                       </td>    
                                       <td>

                                           { x['shop_status'] === '尚未到店' &&
                                               <b className="tag is-medium pointer" onClick = { () => click_Switch_Status( x ) } > 轉 : 到店等候中 </b>   
                                           }

                                       </td>
                                       <td className="td_Left">
                                            { string_Short( x['pet']['name'] , 3 ) } ( { string_Short( x['pet']['species'] , 3 ) } ) 
                                       </td>
                                       <td> { x['customer']['name'] }                                  </td>
                                       <td> { x['customer']['mobile_phone'] }                          </td>
                                       <td> { x['admin_user'] }                                        </td>
                                       <td> { x[ 'created_at' ] ? x[ 'created_at' ].slice(5,16) : '' } </td>

                                    </tr>

                       })
                    }

                  </tbody>

              </table>

           </>

} ;

export default Appointment_Records