

import { get_Today } from "utils/time/date"


type Create = {

    editType    : undefined |string ;
    serviceData : any ;  

}


// @ 服務：建檔日期
const Create_Date = ( { editType , serviceData } : Create ) => {


   return <div className="column is-4-desktop">

                <span className="tag is-large is-white">
                    <b> 建檔日期 :&nbsp; 
                        <span className="fDblue">
                        { /* for 新增  */ }
                        { !editType  && <>&nbsp;{ get_Today() } </> }  
                        { /* for 編輯 */ }
                        { editType  && serviceData?.created_at?.slice(0,10) }
                        </span> 
                    </b>
                </span>

          </div>

} ;

export default Create_Date
       