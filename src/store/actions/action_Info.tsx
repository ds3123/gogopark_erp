
import { Dispatch } from "redux";


/* @ 服務單 _ 基本資料 ( 服務性質、處理碼、到店日期 ... ) */



// # 設定 _ 欄位
export const set_Info_Column = ( column : string , value : string | number ) => {

    return ( dispatch : Dispatch ) => {

               dispatch({ type : column , data : value }) ;

           } ;

} ;


// # 設定 _ 目前所選擇的 Q code
export const set_Current_Q_Code = ( qCode : string ) => {

    return ( dispatch : Dispatch ) => {

               dispatch({ type : "SET_CURRENT_Q_CODE" , data : qCode }) ;

           } ;

} ;


