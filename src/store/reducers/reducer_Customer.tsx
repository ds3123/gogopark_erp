import React from "react" ;


/* @ 客戶頁  */

interface ICustomer {

   IsExisting_Customer    : boolean ; // 資料庫 _ 是否已有該客戶紀錄

   IsQuerying_Customer_ID : boolean ; // 是否正在輸入 _ 身分證字號欄位

   Customer_Plans_Records : any[] ;   // 客戶 _ 方案與其使用紀錄

   Current_Customer_Pets  : any[] ;   // 目前 _ 客戶的所有寵物
   Customer_isLoading     : boolean ; // 客戶頁資料 _ 是否下載中

   Current_Customer_Name  : string ;  // 目前所輸入 _ 客戶姓名
   Current_Customer_Id    : string ;  // 目前所輸入 _ 客戶身分證字號


   Customer_Relatives_Num     : number ; // 客戶關係人數 ( for 新增 _ 客戶、關係人)
   Current_Customer_Relatives : any[] ;  // 目前客戶所有關係人

   Current_Customer           : any ;    // 目前客戶  

}

const initState = {

    IsExisting_Customer    : false ,

    IsQuerying_Customer_ID : false ,

    Customer_Plans_Records : [] ,

    Current_Customer_Pets  : [] ,
    Customer_isLoading     : true ,

    Current_Customer_Name  : '' ,
    Current_Customer_Id    : '' ,

    Customer_Relatives_Num     : 0 ,
    Current_Customer_Relatives : [] ,

    Current_Customer           : null

} ;


const reducer_Customer = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 是否已存在 : 客戶
        case  "SET_IS_EXISTING_CUSTOMER" : return { ...state , IsExisting_Customer : action.bool } ;

        // # 設定 _ 是否正在輸入 _ 身分證字號欄位
        case  "SET_IS_QUERYING_CUSTOMER_ID" : return { ...state , IsQuerying_Customer_ID : action.bool } ;

        // # 設定 _ 該客戶，是否有購買方案，如 : 包月洗澡、美容 ( for 決定 _ 是否能使用、還可以使用幾次 )
        case  "SET_CUSTOMER_PLANS_RECORDS" : return { ...state , Customer_Plans_Records : action.Customer_Plans_Records } ;

        // # 取得 _ 目前客戶的所有寵物 ( 依照身分證字號 )
        case  "GET_CURRENT_CUSTOMER_PETS" : return { ...state , Current_Customer_Pets : action.cus_Pets } ;

        // # 設定 _ 目前客戶的所有寵物
        case  "SET_CURRENT_CUSTOMER_PETS" : return { ...state , Current_Customer_Pets : action.cus_Pets } ;

        // # 設定 _ 目前所輸入 : 客戶姓名
        case  "SET_CURRENT_CUSTOMER_NAME" : return { ...state , Current_Customer_Name : action.Current_Customer_Name } ;

        // # 設定 _ 目前所輸入 : 客戶身分證字號
        case  "SET_CURRENT_CUSTOMER_ID" : return { ...state , Current_Customer_Id : action.Current_Customer_Id } ;

        // # 設定 _ 客戶頁資料 _ 是否下載中
        case  "SET_CUSTOMER_ISLOADING" : return { ...state , Customer_isLoading : action.Customer_isLoading } ;
        
        // # 設定 _ 客戶關係人 : 數目 ( for 新增 _ 客戶、關係人 )
        case  "SET_CUSTOMER_RELATIVES_NUM" : return { ...state , Customer_Relatives_Num : action.Customer_Relatives_Num } ;

        // # 取得 _ 客戶所有關係人
        case  "GET_CUSTOMER_RELATIVES" : return { ...state , Current_Customer_Relatives : action.Current_Customer_Relatives } ;
        
        // # 設定 _ 客戶所有關係人
        case  "SET_CUSTOMER_RELATIVES" : return { ...state , Current_Customer_Relatives : action.Current_Customer_Relatives } ;

        // # 設定 _ 目前客戶
        case  "SET_CURRENT_CUSTOMER" : return { ...state , Current_Customer : action.Current_Customer } ;


        default : return state ;

    }

} ;

export default reducer_Customer ;
