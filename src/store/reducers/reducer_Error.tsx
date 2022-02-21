import React from "react" ;


/* @ 服務異常  */
interface IError {

    error_Delete_By_Date : any[] ;   // 特定日期資料 : 異常 + 銷單

}

const initState = {

    error_Delete_By_Date : []
  

} ;


const reducer_Error = ( state : IError = initState , action : any ) => {

    switch( action.type ){


         // # 取得 _ 特定日期資料 : 異常 + 銷單
         case  "GET_ERROR_DELETE_BY_DATE" :  return { ...state , error_Delete_By_Date : action.error_Delete_By_Date } ;
       

        default : return state ;

    }

} ;

export default reducer_Error ;
