

import { useState , useEffect } from 'react'
import axios from 'utils/axios'



// @ 寵物相關 Hook


// 取得資料 _ 寵物有提交 : 申請拒接
export const usePet_Apply_Reject = () => {

    const [ data , set_Data ] = useState( [] ) ;

    useEffect( () => {

        axios.get( `/pets` ).then( res => {

            const pets  = res.data ;
            const _pets = pets.filter( ( x : any ) => x?.rejected_status === '審核中' ) ; // 篩選出:審核中
    
            set_Data( _pets ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [] ) ;


    return data 

} ;


// 取得資料 _ 寵物為拒接
export const usePet_Is_Rejected = () => {


    const [ data , set_Data ] = useState( [] ) ;


    useEffect( () => {

        axios.get( `/pets` ).then( res => {

            const pets  = res.data ;
            const _pets = pets.filter( ( x : any ) => x?.is_rejected === 1 ) ; // 篩選出：拒接
    
            set_Data( _pets ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [] ) ;


    return data 

} ;



// 取得資料 _ 寵物拒接 : 審核中、通過、退回
export const usePet_Is_Process_Reject = () => {


    const [ data , set_Data ] = useState( [] ) ;


    useEffect( () => {

        axios.get( `/pets/show_pets_customers` ).then( res => {

            const pets  = res.data ;
            const _pets = pets.filter( ( x : any ) => 
                              x?.rejected_status === '審核中' || 
                              x?.rejected_status === '通過' || 
                              x?.rejected_status === '退回' ) ; // 篩選出 _ 拒接 : 審核中、通過、退回
    
            set_Data( _pets ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [] ) ;


    return data 

} ;



// 取得 _ 所有寵物，拒接 : "審核中" 數目
export const usePet_Reject_Process_Num = () => {

    const [ num , set_Num ] = useState( 0 ) ;

    useEffect( () => {

        axios.get( `/pets` ).then( res => {

            const pets  = res.data ;

             // 篩選出 _ 拒接 : 審核中
            const _pets = pets.filter( ( x : any ) => x?.rejected_status === '審核中'  ) ;
    
            set_Num( _pets.length ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 

    } , [] ) ;

    return num 

}







