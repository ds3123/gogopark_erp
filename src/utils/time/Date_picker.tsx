
import React , { useState , useEffect , FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import moment  from "moment";
import {useDispatch} from "react-redux";
import { set_Info_Column } from "store/actions/action_Info"

/*
*
*  @ 利用 DatePicker，輸出成 日期元件
*
*   set_Service_Date ( Function ) --> 取得日期
*   no_Past ( Bool )              --> 決定是否能選取 '過去' 日期
*
*/

type Dprops = {

  no_Past           : boolean ;
  set_Service_Date? : any ;

}


// 此檔案後續刪除，已
// 使用 React-Hook-Form 製作 ( templates/form/ )  2021.06.13


const Date_picker : FC<Dprops> = ( {  no_Past = false  }  ) => {

    const dispatch = useDispatch() ;

    const today = moment( new Date ).format('YYYY-MM-DD' ) ;  // 今日

    let [ date , set_Date ] = useState<any>( new Date ) ;

    // 選擇日期處理
    const handleChange = ( s_Date : any ) => {

        // 是否選擇 : 過去日期
        const p_Date = moment( s_Date ).format('YYYY-MM-DD' ) ;  // 所選擇日期
        if( no_Past && today > p_Date  ){  alert('不能選擇 過去 日期') ;  return false ;   }

        set_Date( s_Date ) ;  // 設定日期

    } ;


    // 預設先取得 "初始" 服務日期，並監控服務日期 "後續變化"
    useEffect( () => {

        if( date ){

          const _date = moment( date ).format('YYYY-MM-DD' ) ;    // 所選擇日期
          dispatch( set_Info_Column( "service_Date" , _date ) ) ; // 設定 store

        }

    } ,[ date ] ) ;


    const _style =  { width  :"150px" , zIndex : "33" } as any ;

    return  <div className="control has-icons-left" style={ _style } >

                <span className="icon is-small is-left"> <i className="far fa-calendar-alt"></i> </span>

                <DatePicker className = "input"
                            selected  = { date }
                            onChange  = { ( s_Date ) => handleChange( s_Date) }  />

            </div>;

} ;


export default Date_picker ;