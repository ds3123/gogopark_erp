import React, {FC} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import Other_Form from "components/other/Other_Form";




/* @ 新增 _ 其他 */
const Create_Other : FC<Edit_Form_Type> = ( { register , setValue , errors , isDirty , isValid, current } ) => {

    const props = {
        register : register ,
        setValue : setValue ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

    return  <Other_Form {...props}  />



} ;

export default Create_Other