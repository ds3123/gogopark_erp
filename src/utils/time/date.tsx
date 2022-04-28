
/*  @ 日期處理   */

import moment from  "moment" 
import { national_Holidays_Setting } from "components/lodge/edit/Lodge_Price" 


// 取得 : 昨天、今天、明天、後天 的西元日期 ( num 數字參數 -1、0、1、2 )
// Ex. 2020-08-06、2020-08-07、2020-08-08 ...
export const get_Date = ( num : number )  => {

    if( num == null ){ num = 0; }

    let dd = new Date();

    dd.setDate( dd.getDate()+num );             // 設置日期

    let year  = dd.getFullYear();
    let m     = ( dd.getMonth()+1 ) as number ; // 獲取當前月份的日期
    let month = ( m < 10 ) ?  0+String(m) : m ; // 月份若為個位數，加 0
    let d     = dd.getDate() as number ;
    let day   = ( d < 10 ) ?  0+String(d) : d ; // 日期若為個位數，加 0

    return year+"-"+month+"-"+day ;

};


// 取得 : 特定日期，" 加減 " 後的日期
export const get_Date_Cal = ( date : string , num : number )=>{

    let dat = new Date( date );
    dat.setDate(dat.getDate() + num );

    return dat

} ;

// 取得 : 距離特定日期，還有幾日
export const get_Rest_of_Date = ( date : string ) => {



} ;


// 取得今天西元完整日期( Ex. 2020514 )
export const get_Today = () =>{

    const year  = new Date().getFullYear().toString() ;        // 顯示 2019
    const month = (new Date().getMonth() + 1) as number ;      // 需要加 1 ( 顯示 : 1、2、3….  )
    let   m     = ( month < 10 ) ?  0+String( month ) : month; // 月份若為個位數，加 0
    const day   = new Date().getDate() as number ;             // 顯示 13 、14、15 ....
    const d     = ( day < 10 ) ?  0+String(day) : day ;        // 日期若為個位數，加 0

    return year+m+d;

};


// 西元日期 --> 星期( 一、日 )
export const get_Week_Day = ( date : string ) => {

    const no = new Date( date ).getDay() ;
    let  day = '' ;

    switch( no ){
        case 0 : day = '日' ; break;
        case 1 : day = '一' ; break;
        case 2 : day = '二' ; break;
        case 3 : day = '三' ; break;
        case 4 : day = '四' ; break;
        case 5 : day = '五' ; break;
        case 6 : day = '六' ; break;
    }

    return day ;

};


// 取得 : 兩個日期之間，所有的日期 (  再檢查 get_Interval_Dates ，須先減 1 天  2021.06.28  )
export const get_Interval_Dates = (  start : string , end : string ) =>{

    let arr = [];

    // 驗證
    if( !start ) return [] ;
    if( !end ) return [] ;


    // 設為 any[] --> 2021.05.27 再確認是否可確定型別
    let ab = start.split("-") as any[] ;
    let ae = end.split("-") as any[] ;

    let db = new Date();

    db.setUTCFullYear( ab[0] , ab[1] - 1, ab[2]);

    let de = new Date();
    de.setUTCFullYear( ae[0] , ae[1] - 1, ae[2]);

    let unixDb = db.getTime();
    let unixDe = de.getTime();

    for ( let k = unixDb ; k <= unixDe ; ) {

       // arr.push(  moment( new Date( parseInt( k ) ) ).format( "YYYY-MM-DD" ) ) ;
       arr.push( moment( new Date( k ) ).format( "YYYY-MM-DD" ) ) ;
        k = k + 24 * 60 * 60 * 1000;

    }

    return arr ;


};


// 取得日期區間內，國定假日、假日( 五 ~ 日 )、平日( 一 ~ 四 )，所包含日期
export const get_Type_Dates = (  interval : string[] , holiday : any[]  ) =>{

    let holiday_Arr = [] as string[] ;       // 國定假日
    let M_T_Arr     = [] as string[] ;       // 平日( 一 ~ 四 )
    let F_S_Arr     = [] as string[] ;       // 假日( 五 ~ 日 )



    // 先取得國定假日，並從 interval 中刪除
    interval.forEach(function(x){

        holiday.forEach(function (y:any) {

            if( y['date'] === x ){

                const n_H = interval.splice( interval.indexOf( y['date'] ) , 1 ) ;
                holiday_Arr.push( n_H[0] );

            }

        });

    });

    // 取得 : 一 ~ 四 & 五~六
    interval.forEach(function(x){

        var week = new Date(x).getDay();  // 日期 -> 星期

        if(  x && ( week === 1 || week === 2 || week === 3 || week === 4  ) )  M_T_Arr.push( x ) ;

        if( x && ( week === 5 || week === 6 || week === 0  ) ) F_S_Arr.push( x ) ;

    });

    return { "國定假日" : holiday_Arr , "假日" : F_S_Arr , "平日" : M_T_Arr } ;


};


// 取得 : 某日期，所屬型態( 平日、假日、國定假日 )
export const get_Date_Type = ( date : string , holiday : { title : string , date : string }[]  ) =>{

    // 國定假日
    let h_Days = holiday.map( ( x) => { return x['date'] ; });  // 國定假日所包含日期
    if( h_Days.indexOf( date ) !== -1 ){  return '國定假日' ;  }

    // 平日、假日
    var week = new Date( date ).getDay();  // 日期 -> 星期

    if(  week === 1 || week === 2 || week === 3 || week === 4  ){  return '平日' ; }
    if(  week === 5 || week === 6 || week === 0               ){  return '假日' ; }

};


// 針對 DatePicker 套件 : 取得 _ 某房號，使用期間，所包含天數 ( 轉換格式 )
export const get_InUse_Days = ( startDate : any , endDate : any ) : string [] => {

    const _endDate  = get_Date_Cal( moment( endDate ).format('YYYY-MM-DD')  , -2) ;  // 先減去 1 天
    const sDate     = moment( startDate ).format('YYYY-MM-DD') ;                           // 開始日期
    const eDate     = moment( _endDate ).format('YYYY-MM-DD')  ;                           // 結束日期

    return get_Interval_Dates( sDate , eDate ) ;

} ;


// 將 ( 國定假日、假日、平日 ) 日期，轉為字串
export const get_Dates_STR = ( holiday_Arr : string[] , F_S_Arr : string[] , M_T_Arr : string[] ) => {

    const h_Arr = [] as string[] ;
    const m_Arr = [] as string[] ;
    const f_Arr = [] as string[] ;

    holiday_Arr.forEach(function(x){
        const _x = x.substr( 5 , 10 ) ;
        h_Arr.push( _x )
    });

    M_T_Arr.forEach(function(x){
        const _x = x.substr( 5 , 10 ) ;
        m_Arr.push( _x )
    });

    F_S_Arr.forEach(function(x){
        const _x = x.substr( 5 , 10 ) ;
        f_Arr.push( _x )
    });

    const holiday_Dates = h_Arr.join(' , ');
    const M_T_Dates     = m_Arr.join(' , ');
    const F_S_Dates     = f_Arr.join(' , ');

    return { "國定假日" : holiday_Dates , "假日" : F_S_Dates , "平日" : M_T_Dates } ;

};



// 計算 _ 寵物歲數( 依照 : 出生日期 )
export const get_Pet_Age = ( birthday : string ) : string => {


     const now_Timestamp      = new Date().getTime();             // 現在
     const birthday_Timestamp = new Date( birthday ).getTime() ;  // 生日  
 

     // 年齡天數
     const age_Days           =  Math.round(  ( now_Timestamp - birthday_Timestamp ) / ( 60 * 60 * 24 * 1000 ) ) ;
 

     if( age_Days < 360 ) return '未滿週歲'


     return `${ Math.round( ( age_Days / 360 ) ) } 歲`
    

} ;


