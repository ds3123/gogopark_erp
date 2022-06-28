
import React, {useEffect, useState} from "react"
import Customers from "components/management/data/archive/components/Customers"
import Pets from "components/management/data/archive/components/Pets"
import Services from "components/management/data/archive/components/Services"
import Lodge from "components/management/data/archive/components/Lodge"
import Care from "components/management/data/archive/components/Care"


import cookie from "react-cookies";




// 分類標籤
const tabs = [ '客 戶' , '寵 物' , '洗 美'  , '住 宿' , '安 親' ] ;


// @ 封存列表
const Archive_List = ( ) => {

    // 目前點選標籤
   const [ current_Tab , set_Current_Tab ]         = useState( tabs[0] ) ;

   // 目前點選標籤，相對應元件
   const [ current_Element , set_Current_Element ] = useState< JSX.Element | null >( null ) ;

   // 點選 _ 標籤
   const click_Tab = ( tab : string ) => {

       // 設定 _ 標籤樣式
       set_Current_Tab( tab )

       // 回傳標籤相對應元件
       switch ( tab ) {

           case tabs[0] : set_Current_Element( <Customers /> ) ; break ;
           case tabs[1] : set_Current_Element( <Pets /> ) ; break ;
           case tabs[2] : set_Current_Element( <Services /> ) ; break ;
           case tabs[3] : set_Current_Element( <Lodge /> ) ; break ;
           case tabs[4] : set_Current_Element( <Care /> ) ; break ;

       }

   } ;

   const get_Cookie_click_Tab = (  cookieName : string ) => {


       // Cookie
       const redirect = cookie.load( cookieName ) ;

       // 點選 _ 相對應頁籤
       if( redirect && redirect === '客戶' ) click_Tab( '客 戶' ) ;
       if( redirect && redirect === '寵物' ) click_Tab( '寵 物' ) ;
       if( redirect && redirect === '洗美' ) click_Tab( '洗 美' ) ;
       if( redirect && redirect === '方案' ) click_Tab( '方 案' ) ;
       if( redirect && redirect === '住宿' ) click_Tab( '住 宿' ) ;
       if( redirect && redirect === '安親' ) click_Tab( '安 親' ) ;

   } ;

   // 設定 _ 目前顯示頁面元件
   useEffect(( ) => {

     set_Current_Element( <Customers /> )

   } ,[] ) ;


   // 設定 _ 【 回復封存 】接受 Cookie , 更新頁面並自動點選相對應頁籤
   useEffect(( ) => {

       get_Cookie_click_Tab( 'after_Undo_Archive' )

   } ,[] ) ;

    // 設定 _ 【 刪除資料 】接受 Cookie , 更新頁面並自動點選相對應頁籤
    useEffect(( ) => {

       get_Cookie_click_Tab( 'after_Delete_Archive' )

    } ,[] ) ;


  const bar = { width:"100%", top:"-15px" , padding:"0px" , justifyContent : "left"  } ;


  return <>

            { /* 分類標籤 */ }    
            <b className="tag is-large relative is-white m_Bottom_50" style={ bar } >

               {

                  tabs.map( ( x , y ) => 

                     <b key = { y } className = { `tag pointer m_Right_30 is-medium ${ current_Tab === x ? 'is-primary' : 'is-white' }` }
                                    onClick   = { () => click_Tab( x ) } >

                               { x }

                     </b>

                  )

               }

            </b>

            { /* 點選標籤後，顯示相對應的列表 */ }
            { current_Element }

         </>


} ;

export default Archive_List