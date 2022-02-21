
import { useEffect, useState } from "react" ;
import { useDispatch , useSelector } from "react-redux";

import axios from "utils/axios" ;

import { set_Modal } from "store/actions/action_Global_Layout" ;



// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form" ;
import { ICustom_Plan } from "utils/Interface_Type" ;
import Custom_Plan_Form from "components/plan/custom_plan/Custom_Plan_Form" ;

// 表單驗證
import { yupResolver } from "@hookform/resolvers/yup" ;
import { schema_Plan_Type } from "utils/validator/form_validator" ;
import { useHistory } from "react-router-dom" ;

import { set_Current_Custom_Bath_Num , set_Current_Custom_Beauty_Num , set_Current_Custom_DefaultPrice , 
         set_Current_Custom_SpeciesPrice , set_Show_Applied_Species , set_Plan_Applied_Species } from "store/actions/action_Plan"

import { useContext } from "react"
import { ModalContext } from "templates/panel/Modal" ;

import { toast } from "react-toastify" ;


import cookie from "react-cookies";



// @ 更新 _ 自訂方案
const Update_Custom_Plan = () => {

    const history   = useHistory() ;
    const dispatch  = useDispatch() ;
 		
    // 取得 Moal 傳遞過來的資料 ( for 【 編輯 】 )
    const value     = useContext( ModalContext ) as any ; // 取得 context 值
    const plan_Data = value.data ;                        // 寵物資料 


    // 方案資料表 ( custom_plans ) id
    const [ plan_Id , set_Plan_Id ] = useState( '' ) ;

    // React Hook Form
    const { register , setValue , handleSubmit , formState : { errors , isValid } } =
                    useForm< ICustom_Plan >({
                                              mode     : "all" ,
                                              resolver : yupResolver( schema_Plan_Type ) ,
                                            }) ;       


    // 提交更新資料                                 
    const onSubmit : SubmitHandler< ICustom_Plan > = ( data : any ) => { 
    
        const submitData = {
                              plan_name     : data['plan_Type_Name'] ,
                              plan_period   : data['plan_Type_Period'] ,
                              default_price : data['plan_Type_Price'] ,
                              plan_note     : data['plan_Type_Note']
                            }

        if( plan_Id ){

            axios.put( `custom_plans/${ plan_Id }` , submitData ).then( res => {

                // 更新成功通知
                toast( `🦄 已更新 : 方案`, { position : "top-left" , autoClose : 1500 , hideProgressBar : false , closeOnClick : true });
          
                dispatch( set_Modal( false , null , { modal_Style : { width : "50%"  , left : "25%" } } ) ) ;

                // * 設定 cookie ( 5 秒後銷毀 )
                cookie.save( 'after_Updated_Data' , '資料管理_方案資料' , { path : '/' , maxAge : 5 } ) ; // for # 前往 : 資料管理 > 方案資料
          
                // 前往相對應頁面
                history.push( "/wrongpath" );  // 錯誤路徑
                history.push( "/management" ); // 正確路徑

            }) ;

        }

    }

    { /* 屬性 for 元件 : <Plan_Price_Method /> */ }
    const form_Props = {
      setValue  : setValue ,
      register  : register ,
      errors    : errors  , 
      isValid   : isValid , 
      edit_Type : "編輯"
    }


    // 設定 _ 欄位預設值
    useEffect( () => { 
        
      if( plan_Data ){

        // 方案資料表 ( custom_plans ) id
        set_Plan_Id( plan_Data['id'] ) ;
       
        // 欄位 : 方案名稱、使用期限、預設價格 
        setValue( 'plan_Type_Name'   , plan_Data['plan_name'] , { shouldValidate : true }  ) ;
        setValue( 'plan_Type_Period' , plan_Data['plan_period'] , { shouldValidate : true }  ) ;
        setValue( 'plan_Type_Price'  , plan_Data['default_price'] , { shouldValidate : true }  ) ;
        setValue( 'plan_Type_Note'   , plan_Data['plan_note'] , { shouldValidate : true }  ) ;

        // 欄位: 洗澡次數、美容次數、預設價格
        dispatch( set_Current_Custom_Bath_Num( plan_Data['bath_num'] ? plan_Data['bath_num'] : 0 ) ) ;
        dispatch( set_Current_Custom_Beauty_Num( plan_Data['beauty_num'] ? plan_Data['beauty_num'] : 0 ) ) ;
        dispatch( set_Current_Custom_DefaultPrice( plan_Data['default_price'] ? plan_Data['default_price'] : 0 ) ) ;

      }

    } , [ plan_Data ] ) ;


    return  <form onSubmit = { handleSubmit( onSubmit ) } >

               <Custom_Plan_Form { ...form_Props } />  <br/>

            </form>
    
} ;

export default Update_Custom_Plan
       