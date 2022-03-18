
import { FC , useContext } from "react" ;
import { ReachHookFormContext } from "containers/Create_Data_Container"
import Pet_Form from "components/pets/edit/Pet_Form";


/* @ 新增 _ 寵物 */
const Create_Pet : FC = () => {

   const props_RHF = useContext( ReachHookFormContext ) ;  // 取得 context 值 : React Hook Form 屬性 


   return <Pet_Form { ...props_RHF }  />  /* 寵物表單欄位  */ 

} ;

export default Create_Pet ;