
import React, {useEffect, useState} from "react" ;
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch, useSelector} from "react-redux";
import axios from "utils/axios";
import {toast} from "react-toastify";

{ /* 主人確認 _ 狀態列 ( 點選 : 主人確認後，顯示 "交付櫃台確認中 ..." ) */ }
const Cus_Confirm_Bar = ()=>{


    // 目前所點選 _ 寵物 / 服務
    const Current_Pet        = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;

    // 是否顯示 :
    const [ show_In_Progress ,  set_Show_In_Progress ] = useState( false )

    // 目前確認狀態
    const [ current_Confirm , set_Current_Confirm ] = useState({
                                                                            id                 : '' , // 資料表 id
                                                                            confirm_status     : '' , // 確認狀態
                                                                            confirm_item_title : '' , // 請求確認 ( 加價 )項目
                                                                            response_admin     : '' , // 回覆櫃台姓名
                                                                            response_content   : '' , // 櫃台回覆內容

                                                                         } ) ;



    // 取得、確定 _ 目前服務單，是否有請求確認紀錄
    const get_Customer_confirms = ( service_Type : string , service_Id : string  ) => {

        axios.get( `/customer_confirms/show_by_service_type_id/${ service_Type }/${ service_Id }` ).then( res => {

            if( res.data.length > 0 ){

                // 設定 _ 是否顯示 : 狀態列
                set_Show_In_Progress(true );

                const obj = res.data[0] ;

                set_Current_Confirm({ ...current_Confirm ,

                    id                 : obj['id'] ,                 // 資料表 id
                    confirm_status     : obj['confirm_status'] ,     // 確認狀態
                    confirm_item_title : obj['confirm_item_title'] , // 請求確認 ( 加價 )項目
                    response_admin     : obj['response_admin'] ,     // 回覆櫃台姓名
                    response_content   : obj['response_content']     // 櫃台回覆內容

                }) ;

            }else{

                set_Show_In_Progress(false );

            }

        }).catch( error => {

            console.log('美容區 _ 客戶確認訊息發生錯誤') ;

        })

    } ;



    // 點選 : 取消 _ 交付櫃台詢問主人
    const click_Cancel_Confirm = ( confirm_Id : string ) => {

        // 刪除 _ 確認紀錄
        axios.delete( `/customer_confirms/${ confirm_Id }` ).then( res => {

            // 彈跳通知
            toast(`🦄 已關閉並刪除確認紀錄`, { position: "top-left", autoClose: 1500 , hideProgressBar: false , });

            // 關閉確認狀態列
            set_Show_In_Progress( false ) ;

        })


    } ;



    useEffect(() : any => {

        let is_Mounted = true ;

        // 服務類型 ( 基礎、洗澡、美容 )
        const service_Type = Current_Pet['service_type'] ;

        // 服務單 id
        let service_Id     = '' ;

        if( service_Type === '基礎' ){ service_Id = Current_Pet['basic_id'] ;  } ;
        if( service_Type === '洗澡' ){ service_Id = Current_Pet['bath_id'] ;   } ;
        if( service_Type === '美容' ){ service_Id = Current_Pet['beauty_id'] ; } ;

        setInterval( () => {

            if( is_Mounted ) get_Customer_confirms( service_Type , service_Id ) ;

        } , 1000 ) ;


        return () => is_Mounted = false ;

    } ,[ Current_Pet ] ) ;



   return  <>

             { show_In_Progress &&

                <>

                    <div className="columns is-multiline  is-mobile">

                       <div className="column is-12-desktop relative">

                           <div className="tag is-link is-light is-large" style={{width: "100%"}}>

                               <b className="tag is-medium is-white">


                                   { /* 送交櫃台確認、櫃台確認中 */ }
                                   {
                                       ( current_Confirm['confirm_status'] === '送交櫃台確認' || current_Confirm['confirm_status'] === '櫃台確認中' ) &&
                                            <>
                                                <b className="fDblue"> { current_Confirm['confirm_item_title'] } </b>  &nbsp; : &nbsp; <b> { current_Confirm['confirm_status'] } </b>
                                            </>
                                   }

                                   { /* 櫃台已回覆 */ }
                                   {
                                       current_Confirm['confirm_status'] === '櫃台已回覆'  &&
                                        <>
                                             櫃台 ( { current_Confirm['response_admin'] } )，針對 【 &nbsp;
                                             <b className="fDblue"> { current_Confirm['confirm_item_title'] } </b>  &nbsp; 】， 回覆 : &nbsp;
                                             <b className="fRed">   { current_Confirm['response_content']  }  </b>

                                        </>
                                   }

                               </b> &nbsp;  &nbsp; &nbsp;

                               <span className="tag is-link is-medium pointer" onClick={ () => click_Cancel_Confirm( current_Confirm['id'] ) } >
                                           <b style={{ color : "white" }} > <i className="fas fa-times-circle"></i> </b> &nbsp; 取 消
                              </span>

                           </div>

                           <br/><br/>

                       </div>

                    </div>

                    <br/><br/>

                </>

             }

          </>


} ;

export default Cus_Confirm_Bar