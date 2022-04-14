
import { useCallback , useEffect, useState} from "react"
import axios from "utils/axios";


//@ 取得客戶各類服務資料 ( Ex. 基礎、洗澡、美容.... )


// axios.get( `/bathes/show_customer_id/${ customer_ID }` ).then( res => {

// axios.get( `/beauties/show_customer_id/${ customer_ID }` ).then( res => {


type service = 'basics'| 'bathes' | 'beauties' | undefined ;


// 取得 _ 服務資料 ( 基礎、洗澡、美容 )
export const useFetch_Customer_Service_Records = ( service_Type? : service , customer_ID? : string  ) => {

    const [ cus_Service_Records , set_Cus_Service_Records ] = useState( [] ) ;

    const fetch_Service_Records = useCallback( ( service_Type : service , cus_ID : string ) : void => {

        axios.get( `/${ service_Type }/show_customer_id/${ cus_ID }` ).then( res => {

            set_Cus_Service_Records( res.data.length > 0 ? res.data : [] ) ;

        }) ;

    } , [] );

    useEffect(( ) => {

        if( customer_ID )  fetch_Service_Records( service_Type , customer_ID ) ;

    } , [ ] ) ;


    return { cus_Service_Records , fetch_Service_Records }

} ;