

import { useEffect  } from "react"
import { useSelector } from "react-redux"
import Date_Picker from "templates/form/Date_Picker"


type Payment = {

    editType    : undefined | string ;
    serviceData : any ;
    control     : any ;
    setValue    : any ;
    
}


// @ 付款日期
const Payment_Date = ( { editType , serviceData , control , setValue } : Payment ) => {


   // 服務( 到店 ) 日期 
   const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;



   // 設定 _ 預設 : 付款日期 ( # 使 "付款日期"，預設上與 "到店日期" 一致 )
   useEffect( () => {

     setValue( 'payment_Date' , new Date( service_Date ) ) ;

   } , [ service_Date ] ) ;


   return <div className="column is-6-desktop">

                <div className="tag is-large is-white">

                    <b> 收款日期 : </b> &nbsp;&nbsp; 

                    { /* for 新增  */ }
                    { !editType && <Date_Picker control      = { control } 
                                                name         = 'payment_Date' 
                                                default_Date = { new Date  } /> }

                    { /* for 編輯 */ }
                    { editType &&  <b className="fDblue"> { serviceData?.payment_date } </b> } 
                     
                </div>

           </div>

} ;


export default Payment_Date
       