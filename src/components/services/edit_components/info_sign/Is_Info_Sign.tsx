

type Sign = {

    is_error        : number ; 
    is_delete       : number ;
    error_submitter : string ;
    error_cause     : string ;

}


const Is_Info_Sign = ( { is_error , is_delete , error_submitter , error_cause } : Sign ) => {


  const sign   = { background:"red" , color:"white" , width:"100%" } ;  

   return <>    

                { /* 顯示 : 異常案件 */ }
                <div>
                    { is_error === 1 &&
                        <b className="tag is-large pointer" style={ sign } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp; 異 常 案 件 &nbsp;
                            <b className="tag is-medium is-white is-rounded"> &nbsp;
                                <i className="fas fa-comment-dots"></i> &nbsp;
                                { error_submitter } &nbsp; : &nbsp;  
                                <b style={{color:"rgb(100,180,100)"}}> { error_cause } </b> &nbsp;
                            </b>
                        </b>
                    }
                </div>

                { /* 顯示 : 銷單 */ }
                <div>
                    { is_delete === 1 &&
                        <b className="tag is-large pointer" style={sign}  >
                            <i className="fas fa-trash-alt"></i> &nbsp; 此筆服務資料已銷單 &nbsp;
                        </b>
                    }
                </div>


          </>

} ;

export default Is_Info_Sign
       



