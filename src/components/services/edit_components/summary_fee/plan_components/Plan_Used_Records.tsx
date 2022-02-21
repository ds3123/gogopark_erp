
import React , { useState } from "react"
import { usePlan_Used_Records_Data } from "hooks/data/usePlan_Used_Records_Data"
import { get_Date_Cal , get_Interval_Dates } from "utils/time/date"
import moment from  "moment";
import { useLogin_User_Info } from "hooks/data/useLogin_User_Info"

import { useSpecies_Id_Prices } from "hooks/data/useSpecies_Prices"


// 取得 _ 使用 開始、截止日期
const get_Date_Data = (  _plan_Used_Records : any[] ) => {

    const first_Record          = _plan_Used_Records[ _plan_Used_Records.length-1 ] ;                     // 第一筆紀錄
    const today                 = moment( new Date ).format( "YYYY-MM-DD" ) ;                             // 今日
    const plan_Start_Date       = first_Record ? first_Record['created_at'].slice(0,10) : today ;         // 方案使用 _ 開始日期
    const plan_End_Date         = moment( get_Date_Cal( plan_Start_Date ,90 ) ).format( "YYYY-MM-DD" ) ;  // 方案使用 _ 結束日期
    const rest_Num_Of_End_Dates = get_Interval_Dates( today , plan_End_Date ).length - 1 ;                // 距離使用截止日期，尚餘天數

    return { plan_Start_Date , plan_End_Date , rest_Num_Of_End_Dates }

} ;


// NOTE : 目前尚未考慮 "包月美容" ( 2021.09.28 )

// @ 個別方案 _ 使用情形 
const Plan_Used_Records = ( ) => {

    // 取得 _ 使用紀錄資料物件 ( 方案資料、方案類型、套用品種名稱、方案使用紀錄  )
    const { data , plan_Type , applied_Species_Name , _plan_Used_Records } = usePlan_Used_Records_Data() ;

    // 使用次數
    let used_Records_Num      = _plan_Used_Records.length ;

    // 取得 _ 該品種各種服務價格 ( 初次洗澡優惠、單次洗澡、包月洗澡 .... )
    const species_Prices      = useSpecies_Id_Prices( data['pet_species_id'] ) ;

    // 單次價格
    const single_Bath_Price   = species_Prices['bath_Single'] ;   // 洗澡
    const single_Beauty_Price = species_Prices['beauty_Single'] ; // 美容

    // 取得 _ 使用開始日期、使用截止日期、距離使用截止日期的天數
    const { plan_Start_Date , plan_End_Date , rest_Num_Of_End_Dates } = get_Date_Data( _plan_Used_Records ) ;

    // 目前登入帳號的 _ 使用者姓名
    const current_User_Name                 = useLogin_User_Info('姓名') ;

    // 是否 _ 申請退費
    const [ is_Return , set_Is_Return ]     = useState(false ) ;

    // 退費類型
    const [ return_Type , set_Return_Type ] = useState< '' | '優惠退費' | '一般退費' >( '' ) ;

    // 點選 _ 申請退費
    const click_Is_Return   = () => set_Is_Return( !is_Return ) ;

    // 點選 _ 退費類型
    const click_Return_Type = ( type : '優惠退費' | '一般退費' ) => set_Return_Type( type ) ;


    return <div>

                 <br/>

                 { /* 標題列 */ }   
                 <b className={ `tag is-medium is-rounded is-large is-light ${ plan_Type === '包月洗澡' ? 'is-success' : 'is-danger' }` } >

                    { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                    { plan_Type } ( { applied_Species_Name } ) &nbsp; &nbsp;

                    <b className="tag is-white is-medium is-rounded">
                       基本價格 : &nbsp; <span className="fBlue m_Right_10"> ${ data ? data['plan_basic_price'] : 0 }  </span>
                       個體調整金額 : &nbsp; <span className="fBlue m_Right_10"> ${ data ? data['plan_adjust_price'] : 0 } </span>
                       接送費   : &nbsp; <span className="fBlue m_Right_30"> ${ data ? data['pickup_fee'] : 0 }        </span>
                       小 計    : &nbsp; <span className="fRed">  ${ data ? data['plan_fee_total'] : 0 }    </span>
                    </b>

                 </b>

                 <br/>

                 { /* 使用起始日期、使用截止日期、距離使用截止日期 .. */ }
                 {  _plan_Used_Records.length > 0 &&

                    <>

                         <br/><br/>

                         <b className="tag is-medium is-white m_Right_30">
                             使用起始日期 : <span className="fDred"> &nbsp; { plan_Start_Date } </span>
                         </b>

                         <b className="tag is-medium is-white m_Right_30 relative">
                             <span className="f_10 absolute" style={{top:"-17px" , left:"15px" , color:"gray"}} > * 方案須在 90 天內，使用完畢 </span>
                             使用截止日期 : <span className="fDred"> &nbsp; { plan_End_Date } </span>
                         </b>

                         <b className="tag is-medium is-white">
                             距離使用截止日期，尚有 : <span className="fRed"> &nbsp; { rest_Num_Of_End_Dates } </span> &nbsp; 天
                         </b>

                         { /* 申請退費 */ }
                         <div className="columns is-multiline is-mobile m_Top_30">

                             <div className="column is-2-desktop">
                               <b className={ `tag is-medium pointer ${ is_Return ? 'is-danger is-light' : '' }` } onClick = { () => click_Is_Return() } >
                                 <i className="fas fa-dollar-sign"></i> &nbsp; 申請退費
                               </b>
                             </div>

                             { is_Return &&

                                 <div className="column is-3-desktop">
                                     <b className={`tag is-medium m_Right_30 pointer ${return_Type === '優惠退費' ? 'is-danger' : ''}`}
                                        onClick={ () => click_Return_Type('優惠退費')}> 優惠退費 </b>
                                     <b className={`tag is-medium pointer ${return_Type === '一般退費' ? 'is-danger' : ''}`}
                                        onClick={ () => click_Return_Type('一般退費')}> 一般退費 </b>
                                 </div>

                             }

                         </div>

                    </>

                  }

                  { /* 一般退費、優惠退費 */ }
                  { is_Return &&

                        <div className="columns is-multiline is-mobile">

                            <div className="column is-12-desktop">

                               { /* 一般退費  */ }
                               { return_Type === '一般退費' &&

                                   <div>
                                        <span className="tag is-medium is-white m_Right_5"> 使用情形 : &nbsp; <b className="fDred"> { used_Records_Num } / 4 </b> &nbsp; 次 </span>
                                        <span className="tag is-medium is-white m_Right_5">
                                            單次洗澡價格 : <b className="fBlue"> &nbsp; ${ single_Bath_Price } </b>
                                        </span>
                                        <span className="tag is-medium is-white m_Right_15">
                                            單次個體調整金額 :
                                            <b className="fBlue" style={{display:"inline-block",width:"100px"}}>
                                               &nbsp; <input className="input" type="number" />
                                               { /* ${ data['plan_adjust_price'] / 4 } */ }
                                            </b>
                                        </span>
                                        <span className="tag is-medium is-white m_Right_40">
                                            單次接送費 :
                                             <b className="fBlue" style={{display:"inline-block",width:"100px"}}>
                                               &nbsp; <input className="input" type="number" />
                                                 { /* ${ data['pickup_fee'] / 4 } */ }
                                            </b>
                                        </span> <br/><br/>

                                        <span className="tag is-medium is-white">
                                            <b>  退費金額 : <b className="fRed m_Right_30"> $1025 </b> </b>
                                            <b className="relative f_10" style={{ top:"-10px" , left:"-20px" }}> *&nbsp;計算方式 : 4700 - ( 1225 * 3 ) = 1025 </b>
                                        </span>

                                   </div>

                               }

                               { /* 優惠退費  */ }
                               { return_Type === '優惠退費' &&

                                    <div>
                                        <span className="tag is-medium is-white m_Right_10"> 使用情形 : &nbsp; <b className="fDred"> { used_Records_Num } / 4 </b> &nbsp; 次 </span>
                                        <span className="tag is-medium is-white m_Right_10">
                                             <b>  退費金額 : <b className="fRed"> $1175 </b> &nbsp; ( &nbsp; <b className="fBlue"> { 4 - used_Records_Num } 次包月 </b> &nbsp; ) </b>
                                        </span>
                                    </div>

                               }

                            </div>


                           { ( return_Type === '一般退費' || return_Type === '優惠退費' ) &&

                               <>

                                   <div className="column is-8-desktop">
                                      <input type="text" className="input" placeholder="請填寫 : 退費理由" />
                                   </div>
                                   <div className="column is-4-desktop">

                                       <b className="tag is-medium hover f_15">
                                           <i className="fas fa-paper-plane"></i> &nbsp; 提交申請退費 ( { current_User_Name ? current_User_Name : '測試員' } )
                                       </b>

                                   </div>

                               </>

                           }

                        </div>

                  }

                 <hr className="m_Top_50 m_Bottom_50" />

                 {  // 有 _ 使用紀錄

                     _plan_Used_Records.length > 0 &&

                        <table className="table is-fullwidth is-hoverable">

                            <thead>
                                <tr>
                                    <th>  服務說明  </th>
                                    <th>  服務價格  </th>
                                    
                                    <th>  使用日期  </th>
                                </tr>
                            </thead>

                            <tbody>

                                {

                                    _plan_Used_Records.map( ( x : any , y : number ) => {

                                        let rest_Amount = y === 0 ? data['plan_fee_total'] - 0 : data['plan_fee_total'] - x['service_price']   ;

                                        let used_Amount = 0 ;
                                        used_Amount += x['service_price'] ;

                                       
                                        return <tr key = { y } >
                                                  <td> { x['service_note'] }             </td>
                                                  <td> { x['service_price'] }            </td>
                                                  
                                                  <td> { x['created_at'].slice( 0,10 ) } </td>
                                               </tr>

                                    })

                                }

                            </tbody>
                        </table>

                 }


                 {  // 沒有 _ 使用紀錄

                    _plan_Used_Records.length > 0 ||

                         <b className="tag is-large is-danger">
                             <i className="far fa-folder-open"></i> &nbsp; 無方案使用紀錄
                         </b>

                 }

           </div>

} ;

export default Plan_Used_Records

