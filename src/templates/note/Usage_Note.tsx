import { useState } from "react" ;


// @ 顯示 _ 該區塊、功能使用說明 ( 文字 )
const Usage_Note = (  { note } : { note : string } ) => {

  // 是否顯示 _ 提示字串  
  const [ is_Show_Note , set_Is_Show_Note ] = useState( false ) ;
  
  // 點選 _ 顯示提示字串
  const click_Note = () => set_Is_Show_Note( !is_Show_Note ) ;

  return <div className="m_Bottom_5">     

              <b className={ is_Show_Note ? 'f_14 fGreen' : 'f_14' }  onClick={ click_Note }> 
                     <i className="fas fa-info-circle pointer m_Right_5"></i> 
              </b>  

              { is_Show_Note && <b className="fDblue m_Left_10"> 
                                     { note }
                                </b>
              }  

        </div>   
  
} ;

export default Usage_Note
       
