

import { useEffect } from "react" ;
import { useDispatch, useSelector } from "react-redux";
import axios from "utils/axios";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import moment from "moment";
import { get_Customer_Confirm } from "store/actions/action_Index"
import Customer_Confirm from "../list/Customer_Confirm";



// @ // 美容師請求櫃台確認訊息
const Customer_Confirm_Note = () => {

   const dispatch = useDispatch();


   // 美容師請求櫃台確認訊息
   const customer_Confirm = useSelector( ( state : any ) => state.Index.customer_Confirm ) ;


   // 點選 _ 檢視美容師請求櫃台確認訊息
   const click_Customer_Confirm = () => {

        // 打開右側面板
        dispatch( set_Side_Panel(true , <Customer_Confirm /> , { } ) ) ;

        // 修改 _ 確認狀態欄位 ( confirm_status : 由 "送交櫃台確認" ， 改為 "櫃台確認中" )
        if( customer_Confirm && customer_Confirm.length > 0 ){

            customer_Confirm.forEach( ( x:any ) => {

               // 狀態為 : "送交櫃台確認" 才修改
               if( x['confirm_status'] === '送交櫃台確認' ){

                   axios.put( `/customer_confirms/${ x['id'] }` , { 'confirm_status' : '櫃台確認中' } ) ;

               }

            })

        }

   } ;


   // 取得 _ 美容師請櫃檯確認訊息 ( 每隔 4 秒 )
   useEffect( () => { 

      const today       = moment( new Date() ).format('YYYY-MM-DD' ) ; // 今日
   
      const get_Confirm = setInterval( () => { dispatch( get_Customer_Confirm( today ) ) } , 4000  ) ;

      return () => clearInterval( get_Confirm )   // 元件掛載前，先清除 setInterval

   } , [] ) ;


   const confirm = { top: "-1vh" , left : "20%", width:"60%" , boxShadow : "0px 1px 4px 0px rgba(0,0,0,.2)" } as any ;


   return <>

              { 
                
                ( customer_Confirm.length > 0 ) &&

                    <b className="tag is-large is-danger absolute is-rounded pointer" style={ confirm } onClick={ click_Customer_Confirm } >

                        <i className="far fa-comment-dots"></i> &nbsp; 美容師 _ 欲確認 &nbsp;

                        <b className="tag is-medium is-white is-rounded">  { customer_Confirm[0]['confirm_item_title'] } </b>

                        &nbsp; &nbsp;  { customer_Confirm.length > 1 ? <> (  1 / { customer_Confirm.length }  ) </> : '' } &nbsp; &nbsp;
                        <span className="f_11 relative" style={{top:"2px"}} >
                           { customer_Confirm.length > 1 ? <> 第一則 </> : '' } 發送時間 : { customer_Confirm[0]['created_at'].slice(10,16) }
                        </span>

                    </b>

            }
           
          </>


} ;

export default Customer_Confirm_Note
       