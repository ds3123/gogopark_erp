
import { curry } from "lodash";
import React from "react" ;
import { Dispatch } from "redux" ;
import axios from "utils/axios";
import { get_Service_Url } from "utils/data/switch" ;
import { get_Today } from "utils/time/date"




/* @ 寵物  */

// # 設定 _ 是否 : 資料庫已存在寵物
export const set_IsExisting_Pet = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type           : "SET_IS_EXISTING_PET" ,
                    IsExisting_Pet : bool
                }) ;

           } ;

} ;

// # 設定 _ 寵物頁資料 _ 是否下載中
export const set_Pet_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type          : "SET_PET_ISLOADING" ,
                    Pet_isLoading : bool
                }) ;

           } ;

} ;

// # 設定 _ 目前 "品種" 下拉選項，所選擇的品種 Id
export const set_Current_Species_Select_Id = ( speciesId : number | string | null ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_CURRENT_SPECIES_ID" ,
                    current_Species_Id : speciesId
                }) ;

            } ;

} ;

// # 設定 _ 目前 : 寵物
export const set_Current_Pet = ( pet : any ) => {

    return ( dispatch : Dispatch ) => {

             dispatch({
                type        : "SET_CURRENT_PET" ,
                current_Pet : pet
             }) ;

          } ;

} ;

// # 設定 _ 目前 "體型" 下拉選項
export const set_Current_Pet_Size = ( size : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type             : "SET_CURRENT_PET_SIZE" ,
                    current_Pet_Size : size
                }) ;

          } ;

} ;

// # 設定 _ 目前寵物編號
export const set_Current_Pet_Serial = ( serial : string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_CURRENT_PET_SERIAL" ,
                    current_Pet_Serial : serial
                }) ;

            } ;

} ;

// 將寵物所有狀態，設回 _ 初始值
export const set_Pet_States_To_Default = (  ) => {

    return ( dispatch : Dispatch ) => {

             dispatch({ type : "SET_PET_STATES_TO_DEFAULT" }) ;

           } ;

} ;


type serviceType = '基礎' | '洗澡' | '美容' | '安親' | '住宿'  ;

// 取得 _ 該寵物服務 ( Ex. 基礎、洗澡、美容 ) 資料紀錄
export const get_Pet_Service_Records = ( service_Type : serviceType , pet_Serial : string , species_Id : any ) => {

    const service_Url = get_Service_Url( service_Type )  // 取得服務 url ( basics、bathes、beauties ) 

    return ( dispatch : any ) => {

              if( service_Url ){

                axios.get( `/${ service_Url }/show_pet_records/${ pet_Serial }` ).then( res => {
                 
                    dispatch({ type : "GET_CURRENT_PET_SERVICE_RECORDS" , records : res.data }) ; // # 設定 _ 服務紀錄
                    
                 })

              }

           } ;

} ;


// 設定 _ 特定寵物服務 ( Ex. 基礎、洗澡、美容 ) 資料紀錄
export const set_Pet_Service_Records = ( pet_Records : any[] ) => {

    return ( dispatch : any ) => {

              dispatch({ type : "SET_CURRENT_PET_SERVICE_RECORDS" , records : pet_Records }) ; // # 設定 _ 服務紀錄

           } ;

} ;








// # 取得 _ 目前某品種的累積數 ( 資料表 : pet  )
export const get_Current_Pet_Species_Num = ( species_Name : string ) => {

    return ( dispatch : Dispatch ) => {

             axios.get( `/pets/show_current_pet_species/${ species_Name }` ).then( res => {

                 dispatch({ 
                             type                    : "GET_CURRENT_PET_SPECIES_NUM" , 
                             current_Pet_Species_Num : res.data.length 
                          }) ;
                
             })

          } ;

} ;


// # 設定、注入 _ 寵物編號
export const set_Pet_Serial_Input = (  pNum : string , current_Pet_Species_Num : number , setValue : any ) => {

    return ( ) => {
        
                /*
                
                @ 編號產生規則 :

                    

                    1 前 2 位數為寵物品種序號          ( Ex. 秋田犬為 56 ) 
                    1. 後 4 位數為該品種目前資料筆數 + 1 
                
                    --> 若秋田犬在資料表( pet ) 中已有 2 筆，則目前新增寵物自動產生的序號為 : 5600003

                */ 

    
                const today = get_Today().slice(2,10) ;  // 今日 ( 前 2 位數忽略 Ex 20211114 --> 211114 )   

                const cNum  = current_Pet_Species_Num + 1  ;

                let _cNum   = '' ;

                if( cNum < 10 )                  _cNum = '000'+ cNum.toString() ;
                if( cNum >= 10 && cNum < 100 )   _cNum = '00' + cNum.toString() ;
                if( cNum >= 100 && cNum < 1000 ) _cNum = '0'  + cNum.toString() ;
                    
                setValue( "pet_Serial" ,  'P_251_01_' + today + '_' + pNum + _cNum ) ;       // 設定 input 欄位值      

            } ;

} ;











