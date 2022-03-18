
import { useEffect } from "react" ;
import { useDispatch } from "react-redux";


import { set_Is_Show_Section_Pet , set_Is_Show_Section_Services } from "store/actions/action_Global_Layout"



// # 監看 _ "客戶欄位" ( 新增表單 ) 是否完整填寫 --> 是否顯示 : 寵物區塊
export const useVerify_Required_Columns_Customer = ( watch : any ) => {


        const dispatch = useDispatch() ;

        // #  利用 RHF 的 watch 監看 _ 必填欄位 :
        // 客戶
        const c_Id                 = watch('customer_Id') ;                 // 身分證字號
        const c_Name               = watch('customer_Name') ;               // 姓名
        const c_Cellphone          = watch('customer_Cellphone') ;          // 手機號碼
        // 關係人
        const c_Relative_Name      = watch('customer_Relative_Name') ;      // 姓名
        const c_Relative_Family    = watch('customer_Relative_Family') ;    // 關係
        const c_Relative_Cellphone = watch('customer_Relative_Cellphone') ; // 手機號碼



       // 監看 _ 必填欄位 --> 顯示、隱藏 : 寵物區塊
       useEffect( () => { 
    
            // console.log( 'Id' , c_Id ) 
            // console.log( 'Name' , c_Name ) 
            // console.log( 'Cellphone' , c_Cellphone ) 

            // console.log( 'Relative_Name' , c_Relative_Name ) 
            // console.log( 'Relative_Family' , c_Relative_Family ) 
            // console.log( 'Relative_Cellphone' , c_Relative_Cellphone ) 
           
            if( c_Id && c_Name && c_Cellphone &&　
                c_Relative_Name　&& c_Relative_Family !== '請選擇' ){
                
                dispatch( set_Is_Show_Section_Pet( true ) ) ; // 顯示  
            
            }
    
  
        } , [ c_Id , c_Name , c_Cellphone , c_Relative_Name , c_Relative_Family , c_Relative_Cellphone ] ) ;

  
} ;


// # 監看 _ "寵物欄位" ( 新增表單 ) 是否完整填寫 --> 是否顯示 : 整體服務區塊
export const useVerify_Required_Columns_Pet = ( watch : any ) => {

    const dispatch = useDispatch() ;


    // # 利用 RHF 的 watch 監看 _ 必填欄位 :
    const pet_Name    = watch('pet_Name') ;    // 名字
    const pet_Species = watch('pet_Species') ; // 品種    ( Select 選單 )
    const pet_Size    = watch('pet_Size') ;    // 體型    ( Select 選單 )
    const bite        = watch('bite') ;        // 是否咬人 ( Input<Radio> )

   // 監看 _ 必填欄位 --> 顯示、隱藏 : 整體服務區塊
   useEffect( () => { 

    dispatch( set_Is_Show_Section_Services( true ) ) ; // 顯示  

    //if( pet_Name && pet_Species !== "請選擇" && pet_Size !== "請選擇" && bite ){
    if( pet_Name ){

        dispatch( set_Is_Show_Section_Services( true ) ) ; // 顯示  

    }

    
  } , [ pet_Name  ] ) ;
  

} ;