
import { useEffect , useState } from "react" ;
import Customer_Consumption_Records from "components/customers/edit/info/Customer_Consumption_Records";

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { useDispatch } from "react-redux";

import usePet_Button from "hooks/layout/usePet_Button" ;
import Update_Customer from "components/customers/edit/Update_Customer";

import axios from "utils/axios";
import {toast} from "react-toastify";

import{ useLocation }from"react-router";
import {useHistory} from "react-router-dom";
import cookie from "react-cookies";



const Customers_Rows = ( props : any ) => {

    const { data }            = props ;
    const [ pets , set_Pets ] = useState([]) ;
    const dispatch            = useDispatch() ;
    const url                 = useLocation().pathname ;  
    const history             = useHistory() ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : data } ) ) ;

    // 點選 _ 客人消費歷史紀錄
    const click_History  = ( customer_Id : string ) => dispatch( set_Side_Panel( true , <Customer_Consumption_Records customer_Id = { customer_Id } /> , {} ) ) ;


    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton      = usePet_Button( pets ) ;

    // 點選 _ 封存資料
    const click_Archive  = ( id : string ) => {

        axios.put( `/customers/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/customers");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( id : string ) => {

        axios.put( `/customers/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 客戶 / 5 秒後銷毀 )
            cookie.save( 'after_Undo_Archive' , '客戶' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( id : string ) => {

        axios.delete( `/customers/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 客戶 / 5 秒後銷毀 )
            cookie.save('after_Delete_Archive' , '客戶' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;


    } ;

    // 設定 _ 寵物資料
    useEffect( () => {

        if( data['pets'] && data['pets'].length > 0 ){

            set_Pets( data['pets'] )
    
          }else{
    
            set_Pets( [] )
    
          } ;

    } , [ data['pets'] ] ) ;


    const t_L = { textAlign : "left" } as const ;

   return <tr>
             <td style={ t_L } >
                 <b className="tag is-medium pointer" onClick={ click_Customer }>
                     { data['name'] }
                 </b>
             </td>
             <td> { data['id'] } </td>
             <td style={ t_L }> { data['mobile_phone'] } </td>
             <td style={ t_L }> { petButton } </td>
             <td style={ t_L }> { data['address'] }   </td>
             <td><b className="tag is-medium "> <i className="far fa-list-alt" onClick={ () => click_History( data['id'] ) }></i> </b></td>

             <td> { data['created_at'] ? data['created_at'].slice(0,10) : '' } </td> 


             { /* 客戶頁面 : 封存 */ }
             { url === '/customers' &&  <td>
                                            <b className="tag is-medium pointer" onClick={ () => { if( window.confirm("確認要 : 封存此客戶資料 ?") )  click_Archive( data['customer_id'] ) }}>
                                              <i className="fas fa-download"></i>
                                           </b>
                                         </td> }

             { /* 封存資料頁面 : 復原封存、刪除 */ }
             { url === '/management' &&
                 <>

                   <td>
                       <b className="tag is-medium pointer" onClick={ () => click_Undo_Archive( data['customer_id'] ) } >
                          <i className="fas fa-undo-alt"></i>
                       </b>
                   </td>

                   <td>
                       <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data['customer_id'] )  }  }>
                           <i className="fas fa-trash-alt"></i>
                       </b>
                   </td>
                 </>
             }

          </tr>

} ;


export default Customers_Rows