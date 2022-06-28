
import { useState , useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { ModalContext } from 'templates/panel/Modal' 
import { useDispatch } from 'react-redux'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import { set_Modal } from 'store/actions/action_Global_Layout' 



type Status = '' | '通過' | '退回' | '審核中' ;


// @ 拒接處理 ( 寵物 )
const Reject_Pet_Handle = () => {

   const dispatch = useDispatch() ; 
   const history  = useHistory() ;

   const value            = useContext( ModalContext ) as any ; 
   const pet              = value?.data ; 
   const rejected_Options = pet?.rejected_options; // 拒接服務類型 ( Ex. 洗澡、美容... ) 

   // 寵物資料
   const { serial , rejected_cause } = pet ;


   // 拒接處理狀態 
   const [ status , set_Status ] = useState< Status >( '' ) ;



   // 取得 _ 修改物件
   const get_Update_Obj = ( type : Status ) => {
   
      // 通過
      if( type === '通過' ) return { is_rejected : 1 , rejected_status : '通過' } ;

      // 退回
      if( type === '退回' ) return { is_rejected : 0 , rejected_options : null  , rejected_cause : null , rejected_status : null  } ;  // 回覆預設

     
   } ;


   // 點選 _ 處理狀態 
   const click_Process = ( type : Status ) => {
 
      // 設定 state    
      set_Status( type ) ;

      // 修改資料庫
      const update_Obj = get_Update_Obj( type ) ;


      if( serial ){

         axios.put( `/pets/${ serial }` , update_Obj ).then( res => {

            // 關掉 Modal 
            dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;
            
            // 設定 Toast 通知
            toast( `🦄 更新拒接狀態成功`, { position : "top-left" , autoClose:1500 , hideProgressBar : false, closeOnClick: true,});
            

            // 設定 Cookie ( 5 秒後銷毀 )
            cookie.save( 'after_Updated_Data' , '資料管理_拒接寵物' , { path : '/' , maxAge : 5 } ) ;
           
            // 前往管理首頁
            history.push( "/wrongpath" ) ;  
            history.push( "/management" ) ;  
            
         })

      }

   } 


   // 設定 _ 拒接狀態
   useEffect( () => {
     
      const r_Status = pet?.rejected_status ;       
      if( r_Status ) set_Status( r_Status ) ;  
  
    } , [ pet ] ) ;



   return <div className="p_15">    

            { /* 寵物資料 */ }
            <label className="label relative m_Bottom_40" >
               <i className="fas fa-dog"></i> &nbsp; 寵物資料 
            </label>

            <div className="columns is-multiline is-mobile m_Bottom_70">

               <div className="column is-3-desktop"> 寵 物 :    <b className="fDblue"> { pet?.name }  </b>        </div>
               <div className="column is-3-desktop"> 品 種 :    <b className="fDblue">  { pet?.species }  </b>    </div>
               <div className="column is-2-desktop"> 毛 色 :    <b className="fDblue">  { pet?.color }  </b>      </div>
               <div className="column is-2-desktop"> 性 別 :    <b className="fDblue">  { pet?.sex }  </b>        </div>
               <div className="column is-2-desktop"> 年 齡 :    <b className="fDblue">  { pet?.age }  </b>        </div>
              
            </div> 

            { /* 基本資料  */ } 
            <label className="label relative m_Bottom_20" >
                <i className="fas fa-file-alt"></i> &nbsp; 基本資訊
             </label>

             <div className="columns is-multiline is-mobile m_Bottom_70">
                <div className="column is-3-desktop">  提出人員 : <b className="fDblue"> 櫃檯 </b>                  </div>
                <div className="column is-3-desktop">  所屬區域 : <b className="fDblue"> 251 ( 淡水 ) </b>          </div>
                <div className="column is-2-desktop">  所屬店別 : <b className="fDblue"> 01 </b>                    </div>
                <div className="column is-4-desktop">  提出時間 : <b className="fDblue"> { pet?.updated_at } </b>   </div>
                <div className="column is-12-desktop"> 拒接類別 : <b className="fDblue"> { rejected_Options } </b>  </div>
                <div className="column is-12-desktop"> 拒接理由 : <b className="fDblue"> { rejected_cause } </b>    </div>
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

export default Reject_Pet_Handle
       