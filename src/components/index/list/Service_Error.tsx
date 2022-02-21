
import { useEffect , useState } from "react";

import { useSelector } from "react-redux";
import Date_Picker from "templates/form/Date_Picker";
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";

// React Hook Form
import { useForm } from "react-hook-form" ;
import { IService } from "utils/Interface_Type";
import Usage_Note from "templates/note/Usage_Note" ;

import axios from "utils/axios" ;


const note_Str = `此區塊列舉 :「轉異常」、「銷單」、「已回家( 房 ) 情況下，應收金額與實收金額不符合」資料` ;


{ /* 服務異常 */ }
const Service_Error = ( ) => {
 
    // 報表日期
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( `/services/show_services_is_delete_error_by_date/${service_Date}` , 'service' ) ;

    // React Hook Form
    const { control } = useForm<IService>({ mode : "all" }) ;

    // 已回家( 房 ) 情況下，應付金額 與 實付金額 不符合  
    const [ is_GoHome_UnPaid , set_Is_GoHome_UnPaid ] = useState( [] ) ;

    // 所有異常資料
    const [ error_Data , set_Error_Data ] = useState<any[]>( [] )

    useEffect( () => { 
    
      axios.get( `services/show_services_is_gohome_by_date/${ service_Date }` ).then( res => {

         // 篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 )   
         const is_GoHome_Unpaid = res.data.filter( ( x : any ) => x['amount_payable'] !== x['amount_paid'] ) ;

         set_Is_GoHome_UnPaid( is_GoHome_Unpaid ) ;
       
      }) ;
    
    } , [ service_Date ] ) ;


    useEffect( () => { 
    
       const f_PageItems = pageOfItems.filter( ( x:any ) => x !== 3 ) ;  // 剔除 3 ( 確認 3 怎麼從 Pagination 套件得出 2020.06.10 )    
       const error_Arr   = f_PageItems.concat( is_GoHome_UnPaid ) ;

       set_Error_Data( error_Arr ) ;

    } , [ pageOfItems , is_GoHome_UnPaid ] ) ;


    return <>
                <b className="tag is-large is-danger is-light m_Bottom_20"> <i className="fas fa-exclamation"></i> &nbsp; 服務異常 </b>

	            { /* 說明 */ }  
                <div className="m_Left_15 m_Bottom_50"> <Usage_Note  note={ note_Str }  />  </div>    

                <div className="columns is-multiline is-mobile relative m_Bottom_50">

                    { /* 異常日期 */ }
                    <div className="column is-3-desktop">
                        <b className="f_14"> 查詢日期 </b>
                        <Date_Picker control={ control } name="service_Date" default_Date={ new Date } />
                    </div>

                </div>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                          <th> 排 序    </th>
                          <th> 服務類別 </th>
                          <th> 異常說明 </th>
                          <th> 主人姓名 </th>
                          <th> 主人手機 </th>
                          <th> 寵物資訊 </th>
                          <th> 經手人   </th>
                          <th> 服務日期 </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            error_Data.map( ( x : any , y : number ) => {


                                   if( x === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                                   let note = '' ;

                                   const is_Paid_Error = x['amount_payable'] !== x['amount_paid'] ;

                                   // * 異常原因
                                   if( x['is_error'] === 1 )  note = x['error_cause'] ;  // 一般異常
                                   if( x['is_error'] !== 1 )  note = '銷 單' ;

                                   if( is_Paid_Error && x['amount_paid'] === 0 ) note = '尚未付款' ;   
                                   if( is_Paid_Error && x['amount_paid'] > 0 )   note = '僅付部分金額' ; 
                                   if( x['amount_paid'] > x['amount_payable'] )  note = '實付金額，超過應付金額' ; 
                                

                                return <tr key={y}>
                                        
                                         <td> Q{ x['q_code'] }                                                  </td>
                                         <td> { x['service_type'] }                                             </td>
                                         <td className="td_Left"> <b className="fDred"> { note } </b>           </td>
                                         <td> { x['customer'] ? x['customer']['name'] : ''  }                   </td>
                                         <td> { x['customer'] ? x['customer']['mobile_phone'] : ''  }           </td>
                                         <td className="td_Left">
                                              { x['pet'] ? x['pet']['name'] : ''  }&nbsp;( { x['pet'] ? x['pet']['species'] : ''  } )
                                         </td>
                                         <td> { x['error_submitter'] ? x['error_submitter'] : x['admin_user'] } </td>
                                         <td> { x['created_at'] ? x['created_at'].slice(0,10) : '' }            </td>

                                       </tr>

                            })
                        }

                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

           </>

} ;

export default Service_Error