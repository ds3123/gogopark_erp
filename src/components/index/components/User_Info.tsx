

import { useEffect , useState } from "react" ;

import { useDispatch, useSelector } from "react-redux";
import { set_Detail_Mode } from "store/actions/action_Index"


import cookie from 'react-cookies'     // 匯入 cookie


// @ 登入使用者帳號資訊
const User_Info = () => {


    const dispatch = useDispatch()


     // 首頁詳細模式 ( 展開所有統計資料 )
     const is_Detail_Mode = useSelector(( state : any ) => state.Index.is_Detail_Mode ) ;


    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ account , set_Account ] = useState({
                                                 employee_Type : '' , //  帳號類型( Ex.管理帳號、測試帳號、工作人員 )
                                                 position_Type : '' ,  // 職位類別( Ex. 櫃台、美容、接送 )
                                                 account       : '' ,  // 帳號名稱
                                                 employee_Name : '' ,  // 使用者姓名
                                               }) ;


    // 點選 _ 詳細模式
    const click_Detail_Mode = () => dispatch( set_Detail_Mode( !is_Detail_Mode ) );


    const member  = {
                      width         : "260px" ,
                      top           : "0px" ,
                      right         : "-3%" ,
                      padding       : "13px",
                      paddingBottom : "3px" ,
                      boxShadow     : "0px 0px 4px 0px rgba(0,0,0,.1)" ,
                      borderRadius  : "5px" ,
                    } ;


     useEffect( () => { 

          // 設定 _ 使用者類別
          const _cookie = cookie.load('userInfo') ;

          if( _cookie ){
  
              set_Account({ ...account ,
                             employee_Type : _cookie['employee_type'] ,
                             position_Type : _cookie['position_type'] ,
                             account       : _cookie['account'] ,
                             employee_Name : _cookie['employee_name'] ,
                          }) ;
  
          }
     
     
     } , [] ) ;


    return <div className="absolute" style = { member } >

                { /* 使用者名稱 / 暱稱 */ }
                { ( account['employee_Name'] || account['account']  ) &&

                    <span className="m_Bottom_15" >
                        <b className="fDred"> { account['employee_Name'] ? account['employee_Name'] : account['account']  } </b>
                        ( { account['position_Type'] ? account['position_Type'] : account['employee_Type'] } ) &nbsp; 您好 :
                    </span>

                }

                { /* 設定 _ 詳細模式 */ }
                <b className="f_18 relative pointer" style={{ float:"right", top:"-5px" }} onClick={ click_Detail_Mode }>

                    { is_Detail_Mode  && <i className="fas fa-toggle-on"></i>  }
                    { !is_Detail_Mode && <i className="fas fa-toggle-off"></i>  }

                </b>

           </div>



} ;


export default User_Info
       