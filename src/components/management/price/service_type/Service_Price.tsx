
import React from "react"
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";
import Service_Price_List from "components/management/price/Service_Price_List";


/* @ 所有服務 _ 價格清單 */
const Service_Price = ( ) => {

    const data = useRead_Service_Prices() ;


    return <Service_Price_List data = { data } />

}  ;

export default Service_Price

