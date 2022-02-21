
import React from "react"


/* @ 安親  */
interface ICare {

    Care_isLoading       : boolean ; // 安親頁資料 _ 是否下載中

    // 目前選擇的安親類型
    current_Care_Type    : string ;

    // 費用
    Care_Ordinary_Price  : number ; // 一般安親費用
    Care_Ahead_Price     : number ; // 住宿_提早抵達
    Care_Postpone_Price  : number ; // 住宿_延後帶走

    expect_Care_End_Time : string ; // 預計 _ 安親結束時間 ( for 一般安親 )

}

const initState = {

    Care_isLoading       : true ,

    current_Care_Type    : '' ,

    Care_Ordinary_Price  : 0 ,
    Care_Ahead_Price     : 0 ,
    Care_Postpone_Price  : 0 ,

    expect_Care_End_Time : ''

} ;


const reducer_Care = ( state : ICare = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 安親頁資料 : 是否下載中
        case  "SET_CARE_ISLOADING" :  return { ...state , Care_isLoading : action.Care_isLoading } ;

        // # 設定 _ 目前所使用的方案類型
        case  "SET_CURRENT_CARE_TYPE" :  return { ...state , current_Care_Type : action.current_Care_Type } ;

        // # 設定 _ 一般安親費用
        case  "SET_CARE_ORDINARY_PRICE" :  return { ...state , Care_Ordinary_Price : action.Care_Ordinary_Price } ;

        // # 設定 _ 住宿 : 提早抵達
        case  "SET_CARE_AHEAD_PRICE" :  return { ...state , Care_Ahead_Price : action.Care_Ahead_Price } ;

        // # 設定 _ 住宿 : 延後帶走
        case  "SET_CARE_POSTPONE_PRICE" :  return { ...state , Care_Postpone_Price : action.Care_Postpone_Price } ;

        // # 設定 _ 預計 _ 安親結束時間 ( for 一般安親 )
        case  "SET_EXPECT_CARE_END_TIME" :  return { ...state , expect_Care_End_Time : action.expect_Care_End_Time } ;



        default : return state ;

    }




} ;

export default reducer_Care ;
