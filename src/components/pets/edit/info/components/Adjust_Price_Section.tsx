
import Adjust_Price_Input from "components/pets/edit/info/components/Adjust_Price_Input"
import { ISpecies_Prices } from "utils/Interface_Type"
import {  set_Adjust_SingleBath_Price , 
          set_Adjust_SingleBeauty_Price ,
          set_Adjust_MonthBath_Price ,
          set_Adjust_MonthBeauty_Price
       } from "store/actions/action_Price"
import { useDispatch } from "react-redux";



/*

  @ 調整寵物品種基本價格區塊

*/

type Section = {

   setValue : any ; 
   species_Prices : ISpecies_Prices ;

}

const Adjust_Price_Section = ( { setValue , species_Prices } : Section ) => {

   const dispatch = useDispatch() ;

   // 取得品種基本價格
   const { bath_Single , bath_Month , beauty_Single , beauty_Month } = species_Prices ; 



   // 計算要設定的金額
   const calc_Diff = ( service_Price : number , diff_Num : number , is_Percentage : boolean ) => {
          
        // 百分比計算
        if( is_Percentage ) return service_Price + ( service_Price * diff_Num )

        // 加減計算
        return service_Price + diff_Num 

   } ;


   // 設定 _ 欄位值 : 單次洗澡
   const set_SingleBath = ( num : number , is_Percentage : boolean ) => {

     const ammount = calc_Diff( bath_Single , num , is_Percentage ) ;
   
     dispatch( set_Adjust_SingleBath_Price( ammount ) ) ;
     setValue( "price_Single_Bath" , ammount ) ;

    } 


   // 設定 _ 欄位值 : 包月洗澡
   const set_MonthBath = ( num : number , is_Percentage : boolean ) => {

      const ammount = calc_Diff( bath_Month , num , is_Percentage ) ;
    
      dispatch( set_Adjust_MonthBath_Price( ammount ) ) ;
      setValue( "price_Month_Bath" , ammount ) ;

   } 


   // 設定 _ 欄位值 : 單次美容
   const set_SingleBeauty = ( num : number , is_Percentage : boolean ) => {

      const ammount = calc_Diff( beauty_Single , num , is_Percentage ) ;
      
      dispatch( set_Adjust_SingleBeauty_Price( ammount ) ) ;
      setValue( "price_Single_Beauty" , ammount ) ;

   } 

    // 設定 _ 欄位值 : 包月美容
    const set_MonthBeauty = ( num : number , is_Percentage : boolean ) => {

        const ammount = calc_Diff( beauty_Month , num , is_Percentage ) ;
        
        dispatch( set_Adjust_MonthBeauty_Price( ammount ) ) ;
        setValue( "price_Month_Beauty" , ammount ) ;
  
     } 
    
 
     
   return  <div className="columns is-multiline is-mobile relative m_Top_10 m_Bottom_70" >

              { /* 單次洗澡 */ }
              <div className="column is-offset-3 is-2-desktop relative"> 
                   
                   <Adjust_Price_Input set_Price_Info = { set_SingleBath } />

              </div>

              { /* 包月洗澡 */ }
              <div className="column is-2-desktop relative"> 
                   
                   <Adjust_Price_Input set_Price_Info = { set_MonthBath } />

              </div>
              
              { /* 單次美容 */ }
              <div className="column is-2-desktop relative"> 
                   
                   <Adjust_Price_Input set_Price_Info = { set_SingleBeauty } />

              </div>


              { /* 包月美容 */ }
              <div className="column is-2-desktop relative"> 
                   
                   <Adjust_Price_Input set_Price_Info = { set_MonthBeauty } />

             </div>

            </div>  


} ;


export default Adjust_Price_Section
       