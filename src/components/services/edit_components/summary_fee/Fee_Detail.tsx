

import { FC , useEffect , useState } from "react"
import { useHelper_Prices, usePrice_Plan } from "hooks/data/usePrice";
import { useSelector } from "react-redux";


type detail = {

    servicePrice        : number ; // 基礎、洗澡、美容、方案、安親、住宿 ( 各項服務基本費用小計 )

    pickupFee?          : number ; // 接送費
    selfAdjustAmount?   : number ; // 此次服務，自行調整、增減金額

    extraItem?          : number ; // 加價項目
    extraBeauty?        : number ; // 加價美容

    adjustAmount?       : number ; // 自行調整金額 

    current_Plan_Type?  : string ; // 方案類型 ( 名稱 )

}


/* @ 金額所包含 _ 費用明細 */
const margin = { marginLeft : "10px" , marginBottom : "15px" } ;

// 基礎
export const FeeDetail_Basic : FC< detail > = ( { servicePrice , pickupFee , selfAdjustAmount  } ) => {

    return  <>
              { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 基礎費 : { servicePrice } 元  </b> }
              { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
              { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元     </b> }
            </>

} ;

// 洗澡
export const FeeDetail_Bath : FC< detail > = ( { servicePrice , extraItem , extraBeauty , pickupFee , selfAdjustAmount } ) => {

        return  <>
                   { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 洗澡費 :   { servicePrice } 元  </b> }
                   { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
                   { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
                   { extraItem !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItem } 元     </b> }
                   { extraBeauty !== 0  && <b className="tag is-medium is-rounded" style={ margin }> 加價美容 : { extraBeauty } 元   </b> }
                </>

} ;

// 美容
export const FeeDetail_Beauty : FC< detail > = ( { servicePrice, extraItem , pickupFee, selfAdjustAmount } ) => {

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 美容費 :   { servicePrice } 元  </b> }
                { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
                { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
                { extraItem !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItem } 元     </b> }
            </>

} ;

// 安親
export const FeeDetail_Care : FC< detail > = ( { servicePrice, pickupFee, selfAdjustAmount} ) => {

    return  <>
              { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 安親費 :   { servicePrice } 元  </b> }
              { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
              { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
            </>

} ;

// 住宿
export const FeeDetail_Lodge : FC< detail > = ( { servicePrice , pickupFee, selfAdjustAmount } ) => {

    return  <>
               { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 住宿費 :   { servicePrice } 元  </b> }
               { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
               { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
            </>

} ;

// 【 預設 】方案 : 包月洗澡
export const FeeDetail_Plan_Bath : FC< detail > = ( { servicePrice, adjustAmount  } ) => {

    // 接送費 ( 方案有獨立的接送費輸入欄位 )
    const plan_PickupFee          = useSelector(( state : any ) => state.Plan.service_Pickup_Fee )  ;

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 包月洗澡 _ 基本價格 : { servicePrice } 元  </b> }
                { adjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjustAmount } 元  </b> }
                { plan_PickupFee !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :        { plan_PickupFee } 元  </b> }
            </>

} ;

// 【 預設 】方案 : 包月美容
export const FeeDetail_Plan_Beauty : FC< detail > = ( { servicePrice, adjustAmount} ) => {

    // 接送費 ( 方案有獨立的接送費輸入欄位 )
    const plan_PickupFee = useSelector(( state : any ) => state.Plan.service_Pickup_Fee )  ;

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 包月美容 _ 基本價格 : { servicePrice } 元  </b> }
                { adjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjustAmount } 元  </b> }
                { plan_PickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :         { plan_PickupFee } 元  </b> }
            </>

} ;


// 【 自訂 】方案 
export const FeeDetail_Plan_Custom : FC< detail > = ( {  current_Plan_Type , servicePrice , adjustAmount   } ) => {

  // 接送費 ( 方案有獨立的接送費輸入欄位 )
  const plan_PickupFee = useSelector( ( state : any ) => state.Plan.service_Pickup_Fee )  ;


  return  <>
              { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> { current_Plan_Type } _ 基本價格 : { servicePrice } 元  </b> }
              { adjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjustAmount } 元  </b> }
              { plan_PickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :         { plan_PickupFee } 元     </b> }
          </>

} ;


// @ ============================= 彙總以上各服務費用細節元件，以 <FeeDetail /> 作為 <Summary_Fee /> 子元件 ====================================

type feeDetail = {
    current       : string ;
    editType      : string | undefined ;
    paymentMethod : string ;
}

export const FeeDetail : FC< feeDetail > = ( { current , editType , paymentMethod } ) => {


  const custom_Plan_Basic_Price = useSelector( ( state : any ) => state.Plan.custom_Plan_Basic_Price ) ; // 自訂方案基本價格 


  // 取得 _ 基礎、洗澡、美容 : 金額
  const { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee } = useHelper_Prices();


  // # 安親 --------
  const current_Care_Type       = useSelector(( state : any ) => state.Care.current_Care_Type ) ;         // 安親類型 ( Ex. 一般安親、住宿 _ 提早抵達、住宿 _ 延後帶走 )
  const Care_Ordinary_Price     = useSelector(( state : any ) => state.Care.Care_Ordinary_Price ) ;       // 一般安親費用
  const Care_Ahead_Price        = useSelector(( state : any ) => state.Care.Care_Ahead_Price ) ;          // 住宿 _ 提早抵達 : 轉安親費用
  const Care_Postpone_Price     = useSelector(( state : any ) => state.Care.Care_Postpone_Price ) ;       // 住宿 _ 延後帶走 : 轉安親費用

  // # 住宿 --------
  const current_Lodge_Price_Sum = useSelector(( state : any ) => state.Lodge.current_Lodge_Price_Sum ) ;  // 住宿金額

  // # 方案 --------
  const current_Plan_Type       = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;         // 方案類型( 名稱 ) ( Ex. 預設方案 : 包月洗澡、包月美容 、自訂方案 )

  const Month_Bath_Price        = useSelector(( state : any ) => state.Plan.Month_Bath_Price ) ;          // 預設 _ 方案價格 ( 包月洗澡 )
  const Month_Beauty_Price      = useSelector(( state : any ) => state.Plan.Month_Beauty_Price ) ;        // 預設 _ 方案價格 ( 包月美容 )
  const [ custom_Plan_Price , set_Custom_Plan_Price ] = useState( 0 ) ;                                   // 自訂 _ 方案價格     

  const self_Adjust_Price       = useSelector(( state : any ) => state.Plan.self_Adjust_Amount ) ;        // 自行加減價金額
 

  // # 接送費
  const pickupFee               = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee )  ;

  // # 此次服務，自行調整、增減金額
  const Self_Adjust_Amount      = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;


  // # 傳入各個服務元件的 屬性 : -----------------------------------------------------------------------------------------------

      // 基礎
      const obj_Basic = {
                           servicePrice     : basicSumPrice ,
                           pickupFee        : pickupFee ,
                           selfAdjustAmount : Self_Adjust_Amount
                         } ;

      // 洗澡
      const obj_Bath = {
                          servicePrice     : bathSumPrice ,
                          pickupFee        : pickupFee ,
                          extraItem        : extraItemFee ,
                          extraBeauty      : extraBeautyFee ,
                          selfAdjustAmount : Self_Adjust_Amount
                        } ;

      // 美容
      const obj_Beauty = {
                            servicePrice     : beautySumPrice ,
                            pickupFee        : pickupFee ,
                            extraItem        : extraItemFee ,
                            selfAdjustAmount : Self_Adjust_Amount
                         } ;

      // 安親 : 一般安親
      const obj_Care_Ordinary = {
                                  servicePrice     : Care_Ordinary_Price ,
                                  pickupFee        : pickupFee ,
                                  selfAdjustAmount : Self_Adjust_Amount
                                } ;

      // 安親 : 住宿_提早抵達
      const obj_Care_Ahead = {
                               servicePrice     : Care_Ahead_Price ,
                               pickupFee        : pickupFee ,
                               selfAdjustAmount : Self_Adjust_Amount
                             } ;

      // 安親 : 住宿_延後帶走
      const obj_Care_Postpone = {
                                  servicePrice     : Care_Postpone_Price ,
                                  pickupFee        : pickupFee ,
                                  selfAdjustAmount : Self_Adjust_Amount
                                } ;

      // 安親 : 住宿_延後帶走
      const obj_Lodge = {
                          servicePrice     : current_Lodge_Price_Sum ,
                          pickupFee        : pickupFee ,
                          selfAdjustAmount : Self_Adjust_Amount
                        } ;

      //【 預設 】方案 : 包月洗澡
      const obj_Plan_Bath = {
                              servicePrice : Month_Bath_Price ,
                              adjustAmount : self_Adjust_Price ,
                             } ;

      //【 預設 】方案 : 包月美容
      const obj_Plan_Beauty = {
                                servicePrice : Month_Beauty_Price ,
                                adjustAmount : self_Adjust_Price ,
                              } ;

      //【 自訂 】方案 
      const obj_Plan_Custom = {
                                current_Plan_Type : current_Plan_Type ,    
                                servicePrice      : custom_Plan_Price ,
                                adjustAmount      : self_Adjust_Price ,
                              } ; 
                                
    
    // for【 自訂方案 】 設定 _ 基本價格 ( 依照以上 get_Custom_Plan_By_Name 取得資料設定 )
    useEffect( () => { 

      set_Custom_Plan_Price( custom_Plan_Basic_Price ) ;

    } , [ custom_Plan_Basic_Price ] ) ;


    return  <>

              { /* 【 編輯 】 時，不顯示 _ 收費細節 ( # 2021.08.14 再看看是否改為編輯也顯示 ? )  */ }

              { ( !editType  && paymentMethod === '現金' )  &&

                  <>

                        { /* 主要服務 : 基礎、洗澡、美容  */ }
                        { current === '基礎' && <FeeDetail_Basic  { ...obj_Basic  } /> }
                        { current === '洗澡' && <FeeDetail_Bath   { ...obj_Bath   } /> }
                        { current === '美容' && <FeeDetail_Beauty { ...obj_Beauty } /> }

                        { /* 安親 */ }
                        { ( current === '安親' && current_Care_Type === '一般安親' ) &&       <FeeDetail_Care  { ...obj_Care_Ordinary }  /> }
                        { ( current === '安親' && current_Care_Type === '住宿_提早抵達' ) &&  <FeeDetail_Care  { ...obj_Care_Ahead } /> }
                        { ( current === '安親' && current_Care_Type === '住宿_延後帶走' ) &&  <FeeDetail_Care  { ...obj_Care_Postpone }  /> }

                        { /* 住宿 */ }
                        { current === '住宿' && <FeeDetail_Lodge  { ...obj_Lodge } /> }

                        { /* 方案 ( 預設 : 包月洗澡 、 包月美容 / 自訂 ) */ }
                        { ( current === '方案' && current_Plan_Type === '包月洗澡' ) && <FeeDetail_Plan_Bath   { ...obj_Plan_Bath } /> }
                        { ( current === '方案' && current_Plan_Type === '包月美容' ) && <FeeDetail_Plan_Beauty { ...obj_Plan_Beauty } /> }

                        { ( current === '方案' && ( current_Plan_Type !== '包月洗澡' && current_Plan_Type !== '包月美容' ) ) && 
                                 <FeeDetail_Plan_Custom { ...obj_Plan_Custom } /> }

                  </>

              }

         </>


} ;


