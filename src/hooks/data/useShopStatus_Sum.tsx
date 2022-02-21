
import React from "react" ;
import { Shop_Status , Service_Type } from 'utils/Interface_Type'


/* 計算 _ 首頁各個到店狀態下，基礎、洗澡、美容的數量 */
const useShopStatus_Sum = ( shop_Status : Shop_Status , pet_Arr : any[] )  => {

        // 計算數量
        const filter_Sum = ( status : Shop_Status , type : Service_Type ) : number => {
            return pet_Arr.filter( x  => {  return x['shop_status'] === status && x['service_type'] === type ; }).length ;
        } ;

         const typeArr = ['基礎','洗澡','美容'] ;

         let basic_Num  = 0 ;
         let bath_Num   = 0 ;
         let beauty_Num = 0 ;

         typeArr.forEach( x => {

             const _x = x as Service_Type ;

             if( x === '基礎' ) basic_Num  = filter_Sum( shop_Status , _x ) ;
             if( x === '洗澡' ) bath_Num   = filter_Sum( shop_Status , _x ) ;
             if( x === '美容' ) beauty_Num = filter_Sum( shop_Status , _x ) ;

         });

    return { basic_Num , bath_Num , beauty_Num  } ;



};

export default useShopStatus_Sum ;