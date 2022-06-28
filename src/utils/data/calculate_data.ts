

// @ 計算金額



// 計算 _ 小計金額 : "應付"金額加總
export const cal_Paid_Amount_Total = ( data : any[] ) : number => {

    let total_Amount = 0 ; 
 
    if( data.length > 0 ) data.forEach( ( x : any ) => total_Amount += x?.amount_paid ) ;

    return total_Amount

} ;


// 計算 _ 小計金額 : 扣 _ 預收款 ( 使用方案 ) 
export const cal_Use_Plan_Amount_Total = ( data : any[] | undefined ) : number => {

    let total_Amount = 0 ; 


    if( data && data.length > 0 ){

        data.forEach( ( x : any ) => {

            const plan_Type    = x?.plan?.plan_type ;  // 方案類型 ( Ex. 預設方案 : 包月洗澡 / 包月美容 ; 自訂方案 )
            const service_Type = x?.service_type ;     // 服務類型 ( Ex. 洗澡 / 美容 )      
        
            // 預設方案
            if( plan_Type === '包月洗澡' ) total_Amount = x['bath_month_fee'] ;
            if( plan_Type === '包月美容' && service_Type === '洗澡' ) total_Amount = x['bath_month_fee'] ;
            if( plan_Type === '包月美容' && service_Type === '美容' ) total_Amount = x['beauty_month_fee'] ;
          
        
            // 自訂方案
            if( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) total_Amount = x?.plan?.service_price;   

        } ) ;

       
    } 

    return total_Amount

} ;


// 計算 _ 小計金額 : 現金
export const cal_Cash_Total = ( data : any[] | undefined ,  type : '收入' | '支出' ) : number => {

    let total_Amount = 0 ; 

    if( data && data.length > 0 ){ 

       const _data = data.filter( ( x : any ) => x['type'] === type ) ;  // 篩選出 _ 收入 or 支出
       _data.forEach( ( x : any ) => total_Amount += x['amount'] ) ;

    }

    return total_Amount

} ;