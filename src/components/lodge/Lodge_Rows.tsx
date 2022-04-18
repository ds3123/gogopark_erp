import {useEffect, useState} from "react"
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import Update_Service from "components/services/edit/Update_Service";
import {get_Interval_Dates} from "utils/time/date"
import axios from "utils/axios";
import {toast} from "react-toastify";
import cookie from "react-cookies";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import {click_Show_Edit_Customer} from "store/actions/action_Customer"
import moment from "moment";


const Lodge_Rows = ( props : any ) => {

    const dispatch = useDispatch();
    const url      = useLocation().pathname;
    const history  = useHistory() ;


    // 今日
    const today = moment( new Date() ).format('YYYY-MM-DD' ) ;


    const { data } = props ;

    // 總天數
    const [ dates_Sum , set_Dates_Sum] = useState( 0 ) ;

    // 寵物
    const [ pet , set_Pet ] = useState<any>( {} ) ;

    // 寵物按鈕 ( 1 隻 )
    const petButton = usePet_Button( [ pet ] ) ;

    // 客戶
    const customer = data['customer'] ;

    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;
   

    // 點選 _ 房號 (房型)
    const click_Room = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : '住宿' ,  preLoadData : data } as { service_Type : string } ) ) ;


    // 點選 _ 封存資料
    const click_Archive = ( id : string ) => {

        axios.put( `/lodges/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });
            history.push("/wrongpath");  // 錯誤路徑
            history.push("/lodge");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( id : string ) => {

        axios.put( `/lodges/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 住宿 / 5 秒後銷毀 )
            cookie.save( 'after_Undo_Archive' , '住宿' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( id : string ) => {

        axios.delete( `/lodges/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 住宿 / 5 秒後銷毀 )
            cookie.save('after_Delete_Archive' , '住宿' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

   


    // 設定 _ 寵物、總天數
    useEffect( () => {

        // 寵物
        if( data['pet'] ) set_Pet( data['pet'] ) ;

        // 總天數
        if( data['start_date'] && data['end_date'] ){
            const interval = get_Interval_Dates( data['start_date'] , data['end_date'] ) ;
            set_Dates_Sum( interval.length ) ;
        }

    } , [ data ] ) ;

    const t_L = { textAlign : "left" } as const ;
    const err = {top:"-7px", left:"1px" , color:"red" , zIndex : "344"} as any ;
    

   return <tr style = { ( data[ 'start_date' ] && data[ 'start_date' ].slice(0,10) === today ) ? { background:"rgb(160,160,160,.2)" }  : { lineHeight : "40px" } }>

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

                    { customer ? customer?.name : <b className="fRed"> 已刪除 </b> }

                </b>

            </td>

            <td>
                <b className="tag is-medium pointer" onClick={ click_Room }>
                   { data['room_number'] } ( { data['room_type'] } )
                </b>
            </td>

            <td> { data['start_date'] }&nbsp; &nbsp;{ data['start_time'] } </td>
            <td> { data['end_date'] }&nbsp; &nbsp;{ data['end_time'] } </td>
            <td> { dates_Sum } </td>
            <td> <b className="fDblue"> { data['lodge_price'] } </b> </td>
            <td> { data['self_adjust_amount'] } </td>
            <td>  { data['pickup_fee'] }  </td>

            <td>
                  <b className="fDred">
                      { data['lodge_price'] + data['self_adjust_amount'] + data['pickup_fee'] }
                  </b>
            </td>
            <td>
                  <b className="fDred">  { data['amount_paid'] } </b>
            </td>

           { /* 寵物頁面 : 封存 */ }
           { url === '/lodge' && <td>
                                   <b className="tag is-medium" onClick={ () => { if( window.confirm("確認要 : 封存此住宿資料 ?") )click_Archive( data['id'] )  } }>
                                       <i className="fas fa-download"></i>
                                   </b>
                               </td> }

           { /* 封存資料頁面 : 復原封存、刪除 */ }
           { url === '/management' &&

               <>

                   <td>
                       <b className="tag is-medium pointer" onClick={ () => click_Undo_Archive( data['id'] )  } >
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


export default Lodge_Rows