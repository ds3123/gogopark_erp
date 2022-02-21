
import { Dispatch } from "redux" ;


// # 設定 _ 該房間，是否在選定的時間內，已被使用
// export const set_Is_Room_InUse = ( bool : boolean ) => {
//
//     return ( dispatch : Dispatch ) => {
//
//         dispatch({
//             type          : "SET_IS_ROOM_INUSE" ,
//             is_Room_InUse : bool
//         }) ;
//
//     } ;
//
// } ;


// # 設定 _ 住宿頁資料 _ 是否下載中
export const set_Lodge_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type            : "SET_LODGE_ISLOADING" ,
                            Lodge_isLoading : bool
                        }) ;

          } ;

} ;


// lodge_Reservation_Data


// # 設定 _ 已經住宿資料
export const set_Lodge_Reservation_Data = ( data : any[] ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                   : "SET_LODGE_RESERVATION_DATA" ,
                            lodge_Reservation_Data : data
                        }) ;

          } ;

} ;


// # 設定 _ 目前房型 ( Ex. 大、中、小房 )
export const set_Current_Lodge_Type = ( type : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type               : "SET_CURRENT_LODGE_TYPE" ,
                            current_Lodge_Type : type
                        }) ;

          } ;

} ;



// # 設定 _ 目前房號 ( Ex. A01、A02、A03 )
export const set_Current_Lodge_Number = ( number : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                 : "SET_CURRENT_LODGE_NUMBER" ,
                            current_Lodge_Number : number
                         }) ;

            } ;

} ;



// # 設定 _ 住房日期
export const set_Lodge_Check_In_Date = ( date : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                : "SET_LODGE_CHECK_IN_DATE" ,
                            lodge_Check_In_Date : date
                        }) ;

          } ;

} ;



// # 設定 _ 退房日期
export const set_Lodge_Check_Out_Date = ( date : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                 : "SET_LODGE_CHECK_OUT_DATE" ,
                            lodge_Check_Out_Date : date
                        }) ;

          } ;

} ;








// # 設定 _ 所選擇房型、日期區間 : 住宿價格總計
export const set_Current_Lodge_Price_Sum = ( price_Sum  : number ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                    : "SET_CURRENT_LODGE_PRICE_SUM" ,
                            current_Lodge_Price_Sum : price_Sum
                        }) ;

          } ;

} ;



