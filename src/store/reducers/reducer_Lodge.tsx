import moment from "moment";


const today = moment( new Date ).format('YYYY-MM-DD') ; // 今日


/* @ 住宿  */
interface ILodge {

   Lodge_isLoading         : boolean ; // 住宿頁資料 _ 是否下載中

   
   lodge_Reservation_Data  : any[]  ;  // 已經預約住宿資料 

   current_Lodge_Type      : string ;  // 目前 : 房型 ( Ex. 大房、中房、小房 )
   current_Lodge_Number    : string ;  // 目前 : 房號 ( Ex. A01、A02、A03)

   current_Lodge_Price_Sum : number ;  // 所選擇房型、日期區間 : 住宿價格總計

   lodge_Check_In_Date     : string ;  // 住房日期     
   lodge_Check_Out_Date    : string ;  // 退房日期     

}

const initState = {

   Lodge_isLoading         : true ,

   lodge_Reservation_Data  : []  ,

   current_Lodge_Type      : '' ,  
   current_Lodge_Number    : '' ,  

   current_Lodge_Price_Sum : 0 ,

   lodge_Check_In_Date     : today ,   
   lodge_Check_Out_Date    : today ,                                   

} ;


const reducer_Lodge = ( state : ILodge = initState , action : any ) => {

    switch( action.type ){

        // // # 設定 _ 該房間，是否在選定的時間內，已被使用
        // case  "SET_IS_ROOM_INUSE" : return { ...state , is_Room_InUse : action.is_Room_InUse } ;

        // # 設定 _ 住宿頁資料 : 是否下載中
        case  "SET_LODGE_ISLOADING" : return { ...state , Lodge_isLoading : action.Lodge_isLoading } ;

        // 設定 _ 已經住宿資料
        case  "SET_LODGE_RESERVATION_DATA" : return { ...state , lodge_Reservation_Data : action.lodge_Reservation_Data } ;

        // 設定 _ 目前房型( Ex. 大、中、小房 )
        case  "SET_CURRENT_LODGE_TYPE" : return { ...state , current_Lodge_Type : action.current_Lodge_Type } ;
        
        // 設定 _ 目前房號( Ex. A01、A02、A03 )        
        case  "SET_CURRENT_LODGE_NUMBER" : return { ...state , current_Lodge_Number : action.current_Lodge_Number } ;

        // 設定 _ 住房日期
        case  "SET_LODGE_CHECK_IN_DATE" : return { ...state , lodge_Check_In_Date : action.lodge_Check_In_Date } ;
      
        // 設定 _ 退房日期
        case  "SET_LODGE_CHECK_OUT_DATE" : return { ...state , lodge_Check_Out_Date : action.lodge_Check_Out_Date } ;

        // 設定 _ 所選擇房型、日期區間 : 住宿價格總計
        case  "SET_CURRENT_LODGE_PRICE_SUM" : return { ...state , current_Lodge_Price_Sum : action.current_Lodge_Price_Sum } ;

        default : return state ;

    }




} ;

export default reducer_Lodge ;
