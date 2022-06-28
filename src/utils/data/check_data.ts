


// @ 用以判斷資料 ： 回傳 Boolean



 // 檢查 _ 方案是否使用完畢
 export const check_Plan_Done = ( plan_Type : string , records : any[] , custom_Plan : any , current_Tab : string ) : boolean  => {


    // 從已使用紀錄中，篩選出已使用 洗澡/美容 次數
    const bath_Num   = records.filter( ( x : any ) => x?.service_type === '洗澡' ).length ;
    const beauty_Num = records.filter( ( x : any ) => x?.service_type === '美容' ).length ;
   
    // 為自訂方案
    const is_Custom_Plan = plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ;


    // # 已使用完( true )

    // 在新增洗澡下
    if( current_Tab === '洗澡' && plan_Type === '包月洗澡'  && bath_Num === 4 ) return true ;
    if( current_Tab === '洗澡' && plan_Type === '包月美容'  && bath_Num === 3 ) return true ;
    if( current_Tab === '洗澡' && is_Custom_Plan && bath_Num === custom_Plan?.bath_num ) return true ;

    // 在新增美容下
    if( current_Tab === '美容' && plan_Type === '包月美容'  && beauty_Num === 1 ) return true ;
    if( current_Tab === '美容' && is_Custom_Plan && beauty_Num === custom_Plan?.beauty_num ) return true ;


    // # 未使用完( false )
    return false

 } ; 
