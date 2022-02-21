
type Service = {

    service_type   : '基礎' | '洗澡' | '美容' ;  // for 主要服務
    service_status : string ;                   // for 住宿、安親  
         
    
    id             : number | string ;
    basic_id       : number | string ;
    bath_id        : number | string ;
    beauty_id      : number | string ;
 
 }


/* 
    @ 藉由傳入資料，回傳特定 : 

      1. 服務類別 ( Ex.基礎、洗澡、美容 )
      2. 服務資料表 ( Ex. basic、bath、beauty ) ID
      3. 服務 Url ( Ex. /basics 、/bathes、/beauties ) "

*/
export const switch_Service_Type_Id = ( data : Service ) => {


    const service_Type   = data.service_type ;   // 服務類型
    const service_Status = data.service_status ; // 服務狀態 ( for 安親、住宿 ) 


    let service_Id  : any = '' ;                 // 服務資料表 ( Ex. basic、bath、beauty ... ) ID  
    let service_Url : any = '' ;                 // 服務 Url (Ex. /basics 、/bathes、/beauties ... ) 

    if( service_Type === '基礎' ) { service_Id = data.basic_id ;  service_Url = '/basics' ; }
    if( service_Type === '洗澡' ) { service_Id = data.bath_id ;   service_Url = '/bathes' ; }
    if( service_Type === '美容' ) { service_Id = data.beauty_id ; service_Url = '/beauties' ; }

    // 住宿
    if( !service_Type && ( service_Status === '當日住宿' || service_Status === '預約住宿' )  ){
        service_Id  = data.id ;  
        service_Url = '/lodges' ;
    }

    // 安親
    if( service_Status === '當日安親' || service_Status === '預約安親' ){
        service_Id  = data.id ;  
        service_Url = '/cares' ;
    }


    return { service_Type , service_Id , service_Url }

} ;


// 根據特定服務( 基礎、洗澡、美容 )，取得 _ 相對應 url
export const get_Service_Url = ( service_Type : string ) => {

    if( service_Type === '基礎' ) return 'basics' ;
    if( service_Type === '洗澡' ) return 'bathes' ;
    if( service_Type === '美容' ) return 'beauties' ;

    return '' ;

 } ;
