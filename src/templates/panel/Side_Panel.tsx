
import { createContext } from "react" ;
import { useSelector , useDispatch } from "react-redux";

// Styled Component
import styled from '@emotion/styled';

import { set_Current_Create_Tab } from "store/actions/action_Service"


// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Side_Info from "components/services/Side_Info";
import Debug_Info from "components/services/Debug_Info";
import Modal from "templates/panel/Modal"

import { set_All_States_To_Default } from "store/actions/action_Global_Setting"
 
import { set_Debug_Info } from "store/actions/action_Global_Layout"



type MaskProps = {
    active : boolean ;
}

type WrapperProps = {
    active : boolean ;
}

// 遮罩
const Mask = styled.div<MaskProps>`

      display: ${ props => props.active ? 'block' : 'none' } ;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1000 ;
      cursor:pointer

`;

// 面板
const Panel_Wrapper = styled.div<WrapperProps>`

      border-radius:0px;
      width:70rem;
      overflow:auto;
      overflow-x:hidden;
      position: fixed;
      top: 0;
      bottom: 0;
      right:0em;
      background: #fff; 
      box-shadow: -3px 0 3px rgba(0, 0, 0, 0.04);
      transform: translateX( ${ props => props.active ? '0em' : '70em'} ) ;
      transition: all 0.3s ease-in-out;
      padding: 3rem 2rem;
      z-index:1001;

`;

interface PanelContext {

    // 欲透過 Context 傳遞的 props 型別
    customer_Id       : string ; // 客戶身分證序號
    pet_Serial        : string ; // 寵物編號

    basic_id          : string ;
    bath_id           : string ;
    beauty_id         : string ;

    create_Data       : string ; // 右側編輯面板 ( for 資料_新增 )
    
    preLoadData       : any ;    // 預先填寫資料 ( for 資料_編輯 )
    data              : any ; 

    service_Type      : string ; // 服務類型 ( for 編輯 : 基礎、洗澡、美容 )
    source_Page       : string ; // 來源網頁 ( for 點選、回到上一個頁面  Ex. Nav_Qcode_List > Update_Service )

    source_Create_Way : string ; // 先前新增 _ 寵物價格方式 ( Ex. 依照 : 個別項目 or 寵物品種 / for 編輯寵物價格 )

}


// 建立 Context
export const SidePanelContext = createContext<PanelContext>( {} as PanelContext ) ;


/* @ 右側滑動面板 */
const Side_Panel = () => {

    const dispatch  = useDispatch() ;


    // # 右側滑動面板
    const active    = useSelector( ( state:any ) => state.Layout.Side_Panel_Open ) ;      // 是否開啟
    const component = useSelector( ( state:any ) => state.Layout.Side_Panel_Component ) ; // 所包含元件
    const props     = useSelector( ( state:any ) => state.Layout.Side_Panel_Props ) ;     // 元件屬性

    // 關閉 : 遮罩、滑動容器元件
    const close = () => {
       
        dispatch( set_Side_Panel( false , null , {} ) ) ;

        dispatch( set_Current_Create_Tab( '' ) ) ;

        dispatch( set_Debug_Info( false ) ) ;             // 關掉除錯

    } ;

    return <>

             <Modal />      { /* Modal 彈跳視窗 */ }

             <Side_Info />  { /* 左側固定位置 _ 服務參考資訊浮動面板 */ }

             <Debug_Info /> { /* 左側固定位置 _ 除錯資訊面板 */ }


             { /* 遮罩 ( 點選 --> 關閉 */ }
             <Mask active = { active } onClick = { () => { close() } } >

                 <SidePanelContext.Provider value = { props } >
                 </SidePanelContext.Provider>
                 
             </Mask>

             { /* 彈出面版 */ }
             <Panel_Wrapper active = { active } >

                 <SidePanelContext.Provider value = { props } >
                     { component }
                 </SidePanelContext.Provider>

             </Panel_Wrapper>

           </>

} ;

export default Side_Panel ;