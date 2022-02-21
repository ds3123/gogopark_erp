
import React, {FC , useState , useContext, useEffect} from "react"
import { SidePanelContext } from "templates/panel/Side_Panel";
import {useDispatch, useSelector} from "react-redux";
import {set_Current_Customer_Name} from "store/actions/action_Customer";
import axios from "utils/axios";

import { set_month_bath_price , set_month_beauty_price } from "store/actions/action_Plan";

import { useSpecies_Id_Prices } from "hooks/data/useSpecies_Prices"
import { useSpecies_Id_To_Name } from 'hooks/data/useSwitch_Species_Id_Name'


import { set_Modal } from "store/actions/action_Global_Layout"

import Pet_Records from "components/services/edit_components/Pet_Records"



// @ 左側固定位置 _ 服務提示資訊 ( Ex. 特定品種所有相關服務價格列表 )
const Side_Info  = ( ) => {

    const dispatch              = useDispatch() ;
    const value                 = useContext( SidePanelContext ) ;  // 取得 context 值

    // 是否開啟
    const Side_Info_Open        = useSelector(( state : any ) => state.Layout.Side_Info_Open  ) ;

    // @ 【 新增 】
    const current_Create_Tab    = useSelector(( state : any ) => state.Service.current_Create_Tab  ) ;      // 目前點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )

    const Current_Customer_Name = useSelector(( state : any ) => state.Customer.Current_Customer_Name  ) ;  // 目前輸入 : 客戶姓名
    const Current_Customer_Id   = useSelector( ( state : any ) => state.Customer.Current_Customer_Id ) ;    // 目前輸入 : 身分證字號

    const current_Species_Id    = useSelector(( state : any ) => state.Pet.current_Species_Id  ) ;          // 目前所輸入 : 寵物品種 id

    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets = useSelector(( state:any ) => state.Customer.Current_Customer_Pets ) ;


    // # 客人訊息
    const [ cus_Name , set_Cus_Name ] = useState( '' ) ;     // 姓名
    const [ cus_Id , set_Cus_Id ]     = useState( '' ) ;     // 身分證字號


    // 目前寵物品種名稱 ( Ex. 秋田犬 )
    const current_Pet_Species_Name = useSpecies_Id_To_Name( current_Species_Id ) ;

    // 依照 "寵物品種 Id" ，查詢相對應服務 : 基本價格
    const {
             bath_First ,     // 初次洗澡
             bath_Single ,    // 單次洗澡
             bath_Month ,     // 包月洗澡
             beauty_Single ,  // 單次美容
             beauty_Month     // 包月美容
           } = useSpecies_Id_Prices( current_Species_Id );



    // 點選 _ 檢視 : 寵物資訊
    const click_Check_Pet = ( pet : any ) => {

      dispatch( set_Modal(true ,
                                   <Pet_Records /> ,
                            { modal_Style : { width : "100%" , left : "0%" } , data : pet }
                         )) ;

    } ;

    // 點選 _ 檢視 : 消費歷史紀錄
    const click_Check_Record = ( ) => {

       dispatch( set_Modal(true ,
                        null ,
                            { modal_Style : { width : "80%" , left : "10%" } }
                          )) ;

    } ;

    useEffect(( ) => {

          // # 設回 _ 預設值
          // 客戶姓名
          if( Current_Customer_Name ) set_Cus_Name( Current_Customer_Name ) ;

    } ,[ Current_Customer_Name ] ) ;

    const container = {
                            position     : "absolute" ,
                            borderRadius : "5px" ,
                            padding      : "20px 15px" ,
                            top          : "-80px" ,
                            left         : "-60px" ,
                            background   : "white" ,
                            width        : "350px" ,
                            zIndex       : "2000" ,
                            boxShadow    : "1px 1px 5px 2px rgba(0,0,0,.2)"
                       } as any ;

  return <>

            {
                (
                    Side_Info_Open &&
                        ( current_Create_Tab === '基礎' ||
                          current_Create_Tab === '洗澡' ||
                          current_Create_Tab === '美容' ||
                          current_Create_Tab === '方案' )
                        ) &&

                  <div style={ container } >

                      { /* 位置、客戶、寵物 */ }
                      <div className="columns is-multiline is-mobile">

                           { /* 位置 */ }
                           <div className="column is-12-desktop">
                               <i className="fas fa-tag"></i> &nbsp;位 置 : <b className="fDred"> 新增{ current_Create_Tab } </b>
                           </div>

                           { /* 客戶 */ }
                           { cus_Name &&

                               <div className="column is-12-desktop">
                                   <i className="fas fa-user"></i> &nbsp;客 戶 : <b className="fDblue"> { cus_Name } </b>
                               </div>

                           }

                           { /* 寵物 */ }
                           { current_Customer_Pets.length > 0  &&

                               <div className="column is-12-desktop">

                                   <i className="fas fa-dog"></i> &nbsp;寵 物 : &nbsp;

                                   {

                                       current_Customer_Pets.map( ( x : any , y : any ) => {

                                           return <span key = { y }  onClick = { () => click_Check_Pet( x )  }>
                                                      <b className="tag pointer m_Bottom_15 hover" >
                                                           { x['name'] } ( { x['species'] } )
                                                      </b> &nbsp;
                                                  </span>

                                       })

                                   }

                               </div>

                           }

                      </div>

                      <hr/>

                      { /* 服務基本價格  */ }
                      <div className="columns is-multiline is-mobile">

                          <div className="column is-12-desktop">
                              <span className="tag is-white is-large">
                                  <i className="fas fa-dollar-sign"></i> &nbsp; 服務基本價格 : &nbsp;
                                  { current_Pet_Species_Name ? <b style={{ color:"darkorange" }}> { current_Pet_Species_Name } </b> : <b>尚未指定<span className="fDred">寵物 </span> </b> }
                              </span>
                          </div>

                          { current_Pet_Species_Name &&

                              <>

                                  { /* 洗澡 */ }
                                  <div className="column is-12-desktop">
                                      <b className="tag is-success is-medium is-light is-rounded"> 洗澡 &nbsp;
                                          <b className="tag is-white is-rounded"> 初次 &nbsp; <b className="fRed"> ${ bath_First }  </b> </b> &nbsp;
                                          <b className="tag is-white is-rounded"> 單次 &nbsp; <b className="fRed"> ${ bath_Single } </b> </b> &nbsp;
                                          <b className="tag is-white is-rounded"> 包月 &nbsp; <b className="fRed"> ${ bath_Month }  </b> </b> &nbsp;
                                      </b>
                                  </div>

                                  { /* 美容 */ }
                                  <div className="column is-12-desktop">
                                      <b className="tag is-danger is-medium is-light is-rounded"> 美容 &nbsp;
                                          <b className="tag is-white is-rounded"> 單次 &nbsp; <b className="fRed"> ${ beauty_Single } </b> </b> &nbsp;
                                          <b className="tag is-white is-rounded"> 包月 &nbsp; <b className="fRed"> ${ beauty_Month }  </b> </b> &nbsp;
                                      </b>
                                  </div>

                              </>

                          }

                      </div>

                      <br/>

                  </div>

            }

      </>

} ;


export default Side_Info