
import { usePlan_Used_Records_Data } from "hooks/data/usePlan_Used_Records_Data" ;

import Plan_Used_Records_Title from "./common/plan_used/Plan_Used_Records_Title" ;
import Plan_Used_Records_Table from "./common/plan_used/Plan_Used_Records_Table";




// NOTE : 目前尚未考慮 "包月美容" ( 2021.09.28 )


// @ 個別方案 _ 使用情形 
const Plan_Used_Records = () => {


    // 取得 _ 使用紀錄資料物件 ( 方案資料、方案類型、套用品種名稱、方案使用紀錄  )
    const { data , plan_Type , applied_Species_Name , _plan_Used_Records } = usePlan_Used_Records_Data() ;
    

    
    // 有使用過方案
    const is_Plan_Used = _plan_Used_Records.length > 0 ;  

    return <div>

                 { /* 標題列 */ }   
                 <Plan_Used_Records_Title plan_Type = { plan_Type } applied_Species_Name = { applied_Species_Name }  data = { data } />
                 
               
                 <hr className="m_Top_70 m_Bottom_50" />

                 {  // 有 _ 使用紀錄
                     is_Plan_Used && 
                         <div className="relative">

                          <span className="absolute f_11" style={{ top:"-40px" , left:"0px" }}> * 服務說明中，若洗澡或美容次數( ...第x次 ) 重複，代表曾刪除使用紀錄，後續再新增使用紀錄． </span>  

                          <Plan_Used_Records_Table _plan_Used_Records = { _plan_Used_Records } data = { data } />
                         
                         </div> 
                 }

                 {  // 沒有 _ 使用紀錄
                      is_Plan_Used ||
                         <b className="tag is-large is-danger">
                             <i className="far fa-folder-open"></i> &nbsp; 無方案使用紀錄
                         </b>
                 }

           </div>

} ;

export default Plan_Used_Records

