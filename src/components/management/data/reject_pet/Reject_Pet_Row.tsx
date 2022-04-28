import { useDispatch } from "react-redux"
import { click_Show_Edit_Customer } from "store/actions/action_Customer" 

import usePet_Button from "hooks/layout/usePet_Button"
import { set_Modal } from "store/actions/action_Global_Layout" 

import Reject_Pet_Handle from "./Reject_Pet_Handle"




const Reject_Pet_Row = ( { data } : { data : any } ) => {


    const dispatch = useDispatch();

    // 寵物資料
    const { serial , rejected_status } = data ;                  
  
    // 客戶資料     
    const customer = data?.customer ;         


    // 寵物按鈕
    const petButton = usePet_Button([data]) ;  

    
    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;
    


    // 點選 _ 處理狀態
    const click_Handle_Reject = () => {
    
      dispatch( set_Modal( true , <Reject_Pet_Handle /> , {   data : data , modal_Style : { width : "80%" , left : "10%" }  } )) ;

    } ;


    // 狀態按鈕樣式
    const get_Style = ( status : string ) => {
        if( status === '通過' ) return 'is-danger'
        if( status === '退回' ) return 'is-success'
        return 'is-warning'
    } ;

    return <tr> 
                <td> 251 ( 淡水 ) </td> 
                <td> 01 </td> 
                <td> { serial?.slice( 16 , 22 ) }          </td>  
                <td className="td_Left"> 
                     <b className="tag is-medium"> { petButton } </b> 
                </td>  
                <td> 
                     <b className="tag is-medium pointer"  onClick={ customer ? () => click_Customer( customer.id ) : () => alert( '請先至寵物區塊，指定主人．' ) }> 
                       { customer ? customer?.name : <b className="fRed"> 未指定 </b> }
                     </b>                           
                </td>  
                <td> { customer?.mobile_phone }                                                      </td>  
                <td> 
                     <b className={ `tag is-medium pointer ${ get_Style( rejected_status ) }` } onClick={ () => click_Handle_Reject() } > 
                       {  rejected_status } 
                     </b> 
                </td>  
           </tr>

} ;

export default Reject_Pet_Row
       