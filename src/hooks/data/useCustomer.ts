

import { useState , useEffect } from 'react'
import axios from 'utils/axios'


// @ 客戶相關 Hook



// 取得 _ 客戶拒接 : 審核中、通過、退回
export const useCustomer_Is_Process_Reject = () => {


    const [ data , set_Data ] = useState( [] ) ;


    useEffect( () => {

        axios.get( `/customers/show_customers_pets` ).then( res => {

            const customers  = res.data ;
            const _customers = customers.filter( ( x : any ) => 
                                x?.rejected_status === '審核中' || 
                                x?.rejected_status === '通過' || 
                                x?.rejected_status === '退回' ) ; // 篩選出 _ 拒接 : 審核中、通過、退回
    
            set_Data( _customers ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [] ) ;


    return data 

} ;


// 取得 _ 所有客戶，拒接 : "審核中" 數目
export const useCustomer_Reject_Process_Num = () => {

    const [ num , set_Num ] = useState( 0 ) ;

    useEffect( () => {

        axios.get( `/customers` ).then( res => {

            const customers  = res.data ;

             // 篩選出 _ 拒接 : 審核中
            const _customers = customers.filter( ( x : any ) => x?.rejected_status === '審核中'  ) ;
    
            set_Num( _customers.length ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 

    } , [] ) ;

    return num 

}



