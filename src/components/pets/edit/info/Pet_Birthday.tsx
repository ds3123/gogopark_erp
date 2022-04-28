
import Date_Picker from "templates/form/Date_Picker" 
import { get_Pet_Age } from 'utils/time/date'
import { useState , useEffect } from "react"
import axios from 'utils/axios'




type Birthday = {
  
  control  : any ;
  setValue : any ;

  pet_Serial : string | undefined ;
  current    : string | undefined ;

}



// @ 寵物 _ 出生日期 ( 計算歲數 )
const Pet_Birthday = ( { control , setValue , current , pet_Serial } : Birthday ) => {


   // 年齡文字敘述
   const [ age , set_Age ] = useState( '' ) ; 


   // 年齡敘述樣式
   const get_Age_Style = ( age : string ) => {
   
        if( parseInt( age.slice( 0 , 2 ) ) > 12 || age === '未滿週歲' ) return 'is-danger'
       
        return 'is-warning'
   
   } ;


   // 處理 _ 出生日期
   const handle_Birthday_Change = ( value : any ) => {

      const now_Timestamp      = new Date().getTime();          // 現在
      const birthday_Timestamp = new Date( value ).getTime() ;  // 生日  


      if( !value ){ set_Age('') ; return false ; }


      // 驗證
      if( birthday_Timestamp > now_Timestamp ){ 
         setValue( 'pet_Age' , new Date ) ;     
         alert( '不能選取未來日期，作為出生日期' ) ; 
         return false ; 
      }

      const age = get_Pet_Age( value ) ;

      set_Age( age ) ;

   } ;  

   // 編輯狀態下，取得 _ 該寵物 : 出生日期
   useEffect( () => {
     
     if( !current && pet_Serial ){

        axios.get( `/pets/${ pet_Serial }` ).then( res => {

            const birthday = res.data?.birthday ;

            if( birthday ){
                const age = get_Pet_Age( birthday ) ;
                set_Age( age ) ;
            }

        } ) ;

     }
    
   } , [ current , pet_Serial ] ) ;


   return  <div className="relative"> 

              <p> 出生日期 </p>  
              
              { 
                 age &&  <b className = { `tag absolute ${ get_Age_Style( age ) }` } 
                             style    = {{ top:"-5px" , left : "80px" }}>  { age }  </b> 
              }       

              <Date_Picker control         = { control } 
                           name            = "pet_Age" 
                           handle_OnChange = { handle_Birthday_Change }  />
                            
           </div>

} ;

export default Pet_Birthday
       