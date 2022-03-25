import { useState , FC } from "react";

type Search = {
   get_Search_Text : ( text : string ) => void ;  // 取得 _ 搜尋框輸入文字
}


// @ 搜尋框
const SearchBar : FC< Search > = ( { get_Search_Text } ) => {

   const [ text , set_Text ] = useState( '' ) ;

   // 輸入資料變化
   const handleChange = ( e : any ) => {

      const value = e.target.value ;

      set_Text( value ) ;

      get_Search_Text( value ) ;  // 回傳父元件，所輸入文字
      

   } ;

   return <div className="field has-addons">

            <span className="control is-expanded">

                <input type        = "text"
                       className   = "input"
                       placeholder = "請輸入搜尋關鍵字 ..."
                       value       = { text }
                       onChange    = { e => handleChange(e) } />

            </span>

            <span className="control"> <button className="button"> <i className="fas fa-search"></i> </button> </span>

          </div>

};

export default SearchBar;