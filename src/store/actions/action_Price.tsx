
import { Dispatch } from "redux";







// # 設定 _ 調整後的價錢：單次洗澡
export const set_Adjust_SingleBath_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                                         dispatch({
                                                    type  : "SET_ADJUST_SINGLE_BATH_PRICE" ,
                                                    price : price
                                                 }) ;

                                      } ;

} ;


// # 設定 _ 調整後的價錢：單次美容
export const set_Adjust_SingleBeauty_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                                        dispatch({
                                                    type  : "SET_ADJUST_SINGLE_BEAUTY_PRICE" ,
                                                    price : price
                                                }) ;

                                      } ;

} ;


// # 設定 _ 調整後的價錢 : 包月洗澡
export const set_Adjust_MonthBath_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                                        dispatch({
                                                    type  : "SET_ADJUST_MONTH_BATH_PRICE" ,
                                                    price : price
                                                }) ;

                                      } ;

} ;



// # 設定 _ 調整後的價錢 : 包月美容
export const set_Adjust_MonthBeauty_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                                        dispatch({
                                                    type  : "SET_ADJUST_MONTH_BEAUTY_PRICE" ,
                                                    price : price
                                                }) ;

                                      } ;

} ;


