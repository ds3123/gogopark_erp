
import axios from "utils/axios";


 // 取得資料、設定 State
 export const set_State = ( api : string , set_State : any ) => {

    axios.get( api ).then( res => {

       set_State( res.data ) ;

    }) ;

 }