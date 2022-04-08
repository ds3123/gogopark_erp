

import React from "react" ;


/* @ 價格  */
interface IPrice {

   // 調整後價格  
   adjust_Single_Bath   : number ;  // 單次洗澡
   adjust_Single_Beauty : number ;  // 單次美容
   adjust_Month_Bath    : number ;  // 包月洗澡
   adjust_Month_Beauty  : number ;  // 包月美容

}

const initState = {

   adjust_Single_Bath   : 0 ,
   adjust_Single_Beauty : 0 , 
   adjust_Month_Bath    : 0 ,
   adjust_Month_Beauty  : 0 

} ;


const reducer_Price = ( state : IPrice = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 調整後價格 : 單次洗澡 
        case  "SET_ADJUST_SINGLE_BATH_PRICE" : return { ...state , adjust_Single_Bath : action.price } ;
        
        // # 設定 _ 調整後價格 : 單次美容 
        case  "SET_ADJUST_SINGLE_BEAUTY_PRICE" : return { ...state , adjust_Single_Beauty : action.price } ;
        
       
        // # 設定 _ 調整後價格 : 包月洗澡 
        case  "SET_ADJUST_MONTH_BATH_PRICE" : return { ...state , adjust_Month_Bath : action.price } ;
      
        // # 設定 _ 調整後價格 : 包月美容
        case  "SET_ADJUST_MONTH_BEAUTY_PRICE" : return { ...state , adjust_Month_Beauty : action.price } ;
        
       
        default : return state ;

    }


} ;

export default reducer_Price ;
