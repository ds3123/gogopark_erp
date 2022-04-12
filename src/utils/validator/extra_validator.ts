
import moment from "moment";



// @ Yup schema 以外，額外新增的欄位驗證
export const extra_Validator = ( current : string , data : any , is_Obj : any ) : boolean => {


    // 新增驗證 : 寵物欄位 ( 是否會咬人 )  2022.03.21 先取消
    // if( is_Obj.is_Check_Pet_Bite_Column && data['bite'] === null ){
    //     alert('請勾選 : 寵物是否會咬人選項') ;
    //     return false ;
    // }


    if( current === "住宿" ){

        // 轉換日期格式
        const check_In  = moment( data['lodge_CheckIn_Date'] ).format('YYYY-MM-DD') ;    // 住房日期   
        const check_Out = moment( data['lodge_CheckOut_Date'] ).format('YYYY-MM-DD') ;   // 退房日期
        
        if( data['lodge_Serial'] === '' ){ alert('請輸入 : 合約編號') ; return false ; }

        if( data['lodge_Room_Type'] === '請選擇' ){ alert('請選擇 : 房型') ;  return false ; }

        if( data['lodge_Room_Number'] === '請選擇' ){ alert('請選擇 : 房號') ;  return false ; }

        if( check_In > check_Out ){ alert('住房日期，不能晚於退房日期') ;  return false ; }

        if( check_In === check_Out ){ alert('住房日期，不能與退房日期相同') ;  return false ; }

    }


    if( current === "價格" ){

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

    }


    if( current === "員工" && data["employee_Type"] === "工作人員" ){

        
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


    } 

   return true ;

} ;