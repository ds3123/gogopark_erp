import React, {FC, useContext, useState} from "react" ;
import { Input } from "templates/form/Input"
import { Edit_Form_Type  } from "utils/Interface_Type"
import Customer_Form from "components/customers/edit/Customer_Form";




/* @ 新增 _  客戶 */
const Create_Customer : FC<Edit_Form_Type> = ({ register , watch , setValue , errors , isDirty , isValid, current } ) => {


      const props = {
         register : register ,
         watch    : watch ,
         setValue : setValue ,
         errors   : errors ,
         isDirty  : isDirty ,
         isValid  : isValid ,
         current  : current
      } ;

      return <>
               { /* 客戶表單欄位  */ }
               <Customer_Form  { ...props }  />

               <hr/><br/>

             </>

} ;


export default Create_Customer