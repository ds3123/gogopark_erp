
import { useContext , useEffect, useState } from "react" ;
import { useSelector } from "react-redux" ;

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel" ;



type Paid = {
    editType   : any ; 
    receivable : number ; 
    register   : any ;
    setValue   : any ;
}


// @ 實收金額
const Amount_Paid = ( { editType , receivable  , register , setValue } : Paid ) => {


    // for 編輯
    const value         = useContext( SidePanelContext ) ;                     // 取得 context 值  
    const data          = value.preLoadData ? value.preLoadData : value.data ; // 預先取得資料


    // 服務狀態 ( 已到店、預約_今天、預約_未來  )
    const service_Status = useSelector( ( state : any ) => state.Info.service_Status ) ;

    // 付款方式
    const paymentMethod  = useSelector( ( state : any ) => state.Service.current_Payment_Method ) ;
 
    // 實收金額
    const handle_ActualPayment = ( value : any ) => {

        

        // for 新增  
        if( !editType ){

            

            if( value > receivable ){

                alert('實收金額，不能大於應收金額') ;
                setValue( 'amount_Paid' , receivable ) ;

                return false ;

            }

            if( value < 0 ){

                setValue( 'amount_Paid' , '' ) ;
            
                return false ;

            }

        }


    } ;  


    // 預先設定 _ 應收金額 ( for 編輯 )
    useEffect( () => { 
    
      if( editType ){

        setTimeout(() => {

            setValue( 'amount_Paid' , data?.amount_paid ) ;
            
        } , 1000 ) ;

      } 

    } , [ editType ] ) ;


    const tag  = { top : "15px" , left : "330px" } ;
    const icon = "fas fa-dollar-sign m_Right_5" ;


   return  <>

              { /*  @ 新增資料  */ }
              { ( !editType && ( paymentMethod === '現金' || paymentMethod === '信用卡' || paymentMethod === '第三方支付' ) )  &&

                    <> 
                        { /* 已付款 / 待付款標示 */ }   
                        <div className="column is-2-desktop relative">

                            <span className="tag is-large is-white m_Right_10"> <b> 實收金額 : </b> </span> 

                            {/* { ( paymentMethod === '現金' && service_Status !== '已到店'  ) &&

                                <b className="tag is-medium is-danger absolute pointer" style={ tag }>  
                                    <i className={icon}></i> 待付款 
                                </b>

                            }

                            { ( paymentMethod === '現金' && receivable > 0 && service_Status === '已到店' ) &&

                                <b className="tag is-medium absolute pointer" style={ tag }>  
                                    <i className={icon}></i> 已付款
                                </b>

                            } */}

                        </div>

                        <div className="column is-2-desktop relative">

                            { /* for 新增 */ }
                            <div className="control has-icons-left" style={{left: "-64px"}}>

                                <input className="input relative" type="number" min="0" 
                                        {...register("amount_Paid")} onChange ={ e => handle_ActualPayment(e.target.value) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                                <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                            </div>

                        </div>

                    </>     

              }   


              { /*  @ 編輯資料  */ }
              { ( editType && ( data?.payment_method === '現金' || data?.payment_method === '信用卡' || data?.payment_method === '第三方支付' ) )  &&  
              
                   <>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        <div className="column is-2-desktop relative">
                   
                            {/* 
                                <b className="f_15 absolute" style={{ left : "-50px" , top:"16px" }} >
                                   <b style={{ color:"red" }}> { data.amount_paid } </b>&nbsp;元
                                </b> 
                            */}

                            <div className="control has-icons-left" style={{left: "-64px"}}>

                                <input className="input relative" type="number" min="0"
                                        {...register("amount_Paid")} onChange ={ e => handle_ActualPayment(e.target.value) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                                <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                            </div>
                   
                        </div>
                   
                   </>
                     
               }

          </>


} ;


export default Amount_Paid
       