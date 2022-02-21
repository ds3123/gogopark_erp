

import React from "react" ;


type Service = {

   service_type : '基礎' | '洗澡' | '美容' ;

   basic_id     : number | string ;
   bath_id      : number | string ;
   beauty_id    : number | string ;

}

// 取得 _ 服務類型、相對應資料表 id
export const useService_Type_Id = ( data : Service ) => {

    const service_Type = data.service_type ;

    let service_Id     = null ;

    if( service_Type === '基礎' ) service_Id = data.basic_id ;
    if( service_Type === '洗澡' ) service_Id = data.bath_id ;
    if( service_Type === '美容' ) service_Id = data.beauty_id ;


    return { service_Type , service_Id }

} ;