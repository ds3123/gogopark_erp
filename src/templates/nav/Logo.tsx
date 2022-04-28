
import logo  from 'imgs/logo.png';


// # 導覽列 Logo
const Logo = () => {


   const lS = { position : "relative" , top:"15px" , width:"300px" , height : "100px"  } as const ;

  return <div className="navbar-brand" style={{ marginRight:"80px" }}>

              <img src={ logo } width='350px' style={ lS }/>

              { /* Menu_Icon ( Mobile ) */ }
              <div className="navbar-burger burger" data-target="navbarExampleTransparentExample" >
                  <span></span> <span></span> <span></span>
              </div>

          </div>

} ;

export default Logo ;