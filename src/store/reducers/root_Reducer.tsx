
import React from "react";
import { combineReducers } from "redux" ;
import reducer_Global_Layout  from "store/reducers/reducer_Global_Layout"
import reducer_Global_Setting  from "store/reducers/reducer_Global_Setting"

import reducer_Basic from "store/reducers/reducer_Basic";
import reducer_Bath from "store/reducers/reducer_Bath";
import reducer_Beauty from "store/reducers/reducer_Beauty";

import reducer_Extra_Service_Fee from "store/reducers/reducer_Extra_Service_Fee";
import reducer_Error from "store/reducers/reducer_Error";
import reducer_Info from "store/reducers/reducer_Info"
import reducer_Customer from "store/reducers/reducer_Customer";
import reducer_Pet from "store/reducers/reducer_Pet";
import reducer_Beautician from "store/reducers/reducer_Beautician";
import reducer_Index from "store/reducers/reducer_Index";
import reducer_Service from "store/reducers/reducer_Service";
import reducer_Lodge from "store/reducers/reducer_Lodge";
import reducer_Other from "store/reducers/reducer_Other";

import reducer_Plan from "store/reducers/reducer_Plan";
import reducer_Care from "store/reducers/reducer_Care";
import reducer_Management from "store/reducers/reducer_Management";
import reducer_Form_Validator from "store/reducers/reducer_Form_Validator";





const root_Reducer = combineReducers({

                         // @ 整體、全局 _ 版面狀態
                         "Layout"     : reducer_Global_Layout ,

                         // @ 整體、全局 _ 設定
                         "Setting"     : reducer_Global_Setting ,

                         // @ 首頁
                         "Index"      : reducer_Index ,

                         // @ 服務單資料
                         "Basic"      : reducer_Basic ,            // 基礎單
                         "Bath"       : reducer_Bath ,             // 洗澡單
                         "Beauty"     : reducer_Beauty ,           // 美容單

                         "Service"    : reducer_Service ,           // 洗美頁資料

                         "Info"       : reducer_Info ,              // 基本資料 ( 服務性質、處理碼、到店日期 ... )

                         "Extra_Fee"  : reducer_Extra_Service_Fee , // 服務額外費用( Ex. 接送費 )
                  
                         // @ 服務異常
                         "Error"      : reducer_Error ,               



                         // @ 美容師專區
                         "Beautician" : reducer_Beautician ,

                         // @ 客戶
                         "Customer"   : reducer_Customer ,

                         // @ 寵物
                         "Pet"        : reducer_Pet ,

                         // @ 安親
                         "Care"       : reducer_Care ,

                         // @ 住宿
                         "Lodge"      : reducer_Lodge ,
                         
                         // @ 其他(收支)
                         "Other"      : reducer_Other ,

                         // @ 方案
                         "Plan"       : reducer_Plan ,

                         // @ 管理區
                         "Management" : reducer_Management ,


                         // @ 表單 ( 自訂驗證 )
                         "Form"       : reducer_Form_Validator ,


                     }) ;

export default root_Reducer ;
