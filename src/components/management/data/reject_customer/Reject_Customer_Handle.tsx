

import { useContext, useState , useEffect } from "react"
import { ModalContext } from "templates/panel/Modal" 
import axios from 'utils/axios'

import { useHistory } from 'react-router-dom'


import { toast } from 'react-toastify'
import cookie from 'react-cookies'

import { set_Modal } from 'store/actions/action_Global_Layout' 
import { useDispatch } from "react-redux"



type Status = '' | '通過' | '退回' | '審核中' ;


// @ 拒接處理 ( 客戶 )
const Reject_Customer_Handle = () => {


   const dispatch = useDispatch() ; 
   const history  = useHistory() ;
 
   const value    = useContext( ModalContext ) as any ;   
   const customer = value?.data ;


   const { rejected_cause } = customer ;


   // 拒接處理狀態 
   const [ status , set_Status ] = useState< Status >( '' ) ;



   // 取得 _ 修改物件
   const get_Update_Obj = ( type : Status ) => {
   
      // 通過
      if( type === '通過' ) return { is_rejected : 1 , rejected_status : '通過' } ;

      // 退回
      if( type === '退回' ) return { is_rejected : 0 , rejected_cause : null , rejected_status : null } ;  // 回覆預設

   
   } ;


   // 點選 _ 處理狀態 
   const click_Process = ( type : Status ) => {
 
      // 設定 state    
      set_Status( type ) ;

      // 修改資料庫
      const table_Id   = customer.customer_id ; // 客戶資料表 id
      const update_Obj = get_Update_Obj( type ) ;


      if( table_Id ){

         axios.put( `/customers/${ table_Id }` , update_Obj ).then( res => {


            // 關掉 Modal 
            dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;
            
            // 設定 Toast 通知
            toast( `🦄 更新拒接狀態成功`, { position : "top-left" , autoClose:1500 , hideProgressBar : false, closeOnClick: true,});
            

            // 設定 Cookie ( 5 秒後銷毀 )
            cookie.save( 'after_Updated_Data' , '資料管理_拒接客戶' , { path : '/' , maxAge : 5 } ) ;
           
            // 前往管理首頁
            history.push( "/wrongpath" ) ;  
            history.push( "/management" ) ;  
            
         })

      }

   } 


   // 設定 _ 拒接狀態
   useEffect( () => {
     
     const r_Status = customer?.rejected_status ;       
     if( r_Status ) set_Status( r_Status ) ;  
 
   } , [ customer ] ) ;


   return <div className="p_15">    

              <label className="label relative m_Bottom_20" >
                 <i className="fas fa-user"></i> &nbsp; 客戶資料  &nbsp; 
             </label>

             <div className="columns is-multiline is-mobile m_Bottom_70">

                <div className="column is-3-desktop"> 姓 名 :    <b className="fDblue"> { customer?.name } </b>         </div>
                <div className="column is-3-desktop"> 手機號碼 ： <b className="fDblue"> { customer?.mobile_phone } </b> </div>
                <div className="column is-6-desktop"> 通訊地址 ： <b className="fDblue"> { customer?.address } </b> </div>

             </div>   

             <label className="label relative m_Bottom_20" >
                <i className="fas fa-file-alt"></i> &nbsp; 基本資訊
             </label>

             <div className="columns is-multiline is-mobile m_Bottom_70">
                <div className="column is-3-desktop">  提出人員 : <b className="fDblue"> 櫃檯 </b>              </div>
                <div className="column is-3-desktop">  所屬區域 : <b className="fDblue"> 251 ( 淡水 ) </b>      </div>
                <div className="column is-2-desktop">  所屬店別 : <b className="fDblue"> 01 </b>               </div>
                <div className="column is-4-desktop">  提出時間 : <b className="fDblue"> { customer?.updated_at } </b> </div>
                <div className="column is-12-desktop"> 拒接理由 : <b className="fDblue"> { rejected_cause } </b>  </div>
             </div>  

             <label className="label relative m_Bottom_20" >

                <i className="fas fa-check-circle"></i>&nbsp;<b className="m_Right_30"> 拒接處理 </b>

                <b className = { `tag is-medium m_Right_30 pointer is-danger ${ status === '通過' ? '' : 'is-light' }` } 
                   onClick   = { () => { if( window.confirm('確認要通過 : 拒接申請 ?') )  click_Process( '通過' ) } } > 
                   通 過 
                </b>

                <b className = { `tag is-medium m_Right_30 pointer is-success ${ status === '退回' ? '' : 'is-light' }` } 
                   onClick   = { () => { if( window.confirm('確認要退回 : 拒接申請 ?') ) click_Process( '退回' ) }  } > 
                   退 回 
                </b>

             </label>

            
          </div>

} ;

export default Reject_Customer_Handle
       