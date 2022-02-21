
import moment from "moment" ;


/* @ 服務單 _ 基本資料 ( 服務性質、處理碼、到店日期 ... ) */

interface IInfo {

   service_Status : string ;  // 服務狀態 : 已到店、預約_今天、預約_未來 
   service_Date   : string ;  // 到店(服務)日期 _ 預設 : 今日

   current_Q_Code : string ;  // 目前所選擇的 Q code

}

const initSate =  {

    service_Status : "已到店" ,
    service_Date   : moment( new Date() ).format('YYYY-MM-DD' ) ,

    current_Q_Code : "" ,

} ;


const reducer_Info = (state : IInfo = initSate , action : any )=>{

    switch( action.type ) {

        // 設定 _ 目前所選擇的 Q code
        case "SET_CURRENT_Q_CODE" : return { ...state , current_Q_Code : action.data } ;

        // 設定 _ 各欄位基本資料
        case action.type          : return { ...state , [ action.type ] : action.data } ;

        default : return state ;

    }

};

export default reducer_Info