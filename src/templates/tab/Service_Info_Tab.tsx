
import { FC } from "react" ;
import { Service_Type } from "utils/Interface_Type" ;
import useServiceType from "hooks/layout/useServiceType";


type service = { type : Service_Type | '包月洗澡' | '包月美容' | null , num : number }



// @ 服務類別標籤 ( 帶有相關資訊 Ex. 資料筆數 )
const Service_Info_Tab : FC< service > = ( { type , num } ) => {


  const { color , icon  } = useServiceType( type , false , 'large' ) ;

  return <div className="column is-2-desktop">
            <b className = { color } > <i className = { icon }></i> &nbsp; { type } &nbsp;
               <span className="tag is-white is-rounded f_12"> { num } </span>
            </b>
         </div>

} ;

export default Service_Info_Tab
       