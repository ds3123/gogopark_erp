import { useSelector } from "react-redux";
import axios from "utils/axios" ;


// @ 新增 _ 客戶關係人
export const useCreate_Customer_Relatives = ( ) => {

    // 資料庫已有 : 該客戶紀錄
    const IsExisting_Customer    = useSelector( ( state : any ) => state.Customer.IsExisting_Customer ) ;

    // 關係人數
    const Customer_Relatives_Num = useSelector( ( state : any ) => state.Customer.Customer_Relatives_Num ) ;
    

    // 新增資料邏輯
    const create_Cus_Relatives = ( api : string , data : any ) => {


        // 依照關係人數，新增關係人
        for( let n = 1 ; n <= Customer_Relatives_Num ; n++ ){

            const num = n.toString() ; 

            // 轉換資料欄位
            const submitData = {

                customer_id  : data['customer_Id'] ,  // 客戶身分證字號

                name         : data['customer_Relative_Name_'+num] ,
                type         : data['customer_Relative_Type_'+num] ,
                tag          : data['customer_Relative_Family_'+num] === "請選擇" ? "" : data['customer_Relative_Family_'+num] ,
                
                mobile_phone : data['customer_Relative_Cellphone_'+num] ,
                tel_phone    : data['customer_Relative_Telephone_'+num] ,

                sex          : data['customer_Relative_Sex_'+num] === "請選擇" ? "" : data['customer_Relative_Sex_'+num] ,  
                id           : data['customer_Relative_Id_'+num] ,   
                address      : data['customer_Relative_Address_'+num]    

            } ;

            if( !IsExisting_Customer ){

                axios.post( api , submitData )
                     .catch( err =>  alert( `新增 "關係人" 錯誤 ( ${ err } )．`  )  ) ;

            } 
                 

        }

    } ;

    return create_Cus_Relatives

} ;
