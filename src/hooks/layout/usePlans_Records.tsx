
import { useEffect , useState } from "react"
import Plan_Used_Tag from "components/services/edit_components/summary_fee/plan_components/common/Plan_Used_Tag";


/*  @ 方案 _ 使用紀錄 */
export const usePlan_Tag = ( current : string , pet_All_Plans : any[] ) => {

  
    // 方案使用紀錄標籤
    const [ plan_Tags , set_Plan_Tags ] = useState< any[] >( [] ) ;


    // 對寵物所有方案，進行分類處理  
    useEffect( () => { 
    
      if( pet_All_Plans.length > 0 ){
        
        const month_Bath   = pet_All_Plans.filter( ( x : any ) => x['plan_type'] === '包月洗澡' ) ;
        const month_Beauty = pet_All_Plans.filter( ( x : any ) => x['plan_type'] === '包月美容' ) ;
        const custom_Plans = pet_All_Plans.filter( ( x : any ) => x['plan_type'] !== '包月洗澡' && x['plan_type'] !== '包月美容' ) ;

        /*
               
            # 排序 : 依照 "建檔日期" ( 新 -> 舊 )
            # 合併陣列 :
              1. 在新增洗澡、美容中，皆合併 _ 自訂方案 ( custom_Plans )   
              2. 在新增洗澡中，也可使用方案 "包月美容" 下的洗澡 --> 亦合併 : month_Beauty
        
        */ 

        // for 新增 _ 洗澡
        const sort_Plan_Bath   = ( month_Bath.concat( month_Beauty , custom_Plans ) ).sort( ( a : any , b : any ) : any => {
                                    return a['created_at'] < b['created_at'] ? 1 : -1
                                 }) ;

        // for 新增 _ 美容                              
        const sort_Plan_Beauty = ( month_Beauty.concat( custom_Plans ) ).sort( ( a : any , b : any ) : any => {
                                    return a['created_at'] < b['created_at'] ? 1 : -1
                                 }) ;

        if( current === '洗澡' ) set_Plan_Tags( sort_Plan_Bath ) ;
        if( current === '美容' ) set_Plan_Tags( sort_Plan_Beauty ) ;

      }

    } , [ pet_All_Plans ] ) ;


    return plan_Tags.map( ( x : any , y : number ) => {

               if( !x ) return null ;  // 剔除 undefined

               return <Plan_Used_Tag key = { y } current={current}  plan = { x } index = { y } />

           })

} ;


