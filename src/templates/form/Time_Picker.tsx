
import React, {FC, useEffect, useState} from "react"
import { useController } from "react-hook-form" ;
import { TimePicker } from 'antd' ;
import 'antd/dist/antd.css' ;
import moment from "moment" ;

import { get_H_M } from "utils/time/time"
import {useSelector} from "react-redux";



type DType = {

    control          : any ;
    name             : string ;
    default_Time?     : string ;
    handle_OnChange? : any ;    // 自訂 onChange 函式

}

// 配合 React-Hook-Form，製作可重複使用 _ 時間套件
const Time_Picker:FC<DType> = ( { control , name, default_Time , handle_OnChange } ) => {

    const { field : { onChange , value } } = useController({

        name ,
        control ,
        rules        : { required : true } ,
        defaultValue : default_Time ? default_Time : get_H_M() ,            // 目前時間 ( 格式 Ex. 14:40 )

    });


    // 自訂、由屬性注入的 onChange 函式
    const handle_External_OnChange = ( value : any ) => {

        if( handle_OnChange )  handle_OnChange( value ) ;  // 如果有定義 onChange 屬性

    } ;


    return <TimePicker defaultValue = { moment( value , 'HH:mm') }
                       onChange     = {
                                        ( e : any ) => {
                                                         onChange( moment( e['_d'] ).format('HH:mm') ) ;                  // useController 內建 _傳送所擷取到的值
                                                         handle_External_OnChange(  moment( e['_d'] ).format('HH:mm') ) ; // 自訂 onChange 處理
                                                       }
                                      }
                       format       = { 'HH:mm' }
                       size         = "large"  />

} ;

export default Time_Picker