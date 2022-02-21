

import React , {  useState , useEffect , FC } from "react";

import { DatePicker , TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";


/*
 *
 *  @ 利用 TimePicker，輸出成 時間元件
 *   time_Type : 類型   Ex.
 *
 */

type TTime = {

  time_Type    : string ;
  default_time : any ;

}


// 此檔案後續刪除，以使用 React-Hook-Form 製作 ( templates/form/ )  2021.06.13
const Time_picker : FC<TTime> = ( { time_Type , default_time } ) => {

    let [ time , setTime ] = useState( default_time ) ;

    // 調整時間
    const onChange = ( time : any , timeString : string ) => {

        const current_Time = moment( time['_d'] ).format( "HH:mm" ) ;
        setTime( current_Time ) ;

    } ;

    // 預設先取得 "初始" 時間型態、時間
    useEffect(() => {

        const current_Time = moment( time['_d'] ).format( "HH:mm" ) ;



    } ,[] ) ;


    return <TimePicker defaultValue = { moment( time , 'HH:mm') }
                       onChange     = { onChange }
                       format       = { 'HH:mm' }
                       size         = "large"  /> ;

} ;


export default Time_picker ;