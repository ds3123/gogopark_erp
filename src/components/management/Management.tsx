
import { useEffect  } from "react" ;
import useMulti_NavOptions from "hooks/layout/useMulti_NavOptions";

// 各頁面元件
import Daily_Report from "components/management/finance/Daily_Report";

import Species_Price_List from "components/management/price/Species_Price_List";
import Service_Price from "components/management/price/service_type/Service_Price";
import Basic_Price from "components/management/price/service_type/Basic_Price";
import Bath_Price from "components/management/price/service_type/Bath_Price";
import Beauty_Price from "components/management/price/service_type/Beauty_Price";
import Care_Price from "components/management/price/service_type/Care_Price";
import Lodge_Price from "components/management/price/service_type/Lodge_Price";
import Extra_Item_Price from "components/management/price/service_type/Extra_Item_Price";
import Extra_Beauty_Price from "components/management/price/service_type/Extra_Beauty_Price";
import Employees from "components/management/employee/Employees";
import Species_List from "components/management/setting/species/Species_List";
import Archive_List from "components/management/data/archive/Archive_List";
import Error_List from "components/management/data/error/Error_List";
import Plan_Data_List from "./data/plan_data/Plan_Data_List";
import Plan_Expire_List from "./data/plan_expire/Plan_Expire_List";
import Plans from "components/plan/Plans"
import Plan_Return_List from "components/management/data/plan_return/Plan_Return_List";
import Delete_Service_List from "components/management/data/delete/Delete_Service_List";
import cookie from 'react-cookies'     // 匯入 cookie



/* @ 管理頁面  */
const Management = () => {

    // 取得 : 第 2、3 層選項相關資訊
    const { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third } = useMulti_NavOptions();

    // 顯示 _ 頁面元件
    const show_PageComponent = ( title : string ) : JSX.Element | null => {

        switch( title ) {

            // # 財務管理
            case '日報表'   : return <Daily_Report/> ;
          
            // # 價格管理
            case '品種價格' : return <Species_Price_List/> ;
            // case '服務價格' : return <Service_Price/>      ; break ;  // 所有服務價格

            case '基礎' : return <Basic_Price/>  ;
            case '洗澡' : return <Bath_Price/>   ;
            case '美容' : return <Beauty_Price/> ;
            case '安親' : return <Care_Price/>   ;
            case '住宿' : return <Lodge_Price/>  ;

            case '加價項目' : return <Extra_Item_Price/>  ;
            case '加價美容' : return <Extra_Beauty_Price/>  ;

            // # 員工管理
            case '員工管理' : return <Employees/> ;

            // # 資料管理
            case '服務異常' : return <Error_List /> ;
            case '銷單資料' : return <Delete_Service_List /> ;
            case '封存資料' : return <Archive_List /> ;

            case '方案資料' : return <Plan_Data_List /> ;
            // case '方案逾期' : return <Plan_Expire_List /> ;
            case '方案逾期' : return <Plans /> ;
            case '方案退費' : return <Plan_Return_List /> ;

            // # 系統設定
            case '寵物品種' : return <Species_List />  ;

            default : return null ;

        }

    } ;

    // 【 新增 】 資料後，藉由 cookie，重導向至相對應的區塊頁面
    useEffect( () : any => {

       // @ Cookie
       const redirect = cookie.load('after_Created_Redirect') ;

       // # 價格管理 :

       // * 服務價格
       if( redirect && redirect === '價格管理_品種價格' ){
          click_Second('價格管理' ) ;
          click_Third('品種價格') ;
       }

       // * 基礎
       if( redirect && redirect === '價格管理_基礎' ){
          click_Second('價格管理' ) ;
          click_Third('基礎') ;
       }

       // * 洗澡
       if( redirect && redirect === '價格管理_洗澡' ){
            click_Second('價格管理' ) ;
            click_Third('洗澡') ;
       }

       // * 美容
       if( redirect && redirect === '價格管理_美容' ){
            click_Second('價格管理' ) ;
            click_Third('美容') ;
       }

       // * 安親
       if( redirect && redirect === '價格管理_安親' ){
            click_Second('價格管理' ) ;
            click_Third('安親') ;
       }

       // * 住宿
       if( redirect && redirect === '價格管理_住宿' ){
            click_Second('價格管理' ) ;
            click_Third('住宿') ;
       }

        // * 加價項目
        if( redirect && redirect === '價格管理_加價項目' ){
            click_Second('價格管理' ) ;
            click_Third('加價項目') ;
        }

        // * 加價美容
        if( redirect && redirect === '價格管理_加價美容' ){
            click_Second('價格管理' ) ;
            click_Third('加價美容') ;
        }

        // # 員工管理
        if( redirect && redirect === '員工管理' ){
            click_Second('員工管理' ) ;
        }

       // # 資料管理
       // * 服務異常
       if( redirect && redirect === '資料管理_服務異常' ){
           click_Second( '資料管理' ) ;
       }


       // * 方案資料  
       if( redirect && redirect === '資料管理_方案資料' ){
           click_Second('資料管理') ;
           click_Third('方案資料') ;
       } 

       // # 系統設定 :
       // * 寵物品種
       if( redirect && redirect === '系統設定_寵物品種' ){
            click_Second('系統設定' ) ;
            click_Third('寵物品種') ;
       }

       // --------------------------------------------------------------

       // # 暫時、預先點選
       if( !redirect ){
         click_Second( '財務管理' ) ;
         click_Third( '日報表' ) ;
       }

    } , [] ) ;


    // 【 更新 】 資料後，藉由 cookie，重導向至相對應的區塊頁面
    useEffect( () => {

       // @ Cookie

       // # 更新 _ 價格管理
       const update_Price = cookie.load('after_Updated_Prices') ;

       if( update_Price ){

           click_Second('價格管理' ) ;

           if( update_Price === '價格管理_品種價格' ) click_Third('品種價格') ;

           if( update_Price === '價格管理_基礎' )     click_Third('基礎') ;
           if( update_Price === '價格管理_洗澡' )     click_Third('洗澡') ;
           if( update_Price === '價格管理_美容' )     click_Third('美容') ;
           if( update_Price === '價格管理_安親' )     click_Third('安親') ;
           if( update_Price === '價格管理_住宿' )     click_Third('住宿') ;
           if( update_Price === '價格管理_加價項目' ) click_Third('加價項目') ;
           if( update_Price === '價格管理_加價美容' ) click_Third('加價美容') ;

       }

       // # 更新 _ 資料管理

        // * 服務異常
        const update_Data = cookie.load('after_Updated_Data') ;

        if( update_Data && update_Data === '資料管理_服務異常' ) click_Second('資料管理' ) ;
        
        // * 銷單資料  
        if( update_Data && update_Data === '資料管理_銷單資料' ){
            click_Second('資料管理') ;
            click_Third('銷單資料') ;
        } 

        // * 方案資料  
        if( update_Data && update_Data === '資料管理_方案資料' ){
            click_Second('資料管理') ;
            click_Third('方案資料') ;
        } 

        // * 封存資料
        const undo_Archive = cookie.load('after_Undo_Archive') ;

        if( undo_Archive && ( undo_Archive === '客戶' || undo_Archive === '寵物' || undo_Archive === '洗美' ||　undo_Archive === '方案' || undo_Archive === '安親' || undo_Archive === '住宿'  ) ){

          click_Second('資料管理') ;
       　 click_Third('封存資料') ;

    　　}


    } , [] ) ;


    // 【 刪除 】
    useEffect( ( ) => {

        // * 封存資料
        const delete_Archive = cookie.load('after_Delete_Archive') ;

        if( delete_Archive && ( delete_Archive === '客戶' || delete_Archive === '寵物' || delete_Archive === '洗美' ||　delete_Archive === '方案' || delete_Archive === '安親' || delete_Archive === '住宿'  ) ){

            click_Second('資料管理') ;
            click_Third('封存資料') ;

        }

        // * 方案資料
        const delete_CustomPlan = cookie.load('after_Delete_CustomPlan') ;

        if( delete_CustomPlan && delete_CustomPlan === '方案資料' ){

            click_Second('資料管理') ;
            click_Third('方案資料') ;

        }


    } , [] ) ;


    return <>

             <div>

                 { /* 第 2 層選項 */
                    Second_Nav.map( ( item , index ) => {

                        return <b key       = {index}
                                  className =  { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >
                                  <i className = { item.icon }></i> &nbsp; { item.title }
                               </b>

                    })
                 }

             </div>

             { currentThird &&

                <>

                    <br/><br/>

                     { /* 第 3 層選項 */
                         Third_Nav.map( ( item , index ) => {

                            return <b key       = {index}
                                      className = { "pointer tag is-medium " + ( currentThird === item ? "is-info" : "is-white" ) }
                                      style     = {{ marginRight:"30px" }}
                                      onClick   = { () => click_Third( item ) } >  { item　}
                                    </b>

                        })
                     }

                    <br/>

                </>

             }

             <br/><hr/><br/>

             { /* 管理專區 _ 各分類頁面元件 */ }

             { /* 第二層 */ }
             { currentSecond && show_PageComponent( currentSecond ) }

             { /* 第三層 */ }
             { currentThird && show_PageComponent( currentThird ) }

           </>

} ;

export default Management ;
