
import { useEffect , useState } from "react" ;
import useServiceType from "hooks/layout/useServiceType";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import Update_Customer from "components/customers/edit/Update_Customer";
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import {useHistory} from "react-router-dom";

import { submit_Undo_Delete_Service } from "store/actions/action_Error"
import { switch_Service_Id } from "utils/data/switch"



const Delete_Service_Rows = (  props : any ) => {

        const history       = useHistory();
        const dispatch      = useDispatch();

        const { data }      = props ;
        const customer      = data['customer'] ;


        try{
            customer.customer_relation = [ data['customer_relative'] ] ; // 配合 <Update_Customer />，關係人屬性名稱，改為 'customer_relation'
        }catch(e){
            console.log( '客戶關係人發生錯誤' )
        }

        const [ pet , set_Pet ] = useState<any>( {} ) ;

        // 服務單欄位 _ 顏色、Icon
        const { color , icon }  = useServiceType( data[ 'service_type' ] , false , 'medium' );

        // * 寵物按鈕
        const petButton = usePet_Button( [ pet ] ) ;

        // 點選 _ 服務單
        const click_Service  = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;

        // 點選 _ 客戶
        const click_Customer = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : customer } ) ) ;

        // 點選 _ 解除銷單
        const click_Undo_Error = ( data : any ) =>  dispatch(  submit_Undo_Delete_Service( data , history ) ) ;

        

        // 設定 _ 寵物
        useEffect( () => {

            if( data['pet'] ) set_Pet( data['pet'] ) ;

        } , [ data ]  ) ;


        return <tr style = { { lineHeight : "40px" } } >

                      <td>
                          <b className = { color+" pointer" } onClick = { click_Service } >

                            <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] }&nbsp;
                            <b className="f_9"> ( { switch_Service_Id( data ) } ) </b>   &nbsp; 
                            <b className="tag is-white is-rounded f_9">  Q{ data['q_code'] }  </b>

                          </b>
                      </td>

                      <td className="td_Left" >  { data['pet'] ? petButton : "" } </td>

                      <td>
                          <b className="tag is-medium pointer" onClick = { click_Customer } >
                             { data['customer'] ? data['customer']['name'] : '' }
                          </b>
                      </td>


                      <td> { data['delete_submitter'] }        </td>

                      <td> { data['updated_at'].slice(0,16) } </td>

                     

                      <td>
                          <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要解除銷單') ) click_Undo_Error( data )  }  }>
                              <i className="fas fa-undo-alt"></i>
                          </b>
                      </td>

                 </tr>

} ;

export default Delete_Service_Rows