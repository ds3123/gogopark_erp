
import { FC , useEffect , useState } from "react"
import { Edit_Form_Type , ILodge_Data , room_Type } from "utils/Interface_Type";
import { lodge_Price , ILodge_Price , national_Holidays_Setting } from "components/lodge/edit/Lodge_Price";
import moment from "moment";
import { get_Date_Cal , get_Interval_Dates , get_InUse_Days , get_Today , get_Type_Dates } from "utils/time/date";
import { set_Current_Lodge_Price_Sum } from 'store/actions/action_Lodge'
import { useDispatch , useSelector } from "react-redux";
import { get_RandomInt } from "../../../utils/number/number";
import { set_Current_Lodge_Type , set_Current_Lodge_Number , set_Lodge_Reservation_Data } from "store/actions/action_Lodge"
import { set_Lodge_Check_In_Date , set_Lodge_Check_Out_Date } from "store/actions/action_Lodge"
import Lodge_Form_Title from "./components/Lodge_Form_Title";
import Lodge_Form_Info from "./components/Lodge_Form_Info";
import Lodge_Form_Period from "./components/Lodge_Form_Period";


// 類型 for
export type price_Sum_Params = {

    lodge_Price       : ILodge_Price[] ; // 各種房型，於不同時段( 平日、假日、國定假日 )的價格
    room_Type         : string ;         // 房型

    ordinary_Days     : [] ;             // 平日
    holidays          : [] ;             // 假日
    national_Holidays : [] ;             // 國定假日 / 熱門時段

}


// NOTE :
//    1. 月份需要加 1，才是目前月份
//    2. ' 顯示 ' 日期範圍 : 開始日期( startDate ) ~ 結束日期( endDate ) 前 1天
const appointments : ILodge_Data[] = [

    {
        title       : 'A01 ( 大房 ) - 招財 ( 秋田犬 )' ,
        startDate   : new Date(2022 ,1 , 1 ) ,
        endDate     : new Date(2022 ,1 , 3 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A01'
    } ,

    {
        title       : 'A02 ( 大房 ) - DDD ( 獒犬 )' ,
        startDate   : new Date(2022 ,1 , 5 ) ,
        endDate     : new Date(2022 ,1 , 6 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A02'
    } ,

] ;


interface ILodge extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}



{ /* @ 住宿表單欄位  */}
const Lodge_Form : FC< ILodge > = ( { register  , control , setValue , errors , current, editType, serviceData } ) => {


    const dispatch       = useDispatch() ;
    
    // # 目前欄位所選擇 :
    const lodgeType      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;   // 房型 ( 下拉 )
    const lodgeNumber    = useSelector( ( state : any ) => state.Lodge.current_Lodge_Number ) ; // 房號 ( 下拉 ) 
    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;  // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ; // 退房日期


    // 該房間，是否在選定的時間內，已被使用
    const [ is_Room_InUse , set_Is_Room_InUse ] = useState( false ) ;

    // 檢查 _ 該房間，是否在選定的時間內，已被使用
    const check_Is_Room_InUse = ( lodgeNumber : string , checkIn_Date : string , checkOut_Date : string  , lodgeData : ILodge_Data[] ) => {

        let bool = false ;

        // 所選擇時間區段，所包含日期
        // 須先減 1 天 ( 再檢查 get_Interval_Dates 2021.06.28 )
        const _lodgeCheckIn_Date  = moment( get_Date_Cal( checkIn_Date , -1 ) ).format('YYYY-MM-DD') ;
        const _lodgeCheckOut_Date = moment( get_Date_Cal( checkOut_Date , -1 ) ).format('YYYY-MM-DD') ;
        const selected_Days       = get_Interval_Dates( _lodgeCheckIn_Date , _lodgeCheckOut_Date ) ;

        // 所選擇房號，已有被使用紀錄
        lodgeData.forEach( x => {

            if( x['lodgeNumber'] === lodgeNumber ){

                // 該房號使用期間，所包含天數
                const days_InUse = get_InUse_Days( x['startDate'] , x['endDate'] ) ;

                // 篩選 : 已使用天數
                const days_Selected_InUse = selected_Days.filter(x => ( days_InUse.indexOf( x ) !== -1 ) ) ;

                // 所選擇時間區段內，有已使用過的紀錄
                if( days_Selected_InUse.length > 0 ) bool = true ;

            }

        });

        return bool ;

    } ;

    // 計算 _ 目前住宿 : 總計金額
    const cal_Lodge_Price_Sum = ( checkIn : string , checkOut : string , roomType : string ) => {

        let lodge_Price_Sum = 0 ;

        // 取得 _ 兩個日期之間，所包含的日期(陣列)  Ex. [ '2021-08-11','2021-08-12' , ...   ]
        const interval  = get_Interval_Dates( checkIn , checkOut ) ;

        // 取得 : 某日期，所屬型態( 平日、假日、國定假日 )
        const typeDates = get_Type_Dates( interval , national_Holidays_Setting ) as any;

        // 設定 : 平日、假日、國定假日
        const ordinary_Days     = typeDates['平日'] ;
        const holidays          = typeDates['假日'] ;
        const national_Holidays = typeDates['國定假日'] ;

        lodge_Price.forEach( x => {

            if( x['room_Type'] === roomType ){  // 房型符合

                // 加總房價
                lodge_Price_Sum = ( x['ordinary_Day']     * ( ordinary_Days.length ) ) +
                                    ( x['ordinary_Holiday'] * ( holidays.length ) ) +
                                    ( x['national_Holiday'] * ( national_Holidays.length ) ) ;

            }

        }) ;

        return lodge_Price_Sum

    } ;

    // 取得 : 目前住宿資料
    useEffect( () => {

       dispatch( set_Lodge_Reservation_Data( appointments ) ) ;

    } , [ appointments ] ) ;

    // 檢查 : 某房號，在某時間區段下，是否已被使用
    useEffect( () => {

        set_Is_Room_InUse( check_Is_Room_InUse( lodgeNumber , check_In_Date , check_Out_Date , appointments ) ) ;

    } , [ lodgeNumber , check_In_Date , check_Out_Date , appointments ] ) ;

    // 設定 _ 隨機住宿合約編號 ( '新增'時，才設定 )
    useEffect( () => {

        if( current ){
          const randomId = `L_${ get_Today() }_${ get_RandomInt(1000) }` ;
          setValue( "lodge_Serial" , randomId  ) ;            // 設定 input 欄位值
        }

    } , [] ) ;


    // 【 新增時 】 設定 _ 目前住宿 : 總計金額
    useEffect( () => {
      
        if( !editType ){
          const lodge_Price_Sum = cal_Lodge_Price_Sum( check_In_Date , check_Out_Date , lodgeType ) ; // 計算 _ 住宿總計金額
          dispatch( set_Current_Lodge_Price_Sum( lodge_Price_Sum ) ) ;                                // 設定 Redux
        } 

    } , [ editType , check_In_Date , check_Out_Date , lodgeType ] ) ;


    // 【 編輯時 】 設定 _ 住宿總計金額、房型、房號
    useEffect( () => {

        if( editType ){

            // 房型
            // handle_Lodge_Type( serviceData['room_type'] ) ;

            // 房號 ( 延後 300ms )
            setTimeout( () => {
                setValue( 'lodge_Room_Number' , serviceData['room_number']  ) ;
            } , 300 ) ;

            // 住宿總計金額
            const lodge_Price_Sum = cal_Lodge_Price_Sum( serviceData['start_date'] , serviceData['end_date'] , serviceData['room_type'] ) ;
            dispatch( set_Current_Lodge_Price_Sum( lodge_Price_Sum ) ) ;
        
        }

    } , [ editType ] ) ;


    // 設回 _ 預設值
    useEffect( () => { 
    
      const today = moment( new Date ).format( 'YYYY-MM-DD' ) ; // 今日      

      dispatch( set_Lodge_Reservation_Data( [] ) ) ;            // 已經住宿資料 ( 再確認 2022.01.04 )
      dispatch( set_Current_Lodge_Type( '' ) ) ;                // 房型
      dispatch( set_Current_Lodge_Number( '' ) ) ;              // 房號
      dispatch( set_Lodge_Check_In_Date( today ) ) ;            // 住房日期  
      dispatch( set_Lodge_Check_Out_Date( today ) ) ;           // 退房日期

    } , [] ) ;


    { /* 元件屬性 ( for <Lodge_Form_Info /> ) */ }
    const info_Props = {
        editType    : editType ,
        errors      : errors ,
        register    : register ,
        serviceData : serviceData ,
    }

    { /* 元件屬性 ( for <Lodge_Form_Period /> ) */ }
    const period_Props = {
        editType    : editType ,
        control     : control ,
        setValue    : setValue ,
        serviceData : serviceData ,
    }

   return <>

            {/* 住 ( R ) : { check_In_Date }  /  退( R) : { check_Out_Date } */}

            { /* 標題列  */ }
            <Lodge_Form_Title editType = { editType } /> <br/>

            { /* 合約編號、房 型、房 號  */ }
            <Lodge_Form_Info { ...info_Props } /> <br/>

            { /* 住房/退房 : 日期、時間  */ }
            <Lodge_Form_Period { ...period_Props } />

            { /* 已被使用提示 */ }
            { is_Room_InUse  &&

               <div className='has-text-centered' >
                 <br/> <b className="tag is-medium is-danger"> <i className="fas fa-exclamation"></i> &nbsp; 所選擇房間，在目前時段下，已被使用 ( 詳細資訊，請點選 : 查詢 ) </b> <br/>
               </div>

            }

            <hr/><br/>

          </>

} ;

export default Lodge_Form ;