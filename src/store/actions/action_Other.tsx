


import { Dispatch } from "redux";
import axios from "utils/axios";

import { set_Side_Panel } from "store/actions/action_Global_Layout";
import {toast} from "react-toastify";





// 計算 _  其他 : 收入
export const cal_Others_Income_Total = ( data : any[] , dispatch : any  ) => {

    // 篩選出 _ 收入
    const _data = data.filter( ( x:any ) => x['type'] === "收入" ) ;
    
    // 加總 _ 小計金額
    let total_Amount = 0 ;
    _data.forEach( ( x : any ) => total_Amount += x['amount'] ) ;
   
    // 設定 _ 小計金額
    dispatch({
               type                : "SET_OTHERS_INCOME_TOTAL" ,
               others_Income_Total : total_Amount
            }) ;

} ;



// 計算 _  其他 : 收入
export const cal_Others_Expenditure_Total = ( data : any[] , dispatch : any  ) => {

    // 篩選出 _ 收入
    const _data = data.filter( ( x:any ) => x['type'] === "支出" ) ;
    
    // 加總 _ 小計金額
    let total_Amount = 0 ;
    _data.forEach( ( x : any ) => total_Amount += x['amount'] ) ;
   
    // 設定 _ 小計金額
    dispatch({
               type                     : "SET_OTHERS_EXPENDITURE_TOTAL" ,
               others_Expenditure_Total : total_Amount
             }) ;


} ;


// 取得 : 其他收支資料 ( 依照日期 )
export const get_Others_By_Date = ( date : string , dispatch : any ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `/others/show_others_by_date/${ date }` ).then( res => {
                
                     // 排序 
                     const data = res.data.sort( ( a : any , b : any ) : any => {            
                        return a['created_at'] < b['created_at'] ? 1 : -1
                     }) ;


                    // 排除 _ 銷單 ( 待補 01.13 )     


                    // # 計算 _ 小計金額 --------------------------------------- 
                    cal_Others_Income_Total( data , dispatch ) ;        // 收入
                    cal_Others_Expenditure_Total( data , dispatch  ) ; // 支出
            
                    dispatch({
                               type           : "GET_OTHERS_BY_DATE" ,
                               others_By_Date : res.data
                            }) ;


                }) 

           } ;

} ;



// 刪除 : 單筆收支資料
export const delete_Other_Item = ( id : string , history : any ) => {

    return ( dispatch : any ) => {

                 
                axios.delete( `/others/${ id }` ).then( res => {

                    toast(`🦄 已刪除此筆收支資料`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});

                    dispatch( set_Side_Panel( false , null ,{} ) ) ;

                    history.push("/wrongpath");  // 錯誤路徑
                    history.push("/management");  // 正確路徑

                }) 

           } ;

} ;
