/*

  ＠ 寵物個別定價 :
     1.標準價格
     2.個別手動調整  

*/

import { Input } from "templates/form/Input";

// useContext
import { useContext } from "react"
import { SidePanelContext } from "templates/panel/Side_Panel";

import { useSpecies_Name_Prices } from "hooks/data/useSpecies_Prices"


type Status = {
   register : any 
}


const Pet_Prices_Status = ( { register } : Status ) => {

    const value   = useContext( SidePanelContext ) ;              
    const pet     = value.preLoadData ? value.preLoadData : {} ;
    const species = pet?.species ;                            // 品種名稱
    const species_Prices = useSpecies_Name_Prices( species )  // 根據品種名稱，取得該品種基本價格


    const position = { top:"-5px" , left : "10px" } ;

    return <>

              <hr/> <br/>

              <div className="columns is-multiline  is-mobile">

                <div className="column is-12-desktop">
                    <b className="tag is-large is-white">  <i className="fas fa-dollar-sign"></i>&nbsp; 
                     基本價格 ( <span className="fDblue" > &nbsp;{ species }&nbsp;</span>) </b> 
                </div>  

                <div className="column is-offset-1 is-2-desktop">  <span className="fOrange">  初次洗澡 </span> : <b className="fRed"> { species_Prices.bath_First } </b> </div>      
                <div className="column is-2-desktop"> 單次洗澡 : <b className="fRed"> { species_Prices.bath_Single } </b> </div>      
                <div className="column is-2-desktop relative"> 
                      包月洗澡 
                      <span className=" absolute fDblue f_9" style={ position }> ( 4 次洗澡 ) </span>   : 
                      <b className="fRed"> { species_Prices.bath_Month } </b> 
                </div>      
                <div className="column is-2-desktop"> 單次美容 : <b className="fRed"> { species_Prices.beauty_Single } </b> </div>      
                <div className="column is-2-desktop relative"> 
                     包月美容 : 
                     <span className=" absolute fDblue f_9" style={ position }> ( 含 1 大美 ) </span>   : 
                     <b className="fRed"> { species_Prices.beauty_Month } </b> </div>      

                <div className="column is-12-desktop">
                    <b className="tag is-large is-white">  <i className="fas fa-dollar-sign"></i> &nbsp; 個別調整 </b>
                </div>  

             </div>

             <div className="columns is-multiline  is-mobile relative" style={{ left : "90px" }}>

                <Input type="number"  name="price_Single_Bath"  label="單次洗澡"  register={ register }  error={ null }
                                    icon="fas fa-shower" asterisk={false} columns="2" />

            
                <Input type="number"  name="price_Month_Bath"  label="包月洗澡"  register={ register }  error={ null }
                                    icon="fas fa-shower" asterisk={false} columns="2" note="4 次洗澡" />

                <div className="column is-1-desktop"></div>    

                <Input type="number"  name="price_Single_Beauty"  label="單次美容"  register={ register }  error={ null }
                                    icon="fas fa-cut" asterisk={false} columns="2" />

                <Input type="number"  name="price_Month_Beauty"  label="包月美容"  register={ register }  error={ null }
                                    icon="fas fa-cut" asterisk={false} columns="2" note="含 1 大美"  />                    

             </div>

                                
             <hr/>
    
           </> 
           
           

} ;

export default Pet_Prices_Status 
       



