
import {FC} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import Employee_Form from "components/management/employee/edit/Employee_Form";



// @ 新增 _ 員工
const Create_Employee : FC<Edit_Form_Type>    = ({ register , control  , setValue , errors , isDirty, isValid , current } ) => {


    const props = {
                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current ,
                    control  : control
                  } ;


    return <>
                { /* 帳號資料 */ }
                <label className="label" style={{ fontSize : "1.3em" }}> <i className="fas fa-file-invoice"></i> &nbsp; 帳號資料 </label> <br/>

                <Employee_Form { ...props } />

           </>

} ;

export default Create_Employee
