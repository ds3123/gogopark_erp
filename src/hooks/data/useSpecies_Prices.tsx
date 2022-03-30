

import { useEffect, useState } from "react"
import axios from "utils/axios";



// # 藉由 : "寵物品種名稱" ( Ex. 迷你品 )，查詢 _ 相對應的各種服務 : 基本價錢 ( 資料表 : 'pet_species' with 'service_prices' )
export const useSpecies_Name_Prices = ( species_Name : string  ) => {

    // 服務價格
    const [ prices , set_Prices ] = useState({
                                                bath_First    : 0 , // 初次洗澡
                                                bath_Single   : 0 , // 單次洗澡
                                                bath_Month    : 0 , // 包月洗澡
                                                beauty_Single : 0 , // 單次美容
                                                beauty_Month  : 0 , // 包月美容
                                              }) ;


    useEffect(( ) : any => {

        if( !species_Name ) return false ;

        axios.get( `/pet_species/show_by_col_param/name/${ species_Name }` ).then(res => {

           if( res.data.length > 0 ){

               const prices       = res.data[0]['service_prices'] ;

               // 初次洗澡
               const bath_First   = prices.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_name'] === '初次洗澡優惠價格' )[0] ;

               // 單次洗澡
               const bath_Single  = prices.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_name'] === '單次洗澡價格' )[0] ;

               // 包月洗澡
               const bath_Month   = prices.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_plan'] === '包月洗澡' )[0] ;

               // 單次美容
               const beauty_Single = prices.filter( ( x : any ) => x['service_type'] === '美容' && x['service_name'] === '單次美容價格' )[0] ;

               // 包月美容
               const beauty_Month = prices.filter( ( x : any ) => x['service_type'] === '美容' && x['service_plan'] === '包月美容' )[0] ;

               // 設定 _ 各品種下，主要服務價錢
               set_Prices({ ...prices ,
                                       bath_First    : bath_First    ? bath_First['service_price']    : 0 , // 初次洗澡
                                       bath_Single   : bath_Single   ? bath_Single['service_price']   : 0 , // 單次洗澡
                                       bath_Month    : bath_Month    ? bath_Month['service_price']    : 0 , // 包月洗澡
                                       beauty_Single : beauty_Single ? beauty_Single['service_price'] : 0 , // 單次美容
                                       beauty_Month  : beauty_Month  ? beauty_Month['service_price']  : 0 , // 包月美容
               }) ;


           }

        }) ;

    } ,[ species_Name ] ) ;


    return prices

} ;


// # 藉由 : "寵物品種 id " ，查詢 _ 相對應的各種服務 : 基本價錢
export const useSpecies_Id_Prices = ( species_Id : string | number  ) => {


    // 服務價格
    const [ prices , set_Prices ] = useState({
                                                bath_First    : 0 , // 初次洗澡
                                                bath_Single   : 0 , // 單次洗澡
                                                bath_Month    : 0 , // 包月洗澡
                                                beauty_Single : 0 , // 單次美容
                                                beauty_Month  : 0 , // 包月美容
                                             }) ;



    const get_Prices = ( _species_Id : number | string ) => {

         // 藉由該寵物品種資料表 ( pet_species ) id 欄位值，查詢 _ 相對應的各種服務價錢 ( 資料表 : service_prices )
         axios.get( `/service_prices/show_specie_id_prices/${ _species_Id }` ).then(res => {

            // 初次洗澡
            const bath_First    = res.data.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_name'] === '初次洗澡優惠價格' )[0] ;

            // 單次洗澡
            const bath_Single   = res.data.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_name'] === '單次洗澡價格' )[0] ;

            // 包月洗澡
            const bath_Month    = res.data.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_plan'] === '包月洗澡' )[0] ;

            // 單次美容
            const beauty_Single = res.data.filter( ( x : any ) => x['service_type'] === '美容' && x['service_name'] === '單次美容價格' )[0] ;

            // 包月美容
            const beauty_Month  = res.data.filter( ( x : any ) => x['service_type'] === '美容' && x['service_plan'] === '包月美容' )[0] ;

            // 設定 _ 各品種下，主要服務價錢
            set_Prices({ ...prices ,
                                     bath_First    : bath_First    ? bath_First['service_price']    : 0 ,  // 初次洗澡
                                     bath_Single   : bath_Single   ? bath_Single['service_price']   : 0 ,  // 單次洗澡
                                     bath_Month    : bath_Month    ? bath_Month['service_price']    : 0 ,  // 包月洗澡
                                     beauty_Single : beauty_Single ? beauty_Single['service_price'] : 0 ,  // 單次美容
                                     beauty_Month  : beauty_Month  ? beauty_Month['service_price']  : 0 ,  // 包月美容
                                   }) ;

        }) ;

    }  


    // 監聽 _ species_Id，
    useEffect( () : any => {

        if( !species_Id || species_Id === '請選擇' ) return false ;

        get_Prices( species_Id )


    } ,[ species_Id ] ) ;

    return prices

} ;


