import React from "react" ;


/* @ 方案項目  */
interface IPlan {

    current_Plan_Type          : string ;           // 目前 _ 方案類型 ( 名稱 )
  
    current_Plan_Id            : number | string ;  // 目前 _ 方案資料表 ( plans ) id
    current_Plan_Note          : string  ;          // 目前 _ 方案備註 Ex. 包月洗澡第 1 次
    current_Plan_Service_Price : number             // 目前 _ 使用的方案服務 _價格 ( 該次使用金額 )
    current_Plan_Tag_Index     : null | number ;    // 目前 _ 點選使用方案標籤的索引號碼 

    is_Plan_Used               : boolean ;          // 是否已 _ 點選使用方案 : "包月洗澡" or "包月美容" 標籤 ( for 表單提交驗證邏輯 )

    // * 價錢
    Month_Bath_Price           : number ;  // 包月洗澡
    Month_Beauty_Price         : number ;  // 包月美容
    Lodge_Coupon_Price         : number ;  // 住宿券

    self_Adjust_Amount         : number ;  // 自行調整金額
    service_Pickup_Fee         : number ;  // 接送費

    current_Plan_Price         : number ;  // 目前所選擇方案 _ 價錢小計

    plans_By_Date              : any[] ;   // 特定日期的方案

    // * 寵物方案
    pet_All_Plans              : any[] ;   // 所有方案 

    deduct_Plan_Amount_Total   : number ;  // 扣 : 洗澡美容預收 ( 方案 ) 款小計 ( for 日報表 )
    buy_Plan_Amount_Total      : number ;  // 買 : 洗澡美容預收 ( 方案 ) 款小計 ( for 日報表 )


    // * 自訂方案
    current_Custom_Price_Method : string ;  // 計價方式 : 平均計算 / 自行計算

    current_Custom_Bath_Num     : number ;  // 洗澡次數
    current_Custom_Beauty_Num   : number ;  // 美容次數 
   
    current_Custom_DefaultPrice : number ;  // 預設價格
    current_Custom_SpeciesPrice : number ;  // 品種價格

    custom_Plan_Basic_Price     : number ;  // 自訂方案 : 基本價格 ( 可能為預設價格 or 品種價格 ) --> for 新增方案

    show_Applied_Species        : boolean ; // 是否顯示 : 套用品種列表
    plan_Applied_Species        : any[] ;   // 某方案所套用的寵物品種 
    
}

const initState = {

    current_Plan_Type      : '' ,
    current_Plan_Id        : '' ,
    current_Plan_Note      : '' ,

    current_Plan_Tag_Index     : null ,
    current_Plan_Service_Price : 0 ,

    Month_Bath_Price         : 0 ,
    Month_Beauty_Price       : 0 ,
    Lodge_Coupon_Price       : 0 ,

    self_Adjust_Amount       : 0 ,
    service_Pickup_Fee       : 0 ,

    current_Plan_Price       : 0 ,

    is_Plan_Used             : false ,

    plans_By_Date            : [] ,
    pet_All_Plans            : [] ,

    deduct_Plan_Amount_Total : 0 ,
    buy_Plan_Amount_Total    : 0 ,


    custom_Plans                : [] ,
    
    current_Custom_Bath_Num     : 0 ,
    current_Custom_Beauty_Num   : 0 ,

    current_Custom_DefaultPrice : 0 ,
    current_Custom_SpeciesPrice : 0 ,

    custom_Plan_Basic_Price     : 0 ,

    current_Custom_Price_Method : "平均計算" , 

    show_Applied_Species        : false ,
    plan_Applied_Species        : [] 

  
} ;


const reducer_Plan = ( state : IPlan = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 目前所使用的方案類型
        case  "SET_CURRENT_PLAN_TYPE" : return { ...state , current_Plan_Type : action.current_Plan_Type } ;

        // # 設定 _ 包月洗澡價格
        case  "SET_MONTH_BATH_PRICE" : return { ...state , Month_Bath_Price : action.Month_Bath_Price } ;

        // # 設定 _ 包月美容價格
        case  "SET_MONTH_BEAUTY_PRICE" : return { ...state , Month_Beauty_Price : action.Month_Beauty_Price } ;

        // # 設定 _ 住宿券價格
        case  "SET_LODGE_COUPON_PRICE" : return { ...state , Lodge_Coupon_Price : action.Lodge_Coupon_Price } ;

        // # 設定 _ 目前所選擇方案 : 價錢小計
        case  "SET_CURRENT_PLAN_PRICE" : return { ...state , current_Plan_Price : action.current_Plan_Price } ;

        // # 設定 _ 自訂 加 / 減 金額 ( for 包月洗澡、包月美容 )
        case  "SET_SELF_ADJUST_AMOUNT" : return { ...state , self_Adjust_Amount : action.self_Adjust_Amount } ;

        // # 接送費 ( for 包月洗澡、包月美容 )
        case  "SET_SERVICE_PICKUP_FEE" : return { ...state , service_Pickup_Fee : action.service_Pickup_Fee } ;

        // # 設定 _ 是否已點選使用 : 包月洗澡
        case  "SET_USE_PLAN" : return { ...state , is_Plan_Used : action.is_Plan_Used } ;

        // # 設定 _ 目前選擇 : 方案資料表 ( plans ) id
        case  "SET_CURRENT_PLAN_ID" : return { ...state , current_Plan_Id : action.current_Plan_Id } ;

        // # 設定 _ 方案備註 Ex. 洗澡第 1 次
        case  "SET_CURRENT_PLAN_NOTE" : return { ...state , current_Plan_Note : action.current_Plan_Note } ;

        // # 設定 _ 目前點選使用的方案服務 _ 價格
        case  "SET_CURRENT_PLAN_SERVICE_PRICE" : return { ...state , current_Plan_Service_Price : action.current_Plan_Service_Price } ;

        // # 設定 _ 目前點選使用方案標籤的索引號碼 
        case  "SET_CURRENT_PLAN_TAG_INDEX" : return { ...state , current_Plan_Tag_Index : action.current_Plan_Tag_Index } ;


        // # 取得 : 服務方案 ( 依照日期 )
        case  "GET_PLANS_BY_DATE" : return { ...state , plans_By_Date : action.plans_By_Date } ;
        
        // # 取得 : 服務方案 
        case  "GET_PET_ALL_PLANS" : return { ...state , pet_All_Plans : action.pet_All_Plans } ;
        
        // # 設定 : 服務方案 
        case  "SETS_PET_ALL_PLANS" : return { ...state , pet_All_Plans : action.pet_All_Plans } ;

       
        // # 設定 _ 扣 : 洗澡美容預收款小計 ( for 日報表 )
        case  "SET_DEDUCT_PLAN_AMOUNT_TOTAL" : return { ...state , deduct_Plan_Amount_Total : action.deduct_Plan_Amount_Total } ;
        
        // # 設定 _ 買 : 洗澡美容預收款小計 ( for 日報表 )
        case  "SET_BUY_PLAN_AMOUNT_TOTAL"    : return { ...state , buy_Plan_Amount_Total : action.buy_Plan_Amount_Total } ;
    

        // 設定 _ 自訂方案 : 洗澡次數
        case  "SET_CURRENT_CUSTOM_BATH_NUM" : return { ...state , current_Custom_Bath_Num : action.current_Custom_Bath_Num } ;
        

        // 設定 _ 自訂方案 : 美容次數
        case  "SET_CURRENT_CUSTOM_BEAUTY_NUM" : return { ...state , current_Custom_Beauty_Num : action.current_Custom_Beauty_Num } ;


        // 設定 _ 自訂方案 : 方案預設價格
        case  "SET_CURRENT_CUSTOM_DEFAULT_PRICE" : return { ...state , current_Custom_DefaultPrice : action.current_Custom_DefaultPrice } ;
       
        // 設定 _ 自訂方案 : 品種價格
        case  "SET_CURRENT_CUSTOM_SPECIES_PRICE" : return { ...state , current_Custom_SpeciesPrice : action.current_Custom_SpeciesPrice } ;

        // 設定 _ 自訂方案 : 基本價格 ( 可能為預設價格 or 品種價格 ) --> for 新增方案
        case  "SET_CUSTOM_PLAN_BASIC_PRICE" : return { ...state , custom_Plan_Basic_Price : action.custom_Plan_Basic_Price } ;


        // 設定 _ 自訂方案 : 計價方式 ( 平均計算 / 自行計算 )
        case  "SET_CURRENT_CUSTOM_PRICE_METHOD" : return { ...state , current_Custom_Price_Method : action.current_Custom_Price_Method } ;
        
        // 設定 _ 是否顯示 : 套用品種列表
        case  "SET_SHOW_APPLIED_SPECIES" : return { ...state , show_Applied_Species : action.show_Applied_Species } ;

        // 設定 _ 某方案所套用的寵物品種
        case  "SET_PLAN_APPLIED_SPECIES" : return { ...state , plan_Applied_Species : action.plan_Applied_Species } ;
        

        // # 設定 _ 回復初始值 
        case  "SET_PLAN_STATES_TO_DEFAULT" : return initState ;

        
        default : return state ;

    }

} ;

export default reducer_Plan ;
