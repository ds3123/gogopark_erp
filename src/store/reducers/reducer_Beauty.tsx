import React from "react" ;


/* @ 洗澡項目  */
interface IBeauty {

    Beauty_Price : number ;

}

const initState = {

    Beauty_Price : 0 ,  // 美容價格

} ;


const reducer_Beauty = ( state : IBeauty = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 美容價格
        case  "SET_BEAUTY_PRICE" : return { ...state , Beauty_Price : action.price } ;

        default : return state ;

    }


} ;

export default reducer_Beauty ;
