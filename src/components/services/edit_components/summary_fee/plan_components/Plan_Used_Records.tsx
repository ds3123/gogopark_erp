
import { usePlan_Used_Records_Data } from "hooks/data/usePlan_Used_Records_Data" ;
import { get_Date_Cal , get_Interval_Dates } from "utils/time/date" ;
import moment from  "moment";
import { useLogin_User_Info } from "hooks/data/useLogin_User_Info" ;
import { useSpecies_Id_Prices } from "hooks/data/useSpecies_Prices" ;
import Apply_Plan_Return from "./common/plan_return/Apply_Plan_Return";

import Plan_Used_Records_Title from "./common/plan_used/Plan_Used_Records_Title" ;
import Plan_Used_Records_Info from "./common/plan_used/Plan_Used_Records_Info";
import Plan_Used_Records_Table from "./common/plan_used/Plan_Used_Records_Table";


// 取得 _ 使用 開始、截止日期
const get_Date_Data = (  _plan_Used_Records : any[] ) => {

    const first_Record          = _plan_Used_Records[ _plan_Used_Records.length-1 ] ;                     // 第一筆紀錄
    const today                 = moment( new Date ).format( "YYYY-MM-DD" ) ;                             // 今日
    const plan_Start_Date       = first_Record ? first_Record['created_at'].slice(0,10) : today ;         // 方案使用 _ 開始日期
    const plan_End_Date         = moment( get_Date_Cal( plan_Start_Date ,90 ) ).format( "YYYY-MM-DD" ) ;  // 方案使用 _ 結束日期
    const rest_Num_Of_End_Dates = get_Interval_Dates( today , plan_End_Date ).length - 1 ;                // 距離使用截止日期，尚餘天數

    return { plan_Start_Date , plan_End_Date , rest_Num_Of_End_Dates }

} ;


// NOTE : 目前尚未考慮 "包月美容" ( 2021.09.28 )


// @ 個別方案 _ 使用情形 
const Plan_Used_Records = () => {


    // 取得 _ 使用紀錄資料物件 ( 方案資料、方案類型、套用品種名稱、方案使用紀錄  )
    const { data , plan_Type , applied_Species_Name , _plan_Used_Records } = usePlan_Used_Records_Data() ;

    // 使用次數
    let used_Records_Num      = _plan_Used_Records.length ;

    // 取得 _ 該品種各種服務價格 ( 初次洗澡優惠、單次洗澡、包月洗澡 .... )
    const species_Prices      = useSpecies_Id_Prices( data['pet_species_id'] ) ;

    // 單次價格
    const single_Bath_Price   = species_Prices['bath_Single'] ;   // 洗澡
    const single_Beauty_Price = species_Prices['beauty_Single'] ; // 美容

    // 取得 _ 使用開始日期、使用截止日期、距離使用截止日期的天數
    const { plan_Start_Date , plan_End_Date , rest_Num_Of_End_Dates } = get_Date_Data( _plan_Used_Records ) ;

    // 目前登入帳號的 _ 使用者姓名
    const current_User_Name   = useLogin_User_Info('姓名') ;

  

    return <div>

                 { /* 標題列 */ }   
                 <Plan_Used_Records_Title plan_Type = { plan_Type } applied_Species_Name = { applied_Species_Name }  data = { data } />
                 
                 <br/>

                 { /* 使用起始日期、使用截止日期、距離使用截止日期 .. */ }
                 {  _plan_Used_Records.length > 0 &&

                    <>

                        { /* 方案使用基本資訊 */ }
                        <Plan_Used_Records_Info plan_Start_Date = { plan_Start_Date } plan_End_Date = { plan_End_Date } rest_Num_Of_End_Dates = { rest_Num_Of_End_Dates }  />  

                    
                         { /* 申請退費 */ }
                         {/* <Apply_Plan_Return used_Records_Num={used_Records_Num} single_Bath_Price={single_Bath_Price} current_User_Name={current_User_Name}  /> */}
                         
                         <br/> <br/>
                    </>

                  }

                 <hr className="m_Top_30 m_Bottom_50" />

                 {  // 有 _ 使用紀錄

                     _plan_Used_Records.length > 0 && 
                          <Plan_Used_Records_Table _plan_Used_Records = { _plan_Used_Records } data = { data } />

                 }


                 {  // 沒有 _ 使用紀錄

                    _plan_Used_Records.length > 0 ||
                         <b className="tag is-large is-danger">
                             <i className="far fa-folder-open"></i> &nbsp; 無方案使用紀錄
                         </b>

                 }

           </div>

} ;

export default Plan_Used_Records

