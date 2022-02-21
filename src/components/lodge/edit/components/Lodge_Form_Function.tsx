
import { FC } from "react" ;
import Lodge_Query  from 'components/lodge/edit/Lodge_Query'
import Lodge_Calendar from "components/lodge/edit/Lodge_Calendar";
import Lodge_Price from "components/lodge/edit/Lodge_Price";


type lForm = {
   show_LodgePrice    : boolean ;
   show_LodgeQuery    : boolean ;
   show_LodgeCalendar : boolean ;
}

// @ 住宿表單功能 : 試算、查詢、檢視
const Lodge_Form_Function : FC< lForm > = ( { show_LodgePrice , show_LodgeQuery , show_LodgeCalendar } ) => {

   
   const lodgeInfo = {} as any ;
   
   return <>    
   
             { /* 住宿價格試算 */ }
             { show_LodgePrice &&
                  <div className="columns is-multiline is-mobile">
                     <div className="column is-offset-1-desktop is-10-desktop relative"> <Lodge_Price  /> </div>
                  </div>
             }

             { /* 住宿查詢 */ }
             { show_LodgeQuery &&  <Lodge_Query { ...lodgeInfo } />  }  <br/>

             { /* 住宿情形 */ }
             { show_LodgeCalendar &&
                  <div className="columns is-multiline is-mobile">
                     <div className="column is-12-desktop relative"> <Lodge_Calendar  /> </div>
                  </div>

              }
   
          </> 
    
} ;

export default Lodge_Form_Function
       