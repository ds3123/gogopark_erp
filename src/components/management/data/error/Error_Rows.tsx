
import {useEffect , useState} from "react" ;
import useServiceType from "hooks/layout/useServiceType";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import Update_Customer from "components/customers/edit/Update_Customer";
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import {useHistory} from "react-router-dom";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Error_Handle from "components/management/data/error/Error_Handle";
import { submit_Undo_Service_Error } from "store/actions/action_Error"


const Error_Rows = (  props : any ) => {

        const history       = useHistory();
        const dispatch      = useDispatch();

        const { data }      = props ;
        const customer      = data['customer'] ;
        const service_error = data['service_error'] ;

        
       
        try{
            customer.customer_relation = [ data['customer_relative'] ] ; // 配合 <Update_Customer />，關係人屬性名稱，改為 'customer_relation'
        }catch(e){
            console.log( '客戶關係人發生錯誤' )
        }

        const [ pet , set_Pet ] = useState<any>( {} ) ;

        // 服務單欄位 _ 顏色、Icon
        const { color , icon }  = useServiceType( data[ 'service_type' ] , false , 'medium' );

        // * 寵物按鈕
        const petButton = usePet_Button([ pet ] ) ;

        // 點選 _ 服務單
        const click_Service  = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;

        // 點選 _ 客戶
        const click_Customer = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : customer } ) ) ;


        // 點選 _ 處理狀態
        const click_Switch_Error_Status = ( data : any ) => {

           // set_Is_Error_Handled( !is_Error_Handled )
           dispatch( set_Modal( true ,
                               <Error_Handle /> ,
                               { modal_Style : { width : "80%" , left : "10%" } , data : data }
                   )) ;


        }   

        // 點選 _ 解除異常
        const click_Undo_Error = ( data : any ) =>   dispatch( submit_Undo_Service_Error( data , history ) )


        // 設定 _ 寵物
        useEffect( () => {

            if( data['pet'] ) set_Pet( data['pet'] ) ;

        } , [ data ] ) ;


        return <tr style = { { lineHeight : "40px" } } >

                      <td> 251 ( 淡水 ) </td>
                      <td> 01  </td>

                      <td className="td_Left">

                         { /* for 基礎、洗澡、美容、安親 */ } 
                         { data['service_type'] &&
                            <b className = { color+" pointer" } onClick = { click_Service } >
                                <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] } &nbsp; Q{ data['q_code'] }
                            </b>
                         }  

                         { /* for 住宿 */ }
                         { !data['service_type'] &&
                            <b className = "tag is-medium is-primary is-light" onClick = { click_Service } >
                                <i className="fas fa-home"></i> &nbsp; { data[ 'service_status' ] } 
                            </b>
                         }  

                      </td>

                      <td className="td_Left"> { data['pet'] ? petButton : "" } </td>

                      <td>
                          <b className="tag is-medium pointer" onClick = { click_Customer } >
                             { data['customer'] ? data['customer']['name'] : '' }
                          </b>
                      </td>

                      <td className="td_Left">  <b className="fDred"> { data['error_cause'] } </b> </td>

                      <td> { data['error_submitter'] }        </td>

                      <td> { data['updated_at'].slice(0,16) } </td>

                      <td className="td_Left"> 

                          { /* 有處理紀錄  */ } 
                          { service_error.length > 0 &&
            
                             <b className="tag is-medium is-success pointer" onClick = { () => click_Switch_Error_Status( data ) } >
                                   <i className="fas fa-list"></i> &nbsp; 處理紀錄 ( { service_error.length } )
                             </b> 

                          }  

                          { /* 沒有處理紀錄  */ } 
                          { service_error.length > 0 ||

                             <b className = { `tag is-medium is-danger pointer` } onClick   = { () => click_Switch_Error_Status( data ) } >

                                <i className="fas fa-exclamation"></i> &nbsp; { data['error_status'] } 

                             </b>
                            
                          }  

                      </td>

                      <td>
                          <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要復原異常') ) click_Undo_Error( data )  }  }>
                              <i className="fas fa-undo-alt"></i>
                          </b>
                      </td>

                 </tr>

} ;

export default Error_Rows