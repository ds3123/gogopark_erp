import React, {useEffect, useState} from "react"

import useServiceType from "hooks/layout/useServiceType";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";
import Update_Plan from "components/plan/edit/Update_Plan";
import usePet_Button from "hooks/layout/usePet_Button";
import Update_Customer from "components/customers/edit/Update_Customer";
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records";
import moment from "moment";
import {get_Date_Cal} from "utils/time/date";


const Plans_Rows = ( props : any ) => {

    const { data } = props ;
    const dispatch = useDispatch();

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button([ data['pet'] ]) ;

    // 客戶資料
    const customer = data['customer'] ? data['customer'] : {} ;

    try{
        customer.customer_relation = [ data.customer_relative ] ;
    }catch(e){
        console.log( '客戶關係人發生錯誤' )
    }

    // 寵物品種資料
    const pet_species       = data['pet_species'] ? data['pet_species'] : {} ;

    // 方案使用紀錄
    const plan_used_records = data['plan_used_records'] ;

    // 方案類型欄位 : 顏色、Icon
    const { color , icon }  = useServiceType( data[ 'plan_type' ] , false , 'medium' );

    // 方案 _ 已使用次數
    const [ used_Record , set_Used_Record ] = useState({
                                                          bath   : 0 , // 洗澡
                                                          beauty : 0   // 美容
                                                       }) ;

    // 方案 : 開始、截止 使用日期
    const [ plan_Date , set_Plan_Date ] = useState({
                                                     start : '' , // 開始、第 1 次使用日期
                                                     end   : ''   // 方案截止日期
                                                   }) ;

    
    // 計算 _ 方案已使用次數
    useEffect( () => {

       if( plan_used_records.length > 0 ){

          const beauty_Num = plan_used_records.filter( ( x : any ) => x['service_type'] === '美容' ).length ;
          const bath_Num   = plan_used_records.filter( ( x : any ) => x['service_type'] === '洗澡' ).length ;

          set_Used_Record({ ...used_Record , bath : bath_Num , beauty : beauty_Num } ) ;

       }


    } , [] ) ;


    // 計算 _
    useEffect(() => {

      if( plan_used_records.length > 0 ){

          // 第 1 筆使用紀錄
          const first_Record = plan_used_records[ plan_used_records.length - 1 ] ;

          // 方案使用 _ 開始日期
          const start_Date   = first_Record[ 'created_at' ].slice( 0 , 10 ) ;

          // 方案使用 _ 結束日期
          const End_Date     = moment( get_Date_Cal( start_Date , 90 ) ).format( "YYYY-MM-DD" ) ;

          set_Plan_Date({ ...plan_Date , start: start_Date , end : End_Date  }) ;


      }

    } , [] ) ;


    // 點選 _ 方案類型
    // const click_Service = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;
    const click_Plan_Type          = () => dispatch( set_Side_Panel( true , <Update_Plan /> , { preLoadData : data } ) ) ;
 
    // 點選 _ 客戶資訊 
    const click_Customer_Name      = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : customer } ) ) ;
 
    // 點選 _ 使用情形 : 洗澡 
    const click_UsedRecords_Bath   = () => dispatch( set_Side_Panel( true , <Plan_Used_Records /> , { data : data } ) ) ;
 
    // 點選 _ 使用情形 : 美容 
    const click_UsedRecords_Beauty = () => dispatch( set_Side_Panel( true , <Plan_Used_Records /> , { data : data } ) ) ;

    const left = { textAlign : "left" } as const ;

    const star = { top:"5px", left:"-20px" , color:"red" } ;

    return  <tr>
               <td className="relative t_Left" style={{ height:"90px" }}>

                   { /* 申請退費標示  */ }
                   <b className="absolute f_9" style={ star }>
                       { ( data['is_return'] === 1 && data['return_status'] ) && <span> { data['return_status'] }  </span> }
                   </b>


                   { /* -------------------------------------------------------------------  */ }        


                   { /* 預設方案 */ } 
                   { ( data['plan_type'] === '包月洗澡' || data['plan_type'] === '包月美容' ) &&
                   
                      <b className = { color+" pointer" } onClick = { click_Plan_Type } >
                           <i className = { icon } ></i> &nbsp;  [ 預設 ]  { data['plan_type'] }
                      </b>
                   
                   }
 
                   { /* 自訂方案 */ } 
                   { ( data['plan_type'] !== '包月洗澡' && data['plan_type'] !== '包月美容' ) &&
                   
                      <b className="tag is-medium is-warning is-light pointer" onClick = { click_Plan_Type } >
                         <i className="fas fa-ruler"></i> &nbsp; [ 自訂 ]  { data['plan_type'] }
                      </b>
                   
                   }

               </td>
               <td>

                   { customer['name'] &&
                     <b className="tag is-medium pointer" onClick = { click_Customer_Name } >
                         { customer['name'] } ( { customer['mobile_phone'] } )
                     </b>
                   }

               </td>
               {/* <td> { pet_species['name'] }         </td> */}
               <td style={left}> { petButton }          </td>
               <td style={{ width:"100px" }}> { data['plan_fee_total'] } 元       </td>
               <td style={{ width:"120px" }}> { data['created_at'].slice(0,10) }  </td>
               <td style={{ width:"120px" }}> { plan_Date['start'] }              </td>
               <td style={{ width:"120px" }}> { plan_Date['end'] }                </td>
               <td style={ left }>

                   { /* 預設方案 */ }  
                   { data['plan_type'] === '包月洗澡' &&

                       <b className="tag is-medium is-success is-light is-rounded pointer" onClick={click_UsedRecords_Bath}>
                           洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 4 </b>
                       </b>

                   }

                   { data['plan_type'] === '包月美容' &&

                       <>
                           <b className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={click_UsedRecords_Bath}>
                               洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 3 </b>
                           </b>
                         
                           <b className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_UsedRecords_Beauty } >
                               美 容 &nbsp; <b className="tag is-rounded is-danger"> { used_Record['beauty'] } / 1 </b>
                           </b>
                       </>

                   }


                   { /* 自訂方案 */ }
                   { ( data['plan_type'] !== '包月洗澡' && data['plan_type'] !== '包月美容' ) &&

                         <>

                            { ( data['custom_plan'] && data['custom_plan']['bath_num'] > 0 ) && 

                                <b className="tag is-medium is-success is-light is-rounded pointer m_Right_15 m_Bottom_10" onClick={click_UsedRecords_Bath}>
                                    洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / { data['custom_plan']['bath_num'] } </b>
                                </b>

                            } 

                            { ( data['custom_plan'] && data['custom_plan']['beauty_num'] > 0 ) &&

                               <b className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_UsedRecords_Beauty } >
                                  美 容 &nbsp; <b className="tag is-rounded is-danger"> { used_Record['beauty'] } / { data['custom_plan']['beauty_num'] } </b>
                               </b>

                            }

                        </>

                    }

               </td>

               {/*<td> <i className="fas fa-download pointer"></i> </td>*/}

            </tr>

} ;

export default Plans_Rows