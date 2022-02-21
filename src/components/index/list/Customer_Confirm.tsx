

import React, {useEffect, useState} from "react"
import axios from "utils/axios";
import moment from "moment";
import {toast} from "react-toastify";

import cookie from 'react-cookies'



/*
*    # 共 3 個階段 :
*      1. 送交櫃台確認
*      2. 櫃台確認中
*      3. 櫃台已回覆
*/

// @ 美容師請求櫃台，向客戶確認加價
const Customer_Confirm = ( ) => {


    // 美容師請求櫃台確認訊息
    const [ customer_Confirm , set_Customer_Confirm ] = useState<any>( [] ) ;

    // 目前處理櫃台姓名
    const [ current_Admin , set_Current_Admin ] = useState('測試員') ;


    // 目前所選擇的回覆訊息
    const [ current_Reply_Index , set_Current_Reply_Index ] = useState<number|string>( '' ) ;

    // 櫃台回覆內容
    const [ admin_Reply , set_Admin_Reply ] = useState( '') ;

    // 變動處理
    const handle_Change = ( reply : string ) => set_Admin_Reply( reply ) ;

    // 點選 _ 回覆美容師
    const click_Reply = ( index : number ) => set_Current_Reply_Index( index ) ;


    // 取得 _ 今日，所有美容師所發出的確認要求
    const get_Today_Beautician_Confirm_Requests = ( ) => {

        const today = moment( new Date ).format('YYYY-MM-DD' ) ;

        if( today ){ 

            axios.get( `/customer_confirms/show_by_service_date/${ today }` ).then( res => {

                if( res.data.length > 0 ){

                    const in_Progress = res.data.filter( (x:any) => x['confirm_status'] === '櫃台確認中' ) ;
                    set_Customer_Confirm( in_Progress ) ;

                }else{

                    set_Customer_Confirm( [] ) ;

                }

            }).catch( error => {

                console.log( '函式 : get_Today_Beautician_Confirm_Requests，發生錯誤 ' ) ;
        
            });

        }    

    } ;


    // 點選 _ 送出回覆訊息
    const send_Reply = ( ) => {

        if( current_Reply_Index === '' ){
            alert( '請先點選 _ 欲回覆的訊息 ( 回覆美容師 )' ) ;
            return false ;
        }

        if( admin_Reply === '' ){
            alert( '請輸入 _ 回覆訊息內容' ) ;
            return false ;
        }


        // 目前所點選，欲回覆訊息
        const current = customer_Confirm[ current_Reply_Index ] ;

        const obj = {
                      confirm_status   : '櫃台已回覆' ,   // 確認狀態 ( 由 "櫃台確認中" ，改為 "櫃台已回覆" )
                      response_admin   : current_Admin , // 櫃台姓名
                      response_content : admin_Reply     // 櫃台回覆內容
                    } ;

        axios.put( `/customer_confirms/${ current['id'] }` , obj ).then( res => {

            // 彈跳通知
            toast(`🦄 已回覆美容師`, { position: "top-left", autoClose: 1500 , hideProgressBar: false , });

            // 刷新頁面
            get_Today_Beautician_Confirm_Requests();

            // 清空 _ 回覆訊息輸入框
            set_Admin_Reply('')

            // 清空 _ 目前所選擇的回覆訊息
            set_Current_Reply_Index('') ;

        }) ;


    } ;


    // 取得 _ 美容師請求訊息
    useEffect(() : any => {

        let is_Mounted = true ;

        if( is_Mounted ) get_Today_Beautician_Confirm_Requests();

        return () => is_Mounted = false ;

    } ,[ customer_Confirm ] ) ;


    // 設定 _ 目前櫃台人員
    useEffect( ( ) : any => {



        let is_Mounted = true ;


        if( is_Mounted ){

          // Cookie : 目前登入者資訊
          const userInfo = cookie.load( 'userInfo' ) ;
          set_Current_Admin( userInfo['employee_name'] ? userInfo['employee_name'] : userInfo['account'] ) ;

        }

        return () => is_Mounted = false ;



    } , []) ;


       return <>

                   { /*  有 _ 確認訊息 */ }
                   { customer_Confirm.length > 0 &&

                           <>

                               {

                                   customer_Confirm.map((x: any, y: any) => {

                                       const cus = x['customer'];
                                       const pet = x['pet'];

                                       let color = '';
                                       let icon = '';

                                       if (x['service_type'] === "基礎") {
                                           color = `tag is-large is-warning is-light pointer`;
                                           icon = "far fa-list-alt"
                                       }

                                       if (x['service_type'] === "洗澡") {
                                           color = `tag is-large is-success is-light pointer`;
                                           icon = "fas fa-bath"
                                       }

                                       if (x['service_type'] === "美容") {
                                           color = `tag is-large is-danger is-light pointer`;
                                           icon = "fas fa-cut"
                                       }

                                       return <div key={y}>

                                           <br/>

                                           <div className="columns is-multiline  is-mobile">

                                               <div className="column is-12-desktop ">

                                                   <b className={color}>

                                                       <i className={icon}></i> &nbsp; Q {x['q_code']} &nbsp; {pet['name']} ( {pet['species']} ) &nbsp; &nbsp;
                                                       <span className="f_11 relative"
                                                             style={{top: "3px"}}> 發送時間 : {x['created_at'].slice(10, 16)} </span> &nbsp; &nbsp; &nbsp;
                                                       <b className={`tag is-medium ${current_Reply_Index === y ? 'is-success' : 'is-white'} is-rounded`}
                                                          onClick={() => click_Reply(y)}>
                                                           <i className="fas fa-reply"></i> &nbsp; 回覆美容師
                                                       </b>

                                                   </b>

                                               </div>

                                               <div className="column is-3-desktop">
                                                                            <span
                                                                                className="tag is-medium is-large is-white"> 美容師 :&nbsp;
                                                                                <span
                                                                                    className="fDblue"> {x['request_beautician']} </span>
                                                                            </span>
                                               </div>

                                               <div className="column is-9-desktop">
                                                                             <span
                                                                                 className="tag is-medium is-large is-white"> 確認項目 :&nbsp;
                                                                                 <span
                                                                                     className="fDred"> {x['confirm_item_title']} </span>
                                                                             </span>
                                               </div>

                                               <div className="column is-3-desktop">
                                                                            <span
                                                                                className="tag is-medium is-large is-white"> 客人姓名 :&nbsp;
                                                                                <span className="fDblue"> {cus['name']} </span>
                                                                            </span>
                                               </div>

                                               <div className="column is-3-desktop">
                                                                            <span
                                                                                className="tag is-medium is-large is-white"> 手機號碼 :&nbsp;
                                                                                <span className="fDblue"> {cus['mobile_phone']} </span>
                                                                            </span>
                                               </div>

                                               <div className="column is-3-desktop">
                                                                            <span
                                                                                className="tag is-medium is-large is-white"> 家用電話 :&nbsp;
                                                                                <span className="fDblue"> {cus['tel_phone']} </span>
                                                                            </span>
                                               </div>


                                           </div>

                                           <hr/>

                                       </div>


                                   })

                               }

                               <br/>

                               <div className="columns is-multiline  is-mobile">

                                   <div className="column is-3-desktop">
                                                   <span className="tag is-medium is-large is-white"> 櫃台人員 :&nbsp;
                                                       <span className="fDblue"> {current_Admin} </span>
                                                   </span>
                                   </div>

                                   <div className="column is-6-desktop">
                                       <div className="control has-icons-left">
                                           <input className="input" type="text" value={admin_Reply}
                                                  onChange={e => handle_Change(e.target.value)}/>
                                           <span className="icon is-small is-left"> <i className="fas fa-edit"></i> </span>
                                       </div>
                                   </div>

                                   <div className="column is-3-desktop">
                                       <b className="tag is-medium is-large is-success pointer" onClick={send_Reply}>
                                           <i className="far fa-paper-plane"></i> &nbsp; 送出回覆訊息
                                       </b>
                                   </div>

                               </div>

                               <br/><br/><br/><br/><br/><br/>

                           </>

                   }


                  { /*  沒有 _ 確認訊息 */ }
                  { customer_Confirm.length > 0 ||

                     <div className="columns is-multiline  is-mobile">

                         <div className="column is-12-desktop">

                             <b className="tag is-large is-success" style={{ width:"100%" }}> <i className="fas fa-check"></i> &nbsp; 已無任何須確認訊息 </b>

                         </div>

                     </div>

                  }


           </>


} ;






export default Customer_Confirm ;