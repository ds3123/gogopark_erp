
import { useContext } from "react" ;

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form";

// 各表單驗證條件
import { schema_Customer } from "utils/validator/form_validator"
import { IService } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

import Plan_Form from "components/plan/edit/Plan_Form"
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import {SidePanelContext} from "templates/panel/Side_Panel";
import { useDispatch } from "react-redux";

import {set_Side_Panel} from "store/actions/action_Global_Layout";

import Customer_Consumption_Records from "components/customers/edit/info/Customer_Consumption_Records";
import To_Previous_Page from "templates/note/To_Previous_Page";
import Data_Table_Id from 'templates/note/Data_Table_Id'





/* @ 更新 : 方案 */
const Update_Plan = ( ) => {

    const value       = useContext( SidePanelContext ) ;  // 取得 context 值
    const data        = value.preLoadData ;               // 預先取得資料
    const dispatch    = useDispatch() ;
    const source_Page = value.source_Page as any ;        // 來源網頁 ( for 點選、回到上一個頁面 )


    // 點選、回到上一個頁面
    const back_To_Prev_Page = ( source : string , customer_Id? : string ) => {

      if( !source ) return false   
      if( source === 'Customer_Service_Records' ) dispatch( set_Side_Panel( true , <Customer_Consumption_Records customer_Id = { customer_Id } /> , {} ) ) ;
  
    } ;


   // React Hook Form
   const { register , setValue , control , handleSubmit , formState: { errors , isDirty , isValid } } =
             useForm<IService>({

                                     mode          : "all" ,
                                     resolver      : yupResolver( schema_Customer ) ,
                                     defaultValues : {

                                                     }
                               }) ;

   const props = {

                     register    : register ,
                     setValue    : setValue ,
                     control     : control ,
                     errors      : errors ,
                     isDirty     : isDirty ,
                     isValid     : isValid ,

                     current     : '方案' ,
                     editType    : '編輯' ,

                     serviceData : data        // 該筆方案資料

                  } ;


    // 提交表單
    const onSubmit : SubmitHandler<IService> = data => {

      console.log( data ) ;

    } ;



    console.log( 'nn' , data?.id )

   return <form onSubmit = { handleSubmit( onSubmit ) }>


            { /* 資料表 id */ }   
            { !source_Page && <Data_Table_Id id = { data?.id } /> }

            { /* 回上一頁 */ }    
            { source_Page && <To_Previous_Page action = { () => back_To_Prev_Page( source_Page , data?.customer.id ) } />  }

            { /* 方案欄位 */ }
            <Plan_Form { ...props } />

            <hr/>

            { /* 明細欄位 */ } 
            <Summary_Fee { ...props } />

          </form>

} ;

export default Update_Plan