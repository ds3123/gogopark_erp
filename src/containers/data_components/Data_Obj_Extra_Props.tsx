
import React from "react"
import { useDispatch , useSelector } from "react-redux" ;
import { useHelper_Prices } from "hooks/data/usePrice";


// 取的 _ "基本資訊" 相關資料
const useInfo_Data = () => {

    // 服務性質 : 已到店、預約_今天、預約_未來
    const service_Status = useSelector(( state : any ) => state.Info.service_Status ) ;

    // 目前所選擇 Q 碼
    const current_Q_Code = useSelector(( state : any ) => state.Info.current_Q_Code ) ;

    return { service_Status , current_Q_Code }

} ;

// 取得 _ 服務 ( 基礎、洗澡、美容 ) 相關資料 : 價錢、服務付費類別
const useService_Prices = () => {

    // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    const current_Create_Service_Type = useSelector(( state : any ) => state.Service.current_Create_Service_Type ) ;

    const { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee } = useHelper_Prices();

    return { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee , current_Create_Service_Type  }

} ;

// 取得 _ "方案" 相關資料
const usePlan_Data = () => {

    // # 預設方案
    const month_Bath_Price        = parseInt( useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ) ;   // 包月洗澡金額
    const month_Beauty_Price      = parseInt( useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ) ; // 包月美容金額

    // # 自訂方案
    const custom_Plan_Basic_Price = useSelector( ( state : any ) => state.Plan.custom_Plan_Basic_Price ) ; 

    // 目前選擇 _ 方案資料表 ( plans ) id
    const current_Plan_Id         = useSelector(( state : any ) => state.Plan.current_Plan_Id ) ;

    // 目前所點選方案 : 類型 / 名稱
    const current_Plan_Type       = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ; 
       

    // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次
    const current_Plan_Note       = useSelector(( state : any ) => state.Plan.current_Plan_Note ) ;

    return { month_Bath_Price , month_Beauty_Price , current_Plan_Id , current_Plan_Type  , current_Plan_Note , custom_Plan_Basic_Price }

} ;

// 取得 _ "住宿"、"安親" 相關資料
const useLodge_Care_Data = () => {

    // 安親 : 預計結束時間 ( for 一般安親 )
    const expect_Care_End_Time    = useSelector( ( state : any )=> state.Care.expect_Care_End_Time ) ;

    // 住宿價格
    const current_Lodge_Price_Sum = useSelector(( state : any ) => state.Lodge.current_Lodge_Price_Sum )  ;

    return { expect_Care_End_Time , current_Lodge_Price_Sum }

} ;


// @ 根據目前位置 ( current )，根據新增個別需要，為提交的資料物件( data )，再附加 _ 屬性、屬性值
export const useAdd_Data_Obj_Extra_Props = ( ) => {

    // # 取得 _ 欲附加屬性的值
    const { month_Bath_Price , month_Beauty_Price , current_Plan_Id , current_Plan_Type , current_Plan_Note , custom_Plan_Basic_Price } = usePlan_Data();

    const { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee , current_Create_Service_Type  } = useService_Prices()

    const { expect_Care_End_Time , current_Lodge_Price_Sum } = useLodge_Care_Data() ;

    const { service_Status , current_Q_Code } = useInfo_Data() ;


    const add_Data_Obj_Extra_Props = ( current : string , data : any  ) => {

        if( current === "基礎" || current === "洗澡" || current === "美容" ){
            data.shop_Q_Code                 = current_Q_Code ;              // 目前所選擇 _ 到店處理碼 Q
            data.service_Status              = service_Status ;              // 服務性質 : 已到店、預約_今天、預約_未來
            data.current_Create_Service_Type = current_Create_Service_Type ; // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
        }

        if( current === "洗澡" || current === "美容" ){
            data.current_Plan_Id             = current_Plan_Id ;             // 目前選擇 _ 方案資料表 ( plans ) id
            data.current_Plan_Type           = current_Plan_Type ;           // 目前所點選方案 : 類型 / 名稱 
            data.current_Plan_Note           = current_Plan_Note ;           // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次
        }

        // ------------------------------

        if( current === "基礎" )  data.basic_Fee = basicSumPrice ; // 基礎費

        if( current === "洗澡" ){
            data.current_Tab          = current ;              // 目前所處 _ 新增標籤
            data.bath_Fee             = bathSumPrice ;         // 洗澡費
            data.extra_Service_Fee    = extraItemFee ;         // 加價項目 _ 費用
            data.extra_Beauty_Fee     = extraBeautyFee ;       // 加價美容 _ 費用
        }

        if( current === "美容" ){
            data.current_Tab          = current ;              // 目前所處 _ 新增標籤 
            data.beauty_Fee           = beautySumPrice ;       // 美容費
            data.extra_Service_Fee    = extraItemFee ;         // 加價項目 _ 費用
        }

        if( current === "安親" ){
            data.shop_Q_Code          = current_Q_Code ;       // 目前所選擇 _ 到店處理碼 Q
            data.expect_Care_End_Time = expect_Care_End_Time ; // 預計結束時間 ( for 一般安親 )
        }

        if( current === "住宿" ) data.lodge_Price = current_Lodge_Price_Sum ; // 住宿費用

        if( current === "方案" ){
            data.month_Bath_Price   = month_Bath_Price ;        // 包月洗澡 費用
            data.month_Beauty_Price = month_Beauty_Price ;      // 包月美容 費用
            data.custom_Plan_Price  = custom_Plan_Basic_Price ; // 自訂方案 費用
        }

        return data


    } ;



    return add_Data_Obj_Extra_Props ;

} ;
