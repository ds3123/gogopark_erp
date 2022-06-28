


type Sign = {

    is_error       : number ;
    is_delete      : number ;
    amount_payable : number ;
    amount_paid    : number ;
   
}



// @ 首頁服務列 : 服務相關標示 ( 異常、銷單、是否付費 ) 
const Service_Sign = ( { is_error , is_delete , amount_paid , amount_payable } : Sign  ) => {


     const sign   = { top:"5px" , right:"0px" , color:"red" } ;
     const dollar = { top:"17px", left:"0px" , color:"red" , zIndex:2 } as const ;


     // 是否付費
     const is_Unpaid = ( amount_payable !== null && amount_paid !== null ) && amount_payable !== amount_paid


     return <>

               { /* 異常 */ }
               <b className="absolute" style={sign}>
                  { is_error === 1 &&  <i className="fas fa-exclamation-triangle"></i> }
               </b>

               { /* 銷單 */ }
               <b className="absolute" style={sign}>
                  { is_delete === 1 &&  <i className="fas fa-trash-alt"></i> }
               </b>

               { /* 是否付費 */ }
               <b className="absolute f_14" style={dollar}>
                  { is_Unpaid &&  <i className="fas fa-dollar-sign"></i> }
               </b> 
     
            </>
    
} ;


export default Service_Sign
       