

import { FC } from "react" ;
import { useSelector } from 'react-redux' ;
import Apply_Plan_Title from './common/Apply_Plan_Title' ;
import { usePlan_Tag } from 'hooks/layout/usePlans_Records' ;


type aPlan = {
    register : any ;
    current  : string ;
    editType : string | undefined ;
}

// @  所有方案 :  預設方案 ( 包月洗澡、美容 ) + 自訂方案 
const All_Plans : FC< aPlan > = ( { register , current , editType } ) => {

    const paymentMethod = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;  // 付款方式
    const pet_All_Plans = useSelector( ( state : any ) => state.Plan.pet_All_Plans ) ;              // 特定寵物 _ 所有方案      

    const plan_Tags     = usePlan_Tag( current , pet_All_Plans ) ;                                  // 方案使用標籤 

    return <> 
            
                { /* @ 新增資料  */ }  
                { ( !editType && paymentMethod === '方案' ) &&

                    <>

                        { /* # 是否購買方案 :【 有 】 */ }
                        { ( ( current === '洗澡' || current === '美容' ) && pet_All_Plans.length > 0 ) &&

                            <>
                               <Apply_Plan_Title register={ register } /> { /* 標題 : 客戶、寵物、此次價格 */ }
                               { plan_Tags }                              { /* 方案 _ 點選使用 / 紀錄標籤  */ }
                            </>

                        }
                                 
                    </> 

                } 

           </>

} ;

export default All_Plans
       
