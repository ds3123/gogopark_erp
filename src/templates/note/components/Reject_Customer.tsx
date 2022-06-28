
import { useState , useEffect } from 'react'
import axios from 'utils/axios'
import { toast } from 'react-toastify'



type R_Customer = {

    data : any ;
     
}

type Update_Status = {

    rejected_cause    : string ;
    rejected_status   : '' | '審核中' | '通過' | '退回' ;
 
 }



// @ 拒接 _ 客戶
const Reject_Customer = ( { data } : R_Customer ) => {

   // 是否點選拒接 
   const [ is_Clicked_Reject , set_Is_Clicked_Reject ] = useState( false ) ;  

   // 拒接理由
   const [ reject_Cause , set_Reject_Cause ]           = useState( '' ) ;

   
   // 拒接申請狀態
   const [ reject_Status , set_Reject_Status ] = useState< '' | '審核中' | '通過' | '退回' >( '' ) ;

   // 處理 _ 拒接理由
   const handle_Reject_Cause = ( cause : string ) => set_Reject_Cause( cause ) ;


   // 點選 _ 拒接 
   const click_Reject = () => set_Is_Clicked_Reject( !is_Clicked_Reject ) ;



   // 點選 _ 提交拒接
   const click_Submit = ( data : any , reject_Cause : string ) => {


       const table_Id     = data?.customer_id ;     // 資料表 id 

       if( !reject_Cause ){ alert( '請填寫 : 拒接理由' ) ; return false ; }


       const obj : Update_Status = {             
                                     rejected_cause   : reject_Cause ,
                                     rejected_status  : '審核中'
                                   } ;


       axios.put( `/customers/${ table_Id }` , obj ).then( res => {

         
          //  設定 Toast 通知
          toast( `🦄 已提交拒接審核`, { position : "top-left" , autoClose:1500 , hideProgressBar : false, closeOnClick: true,});


          set_Reject_Status( '審核中' ) ;
         
       }).catch( err => {

          console.log( `更新錯誤 : ${ err }` ) ;

       })
                        

    } ;


    // 設定 _ 拒接狀態
    useEffect( () => {
      
       
      if( data?.rejected_status ) set_Reject_Status( data?.rejected_status  ) ;
          

    } , [ data ] ) ;


    const input_2 = { width:"500px" , height:"37px" , top:"-3px" } ;

    return <>


                <b className = { `tag is-medium m_Right_30 pointer ${ ( is_Clicked_Reject || reject_Status ) ? 'is-danger' : 'hover' }` } 
                   onClick   = { () => click_Reject( ) } >  
                   <i className="fas fa-ban"></i> &nbsp;拒 接 
                </b>


                { ( is_Clicked_Reject && !reject_Status ) &&

                    <span className="relative">

                        <span className="absolute f_11 fRed" style={{ top:"-30px" , left:"-10px" }}> * </span>  

                        <input className    = "input relative m_Right_30" 
                                value       = { reject_Cause } 
                                onChange    = { e => handle_Reject_Cause( e.target.value ) }
                                placeholder = "拒接理由" 
                                type        = "text" 
                                style       = { input_2 }  />

                        <b className="tag is-medium is-success pointer" onClick = { () => click_Submit( data , reject_Cause ) } > 提交 </b>

                    </span>
                
                } 


                { /* 審核狀態 */ }
                { reject_Status  &&  <b className="f_12"> 審核狀態 : <b className="fRed"> { reject_Status } </b> </b> }
            
           </>

} ;

export default Reject_Customer
       