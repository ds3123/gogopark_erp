

import axios from 'utils/axios'
import { useState , useEffect } from 'react'




// @ 服務相關 Hook



// 取得資料 _ 服務狀態是否 : 已回家，但未付費
export const useService_Is_GoHome_Unpaid = ( service_Date : string ) => {


    const [ is_GoHome_UnPaid , set_Is_GoHome_UnPaid ] = useState( [] ) ;


    useEffect( () => {
      
        axios.get( `services/show_services_is_gohome_by_date/${ service_Date }` ).then( res => {

            // 篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 )   
            const is_GoHome_Unpaid = res.data.filter( ( x : any ) => x['amount_payable'] !== x['amount_paid'] ) ;
   
            set_Is_GoHome_UnPaid( is_GoHome_Unpaid ) ;
          
         }) ;
       
    } , [ service_Date ] ) ;
    

    return is_GoHome_UnPaid

} ;




// 取得 _ 所有 服務異常 : "未處理" 數目
export const useService_Error_In_Process_Num = () => {

    const [ num , set_Num ] = useState( 0 ) ;

    useEffect( () => {

        axios.get( `/services/show_services_by_error/1` ).then( res => {

            const errors  = res.data ;

             // 篩選出所有服務異常 : 未處理
            const _errors = errors.filter( ( x : any ) => x?.service_error?.length === 0 ) ;
    
            set_Num( _errors.length ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 

    } , [] ) ;

    return num 

}







