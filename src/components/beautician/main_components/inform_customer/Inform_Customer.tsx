import { useDispatch } from "react-redux";
import Inform_Customer_Options from "components/beautician/main_components/inform_customer/Inform_Customer_Options";
import Customer_Confirm_Options from "components/beautician/main_components/inform_customer/Customer_Confirm_Options";

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;



{ /* 處理結果 / 主人確認 */ }
const Inform_Customer = () => {

    const dispatch = useDispatch() ;

    // 顯示 _ 處理結果
    const show_InfoCustomer    = () => dispatch( set_Side_Panel( true , <Inform_Customer_Options /> , {} ) ) ;

    // 顯示 _ 主人確認面板
    const show_CustomerConfirm = () => dispatch( set_Side_Panel( true , <Customer_Confirm_Options /> , {} ) ) ;

  

    return <div style={{ textAlign : "right" }}>

             <b className = "tag is-medium is-link is-light pointer" onClick = { show_CustomerConfirm } > <i className="fas fa-phone"></i> &nbsp; 主人確認 </b>  &nbsp; &nbsp; &nbsp;
             <b className = "tag is-medium is-danger pointer"        onClick = { show_InfoCustomer } >    <i className="fas fa-user-check"></i> &nbsp; 處理結果      </b>

           </div>

};


export default Inform_Customer