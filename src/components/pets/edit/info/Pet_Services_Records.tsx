
import React, { useState , useEffect , FC , useMemo  } from "react" ;
import { useDispatch, useSelector } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Service_Records from "components/services/edit_components/Service_Records";
import useServiceType from "hooks/layout/useServiceType";
import { Service_Type } from "utils/Interface_Type"

// Redux
import { set_Bath_Price } from "store/actions/action_Bath"
import { set_Beauty_Price } from "store/actions/action_Beauty"
import { useSpecies_Id_Prices } from "hooks/data/useSpecies_Prices"
import { set_Current_Create_Service_Type } from "store/actions/action_Service"


// @ 顯示 _ 該 "寵物" 過去各種服務 ( 基礎、洗澡、美容 ) 紀錄 --> 顯示在 : 標題列右上方
const Pet_Services_Records : FC< { current : Service_Type }> = ( { current } ) => {

    const dispatch = useDispatch() ;
    const [ type_Price , set_Type_Price ] = useState( 0 ) ;

    // 目前寵物在特定服務 ( 基礎、洗澡、美容 ) 的紀錄
    const service_Records    = useSelector( ( state : any ) => state.Pet.current_Pet_Service_Records )

    // 目前新增的服務類型 : 初次洗澡優惠、單次洗澡、單次美容 ( Redux )
    const price_Type         = useSelector( ( state : any ) => state.Service.current_Create_Service_Type ) ;

    // 目前寵物資料 > 品種 ( 品種 id / 下拉選單 )
    const current_Species_Id = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;

    // 特定品種的所有類型 : 服務價格
    const species_Prices     = useSpecies_Id_Prices( current_Species_Id ) ;

    // 目前所點選寵物資料
    const current_Pet  = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
    const cur_Pet_Name = current_Pet ? current_Pet['name'] : ''  // 寵物名字
    
    // 服務單欄位 _ 顏色、Icon
    const { color , icon } = useServiceType( current , false , 'medium' ) ;

   
    // 判斷、設定 _ 目前新增的 : 服務價格 & 服務類型( 初次洗澡優惠、單次洗澡、單次美容 )
    useEffect( () : any => { 
   
      // 初次洗澡
      if( current === '洗澡' && service_Records.length === 0 ){    
         
         set_Type_Price( species_Prices['bath_First'] ) ;
         dispatch( set_Current_Create_Service_Type( "初次洗澡優惠" ) ) ;     
         dispatch( set_Bath_Price( species_Prices['bath_First'] ) ) ;    

         return false

      }

      // 單次洗澡
      if( current === '洗澡' && service_Records.length > 0  ){

         set_Type_Price( species_Prices['bath_Single'] ) ;
         dispatch( set_Current_Create_Service_Type( "單次洗澡" ) ) ;           
         dispatch( set_Bath_Price( species_Prices['bath_Single'] ) ) ;  

      }

      // 單次美容
      if( current === '美容' ){ 
         
         set_Type_Price( species_Prices['beauty_Single'] ) ;
         dispatch( set_Current_Create_Service_Type( "單次美容" ) ) ;
         dispatch( set_Beauty_Price( species_Prices['beauty_Single'] ) ) ; 

      }
    
    } , [ species_Prices , current_Species_Id ] ) ;


    
    // 點選 _ 顯示過去紀錄
    const click_Tab = ( ) => {

        dispatch( set_Modal( true ,
                                   <Service_Records type="寵物" /> ,
                                   { 
                                     modal_Style : { width:"90%" , left : "5%" } ,
                                     current_Tab : current 
                                   }
                            )) ;
 
    } ;
 

    const style = { top : "-38px", left:"140px" , width:"70%", height:"35px" } ;
    const tag   = "tag is-medium is-light is-success pointer" ;

    return <>
    
               { /* 僅基礎、洗澡、美容顯示 2021.11.08 */ }

               { ( current_Pet && ( current === "基礎" || current === "洗澡" || current === "美容" ) ) &&

                  <div className="absolute" style={ style } onClick={ click_Tab } >

                    <b className={ color + " pointer" }  >

                        <i className = { icon } ></i> &nbsp; &nbsp;
                        <b className="f_12 fDblue"> { cur_Pet_Name } </b>        
                        <b className="fDblue"></b> 
                        &nbsp; 過去 { current } 紀錄 ( 共 { service_Records.length } 筆 ) &nbsp;
                        
                        {( price_Type && ( current === "洗澡" || current === "美容" ) ) && <> / &nbsp; 計價類型 : &nbsp;
                                          <b className="tag fDblue is-white is-rounded f_11"> &nbsp;
                                           { price_Type } &nbsp; : <b className="fRed"> &nbsp; ${ type_Price }  </b> </b>  
                                        </> }

                    </b>

                  </div>

               }    

           </>

} ;


export default React.memo( Pet_Services_Records , ( prevProps , nextProps ) => prevProps === nextProps ? true : false ) 
       