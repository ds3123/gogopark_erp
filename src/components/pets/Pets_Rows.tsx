
import usePet_Button from "hooks/layout/usePet_Button";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useDispatch } from "react-redux";
import{ useLocation }from"react-router";
import {useHistory} from "react-router-dom";
import axios from "utils/axios";
import {toast} from "react-toastify";
import cookie from "react-cookies";
import { click_Show_Edit_Customer } from "store/actions/action_Customer" ;
import Pet_Consumption_Records from "./edit/info/Pet_Consumption_Records";




const Pets_Rows = ( props : any ) => {

    const { data }  = props ;

    const dispatch  = useDispatch() ;
    const url       = useLocation().pathname ; 
    const history   = useHistory() ;


    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button([data]) ;
    const customer  = data['customer'] ;

    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;


    // 點選 _ 寵物相關服務歷史紀錄
    const click_History  = ( pet_Data : any ) => dispatch( set_Side_Panel( true , <Pet_Consumption_Records pet_Data = { pet_Data } /> , { } ) ) ;

    // 點選 _ 封存資料
    const click_Archive  = ( id : string ) => {

        axios.put( `/pets/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存` , { position : "top-left", autoClose : 1500 , hideProgressBar : false } ) ;

            history.push("/wrongpath" );  // 錯誤路徑
            history.push("/pets" );       // 正確路徑

        }) ;

    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( id : string ) => {

        axios.put( `/pets/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 寵物 / 5 秒後銷毀 )
            cookie.save( 'after_Undo_Archive' , '寵物' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( id : string ) => {

        axios.delete( `/pets/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 資料管理 > 封存資料 > 寵物 / 5 秒後銷毀 )
            cookie.save('after_Delete_Archive' , '寵物' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;


    } ;


    const t_L = { textAlign : "left" } as const ;


   return <tr>

             <td className="relative"> 

                { /* 拒接標示 */ }
                 { data?.is_rejected === 1 && 
                      <b className="fRed absolute" style={{ left : "-12px" , top : "12px" }}> 
                         <i className="fas fa-ban"></i> 
                      </b>
                 }


                 { data['serial'].slice( 16 ,22 ) ? data['serial'].slice( 16 ,22 ) : data['serial'] } 
             </td>

             <td style={ t_L }> { petButton } </td>

             { /* 客戶姓名 */ }
             <td>
                 <b className="tag is-medium pointer" onClick={  customer ? () => click_Customer( customer.id ) :  () => alert( '請先至寵物區塊，指定主人．' ) }>
                         { customer ? customer['name'] : <b className="fRed"> 未指定 </b> }
                 </b>
             </td>

             <td> { customer ? customer['mobile_phone'] : '' }   </td>
             <td> 
                 
                 <b className="tag is-medium" onClick={ () => click_History( data ) }>
                    <i className="far fa-list-alt"></i> 
                 </b>
             
             </td>
             <td> { data['created_at'] ? data['created_at'].slice(0,10) : '' } </td>
           
               { /* 寵物頁面 : 封存 */ }
               { url === '/pets' && <td>
                                        <b className="tag is-medium" onClick={ () => {  if( window.confirm( "確認要 : 封存此寵物資料?" ) )  click_Archive( data['serial'] ) } }>
                                           <i className="fas fa-download"></i>
                                        </b>
                                    </td> }

               { /* 封存資料頁面 : 復原封存、刪除 */ }
               { url === '/management' &&

                   <>

                       <td>
                           <b className="tag is-medium pointer" onClick={ () => click_Undo_Archive( data['serial'] ) } >
                               <i className="fas fa-undo-alt"></i>
                           </b>
                       </td>

                       <td>
                           <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data['serial'] )  }  }>
                               <i className="fas fa-trash-alt"></i>
                           </b>
                       </td>
                       
                    </>

               }

          </tr>

} ;


export default Pets_Rows