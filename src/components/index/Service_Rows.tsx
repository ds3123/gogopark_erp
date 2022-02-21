
import { FC , useEffect } from "react" ;
import { string_Short } from "utils/string/edit_string"
import {useDispatch, useSelector} from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Pet from "components/pets/edit/Update_Pet";
import { useRating_Sign }  from "hooks/layout/useRating";
import { Service_Type } from "utils/Interface_Type"
import Update_Service from "components/services/edit/Update_Service";

import { click_Show_Edit_Customer } from "store/actions/action_Customer";

interface IService {
    data : any
}

const Service_Rows : FC<IService> = ( { data } ) => {

    const dispatch = useDispatch() ;

    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector( ( state : any ) => state.Index.is_Detail_Mode ) ;

    const rating_1       = useRating_Sign( 5  , 5 ) ;
    const rating_2       = useRating_Sign( 1  , 10 ) ;

    const customer       = data['customer'] ;
    const pet            = data['pet'] ;

    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type   = data['service_type'] ;
    const q_Code         = data['q_code'] ;

    // 客戶 [ customer ]
    const cus_Name       = customer ? customer['name'] : '' ;

    // 寵物 [ pet ]
    const pet_Name       = pet ? pet['name'] : '' ;
    const pet_Species    = pet ? pet['species'] : '' ;

    let style            = '' ;
    if( service_Type === '基礎' ) style = 'is-warning' ;
    if( service_Type === '洗澡' ) style = 'is-success' ;
    if( service_Type === '美容' ) style = 'is-danger' ;

    
    // 點選 _ Qcode
    const click_Qcode    = () => dispatch( set_Side_Panel( true , <Update_Service /> , { service_Type : service_Type , preLoadData : data  } as { service_Type : Service_Type  } ) ) ;

    // 點選 _ 客戶
    const click_Customer = ( cus_Id : string ) => dispatch( click_Show_Edit_Customer( cus_Id , customer ) ) ;
      
    // 點選 _ 寵物
    const click_Pet      = () => dispatch( set_Side_Panel( true , <Update_Pet /> ,{ preLoadData : data.pet } ) ) ;


    useEffect( () => {

      // click_Qcode() ;

    } , [] ) ;

    // ------------------------------------------------------------------------------------------------------

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded pointer f_11 relative' ;
    const rating = { top:"-3px" , left : "-5px" , fontSize:"9pt" } as const ;
    const sign   = { top:"5px" , right:"0px" , color:"red" } ;
    const dollar = { top:"17px", left:"0px" , color:"red" , zIndex:2 } as const ;


    return <div className="title is-6 relative" style={{ marginBottom : "20px" }} >

               { /* 異常標示 */ }
               <b className="absolute" style={sign}>
                  { data['is_error'] === 1 &&  <i className="fas fa-exclamation-triangle"></i> }
               </b>

               { /* 銷單標示 */ }
               <b className="absolute" style={sign}>
                  { data['is_delete'] === 1 &&  <i className="fas fa-trash-alt"></i> }
               </b>

               { /* 是否付費標示 */ }
               <b className="absolute f_14" style={dollar}>
                  { data['amount_payable'] !== data['amount_paid'] &&  <i className="fas fa-dollar-sign"></i> }
               </b>

               <span className={ tagStyle } onClick={ click_Qcode } > Q{ q_Code }
               
                 { /* 預約標示 */ }
                 <b className="absolute f_9" style={{ top:"-6px" , left:"0px" }}> 
                    { data['service_status'] === '已到店' ? '' : '預' } 
                 </b>
               
               </span> &nbsp;

               <span className="relative tag is-medium pointer f_11" onClick={ click_Pet } >

                 { is_Detail_Mode && <span className="absolute" style={ rating }>  { rating_1 } </span> }
                 { string_Short( pet_Name ) } ( { string_Short( pet_Species ) } )

               </span> &nbsp; &nbsp; 

               <span className="relative tag is-medium pointer f_11"  onClick={ () => click_Customer( customer.id ) } >

                   { is_Detail_Mode &&  <span className="absolute" style={ rating }> { rating_2 } </span> }
                   { cus_Name }

               </span>

           </div> ;

} ;

export default Service_Rows ;