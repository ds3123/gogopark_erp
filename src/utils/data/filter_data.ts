

type payment_Method = '現金' | '信用卡' | '第三方支付' | '方案' | '綜合' ;
type date_Type      = '付款日期' | '到店日期' ;


// 篩選 _ 基礎、洗澡、美容
export const filter_Finance_Basic_Bath_Beauty =  ( data : any[] , payment_Method : payment_Method , date_Type : date_Type ) : any[] => {


    if( data.length > 0 ){
                      
        return data.filter( ( x : any ) => { 

                                 const s_Type         = x?.service_type ;   // 服務類型  
                                 const service_Date   = x?.service_date ;   // 到店日期
                                 const payment_Date   = x?.payment_date ;   // 付款日期
                                 const pay_Method     = x?.payment_method ; // 付款方式

                                 // "方案加價"金額
                                 const plan_Plus_Amount = x?.self_adjust_amount + x?.extra_service_fee + x?.extra_beauty_fee + x?.pickup_fee ;

                                 const is_Not_Deleted = x?.is_delete !== 1 ;                                        // 排除 _ 銷單
                                 const is_Services    = s_Type === '基礎' || s_Type === '洗澡' || s_Type === '美容' ; // 排除 _ 安親、住宿 
                                 const is_Pre_Payment = service_Date > payment_Date ;                               // 是否為預付( 到店日期 > 付款日期 ) 
                                
                                 
                                 return payment_Method === '綜合' ?  
                                          is_Not_Deleted && is_Services && ( ( !is_Pre_Payment && pay_Method !== '方案' ) || ( pay_Method === '方案' && plan_Plus_Amount > 0 ) ) :  
                                          is_Not_Deleted && is_Services && 
                                                 ( !is_Pre_Payment && pay_Method === payment_Method  || ( is_Pre_Payment && date_Type === '到店日期' ) || ( pay_Method === '方案' && payment_Method === '現金' ) )  ; 


                           } ) ; 

    }

    return []

} ;



// 篩選  _ 安親、住宿 ( 含當日、預約 )
export const filter_Finance_Care_Lodge = ( data : any[] , payment_Method : payment_Method , date_Type : date_Type ) : any[] => {
    
    if( data.length > 0 ){
                      
        return data.filter( ( x : any ) => {

                              const s_Status = x?.service_status ;

                              const is_Not_Deleted = x?.is_delete !== 1 ;                                                                                                                            // 排除 _ 銷單
                              const is_Care_Lodge  = s_Status === '當日安親' || s_Status === '預約安親' || s_Status === '當日住宿' || s_Status === '預約住宿'  ; // 安親、住宿 
                              const is_Pre_Payment = x?.start_date > x?.payment_date ;  // 是否為 : 預付( 開始日期 > 付款日期 ) 

                              return payment_Method === '綜合' ?  
                                       is_Not_Deleted && is_Care_Lodge && !is_Pre_Payment :  
                                       is_Not_Deleted && is_Care_Lodge && 
                                                 ( !is_Pre_Payment && x?.payment_method === payment_Method || ( is_Pre_Payment && date_Type === '到店日期' )  ) ; 
 
                          }) ; 

    }

    return []

} ;


// 篩選 _ 購買 : 方案
 export const filter_Finance_Plan = ( data_Plans : any[] , data_Services : any[]  , payment_Method : payment_Method  , date_Type : date_Type  ) : any[] => {
    
    // 結合 _ 方案 & 服務 ( 基礎、洗澡、美容、安親、住宿 )
    const data = data_Plans.concat( data_Services ) ;;

    if( data.length > 0  ){
                      
        return data.filter( ( x : any ) => {

                    
                    const s_Type         = x?.service_type ;   // 服務類型( for 基礎、洗澡、美容 ) 
                    
                    const service_Date   = x?.service_date ;   // 到店日期 ( fro 基礎、洗澡、安親 )  
                    const start_Date     = x?.start_date ;     // 開始日期 ( for 安親、住宿 )
                    const payment_Date   = x?.payment_date ;   // 付款日期

                 
                    // 是否為：服務 ( 基礎、洗澡、美容、安親、住宿 ) 
                    const is_Services    = s_Type === '基礎' || s_Type === '洗澡' || s_Type === '美容' || start_Date !== undefined  


                    // 排除 _ 不是 “預付” 的服務
                    if( is_Services  && !( service_Date > payment_Date || start_Date > payment_Date ) ) return false


                    // 綜合分區 
                    if( payment_Method === '綜合' && date_Type === '付款日期' ) return x ;  // 回傳所有資料 


                    // 其他分區
                    return x['payment_method'] === payment_Method && date_Type === '付款日期'
    

               }) ; 

    }

    return []

} ;



