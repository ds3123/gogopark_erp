
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import axios from "utils/axios";
import {toast} from "react-toastify";
import cookie from "react-cookies";
import { click_Show_Edit_Customer } from "store/actions/action_Customer"
import moment from "moment";



const Care_Rows = ( props : any ) => {

    const dispatch = useDispatch();
    const url      = useLocation().pathname;
    const history  = useHistory() ;
    const { data } = props ;

    // 今日
    const today = moment( new Date() ).format('YYYY-MM-DD' ) ;

    // 寵物
    const [ pet , set_Pet ] = useState<any>( {} ) ;

    // 寵物按鈕 ( 1 隻 )
    const petButton = usePet_Button([ pet ]) ;

    // 客戶
    const customer = data['customer'] ;

    // 點選 _ 封存資料
    const click_Archive = ( id : string ) => {

        axios.put( `/cares/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存` , { position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

            // 設定 cookie ( for 前往 : 住宿 > 安親 / 5 秒後銷毀 )
            cookie.save( 'after_Archive_Care' , '住宿_安親' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/lodge");      // 正確路徑

        }) ;

    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( id : string ) => {


        axios.put( `/cares/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 安親 / 5 秒後銷毀 )
            cookie.save( 'after_Undo_Archive' , '安親' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( id : string ) => {

        axios.delete( `/cares/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 安親 / 5 秒後銷毀 )
            cookie.save('after_Delete_Archive' , '安親' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;


    } ;

    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;
   

    // 點選 _ 安親類別
    const click_Type = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : '安親' ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 設定 _ 寵物、總天數
    useEffect( () => {

        // 寵物
        if( data['pet'] ) set_Pet( data['pet'] ) ;


    } , [ data ]  ) ;

    const t_L = { textAlign : "left" } as const ;
    const err = {top:"-7px", left:"1px" , color:"red" , zIndex : "344"} as any ;

    return <tr style = { ( data[ 'start_date' ] && data[ 'start_date' ].slice(0,10) === today ) ? { background:"rgb(160,160,160,.2)" }  : { lineHeight : "40px" } } >
              
              <td style={ t_L } className="relative" > 


               { /* 異常標示 */ }
               <b className="absolute" style={ err }>
                  { data['is_error'] === 1 &&  <i className="fas fa-exclamation-triangle"></i> }
               </b> 
                  

               { 
                    pet?.serial ?
                      petButton :
                      <b className="tag is-medium pointer fRed" onClick = { () => alert( '查無此服務相對應寵物' ) }> 已刪除 </b>  
              } 
                 
              </td>
             
              { /* 客戶姓名 */ }    
              <td>
                  <b className="tag is-medium pointer" 
                     onClick={  customer ? () => click_Customer( customer.id ) : () => alert( '此服務相對應客戶，已被刪除．' ) }>
                     
                     {  customer ? customer?.name : <b className="fRed"> 已刪除 </b> }

                  </b>
              </td>
              
              <td style={ t_L }>
                  <b className="tag is-medium pointer" onClick={ click_Type }>

                      { data['service_type'] } ( Q{ data['q_code'] } )

                  </b>
              </td>
              <td> { data['start_date'] } </td>
              <td> <b className="fDblue"> { data['start_time'] } </b> </td>
             
              <td> { data['way_arrive'] } </td>
              <td> { data['way_leave'] }  </td>
              <td> <b className="fDblue"> { data['care_price'] } </b>  </td>

              <td>  { data['self_adjust_amount'] }  </td>

              <td> { data['pickup_fee'] }   </td>

               <td> <b className="fDred"> { data['care_price'] + data['self_adjust_amount'] + data['pickup_fee'] } </b> </td>
               <td> <b className="fDred"> { data['amount_paid'] }  </b> </td>

               { /* 寵物頁面 : 封存 */ }
               { url === '/lodge' && <td>
                                        <b className="tag is-medium" onClick={ () => {  if( window.confirm("確認要 : 封存此安親資料 ? ") )  click_Archive( data['id'] ) } }>
                                            <i className="fas fa-download"></i>
                                        </b>
                                    </td> }

                { /* 封存資料頁面 : 復原封存、刪除 */ }
                { url === '/management' &&

                    <>

                        <td>
                            <b className="tag is-medium pointer" onClick={ () => click_Undo_Archive( data['id'] ) } >
                                <i className="fas fa-undo-alt"></i>
                            </b>
                        </td>

                        <td>
                            <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data['id'] )  }  }>
                                <i className="fas fa-trash-alt"></i>
                            </b>
                        </td>
                    </>

                }



           </tr>

} ;

export default Care_Rows
