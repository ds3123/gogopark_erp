
import React from "react" ;
import { Dispatch } from "redux";


// # 開啟 / 關閉  _ 右側滑動面版
export const set_Side_Panel = ( is_Open : boolean , component : null | JSX.Element , props : any ) => {

    // 設定 _ 右側 【 最外層捲軸 】 : 開啟 --> "fixed" / 關閉 --> ""
    const position_Type          = is_Open ? 'fixed' : '' ; 
    document.body.style.position = position_Type ;   

    return ( dispatch : Dispatch ) => {

                dispatch({

                           type      : "SET_SIDE_PANEL" ,
                           is_Open   : is_Open ,
                           component : component ,
                           props     : props

                         }) ;

            } ;

} ;



// 開啟 / 關閉  _ 左側 : 參考資訊面板
export const set_Side_Info = ( is_Open : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                                   type    : "SET_SIDE_INFO" ,
                                   is_Open : is_Open ,
                                }) ;

            } ;

} ;



// 開啟 / 關閉  _ 左側 : 除錯資訊面板
export const set_Debug_Info = ( is_Open : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                           type    : "SET_DEBUG_INFO" ,
                           is_Open : is_Open ,
                         }) ;

           } ;

} ;



// * 屬性樣式
type Props = {

  modal_Style    : { width : string , height?: string , left : string , bottom? : string , top?:string , border?:string } , // Modal 樣式
  current_Tab?   : string                               // 目前所在服務標籤
  data?          : any                                  // 所傳遞主要資料

}


// # 開啟 / 關閉  _ Modal 彈跳視窗
export const set_Modal = ( is_Open : boolean , component : null | JSX.Element , props : Props ) => {

    // 設定 _ 右側 【 最外層捲軸 】 : 開啟 --> "fixed" / 關閉 --> ""
    const position_Type          = is_Open ? 'fixed' : '' ; 
    document.body.style.position = position_Type ;   

    return ( dispatch : Dispatch ) => {
        
                dispatch({

                            type      : "SET_MODAL" ,
                            is_Open   : is_Open ,
                            component : component ,
                            props     : props

                         }) ;

           } ;

} ;


// ----------------------------------------------------------------------------


// # 設定 _ 顯示 : 寵物區塊 ( 新增表單 )
export const set_Is_Show_Section_Pet = ( is_Show : boolean  ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                : "SET_IS_SHOW_SECTION_PET" ,
                            is_Show_Section_Pet : is_Show
                         }) ;

           } ;

} ;


// # 設定 _ 顯示 : 服務整體區塊，含主人交代、基礎、洗澡、美容、結算 ( 新增表單 )
export const set_Is_Show_Section_Services = ( is_Show : boolean  ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                            type                     : "SET_IS_SHOW_SECTION_SERVICES" ,
                            is_Show_Section_Services : is_Show
                         }) ;

           } ;

} ;



// # 統一設定
export const set_Is_Show_Sections = ( is_Show : boolean  ) => {

    return ( dispatch : any ) => {

               dispatch( set_Is_Show_Section_Pet( is_Show ) ) ;       // 寵物
               dispatch( set_Is_Show_Section_Services( is_Show ) ) ;  // 整體服務

           } ;

} ;




// # 取得 _ 導覽列主要連結選項
export const get_Nav_Options = ( account : any ) => {

    return ( dispatch : Dispatch ) => {
                interface IOptionObj {
                    title : string ;
                    url   : string ;
                    color : string ;
                    icon  : string ;
                }

                // 頁面選項
                const OptionArr : IOptionObj[] = [

                    { title : "首 頁"  , url : "/index"           , color : "is-white"   , icon : "fas fa-home"  } ,
                    { title : "客 戶"  , url : "/customers"  , color : "is-warning" , icon : "fas fa-user"  } ,
                    { title : "寵 物"  , url : "/pets"       , color : "is-warning" , icon : "fas fa-dog"  } ,
                    { title : "洗 美"  , url : "/services"   , color : "is-success" , icon : "fas fa-bath"  } ,
                    { title : "住 宿"  , url : "/lodge"      , color : "is-success" , icon : "fas fa-home"  } ,
                    { title : "美容師" , url : "/beautician" , color : "is-danger"  , icon : "fas fa-cut"  } ,
                    { title : "管理區" , url : "/management" , color : ""           , icon : "fas fa-sliders-h"  } ,

                ] ;

                const filter_Manage = OptionArr ;
                const filter_Test   = OptionArr ;
                const filter_Admin  = OptionArr.filter( x => ( x['title'] !== '美容師' && x['title'] !== '管理區'  ) ) ;
                const filter_Beauty = OptionArr.filter( x => ( x['title'] === '美容師' ) ) ;
                const filter_Pickup = OptionArr.filter( x => ( x['title'] === '美容師' ) ) ;

                let _OptionArr : any[] = [] ;

                const Employee = account['employee_Type'] ;
                const Position = account['position_Type'] ;

                switch ( true ) {

                    case Employee === '管理帳號' :
                        _OptionArr = filter_Manage ; break ;

                    case Employee === '測試帳號' :
                        _OptionArr = filter_Test ; break ;

                    case Position === '櫃台' || Position === '計時櫃台'  :
                        _OptionArr = filter_Admin ; break ;

                    case Position === '美容' || Position === '計時美容' :
                        _OptionArr = filter_Beauty ; break ;

                    case Position === '接送' || Position === '計時接送' :
                        _OptionArr = filter_Pickup ; break ;

                }


                dispatch({
                           type        : "GET_NAV_OPTIONS" ,
                           Nav_Options : _OptionArr
                 }) ;


           } ;

} ;





