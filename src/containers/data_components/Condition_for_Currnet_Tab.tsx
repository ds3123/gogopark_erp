
import { useSelector } from "react-redux";



const get_Return_Value = ( current : string , arr : string[] ) => arr.includes( current ) ? true : false ;

// ------------------------------------------------------------------------------------

export const useMatch_Obj = ( current : string ) => {

     let obj = {} as any ;

     // 符合：
     obj.is_Customer_Relatives      = useIs_Customer_Relatives( current ) ;      // 客戶關係人
     obj.is_Check_Pet_Bite_Column   = useIs_Check_Pet_Bite_Column( current  ) ;  // 寵物區塊，是否勾選會咬人
    
     // 是否顯示 _ 元件 ：
     obj.is_Show_Service_Info       = useIs_Show_Service_Info( current ) ;       //  <Service_Info />  

     obj.is_Show_Create_Customer    = useIs_Show_Create_Customer( current ) ;    //  <Create_Customer />
     obj.is_Show_Create_Pet         = useIs_Show_Create_Pet( current ) ;         //  <Create_Pet />
     obj.is_Show_Custom_Note        = useIs_Show_Customer_Note( current ) ;      //  <Customer_Note />

     obj.is_Show_Create_Service     = useIs_Show_Create_Service( current ) ;     //  <Create_Service />
     obj.is_Show_Basic_Form         = useIs_Show_Basic_Form( current ) ;         //  <Basic_Form />
     obj.is_Show_Bath_Form          = useIs_Show_Bath_Form( current ) ;          //  <Bath_Form />
     
     obj.is_Show_Self_Adjust_Amount = useIs_Show_Self_Adjust_Amount( current ) ; //  <Self_Adjust_Amount />
     obj.is_Show_Pickup_Fee         = useIs_Show_Pickup_Fee( current ) ;         //  <Pickup_Fee />
     obj.is_Show_Rating_Options     = useIs_Show_Rating_Options( current ) ;     //  rating_Options
     
     obj.is_Show_Summary_Fee        = useIs_Show_Summary_Fee( current ) ;        //  <Summary_Fee />

     return obj ;

} ;

// ------------------------------------------------------------------------------------


// # 符合 _ 客戶關係人
export const useIs_Customer_Relatives = ( current : string ) => {
   const arr = [ '客戶' , '寵物' , '基礎' , '洗澡' , '美容' , '方案' , '安親' , '住宿'  ] ;
   return get_Return_Value( current , arr )
} ;

// # 符合 _ 寵物是否會咬人
export const useIs_Check_Pet_Bite_Column = ( current : string ) => {
   const arr = [ '寵物' , '基礎' , '洗澡' , '美容' , '安親' , '住宿' ] ;
   return get_Return_Value( current , arr )
} ;

// # 是否顯示元件 : ---------------------

// <Service_Info />
export const useIs_Show_Service_Info = ( current : string ) => {
   const arr = [ '基礎' , '洗澡' , '美容' ] ;
   return get_Return_Value( current , arr )
} ;

// <Create_Customer />
export const useIs_Show_Create_Customer = ( current : string ) => {
   const arr = [ "客戶" , "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ;
   return get_Return_Value( current , arr )
} ;

// <Create_Pet />
export const useIs_Show_Create_Pet = ( current : string ) => {

   const arr = [ "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ;

   // 是否完整填寫 Ex. 客戶區塊欄位
   const is_Show_Section_Pet = useSelector( ( state : any ) => state.Layout.is_Show_Section_Pet ) ;

   // return get_Return_Value( current , arr ) && is_Show_Section_Pet
   
   return get_Return_Value( current , arr ) 
   
} ;

// <Customer_Note />
export const useIs_Show_Customer_Note = ( current : string ) => {

   const arr = [ "基礎" , "洗澡" , "美容" , "安親", "住宿" ] ;
   return get_Return_Value( current , arr ) 
   
} ;

// <Basic_Form />
export const useIs_Show_Basic_Form = ( current : string ) => {

   const arr = [ "基礎" , "洗澡" , "美容" ] ;
   return get_Return_Value( current , arr ) 
   
} ;


// <Basic_Form />
export const useIs_Show_Bath_Form = ( current : string ) => {

   const arr = [ "洗澡" , "美容" ] ;
   return get_Return_Value( current , arr ) 
   
} ;


// <Create_Service />
export const useIs_Show_Create_Service = ( current : string ) => {

   const arr = [ "客戶" , "寵物" , "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ;

   // 是否完整填寫 Ex. 客戶區塊欄位
   const is_Show_Section_Services = useSelector( ( state : any ) => state.Layout.is_Show_Section_Services ) ;

   return get_Return_Value( current , arr ) && is_Show_Section_Services
} ;


// <Self_Adjust_Amount />
export const useIs_Show_Self_Adjust_Amount = ( current : string ) => {

   const arr = [  "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ;
   return get_Return_Value( current , arr ) 
   
} ;

// <Pickup_Fee />
export const useIs_Show_Pickup_Fee = ( current : string ) => {

   const arr = [  "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ;
   return get_Return_Value( current , arr ) 
   
} ;


// <Rating_Options />
export const useIs_Show_Rating_Options = ( current : string ) => {

   const arr = [  "基礎" , "洗澡" , "美容" , "安親" , "住宿" ] ;
   return get_Return_Value( current , arr ) 
   
} ;


// <Summary_Fee />
export const useIs_Show_Summary_Fee = ( current : string ) => {

   const arr = [  "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ;
   return get_Return_Value( current , arr ) 
   
} ;


