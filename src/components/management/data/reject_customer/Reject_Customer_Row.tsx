
import usePet_Button from 'hooks/layout/usePet_Button' 
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { click_Show_Edit_Customer } from "store/actions/action_Customer" 
import { set_Modal } from "store/actions/action_Global_Layout" 
import Reject_Customer_Handle from './Reject_Customer_Handle'




const Reject_Customer_Row = ( { data } : { data : any } ) => {


    const dispatch = useDispatch() ;


    // 客戶資料
    const { name , mobile_phone , address , rejected_status } = data ;

    // 寵物資料
    const pets = data?.pets ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button( pets ) ;

 
    // 點選 _ 客戶
    const click_Customer = () => dispatch( click_Show_Edit_Customer( data.id , data ) ) ;
    

    // 點選 _ 處理狀態
    const click_Handle_Reject = () => {
    
      dispatch( set_Modal( true , <Reject_Customer_Handle /> , {  data : data , modal_Style : { width : "80%" , left : "10%" }  } )) ;
  
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
                <td> <b className="tag is-medium pointer" onClick={ click_Customer }> { name } </b>  </td>
                <td> { mobile_phone } </td>
                <td className="td_Left"> { petButton } </td>
                <td className="td_Left"> { address } </td>
                <td className="td_Left"> 
                     <b className={ `tag is-medium pointer ${ get_Style( rejected_status ) }` } onClick={ () => click_Handle_Reject() }> 
                       { rejected_status } 
                     </b> 
                </td>
          </tr>

} ;

export default Reject_Customer_Row
       