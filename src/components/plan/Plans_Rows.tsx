import {useEffect, useState} from "react"

import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import usePet_Button from "hooks/layout/usePet_Button";
import Update_Customer from "components/customers/edit/Update_Customer";

import Plan_Sign from "./components/Plan_Sign";
import Plan_Type from "./components/Plan_Type";
import Plan_Used from "./components/Plan_Used";
import Plan_Start_End from "./components/Plan_Start_End";


import Plan_Used_ExtraItem_Sign from "components/services/edit_components/summary_fee/plan_components/common/plan_used/Plan_Used_ExtraItem_Sign" ;

import axios from 'utils/axios'
import { toast } from 'react-toastify'
import cookie from "react-cookies"





const Plans_Rows = ( props : any ) => {

    const { data } = props ;
    const dispatch = useDispatch();
    const history  = useHistory() ;


    // 方案 "應收" 價格 
    const [ plan_Fee , set_Plan_Fee ] = useState( 0 ) ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button([ data['pet'] ]) ;

    // 客戶資料
    const customer = data['customer'] ? data['customer'] : {} ;

    try{
        customer.customer_relation = [ data.customer_relative ] ;
    }catch(e){
        console.log( '客戶關係人發生錯誤' )
    }

    
    // 點選 _ 客戶資訊 
    const click_Customer_Name = () => dispatch( set_Side_Panel( true , <Update_Customer /> , { preLoadData : customer } ) ) ;
 
   
    const left = { textAlign : "left" } as const ;


    
    // 點選 _ 刪除資料
    const click_Delete = ( id : string , plan_Used : [] ) => {


        // 方案已有使用紀錄 --> 無法刪除
        if( plan_Used.length > 0 ){
            alert( "此方案已有使用紀錄，無法刪除．" )
            return false
        }

        axios.delete( `/plans/${ id }` ).then( res => {

            toast(`🦄 方案資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 洗美 > 方案 / 5 秒後銷毀 )
            cookie.save( 'after_Delete_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath"); // 錯誤路徑
            history.push("/services");  // 正確路徑

        }) ;

    } ;



    // 取得 _ 方案價格( 價格小計)
    const get_Plan_Price = ( data : any ) => {
    
        const pet         = data['pet'] ;
        const plan_Type   = data[ 'plan_type' ] ;      // 方案類型( Ex. 包月洗澡、包月美容... )

        const self_Adjust = data?.plan_adjust_price ;  // 自行調整
        const pickup      = data?.pickup_fee ;         // 接送費

    
        // 包月洗澡下，有自訂價錢
        if( plan_Type === '包月洗澡' && pet?.month_bath_price )   return pet?.month_bath_price + self_Adjust + pickup ;
        
        // 包月美容下，有自訂價錢
        if( plan_Type === '包月美容' && pet?.month_beauty_price ) return pet?.month_beauty_price + self_Adjust + pickup ;
        
        return data['plan_fee_total']
          
    } ;


    // 設定 _ 方案價格 ( 價格小計 )
    useEffect( () => {
    
        set_Plan_Fee( get_Plan_Price( data ) ) ;
      
    } , [ data ] ) ;

    return  <tr className="m_Top_20" >

               <td className="relative t_Left" style={{ height:"90px" }}>

                   { /* 申請退費標示  */ }
                   <Plan_Sign is_return={ data['is_return']  } return_status = { data['return_status'] } />  

                   { /* 方案類型  */ }        
                   <Plan_Type data = { data } />

                   { /* 已使用方案服務中，有使用 "加價項目" */ } 
                   <div className="absolute" style={{ top:"24px" , left:"-52px" }}>
                      <Plan_Used_ExtraItem_Sign plan = { data } />
                   </div>
            
               </td>

               { /* 客戶 */ }
               <td>

                   { customer['name'] ?

                     <b className="tag is-medium pointer" onClick = { click_Customer_Name } >
                         { customer['name'] } ( { customer['mobile_phone'] } )
                     </b> :

                     <b className="tag is-medium fRed pointer" onClick = { () => alert( '查無此方案相對應客戶' ) }> 已刪除 </b>

                   }

               </td>
            
               { /* 寵物 */ }
               <td style={left}> 
                    
                  {  
                     data?.pet?.serial ? 
                          petButton : 
                          <b className="tag is-medium fRed pointer" onClick = { () => alert( '查無此方案相對應寵物' ) }>   已刪除 </b> 
                  }

               </td>
               
               <td style={{ width:"100px" }}> { plan_Fee } </td>
               
               <td> { data?.created_at?.slice(5,10) }   </td>
               <td> { data?.payment_date?.slice(5,10) } </td>

               { /* 開始日期、結束日期  */ }
               <Plan_Start_End data = { data } />

               
               <td className="relative" style={ left }>

                   { /* 方案使用情形 */ }  
                   <Plan_Used data = {data} />
            
               </td>

               <td> 
                    
                    <b className = "tag is-medium pointer" 
                        onClick  = { () => { if( window.confirm( '確認要刪除此筆資料' ) ) click_Delete( data["id"] , data['plan_used_records'] ) } }>
                           <i className="fas fa-trash-alt"></i>
                    </b>

               </td>     

               { /* <td> <i className="fas fa-download pointer"></i> </td> */ }

            </tr>

} ;

export default Plans_Rows