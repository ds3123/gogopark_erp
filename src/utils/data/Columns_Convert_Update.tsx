import { IInfo , ICustomer , ICustomer_Individual , ICustomer_Relative , IPet } from "utils/Interface_Type" ;
import moment from "moment" ;


/*
 
   @ 欄位轉換 ( for 【 修改 ( UPDATE ) 】 資料 )
     表單欄位 ---> 資料庫資料表欄位

*/


// 取得 _ 所有服務，皆有的欄位
const get_Common_Obj = ( data : any ) : any => {


    return {

              shop_status           : data['appointment_Status'] , // 到店狀態

              // 基本資訊
              expected_arrive       : data['expected_Arrive'] ,    // 預計到店時間
              actual_arrive         : data['actual_Arrive'] ,      // 實際到店時間 
              expected_leave        : data['expected_Leave'] ,     // 期望離店時間

              way_arrive            : data['way_Arrive'] ,         // 到店方式
              way_leave             : data['way_Leave'] ,          // 離店方式

              // 自備物品 
              customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' , // 自備物品 ( 可複選選項 )
              customer_object_other : data['customer_Object_Other'] ,                                    // 自備物品 ( 其他 )
              customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,     // 主人交代 ( 可複選選項 )
              admin_customer_note   : data['admin_Customer_Note'] ,  
             
              amount_paid           : data['amount_Paid'] ? data['amount_Paid'] : 0         // 已付金額    

           }

}


// ---------------------------------------------------------


// @ 基礎單
export const colCovert_Basic_UPDATE = ( data : any ) => { 

   let obj = get_Common_Obj( data ) ; 

   // # 增加 _ 基礎單特有欄位
  

   return obj

}


// @ 洗澡單
export const colCovert_Bath_UPDATE = ( data : any ) => { 

    let obj = get_Common_Obj( data ) ; 
    
    // # 增加 _ 洗澡單特有欄位
 

    return obj

}


// @ 美容單
export const colCovert_Beauty_UPDATE = ( data : any ) => { 

    let obj = get_Common_Obj( data ) ; 

    // # 增加 _ 美容單特有欄位



    return obj
    
}