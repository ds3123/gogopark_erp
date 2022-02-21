
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {set_Invalid_To_Plan} from "../../store/actions/action_Form_Validator";
import {set_Use_Plan} from "../../store/actions/action_Plan";


import moment from "moment";


/*
*   @ 自訂 _ 表單驗證邏輯
*
*/


// 新增 _ 洗澡、美容時，付款方式採 [ 方案 ] : "包月洗澡"、"包月美容" 下 ，方案相關驗證 ( invalid_To_Plan )
export const usePlan_Validator = ( paymentMethod : string   ) => {

     const dispatch      = useDispatch() ;

     // 是否已點選 : 方案標籤中 "使用此方案" ( 由 usePlans_Records.tsx 中，點選標籤後設定 --> 作為後續判斷 _ 表單是否可提交，判斷依據之一 )
     const is_Plan_Used  = useSelector(( state : any ) => state.Plan.is_Plan_Used ) ;


    // 變動 _ 付款方式
    useEffect( () => {

        // 若為 "方案" ， 先使提交新增按鈕失效
        if( paymentMethod === '方案' ){

          dispatch( set_Invalid_To_Plan( true ) ) ;

        }else{

          dispatch( set_Use_Plan( false ) ) ;        // 設定 _ 是否已點選方案標籤，設回初始值
          dispatch( set_Invalid_To_Plan( false ) ) ; // 將因方案驗證條件，設回初始值

        } 

    } , [ paymentMethod ] ) ;

    
    // 是否已點選 _ 使用方案
    useEffect( ( ) => {

        // 已選擇 "方案" ， 並 "尚未" 點選 _ 套用方案 --> 使新增提交鈕失效
        if( ( paymentMethod === '方案' ) && !is_Plan_Used ){
            dispatch( set_Invalid_To_Plan( true ) ) ;
        }

        if( ( paymentMethod === '方案') && is_Plan_Used  ){
            dispatch( set_Invalid_To_Plan( false ) ) ;
        }

    } , [ is_Plan_Used ] ) ;


} ;



// 新增 _ 住宿
export const useLodge_Validator = () => {

    const lodge_Validator = ( data : any ) => {

        // 轉換日期格式
        const check_In  = moment( data['lodge_CheckIn_Date'] ).format('YYYY-MM-DD') ;    // 住房日期   
        const check_Out = moment( data['lodge_CheckOut_Date'] ).format('YYYY-MM-DD') ;   // 退房日期
        
        if( data['lodge_Serial'] === '' ){ alert('請輸入 : 合約編號') ; return false ; }

        if( data['lodge_Room_Type'] === '請選擇' ){ alert('請選擇 : 房型') ;  return false ; }

        if( data['lodge_Room_Number'] === '請選擇' ){ alert('請選擇 : 房號') ;  return false ; }

        if( check_In > check_Out ){ alert('住房日期，不能晚於退房日期') ;  return false ; }
      
        if( check_In === check_Out ){ alert('住房日期，不能與退房日期相同') ;  return false ; }

        return true ;
  
    } ;
  
    return lodge_Validator

} ;


// 新增 _ 價格
export const usePrice_Validator = () => {

    const price_Validator = ( data : any ) => {
  
        // for 寵物品種
        if( data['service_Price_Create_Way'] === '寵物品種' ){ 
            
           if( data['price_Species_Id'] === '請選擇' ){ alert('請選擇 : 指定品種') ; return false ; }

           if( !data['price_Fist_Bath'] ){     alert('請輸入 : 初次洗澡優惠金額') ; return false ; }
           if( !data['price_Single_Bath'] ){   alert('請輸入 : 單次洗澡金額') ;     return false ; }
           if( !data['price_Month_Bath'] ){    alert('請輸入 : 包月洗澡金額') ;     return false ; }
           if( !data['price_Single_Beauty'] ){ alert('請輸入 : 單次美容金額') ;     return false ; }
           if( !data['price_Month_Beauty'] ){  alert('請輸入 : 包月美容金額') ;     return false ; }

        }

        // for 個別項目
        if( data['service_Price_Create_Way'] === '個別項目' ){ 

            if( data['price_Type'] === '請選擇' ){ alert('請選擇 : 服務類別') ; return false ; }

            if( !data['price_Item'] ){   alert('請填寫 : 服務名稱') ; return false ; }
            if( !data['price_Amount'] ){ alert('請填寫 : 服務價格') ; return false ; }

        }
    
        return true ;
  
    } ;
  
    return price_Validator

} ;





// 新增 _ 員工
export const useEmployee_Validator = () => {

    const employee_Validator = ( data : any ) => {
  
        if( data['employee_Name'] === '' ){
            alert('請輸入 : 員工姓名') ;
            return false ;
        }
  
        if( data['employee_Sex'] === '請選擇' ){
            alert('請選擇 : 員工性別') ;
            return false ;
        }
  
        if( data['employee_Id'] === '' ){
            alert('請輸入 : 員工身分證字號') ;
            return false ;
        }
  
        if( data['employee_MobilePhone'] === '' ){
            alert('請輸入 : 員工手機號碼') ;
            return false ;
        }
  
        if( data['employee_Address'] === '' ){
            alert('請輸入 : 員工通訊地址') ;
            return false ;
        }
  
        // ---------------------------------
  
        if( data['relative_Name_1'] === '' ){
            alert('請輸入 : 首位緊急聯絡人姓名') ;
            return false ;
        }
  
        if( data['relative_Family_1'] === '請選擇' ){
            alert('請選擇 : 首位緊急聯絡人關係') ;
            return false ;
        }
  
        if( data['relative_MobilePhone_1'] === '' ){
            alert('請輸入 : 首位緊急聯絡人手機號碼') ;
            return false ;
        }
  
        return true ;
  
    } ;
  
    return employee_Validator
  
  } ;
  



