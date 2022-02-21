
import React from "react"
import { useSelector } from "react-redux";

const get_Return_Value = ( current : string , arr : string[] ) => arr.indexOf( current ) !== -1 ? true : false ;

// --------------------------

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

// <Create_Service />
export const useIs_Show_Create_Service = ( current : string ) => {

   const arr = [ "基礎" , "洗澡" , "美容" , "安親" , "住宿" , "方案" ] ;

   // 是否完整填寫 Ex. 客戶區塊欄位
   const is_Show_Section_Services = useSelector( ( state : any ) => state.Layout.is_Show_Section_Services ) ;

   return get_Return_Value( current , arr ) && is_Show_Section_Services
} ;



