
import { useEffect , useState } from "react" 
import moment from "moment" 
import { get_Date_Cal } from "utils/time/date"

import { usePlan_Custom_Info } from 'hooks/data/usePlan'







// @ 方案開始、結束日期
const Plan_Start_End = ( { data } : { data : any }  ) => {


    // 方案使用天數
    const [ plan_Period , set_Plan_Period ] = useState( 0 ) ;



    // 方案 : 開始、截止 使用日期
    const [ plan_Date , set_Plan_Date ] = useState({
                                                     start : '' , // 開始、第 1 次使用日期
                                                     end   : ''   // 方案截止日期
                                                    }) ;

    
    // 方案使用紀錄
    const plan_used_records = data['plan_used_records'] ;



    const custom_Plan = usePlan_Custom_Info( data?.plan_type ) as any ;



    // 設定 _ 方案使用天數
    useEffect( () => {
          
        /*
           
          預設方案( Ex. 包月洗澡 / 包月美容 ) ： 90 天
          自訂方案                         ： 依照所設定的天數
        
        */

        set_Plan_Period( custom_Plan?.plan_name ? custom_Plan?.plan_period : 90 ) ;
 
    } , [ custom_Plan ] ) ;


    


    // 計算 _ 第 1 筆使用紀錄 、 方案使用 _ 開始 / 結束日期
    useEffect( () => {

        if( plan_used_records.length > 0 ){
  
            // 第 1 筆使用紀錄
            const first_Record = plan_used_records[ plan_used_records.length - 1 ] ;
  
            // 方案使用 _ 開始日期
            const start_Date   = first_Record[ 'created_at' ].slice( 0 , 10 ) ;
  
            // 方案使用 _ 結束日期
            const End_Date     = moment( get_Date_Cal( start_Date , plan_Period ) ).format( "YYYY-MM-DD" ) ;
  
            set_Plan_Date({ ...plan_Date , start: start_Date , end : End_Date  }) ;
  
        }
  
      } , [ plan_Period ] ) ;
    

   return <>
   
             <td style={{ width:"120px" }}> { plan_Date['start'] } </td>
             <td style={{ width:"120px" }}> { plan_Date['end'] }   </td>
             <td> { plan_Period } </td>
   
          </> 

} ;

export default Plan_Start_End
       