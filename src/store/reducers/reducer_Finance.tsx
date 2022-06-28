


/* @ 管理區 > 財務管理  */
interface IFinance {

   finance_Query_Date_Type : string ;  // "特定日期" 的 其他收支項目


}

const initState = {

    finance_Query_Date_Type : '付款日期' ,


} ;


const reducer_Finance = ( state : IFinance = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 財務管理下，各報表查詢日期的類型
        case  "SET_FINANCE_QUERY_DATE_TYPE" : return { ...state , finance_Query_Date_Type : action.finance_Query_Date_Type } ;
        
       
        
        default : return state ;

    }

} ;

export default reducer_Finance ;
