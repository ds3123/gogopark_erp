
import React, {useEffect, useState} from "react" ;

interface ISecond_Nav {

    title     : string ;
    icon      : string ;
    third_nav : string[]

}

const Second_Nav : ISecond_Nav[] = [

    // { title : "財務管理" , icon : "fas fa-dollar-sign" , third_nav : ["日報表","現金帳","線上支付"] } , // 原始版本
    { title : "財務管理" , icon : "fas fa-dollar-sign" , third_nav : ["日報表"] } ,

    { title : "價格管理" , icon : "fas fa-ruble-sign" , third_nav : ["品種價格","基礎","洗澡","美容","安親","住宿","加價項目","加價美容"] } ,
    // { title : "退費管理" , icon : "fas fa-undo-alt" , third_nav : [] } ,

    { title : "員工管理" , icon : "fas fa-user" , third_nav : [] } ,
    //{ title : "資料管理" , icon : "fas fa-database" , third_nav : ["服務異常" , "銷單資料" ,"封存資料","方案資料" , "方案逾期" ,"方案退費"] } ,
    { title : "資料管理" , icon : "fas fa-database" , third_nav : [ "拒接客戶" , "拒接寵物" ,  "服務異常" , "銷單資料" ,"封存資料","方案資料" ] } , // 原始版本

    // { title : "系統設定" , icon : "fas fa-cog" , third_nav : ["寵物品種","權限管理","品牌分店"] } , // 原始版本
    { title : "系統設定" , icon : "fas fa-cog" , third_nav : ["寵物品種"] } ,


] ;

// @ 三層導覽結構
const useMulti_NavOptions = () => {

    const [ currentSecond , set_CurrentSecond ] = useState<string>( Second_Nav[0]['title'] ) ;        // 目前 _ 第 2 層選項
    const [ currentThird , set_CurrentThird ]   = useState<string>( Second_Nav[0]['third_nav'][0] ) ; // 目前 _ 第 3 層選項
    const [ Third_Nav , set_ThirdNav ]          = useState<string[]>( Second_Nav[0]['third_nav'] ) ;  // 設定 _ 第 3 層選項列

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => {

        // 設定 _ 所點選第 2　層選項
        set_CurrentSecond( title ) ;

        // 設定 _ 第 3 層選項
        Second_Nav.forEach( x => {
            if( x['title'] === title ){
                set_ThirdNav( x['third_nav']  ) ;
                set_CurrentThird( x['third_nav'][0] ) ;
            }
        }) ;

    } ;

    // 點選 _ 第 3 層選項
    const click_Third = ( title : string ) => {

        set_CurrentThird( title ) ;  // 設定 _ 所點選第 3層選項

    } ;



    return { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third }

} ;

export default useMulti_NavOptions ;
