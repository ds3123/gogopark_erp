import { FC , useContext } from "react" ;
import { ReachHookFormContext } from "containers/Create_Data_Container" ;
import Customer_Form from "components/customers/edit/Customer_Form";


/* @ 新增 _  客戶 */
const Create_Customer : FC = () => {

      const props_RHF = useContext( ReachHookFormContext ) ;  // 取得 context 值 : React Hook Form 屬性  

      return <>
               { /* 客戶表單欄位  */ }
               <Customer_Form  { ...props_RHF } />

               <br/>

             </>

} ;


export default Create_Customer