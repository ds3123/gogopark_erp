
import React, {useContext} from "react"

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form";

// 各表單驗證條件
import { schema_Customer } from "utils/validator/form_validator"
import { IService } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

import Plan_Form from "components/plan/edit/Plan_Form"
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import {SidePanelContext} from "templates/panel/Side_Panel";


/* @ 更新 : 方案 */
const Update_Plan = ( ) => {

    const value = useContext( SidePanelContext ) ;  // 取得 context 值
    const data  = value.preLoadData ;               // 預先取得資料


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

   return <form onSubmit = { handleSubmit( onSubmit ) }>

              <Plan_Form { ...props } />

              <hr/>

              <Summary_Fee { ...props } />

          </form>

} ;

export default Update_Plan