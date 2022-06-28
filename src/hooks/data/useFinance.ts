
import { useState , useEffect } from 'react'
import { cal_Paid_Amount_Total , cal_Use_Plan_Amount_Total , cal_Cash_Total } from 'utils/data/calculate_data'
import { useService_Get_By_Date , useService_Get_By_Payment_Date } from 'hooks/data/useService'
import { usePlan_Get_By_Date , usePlan_Get_By_Payment_Date } from 'hooks/data/usePlan'
import { useOther_Get_By_Date } from 'hooks/data/useOther'
import { useSelector } from "react-redux"
import { filter_Finance_Basic_Bath_Beauty , filter_Finance_Care_Lodge , filter_Finance_Plan } from 'utils/data/filter_data'
import { I_Finance_Section } from 'utils/Interface_Type'


// @ 處理 管理區 > 財務管理



type Payment_Method = '綜合' | '現金' | '信用卡' | '第三方支付' ;


// 取得 _ 各區塊資料
export const useFinance_Get_Section_Data = ( payment_Method : Payment_Method ) => {


     // 所點選 _ 日期類型 ( 付款日期 / 到店日期 )
     const date_Type : '付款日期' | '到店日期' =  useSelector( ( state : any ) => state.Finance.finance_Query_Date_Type ) ; 

     // 所查詢 _ 報表日期
     const query_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 

     // -------------------------------------

     // # 取得 _ 特定報表日期．對應所有購買資料

        // * 依：付款日期
        const services_By_PaymentDate = useService_Get_By_Payment_Date( query_Date ) ; // 服務 ( 基礎、洗澡、美容、安親、住宿 )
        const plans_BY_PaymentDate    = usePlan_Get_By_Payment_Date( query_Date ) ;    // 方案
    
        // * 依：到店日期
        const services_By_Date        = useService_Get_By_Date( query_Date ) ;         // 服務 ( 基礎、洗澡、美容、安親、住宿 )
        const plans_By_Date           = usePlan_Get_By_Date( query_Date ) ;            // 方案  
        const others_By_Date          = useOther_Get_By_Date( query_Date ) ;           // 其他( 收入 / 支出 )


     // 各區塊報表資料
     const [ data_Obj , set_Data_Obj ] = useState< I_Finance_Section >({

                                                                         service_Data    : [] ,  // 洗澡美容 : 應收款
                                                                         use_Plan_Data   : [] ,  // 洗澡美容 : 扣 _ 預收款
                                                                         plan_Data       : [] ,  // 洗澡美容 : 預收款      
                                                                         care_Lodge_Data : [] ,  // 住宿安親 : 應收款
                                                                         others_By_Date  : [] ,  // 其他    : 收入、支出

                                                                       }) ;


     // 依照查詢日期類型( 付款日期 / 到店日期 )，切換資料查詢欄位、篩選 _ 服務資料                                    
     useEffect( () => {

        let date_Services = [] ;
        let date_Plans    = [] ;
        
        if( date_Type === '付款日期' ){
           date_Services = services_By_PaymentDate ;
           date_Plans    = plans_BY_PaymentDate ;
        }
  
        if( date_Type === '到店日期' ){
           date_Services = services_By_Date ;
           date_Plans    = plans_By_Date ;
        }


        // 篩選各區塊資料
        const s_Data = filter_Finance_Basic_Bath_Beauty( date_Services , payment_Method , date_Type ) ;  // 基礎、洗澡、美容 ( 現金支付 )
        const c_Data = filter_Finance_Care_Lodge( date_Services , payment_Method , date_Type ) ;         // 安親、住宿 
        const p_Data = filter_Finance_Plan( date_Plans , date_Services , payment_Method , date_Type  ) ; // 方案、服務( 預收 )
        const u_Data = filter_Finance_Basic_Bath_Beauty( date_Services , '方案' , date_Type ) ;           // 基礎、洗澡、美容 ( 使用方案 )
  
        set_Data_Obj({ ...data_Obj , service_Data    : s_Data ,  
                                     use_Plan_Data   : u_Data ,  
                                     plan_Data       : p_Data ,      
                                     care_Lodge_Data : c_Data ,  
                                     others_By_Date  : others_By_Date ,  
                     })
  
  
        // 回復預設值
        return () => set_Data_Obj({ ...data_Obj , service_Data    : [] ,  
                                                  use_Plan_Data   : [] ,  
                                                  plan_Data       : [] ,      
                                                  care_Lodge_Data : [] ,  
                                                  others_By_Date  : [] ,  
                                  })

    
     } , [ date_Type , query_Date , services_By_Date , plans_By_Date , others_By_Date , services_By_PaymentDate , plans_BY_PaymentDate ] ) ;


     return data_Obj

    
}



type Section_Total = {

    service_Data    : any[] ; // 洗澡美容：應收款
    use_Plan_Data?  : any[] ; // 洗澡美容：扣 _ 預收款 ( 使用方案 )
    plan_Data       : any[] ; // 洗澡美容：預收款 ( 購買方案 )   
    care_Lodge_Data : any[] ; // 住宿安親：應收款  
    others_By_Date? : any[] ; // 其他 : 收入、支出

}

// 取得 _ 各區塊小計金額
export const useFinance_Get_Section_Total = ( { service_Data , use_Plan_Data , plan_Data , care_Lodge_Data , others_By_Date } : Section_Total ) => {


    // 小計金額
    const [ total , set_Total ] = useState({
                                             Service_Receivable : 0 ,    // 洗澡美容：應收款
                                             Deduct_Advance     : 0 ,    // 洗澡美容：扣 _ 預收款 ( 使用方案 )
                                             Advance_Receipt    : 0 ,    // 洗澡美容：預收款 ( 購買方案 )  
                                             Lodge_Receivable   : 0 ,    // 住宿安親：應收款 
                                             Cash_Income        : 0 ,    // 現金收入
                                             Cash_Expenditure   : 0 ,    // 現金支出
                                           }) ;


    useEffect( () => {
      
         const s_Total  = cal_Paid_Amount_Total( service_Data ) ;        // 洗澡美容：應收款  
         const u_Total  = cal_Use_Plan_Amount_Total( use_Plan_Data ) ;   // 洗澡美容：扣 _ 預收款
         const p_Total  = cal_Paid_Amount_Total( plan_Data ) ;           // 洗澡美容：預收款 ( 購買方案 ) 
         const l_Total  = cal_Paid_Amount_Total( care_Lodge_Data ) ;     // 住宿安親：應收款 
         const cI_Total = cal_Cash_Total( others_By_Date , '收入'  ) ;    // 其他   ：收入
         const cE_Total = cal_Cash_Total( others_By_Date , '支出'  ) ;    // 其他   ：支出

         set_Total({ ...total , Service_Receivable : s_Total ,
                                Deduct_Advance     : u_Total ,
                                Advance_Receipt    : p_Total ,    
                                Lodge_Receivable   : l_Total ,
                                Cash_Income        : cI_Total , 
                                Cash_Expenditure   : cE_Total
                    }) ;

       
   } , [ service_Data , use_Plan_Data , plan_Data , care_Lodge_Data , others_By_Date  ] ) ;   
   // } , [ service_Data  , plan_Data , care_Lodge_Data   ] ) ;   //  依賴不能加：use_Plan_Data、others_By_Date --> 否則會無限循環
  
    
    
    return total 
 

} ;