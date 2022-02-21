
import React from 'react'



type Service = {

    service_type : '基礎' | '洗澡' | '美容' ;
 
    basic_id     : number | string ;
    bath_id      : number | string ;
    beauty_id    : number | string ;
 
 }



/* 
    @ 藉由傳入資料，回傳特定 : 

      1. 服務類別 ( Ex.基礎、洗澡、美容 )
      2. 服務資料表 ( Ex. basic、bath、beauty ) ID
      3. 服務 Url (Ex. /basics 、/bathes、/beauties ) "

*/
export const switch_Service_Type_Id = ( data : Service ) => {
    
    const service_Type = data.service_type ;  // 服務類型
   
    let service_Id  : any = '' ;              // 服務資料表 ( Ex. basic、bath、beauty ) ID  
    let service_Url : any = '' ;              // 服務 Url (Ex. /basics 、/bathes、/beauties ) "

    if( service_Type === '基礎' ) { service_Id = data.basic_id ;  service_Url = '/basics' ; }
    if( service_Type === '洗澡' ) { service_Id = data.bath_id ;   service_Url = '/bathes' ; }
    if( service_Type === '美容' ) { service_Id = data.beauty_id ; service_Url = '/beauties' ; }

    return { service_Type , service_Id , service_Url }

} ;