
import { useState , useEffect } from 'react' 
import axios from 'utils/axios'


type R_Pet = {

    data : any ;

}



type Update_Status = {

    rejected_options? : string ;     // 僅寵物有
    rejected_cause    : string ;
    rejected_status   : '' | '審核中' | '通過' | '退回' ;
 
 }



// @ 拒接 _ 寵物
const Reject_Pet = ( { data  } : R_Pet ) => {


    // 是否點選拒接 
    const [ is_Clicked_Reject , set_Is_Clicked_Reject ] = useState( false ) ;  


    // 拒接理由
    const [ reject_Cause , set_Reject_Cause ]   = useState( '' ) ;


    // 拒接申請狀態
    const [ reject_Status , set_Reject_Status ] = useState< '' | '審核中' | '通過' | '退回' >( '' ) ;
    

    // 所點選拒接選項 ( 寵物 )
    const [ pet_Reject_Options , set_Pet_Reject_Options ] = useState<string[]>( [] ) ;


    // 是否據接全部 ( 寵物 )
    const [ is_Reject_All , set_Is_Reject_All ] = useState( false ) ;


    // 處理 _ 拒接理由
    const handle_Reject_Cause = ( cause : string ) => set_Reject_Cause( cause ) ;


    // 點選 _ 拒接 
    const click_Reject = () => set_Is_Clicked_Reject( !is_Clicked_Reject ) ;


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


    // 點選 _ 拒接全部 ( 寵物 )
    const click_Reject_Pet_All = () => {

        set_Is_Reject_All( !is_Reject_All ) ;
   
        // 拒接選項
        set_Pet_Reject_Options( is_Reject_All ? [] : [...pet_Reject_Options , '基礎' , '洗澡' , '美容' , '安親' , '住宿' ] ) ;

    } 


    // 點選 _ 提交拒接
    const click_Submit = ( data : any , reject_Cause : string  , pet_Reject_Options : string[] ) => {
   
         const pet_Serial = data.serial ;  // 寵物編號  
    
         if( pet_Reject_Options.length === 0 ){  alert( '請點選 : 拒接項目' ) ; return false ; } 
         if( !reject_Cause ){ alert( '請填寫 : 拒接理由' ) ; return false ; }
         

         const options = pet_Reject_Options.join( ',' ) ;  // 所點選拒接項目 
       

         const obj : Update_Status = {
                                      rejected_options : options ,
                                      rejected_cause   : reject_Cause ,
                                      rejected_status  : '審核中'
                                     } ;

        axios.put( `/pets/${ pet_Serial }` , obj ).then( res => {

           alert( '已提交拒接' ) ;

           set_Reject_Status( '審核中' ) ;
           

        }).catch( err => {

           console.log( `更新錯誤 : ${ err }` ) ;

        })

    } ;


    // 設定 _ 拒接狀態
    useEffect( () => {
      
       
      if( data?.rejected_status ) set_Reject_Status( data?.rejected_status  ) ;
            
  
    } , [ data ] ) ;



    const tag     = 'tag is-medium is-rounded hover m_Right_10' ;
    const _tag    = 'tag is-medium is-rounded pointer m_Right_10 is-warning' ;
    const input_1 = { width:"250px" , top:"-3px" } ;


    return <>

                <b className = { `tag is-medium m_Right_30 pointer ${ ( is_Clicked_Reject || reject_Status ) ? 'is-danger' : 'hover' }` } 
                   onClick   = { () => click_Reject( ) } >  
                   <i className="fas fa-ban"></i> &nbsp;拒 接 
                </b>


                { ( is_Clicked_Reject && !reject_Status ) &&

                    <> 

                        <b className={ `tag is-medium is-rounded pointer m_Right_10 ${ is_Reject_All ? 'is-link' : 'hover' }` } 
                            onClick = { () => click_Reject_Pet_All() } > 所有 
                        </b>
                        
                        <b className={ pet_Reject_Options.includes( '基礎' ) ? _tag : tag }  onClick = { () => click_Reject_Pet_Option( '基礎' ) }> 基礎 </b>
                        <b className={ pet_Reject_Options.includes( '洗澡' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '洗澡' ) }> 洗澡 </b>
                        <b className={ pet_Reject_Options.includes( '美容' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '美容' ) }> 美容 </b>
                        <b className={ pet_Reject_Options.includes( '安親' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '安親' ) }> 安親 </b>
                        <b className={ pet_Reject_Options.includes( '住宿' ) ? _tag : tag  } onClick = { () => click_Reject_Pet_Option( '住宿' ) }> 住宿 </b>
                    
                        <span className="relative">

                            <span className="absolute f_11 fRed" style={{ top:"-23px" , left:"0px" }}> * </span>  

                            <input className   = "input relative m_Left_10 m_Right_30" 
                                value       = { reject_Cause }  
                                onChange    = { e => handle_Reject_Cause( e.target.value ) }
                                placeholder = "拒接理由" 
                                type        = "text" 
                                style       = { input_1 } />

                        </span> 

                        <b className="tag is-medium is-success pointer" onClick = { () => click_Submit( data , reject_Cause , pet_Reject_Options ) } > 提交 </b>

                    </>  
                    
                }   

                { /* 審核狀態 */ }
                { reject_Status &&  <b className="f_12"> 審核狀態 : <b className="fRed"> { reject_Status } </b> </b> }

    
          </>

} ;

export default Reject_Pet
       