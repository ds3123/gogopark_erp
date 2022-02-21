import React from "react" ;

import { useForm , SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";

import axios from "utils/axios" ;

import moment from "moment";
import {toast} from "react-toastify";



type Inputs = {
    plus_item : string ;
} ;


{ /* 主人確認面板  */ }
const Customer_Confirm_Options = () => {

    const dispatch = useDispatch() ;

    // 目前處理 _ 美容師姓名
    const current_Beautician = useSelector(( state : any ) => state.Beautician.Current_Beautician ) ;

    // 目前所點選 _ 寵物 / 服務
    const Current_Pet        = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;


    // React Hook Form
    const { register , handleSubmit , setValue , formState: { errors , isDirty , isValid } } =
                useForm< Inputs >({
                                     mode : "all" ,
                                  }) ;


    // 點選 : 交付櫃台詢問主人
    const onSubmit : SubmitHandler<Inputs> = data => {

        const service_Type = Current_Pet['service_type'] ;
        let service_Id     = '' ;

        if( service_Type === '基礎' ){ service_Id = Current_Pet['basic_id'] ;  } ;
        if( service_Type === '洗澡' ){ service_Id = Current_Pet['bath_id'] ;   } ;
        if( service_Type === '美容' ){ service_Id = Current_Pet['beauty_id'] ; } ;

        if( !data['plus_item'] ){
            alert( '請選擇詢問項目' ) ;
            return false ;
        }

        const obj = {
                       service_date       : moment( new Date ).format('YYYY-MM-DD' ) ,   // 提交日期
                       service_type       : service_Type ,                                      // 服務類型 ( Ex. 洗澡、美容 )
                       q_code             : Current_Pet['q_code'] ,                             // Qcode

                       service_id         : service_Id ,                                        // 服務單 id
                       customer_id        : Current_Pet['customer']['id'] ,                     // 客戶身分證字號
                       pet_Serial         : Current_Pet['pet']['serial'] ,                      // 寵物編號

                       request_beautician : current_Beautician ? current_Beautician : '測試員' , // 詢問美容師姓名
                       confirm_item_title : data['plus_item'] ,                                  // 詢問項目
                       confirm_status     : '送交櫃台確認'
                     } ;

        // 新增 _ 確認請求資料
        axios.post( '/customer_confirms' , obj ).then( res => {

            // 彈跳通知訊息
            toast(`🦄 已向櫃檯送出確認請求`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,} );

            // 關閉 : 右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

        })

    } ;


    return <form onSubmit={ handleSubmit( onSubmit ) }>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-12-desktop" >
                    <b className="tag is-large is-info is-light">  <i className="fas fa-bath"></i> &nbsp;  洗澡 _ 加價項目 </b> &nbsp; &nbsp;
                 </div>

             </div>

             <br/>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛 _ 中度 ( 加價 100 元 )" { ...register( "plus_item" ) } /> &nbsp;梳廢毛 _ 中 ( 100 元 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛 _ 重度 ( 加價 200 元 )" { ...register( "plus_item" ) } /> &nbsp;梳廢毛 _ 重 ( 200 元 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛 _ 剃光 ( 轉大美容 : 報價 )" { ...register( "plus_item" ) } /> &nbsp;梳廢毛_剃光 ( 轉大美容_報價 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "跳蚤、壁蝨 ( 加價 200 元 )" { ...register( "plus_item" ) } /> &nbsp;跳蚤、壁蝨 ( 200 元 )
                 </div>

             </div>

             <br/>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-12-desktop" >

                   <button  type="submit" className="button is-success relative is-medium" style={{ width : "100%", top: "-10px" }} >
                     <b> <i className="fas fa-user-check" ></i> &nbsp; 交 付 櫃 台 詢 問 主 人 </b>
                   </button>

                 </div>

             </div>

           </form>

} ;


export default Customer_Confirm_Options