
type Plan_Sign = {

    is_return     : number ; 
    return_status : string ;

}



// @  申請退費標示  
const Plan_Sign = ( {  is_return , return_status  } : Plan_Sign ) => {


    const star = { top:"5px", left:"-20px" , color:"red" } ;

    return  <b className="absolute f_9" style={ star }>
               { ( is_return === 1 && return_status ) && <span> { return_status }  </span> }
             </b>

} ;

export default Plan_Sign
       