

// useContext
import { useContext } from "react" ;
import { ModalContext } from "templates/panel/Modal" ;
import { SidePanelContext } from "templates/panel/Side_Panel" ;

import { sort_Data_By_CreatedDate } from 'utils/data/sort_data' ;


type useRecords = {

    data                 : any ;
    plan_Type            : string ;
    applied_Species_Name : string ;
    _plan_Used_Records   : any[] ;
  
}


// @ 取得 _ 方案 _ 使用情形 / 紀錄 所需資料
export const usePlan_Used_Records_Data = () : useRecords  => {

    const value                = useContext( ModalContext ) as any ;      // 由 Modal 取得 context 值
    const value_2              = useContext( SidePanelContext ) as any ;  // 由 Side_Panel 取得 context 值 ( for 新增服務時，點選 _ 方案清單 )
    const data                 = value.data ? value.data : value_2.data ;
   
    const plan_Type            = data ? data['plan_type'] : '' ;

    // 該方案 : 適用寵物品種
    const applied_Species_Name = data ? data.pet_species.name : '' ;

    // 該方案 : 使用紀錄
    const plan_Used_Records    = data ? data.plan_used_records : [] ;

    // # 排序( 降冪 ) _ 使用紀錄 ( 依建立時間 )
    const _plan_Used_Records   = sort_Data_By_CreatedDate( plan_Used_Records , 'desc'  ) ;
    
    // --------------------------------------------------------------------------

    return { data , plan_Type , applied_Species_Name , _plan_Used_Records }

} ;