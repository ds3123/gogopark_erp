

import React from "react" ;
import { Dispatch } from "redux";

import { set_Plan_States_To_Default } from "store/actions/action_Plan"
import { set_Form_States_To_Default } from "store/actions/action_Form_Validator"

import { set_Pet_States_To_Default } from 'store/actions/action_Pet'

import { set_Service_States_To_Default } from "store/actions/action_Service"
import { set_Customer_Relatives } from "store/actions/action_Customer"

import { set_Current_Species_Select_Id , set_Current_Pet } from "store/actions/action_Pet"

import { set_Current_Payment_Method } from "store/actions/action_Service"




// # 設定 _ 所有 Store State 回復預設值
export const set_All_States_To_Default = (  ) => {

    return ( dispatch : any ) => {

              // NOTE : 寵物、服務先註解 ---> 觸發會造成相關表單資料被清除 ( 2021.11.04 ) 
              // dispatch( set_Pet_States_To_Default()) ;      // 寵物
              // dispatch( set_Service_States_To_Default()) ;  // 服務

              // 以下 2 個再確認 ( 2021.11.05 )
              dispatch( set_Current_Pet( null ) )                // 目前寵物 
              dispatch( set_Current_Species_Select_Id( null ) )  // 目前寵物 id
             
             
              dispatch( set_Customer_Relatives( [] ) )          // 目前客戶 : 關係人

              dispatch( set_Current_Payment_Method( '現金' ) ) ; // 設定 _ 付款方式 state　　　
             
              dispatch( set_Plan_States_To_Default()) ;          // 方案
              dispatch( set_Form_States_To_Default()) ;          // 員工

             
           } ;

} ;






