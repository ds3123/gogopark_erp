import { useEffect , useState } from "react"
import useServiceType from "hooks/layout/useServiceType";
import usePet_Button from "hooks/layout/usePet_Button";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useDispatch } from "react-redux";
import Update_Service from "components/services/edit/Update_Service";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "utils/axios";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import moment from "moment";
import { click_Show_Edit_Customer } from "store/actions/action_Customer" ;
import { switch_Service_Url_Id } from "utils/data/switch"
import Service_Sign from "./components/Service_Sign";



const Services_Rows = ( props : any ) => {

    const { data } = props ;
    const customer = data['customer'] ;
    const url      = useLocation().pathname;
    const history  = useHistory() ;

    // 今日 
    const today    = moment( new Date() ).format( 'YYYY-MM-DD' ) ;
    

    const [ pet , set_Pet ] = useState<any>( {} ) ;
    const dispatch          = useDispatch() ;

    // 服務 ( 基礎、洗澡、美容 ) : 基本費用、個體調整、加價項目費用、加價美容費用、使用方案( Ex. 包月洗澡、美容 )費用、接送費
    const [ price , set_Price ] = useState({
                                              service      : 0 ,  // 基本費用

                                              self_adjust  : 0 ,  // 個體調整

                                              extra_Item   : 0 ,  // 加價項目
                                              extra_Beauty : 0 ,  // 加價美容
                                              
                                              pickup       : 0 ,  // 接送費 

                                              plan_Price   : 0 ,  // 使用方案( Ex. 包月洗澡、美容 )費用
                                           }) ;

                                           
    // 服務單欄位 _ 顏色、Icon
    const { color , icon } = useServiceType( data[ 'service_type' ] , false , 'medium' ) ;

    // * 寵物按鈕
    const petButton        = usePet_Button( [ pet ] ) ;

    // 點選 _ 服務單
    const click_Service    = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 點選 _ 客戶
    const click_Customer   = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;

    
    // ----------------------------------------------------------

    // 點選 _ 封存資料
    const click_Archive = ( data : any ) => {

        const { url , id } = switch_Service_Url_Id( data ) ;

        axios.put( `${ url }/${ id }` , { is_archive : 1 } ).then( res => {

            toast( `🦄 資料已封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            history.push("/wrongpath") ;  // 錯誤路徑
            history.push("/services") ;   // 正確路徑

        }) ;


    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( data : any ) => {

        const { url , id } = switch_Service_Url_Id( data ) ;

        axios.put( `${ url }/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 洗美 / 5 秒後銷毀 )
            cookie.save( 'after_Undo_Archive' , '洗美' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management"); // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( data : any ) => {

        const { url , id } = switch_Service_Url_Id( data ) ;

        axios.delete( `${ url }/${ id }` ).then( res => {

            toast( `🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 洗美 / 5 秒後銷毀 )
            cookie.save('after_Delete_Archive' , '洗美' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;


    useEffect( () => {

          // 有些服務單，沒有寵物 ( null ) 2021.06.10 再確認查詢式
          if( data['pet'] ) set_Pet( data['pet'] ) ;

          // 設定 _ 不同服務下，該次服務價格
          if( data['service_type'] === '基礎' ){

              set_Price({ ...price ,
                                   service     : data['basic_fee'] ,
                                   self_adjust : data['self_adjust_amount'] ,
                                   pickup      : data['pickup_fee']
                        })

          }

          if( data['service_type'] === '洗澡' ){

              set_Price({ ...price ,
                                   service      : data['bath_fee'] ,

                                   self_adjust  : data['self_adjust_amount'] ,
                           
                                   extra_Item   : data['extra_service_fee'] ,
                                   extra_Beauty : data['extra_beauty_fee'] ,

                                   pickup       : data['pickup_fee'] ,

                                   plan_Price   : data['bath_month_fee'] ? data['bath_month_fee'] : 0 
                        })

          }

          if( data['service_type'] === '美容' ){

              set_Price({ ...price ,
                                   service     : data['beauty_fee'] ,

                                   self_adjust : data['self_adjust_amount'] ,

                                   extra_Item  : data['extra_service_fee'] ,

                                   pickup      : data['pickup_fee'] ,

                                   plan_Price  : data['beauty_month_fee'] ? data['beauty_month_fee'] : 0 
                        })

          }

    } , [ data ] ) ;


    const t_L = { textAlign : "left" } as const ;

   
    return <tr style = { ( data[ 'service_date' ] && data[ 'service_date' ].slice(0,10) === today ) ? { background:"rgb(160,160,160,.2)" }  : { lineHeight : "40px" } } >

             { /* 服務類別 */ } 
             <td className="relative">

                 { /* 服務相關標示 : 異常、銷單、是否付費、申請退費  */ } 
                 <Service_Sign { ...data } />

                 <b className = { color+" pointer" } onClick = { click_Service } >
                     <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] } &nbsp; Q{ data['q_code'] }
                 </b>

             </td>
             
             { /* 寵物資訊 */ }
             <td style = { t_L } >  { data['pet'] ? petButton : "" }  </td>
             
             { /* 客戶姓名 */ }
             <td>
                 <b className="tag is-medium pointer" onClick = { customer ? () => click_Customer( customer.id ) : () => {} } >
                    { data['customer'] ? data['customer']['name'] : '' }
                 </b>
             </td>
            
             { /* 服務說明 */ } 
             <td className="f_10" style = { t_L } >

                 { !data['plan'] && 
                       <> <b className="f_12">現金支付</b> : { data[ 'payment_type' ] } </> 
                 }

                 { /* 屬於某方案  */ }
                 { data['plan'] && <> <b className="f_12">方案</b> : { data['plan'][ 'service_note' ] }</>   }

             </td>
             
             { /* @ ---------- 價格欄位 _ START ---------- */ }

             { /* 服務價格 */ }
             <td>
                 <span className="fDblue">

                     {
                       /*
                           付款方式 :
                            * 現金                -> 依品種，該項服務價格 price['service']
                            * 包月洗澡 / 包月美容  -> 方案價格            price['plan_Price']
                       */
                     }

                     { data['plan'] ? price['plan_Price'] : price['service'] }

                 </span>
             </td>
             
             { /* 個體調整 */ }
             <td> { data['self_adjust_amount'] ? data['self_adjust_amount'] : 0 }  </td>
            
             { /* 加價項目 */ }
             <td> { price['extra_Item'] }                     </td>
            
             { /* 加價美容 */ }
             <td> { price['extra_Beauty'] }                   </td>
             
             { /* 接送費 */ }        
             <td> { price['pickup'] ? price['pickup'] : 0  }  </td>
 
             { /* 應收 */ }    
             <td>

                  <span className="fDred">

                      { 

                        /*

                           2021.08.26
                           * 新增基礎下，若無填寫金額，會有錯誤訊息
                           * 再確認或更新以下 "小計" 金額的加總方式

                        */ 
                        
                      }

                      { data['plan']  ? '包月' : data[ 'amount_payable' ] }

                  </span> 

             </td>

             { /* 實收 */ }
             <td> 
                  <span className="fDred"> 
                     { data['plan'] ? '包 月' : data['amount_paid'] }  
                  </span> 
             </td>

             { /* @ ---------- 價格欄位 _ END ---------- */ }


             { /* 來店日期 */ }
             <td> 
                 
                  { 
                  
                     // data[ 'service_date' ] ? data[ 'service_date' ].slice(5,10) : '' 
                     data[ 'service_date' ]  
                    
                  } 
             
             
             </td>

             { /* 洗美頁面 : 封存 */ }
             { url === '/services' && <td>
                                           <b className="tag is-medium pointer" onClick={ () => { if( window.confirm("確認要 : 封存此服務資料 ?") )  click_Archive( data ) } }>
                                               <i className="fas fa-download"></i>
                                           </b>
                                      </td> }

             { /* 封存資料頁面 : 復原封存、刪除 */ }
             { url === '/management' &&

                <>
                    <td>
                        <b className="tag is-medium pointer pointer" onClick={ () => click_Undo_Archive( data ) } >
                            <i className="fas fa-undo-alt"></i>
                        </b>
                    </td>
                    <td>
                        <b className="tag is-medium pointer pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data )  }  }>
                            <i className="fas fa-trash-alt"></i>
                        </b>
                    </td>
                </>

             }

           </tr>

} ;


export default Services_Rows


