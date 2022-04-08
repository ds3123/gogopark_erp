import { useState } from "react";
import { useSelector } from "react-redux";


// useContext
import { useContext } from "react"
import { SidePanelContext } from "templates/panel/Side_Panel";

import { useSpecies_Name_Prices } from "hooks/data/useSpecies_Prices" ;

import Species_Default_Prices from "components/pets/edit/info/components/Species_Default_Prices" ;
import Adjust_Price_Section from "components/pets/edit/info/components/Adjust_Price_Section" ;
import Species_Adjust_Prices from "components/pets/edit/info/components/Species_Adjust_Prices" ;
import Price_Difference_Info from "components/pets/edit/info/components/Price_Difference_Info" ;



/*

  ＠ 寵物個別定價 :
     1.標準價格
     2.個別手動調整 ( 加減、百分比 )
     3.調整後價格  

*/



type Status = {
   register : any ;
   setValue : any ;
}



const Pet_Prices_Status = ( { register , setValue } : Status ) => {

    const value          = useContext( SidePanelContext ) ;              
    const pet            = value.preLoadData ? value.preLoadData : {} ;
    const species        = pet?.species ;                                // 品種名稱
    const species_Prices = useSpecies_Name_Prices( species )             // 根據品種名稱，取得該品種基本價格

    const [ is_Show_Adjust , set_Is_Show_Adjust  ] = useState( false ) ; // 是否顯示：調整金額輸入框
   

    return <div className="relative">

              <hr/> <br/>

              { /* 是否顯示：調整金額輸入框  */ }
              <b className = { `absolute tag is-medium is-rounded pointer ${ is_Show_Adjust ? "is-primary" : "hover" }` } 
                 style     = {{ top : "110px" , right:"50px" , zIndex :200 } }
                 onClick   = { () => set_Is_Show_Adjust( !is_Show_Adjust ) } >  <i className="fas fa-calculator"></i> </b>

              { /* 品種標準價格  */ }
              <Species_Default_Prices species = { species } species_Prices = { species_Prices } /> 
             
              { /* 調整金額輸入框 */ }
              { is_Show_Adjust &&
                 <Adjust_Price_Section species_Prices = { species_Prices } setValue = { setValue } />
              }

              { /* 調整後金額 */ }
              <Species_Adjust_Prices register = { register } />
             
              { /*  調整差價顯示資訊  */ }
              { is_Show_Adjust || 
                 <Price_Difference_Info species_Prices = { species_Prices } />
              }

              <br/> <hr/>
    
           </div> 
           
           
} ;

export default Pet_Prices_Status 
       



