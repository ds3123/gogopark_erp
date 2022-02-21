
import React from "react"
import { useDispatch } from "react-redux";
import { set_Modal } from "store/actions/action_Global_Layout";
import Service_Records from "components/services/edit_components/Service_Records";


const Contact_Customer_Row = ( props : any ) => {

    const { data } = props ;
    const dispatch = useDispatch() ;

    // 點選 _ 服務卡檢視按鈕
    const click_Contact_Records = ( ) => {
       dispatch( set_Modal( true , <Service_Records type="客戶" /> , { modal_Style : { width:"90%" , left : "5%" } } )) ;
    } ;

  return  <tr>
              <td> <b className="tag is-medium pointer"> { data['type'] } </b> </td>
              <td> <b className="tag is-medium pointer"> { data['cus_Name'] } </b>           </td>
              <td> { data['cus_Mobile'] }  </td>
              <td className="td_Left"> <b className="tag is-medium pointer"> { data['pet_Name'] }( { data['pet_Species'] } ) </b> </td>
              <td className="td_Left"> <b className="fDblue"> { data['contact_Reason'] } </b> </td>
              <td> { data['last_Contact'] }  </td>
              <td>
                  <b className="tag is-medium pointer"> 預約 </b> &nbsp;&nbsp;
                  <b className="tag is-medium pointer"> 追蹤 </b>
              </td>
              <td> <b className="tag is-medium pointer" onClick={ () => click_Contact_Records() }> 檢 視 </b>  </td>
           </tr>

} ;

export default Contact_Customer_Row