import React, {FC} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import Species_Form from "components/management/setting/species/edit/Species_Form";


/* @ 新增 _ 品種 */
const Create_Species : FC<Edit_Form_Type> = ( { register , setValue , errors , isDirty , isValid, current } ) => {

    const props = {
        register : register ,
        setValue : setValue ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

    return  <Species_Form {...props}  />



} ;

export default React.memo( Create_Species , () => true )