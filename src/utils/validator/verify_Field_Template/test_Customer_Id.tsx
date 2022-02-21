
import React from "react"
import axios from "utils/axios";


{ /* 測試邏輯 : 客戶 _ 身分證字號 ~ 資料庫是否已有紀錄  */ }

export default ( value : any ) => {


     if( !value ) return false ;  // 沒有任何值

     return axios.get(`/customers/show_by_param/id/${ value }`).then( res => {

                if( res.data.length > 0 ){



                    return true ;

                }

                return true ;

            }) ;

   } ;
