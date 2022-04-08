
import { ISpecies_Prices } from "utils/Interface_Type" ;


/*

   ＠ 寵物品種基本價格 :
      1. 初次洗澡
      2. 單次洗澡
      3. 包月洗澡
      4. 單次美容
      5. 包月美容

*/


type Defaut = {

   species        : string ; 
   species_Prices : ISpecies_Prices ;

}



const Species_Default_Prices = ( { species , species_Prices } : Defaut ) => {

 
    const position = { top:"-5px" , left : "10px" } ;
    const columns  = "columns is-multiline is-mobile relative" ;

    return <>
    
              <b className="tag is-large is-white m_Bottom_30">  
                  <i className="fas fa-dollar-sign"></i>&nbsp;品種標準價格 ( <span className="fDblue" > &nbsp;{ species }&nbsp;</span>) 
              </b> 

              <div className={ columns } >

                <div className="column is-offset-1 is-2-desktop">  <span className="fOrange">  初次洗澡 </span> : <b className="fRed"> { species_Prices.bath_First } </b> </div>      
                <div className="column is-2-desktop"> 單次洗澡 : <b className="fRed"> { species_Prices.bath_Single } </b> </div>      
                <div className="column is-2-desktop relative"> 
                        包月洗澡 
                        <span className=" absolute fDblue f_9" style={ position }> ( 4 次洗澡 ) </span>   : 
                        <b className="fRed"> { species_Prices.bath_Month } </b> 
                </div>   
                <div className="column is-2-desktop"> 單次美容 : <b className="fRed"> { species_Prices.beauty_Single } </b> </div>      
                <div className="column is-2-desktop relative"> 
                    包月美容 
                    <span className=" absolute fDblue f_9" style={ position }> ( 含 1 大美 ) </span>   : 
                    <b className="fRed"> { species_Prices.beauty_Month } </b> 
                </div>      

              </div>
               
          </>
    
    
} ;

export default Species_Default_Prices 
       