
import { useEffect , useState } from "react" ; 
import moment from "moment" ;
import { get_Date_Cal } from "utils/time/date";



// @ 方案開始、結束日期
const Plan_Start_End = ( { data } : { data : any }  ) => {


    // 方案 : 開始、截止 使用日期
    const [ plan_Date , set_Plan_Date ] = useState({
                                                     start : '' , // 開始、第 1 次使用日期
                                                     end   : ''   // 方案截止日期
                                                    }) ;

    
    // 方案使用紀錄
    const plan_used_records = data['plan_used_records'] ;



    // 計算 _ 第 1 筆使用紀錄 、 方案使用 _ 開始 / 結束日期
    useEffect( () => {

        if( plan_used_records.length > 0 ){
  
            // 第 1 筆使用紀錄
            const first_Record = plan_used_records[ plan_used_records.length - 1 ] ;
  
            // 方案使用 _ 開始日期
            const start_Date   = first_Record[ 'created_at' ].slice( 0 , 10 ) ;
  
            // 方案使用 _ 結束日期
            const End_Date     = moment( get_Date_Cal( start_Date , 90 ) ).format( "YYYY-MM-DD" ) ;
  
            set_Plan_Date({ ...plan_Date , start: start_Date , end : End_Date  }) ;
  
        }
  
      } , [] ) ;
    



   return <>
   
             <td style={{ width:"120px" }}> { plan_Date['start'] } </td>
             <td style={{ width:"120px" }}> { plan_Date['end'] }   </td>
   
          </> 

} ;

export default Plan_Start_End
       