

import React from "react"

/*

    @  評分星等符號、參與評分人數 ( for 客戶 、寵物 )

       參數 :
         average_Rating --> 平均等級 ( 1 ~ 5 等 )
         samples_Sum    --> 評分樣本數 ( 幾個人參與評分 )

*/
export const useRating_Sign = ( average_Rating : number , samples_Sum  : number ) => {

    let star_Style : any ;

    switch( average_Rating ){

        case 0 : star_Style =  <i className="fas fa-star" style={ { color : "red" } }></i> ; break;
        case 1 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "red" } }></i> ; break;

        case 2 : star_Style =  <i className="fas fa-star" style={ { color : "rgb(255,227,50)" } }></i> ; break;
        case 3 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "rgb(255,227,50)" } }></i> ; break;

        case 4 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "limegreen" } }></i> ; break;
        case 5 : star_Style =  <i className="fas fa-star" style={ { color : "limegreen" } }></i> ; break;

    }

    // 評分標示
    return <span> { star_Style }  <br/> <b> { samples_Sum } </b> </span> ;

} ;


/*

   @ 評分表單選項 ( for 櫃台人員、美容師 )

     參數 :
         title    : 欄位區塊名稱
         colName  : 選項欄位名稱
         register : React Hook Form 的 useForm() 產生，用以註冊欄位

*/
export const useRating_Options = ( title : string , colName : string , register : any , setValue? : any ) => {


    if( setValue ) setValue( colName , "3" ) ;  // 預設值


    return <>  
     
             <div className="column is-12-desktop" >

                <i className="far fa-star"></i>&nbsp;<b className="tag is-medium is-white"> { title } : </b> &nbsp; &nbsp;

                <input type="radio" value = "0"    { ...register( colName ) } /> <b style={{color:"rgb(200,0,0)"}}>拒接</b> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
                <input type="radio" value = "1"    { ...register( colName ) } /> 1    &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" value = "2"    { ...register( colName ) } /> 2    &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" value = "3"    { ...register( colName ) } /> 3    &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" value = "4"    { ...register( colName ) } /> 4    &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" value = "5"    { ...register( colName ) } /> 5

            </div>
            
        
          </>


} ;

