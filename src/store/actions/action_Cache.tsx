
import { Dispatch } from "redux";



// # 設定 _ 客戶列表快取 ：pageOfItems
export const set_Customers_Cache_PageOfItems = ( data : any[] ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
                   type : "SET_CUSTOMERS_CACHE_PAGEOFITEMS" ,
                   data : data
                }) ;

    } ;


} ;