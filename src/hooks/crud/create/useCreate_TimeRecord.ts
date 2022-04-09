

import { toast } from "react-toastify";
import axios from "utils/axios" ;



// 新增 _ 時間按鈕紀錄 ( 美容區中，美容師點選 _ 時間按鈕 )
export const useCreate_TimeRecord = () => {


    const create_TimeRecord = ( id  : string , type : string , button : string , time : string , beautician : string ) => {


        // 轉換資料表欄位
        const obj = {
                        service_table_id : id ,
                        service_type     : type ,
                        button_name      : button ,
                        button_time      : time ,
                        beautician       : beautician
                     } ;


        // 新增資料
        axios.post( "/time_records" , obj ).then(res => {

          // 新增成功通知
          toast(`🦄 已新增 : 時間紀錄` ,{ position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

        }) ;

    } ;

    return create_TimeRecord ;



} ;