import React, { useState , useEffect , useCallback } from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'
import { useDispatch , useSelector } from "react-redux";
import { set_Index_isLoading } from "store/actions/action_Index";




/* @ GET : 透過 Ajax _ 取得資料 */

// # 服務資料 ----

// * 取得 : 主要服務( 基礎、洗澡、美容 ) 與 客戶、寵物資料
export const useRead_Service_Cus_Pet = ( serviceType? : Service_Type_Api ) => {

    const [ data , set_Data ] = useState( [] ) ;
    const dispatch            = useDispatch() ;

    // 取得資料
    useEffect(() : any  =>{

       let is_Mounted = true ;

       axios.get( '/services/show_with_cus_relative_pet/' ).then( res => {

          if( is_Mounted ){

               // 設定 _ 回傳資料
               set_Data( res.data ) ;

               // 設定 _ 下載完畢狀態
               dispatch( set_Index_isLoading(false ) ) ;

          }

       }) ;

       return () => ( is_Mounted = false )  // cleanup function 卸除後，設為 false

    } ,[] ) ;

    return data ;

} ;

// * 取得 : 特定到店日期，所有服務 或 特定服務 ，"已使用" 的 Qcode
export const useRead_Qcode_Service_Date = (  type_Url? : 'basics' | 'bathes' | 'beauties' ) => {

    // 從 store 中取得 : 到店日期( 預設 : 今日 )
    const service_Date  = useSelector( ( state : any ) => state.Info.service_Date ) ;

    const [ data , set_Data ] = useState( [] ) ;

    const api = type_Url ? `/${ type_Url }/show_qcode/${ service_Date }` : `/services/show_qcode/${ service_Date }`

    // 取得資料
    useEffect(()=>{

        axios.get( api ).then( res => { set_Data( res.data ) ; } );

    },[ service_Date]) ;

    return data ;

} ;

// * 取得 : 特定日期，所有服務
export const useRead_Date_Services = ( date : string ) => {

    const [ data , set_Data ] = useState( [] ) ;

    // 取得資料
    useEffect(() => {

        axios.get( `/services/show_services/${ date }` ).then( res => { set_Data( res.data ) ; } );

    },[ date ]) ;

    return data ;

} ;

// # 客戶 ----

// * 依照特定欄位值，查詢客戶資料 ( LIKE 模糊搜尋 ， 依傳入參數 ，查詢欄位 與 查詢值 ，如 : 'id' & 身分證字號 或 'mobile_phone' & 手機號碼 )
export const useRead_Customer_By_Column = ( column : string , value : string | number  ) => {

    const [ data , set_Data ] = useState([] ) ;

     useEffect(( ) => {

        if( column && value ){
            axios.get(`/customers/show_by_param/${ column }/${ value }`).then( res => set_Data( res.data ) ) ;
        }

        // 沒有查詢值，設回空陣列
        if( !value ) set_Data( [] ) ;

     } , [ column , value ] );

    // // 查詢函式
    // const read_Customer_By_Column = ( column : string , value : string | number  ) => {
    //
    //     set_Data( [] ) ;
    //
    //     axios.get(`/customers/show_by_param/${ column }/${ value }`).then( res => set_Data( res.data ) ) ;
    //
    // } ;

    return { data } ;

} ;

// * 取得 : 客戶寵物 ( 依客戶身分證字號 )
export const useRead_Customer_Pets = ( cus_Id : string ) => {

   const [ cusPets , set_cusPets ] = useState([]) ;

   useEffect(( ) => {

       if( cus_Id ) axios.get( `/customers/show_pets/${ cus_Id }` ).then(res => {

               if( res.data.length > 0 ) set_cusPets( res.data ) ;

          }

       );

   } , [  ] ) ;

   return cusPets ;

} ;


// # 寵物 ---

// 依照 _ 寵物編號
export const useRead_Pet_By_Serial = ( serial : string ) => {

    const [ data , set_Data ] = useState([] ) ;

    useEffect(( ) => {

       axios.get(`/pets/${ serial }`).then( res => set_Data( res.data ) ) ;

    } , [ serial ] );

    return data ;

} ;


// # 品種 & 價錢 ----

// 依照品種資料表的 欄位 與 欄位值，查詢是否已有該品種資料
export const useRead_Species_By_Column = ( column : string , value : string | number ) => {

    const [ data , set_Data ] = useState([] ) ;

    useEffect(( ) => {

        if( column && value ){
            axios.get(`/pet_species/show_by_col_param/${ column }/${ value }`).then( res => set_Data( res.data ) ) ;
        }

        // 沒有查詢值，設回空陣列
        if( !value ) set_Data( [] ) ;

    } , [ column , value ] );

    return { data } ;

} ;



// * 所有品種 ( 之後廢除 ，改為以下 useRead_Species 2021.07.13 )
export const useRead_All_Species = ( ) => {

    const [ species , set_Species ] = useState([]);

    useEffect(( ) => {

        axios.get( '/species/' ).then( res => { set_Species( res.data ) ; } );

    } , [] ) ;

    return species ;

} ;

export const useRead_Species = ( ) => {

    const [ species , set_Species ] = useState([]);

    useEffect(( ) => {

        axios.get( '/pet_species/' ).then( res => { set_Species( res.data ) ; } );

    } , [] ) ;

    return species ;

} ;


// * 特定品種 ( 之後廢除  2021.07.13 )
export const useRead_Single_Species = ( id : string ) => {

    const [ species , set_Species ] = useState({}) ;

    useEffect(( ) => {

       if( id ) axios.get( `/species/${ id }` ).then( res => { set_Species( res.data ) ; } );

    } , [] ) ;

    return species ;

} ;

// * 所有價錢 ( prices 之後廢除  2021.07.13 )
export const useRead_All_Prices = ( ) => {

    const [ prices , set_Prices ] = useState([]);

    useEffect(( ) => {

        axios.get( '/prices/' ).then( res => { set_Prices( res.data ) ; } );

    } , [] ) ;

    return prices ;

} ;


// 特定服務類型價格 ( prices 之後廢除  2021.07.13 )
export const useRead_Type_Prices = ( serviceType : string ) => {

    const [ prices , set_Prices ] = useState([]);

    useEffect(() => {

        axios.get( `/prices/show_type/${ serviceType }` ).then( res => { set_Prices( res.data ) ; } );

    } , [] ) ;

    return prices ;

} ;


// 服務類型價格 ( 所有、特定服務類型 )
export const useRead_Service_Prices = ( serviceType? : string ) => {

    const [ prices , set_Prices ] = useState([]);

    useEffect(() => {

      // 特定服務類型
      if( serviceType ) axios.get( `/service_prices/show_type_prices/${ serviceType }` ).then( res => { set_Prices( res.data ) ; } );

      // 所有服務類型
      if( !serviceType ) axios.get( `/service_prices` ).then( res => { set_Prices( res.data ) ; } );

    } , [] ) ;

    return prices ;

} ;


// * 員工
export const useRead_Employees = ( ) => {

    const [ employees , set_Employees ] = useState([]);

    useEffect(() => {

        axios.get( '/employees/' ).then( res => { set_Employees( res.data ) ; } );

    } , [] ) ;

    return employees ;


} ;


// 時間按鈕紀錄 ( 美容師區中，美容師點選時間按鈕紀錄 )
export const useRead_TimeRecord_By_Id_Button = ( table_id : string , button : string ) => {

    const [ timeRecord , set_TimeRecord ] = useState([]);

    useEffect(() => {

        axios.get( `/time_records/show_by_id_button/${ table_id }/${ button }` ).then( res => { set_TimeRecord( res.data ) ; } );

    } , [] ) ;

    return timeRecord ;

} ;










// # 檢查 _ 資料庫是否 : 已有相關資料 ( 尚未完成 2021.06.12 )
export const useRead_Check_IsExist = ( ) => {

    const [ checkFunc , set_checkFunc ] = useState<any>( ()=>{} )


    const check_IsExist = ( api : string , colValue : string  ) => {

        axios.get( `${api}/${colValue}` ).then(res => {

             return "ggggg"

        }) ;

        return "ffff"

    } ;

    return checkFunc

} ;