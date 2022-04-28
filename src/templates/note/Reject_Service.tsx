import { useState , useEffect } from 'react'

import axios from 'utils/axios'



type Reject = {
   
  type : '客人' | '寵物' ;
  id   : string | undefined ;   // 客人 : 身分證字號 / 寵物 : 寵物編號

}


type Update_Status = {

   rejected_options : string ; 
   rejected_cause   : string ;
   rejected_status  : '' | '審核中' | '通過' | '退回' ;

}


// @ 拒接：客人 / 寵物
const Reject_Service = ( { type , id } : Reject ) => {


   // 是否點選拒接 
   const [ is_Rejected , set_Is_Rejected ] = useState( false ) ;  


   // 是否據接全部 ( 寵物 )
   const [ is_Reject_All , set_Is_Reject_All ] = useState( false ) ;

   // 所點選拒接選項 ( 寵物 )
   const [ pet_Reject_Options , set_Pet_Reject_Options ] = useState<any[]>( [] ) ;

   
   // 拒接理由
   const [ reject_Cause , set_Reject_Cause ] = useState( '' ) ;


   // 拒接申請狀態
   const [ reject_Status , set_Reject_Status ] = useState< '' | '審核中' | '通過' | '退回' >( '' ) ;


   // 是否已點選：提交拒接
   const [ is_Submitted , set_Is_Submitted ] = useState( false ) ;



   // 處理 _ 拒接理由
   const handle_Reject_Cause = ( cause : string ) => set_Reject_Cause( cause ) ;


   // 點選 _ 拒接 ( 寵物 )
   const click_Reject = ( type : '客人' | '寵物' ) => {
   
       // 寵物
       if( type === '寵物' ){

          set_Is_Rejected( !is_Rejected ) ;

          // 再次點選：回覆預設 
          if( is_Rejected ){
            set_Is_Reject_All( false ) ;
            set_Pet_Reject_Options([]) ;
          } 

          return false

       }

       // 客人
       set_Is_Rejected( !is_Rejected ) ;

        
   } ;


   // 點選 _ 拒接全部 ( 寵物 )
   const click_Reject_Pet_All = () => {

       set_Is_Reject_All( !is_Reject_All ) ;
      
       // 拒接選項
       set_Pet_Reject_Options( is_Reject_All ? [] : [...pet_Reject_Options , '基礎' , '洗澡' , '美容' , '安親' , '住宿' ] ) ;

   } 

   // 點選 _ 拒接選項 ( 寵物 ) 
   const click_Reject_Pet_Option = ( option : string ) => {

     // 已點選過
     const index = pet_Reject_Options.indexOf( option ) ;
     if( index !== -1 ){

        pet_Reject_Options.splice( index , 1 ) ;        // 刪除該選項
        set_Pet_Reject_Options( [ ...pet_Reject_Options ] ) ;

        set_Is_Reject_All( false ) ;

        return false

     }

     // 尚未點選
     set_Pet_Reject_Options( [ ...pet_Reject_Options , option ] )
 
   }   



   // 點選 _ 提交拒接
   const click_Submit = ( id : string | undefined ) => {
   
      if( !id ){ alert( '提交錯誤' ) ; return false ; }

      // 寵物
      if( type === '寵物' ){

          const options = pet_Reject_Options.join( ',' ) ;  // 所點選拒接項目 

          if( !options ){  alert( '請點選拒接項目' ) ; return false ; }

          const obj : Update_Status = {
                                        rejected_options : options ,
                                        rejected_cause   : reject_Cause ,
                                        rejected_status  : '審核中'
                                      } ;


          axios.put( `/pets/${ id }` , obj ).then( res => {

             alert( '已提交拒接' ) ;

             set_Reject_Status( '審核中' ) ;
             set_Is_Submitted( true ) ;

          }).catch( err => {

             console.log( `更新錯誤 : ${ err }` ) ;

          })

        
      }

      // 客人 




   
   } ;


   // 取得 _ 拒接狀態
   useEffect( () => {
     

     if( type === '客人' ){

        axios.get( `/customers/${ id }` ).then( res => {

            const r_Status = res.data?.rejected_status ; // 拒接狀態

            if( r_Status ){
               set_Is_Rejected( true ) ;
               set_Reject_Status( r_Status ) ;
            } 

        })

 
     }

     if( type === '寵物' ){

        axios.get( `/pets/${ id }` ).then( res => {

            const r_Status = res.data?.rejected_status ; // 拒接狀態

            if( r_Status ){
               set_Is_Rejected( true ) ;
               set_Reject_Status( r_Status ) ;
            } 

        })

     }

    
   } , [  type , id  ] ) ;


   const tag     = 'tag is-medium is-rounded hover m_Right_10' ;
   const _tag    = 'tag is-medium is-rounded pointer m_Right_10 is-warning' ;
   const input_1 = { width:"250px" , top:"-3px" } ;
   const input_2 = { width:"500px" , height:"37px" , top:"-3px" } ;

   return <>

               <b className={ `tag is-medium m_Right_30 pointer ${ is_Rejected ? 'is-danger' : 'hover' }` } onClick = { () => click_Reject( type ) } >  
                   <i className="fas fa-ban"></i> &nbsp;拒 接 
               </b>
   
               { /* for 寵物 */ }
               { ( is_Rejected && type === '寵物' && !reject_Status && !is_Submitted ) &&
                  <>

                      <b className={ `tag is-medium is-rounded pointer m_Right_10 ${ is_Reject_All ? 'is-link' : 'hover' }` } 
                         onClick = { () => click_Reject_Pet_All() } > 所有 
                      </b>
                     
                      <b className={ pet_Reject_Options.includes( '基礎' ) ? _tag : tag }  onClick = { () => click_Reject_Pet_Option( '基礎' ) }> 基礎 </b>
                      <b className={ pet_Reject_Options.includes( '洗澡' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '洗澡' ) }> 洗澡 </b>
                      <b className={ pet_Reject_Options.includes( '美容' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '美容' ) }> 美容 </b>
                      <b className={ pet_Reject_Options.includes( '安親' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '安親' ) }> 安親 </b>
                      <b className={ pet_Reject_Options.includes( '住宿' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '住宿' ) }> 住宿 </b>
                    
                      <input className   = "input relative m_Left_10 m_Right_30" 
                             value       = { reject_Cause }  
                             onChange    = { e => handle_Reject_Cause( e.target.value ) }
                             placeholder = "拒接理由" 
                             type        = "text" 
                             style       = { input_1 } />

                      <b className="tag is-medium is-success pointer" onClick = { () => click_Submit( id ) } > 提交 </b>

                  </>
               }

               { /* for 客人 */ }
               { ( is_Rejected && type === '客人' ) &&
                  <>

                      <input className   = "input relative m_Right_30" 
                             value       = { reject_Cause } 
                             onChange    = { e => handle_Reject_Cause( e.target.value ) }
                             placeholder = "拒接理由" 
                             type        = "text" 
                             style       = { input_2 }  />
                      
                      <b className="tag is-medium is-success pointer" onClick = { () => click_Submit( id ) } > 提交 </b>
                  
                  </>
               }   


               { /* 已提交拒接（ 客人 / 寵物 ）  */ }
               { 
                  ( is_Rejected && reject_Status ) && 
                     <> 審核狀態 : <b className="fRed"> { reject_Status } </b> </>
               }


          </>  


} ;

export default Reject_Service
       