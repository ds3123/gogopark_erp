import React, {FC, useEffect, useState} from "react" ;

import { Edit_Form_Type } from "utils/Interface_Type"
import {useDispatch, useSelector} from "react-redux";
import Qcode_Select_Options from "components/services/edit_components/Qcode_Select_Options";

import useSection_Folding from "hooks/layout/useSection_Folding";

import Date_Picker from "templates/form/Date_Picker"

import Time_Picker from "templates/form/Time_Picker"
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.css';
import moment from "moment";

// Redux
import {set_Info_Column} from "store/actions/action_Info";

import { useForm , Controller } from "react-hook-form";


// 各表單驗證條件

/*
*
*  @ 資料狀態 ( shop_status ) 共有 7 種 ( 服務_類型的 "已到店 "，與到店_類型的 "到店等候中"，相同 ) ~
*
*     # 服務 _ 類型 ( service_Status ， 3 種 ) : 已到店、預約_今天、預約_未來
*     # 到店 _ 類型 ( shop_Status ,     5 種 ) : 尚未到店、到店等候中、到店美容中、洗完等候中、已回家( 房 )
*
*/

interface IInfo extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 服務單( 基礎、洗澡、美容 ) _ 基本資訊 */
const Service_Info : FC<IInfo> = ({ register , setValue , errors , control , current , editType, serviceData  }) => { 

    const dispatch     = useDispatch() ;
    const today        = moment( new Date ).format('YYYY-MM-DD' ) ;                  // 今日
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; // 到店日期( 預設 : 今日 )

    // # 服務狀態
    const [ serviceStatus , set_serviceStatus ] = useState({
                                                              is_Arrived_Today    : true ,  // 當日已到店
                                                              is_Appointed_Today  : false , // 預約 _ 今天
                                                              is_Appointed_Future : false   // 預約 _ 未來
                                                           }) ;

    const { is_folding , Folding_Bt }           = useSection_Folding(false) ;  // 收折區塊


    // 點選 _ 預約今天
    const click_Appoint_Today = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : true }) ;

    // 點選 _ 已到店
    const click_Arrive_Shop   = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false }) ;

    // -----------------

    useEffect( () => {

         

        //【 新增 】

        // 預約 _ 未來
        if( editType !== '編輯' && service_Date !== today ){
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : false , is_Appointed_Future : true  }) ;
        }else{
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false , is_Appointed_Future : false  }) ;
        }

        // 是否選擇 : 過去日期 ( 缺 _ 強制設回今天 2021.06.13 )
        if( editType !== '編輯' && today > service_Date ){

            setValue( 'service_Date' , new Date ) ; // 設回今天
            alert('不能選擇 : 過去日期') ;
            
        }

        //【 編輯 】 


    } , [ service_Date ] ) ;


    // 設定 _ 服務性質 ( service_Status : 已到店、預約_今天、預約_未來 。供提交表單時，由 Redux 取得，動態加入該欄位 )
    useEffect( () => {

      if( serviceStatus['is_Arrived_Today'] )    dispatch( set_Info_Column( 'service_Status' , '已到店' )    ) ;
      if( serviceStatus['is_Appointed_Today'] )  dispatch( set_Info_Column( 'service_Status' , '預約_今天' ) ) ;
      if( serviceStatus['is_Appointed_Future'] ) dispatch( set_Info_Column( 'service_Status' , '預約_未來' ) ) ;

    } , [ serviceStatus ] ) ;


    const way   = { fontSize : "11pt" , top : "-2px" , fontWeight : "bold" } ;
    const green = { color : "rgb(30,180,30)" } ;
    const blue  = { color : "rgb(30,30,180)" } ;

   
    return <>

              { /* 標題 */ }
              <label className="label relative" style={{ fontSize : "1.3em" }} >
                <i className="fas fa-file-alt"></i> &nbsp; 基本資料 &nbsp;
                { Folding_Bt }  { /* 收折鈕 */ }
              </label> <br/>

              { /* 是否收折 : 基本資料 */ }
              { is_folding ||

                <div className="columns is-multiline is-mobile">

                    { /* 服務性質 : 已到店、預約 _ 今天、預約 _ 未來 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 服務性質 : </span> &nbsp;

                            { /* for 新增  */ }
                            { editType === '編輯' ||

                                <>

                                    { serviceStatus['is_Arrived_Today'] &&
                                        <>
                                            <b style={green}> 已到店 &nbsp; </b>
                                            <b className="tag is-medium pointer" onClick={click_Appoint_Today}> 預約 _ 今天 </b>
                                        </>
                                    }

                                    { serviceStatus['is_Appointed_Today'] &&
                                        <>
                                            <b style={green}> 預約 _ 今天 &nbsp; </b>
                                            <b className="tag is-medium pointer" onClick={click_Arrive_Shop}> 已到店 </b>
                                        </>
                                    }

                                    { serviceStatus['is_Appointed_Future'] &&
                                        <>
                                            <b style={green}> 預約 _ 未來 &nbsp; </b>
                                        </>
                                    }

                                </>

                            }

                            { /* for 編輯 */ }
                            { editType === '編輯' && 
                             
                                <>

                                    <b className="fDred m_Right_30"> 
                                       { serviceData['service_status'] === '已到店' ? '到 店' : '預 約' }
                                    </b>  
                                   
                                    { /* 調整 _ 到店狀態 */ }  
                                    <div className="select is-small relative is-link">

                                        <select {...register("appointment_Status")} style={way}>
                                            <option value="尚未到店">   尚未到店   </option>
                                            <option value="到店等候中"> 到店等候中 </option>
                                            <option value="到店美容中"> 到店美容中 </option>
                                            <option value="洗完等候中"> 洗完等候中 </option>
                                            <option value="已回家( 房 )"> 已回家( 房 ) </option>
                                        </select>

                                    </div>

                                </>      
                                   
                            }
                           
                        </div>

                    </div>

                    { /* 到店日期 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 到店日期 : </span> &nbsp;

                            { /* for 新增  */ }
                            { editType === '編輯' ||  <Date_Picker control={control} name="service_Date" default_Date={ new Date }/> }

                            { /* for 編輯 */ }
                            { editType === '編輯' &&  <b style={ blue } > { serviceData.service_date } </b> }

                        </div>

                    </div>

                    { /* Q 處理碼 */}
                    <div className="column is-4-desktop">

                        { /* for 新增  */ }
                        { editType === '編輯' || <Qcode_Select_Options register={register}/> }

                        { /* for 編輯 */ }
                        { editType === '編輯' &&  <div className="tag is-large is-white">   <> 到店處理碼 :&nbsp;<b style={ blue }> Q{ serviceData.q_code } </b>  </> &nbsp; </div> }

                    </div>

                    { /* 預計到店時間 */}
                    { (
                        serviceStatus['is_Appointed_Today']   || 
                        serviceStatus['is_Appointed_Future']  || 
                        ( editType && !serviceStatus['is_Arrived_Today'] ) ||  
                        ( editType && serviceData['service_status'] === '預約_今天' ) ||
                        ( editType && serviceData['service_status'] === '預約_未來' ) 

                      ) &&

                        <div className="column is-4-desktop relative">

                            <div className="tag is-large is-white">

                                <span> <span style={{color: "rgb(230,100,0)"}}> 預計</span>到店 : </span> &nbsp;

                                { /* for 新增 */ }
                                <Time_Picker name="expected_Arrive" control={control} /> 

                                { /* for 編輯 */ }
                                {/* { editType === '編輯' && <b style={ blue }> { serviceData.expected_arrive } </b>  } */}

                            </div>

                        </div>

                    }

                    { /* 實際到店時間 */}
                    { ( serviceStatus['is_Arrived_Today'] || editType  ) && 

                        <div className="column is-4-desktop relative">
                            <div className="tag is-large is-white">
                                <span> 實際到店 : </span> &nbsp;

                                { /* for 新增 */ }
                                <Time_Picker name="actual_Arrive" control={control} /> 

                                { /* for 編輯 */ }
                                {/* { editType === '編輯' && <b style={ blue }> { serviceData.actual_arrive } </b>  } */}

                            </div>
                        </div>

                    }

                    { /* 到店方式 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 到店方式 : </span> &nbsp;

                            { /* for 新增 */ }
                            <div className="select is-small relative">
                                <select {...register("way_Arrive")} style={way}>
                                    <option value="主人送來"> 主人送來     </option>
                                    <option value="接送員接來"> 接送員接來 </option>
                                    <option value="住宿轉來"> 住宿轉來     </option>
                                </select>
                            </div>

                            { /* for 編輯 */ }
                            {/* { editType === '編輯' && <b style={ blue } > { serviceData.way_arrive } </b>  } */}

                        </div>

                    </div>

                    { /* 離店方式 */}
                    <div className="column is-4-desktop">

                        <div className="tag is-large is-white">

                            <span> 離店方式 : </span> &nbsp;

                            { /* for 新增 */ }
                            <div className="select is-small relative">
                                <select {...register("way_Leave")} style={way}>
                                  <option value="主人接走">   主人接走   </option>
                                  <option value="接送員接送"> 接送員接送 </option>
                                  <option value="轉回住宿">   轉回住宿   </option>
                                </select>
                            </div>

                            { /* for 編輯 */ }
                            {/* { editType === '編輯' && <b style={ blue } > { serviceData.way_leave } </b>  } */}

                        </div>

                    </div>

                    { /* 期望離店時間 */}
                    <div className="column is-4-desktop relative">

                        <div className="tag is-large is-white" >

                            <span> 期望離店 : </span> &nbsp;

                            { /* for 新增 */ }
                            <Time_Picker name="expected_Leave" control={control} /> 

                            { /* for 編輯 */ }
                            {/* { editType === '編輯' && <b style={ blue } > { serviceData.expected_leave } </b>  } */}

                        </div>

                    </div>

                </div>

              }

              <hr/><br/>

           </>

};

export default Service_Info