import React from "react" ;
import moment from "moment";




// 取得 : 顯示目前時間 ( 格式 _ 時 : 分   Ex. 16 : 30 )
export const get_H_M = () => {

    const hours   = new Date().getHours();
    const minutes = new Date().getMinutes();

    let h = ( hours < 10 )   ? '0'+ hours.toString() : hours ;      // 時
    let m = ( minutes < 10 ) ? '0'+ minutes.toString() : minutes ;  // 分

    const time = h + ' : ' + m ;

    return time

};


/*
  # 取得 : 特定時間， 加 / 減 _ 小時 後的時間
     * 參數格式 : string  Ex. 2021.06.29
     * 回傳格式 : string  Ex. 18:33 )

*/
export const get_Cal_Hour_Time = ( date : string , hour : number )=>{

    let time = new Date( date ) ;
    time.setTime( time.setHours(time.getHours() + hour ));
    return moment( time ).format('HH:mm') ;

} ;


// 取得 : 兩個時間( Ex. 15 : 07 ~ 16 : 30  ) 共幾分鐘
export const time_Interval_Minutes = ( start : string , end : string )=>{

    let sum_Minutes : number | string = '' ;

    // 開始
    const s_Hour   = start.slice( 0 , 2 ) ;  // 時
    const s_Minute = start.slice( -2 ) ;     // 分

    // 結束
    const e_Hour   = end.slice( 0 , 2 ) ;
    const e_Minute = end.slice( -2 ) ;

    // 時 / 分 ，首個字元是否為 0
    let s_H : any = ( s_Hour.slice( 0 , 1 ) === '0' ) ? s_Hour.slice( 0 , -1 ) :  s_Hour ;
    let s_M : any = ( s_Minute.slice( 0 , 1 ) === '0' ) ? s_Minute.slice( 0 , -1 ) :  s_Minute ;

    let e_H : any = ( e_Hour.slice( 0 , 1 ) === '0' ) ? e_Hour.slice( 0 , -1 ) :  e_Hour ;
    let e_M : any = ( e_Minute.slice( 0 , 1 ) === '0' ) ? e_Minute.slice( 0 , -1 ) :  e_Minute ;

    sum_Minutes = ( e_H - s_H ) * 60 + ( e_M - s_M ) ;

    return sum_Minutes ;

};