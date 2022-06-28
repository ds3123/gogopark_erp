import { useState , useEffect } from 'react'
import axios from 'utils/axios'
import Reject_Pet from './components/Reject_Pet'
import Reject_Customer from './components/Reject_Customer'


type Reject = {
   
  type : '客人' | '寵物' ;
  id   : string | undefined ;   // 客人 : 身分證字號 / 寵物 : 寵物編號

}



// @ 拒接：客人 / 寵物
const Reject_Service = ( { type , id } : Reject ) => {


   // 客人 / 寵物 : 資料單資料
   const [ data ,  set_Data ] = useState<any>( null ) ;


   // 查詢取得 _ 拒接狀態
   useEffect( () => {
     

     if( type === '客人' ){

        axios.get( `/customers/${ id }` ).then( res => {

           set_Data( res.data ) ;

        }) ;

     }

     if( type === '寵物' ){

        axios.get( `/pets/${ id }` ).then( res => {

          set_Data( res.data ) ;
                  
        }) ;

     }
    
   } , [ type , id ] ) ;

   
 
  
   return <>

               { type === '客人' &&  <Reject_Customer data = { data } />  }

               { type === '寵物' &&  <Reject_Pet data = { data } />  }

          </>  

} ;

export default Reject_Service
       