
import React from "react" ;

// @ 自訂 _ 表單驗證邏輯
interface IForm {

   // # 新增 _ 方案
   invalid_To_Plan     : boolean ;  //  因 : 方案 ( 包月洗澡、包月美容 )條件不符，導致表單無效

   // # 新增 _ 員工
   invalid_To_Employee : boolean ; 


}

const initState = {

    invalid_To_Plan     : false ,
    invalid_To_Employee : false ,

} ;


const reducer_Form_Validator = ( state : IForm = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _  因方案 ( Ex. 包月洗澡、包月美容 ) 條件不符，導致表單無效
        case  "SET_INVALID_TO_PLAN" : return {...state , invalid_To_Plan : action.invalid_To_Plan } ;
       
        // # 設定 _ 員工表單是否有效
        case  "SET_INVALID_TO_EMPLOYEE" : return {...state , invalid_To_Employee : action.invalid_To_Employee } ;

        // # 設定 _ 回復初始值 
        case  "SET_FORM_STATES_TO_DEFAULT" : return initState ;

        default : return state ;

    }

} ;

export default reducer_Form_Validator ;
