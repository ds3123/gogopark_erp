

import { useState , useEffect } from 'react'
import { useSelector } from "react-redux"
import { useHelper_Prices } from "hooks/data/usePrice"
import moment from 'moment' 


type Payable = {

    register : any ;
    setValue : any ;

    editType : string | undefined ;  // 是否為編輯狀態
    data?    : any                   // 服務資料 ( for 編輯 )

}


// @ 使用方案 "加價" 時，在應收金額顯示
const Plan_Plus_Payable = ( { register , setValue , editType , data } : Payable ) => {

    
    // 是否為預約
    const [ is_Appointed , set_Is_Appointed ] = useState( false ) ;

    // 今日
    const today        = moment( new Date ).format( 'YYYY-MM-DD' ) ;

    // 到店日期
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;

    // 加價項目、加價美容  
    const { extraItemFee , extraBeautyFee } = useHelper_Prices() ;


    // 此次服務，自行調整、增減金額
    const Self_Adjust_Amount = useSelector( ( state : any ) => state.Extra_Fee.Self_Adjust_Amount ) ;

    // 接送費
    const pickupFee          = useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ;

    // 方案加價金額  
    const plan_Plus_Amount   = Self_Adjust_Amount + extraItemFee + extraBeautyFee + pickupFee ;


    // 新增狀態
    const is_Create = !editType && plan_Plus_Amount !== 0 ;
   
    // 編輯狀態
    const is_Update = editType && plan_Plus_Amount !== 0 ;
  


    // 設定 _ 方案加價：實收金額 
    useEffect( () => {
      
      // # 新增資料

        // 當天
        if( is_Create && service_Date === today ){
            set_Is_Appointed( false ) ;
            setValue( 'plan_Plus_Amount_Paid' , plan_Plus_Amount ) ;
        } 
        
        // 預約
        if( is_Create && service_Date > today ){
            set_Is_Appointed( true ) ;
            setValue( 'plan_Plus_Amount_Paid' , 0 ) ; 
        }  


     // # 編輯資料
        
        if( is_Update ){

            setValue( 'plan_Plus_Amount_Paid' , data?.amount_paid ) ; 

        } 
       
      // 恢復預設值 
      return () => set_Is_Appointed( false ) 
       

    } , [ service_Date , plan_Plus_Amount ] ) ;


    const tag = "tag is-medium is-rounded m_Right_10 m_Bottom_10" ; 


  


   return <>
 
             { ( is_Create || is_Update ) &&

                <>

                    <div className="f_15 m_Bottom_20 relative" style={{ width:"100%", paddingLeft:"10px" }}>

                       { /* 付款標示 */ }
                       { is_Create &&
                            <b className={ `tag is-medium absolute ${ is_Appointed ? 'is-danger' : '' }` } style={{ top:'0px' , left:'550px' }}>                         
                                <i className="fas fa-dollar-sign"></i> &nbsp; { is_Appointed ? '待付款' : '已付款' }
                            </b>    
                       } 

                       { /* 應收金額 */ }
                       <b className="m_Right_30">  
                           <span className="fDblue"> 方案加價 </span> _ 應收金額 :
                               &nbsp;<span className="fRed" >{  is_Create ? plan_Plus_Amount : data?.amount_payable }
                           </span>&nbsp;元 
                       </b> 

                       { /* 實收金額 */ } 
                       <b> 實收金額 : &nbsp;
                           <input className="input relative" type="number" min="0" {...register("plan_Plus_Amount_Paid")} style={{ width:"80px" , top:"-5px" }}  />
                            &nbsp;元 
                       </b>

                    </div>
        
                    { /* 價格項目 */ }
                    { Self_Adjust_Amount !== 0 && <b className={ tag }> 個體調整金額 : { Self_Adjust_Amount } 元 </b> }
                    { extraItemFee       !== 0 && <b className={ tag }> 加價項目 :    { extraItemFee } 元       </b> }
                    { extraBeautyFee     !== 0 && <b className={ tag }> 加價美容 :    { extraBeautyFee } 元     </b> }
                    { pickupFee          !== 0 && <b className={ tag }> 接送費 :      { pickupFee } 元          </b> }
                
                </>

            }  

          </> 

} ;

export default Plan_Plus_Payable
       