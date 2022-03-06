

// @ 測試練習用 ( 2022.03.06 )
import { addTwoNumbers } from "./math"



export default class Counter{

    count ;
 
    constructor(){

      this.count = 0 ;

    }

    // count 的值，透過 ajax 從資料庫取得 
    async setCountFromDatabase(){

       const response  = await fetch( 'https://url/count' ) ;
       const { count } = await response.json() ;
       this.count = count ;

    }

    increment(){

       this.count += 1  ;

      // this.count = addTwoNumbers( this.count , 1 ) ;

    }

}