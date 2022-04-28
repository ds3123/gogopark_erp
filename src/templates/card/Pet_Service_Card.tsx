
import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import { string_Short } from "utils/string/edit_string" ;
import Info_Administrator from "templates/note/Info_Administrator" ;

import { set_Side_Panel } from "store/actions/action_Global_Layout";

import Update_Service from "components/services/edit/Update_Service";
import Update_Plan from "components/plan/edit/Update_Plan";




type Card = { 
               data : any ; 
               pet  : any ; 
               type : '客戶' | '寵物' 
            } 


// 寵物 _ 服務資訊卡片 ( for 客人 : 消費歷史 、寵物 : 服務紀錄 )
const Pet_Service_Card = ( { data , pet , type } : Card ) => {

    const dispatch = useDispatch() ;

    const get_View_Component = ( data : any ) => {
    
       const service_Type   = data?.service_type ;
       const plan_Type      = data?.plan_type ;  
       const service_Status = data?.service_status ; // 服務狀態 ( for 住宿 )

       if( !service_Type && service_Status ) return Info_Administrator // 住宿
       if( !service_Type && plan_Type )      return Update_Plan        // 方案

       return Update_Service

    } ; 



    // 點選 _ 服務卡檢視按鈕
    const click_View_Detail = ( data : any ) => {


      const Component = get_View_Component( data ) ;

      dispatch( set_Side_Panel( true , <Component /> ,
                                    { source_Page : 'Customer_Service_Records' , service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string }
                              )) ;

      // dispatch( set_Modal( true , <Componet /> , { data : data , modal_Style : { width:"90%" , left : "5%" } } ) ) ;
         
    } 
      
    

    const card = {
                    width:"100%" ,
                    background:"white" ,
                    boxShadow:"1px 1px 8px 2px rgba(200,200,200,.3)" ,
                    marginBottom:"10px" ,
                    position:"relative" ,
                    padding:"10px"
                  } as any ;

    const row  = {
                    width:"100%" ,
                    height:"35px" ,
                    lineHeight:"32px" ,
                    marginBottom:"5px" ,
                    overflow : "hidden"
                  } as any ;            

    return <div className="relative" style={card}>

                { /* for 客戶 : 消費歷史 */ }
                { type === '客戶'  &&

                    <>

                        { /* 異常標示 */ }
                        { data['is_error'] === 1 &&
                            <div className="absolute fRed" style={{ top:"12px" , right:"10px" }} > 
                                <i className="fas fa-exclamation-triangle"></i> 
                            </div>
                        }

                        <div className="m_Top_5" style={ row }> 
                             
                             <b> 

                                 {  pet?.name ? 
                                        <> { string_Short( pet?.name )  } <span className="f_10">( { string_Short( pet?.species )  } ) </span> </> :
                                       <span className="fRed"> 寵物已刪除 </span>  }

                             </b> 
                        </div>

                        <div style={ row }> <b className="fDred"> ${ data['amount_paid'] } </b> </div>
                        <div style={ row }> { data['created_at'] }                              </div>
                        <div style={ row }>
                            <b className="tag is-medium hover pointer" style={{width:"100%"}} onClick={ ( ) => click_View_Detail( data ) }>
                                <i className="fas fa-search"></i> &nbsp; 檢 視
                            </b>
                        </div>

                    </>   
                
                }


                { /* for 寵物 : 服務紀錄 */ }
                { type === '寵物'  &&

                    <>

                      { data['plan_type'] &&
                      
                         <div style={ row }> <b className="fBlue"> { string_Short( data['plan_type'] , 10 )  } </b> <hr/> </div>
                      
                      }

                      <div style={ row }>  實收金額 : <b className="fDred"> ${ data['amount_paid'] } </b> </div>
                     
                      <div style={ row }>  付款方式 : <b className="fGreen"> { data['payment_method'] } </b> </div>

                      <div style={ row }>  建檔日期 : { data['created_at'].slice( 5 , 10 ) }  </div>

                      <div style={ row }>
                            <b className="tag is-medium hover pointer" style={{width:"100%"}} onClick={ ( ) => click_View_Detail( data ) }>
                                <i className="fas fa-search"></i> &nbsp; 檢 視
                            </b>
                      </div>


                    </>   
                
                }

           </div>

} ;

export default Pet_Service_Card
       