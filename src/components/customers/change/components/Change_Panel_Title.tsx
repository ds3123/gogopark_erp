

type Panel_Title = {

    pet                     : any ;     // 寵物資訊
    is_Change_Owner         : boolean ; // 是否點選：更換主人
    click_Show_Change_Owner : () => void

}


// @ 更換主人面板標題列
const Change_Panel_Title = ( { pet , is_Change_Owner , click_Show_Change_Owner } : Panel_Title ) => {


   return <>    

                <label className="label relative m_Bottom_40" style={{ left:"3%" }}>

                    <i className="fas fa-dog"></i> &nbsp;寵物 : <span className="fDred"> { pet.name } ( { pet.species } ) </span>
               
                </label> 


                <label className="label relative m_Bottom_40" style={{ left:"3%" }}>

                    <i className="fas fa-user"></i> &nbsp;主人 &nbsp; 

                    <b className={ `tag hover relative pointer is-medium ${ is_Change_Owner ? 'is-warning' : '' }` } style={{ top:"-3px" }}
                       onClick={ () => click_Show_Change_Owner() } >  <i className="fas fa-sync" style={{ fontSize:"6pt" }}></i> &nbsp; 更換主人
                    </b>

                   { is_Change_Owner &&  
                            <span className="fGreen f_12 m_Left_20"> 
                               <i className="fas fa-exclamation f_12 m_Right_10"></i>
                                此處不更換 _ 該寵物在原先主人下，所進行各種服務( 例如：洗澡、美容 ) 中，所標示的主人訊息．
                            </span>
                    }

                </label> 
   
          </>  

} ;

export default Change_Panel_Title
       