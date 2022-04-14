


// 取得給定數值之間，隨機整數
export const get_RandomInt = ( max : number ) =>{

    return Math.floor( Math.random() * Math.floor( max ) );

};


// 取得時間戳記 _ 最後 5 碼
export const get_TimeStamp_5 = ( ) =>{

   const time = new Date().getTime();   
   return time.toString().slice( -5 ) ;


};



