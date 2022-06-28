

import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'

import axios from 'utils/axios'
import { check_Plan_Done } from 'utils/data/check_data'




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

             // 篩選出 _ 拒接 : 審核中、通過 ( 不顯示：退回 )
            const _pets = pets.filter( ( x : any ) =>  x?.rejected_status === '審核中' || 
                                                       x?.rejected_status === '通過' ) ; 
    
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




// 取得 _ 特定寵物，所有的方案
export const usePet_With_Plans = ( pet_Serial : string ) => {

    const [ plans , set_Plans ] = useState( [] ) ;

    useEffect( () => {
         
        if( pet_Serial ){

            axios.get( `/plans/show_Single_Pet_Plans/${ pet_Serial }` ).then( res => {

                set_Plans( res.data ) ;
    
            }).catch( err => {
    
                console.log( `取得方案錯誤 : ${ err }` ) ;
    
            }) ;

        }
       
    } , [ pet_Serial ] ) ;

    return plans

}


// 判斷 _ 特定寵物，是否能有方案，可供使用
export const usePet_Is_Plans_Available = ( pet_Serial : string  ) => {

   const [ is_Available , set_Is_Available ] = useState( false ) ;


   // 取得 _ 特定寵物，所有的方案
   const pet_Plans   = usePet_With_Plans( pet_Serial ) ;


   // 目前所點選 : 新增標籤
   const current_Tab = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


   useEffect( () => {
     
     if( pet_Plans.length > 0 ){ 


        let arr : any[] = [] ;

        pet_Plans.forEach( ( x : any ) => {

            const p_Type    = x?.plan_type ;          // 方案類型  
            const u_Records = x?.plan_used_records ;  // 方案使用紀錄
            const c_Plan    = x?.custom_plan ;        // 自訂方案內容  

            arr.push( check_Plan_Done( p_Type , u_Records , c_Plan , current_Tab ) ) ;

        }) ;

        // 只要該寵物方案中，仍有未使用方案，即設定為有方案可供使用
        if( arr.includes( false ) ) set_Is_Available( true ) ;
        
 
     }else{

        set_Is_Available( false ) ;

     }


     // 設回初始值
     return () => set_Is_Available( false )


      
   } , [ pet_Plans , current_Tab , pet_Serial ] ) ;


   return is_Available  

}








