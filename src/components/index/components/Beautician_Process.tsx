


// @ 美容師 _ 處理過程、結果
const Beautician_Process = ( props : { data : any } ) => {

  const { data } = props ;

  return  <>

 
             <hr/> <br/>


            { /* 安親、住宿 --> 不顯示  */ }     
            { data['shop_status'] &&

                <>   
                
                    <b className="tag is-large is-danger"> <i className="fas fa-list-alt"></i> &nbsp; 美容師處理結果

                        { data['shop_status'] === '到店等候中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 尚未處理 </b></>  }
                        { data['shop_status'] === '到店美容中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 處理中 </b></>  }

                    </b> <br/><br/>

                    { /* 美容師後續處理 */ }
                    { ( data['shop_status'] === '洗完等候中' || data['shop_status'] === '已回家( 房 )' ) &&

                        <div className="columns is-multiline is-mobile relative"  style={{ left : "20px" }}>

                            <div className="column is-12-desktop" >

                                <i className="fas fa-list-ul f_14"></i> &nbsp;<b className="tag is-medium is-white f_14"> 檢查 / 異常項目 : </b>
                                <b className="fDred f_14"> { data['beautician_report'] } </b>

                            </div>

                            <div className="column is-12-desktop" >

                                <i className="fas fa-door-open f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 等候方式 : </b>
                                <b className="fDred f_14"> { data['wait_way'] } </b>

                            </div>

                            <div className="column is-12-desktop" >

                                <i className="far fa-clock f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 開始等候時間 : </b>
                                <b className="fDred f_14"> { data['wait_time'] } </b>

                            </div>

                            <div className="column is-12-desktop" >

                                <i className="far fa-star f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師評分 ( 寵物 ) : </b>
                                { data['beautician_star'] === '0' ?
                                    <b className="f_14" style={{ color:'red'}}> 拒 接 </b> :
                                    <b className="fDred f_14"> { data['beautician_star'] } </b>
                                }

                            </div>

                            <div className="column is-12-desktop" >

                                <i className="fas fa-pencil-alt f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師備註 : </b>
                                <b className="fDred f_14"> { data['beautician_note'] ? data['beautician_note'] : '無' } </b>

                            </div>

                        </div>

                    }

                </>

            }

         </>   

} ;


export default Beautician_Process
       