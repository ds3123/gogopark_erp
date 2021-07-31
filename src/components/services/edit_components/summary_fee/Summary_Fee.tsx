
import React, {FC, useEffect, useState} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {get_Today} from "utils/time/date";

import { usePrice_Service , usePrice_Basic , usePrice_Bath , usePrice_Beauty  , usePrice_Care , usePrice_Lodge , usePrice_Plan , usePrice_Extra } from "hooks/data/usePrice"
import { useDispatch , useSelector } from "react-redux";

import { FeeDetail_Basic , FeeDetail_Bath , FeeDetail_Beauty , FeeDetail_Plan_Bath , FeeDetail_Plan_Beauty } from "components/services/edit_components/summary_fee/Fee_Detail"

import { usePlan_Month_Bath_Tag } from "hooks/layout/usePlans_Records"
import { set_Invalid_To_Month_Bath } from "store/actions/action_Form_Validator"

import { useRead_Species_By_Column } from "hooks/ajax_crud/useAjax_Read"
import axios from "../../../../utils/axios";



interface TS extends Edit_Form_Type {

    current      : string ;
    editType?    : string ;
    serviceData? : any ;

}


/* 服務費用 _ 結算明細 */
const Summary_Fee : FC<TS> = ( { register , setValue , errors  , current, editType, serviceData } ) => {

          const dispatch = useDispatch() ;

          // 目前品種下拉選項，所選擇的品種 Id
          const current_Species_Id = useSelector(( state : any ) => state.Pet.current_Species_Id ) ;

          // 客戶 _ 方案 ( Ex. 包月洗澡、美容 )、使用紀錄
          const Customer_Plans_Records = useSelector(( state : any ) => state.Customer.Customer_Plans_Records ) ;

          // 是否已點選 : ( 包月洗澡 ) 使用此方案
          const use_Plan_Month_Bath = useSelector(( state : any ) => state.Plan.use_Plan_Month_Bath ) ;

    // --------------------------------------------------------

          // 應收金額
          const [ receivable , set_Receivable ] = useState( 0 ) ;

          // 付款方式
          const [ paymentMethod , set_PaymentMethod ]  = useState( '現金' ) ;

          // --------------------------------------------------------


          // 客戶所購買 _ 方案
          const [ plans , set_Plans ] = useState({
                                                              month_Bath   : []  , // 包月洗澡
                                                              month_Beauty : []  , // 包月美容
                                                           }) ;


          // 目前品種下拉選項，所選擇的品種 Id 資料
          const [ current_Species , set_Current_Species ] = useState( { name : '' } ) ;

          // 方案使用紀錄標籤 : 包月洗澡
          const plan_Month_Bath_Tag = usePlan_Month_Bath_Tag( plans);

    // @ 各服務類型，所應提供資料 -------------------------------------------------------------------------

          // # 接送費、加價項目費、加價美容費 ------
          const { pickupFee , extraItemFee , extraBeautyFee } = usePrice_Extra() ;

          // 服務費用 : 基礎、洗澡、美容
          const { service_Price , receivable : service_Receivable } = usePrice_Service( current , pickupFee , paymentMethod , setValue );


          // # 安親 ------
          const { current_Care_Type , Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price } = usePrice_Care() ;

          // # 住宿 ------

          // # 方案 ------
          const { current_Plan_Type , receivable : plan_Receivable , pickupFee : plan_PickupFee , Month_Bath_Price , Month_Beauty_Price , Lodge_Coupon_Price , self_Adjust_Price } = usePrice_Plan( current , paymentMethod , setValue ) ;


          // @ 變動處理 --------------

          // 實收金額
          const handle_ActualPayment = ( value : any ) => {

                if( value > receivable ){
                    alert('實收金額，不能大於應收金額') ;
                    setValue( 'amount_Paid' , receivable ) ;
                    return false ;
                }

                if( value < 0 ){
                    setValue( 'amount_Paid' , '' ) ;
                    return false ;
                }

            } ;

          // 優惠價格
          const handle_Discount = ( value : any ) => {

                if( value > receivable ){
                    alert('優惠金額，不能大於應收金額') ;
                    setValue( 'amount_Discount' , '' ) ;
                    return false ;
                }

                setValue( 'amount_Paid' , receivable - value ) ;  // 實收

          } ;

          // 設定 _ 應收金額
          useEffect( ( ) => {

             // 主要服務( 基礎、洗澡、美容 )
             if( current === '基礎' || current === '洗澡' || current === '美容' ) set_Receivable( service_Receivable ) ;

             // 方案( 包月洗澡、包月美容、住宿券 )
             if( current === '方案' ) set_Receivable( plan_Receivable ) ;


          } ,[ current , service_Receivable , plan_Receivable ] ) ;

          // 設定 _ 客戶所購買 : 方案
          useEffect(( ) => {

             if( Customer_Plans_Records.length ){

                const month_Bath   = Customer_Plans_Records.filter( ( x : any ) => x['plan_type'] === '包月洗澡' ) ;
                const month_Beauty = Customer_Plans_Records.filter( ( x : any ) => x['plan_type'] === '包月美容' ) ;

                set_Plans({ ...plans , month_Bath : month_Bath , month_Beauty : month_Beauty } ) ;

             }else{

                set_Plans({ ...plans , month_Bath : [] , month_Beauty : [] } ) ;

             }

          } , [ Customer_Plans_Records ] ) ;

          // 設定 _　付款方式 驗證邏輯
          useEffect(( ) => {

             // 已選擇 "包月洗澡" ， 並點選 _ 套用方案 : 包月洗澡
             if( current === '洗澡' && paymentMethod === '包月洗澡' && !use_Plan_Month_Bath ){
                 dispatch( set_Invalid_To_Month_Bath(true ) );
             }else{
                 dispatch( set_Invalid_To_Month_Bath(false ) );
             }

          } , [ current , paymentMethod , use_Plan_Month_Bath ] ) ;


          // 設定 _ 目前寵物區欄位，下拉品種 Id
          useEffect(() => {

             if( current_Species_Id ){

                axios.get( `/pet_species/show_by_col_param/id/${ current_Species_Id }` ).then(res => {

                   if( res.data.length > 0 ){
                       set_Current_Species({ ...current_Species , name : res.data[0]['name'] } ) ;
                   }else{
                       set_Current_Species({ ...current_Species , name : '' } ) ;
                   } ;

                }) ;

             }

          } ,[ current_Species_Id ] ) ;


    return <>

              <br/>

              { /* 費用明細 */ }
              <div className="columns is-multiline  is-mobile">

                { /* 服務項目 */ }
                <div className="column is-4-desktop">

                       <span className="tag is-large is-white">
                          <b> 服務項目 :
                              <span className="fDblue" > { current } &nbsp;
                                <span className='f_10'>
                                   { ( current === '方案' && editType !== '編輯' && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                   { ( current === '安親' && editType !== '編輯' && current_Care_Type ) && `( ${ current_Care_Type } )` }
                                </span>
                              </span>
                          </b>
                       </span>

                </div>

                { /* 應收金額 */ }
                <div className="column is-8-desktop">

                    <span className="tag is-large is-white">
                      <b> 應收金額 :&nbsp;
                          <span style={{ color:"red" }} >
                             { editType !== '編輯' && receivable }                 { /* for 新增 */ }
                             { editType !== '編輯' || serviceData.amount_payable } { /* for 編輯 */ }
                          </span> 元
                      </b>
                    </span>

                    { /* 消費明細 */ }
                    { current === '基礎' && editType !== '編輯' &&  <FeeDetail_Basic  servicePrice = { service_Price }  pickupFee = { pickupFee } /> }
                    { current === '洗澡' && editType !== '編輯' &&  <FeeDetail_Bath   servicePrice = { service_Price }  pickupFee = { pickupFee }  extraItem  = { extraItemFee } extraBeauty = { extraBeautyFee } /> }
                    { current === '美容' && editType !== '編輯' &&  <FeeDetail_Beauty servicePrice = { service_Price }  pickupFee = { pickupFee }  extraItem  = { extraItemFee } /> }
                    { ( current === '方案' && editType !== '編輯' && current_Plan_Type === '包月洗澡' ) &&
                        <FeeDetail_Plan_Bath  servicePrice = { Month_Bath_Price } adjustAmount = { self_Adjust_Price } pickupFee = { plan_PickupFee } />
                    }

                    { ( current === '方案' && editType !== '編輯' && current_Plan_Type === '包月美容' ) &&
                       <FeeDetail_Plan_Beauty  servicePrice = { Month_Beauty_Price } adjustAmount = { self_Adjust_Price } pickupFee = { plan_PickupFee } />
                    }


                </div>

                { /* 付款方式  */ }
                <div className="column is-4-desktop" >

                     <span className="tag is-large is-white" >

                         <b> 付款方式 : </b> &nbsp;

                         { /* for 新增 */ }
                         { editType !== '編輯' &&

                             <div className="control has-icons-left">

                                 <div className="select is-small relative">

                                     <select {...register("payment_Method")}
                                             style={{fontSize: "13pt", top: "-7px", fontWeight: "bold"}}
                                             onChange={e => set_PaymentMethod(e.target.value)}>

                                         <option value="現金"> 現金</option>

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                            <option value="贈送"> 贈送 </option>
                                         }

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                            <option value="優惠"> 優惠 </option>
                                         }

                                         { current === '洗澡' &&
                                            <option value="包月洗澡"> 包月洗澡 </option>
                                         }

                                         { current === '美容' &&
                                            <option value="包月美容"> 包月美容 </option>
                                         }

                                     </select>

                                 </div>

                                 <div className="icon is-small is-left"><i className="fas fa-money-bill-wave"></i></div>

                             </div>

                         }

                         { /*  for 編輯  */ }
                         { editType !== '編輯' || <b className="fDblue"> { serviceData.payment_method } </b>  }


                     </span>

                </div>

                { /* 實收金額 */ }
                { ( paymentMethod === '現金' || paymentMethod === '贈送'  ) &&

                    <>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        { paymentMethod === '現金' &&

                            <div className="column is-2-desktop relative">

                                { /* for 新增 */ }
                                { editType !== '編輯' &&

                                    <div className="control has-icons-left" style={{left: "-64px"}}>

                                        <input className="input relative" type="number" min="0"
                                               {...register("amount_Paid")}
                                               onChange={e => handle_ActualPayment(e.target.value)} />

                                        <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                                        <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                                    </div>

                                }

                                { /* for 編輯 */ }
                                { editType !== '編輯' ||

                                    <b className="tag is-large is-white absolute" style={{ left : "-64px" , top:"12px" }} >
                                        <b style={{ color:"red"}}> { serviceData.amount_paid } </b>&nbsp;元
                                    </b>

                                }

                            </div>

                        }

                        { /* 付款方式為 "贈送" 時，"實收金額" _ 不能填寫  */ }
                        { paymentMethod === '贈送' &&

                            <div className="column is-2-desktop relative">
                                <span className="tag is-large is-white absolute" style={{left: "-60px"}}>  <b style={{ color:"red" }}> 0 </b>  <b> &nbsp; 元 </b> </span>
                            </div>

                        }

                    </>

                }

                { /* 優惠 */ }
                { paymentMethod === '優惠' &&

                    <>
                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> <span style={{ color:"orange" }}>優惠</span>金額 : </b> </span>
                        </div>

                        <div className="column is-2-desktop relative">

                            <div className="control has-icons-left" style={{left:"-60px"}}>

                                <input className="input relative"  type="number" min="0"
                                       { ...register( "amount_Discount" ) }
                                       onChange={ e => handle_Discount( e.target.value ) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                            </div>

                            <span className="tag is-large is-white absolute" style={{ top: "10px" , left: "110px"}}> <b> 元 </b> </span>

                        </div>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        <div className="column is-1-desktop relative" >
                            <input className="input relative" type="text" { ...register( "amount_Paid" ) } style={{left:"-60px"}} disabled />
                            <span className="tag is-large is-white absolute" style={{left: "16px"}}> <b> 元 </b> </span>
                        </div>

                    </>

                }

                { /* 包月洗澡 */ }
                  { paymentMethod === '包月洗澡' &&


                   <div className="column is-8-desktop">

                       { plans['month_Bath'].length > 0 &&

                           <>

                               <span className="tag is-large is-white">

                                  <b>
                                      客戶 _ <span className="fDred"> { Customer_Plans_Records[0]['customer'] ? Customer_Plans_Records[0]['customer']['name'] : '' } </span>
                                      / 選擇品種 _

                                       { current_Species['name'] ?
                                           <span className="fDred"> { current_Species['name'] } </span> :
                                           <span className="fRed"> 尚未選擇品種                  </span>
                                       } :
                                  </b> <br/>

                               </span>

                               { plan_Month_Bath_Tag ? plan_Month_Bath_Tag : <b className="tag"> 沒有 </b> } { /* 方案使用紀錄標籤 : 包月洗澡 */ }

                           </>

                       }

                       { plans['month_Bath'].length > 0 ||

                          <span className="tag is-large is-danger m_Left_15">
                              <b> 客戶並未購買任何 : 包月洗澡方案 </b>
                          </span>

                       }

                   </div>




                  }




                { /* 包月美容 */ }





              </div>

              { /* 櫃台經手資訊 */ }
              <div className="columns is-multiline  is-mobile">

                    { /* 櫃台人員  */ }
                    <div className="column is-4-desktop">
                         <span className="tag is-large is-white">
                             <b> 櫃台人員 : </b> &nbsp;

                             { /* for 新增  */ }
                             { editType !== '編輯' &&

                                 <div className="control has-icons-left">
                                     <div className="select is-small relative">
                                         <select  {...register("admin_User")}
                                                  style={{fontSize: "13pt", top: "-7px", fontWeight: "bold"}}>
                                             <option value="請選擇"> 請選擇</option>
                                             <option value="陳宜芳"> 陳宜芳</option>
                                             <option value="李馨慧"> 李馨慧</option>
                                         </select>
                                     </div>
                                     <div className="icon is-medium is-left"><i className="fas fa-user"></i></div>
                                 </div>

                             }

                             { /* for 編輯  */ }
                             { editType !== '編輯' ||

                                 <b className="absolute" style={{ left : "122px" , top:"16px" }} >
                                     <b className="fDblue"> { serviceData.admin_user }  </b>
                                 </b>

                             }

                         </span>
                    </div>

                    { /* 櫃台備註  */ }
                    <div className="column is-2-desktop">
                       <span className="tag is-large is-white"> <b> 櫃台備註 : </b> </span>
                    </div>

                    <div className="column is-6-desktop relative">

                        { /* for 新增  */ }
                        { editType !== '編輯' &&

                            <div className="control has-icons-left" style={{left: "-60px"}}>
                                <input className="input" type="text" {...register("admin_Service_Note")} />
                                <span className="icon is-small is-left"> <i className="fas fa-edit"></i> </span>
                            </div>

                        }

                        { /* for 編輯  */ }
                        { editType !== '編輯' ||

                            <b className="absolute f_15" style={{ left : "-46px" , top:"17px" }} >
                                <b className="fDblue"> { serviceData.admin_service_note }  </b>
                            </b>

                        }


                    </div>

                    { /* 建檔日期 */ }
                    <div className="column is-4-desktop">
                       <span className="tag is-large is-white">
                          <b> 建檔日期 : <span className="fDblue">
                              { editType !== '編輯' && get_Today() }            { /* for 新增  */ }
                              { editType !== '編輯' || serviceData.created_at.slice(0,10) } { /* for 編輯 */ }
                          </span> </b>
                       </span>
                    </div>

              </div>

           </>

} ;

export default Summary_Fee