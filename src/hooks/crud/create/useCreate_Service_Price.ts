
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { columns_Covert_Service_Prices , columns_Covert_Service_Prices_SPECIES } from "hooks/crud/process/convert_Columns"
import axios from "utils/axios" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import cookie from 'react-cookies' ;


// @ 新增 _ 服務價格
export const useCreate_Service_Price = () => {


    const history  = useHistory() ;
    const dispatch = useDispatch() ; 


    const create_Service_Price = ( data  : any ) => {

        // # 價格新增方式為 -> 寵物品種 ( 多次新增 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 )
        if( data['service_Price_Create_Way'] === '寵物品種' ){


            // 轉換資料表欄位
            const objArr = columns_Covert_Service_Prices_SPECIES( data ) ;


            // 逐一新增資料
            objArr.forEach( x => {  axios.post( "/service_prices" , x ) ;  }) ;

            // 延遲 1 秒，再重導向 ( 等待以上資料，Ajax 新增完畢 )
            setTimeout( ( ) => {

                // 新增成功通知
                toast(`🦄 已新增 : 服務價格`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

                // 關掉右側面板
                dispatch( set_Side_Panel(false , null ,{} ) ) ;

                // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
                cookie.save( 'after_Created_Redirect' , '價格管理_品種價格'  ,  { path : '/' , maxAge : 5 } ) ;

                history.push("/wrongpath");  // 錯誤路徑
                history.push("/management");  // 正確路徑

            } , 1000 )


        }

        // # 價格新增方式為 -> 個別項目
        if( data['service_Price_Create_Way'] === '個別項目' ){

            // 轉換資料表欄位
            const obj = columns_Covert_Service_Prices( data ) ;

            // 新增資料
            axios.post( "/service_prices" , obj ).then( res => {

                // 新增成功通知
                toast(`🦄 已新增 : 服務價格`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); 

                // 關掉右側面板
                dispatch( set_Side_Panel(false , null ,{} ) ) ;

                // 設定 cookie ( for 前往 : 價格管理 > ... / 5 秒後銷毀 )
                let redirect = '' ;                                  // 依照新增服務類別，決定重導向後的位置
                const s_Type = obj['service_type'] ;
                if( s_Type === '基礎' )     redirect = '價格管理_基礎' ;
                if( s_Type === '洗澡' )     redirect = '價格管理_洗澡' ;
                if( s_Type === '美容' )     redirect = '價格管理_美容' ;
                if( s_Type === '安親' )     redirect = '價格管理_安親' ;
                if( s_Type === '住宿' )     redirect = '價格管理_住宿' ;
                if( s_Type === '加價項目' ) redirect = '價格管理_加價項目' ;
                if( s_Type === '加價美容' ) redirect = '價格管理_加價美容' ;

                cookie.save( 'after_Created_Redirect' , redirect  ,  { path : '/' , maxAge : 5 } ) ;

                history.push("/wrongpath");  // 錯誤路徑
                history.push("/management");  // 正確路徑

            }) ;

        }

    } ;


    return create_Service_Price ;


} ;