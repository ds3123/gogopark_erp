
import { Dispatch } from "redux";



// # 設定 _ 基礎 : 共計價格
export const set_BasicSumPrice = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

                                        dispatch({
                                                           type  : "SET_BASIC_SUM_PRICE" ,
                                                           price : price
                                                         }) ;

                                      } ;

} ;




// 將基礎所有狀態，設回 _ 初始值
export const set_Basic_States_To_Default = (  ) => {

  return ( dispatch : Dispatch ) => { 

           dispatch({ type : "SET_BASIC_STATES_TO_DEFAULT" }) ;

         } ;

} ;
