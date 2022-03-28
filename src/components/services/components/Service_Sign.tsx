

/*

  @ 服務相關標示 : 異常、銷單、是否付費、申請退費

*/

import { FC } from 'react' ;

type Sign = {

    is_error       : number ;
    is_delete      : number ;
    amount_payable : number ;
    amount_paid    : number ;
    is_return      : number ;
    return_status  : string ;

}

const Service_Sign : FC<Sign> = (  { is_error , is_delete , amount_paid , amount_payable , is_return , return_status } ) => {


   const tag = { top : "-7px", left : "5px" , color : "red" } ; 

   return <>
                { /* 異常標示 */ }
                 <b className="absolute" style={ tag }>
                     { is_error === 1 &&  <i className="fas fa-exclamation-triangle"></i> }
                 </b>

                 { /* 銷單標示 */ }
                 <b className="absolute" style={ tag }>
                     { is_delete === 1 &&  <i className="fas fa-trash-alt"></i> }
                 </b>

                 { /* 是否付費標示 */ }
                 <b className="absolute f_14" style={{ top:"17px", left:"8px" , color:"red" }}>
                     { amount_payable !== amount_paid  &&  <i className="fas fa-dollar-sign"></i> }
                 </b>

                 { /* 申請退費標示  */ }
                 <b className="absolute f_9" style={{top:"-10px", left:"-25px" , color:"red"}}>
                     { ( is_return === 1 && return_status ) && <span> { return_status }  </span> }
                 </b>
          </>

} ;

export default Service_Sign
       