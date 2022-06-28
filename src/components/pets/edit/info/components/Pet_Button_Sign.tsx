
import is_Dead_Pic from 'imgs/is_dead_red.png'
import { usePet_With_Plans } from 'hooks/data/usePet'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { check_Plan_Done } from 'utils/data/check_data'


type Sign = {

  pet : any ;     // 特定寵物

}


// @ 寵物按鈕中，該寵物相關標示 ( Ex. 拒接、有方案、有風險( 未滿週歲 / 老狗 )、已死亡 ... )
const Pet_Button_Sign = ( { pet } : Sign ) => {

  

   // 特定寵物，所有的方案
   const pet_Plans = usePet_With_Plans( pet?.serial ) ;


   // 依照該寵物相關方案中，若仍有可使用次數，即顯示方案 icon
   const [ is_Show_Plan , set_Is_Show_Plan ] = useState( false ) ;


   // 目前所點選 : 新增標籤
   const current_Tab = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;



   // 設定 _ 是否顯示 : 方案 icon
   useEffect( () => {
         
      if( pet_Plans.length > 0 ){

          let arr : any[] = [] ;

          pet_Plans.forEach( ( x : any ) => {

              const p_Type    = x?.plan_type ;          // 方案類型  
              const u_Records = x?.plan_used_records ;  // 方案使用紀錄
              const c_Plan    = x?.custom_plan ;        // 自訂方案內容  

              arr.push( check_Plan_Done( p_Type , u_Records , c_Plan , current_Tab ) ) ;

          }) ;

          // 只要該寵物方案中，仍有未使用方案，即可顯示方案 icon
          set_Is_Show_Plan( arr.includes( false ) ? true : false ) ;

      }

      
   } , [ pet_Plans , current_Tab ] ) ;



   return <div className="absolute" style={{ width:"100%", left:"0px" , top:"-25px" }}>

            { /* 方案 */ }
            { is_Show_Plan && <i className = "fas fa-file-alt fBlue m_Right_10 f_13"></i> }  

            { /* 拒接 */ } 
            { pet?.is_rejected === 1 && <i className="fas fa-ban fRed m_Right_10 f_13"></i>  }
              
            { /* 已經過世 */ }
            { pet?.is_dead === 1 && <img className="relative" src={ is_Dead_Pic } width='28px' style={{ top:'-3px' }} /> }

          </div>  


} ;

export default Pet_Button_Sign
       