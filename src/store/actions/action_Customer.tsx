
import { Dispatch } from "redux";
import axios from "utils/axios";

import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Customer from "components/customers/edit/Update_Customer";



/* @ 客戶頁  */

// # 設定 _ 是否 : 已存在客戶
export const set_IsExisting_Customer = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type : "SET_IS_EXISTING_CUSTOMER" ,
            bool : bool
        }) ;

    } ;

} ;

// # 設定 _ 是否正在輸入 _ 身分證字號欄位
export const set_IsQuerying_Customer_ID = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type : "SET_IS_QUERYING_CUSTOMER_ID" ,
            bool : bool
        }) ;

    } ;

} ;

// # 設定 _ 該客戶，是否有購買方案，如 : 包月洗澡、美容 ( for 決定 _ 是否能使用、還可以使用幾次 )
export const set_Customer_Plans_Records = ( planRecords : any[] ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                   : "SET_CUSTOMER_PLANS_RECORDS" ,
                    Customer_Plans_Records : planRecords
                }) ;

           } ;

} ;


// # 取得 _ 目前客戶表單，所填入客戶身分證字號，其所有寵物 ( 依客戶身分證字號查詢，for 寵物表單，取得客戶寵物用 )
export const get_Current_Customer_Pets = ( cus_Id : string ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `/customers/show_pets/${ cus_Id }` ).then( res => {

                    dispatch({
                        type     : "GET_CURRENT_CUSTOMER_PETS",
                        cus_Pets : res.data
                    })

                });

           } ;

} ;


// # 設定 _ 目前客戶的所有寵物
export const set_Current_Customer_Pets = ( cus_Pets : [] ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type     : "SET_CURRENT_CUSTOMER_PETS",
                    cus_Pets : cus_Pets
                })

           } ;

} ;


// # 設定 _ 目前所輸入 : 客戶姓名
export const set_Current_Customer_Name = ( name : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                  : "SET_CURRENT_CUSTOMER_NAME",
                    Current_Customer_Name : name
                })

           } ;

} ;


// # 設定 _ 目前所輸入 : 客戶身分證字號
export const set_Current_Customer_Id = ( id : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                : "SET_CURRENT_CUSTOMER_ID",
                    Current_Customer_Id : id
                })

           } ;

} ;


// # 設定 _ 客戶頁資料 _ 是否下載中
export const set_Customer_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_CUSTOMER_ISLOADING" ,
            Customer_isLoading : bool
        }) ;

    } ;

} ;


// # 清空 _ 所有客戶欄位值
export const set_Customer_Columns_Empty = ( setValue : any ) => {

    return ( ) => {

              setValue( "customer_Id" , "" ) ;  
              setValue( "customer_Name" , "" ) ;  
              setValue( "customer_Cellphone" , "" ) ;  
              setValue( "customer_Telephone" , "" ) ;  
              setValue( "customer_Line" , "" ) ;  
              setValue( "customer_Email" , "" ) ;  
              setValue( "customer_Address" , "" ) ;  
              
              setValue( "customer_Relative_Name" , "" ) ;  
              setValue( "customer_Relative_Family" , "請選擇" ) ;  
              setValue( "customer_Relative_Cellphone" , "" ) ;  
              setValue( "customer_Relative_Telephone" , "" ) ;  

           } ;

} ;


// # 設定 _ 客戶關係人 : 數目 ( for 新增 _ 客戶、關係人 )
export const set_Customer_Relatives_Num = ( num : number ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                   : "SET_CUSTOMER_RELATIVES_NUM" ,
                            Customer_Relatives_Num : num
                        }) ;

           } ;

} ;


// # 取得 _ 客戶所有關係人
export const get_Customer_Relatives = ( customer_Id : string ) => {

    return ( dispatch : Dispatch ) => {
   
              axios.get( `/customers/show_relations/${ customer_Id }` ).then( res => { 

                dispatch({
                           type                       : "GET_CUSTOMER_RELATIVES" ,
                           Current_Customer_Relatives : res.data
                }) ;

              })   

           } ;

} ;


// # 設定 _ 客戶所有關係人
export const set_Customer_Relatives = ( relatives : any[] ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type                       : "SET_CUSTOMER_RELATIVES" ,
                           Current_Customer_Relatives : relatives
                }) ;

           } ;

} ;


// # 更新 _ 客戶關係人

// # 設定 _ 客戶關係人 : 數目 ( for 新增 _ 客戶、關係人 )
export const update_Customer_Relatives = ( customer_Id : string , data : any , Customer_Relatives_Num : number , history : any , redirect : string ) => {


    return ( ) => {

                // 先刪除 _ 該客戶所有關係人   
                axios.delete( `/customers/destroy_relation_by_cus_id/${ customer_Id }` ).then( res => {

                    // 依照關係人數，新增 _ 關係人
                    for( let n = 1 ; n <= Customer_Relatives_Num ; n++ ){

                        const num = n.toString() ; 

                        // 轉換資料欄位
                        const submitData = {

                            customer_id  : data['customer_Id'] ,  // 客戶身分證字號

                            name         : data['customer_Relative_Name_'+num] ,
                            type         : data['customer_Relative_Type_'+num] ,
                            tag          : data['customer_Relative_Family_'+num] ,
                            
                            mobile_phone : data['customer_Relative_Cellphone_'+num] ,
                            tel_phone    : data['customer_Relative_Telephone_'+num] ,

                            sex          : data['customer_Relative_Sex_'+num] ,  
                            id           : data['customer_Relative_Id_'+num] ,   
                            address      : data['customer_Relative_Address_'+num]    

                        } ;
                        
                        axios.post( '/customers/store_relation' , submitData ) ;

                    }

                    // # 過 300 ms 後再重導向一次  
                    // # 以讓客戶列表 ( /customers ) 取得的資料，包含 "關係人" ( update_Data 第一次導向時，update_Customer_Relatives 關係人資料尚未取得回傳  )
                    setTimeout( () => {
                        
                       history.push( "/wrongpath" );  // 錯誤路徑
                       history.push( redirect );  // 正確路徑

                    }, 300 );


                });
               

           } ;

} ;


// # 顯示 _ 編輯客人資訊 ( 右側滑動面板 )
export const click_Show_Edit_Customer = ( cus_Id : string , customer : any ) => {

    return ( dispatch : any ) => {

                // 查詢 _ 客戶關係人
                axios.get( `/customers/show_relations_pets/${ cus_Id }` ).then( res => { 

                    dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : res.data } ) ) ;

                })  

           } ;

} ;



// # 設定 _ 目前客戶
export const set_Current_Customer = ( cus_Id : string  ) => {

    return ( dispatch : any ) => {

               axios.get( '/customers/'+cus_Id ).then( res => {

                    const cus = res.data ;

                    dispatch({
                        type             : "SET_CURRENT_CUSTOMER" ,
                        Current_Customer : res.data
                    }) ;

                
               }) ;

           } ;

} ;






