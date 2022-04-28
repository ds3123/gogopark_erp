
/* @ 整體、全局 _ 版面狀態 */
interface ILayout {

    // # 右側 _ 滑動面板
    Side_Panel_Open      : boolean ;
    Side_Panel_Component : null | JSX.Element ;
    Side_Panel_Props     : {}

    // # 置中_ Modal 彈跳視窗
    Modal_Open           : boolean ;
    Modal_Component      : null | JSX.Element ;
    Modal_Props          : {} ;

    // # 左側 _ 參考資訊面板
    Side_Info_Open       : boolean ;  // 參考資訊
    Side_Debug_Open      : boolean ;  // 除錯資訊

    // # 決定新增表單時，是否顯示的區塊 ( for 完整填寫某區塊，才顯示下一個區塊 ) 
    is_Show_Section_Pet          : boolean ;  // 寵物區塊
    is_Show_Section_Services     : boolean ;  // 服務整體
    
    is_Show_Section_CustomerNote : boolean ;  // 客戶交代、自備物品
    is_Show_Section_Basic        : boolean ;  // 基礎單
    is_Show_Section_Bath         : boolean ;  // 洗澡單
    is_Show_Section_Beauty       : boolean ;  // 美容單

    is_Show_Section_Summary      : boolean ;  // 最下方結算區塊


    Nav_Options                  : any[]   ;  // 導覽列主要連結選項

}

const initState = {

                     Side_Panel_Open      : false ,  // 是否開啟
                     Side_Panel_Component : null ,   // 所包含元件
                     Side_Panel_Props     : {} ,     // 所包含元件 _ 屬性

                     Modal_Open           : false ,
                     Modal_Component      : null ,
                     Modal_Props          : {} ,
                     
                     Side_Info_Open       : false ,
                     Side_Debug_Open      : false ,
                    
                     is_Show_Section_Pet          : true ,  
                     is_Show_Section_Services     : true , 

                     is_Show_Section_CustomerNote : true , 
                     is_Show_Section_Basic        : true ,  
                     is_Show_Section_Bath         : true , 
                     is_Show_Section_Beauty       : true ,  

                     is_Show_Section_Summary      : true , 

                     Nav_Options                  : [] 


                  } ;

const reducer_Global_Layout = ( state : ILayout = initState , action : any ) => {

    switch( action.type ){

            // # 設定 _ 滑動面板( 右側 )
            case  "SET_SIDE_PANEL" :
                    return {
                             ...state ,
                             Side_Panel_Open      : action.is_Open  ,
                             Side_Panel_Component : action.component ,
                             Side_Panel_Props     : action.props
                           } ;

            // # 設定 _ Modal 彈跳視窗
            case  "SET_MODAL" :
                    return {
                             ...state ,
                             Modal_Open      : action.is_Open  ,
                             Modal_Component : action.component ,
                             Modal_Props     : action.props
                           } ;

            // # 設定 _ 左側 : 參考資訊面板
            case  "SET_SIDE_INFO" : return { ...state , Side_Info_Open : action.is_Open  } ;

            // # 設定 _ 左側 : 除錯資訊面板
            case  "SET_DEBUG_INFO" : return { ...state , Side_Debug_Open : action.is_Open  } ;
            
            // # 設定 _ 顯示 : 寵物區塊 ( 新增表單 )
            case  "SET_IS_SHOW_SECTION_PET" : return { ...state , is_Show_Section_Pet : action.is_Show_Section_Pet  } ;
            
            // # 設定 _ 顯示 : 服務整體區塊，含主人交代、基礎、洗澡、美容、結算 ( 新增表單 )
            case  "SET_IS_SHOW_SECTION_SERVICES" : return { ...state , is_Show_Section_Services : action.is_Show_Section_Services } ;
            
            // # 取得 _ 導覽列主要連結選項
            case  "GET_NAV_OPTIONS" : return { ...state , Nav_Options : action.Nav_Options } ;


            default : return state ;

    }


} ;

export default reducer_Global_Layout ;

