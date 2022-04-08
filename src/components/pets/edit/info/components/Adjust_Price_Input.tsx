

import { useState } from "react";


/*

   @ 依照寵物品種基本價格，調整金額

*/


type Adjust = {

    set_Price_Info : ( num : number ,  is_Percentage  : boolean ) => void ; 

}


type Diff = "" | number ;


const Adjust_Price_Input = ( { set_Price_Info  } : Adjust ) => {


        const [ dirr_Str , set_Diff_Str ]           = useState( "" ) ; 
 
        // 調整金額  
        const [ adjust_Amount , set_Adjust_Amount ] = useState< Diff >( '' ) ; 

        // 增
        const [ is_Plus , set_Is_Plus ]             = useState( true ) ;
        
        // 減
        const [ is_Minus , set_Is_Minus ]           = useState( false ) ;

        // 百分比 / 折扣
        const [ is_Percentage , set_Is_Percentage ] = useState( false ) ;


        // 點選 ＋ 
        const click_Plus = () => {
            set_Adjust_Amount( "" ) ;
            set_Is_Plus( !is_Plus ) ;
            set_Is_Minus( false ) ;
        } ;

        // 點選 -
        const click_Minus = () => {
            set_Adjust_Amount( "" ) ;
            set_Is_Minus( !is_Minus ) ;
            set_Is_Plus( false ) ;
        } ;

        // 點選 ％
        const click_Percentage = () => {
            set_Adjust_Amount( "" ) ;
            set_Is_Percentage( !is_Percentage ) ;
        } ;


        // 差價標示
        const get_Diff_Str = ( num : number  ) => {
       
            if( !num )     return "" ;
            if( !is_Percentage && is_Minus ) return "- "+num.toString() ;
            if( is_Percentage && is_Minus )  return "- "+num.toString()+" %" ; 
            if( is_Percentage && num > 0 )   return "+ "+num.toString()+" %" ;

            return "+ "+num.toString()

        } ;


        // 加、減、百分比計算
        const calc_Amount = ( num : number ) => {
    
            if( !num ) return 0 ;
        
            // 轉為負數
            if( !is_Percentage && is_Minus ) 
                return Math.abs( num ) * -1 ; 
        
            // 轉為百分比    
            if( is_Percentage && !is_Minus && ( is_Plus|| num > 0 ) ) return num / 100  ;     
                
            // 轉為負數、百分比    
            if( is_Percentage && !is_Plus &&is_Minus ) return ( num / 100 ) * -1  ; 
            
            return num 
        
        } ; 


        // 變動處理
        const handle_Adjust = ( num : number ) => {

            // 設定金額
            set_Adjust_Amount( num ? num : '' ) ;

            // 說明字串
            set_Diff_Str( get_Diff_Str( num ) ) ;


            // 回傳：調整金額 
            set_Price_Info( calc_Amount(  num ? num : 0 ) , is_Percentage ) ;
        
        } ;

    
    return <div className="relative">

                { /* 計算方式 */ }
                <div className="m_Bottom_10">

                    <b className = { `tag pointer ${ is_Plus ? "is-link" : "" }` } 
                    onClick   = { click_Plus } > 
                        + 
                    </b> &nbsp;&nbsp;

                    <b className = { `tag pointer ${ is_Minus ? "is-link" : "" }` } 
                    onClick   = { click_Minus } >
                        - 
                    </b> &nbsp; / &nbsp;

                    <b className = { `tag pointer ${ is_Percentage ? "is-primary" : "" }` }  
                    onClick   = { click_Percentage } > 
                        % 
                    </b>

                </div>
 
                { /* 調整金額欄位  */ }
                <div className="control has-icons-left" >

                        <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                            
                            <input type      = "number" 
                                   className = "input" 
                                   min       = "0"
                                   value     = { adjust_Amount }
                                   onChange  = { e => handle_Adjust( parseInt( e.target.value ) ) } />  

                </div>


                { dirr_Str && 

                    <b className = { `tag ${ dirr_Str.includes( "+" ) ? "is-success" : "is-danger" } absolute is-rounded` } 
                                style={{ top:"105px" , left:"27%" }} > 
                                
                                { dirr_Str }

                    </b>

                 }


           </div>

} ;

export default Adjust_Price_Input
       