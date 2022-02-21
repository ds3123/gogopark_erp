
import React, {FC, useEffect} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import { set_PickupFee } from "store/actions/action_Extra_Service_Fee"
import { useDispatch } from "react-redux";
import {Input} from "templates/form/Input";


interface IPickup extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 接送費 */
const Pickup_Fee : FC<IPickup> = ({ register , current, setValue , editType , serviceData } ) => {

   const dispatch = useDispatch() ;

   // 取得、設定接送費
   const get_Fee = ( fee : number ) => {

       // 負數
       if( fee < 0 ){
           dispatch( set_PickupFee( 0 ) ) ;
           setValue( 'pickup_Fee' , ''  ) ;
           return false ;
       }

       // 空字串
       if( !fee ){
          dispatch( set_PickupFee( 0 ) ) ;
          return false ;
       }

       dispatch( set_PickupFee( fee ) ) ;

   };


    // 新增類別變動
    useEffect(( ) => {

        // 將接送費歸零
        dispatch( set_PickupFee( 0 ) ) ;
        if( editType !== '編輯' ) setValue( 'pickup_Fee' , ''  ) ;

    } , [ current ] ) ;


    return <>

            <div className="columns is-multiline is-mobile">

                <div className= "column is-3-desktop" >
                   <b className="tag is-large is-danger is-light">
                       <i className="fas fa-truck-pickup"></i> &nbsp; 接送費
                   </b>
                </div>

                  
                { /* 新增 */ }
                { editType === undefined && 

                    <>
                    
                        <div className="column is-2-desktop" >
                            <div className="control has-icons-left" >
                                <input className="input" type="number" { ...register( "pickup_Fee" ) } min="0" onChange={ e => get_Fee( parseInt( e.target.value ) ) }/>
                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                            </div>
                        </div>

                        <div className= "column is-1-desktop" >
                            <span className="relative" style={{top:"8px"}}>元</span>
                        </div>

                        <div className= "column is-6-desktop relative" >
                            <span className='absolute' style={{ fontSize:'10pt',left:'-40px', top:"20px" }}> * 人工判斷 ( 5 公里內，機車 100 元 / 汽車 200 元 ) </span>
                        </div>
                            
                    </>      

                }  

                { /* 編輯 */ }
                { editType === '編輯' &&

                    <>

                        <div className="column is-3-desktop" >

                            <b className="tag is-medium is-large is-white" > 

                               <span className="fRed"> 
                                   { serviceData.pickup_fee ? serviceData.pickup_fee : 0 } 
                               </span> &nbsp; 元 

                            </b>

                        </div>

                    </>

                } 
    
            </div>

            <hr/>

          </>

} ;

export default Pickup_Fee ;

