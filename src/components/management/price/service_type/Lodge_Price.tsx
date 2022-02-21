
import React from "react";
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";
import Service_Price_List from "components/management/price/Service_Price_List";



/* @ 住宿 _ 服務價格清單 */
const Lodge_Price = ( ) => {

    const data = useRead_Service_Prices('住宿') ;

    return <Service_Price_List data = { data } />

}  ;

export default Lodge_Price

