
import React, {useEffect, useState} from "react"

import { set_Modal } from "store/actions/action_Global_Layout" ;
import { useDispatch } from "react-redux" ;

import Service_Records from "components/services/edit_components/Service_Records";
import useServiceType from "hooks/layout/useServiceType";


import { Service_Type } from "utils/Interface_Type"


// @ 顯示 _ 客戶過去各種服務紀錄 ( 基礎、洗澡、美容 / 顯示在標題列右上方 )
const Customer_Services_Records = ( obj : { current : Service_Type , cus_Records : any[] } ) => {

    const dispatch = useDispatch() ;

    const { current , cus_Records } = obj ;


    // 服務單欄位 _ 顏色、Icon
    const { color , icon }  = useServiceType( current , false , 'medium' ) ;

    // 點選 _ 顯示過去紀錄
    const click_Tab = ( ) => {

       dispatch( set_Modal(true ,
                                <Service_Records type="客戶"/> ,
                                { 
                                  modal_Style : { width:"90%" , left : "5%" } , 
                                  current_Tab : current 
                                }
                           )) ;

    } ;

    const style = { top : "-38px", left:"140px" , width:"70%", height:"35px" } ;

    return <>
                {  
                   ( cus_Records.length > 0  && ( current === '基礎' || current === '洗澡' || current === '美容' )  )  &&

                     <div className="absolute" style={ style } >
                        <b className={ color + "pointer" } onClick={ click_Tab } >
                           <i className = { icon } ></i> &nbsp; 過去所有 { current } 紀錄 ( 共 { cus_Records.length } 筆 )
                        </b>
                     </div>
                }
           </>

} ;

export default Customer_Services_Records