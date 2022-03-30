import { useSelector } from "react-redux";
import Side_Info_Basic from "./components/Side_Info_Basic";
import Side_Info_Prices from "./components/Side_Info_Prices";



// @ 左側固定位置 _ 服務提示資訊 ( Ex. 特定品種所有相關服務價格列表 )
const Side_Info  = ( ) => {


    // 是否開啟
    const Side_Info_Open        = useSelector(( state : any ) => state.Layout.Side_Info_Open  ) ;

    // @ 【 新增 】
    const current_Create_Tab    = useSelector(( state : any ) => state.Service.current_Create_Tab  ) ;      // 目前點選 : 新增項目頁籤 ( Ex. 基礎、洗澡、美容 )

    
    const container = {
                            position     : "absolute" ,
                            borderRadius : "5px" ,
                            padding      : "20px 15px" ,
                            top          : "-80px" ,
                            left         : "-60px" ,
                            background   : "white" ,
                            width        : "380px" ,
                            maxHeight       : "850px" ,
                            zIndex       : "2000" ,
                            boxShadow    : "1px 1px 5px 2px rgba(0,0,0,.2)" ,
                            overflow    : "auto"
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
                      <Side_Info_Basic />

                      <hr/>

                      { /* 服務基本價格  */ }
                       <Side_Info_Prices />

                      <br/>

                  </div>

            }

       </>

} ;


export default Side_Info