

import Nav_Info from 'components/management/finance/components/Nav_Info'
import Unity_Table_Content from "./components/Unity_Table_Content"; 
import { useFinance_Get_Section_Data } from 'hooks/data/useFinance'
import { useFinance_Get_Section_Total } from 'hooks/data/useFinance'


// @ 綜合報表
const Unity_Report = () => {


    // 取得 _ 各區塊資料 ( 依查詢日期：付款日期 / 到店日期 )
    const data_Obj = useFinance_Get_Section_Data( '綜合' ) ;
  
    // 依各區塊資料，計算各區塊：小計金額              
    const total    = useFinance_Get_Section_Total( data_Obj ) ;

    // 總計金額
    const total_Amount   = total.Service_Receivable + total.Advance_Receipt + total.Lodge_Receivable + total.Cash_Income - total.Cash_Expenditure ;
  
    // 導覽區域，總計金額說明
    const nav_Total_Note = <> ( 洗澡美容 : 應收款 ) + ( 洗澡美容 : 預收款 ) + ( 住宿安親 : 應收款 ) + 其他收入 <b className="f_16 fDred"> - </b> 其他支出 </>
   

   return <div className = "m_Bottom_200" >

            { /* 導覽區域 ( 報表日期、總計金額 )  */ }
            <Nav_Info total_Amount = { total_Amount } total_Note = { nav_Total_Note } />

            { /* 各區塊表單內容 */ }
            <Unity_Table_Content { ...data_Obj } />

          </div> 

} ;

export default Unity_Report
       