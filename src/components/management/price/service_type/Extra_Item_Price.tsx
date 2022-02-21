
import React from "react"
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";
import Service_Price_List from "components/management/price/Service_Price_List";



/* @ 加價項目 _ 服務價格清單 */
const Extra_Item_Price = ( ) => {

    const data = useRead_Service_Prices('加價項目') ;

    return <Service_Price_List data = { data } />

}  ;

export default Extra_Item_Price
