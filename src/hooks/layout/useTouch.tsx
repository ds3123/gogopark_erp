import { useState } from "react" ;


// 觸控數字按鈕
export const useTocuh_Button_Numbers = ( get_Num : ( x : number ) => void , clear_Num : () => void ) => {

    const arr = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0 ] ;

    const num_Buttons = <div className="absolute" style={{ top:"-70px" , right:"160px" }}>
                             
                           { arr.map( ( x , y ) => 
                                 <b key = { y } className="hover tag is-large m_Right_25 pointer" onClick = { () => get_Num( x ) } > 
                                     { x }
                                 </b> ) 
                           }  
                          
                           <b className="tag is-danger is-light is-large pointer" onClick = { clear_Num }> X </b> 
                        
                        </div>

    return { num_Buttons }
      
} ;