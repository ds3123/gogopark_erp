

import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";



// @ 尚未支援手機版本 ( 手機版面時顯示 )
const Not_Support_Mobile = () => {


   const lS = {  width:"300px" , height : "100px"  } as const ; 

   return <div className="columns is-mobile is-multiline is-hidden-desktop">

            <div className="column is-12-mobile has-text-centered">
                <br/><br/>
                    <Link to ="/"> <img src={ logo } width='350px' style={ lS }/> </Link>
                <br/><br/><br/>
                <b className="tag is-large is-danger"> <i className="far fa-smile-beam" style={{ fontSize : "22pt" }}></i> &nbsp; 目前尚未支援手機版本 </b>
            </div>
         
          </div>

} ;

export default Not_Support_Mobile
       