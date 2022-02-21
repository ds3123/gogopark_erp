import { useState } from "react" ;


// @ 可搜尋類型提示 ( Ex. 客戶姓名、客戶身分證字號 .... )
const Search_Type_Note = ( { search_Types } : { search_Types : string[] } ) => {

  // 是否顯示 : 可搜尋類型提示 
  const [ is_Show_Note , set_Is_Show_Note ] = useState( false ) ;
  
  // 可搜尋類別字串
  const search_Type_Str = search_Types.join( ' 、 ' ) ; 

  // 點選 _ 顯示提示字串
  const click_Note = () => set_Is_Show_Note( !is_Show_Note ) ;

  
  return <div className="m_Bottom_5">     

              <b className= { is_Show_Note ? 'f_14 fGreen' : 'f_14' }  onClick={ click_Note }> <i className="fas fa-info-circle pointer m_Right_5"></i> </b>  

              { is_Show_Note &&   
                 <> 
                    可搜尋類別 : 
                    <div className="relative m_Left_30"> 
                        <b className="fDblue"> { search_Type_Str } </b> 
                    </div>
                 </>
              }  

          </div>   

} ;


export default Search_Type_Note
       