
import { useEffect , useState } from "react" ;
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { submit_Service_Error , submit_Delete_Service } from "store/actions/action_Error";


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
    const click_Is_Error = () => set_Is_Error( !is_Error ) ;

 
    // 點選 _ 提交異常
    const click_Submit_Error = ( data : any ) => {
 
         if( !error_Cause ){ alert( "請輸入 : 異常原因" ) ; return false ; }
 
         dispatch( submit_Service_Error( data , error_Cause , current_User_Name , history ) ) ;

    } ;


    // 點選 _ 提交銷單
    const click_Delete_Service = ( data : any ) => dispatch( submit_Delete_Service( data , current_User_Name , history ) ) ;


    // 變動處理
    const hand_Error_Change = ( error : string ) => set_Error_Cause( error ) ;

 
   return  <div className="columns is-mobile is-multiline">

               { /* 轉異常  */ }
               <div className="column is-2-desktop">

                    { ( data['is_error'] === 0 && data['is_delete'] === 0 && !is_Error ) &&
                    
                        <b className="tag is-large pointer hover" style={{width:"100%"}} onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  轉異常 
                        </b>
                    }

                    { is_Error &&
                        <b className="tag is-large pointer" style={{ background:"darkorange" , color:"white" }} onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  異常原因
                        </b>
                    }

               </div>

               { /* 銷單 */ }    
               { ( data['is_delete'] === 0 && data['is_error'] !== 1 ) && 
               
                 <div className="column is-2-desktop">
                    <b className="tag is-large pointer " style={{width:"100%"}}  onClick={ () => { if( window.confirm("確認要取消此服務單?") ) click_Delete_Service( data ) } }> 
                      <i className="fas fa-trash-alt"></i> &nbsp; 銷 單 
                    </b>  
                 </div>
               
               }

               { /* 提交異常 */ }
               { is_Error &&

                    <>
                       
                        { /* 異常原因  */}
                        <div className="column is-5-desktop">

                            <input type="text" className="input" value={ error_Cause } onChange={ e => hand_Error_Change( e.target.value ) } placeholder="請輸入 : 異常原因" />

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
       