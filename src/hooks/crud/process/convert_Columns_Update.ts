
/*
 

   @ 欄位轉換 ( for 【 修改 ( UPDATE ) 】 資料 )
     表單欄位 ---> 資料庫資料表欄位


     NOTE

      ＊ 以下僅更新服務表單，"部分欄位" ( for 首頁、 )
      ＊ 更新欄位的轉換，在 convert_Columns.ts 檔案( 更新 "全部欄位" ) 已有 --> 是否合併 ？  2022.04.11 

      
*/


// 取得 _ 所有服務，皆有的欄位
const get_Common_Obj = ( data : any ) : any => {


    
    // 當服務為 "使用方案" 時， "實收金額" 採用欄位 : 'plan_Plus_Amount_Paid'
    const plan_Plus_Amount_Paid = data?.plan_Plus_Amount_Paid ;   // 方案加價 : 已付金額
    const amount_Paid           = plan_Plus_Amount_Paid ? plan_Plus_Amount_Paid : data['amount_Paid'] ;


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
             
             // amount_paid           : data['amount_Paid'] ? data['amount_Paid'] : 0   ,                // 實收金額    
              amount_paid           : amount_Paid ? amount_Paid : 0   ,                                  // 實收金額    

              beautician_note	    : data['beautician_Note']                                            // 美容備註

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
    
    // 洗澡
    obj.bath_1 = data['bath_Option_1'] ;
    obj.bath_2 = data['bath_Option_2'] ;
    obj.bath_3 = data['bath_Option_3'] ;
    obj.bath_4 = data['bath_Option_4'] ;
    obj.bath_5 = data['bath_Option_5'] ;
    obj.bath_6 = data['bath_Option_6'] ;


    return obj

}


// @ 美容單
export const colCovert_Beauty_UPDATE = ( data : any ) => { 

    let obj = get_Common_Obj( data ) ; 

    // # 增加 _ 美容單特有欄位

    // 洗澡
    obj.bath_1 = data['bath_Option_1'] ;
    obj.bath_2 = data['bath_Option_2'] ;
    obj.bath_3 = data['bath_Option_3'] ;
    obj.bath_4 = data['bath_Option_4'] ;
    obj.bath_5 = data['bath_Option_5'] ;
    obj.bath_6 = data['bath_Option_6'] ;

    // 美容
    obj.b_body  = data['beauty_Option_Body'] ;
    obj.b_head  = data['beauty_Option_Head'] ;
    obj.b_ear   = data['beauty_Option_Ear'] ;
    obj.b_tail  = data['beauty_Option_Tail'] ;
    obj.b_foot  = data['beauty_Option_Foot'] ;
    obj.b_other = data['beauty_Option_Other'] ;
    

    return obj
    
}