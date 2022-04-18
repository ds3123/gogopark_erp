

import { Dispatch } from "redux";
import axios from "utils/axios";
import cookie from 'react-cookies'
import { toast } from "react-toastify";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";



/* @ 方案 */

// # 設定 _ 目前所使用的方案類型
export const set_current_plan_type = ( type : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_PLAN_TYPE" ,
            current_Plan_Type : type
        }) ;

    } ;

} ;

// # 設定 _ 包月洗澡價格
export const set_month_bath_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type             : "SET_MONTH_BATH_PRICE" ,
            Month_Bath_Price : price
        }) ;

    } ;

} ;

// # 設定 _ 包月美容價格
export const set_month_beauty_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_MONTH_BEAUTY_PRICE" ,
            Month_Beauty_Price : price
        }) ;

    } ;

} ;

// # 設定 _ 住宿券價格
export const set_lodge_coupon_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_LODGE_COUPON_PRICE" ,
            Lodge_Coupon_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 目前所選擇方案 : 價錢小計
export const set_Current_Plan_Price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_CURRENT_PLAN_PRICE" ,
            current_Plan_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 自訂 加 / 減 金額 ( for 包月洗澡、包月美容 )
export const set_Self_Adjust_Amount = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_SELF_ADJUST_AMOUNT" ,
                    self_Adjust_Amount : price
                }) ;

           } ;

} ;


// # 設定 _ 接送費 ( for 包月洗澡、包月美容 )
export const set_Service_Pickup_Fee = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_SERVICE_PICKUP_FEE" ,
            service_Pickup_Fee : price
        }) ;

    } ;

} ;



// 設定 _ 是否已點選，使用方案
export const set_Use_Plan = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type         : "SET_USE_PLAN" ,
            is_Plan_Used : bool
        }) ;

    } ;

} ;



// 設定 _ 目前選擇 : 方案資料表 ( plans ) id
export const set_Current_Plan_Id = ( planId : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type            : "SET_CURRENT_PLAN_ID" ,
                    current_Plan_Id : planId
                }) ;

           } ;

} ;


// 設定 _ 目前選擇 : 方案備註 Ex. 包月洗澡第 1 次
export const set_Current_Plan_Note = ( planNote : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_PLAN_NOTE" ,
            current_Plan_Note : planNote
        }) ;

    } ;

} ;


// 設定 _ 目前點選使用的方案服務 _ 價格
export const set_Current_Plan_Service_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                       : "SET_CURRENT_PLAN_SERVICE_PRICE" ,
            current_Plan_Service_Price : price
        }) ;

    } ;

} ;



// 設定 _ 目前點選使用方案標籤的索引號碼 
export const set_Current_Plan_Tag_Index = ( index : number | null ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                   : "SET_CURRENT_PLAN_TAG_INDEX" ,
            current_Plan_Tag_Index : index
        }) ;

    } ;

} ;



// 計算 _  洗澡美容 "預收款" 小計金額 ( 購買方案 : 預設 / 自訂 )
export const cal_Buy_Plan_Amount_Total = ( data : any[] , dispatch : any  ) => {

     // 加總 _ 小計金額
     let total_Amount = 0 ;
     data.forEach( ( x : any ) => total_Amount += x['plan_fee_total'] ) ;

     // 設定 _ 小計金額
     dispatch({ 
                type                  : "SET_BUY_PLAN_AMOUNT_TOTAL" ,
                buy_Plan_Amount_Total : total_Amount
              }) ;


} ;



// 取得 : 服務方案 ( 依照日期 )
export const get_Plans_By_Date = ( date : string , dispatch : any ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `/plans/show_plans_by_date/${ date }` ).then( res => {

                    // 排序 
                    const data = res.data.sort( ( a : any , b : any ) : any => {            
                                  return a['created_at'] < b['created_at'] ? 1 : -1
                                }) ;


                     
                    // 排除 _ 銷單 ( 待補 01.13 )                       



                    // # 計算 _ 小計金額 --------------------------------------- 
                    cal_Buy_Plan_Amount_Total( data ,  dispatch ) ;    // 洗澡美容 "預收款" ( 購買方案 : 預設 / 自訂 )          


                    dispatch({
                               type          : "GET_PLANS_BY_DATE" ,
                               plans_By_Date : data
                            }) ;

                }) 

           } ;

} ;



// 取得 : 特定寵物 _ 所有方案 ( 包月洗澡 + 包月美容 )
export const get_Pet_All_Plans = ( pet_Serial : string ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `plans/show_Single_Pet_Plans/${ pet_Serial }` ).then( res => {

                    dispatch({
                                type          : "GET_PET_ALL_PLANS" ,
                                pet_All_Plans : res.data
                             }) ;

                }) 

           } ;

} ;


// 設定 : 特定寵物 _ 所有方案 ( 包月洗澡 + 包月美容 )
export const set_Pet_All_Plans = ( plans : any[] ) => {

    return ( dispatch : Dispatch ) => {

               dispatch({
                          type          : "SETS_PET_ALL_PLANS" ,
                          pet_All_Plans : plans
                        }) ;

           } ;

} ;



// for 點選 _ 使用方案 ( 預設、自訂 ) ------------------

 export const get_Use_Plan_Amount = ( current : string , plan : any , used_Amount : number ) => {
            
    const plan_Total_price = plan['plan_fee_total'] ;  // 方案總計價格
 
    // # 計算 _ 此次所花費的金額 ( 四捨五入 ) 
    let current_Amount = 0 ;   

    // * 預設方案
    if( current === '洗澡' && plan['plan_type'] === '包月洗澡' ) current_Amount = Math.round( plan_Total_price / 4 ) ;  
    if( current === '洗澡' && plan['plan_type'] === '包月美容' ) current_Amount = Math.round( plan_Total_price / 5 ) ;         // 若為 "包月美容"， 1 次美容計為 2 次 ( 洗澡 3  , 美容 2 ) 
    if( current === '美容' && plan['plan_type'] === '包月美容' ) current_Amount = Math.round( ( plan_Total_price / 5 ) * 2 ) ; // 若為 "包月美容"， 1 次美容計為 2 次 ( 洗澡 3  , 美容 2 ) 

    // * 客製方案
    const is_Custom_Plan = plan['plan_type'] !== '包月洗澡' && plan['plan_type'] !== '包月美容' ;

    let bath_Num       = 0 ;
    let beauty_Num     = 0 ;

    if( is_Custom_Plan ){
        bath_Num       = plan['custom_plan']['bath_num'] ;   // 洗澡次數
        beauty_Num     = plan['custom_plan']['beauty_num'] ; // 美容次數
    }
   
    if( current === '洗澡' && is_Custom_Plan && bath_Num )   current_Amount = Math.round( plan_Total_price / bath_Num ) ; 
    if( current === '美容' && is_Custom_Plan && beauty_Num ) current_Amount = Math.round( plan_Total_price / beauty_Num ) ;        

    // ------------------------------------------------     
    
    const balance      = plan_Total_price - used_Amount ;    // 計算 _ 剩餘金額         
    if( current_Amount > balance ) return balance ;          // 要設定的此次金額，比剩餘金額大 --> 設定剩餘金額

    return current_Amount ;

 } ;

 // # 取得 _ 已使用紀錄的金額
 export const get_Plan_Used_Amount = ( plan_Records : any[] ) => {

    let used_Amount = 0 ;
    plan_Records.forEach( ( x : any ) => used_Amount += x['service_price'] ) ;

    return used_Amount ; 

 } ; 

 // # 取得 _ 已使用次數
 export const get_Plan_Used_Num = ( current : string , plan_Records : any[] ) => {

    return plan_Records.filter( ( x : any ) => x['service_type'] === current ).length

 } ; 

// # 取得 _ 方案備註
export const get_Plan_Used_Note = ( current : string , plan_Type : string , used_Num : number ) => {

    // 預設方案 
    if( current === '洗澡' && plan_Type === '包月洗澡' ) return `[ 預設 ] 包月洗澡下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '洗澡' && plan_Type === '包月美容' ) return `[ 預設 ] 包月美容下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '美容' && plan_Type === '包月美容' ) return `[ 預設 ] 包月美容下，美容第 ${ used_Num + 1 } 次` ;
    

    // 客製方案
    const is_Custom_Plan = plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ;  
    
    if( current === '洗澡' && is_Custom_Plan ) return `[ 自訂 ] ${ plan_Type }下，洗澡第 ${ used_Num + 1 } 次` ;
    if( current === '美容' && is_Custom_Plan ) return `[ 自訂 ] ${ plan_Type }下，美容第 ${ used_Num + 1 } 次` ;

    return ''

} ;

// 點選 : 使用方案標籤 
export const set_Click_Use_Plan_Tag = ( current : string , plan : any , tag_Index : number  ) => {
 
    return ( dispatch : any ) => {

                // 已使用次數
                const used_Num       = get_Plan_Used_Num( current , plan['plan_used_records'] ) ;   
                
                // 已使用金額
                const used_Amount    = get_Plan_Used_Amount( plan['plan_used_records'] ) ; 

                // 此次使用金額
                const current_Amount = get_Use_Plan_Amount( current , plan , used_Amount ) ;

                // 此次使用備註
                const current_Note   = get_Plan_Used_Note( current , plan['plan_type'] , used_Num ) ;
    

                // 設定 _ 目前點選使用方案標籤的索引號碼 
                dispatch( set_Current_Plan_Tag_Index( tag_Index ) ) ;   

                // 設定 _ 目前所點選方案 : 資料表 ( plans ) id
                dispatch( set_Current_Plan_Id( plan['id'] ) ) ;

                // 設定 _ 目前所點選方案 : 類型 / 名稱
                dispatch( set_current_plan_type( plan['plan_type'] ) ) ;

                // 設定 _ 使用此次方案的價格 ( for 預先寫入 "此次價格" 輸入框 )
                dispatch( set_Current_Plan_Service_Price( current_Amount ) )  ;

                // 目前選擇 : 方案備註  Ex. 洗澡第 1 次
                dispatch( set_Current_Plan_Note( current_Note ) )  ;
        
                // 設定 _ 是否已點選方案標籤 ( for 表單提交驗證 )
                dispatch( set_Use_Plan( true ) ) ;

           } ;

} ;


// 再次點選 : 使用方案標籤 ( 回復 _ 以上點選 : click_Use_Plan_Tag  )
export const click_Reset_Use_Plan_Tag = ( ) => {
 
    return ( dispatch : any ) => {

                // 設定 _ 目前點選使用方案標籤的索引號碼 
                dispatch( set_Current_Plan_Tag_Index( null ) ) ;   

                // 設定 _ 目前所點選方案 : 資料表 ( plans ) id
                dispatch( set_Current_Plan_Id( '' ) ) ;

                // 設定 _ 目前所點選方案 : 類型 / 名稱
                dispatch( set_current_plan_type( '' ) ) ;

                // 設定 _ 使用此次方案的價格 ( for 預先寫入 "此次價格" 輸入框 )
                dispatch( set_Current_Plan_Service_Price( 0 ) )  ;

                // 目前選擇 : 方案備註  Ex. 洗澡第 1 次
                dispatch( set_Current_Plan_Note( '' ) )  ;
        
                // 設定 _ 是否已點選方案標籤 ( for 表單提交驗證 )
                dispatch( set_Use_Plan( false ) ) ;

           } ;

} ;

// --------------------

// 新增 _ 方案使用紀錄 ( 資料表 : plan_uesd_records )
export const add_Plan_Used_Record = ( data : any , res : any , history : any ) => {

    return ( dispatch : any ) => {

        const plan_id       = data['current_Plan_Id'] ? data['current_Plan_Id'] : '' ;
        const plan_type     = data['current_Plan_Type'] ? data['current_Plan_Type'] : '' ;
        const customer_id   = data['customer_Id'] ? data['customer_Id'] : '' ;
        const pet_serial    = data['pet_Serial'] ? data['pet_Serial'] : '' ;
        const service_id    = res.data ? res.data : null ;
        const service_price = data['current_Plan_Used_Fee'] ? parseInt( data['current_Plan_Used_Fee'] ) : 0 ;

        const obj_Plan      = {
                                plan_type     : plan_type ,                  // 方案類型 / 名稱
                                plan_id       : plan_id  ,                   // 本次美容，所使用的方案資料表( plans ) id
                                customer_id   : customer_id ,                // 客戶身分證字號
                                pet_serial    : pet_serial ,                 // 寵物編號
                                service_id    : service_id ,                 // 新增洗澡單後，回傳的該筆 _ 資料表 id
                                service_type  : data['current_Tab'] ,        // 服務類型 ( 洗澡 or 美容 )
                                service_note  : data['current_Plan_Note'] ,  // 目前選擇 _ 方案備註     Ex. 包月洗澡第 1 次
                                service_price : service_price                // 目前選擇 _ 方案服務價錢 ( 基本價格 / 4 *再確認 2021.08.09 )
                              } ;


        axios.post( "/plan_records" , obj_Plan ).then( res => {

            dispatch( set_Side_Panel( false , null , {} ) ) ;

            history.push( "/wrongpath" ) ;  // 錯誤路徑
            history.push( "/services" ) ;   // 正確路徑

        }).catch( error => {

            alert( `新增錯誤 _ 美容 : 包月美容紀錄。 未輸入美容單 ID : ${ res.data }` ) ;
            console.log( `新增錯誤 _ 美容 : 包月美容紀錄。 未輸入美容單 ID : ${ res.data }`  ) ;

        }) ;

    }

} ;



// ------------------------------------------------------------


// 驗證 _ 自行定價條件
export const verify_Self_Pricing_Plan = ( bath_Num : number , beauty_Num : number , plan_Price : number  , data : any ) => {

    let bath_Amount   = 0 ;
    let beauty_Amount = 0 ;
   
    let bathArr       = [] ;
    let beautyArr     = [] ;

    let Flag          = true ;

    // 洗澡
    if( bath_Num > 0 ){

        for( let i = 1 ; i<= bath_Num ; i++  ){

            // 未填入價格檢查
            if( !data[ 'plan_bath_price_' + i ] ){
                alert( `「洗澡」第 ${ i } 個價格，尚未填入。` ) ; 
                Flag = false 
                return false
            } 

            bathArr.push( data[ 'plan_bath_price_' + i ] ) ;         // 放入各個價格
            bath_Amount += Number( data[ 'plan_bath_price_' + i ] ) ; // 加總洗澡金額

        }

    }

    // 美容 
    if( beauty_Num > 0 ){

        for( let i = 1 ; i<= beauty_Num ; i++  ){

            // 未填入價格檢查
            if( !data[ 'plan_beauty_price_' + i ] ){
                alert( `「美容」第 ${ i } 個價格，尚未填入。` ) ; 
                Flag = false 
                return false
            } 

            beautyArr.push( data[ 'plan_beauty_price_' + i ] ) ;          // 放入各個價格
            beauty_Amount += Number( data[ 'plan_beauty_price_' + i ] ) ; // 加總美容金額 

        }

    }


    // # 檢查 _ 金額分配，是否符合方案預設價格 
    if( plan_Price > ( bath_Amount + beauty_Amount ) ){
        alert( `尚有未分配金額 : ${ plan_Price - ( bath_Amount + beauty_Amount ) } 元` ) ;
        Flag = false
        return false
    }

    if( plan_Price < ( bath_Amount + beauty_Amount ) ){
        alert( `分配價格總和，"超過" 預設價格 : ${ ( bath_Amount + beauty_Amount ) - plan_Price } 元` ) ;
        Flag = false 
        return false
    }


   
    return Flag ? { bathArr , beautyArr } : false ;

} ;


// 新增 _ 自訂方案
export const create_Custom_Plan = ( obj : any , history : any ) => {

    return ( dispatch : any ) => {

                axios.post( "/custom_plans" , obj ).then( res => { 

                    // Toast 通知
                    toast(`🦄 已新增 : 自訂方案 `, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});
        
                    // 關閉 Modal
                    dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;
        
                    // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
                    cookie.save( 'after_Created_Redirect' , '資料管理_方案資料'  ,  { path : '/' , maxAge : 5 } ) ;
        
                    history.push("/wrongpath");   // 錯誤路徑
                    history.push("/management");  // 正確路徑
        
                })

           } ;

} ;



// 設定 _ 自訂方案 : 洗澡次數
export const set_Current_Custom_Bath_Num = ( bath_Num : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CUSTOM_BATH_NUM" , current_Custom_Bath_Num : bath_Num }) ; 

} ;

// 設定 _ 自訂方案 : 美容次數
export const set_Current_Custom_Beauty_Num = ( beauty_Num : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CUSTOM_BEAUTY_NUM" , current_Custom_Beauty_Num : beauty_Num }) ; 

} ;

// 設定 _ 自訂方案 : 方案預設價格
export const set_Current_Custom_DefaultPrice = ( price : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CUSTOM_DEFAULT_PRICE" , current_Custom_DefaultPrice : price }) ; 

} ;

// 設定 _ 自訂方案 : 品種價格
export const set_Current_Custom_SpeciesPrice = ( price : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CUSTOM_SPECIES_PRICE" , current_Custom_SpeciesPrice : price }) ; 

} ;

// 設定 _ 自訂方案 : 基本價格 ( 可能為預設價格 or 品種價格 ) --> for 新增方案
export const set_Custom_Plan_Basic_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CUSTOM_PLAN_BASIC_PRICE" , custom_Plan_Basic_Price : price }) ; 

} ;


// 設定 _ 自訂方案 : 計價方式 ( 平均計算 / 自行計算 )
export const set_Current_Custom_Price_Method = ( method : string ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_CURRENT_CUSTOM_PRICE_METHOD" , current_Custom_Price_Method : method }) ; 

} ;


// 設定 _ 是否顯示 : 套用品種列表
export const set_Show_Applied_Species = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_SHOW_APPLIED_SPECIES" , show_Applied_Species : bool }) ; 

} ;


// 設定 _ 某方案所套用的寵物品種
export const set_Plan_Applied_Species = ( applied_Species : any[] ) => {

    return ( dispatch : Dispatch ) => dispatch({ type : "SET_PLAN_APPLIED_SPECIES" , plan_Applied_Species : applied_Species }) ; 

} ;


// 將方案所有狀態，設回 _ 初始值
export const set_Plan_States_To_Default = () => {

    return ( dispatch : Dispatch ) => {

               dispatch({ type : "SET_PLAN_STATES_TO_DEFAULT" }) ;

           } ;

} ;














