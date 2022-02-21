import { IInfo , ICustomer_Individual  , IPet } from "utils/Interface_Type" ;
import moment from "moment" ;


/*
 
   @ 欄位轉換 ( for 【 新增 ( CREATE ) 】 資料 )
     表單欄位 ---> 資料庫資料表欄位

*/


// @ 基本資訊 ( 服務性質、到店日期、到店處理碼 ... )
export const colCovert_Info_CREATE = ( data : IInfo ) => {

    return {

              service_status  : data['service_Status'] ,                                                           // 服務性質 ( 已到店、預約_今天、預約_未來 )
              shop_status     : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                     // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

              service_date    : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
              q_code          : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

              actual_arrive   : data['actual_Arrive'] ,                                   // 實際 _ 到店時間
              expected_arrive : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,  // 預計 _ 到店時間
              expected_leave  : data['expected_Leave'] ,                                  // 預計 _ 離店時間

              way_arrive      : data['way_Arrive'] ,                                      // 到店方式
              way_leave       : data['way_Leave'] ,                                       // 離店方式

           } ;

} ;

// @ 客戶 ( 個人 )
export const colCovert_Customer_Individual_CREATE = ( data : ICustomer_Individual ) => {

    return {

             name         : data['customer_Name'] ,
             id           : data['customer_Id'] ,
             mobile_phone : data['customer_Cellphone'] ,
             tel_phone    : data['customer_Telephone'] ,
             line         : data['customer_Line'] ,
             email        : data['customer_Email'] ,
             address      : data['customer_Address'] ,

           } ;

} ;

// @ 寵物
export const colCovert_Pet_CREATE = ( data : IPet ) => {

    return {

            serial       : data['pet_Serial'] ,
            species      : data['pet_Species'] ,
            name         : data['pet_Name'] ,
            sex          : data['pet_Sex'] === '請選擇' ? '' : data['pet_Sex'] ,
            color        : data['pet_Color'] ,
            weight       : data['pet_Weight'] ,
            size         : data['pet_Size'] === '請選擇' ? '' : data['pet_Size'] ,
            age          : data['pet_Age'] ,

            injection    : data['injection'] ,
            flea         : data['flea'] ,
            ligate       : data['ligate'] ,
            chip         : data['chip'] ,
            infection    : data['infection'] ,
            together     : data['together'] ,
            drug         : data['drug'] ,
            bite         : data['bite'] ,

            health       : data['health'] ? data['health'].join(',') : "" ,
            feed         : data['feed'] ? data['feed'].join(',') : "" ,
            toilet       : data['toilet'] ? data['toilet'].join(',') : "" ,
            ownerProvide : data['ownerProvide'] ? data['ownerProvide'].join(',') : "" ,

            note         : data['pet_Note'] ,

           } ;


} ;


// @ 基礎單
export const colCovert_Basic_CREATE = ( data : any ) => {

    const basic_fee           = data['basic_Fee'] ;          // 本次基礎單消費價格小計
    const self_adjust_amount  = data['self_Adjust_Amount'] ; // 個體自行調整費用
    const pickup_fee          = data['pickup_Fee'] ;         // 接送費
    const amount_payable      = parseInt( basic_fee ) + parseInt( self_adjust_amount )  + parseInt( pickup_fee ) ;  // 應收金額

    return {

                // * 基本資訊欄位 ( 9 個 )
                service_status        : data['service_Status'] ,                                                           // 服務性質 ( 已到店、預約_今天、預約_明天 )
                shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                     // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                way_leave             : data['way_Leave'] ,                                                      // 離店方式

                // * 客戶資料 ( 1 個 )
                customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                // * 寵物資料 ( 1 個 )
                pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                // * 主人自備物品、交代 ( 4 個 )
                customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註


                // * 資料欄位 ( 1 個 ) --------------------------------------------------------
                basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,


                //  * 費用欄位 ( 3 個 ) --------------------------------------------------------
                basic_fee             : basic_fee ,                                                              // 本次基礎單消費價格小計
                
                self_adjust_amount    : self_adjust_amount ,                                                     // 個體自行調整費用
                pickup_fee            : pickup_fee ,                                                             // 接送費


                // * 行政、明細 ( 8 個 ) --------------------------------------------------------
                amount_payable        : amount_payable ,                                                         // 應收金額
                amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                payment_type          : '基礎小美容' ,

                admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註

                // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) -------------------------
                beautician_name       : '' ,                                                                      // 負責美容師
                beautician_report     : '' ,                                                                      // 處理結果
                wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                wait_time             : '' ,                                                                      // 開始等候時間
                beautician_star       : '' ,                                                                      // 評分
                beautician_note       : '' ,                                                                      // 備註

           }
    
} ;


// @ 洗澡單
export const colCovert_Bath_CREATE = ( data : any ) => {

      // * 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
      let payment_Type = data['current_Create_Service_Type'] ? data['current_Create_Service_Type'] : '' ;

      // 若付款方式為方案，付費類別改為 _ 方案備註 ( Ex. 包月洗澡 1 次 ... )
      if( data['payment_Method'] === '包月洗澡' || data['payment_Method'] === '包月美容' ) payment_Type = data['current_Plan_Note'] ;
  
      // ----------------------------------
  
          const bath_fee           = data['bath_Fee'] ;           // 洗澡費用
          const self_adjust_amount = data['self_Adjust_Amount'] ; // 個體自行調整費用
          const extra_service_fee  = data['extra_Service_Fee'] ;  // 加價項目 _ 費用
          const extra_beauty_fee   = data['extra_Beauty_Fee'] ;   // 加價美容 _ 費用
          const pickup_fee         = data['pickup_Fee'] ;         // 接送費用
  
          // 應收金額
          const amount_payable     = parseInt( bath_fee ) +
                                     parseInt( self_adjust_amount ) +
                                     parseInt( extra_service_fee ) +
                                     parseInt( extra_beauty_fee ) +
                                     parseInt( pickup_fee ) ; 
    
    return {

                // * 基本資訊欄位 ( 9 個 )
                service_status        : data['service_Status'] ,                                                           // 服務性質 ( 已到店、預約_今天、預約_未來 )

                shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                     // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                way_leave             : data['way_Leave'] ,                                                      // 離店方式


                // * 客戶資料 ( 1 個 )
                customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                // * 寵物資料 ( 1 個 )
                pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                // * 主人自備物品、交代 ( 4 個 )
                customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註

                // * 資料欄位 ( 9 個 ) --------------------------------------------------------

                basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,             // 基礎資料

                // 洗澡資料欄位
                bath_1                : data['bath_Option_1'] ,
                bath_2                : data['bath_Option_2'] ,
                bath_3                : data['bath_Option_3'] ,
                bath_4                : data['bath_Option_4'] ,
                bath_5                : data['bath_Option_5'] ,
                bath_6                : data['bath_Option_6'] ,

                extra_service         : data['extra_Item'] ? data['extra_Item'].join(',') : '' ,                // 加價項目 _ 資料 ( Ex. 梳廢毛、跳蚤/壁蝨 )
                extra_beauty          : data['extra_Beauty'] ? data['extra_Beauty'].join(',') : '' ,            // 加價美容 _ 資料

                //  * 費用欄位 ( 6 個 ) --------------------------------------------------------

                bath_fee              : bath_fee ,                                                              // 洗澡費用
                self_adjust_amount    : self_adjust_amount ,                                                    // 個體自行調整費用

                bath_month_fee        : data['current_Plan_Used_Fee'] ? data['current_Plan_Used_Fee'] : '' ,    // 使用單次 : 包月洗澡費用

                extra_service_fee     : extra_service_fee ,                                                     // 加價項目 _ 費用
                extra_beauty_fee      : extra_beauty_fee ,                                                      // 加價美容 _ 費用

                pickup_fee            : pickup_fee ,                                                            // 接送費用

                // * 行政、明細 ( 8 個 ) --------------------------------------------------------

                amount_payable        : amount_payable ,                                                         // 應收金額
                amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                payment_type          : payment_Type ,                                                           // 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )

                admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註

                // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) ------------------------

                beautician_name       : '' ,                                                                      // 負責美容師
                beautician_report     : '' ,                                                                      // 處理結果
                wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                wait_time             : '' ,                                                                      // 開始等候時間
                beautician_star       : '' ,                                                                      // 評分
                beautician_note       : '' ,                                                                      // 備註

           }

} ;


// @ 美容單
export const colCovert_Beauty_CREATE = ( data : any ) => {

        // * 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
        let payment_Type = data['current_Create_Service_Type'] ? data['current_Create_Service_Type'] : '' ;

        // 若付款方式為方案，付費類別改為 _ 方案備註 ( Ex. 包月洗澡 1 次 ... )
        if( data['payment_Method'] === '包月洗澡' || data['payment_Method'] === '包月美容' )  payment_Type = data['current_Plan_Note'] ;

        // ----------------------------------------------------------------------------------

            const beauty_fee         = data['beauty_Fee'] ;          // 美容費用
            const self_adjust_amount = data['self_Adjust_Amount'] ;  // 個體自行調整費用
            const extra_service_fee  = data['extra_Service_Fee'] ;   // 加價項目 _ 費用
            const pickup_fee         = data['pickup_Fee'] ;          // 接送費用

            // 應收金額
            const amount_payable     = parseInt( beauty_fee ) +
                                       parseInt( self_adjust_amount ) +
                                       parseInt( extra_service_fee ) +
                                       parseInt( pickup_fee ) ;


      return {

                // * 基本資訊欄位 ( 9 個 )
                service_status        : data['service_Status'] ,                                                            // 服務性質 ( 已到店、預約_今天、預約_明天 )

                shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                      // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                way_leave             : data['way_Leave'] ,                                                      // 離店方式


                // * 客戶資料 ( 1 個 )
                customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                // * 寵物資料 ( 1 個 )
                pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                // * 主人自備物品、交代 ( 4 個 )

                customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註

                // * 資料欄位 ( 14 個 ) --------------------------------------------------------

                basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,             // 基礎資料

                // 洗澡資料欄位
                bath_1                : data['bath_Option_1'] ,
                bath_2                : data['bath_Option_2'] ,
                bath_3                : data['bath_Option_3'] ,
                bath_4                : data['bath_Option_4'] ,
                bath_5                : data['bath_Option_5'] ,
                bath_6                : data['bath_Option_6'] ,

                extra_service         : data['extra_Item'] ? data['extra_Item'].join(',') : '' ,                // 加價項目 _ 資料 ( Ex. 梳廢毛、跳蚤/壁蝨 )

                // 美容資料欄位
                b_body                : data['beauty_Option_Body'] ,
                b_head                : data['beauty_Option_Head'] ,
                b_ear                 : data['beauty_Option_Ear'] ,
                b_tail                : data['beauty_Option_Tail'] ,
                b_foot                : data['beauty_Option_Foot'] ,
                b_other               : data['beauty_Option_Other'] ,

                //  * 費用欄位 ( 5 個 ) --------------------------------------------------------

                beauty_fee            : beauty_fee ,                                                            // 美容費用
                self_adjust_amount    : self_adjust_amount ,                                                    // 個體自行調整費用

                beauty_month_fee      : data['current_Plan_Used_Fee'] ? data['current_Plan_Used_Fee'] : '' ,     // 使用單次 : 包月美容費用
                extra_service_fee     : extra_service_fee ,                                                      // 加價項目 _ 費用

                pickup_fee            : pickup_fee ,                                                             // 接送費用

                // * 行政、明細 ( 8 個 ) --------------------------------------------------------
                amount_payable        : amount_payable ,           // 應收金額
                amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                payment_type          : payment_Type ,                                                           // 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )

                admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註


                // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) ------------------------
                beautician_name       : '' ,                                                                      // 負責美容師
                beautician_report     : '' ,                                                                      // 處理結果
                wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                wait_time             : '' ,                                                                      // 開始等候時間
                beautician_star       : '' ,                                                                      // 評分
                beautician_note       : '' ,                                                                      // 備註

           }

} ;