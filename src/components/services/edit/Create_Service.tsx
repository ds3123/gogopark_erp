import { FC } from "react" ;

// 各區塊表單元件
import Customer_Note from "components/services/edit_components/Customer_Note";
import Basic_Form from "components/services/edit_components/Basic_Form";
import Bath_Form from "components/services/edit_components/Bath_Form";
import Beauty_Form from "components/services/edit_components/Beauty_Form";
import Extra_Beauty from "components/services/edit_components/Extra_Beauty";
import Extra_Item from "components/services/edit_components/Extra_Item";
import Care_Form from "components/lodge/care/edit/Care_Form";
import Lodge_Form from "components/lodge/edit/Lodge_Form";
import Plan_Form from "components/plan/edit/Plan_Form";
import { Edit_Form_Type } from "utils/Interface_Type"
import Pickup_Fee from "components/services/edit_components/Pickup_Fee";
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import Self_Adjust_Amount from "components/services/edit_components/Self_Adjust_Amount";
import { useRating_Options } from "hooks/layout/useRating"

interface TS extends Edit_Form_Type {
   current : string ;
}


/* @ 新增 : 基礎單、洗澡單、美容單 */
const Create_Service : FC<TS> = ( { register , setValue , control , errors , isDirty , isValid , current } ) => {

    const props = {

        register : register ,
        setValue : setValue ,
        control  : control ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current

    } ;

    // 評分選項
    const rating_Options = useRating_Options('櫃台人員評分' , 'admin_Rating', register , setValue ) ;

    return <>

             { /* 自備物品、主人交代、櫃台備註  */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" || current === "安親" || current === "住宿"  ) && <Customer_Note { ...props } /> }

             { /* 基礎單項目 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" ) && <Basic_Form { ...props } /> }

             { /* 洗澡單項目 */ }
             { ( current === "洗澡" || current === "美容" ) && <Bath_Form { ...props } /> }

             { /* 美容單項目 */ }
             { current === "美容" && <Beauty_Form { ...props } /> }

             { /* 安親項目 */ }
             { current === "安親" && <Care_Form { ...props } /> }

             { /* 住宿項目 */ }
             { current === "住宿" && <Lodge_Form { ...props } /> }

             { /*  所有服務 : 自行調整費用金額  */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" || current === "安親" || current === "住宿" ) && <Self_Adjust_Amount { ...props } /> }

             { /* 加價項目 */ }
             { ( current === "洗澡" || current === "美容"  ) && <Extra_Item { ...props } /> }

             { /* 加價美容 */ }
             { current === "洗澡" && <Extra_Beauty { ...props } /> }

             { /* 方案項目 */ }
             { current === "方案" && <Plan_Form { ...props } /> }


             { /* 接送費 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容"  || current === "安親" || current === "住宿" ) && <Pickup_Fee { ...props } /> }

             { /* 評分選項 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容"  || current === "安親" || current === "住宿" ) && rating_Options } <hr/>


             { /* 費用結算 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" ||  current === "安親" || current === "住宿" || current === "方案" ) && <Summary_Fee { ...props } /> }

          </>

} ;


export default Create_Service