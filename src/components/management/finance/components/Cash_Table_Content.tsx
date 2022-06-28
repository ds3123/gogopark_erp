

import useSection_Folding from 'hooks/layout/useSection_Folding'
import Service_Receivable_Table from "components/management/finance/components/Service_Receivable_Table"
import Deduct_Advance_Receipt_Table from "components/management/finance/components/Deduct_Advance_Receipt_Table"
import Advance_Receipt_Table from "components/management/finance/components/Advance_Receipt_Table"
import Lodge_Receivable_Table from "components/management/finance/components/Lodge_Receivable_Table"
import Other_Cash_Income_Table from "components/management/finance/components/Other_Cash_Income_Table"
import Other_Cash_Expenditure_Table from "components/management/finance/components/Other_Cash_Expenditure_Table"
import Section_Title_Bar from 'components/management/finance/components/Section_Title_Bar'
import { useFinance_Get_Section_Total } from 'hooks/data/useFinance'



type Cash = {

    service_Data    : any[] ;  // 基礎、洗澡、美容... 等基本服務
    use_Plan_Data   : any[] ;  // 洗澡、美容 ( 使用方案 )  
    plan_Data       : any[] ;  // 方案 ( 購買 ) 
    care_Lodge_Data : any[] ;  // 安親、住宿
    others_By_Date  : any[] ;  // 其他收入、支出

} 



// @表單內容 : 現金支付
const Cash_Table_Content = ( { service_Data , use_Plan_Data , plan_Data , care_Lodge_Data , others_By_Date } : Cash ) => {


     // 表單資料物件
     let data_Obj = {
                      service_Data    : service_Data , 
                      use_Plan_Data   : use_Plan_Data , 
                      plan_Data       : plan_Data ,  
                      care_Lodge_Data : care_Lodge_Data ,
                      others_By_Date  : others_By_Date , 
                     }

     const amount_Total = useFinance_Get_Section_Total( data_Obj ) ;   


    // # 收折區塊
    const { is_folding : is_folding_Receivable ,        Folding_Bt : Folding_Bt_Receivable }        = useSection_Folding( false ) ;  // 應收款
    const { is_folding : is_folding_MinusPrepayment ,   Folding_Bt : Folding_Bt_MinusPrepayment }   = useSection_Folding( false ) ;  // 扣_預收款
    const { is_folding : is_folding_Prepayment ,        Folding_Bt : Folding_Bt_Prepayment }        = useSection_Folding( false ) ;  // 預收款
    const { is_folding : is_folding_LodgeCare ,         Folding_Bt : Folding_Bt_LodgeCare }         = useSection_Folding( false ) ;  // 住宿款 + 安親款
    const { is_folding : is_folding_Other_Income ,      Folding_Bt : Folding_Bt_Other_Income }      = useSection_Folding( false ) ;  // 其他收支 : 收入
    const { is_folding : is_folding_Other_Expenditure , Folding_Bt : Folding_Bt_Other_expenditure } = useSection_Folding( false ) ;  // 其他收支 : 收入


    return <>   

                { /* 洗澡美容 : 應收款 */ }
                <Section_Title_Bar tag_Color='is-success' service_Type='洗澡美容' amount_Type='應收款' amount_Total={ amount_Total.Service_Receivable } Folding_Bt_Type={ Folding_Bt_Receivable } />
                { is_folding_Receivable && <div className="m_Bottom_100"> <Service_Receivable_Table data={ service_Data } /> </div>  }


                { /* 洗澡美容 : 扣 _ 預收款 */ }
                <Section_Title_Bar tag_Color='is-warning' service_Type='洗澡美容' amount_Type='扣 _ 預收款' amount_Total={ amount_Total.Deduct_Advance } Folding_Bt_Type={ Folding_Bt_MinusPrepayment } />
                { is_folding_MinusPrepayment && <div className="m_Bottom_100"> <Deduct_Advance_Receipt_Table  data={ use_Plan_Data } /> </div> }


                { /* 洗澡美容 ( 方案 ) : 預收款 */ }
                <Section_Title_Bar tag_Color='is-warning' service_Type='洗澡美容' amount_Type='預收款' amount_Total={ amount_Total.Advance_Receipt } Folding_Bt_Type={ Folding_Bt_Prepayment } />
                { is_folding_Prepayment && <div className="m_Bottom_100"> <Advance_Receipt_Table data={ plan_Data } /> </div> }


                { /* 住宿 + 安親 */ }
                <Section_Title_Bar tag_Color='is-success' service_Type='住宿安親' amount_Type='應收款' amount_Total={ amount_Total.Lodge_Receivable } Folding_Bt_Type={ Folding_Bt_LodgeCare } />
                { is_folding_LodgeCare && <div className="m_Bottom_100"> <Lodge_Receivable_Table data={ care_Lodge_Data } /> </div> }


                { /* 其他收支 : 收入 */ }
                <Section_Title_Bar tag_Color='is-link' service_Type='其 他' amount_Type='收 入' amount_Total={ amount_Total.Cash_Income } Folding_Bt_Type={ Folding_Bt_Other_Income } />
                { is_folding_Other_Income && <div className="m_Bottom_100"> <Other_Cash_Income_Table data={ others_By_Date } /> </div> }


                { /* 其他收支 : 支出 */ }
                <Section_Title_Bar tag_Color='is-link' service_Type='其 他' amount_Type='支 出' amount_Total={ amount_Total.Cash_Expenditure } Folding_Bt_Type={ Folding_Bt_Other_expenditure } />
                { is_folding_Other_Expenditure && <div className="m_Bottom_100"> <Other_Cash_Expenditure_Table data={ others_By_Date } /> </div> }

           </>

} ;

export default Cash_Table_Content
       