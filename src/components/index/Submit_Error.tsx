
import React , { useEffect , useState } from "react" ;

import axios from "utils/axios" ;
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";

import {set_Side_Panel} from "store/actions/action_Global_Layout";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"



// Yup 第三方驗證
const schema = yup.object().shape({



}) ;



type error = {

    current_User_Name : string ;
    data              : any 

}

// @ 提交 _ 轉異常
const Submit_Error = ( props : error ) => {

    const { current_User_Name , data } = props ;

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

  
    // 是否點選 : 轉異常
    const [ is_Error , set_Is_Error ]       = useState( false ) ;

    // 異常原因
    const [ error_Cause , set_Error_Cause ] = useState( '' ) ;  

    // 點選 _ 轉異常
    const click_Is_Error = ( ) => set_Is_Error( !is_Error ) ;

    // 點選 _ 提交異常
    const click_Submit_Error = ( data : any ) => {
 
         if( !error_Cause ){
             alert('請輸入 : 異常原因') ;
             return false ;
         }
 
 
         let service_id = null ;
         let url        = null ;
 
         if( data['service_type'] === '基礎' ){
             service_id = data['basic_id'] ;
             url        = '/basics' ;
         }
 
         if( data['service_type'] === '洗澡' ){
             service_id = data['bath_id'] ;
             url        = '/bathes' ;
         }
 
         if( data['service_type'] === '美容' ){
             service_id = data['beauty_id'] ;
             url        = '/beauties' ;
         }
 
         // 更新 _ 異常狀態
         if( service_id && url ){
 
             const obj = {
                            is_error        : 1 ,
                            error_cause     : error_Cause ,
                            error_submitter : current_User_Name ? current_User_Name : '測試員'
                         } ;
 
             axios.put( `${ url }/${ service_id }` , obj ).then( res => {
 
                 toast(`🦄 已通報異常案件`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});
 
                 dispatch( set_Side_Panel(false , null ,{} ) ) ;
 
                 history.push("/wrongpath");  // 錯誤路徑
                 history.push("/index");      // 正確路徑
 
             })
 
         }
 
 
    } ;
 
 
    // 變動處理
    const hand_Error_Change = ( error : string ) => set_Error_Cause(error)  ;

 
   return  <div className="columns is-mobile is-multiline">

               { /* 轉異常  */ }
               <div className="column is-2-desktop">

                    { ( data['is_error'] === 0 && !is_Error ) &&
                        <b className="tag is-large pointer hover" onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  轉異常
                        </b>
                    }

                    { is_Error &&
                        <b className="tag is-large pointer" style={{ background:"darkorange" , color:"white" }} onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  異常原因
                        </b>
                    }

               </div>

               { /* 提交異常 */ }
               { is_Error &&

                    <>

                        { /* 異常原因  */}
                        <div className="column is-7-desktop">
                            <input type="text" className="input" value = { error_Cause } onChange = { e => hand_Error_Change( e.target.value ) } placeholder="請輸入 : 異常原因" />
                        </div>

                        <div className="column is-3-desktop">

                            <b className="tag is-large pointer hover" onClick={ () => click_Submit_Error( data ) } >
                                <i className="fas fa-paper-plane"></i> &nbsp; 提交異常
                                ( { current_User_Name ? current_User_Name : '測試員' } )
                            </b>

                        </div>

                    </>

                }

            </div>

            
} ;


export default Submit_Error 
       