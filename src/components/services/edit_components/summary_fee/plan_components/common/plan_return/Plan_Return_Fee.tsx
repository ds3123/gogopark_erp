
type Plan_Return_Fee = {

    return_Type       : '一般退費' | '優惠退費' | '' ; // 退費類型
   
    used_Records_Num  : number ;               // 使用次數
    single_Bath_Price : number ;               // 單次洗澡價格

    current_User_Name : string ;               // 經手人員    

}


// @ 退費( 使用方案 )
const Plan_Return_Fee = ( { return_Type , used_Records_Num , single_Bath_Price , current_User_Name } : Plan_Return_Fee ) => {

    

    return  <div className="columns is-multiline is-mobile">

                <div className="column is-12-desktop">

                { /* 一般退費  */ }
                { return_Type === '一般退費' &&

                    <div>
                            <span className="tag is-medium is-white m_Right_5"> 使用情形 : &nbsp; <b className="fDred"> { used_Records_Num } / 4 </b> &nbsp; 次 </span>
                            <span className="tag is-medium is-white m_Right_5">
                                單次洗澡價格 : <b className="fBlue"> &nbsp; ${ single_Bath_Price } </b>
                            </span>
                            <span className="tag is-medium is-white m_Right_15">
                                單次個體調整金額 :
                                <b className="fBlue" style={{display:"inline-block",width:"100px"}}>
                                &nbsp; <input className="input" type="number" />
                                { /* ${ data['plan_adjust_price'] / 4 } */ }
                                </b>
                            </span>
                            <span className="tag is-medium is-white m_Right_40">
                                單次接送費 :
                                <b className="fBlue" style={{display:"inline-block",width:"100px"}}>
                                &nbsp; <input className="input" type="number" />
                                    { /* ${ data['pickup_fee'] / 4 } */ }
                                </b>
                            </span> <br/><br/>

                            <span className="tag is-medium is-white">
                                <b>  退費金額 : <b className="fRed m_Right_30"> $1025 </b> </b>
                                <b className="relative f_10" style={{ top:"-10px" , left:"-20px" }}> *&nbsp;計算方式 : 4700 - ( 1225 * 3 ) = 1025 </b>
                            </span>

                    </div>

                }

                { /* 優惠退費  */ }
                { return_Type === '優惠退費' &&

                        <div>
                            <span className="tag is-medium is-white m_Right_10"> 使用情形 : &nbsp; <b className="fDred"> { used_Records_Num } / 4 </b> &nbsp; 次 </span>
                            <span className="tag is-medium is-white m_Right_10">
                                <b>  退費金額 : <b className="fRed"> $1175 </b> &nbsp; ( &nbsp; <b className="fBlue"> { 4 - used_Records_Num } 次包月 </b> &nbsp; ) </b>
                            </span>
                        </div>

                }

                </div>


                { ( return_Type === '一般退費' || return_Type === '優惠退費' ) &&

                    <>

                        <div className="column is-8-desktop">
                            <input type="text" className="input" placeholder="請填寫 : 退費理由" />
                        </div>
                        <div className="column is-4-desktop">

                            <b className="tag is-medium hover f_15">
                                <i className="fas fa-paper-plane"></i> &nbsp; 提交申請退費 ( { current_User_Name ? current_User_Name : '測試員' } )
                            </b>

                        </div>

                    </>

                }

            </div>   


} ;


export default Plan_Return_Fee
       