
import React from "react"
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";
import Service_Price_List from "components/management/price/Service_Price_List";



/* @ 洗澡 _ 服務價格清單 */
const Bath_Price = ( ) => {

    const data = useRead_Service_Prices('洗澡') ;

    return <Service_Price_List data = { data } />

}  ;

export default Bath_Price

