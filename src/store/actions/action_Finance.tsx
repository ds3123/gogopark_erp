

import { Dispatch } from "redux" ;



// # 設定 _ 財務管理下，各報表查詢日期的類型
export const set_Finance_Query_Date_Type = ( dateType : '付款日期' | '到店日期' ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type                    : "SET_FINANCE_QUERY_DATE_TYPE" ,
                    finance_Query_Date_Type : dateType
                }) ;

           } ;

} ;