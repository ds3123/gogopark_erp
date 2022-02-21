import React from "react" ;


/* @ 洗澡項目  */
interface IBath {

    Bath_Price : number ;

}

const initState = {

    Bath_Price : 0 ,  // 洗澡價格

} ;


const reducer_Bath = ( state : IBath = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 洗澡價格
        case  "SET_BATH_PRICE" : return { ...state , Bath_Price : action.price } ;

        default : return state ;

    }


} ;

export default reducer_Bath ;
