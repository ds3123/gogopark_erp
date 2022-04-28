
import is_Dead_Pic from 'imgs/is_dead_red.png'



type Sign = {

  pet : any ;  

}



// @ 寵物按鈕中，該寵物相關標示 ( Ex. 拒接、有方案、有風險( 未滿週歲 / 老狗 )、已死亡 ... )
const Pet_Button_Sign = ( { pet } : Sign ) => {





   return <div className="absolute" style={{ width:"100%", left:"0px" , top:"-25px" }}>

              { /* 拒接 */ } 
              { pet?.is_rejected === 1 &&  <i className="fas fa-ban fRed m_Right_5 f_13"></i>  }
            
              
              { /* 已經過世 */ }
              { pet?.is_dead === 1 &&  <img className="relative" src = { is_Dead_Pic } width='28px' style={{ top:'-3px' }} /> }

          </div>  


} ;

export default Pet_Button_Sign
       