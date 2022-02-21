
import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import Pet_Form from "components/pets/edit/Pet_Form";



/* @ 新增 _ 寵物 */
const Create_Pet : FC<Edit_Form_Type> = ({ register , watch , setValue , errors , isDirty , isValid, current } ) => {

    const props = {
        register : register ,
        setValue : setValue ,
        watch    : watch ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

   return <>

             { /* 寵物表單欄位  */ }
             <Pet_Form {...props}  />

             <hr/>

          </>


} ;

export default Create_Pet ;