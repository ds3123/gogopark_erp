import React from "react" ;


/* @ 洗美頁  */

interface IService {

    current_Payment_Method          : string ;  // 目前 _ 付款方式 ( Ex. 現金、包月洗澡、包月美容... )

    Service_isLoading               : boolean ; // 洗美頁資料 _ 是否下載中

    current_Create_Service_Type     : string ;  // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    current_Create_Tab              : string ;  // 目前所點選 _ 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )

    service_Error_Handle_Records    : any[] ;   // 服務異常處理紀錄  

    service_Records_By_Date         : any[] ;   // 基礎、洗澡、美容，特定日期紀錄 ( for 首頁，每隔幾秒呼叫 ) 
    service_Finance_Records_By_Date : any[] ;   // 基礎、洗澡、美容，特定日期紀錄 ( for 日報表 ) 

    service_Amount_Total            : number ;  // 洗澡、美容 : 小計金額 ( for 日報表 )
    care_Lodge_Amount_Total         : number ;  // 安親、住宿 : 小計金額 ( for 日報表 )

    species_Service_Prices          : any[] ;   // 特定品種，所有 ( 5 種 ) 基本服務價格

}

const initState = {

    current_Payment_Method          : '現金' ,

    Service_isLoading               : true ,
    current_Create_Service_Type     : '' ,
    current_Create_Tab              : '' ,

    service_Error_Handle_Records    : [] ,

    service_Records_By_Date         : [] ,
    service_Finance_Records_By_Date : [] ,

    service_Amount_Total            : 0 ,
    care_Lodge_Amount_Total         : 0 ,

    species_Service_Prices          : []
 
} ;


const reducer_Customer = ( state : IService = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 洗美頁資料 : 是否下載中
        case "SET_SERVICE_ISLOADING" : return { ...state , Service_isLoading : action.Service_isLoading } ;

        // # 設定 _ 目前新增 : 服務類別 ( Ex. 初次洗澡、單次洗澡、包月洗澡 ... )
        case "SET_CURRENT_CREATE_SERVICE_TYPE" : return { ...state , current_Create_Service_Type : action.serviceType } ;

        // # 設定 _ 目前所點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )
        case "SET_CURRENT_CREATE_TAB" : return { ...state , current_Create_Tab : action.current_Create_Tab } ;

        // # 取得 _ 服務異常處理紀錄
        case "GET_SERVICEERROR_HANDLE_RECORD" : return { ...state , service_Error_Handle_Records : action.service_Error_Handle_Records } ;

        // # 設定 _ 目前付款方式
        case "SET_CURRENT_PAYMENT_METHOD" : return { ...state , current_Payment_Method : action.current_Payment_Method } ;
       
        // 取得 : 基礎、洗澡、美容，特定日期紀錄 ( for 首頁，每隔幾秒呼叫 ) 
        case "GET_SERVICE_RECORDS_BY_DATE" : return { ...state , service_Records_By_Date : action.service_Records_By_Date } ;
       
        // 取得 : 基礎、洗澡、美容，特定日期紀錄 ( for 日報表 )
        case "GET_FINANCE_SERVICE_RECORDS_BY_DATE" : return { ...state , service_Finance_Records_By_Date : action.service_Finance_Records_By_Date } ;
       
        // # 設定 _ 洗澡、美容 : 小計金額 ( for 日報表 )
        case "SET_SERVICE_AMOUNT_TOTAL" : return { ...state , service_Amount_Total : action.service_Amount_Total } ;
    
        // # 設定 _ 安親、住宿 : 小計金額 ( for 日報表 )
        case "SET_CARE_LODGE_AMOUNT_TOTAL" : return { ...state , care_Lodge_Amount_Total : action.care_Lodge_Amount_Total } ;
        
        // # 取得 _ 特定品種，所有 ( 5 種 ) 基本服務價格
        case "SET_SPECIES_SERVICE_PRICES" : return { ...state , species_Service_Prices : action.species_Service_Prices } ;


        // # 設定 _ 回復初始值 
        case  "SET_SERVICEW_STATES_TO_DEFAULT" : return initState ;

        default : return state ;

    }


} ;

export default reducer_Customer ;
