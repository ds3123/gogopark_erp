
import { useHistory } from "react-router-dom";

import axios from "utils/axios" ;

// React-Toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch , useSelector } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";

import { add_Plan_Used_Record } from 'store/actions/action_Plan'



import moment from "moment";
import cookie from 'react-cookies'



/* @ POST : 透過 Ajax _ 新增資料 */

// 新增 _ 客戶
const useCreate_Customer = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;

    const create_Customer     = ( api : string  , data  : any , msg? : string ) => {

        // 轉換欄位
        const obj_Customer    = columns_Covert_Customer( data ) ;
    
        // 新增資料
        if( !IsExisting_Customer ){

            axios.post( "/customers" , obj_Customer ).then( res => {

                // 新增成功通知
                if( msg ){ toast( `🦄 已新增 : ${ msg }` , { position: "top-left", autoClose : 1500 , hideProgressBar : false }); }

                // 關掉右側面板
                dispatch( set_Side_Panel( false , null , {} ) ) ;

                // 前往相對應頁面
                // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
                history.push("/wrongpath") ;  // 錯誤路徑
                history.push("/customers") ;  // 正確路徑

            })

        }else{

            alert('資料庫已有該客戶資料') ;

        }

    } ;

    return create_Customer ;

} ;

// 新增 _ 寵物
const useCreate_Pet = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;


    const create_Pet = ( api : string  , data  : any , msg? : string ) => {

        // 轉換欄位
        const obj_Customer = columns_Covert_Customer( data ) ;
        const obj_Pet      = columns_Covert_Pet( data ) ;

        // 新增資料
        if( !IsExisting_Customer )  axios.post( "/customers" , obj_Customer ) ;

        if( !IsExisting_Pet ){

            axios.post( "/pets" , obj_Pet ).then( res => {

                // 新增成功通知
                if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

                // 關掉右側面板
                dispatch( set_Side_Panel( false , null ,{} ) ) ;

                // 前往相對應頁面
                // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
                history.push("/wrongpath" ) ;  // 錯誤路徑
                history.push("/pets" ) ;       // 正確路徑

            }) ;

        }else{

            alert('資料庫已有該寵物資料') ;

        }

    } ;

    return create_Pet ;

} ;

// 新增 _ 基礎單
const useCreate_Basic = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Basic = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Basic( data ) ;

        // 轉換欄位
        const obj_Customer = dataArr[0] as any ; // 客戶
        const obj_Pet      = dataArr[1] ;        // 寵物
        const obj_Basic    = dataArr[2] ;        // 基礎單

        // # 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );  // 新增 _ 客戶 ( 檢查是否已存在 )

        if( !IsExisting_Pet )      axios.post( "/pets" , obj_Pet ) ;           // 新增 _ 寵物 ( 檢查是否已存在 )

        // 新增 _ 基礎單
        axios.post( "/basics" , obj_Basic ).then( res => {

            // 新增成功通知
            if( msg ){ toast( `🦄 已新增 : ${ msg }` , { position: "top-left", autoClose: 1500 , hideProgressBar: false, } );  }

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/services" ) ;   // 正確路徑

        }) ;

    } ;

    return create_Basic ;

} ;

// 新增 _ 洗澡單
const useCreate_Bath = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Bath = ( api : string  , data  : any , msg? : string ) => {

        const dataArr       = columns_Covert_Bath( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Bath      = dataArr[2] ;  // 洗澡單

        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer ) ;  // 新增 _ 客戶 ( 檢查是否已存在 )
        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet ) ;                 // 新增 _ 寵物 ( 檢查是否已存在 )

        // 新增 _ 洗澡單
        axios.post( "/bathes" , obj_Bath ).then( res => {

            //  # 如果付款方式是 "方案"，再新增 _ 方案 "使用紀錄" ( 資料表 : plan_used_records )
            if( data['payment_Method'] === '方案' ){
                dispatch( add_Plan_Used_Record( data , res , history ) ) ;
                return false ;
            }

        // # 一般洗澡單新增 ------------------------------------------------------------------------------------------------------

            // 新增成功通知
            if( msg ){ toast( `🦄 已新增 : ${ msg }` , { position : "top-left" , autoClose: 1500 , hideProgressBar: false } ); }

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push( "/wrongpath" ) ;  // 錯誤路徑
            history.push( "/services" ) ;   // 正確路徑

        }) ;

    } ;

    return create_Bath ;

} ;

// 新增 _ 美容單
const useCreate_Beauty = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Beauty = ( api : string , data  : any , msg? : string ) => {

        const dataArr      = columns_Covert_Beauty( data ) ;

        // 轉換欄位
        const obj_Customer = dataArr[0] ;  // 客戶
        const obj_Pet      = dataArr[1] ;  // 寵物
        const obj_Beauty   = dataArr[2] ;  // 美容單


        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer ) ;  // 新增 _ 客戶 ( 檢查是否已存在 )

        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet ) ;                 // 新增 _ 寵物 ( 檢查是否已存在 )

        // 新增 _ 美容單
        axios.post( "/beauties" , obj_Beauty ).then(res => {

            //  # 如果付款方式是 "方案"，再新增 _ 方案 "使用紀錄" ( 資料表 : plan_used_records )
            if( data['payment_Method'] === '方案' ){
                dispatch( add_Plan_Used_Record( data , res , history ) ) ;
                return false ;
            }

            // # 一般美容單新增 ----------------------------------------------------------------------

            // 新增成功通知
            if( msg ){ toast( `🦄 已新增 : ${ msg }`, { position : "top-left", autoClose: 1500 , hideProgressBar : false }); }

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push( "/wrongpath" ) ;  // 錯誤路徑
            history.push( "/services" ) ;   // 正確路徑

        }) ;

    } ;

    return create_Beauty ;

} ;

// 新增 _ 安親單
const useCreate_Care = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Care = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Care( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Care      = dataArr[2] ;  // 安親單

        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );  // 新增 _ 客戶 ( 檢查是否已存在 )

        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet );                 // 新增 _ 寵物 ( 檢查是否已存在 )


        // 新增 _ 安親單
        axios.post( "/cares" , obj_Care ).then(res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 設定 cookie ( for 前往 : 住宿 > 安親 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Care' , '住宿_安親' , { path : '/' , maxAge : 5 } ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/lodge" ) ;      // 正確路徑

        }).catch( error => {

            console.log( error )

        }) ;

    } ;

    return create_Care ;

} ;

// 新增 _ 住宿單
const useCreate_Lodge = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Lodge = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Lodge( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Lodge     = dataArr[2] ;  // 住宿單

        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );  // 新增 _ 客戶 ( 檢查是否已存在 )
        if( !IsExisting_Pet ) axios.post( "/pets" , obj_Pet );                 // 新增 _ 寵物 ( 檢查是否已存在 )

    
        // 新增 _ 住宿單
        axios.post( "/lodges" , obj_Lodge ).then(res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/lodge" ) ;   // 正確路徑

        }).catch( error => {

           console.log( error )

        }) ;

    } ;

    return create_Lodge ;

} ;

// 新增 _ 其他
const useCreate_Other = ( history : any , dispatch : any ) => {

    const create_Other = ( api : string  , data  : any , msg? : string ) => {

        // 轉換欄位
        const obj_Other = columns_Covert_Other( data ) ;

        // 新增資料
        axios.post( "/others" , obj_Other ).then( res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null ,{} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }).catch( error => {

          console.error( error.response.data ) ; // 顯示詳細錯誤訊息
         
        }) ;

       
    } ;

    return create_Other ;

} ;


// 新增 _ 員工
const useCreate_Employee = ( history : any , dispatch : any ) => {

    const create_Employee = ( api : string  , data  : any , msg? : string ) => {

        const dataObj = columns_Covert_Employee( data ) ;

        // 新增資料
        axios.post( "/employees" , dataObj ).then( res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 設定 cookie ( for 前往 : 員工管理 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '員工管理'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    return create_Employee ;

} ;

// 新增 _ 服務價格
const useCreate_Service_Price = ( history : any , dispatch : any ) => {

    const create_Service_Price = ( api : string  , data  : any , msg? : string ) => {

        // # 價格新增方式為 -> 寵物品種 ( 多次新增 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 )
        if( data['service_Price_Create_Way'] === '寵物品種' ){

            // 轉換資料表欄位
            const objArr = columns_Covert_Service_Prices_SPECIES( data ) ;

            // 逐一新增資料
            objArr.forEach( x => {  axios.post( "/service_prices" , x ) ;  }) ;

            // 延遲 1 秒，再重導向 ( 等待以上資料，Ajax 新增完畢 )
            setTimeout( ( ) => {

                // 新增成功通知
                if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

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
                if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

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

// 新增 _ 品種
const useCreate_Pet_Species = ( history : any , dispatch : any ) => {

    const create_Pet_Species = ( api : string  , data  : any , msg? : string ) => {

        // 轉換資料表欄位
        const obj = columns_Covert_Pet_Species( data ) ;

        // 新增資料
        axios.post( "/pet_species" , obj ).then( res => {

            // 新增資料後，所取得 id ( 尚未完成 2021.08.17 )
            const pet_Species_Id = res.data ;

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;


            // 設定 cookie ( for 前往 : 系統設定 > 寵物品種 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種'  ,  { path : '/' , maxAge : 5 } ) ;


            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    return create_Pet_Species ;

} ;

// 新增 _ 時間按鈕紀錄 ( 美容區中，美容師點選 _ 時間按鈕 )
export const useCreate_TimeRecord = ( ) => {

    const create_TimeRecord = ( id  : string , type : string , button : string , time : string , beautician : string ) => {

        // 轉換資料表欄位
        const obj = {
            service_table_id : id ,
            service_type     : type ,
            button_name      : button ,
            button_time      : time ,
            beautician       : beautician
        } ;


        // 新增資料
        axios.post( "/time_records" , obj ).then(res => {

          // 新增成功通知
          toast(`🦄 已新增 : ` ,{ position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

        }) ;

    } ;

    return create_TimeRecord ;

} ;

// 新增 _ 方案 ( 包月洗澡、包月美容、住宿券 )
export const useCreate_Plan = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector( ( state : any ) => state.Customer.IsExisting_Customer ) ;

    
    const create_Plan = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Service_Plans( data ) ;

        // 轉換欄位
        const obj_Customer = dataArr[0] as any ; // 客戶
        const obj_Plan     = dataArr[1] ;        // 方案

        // # 新增資料
        // 新增 _ 客戶 ( 檢查是否已存在 )
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );

        // 新增 _ 方案
        axios.post( "/plans" , obj_Plan ).then( res => {

            // 新增成功通知
            toast( `🦄 已新增 : ` , { position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 設定 cookie ( for 前往 : 洗美 > 方案 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/services");   // 正確路徑

        }).catch( error => {

            console.log( error )

        }) ;

    } ;

    return create_Plan ;

} ;


// @ 新增資料 ------------------------------------------------------------------------------

// # 新增資料
export const useCreate_Data = ( ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

    // * 依賴項目
    const create_Customer      = useCreate_Customer( history , dispatch ) ;      // 客戶
    const create_Pet           = useCreate_Pet( history , dispatch ) ;           // 寵物
    const create_Basic         = useCreate_Basic( history , dispatch ) ;         // 基礎單
    const create_Bath          = useCreate_Bath( history , dispatch ) ;          // 洗澡單
    const create_Beauty        = useCreate_Beauty( history , dispatch ) ;        // 美容單

    const create_Care          = useCreate_Care( history , dispatch ) ;          // 安親單
    const create_Lodge         = useCreate_Lodge( history , dispatch ) ;         // 住宿單
    const create_Other         = useCreate_Other( history , dispatch ) ;         // 其他收支

    const create_Service_Plan  = useCreate_Plan( history , dispatch ) ;          // 方案 ( Ex. 包月洗澡 )
    const create_Service_Price = useCreate_Service_Price( history , dispatch ) ; // 價格 ( 各項服務 )
    const create_Pet_Species   = useCreate_Pet_Species( history , dispatch ) ;   // 寵物品種

    const create_Employee      = useCreate_Employee( history , dispatch ) ;      // 員工


    // * Controller / 表示層
    const create_Data = ( api : string  , data  : any , msg? : string  ) => {

        // 客戶
        if (api === "/customers") create_Customer(api, data, msg);

        // 寵物
        if (api === "/pets") create_Pet(api, data, msg);

        // 基礎
        if (api === "/basics") create_Basic(api, data, msg);

        // 洗澡
        if (api === "/bathes") create_Bath(api, data, msg);

        // 美容
        if (api === "/beauties") create_Beauty(api, data, msg);

        // 安親
        if (api === "/cares") create_Care(api, data, msg);

        // 住宿
        if (api === "/lodges") create_Lodge(api, data, msg);
        
        // 其他
        if (api === "/others") create_Other(api, data, msg);

        // 方案
        if( api === "/plans") create_Service_Plan(api, data, msg);

        // 價格 ( 各項服務 )
        if (api === "/service_prices") create_Service_Price(api, data, msg);

        // 寵物品種
        if (api === "/pet_species") create_Pet_Species(api, data, msg);

        // 員工
        if (api === "/employees") create_Employee(api, data, msg);

    } ;

    return create_Data

} ;

// # 新增資料 ( for 客戶關係人 )
export const useCreate_Customer_Relatives = ( ) => {

    // 資料庫已有 : 該客戶紀錄
    const IsExisting_Customer    = useSelector( ( state : any ) => state.Customer.IsExisting_Customer ) ;

    // 關係人數
    const Customer_Relatives_Num = useSelector( ( state : any ) => state.Customer.Customer_Relatives_Num ) ;
    
    // 新增資料邏輯
    const create_Cus_Relatives = ( api : string , data : any ) => {

        // 依照關係人數，新增關係人
        for( let n = 1 ; n <= Customer_Relatives_Num ; n++ ){

            const num = n.toString() ; 

            // 轉換資料欄位
            const submitData = {

                customer_id  : data['customer_Id'] ,  // 客戶身分證字號

                name         : data['customer_Relative_Name_'+num] ,
                type         : data['customer_Relative_Type_'+num] ,
                tag          : data['customer_Relative_Family_'+num] ,
                
                mobile_phone : data['customer_Relative_Cellphone_'+num] ,
                tel_phone    : data['customer_Relative_Telephone_'+num] ,

                sex          : data['customer_Relative_Sex_'+num] ,  
                id           : data['customer_Relative_Id_'+num] ,   
                address      : data['customer_Relative_Address_'+num]    

            } ;

            if( !IsExisting_Customer ) axios.post( api , submitData ) ;

        }

    } ;

    return create_Cus_Relatives

} ;

// @  轉換資料欄位 ---------------------------------------------------

// 客戶
export const columns_Covert_Customer = ( data : any ) => {

    const obj = {

        name         : data['customer_Name'] ,
        id           : data['customer_Id'] ,
        mobile_phone : data['customer_Cellphone'] ,
        tel_phone    : data['customer_Telephone'] ,
        line         : data['customer_Line'] ,
        email        : data['customer_Email'] ,

        address      : data['customer_Address'] ,
        sex          : data['customer_Sex'] ,
        note         : data['customer_P_Note'] 

    } ;

    return obj

} ;

// 寵物
export const columns_Covert_Pet = ( data : any ) => {

    const obj = {

                    customer_id  : data['customer_Id'] ,

                    serial       : data['pet_Serial'] ,
                    species      : data['pet_Species'] ,
                    name         : data['pet_Name'] ,
                    sex          : data['pet_Sex'] === '請選擇' ? '' : data['pet_Sex'] ,
                    color        : data['pet_Color'] ,
                    weight       : data['pet_Weight'] ,
                    size         : data['pet_Size'] === '請選擇' ? '' : data['pet_Size'] ,
                    age          : data['pet_Age'] ,

                    injection    : data['injection'] ,
                    flea         : data['flea'] ,
                    ligate       : data['ligate'] ,
                    chip         : data['chip'] ,
                    infection    : data['infection'] ,
                    together     : data['together'] ,
                    drug         : data['drug'] ,
                    bite         : data['bite'] ,

                    health       : data['health'] ? data['health'].join(',') : "" ,
                    feed         : data['feed'] ? data['feed'].join(',') : "" ,
                    toilet       : data['toilet'] ? data['toilet'].join(',') : "" ,
                    ownerProvide : data['ownerProvide'] ? data['ownerProvide'].join(',') : "" ,

                    note         : data['pet_Note'] ,

                    // 該寵物品種價格   
                    single_bath_price   : data['price_Single_Bath'] ,
                    single_beauty_price : data['price_Single_Beauty'] ,
                    month_bath_price    : data['price_Month_Bath'] ,
                    month_beauty_price  : data['price_Month_Beauty']

                  } ;

    return obj

} ;

// 基礎
export const columns_Covert_Basic = ( data : any ) => {

    const basic_fee           = data['basic_Fee'] ;                                           // 本次基礎單消費價格小計
    const self_adjust_amount  = data['self_Adjust_Amount'] ? data['self_Adjust_Amount'] : 0 ; // 個體自行調整費用 ( input --> 需驗證 )
    const pickup_fee          = data['pickup_Fee'] ? data['pickup_Fee'] : 0  ;                // 接送費          ( input --> 需驗證 ) 

    // 應收金額
    const amount_payable      = parseInt( basic_fee ) + 
                                parseInt( self_adjust_amount ) + 
                                parseInt( pickup_fee ) ;  

    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 基礎單
    const obj_Basic    = {

                            // * 基本資訊欄位 ( 9 個 )
                            service_status        : data['service_Status'] ,                                                           // 服務性質 ( 已到店、預約_今天、預約_明天 )

                            shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                     // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                            service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                            q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                            actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                            expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                            expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                            way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave             : data['way_Leave'] ,                                                      // 離店方式

                            // * 客戶資料 ( 1 個 )
                            customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料 ( 1 個 )
                            pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                            // * 主人自備物品、交代 ( 4 個 )
                            customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                            customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                            customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                            admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註


                            // * 資料欄位 ( 1 個 ) --------------------------------------------------------

                            basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,


                            //  * 費用欄位 ( 3 個 ) --------------------------------------------------------

                            basic_fee             : basic_fee ,                                                              // 本次基礎單消費價格小計
                           
                            self_adjust_amount    : self_adjust_amount ,                                                     // 個體自行調整費用
                            pickup_fee            : pickup_fee ,                                                             // 接送費


                            // * 行政、明細 ( 8 個 ) --------------------------------------------------------

                            amount_payable        : amount_payable ,                                                         // 應收金額
                            amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                            amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                            payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                            payment_type          : '基礎小美容' ,

                            admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                            admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                            admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註

                            // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) -------------------------

                            beautician_name       : '' ,                                                                      // 負責美容師
                            beautician_report     : '' ,                                                                      // 處理結果
                            wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                            wait_time             : '' ,                                                                      // 開始等候時間
                            beautician_star       : '' ,                                                                      // 評分
                            beautician_note       : '' ,                                                                      // 備註

                         } ;

    return [ obj_Customer , obj_Pet , obj_Basic ] ;

} ;

// 洗澡
export const columns_Covert_Bath = ( data : any ) => {

    // * 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    let payment_Type = data['current_Create_Service_Type'] ? data['current_Create_Service_Type'] : '' ;

    // 若付款方式為方案，付費類別改為 _ 方案備註 ( Ex. 包月洗澡 1 次 ... )
    if( data['payment_Method'] === '包月洗澡' || data['payment_Method'] === '包月美容' ) payment_Type = data['current_Plan_Note'] ;

    // ------------------------------------------------------------------------------

        const bath_fee           = data['bath_Fee'] ;  // 洗澡費用
        const self_adjust_amount = data['self_Adjust_Amount'] ? data['self_Adjust_Amount'] : 0  ; // 個體自行調整費用 ( input --> 需驗證 )

        const extra_service_fee  = data['extra_Service_Fee'] ;  // 加價項目 _ 費用
        const extra_beauty_fee   = data['extra_Beauty_Fee'] ;   // 加價美容 _ 費用

        const pickup_fee         = data['pickup_Fee'] ? data['pickup_Fee'] : 0  ;  // 接送費用   ( input --> 需驗證 )

        // 應收金額
        const amount_payable     = parseInt( bath_fee ) +
                                   parseInt( self_adjust_amount ) +
                                   parseInt( extra_service_fee ) +
                                   parseInt( extra_beauty_fee ) +
                                   parseInt( pickup_fee ) ;

    // -----------------------------------------------------------------------------------


    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 洗澡單
    const obj_Bath     = {

                            // * 基本資訊欄位 ( 9 個 )
                            service_status        : data['service_Status'] ,                                                           // 服務性質 ( 已到店、預約_今天、預約_未來 )

                            shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                     // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                            service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                            q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                            actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                            expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                            expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                            way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave             : data['way_Leave'] ,                                                      // 離店方式


                            // * 客戶資料 ( 1 個 )
                            customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料 ( 1 個 )
                            pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                            // * 主人自備物品、交代 ( 4 個 )
                            customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                            customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                            customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                            admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註

                            // * 資料欄位 ( 9 個 ) --------------------------------------------------------

                            basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,             // 基礎資料

                            // 洗澡資料欄位
                            bath_1                : data['bath_Option_1'] ,
                            bath_2                : data['bath_Option_2'] ,
                            bath_3                : data['bath_Option_3'] ,
                            bath_4                : data['bath_Option_4'] ,
                            bath_5                : data['bath_Option_5'] ,
                            bath_6                : data['bath_Option_6'] ,

                            extra_service         : data['extra_Item'] ? data['extra_Item'].join(',') : '' ,                // 加價項目 _ 資料 ( Ex. 梳廢毛、跳蚤/壁蝨 )
                            extra_beauty          : data['extra_Beauty'] ? data['extra_Beauty'].join(',') : '' ,            // 加價美容 _ 資料

                            //  * 費用欄位 ( 6 個 ) --------------------------------------------------------

                            bath_fee              : bath_fee ,                                                              // 洗澡費用
                            self_adjust_amount    : self_adjust_amount ,                                                    // 個體自行調整費用

                            bath_month_fee        : data['current_Plan_Used_Fee'] ? data['current_Plan_Used_Fee'] : '' ,    // 使用單次 : 包月洗澡費用

                            extra_service_fee     : extra_service_fee ,                                                     // 加價項目 _ 費用
                            extra_beauty_fee      : extra_beauty_fee ,                                                      // 加價美容 _ 費用

                            pickup_fee            : pickup_fee ,                                                            // 接送費用

                            // * 行政、明細 ( 8 個 ) --------------------------------------------------------

                            amount_payable        : amount_payable ,                                                         // 應收金額
                            amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                            amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                            payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                            payment_type          : payment_Type ,                                                           // 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )

                            admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                            admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                            admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註

                            // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) ------------------------

                            beautician_name       : '' ,                                                                      // 負責美容師
                            beautician_report     : '' ,                                                                      // 處理結果
                            wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                            wait_time             : '' ,                                                                      // 開始等候時間
                            beautician_star       : '' ,                                                                      // 評分
                            beautician_note       : '' ,                                                                      // 備註

                        } ;

    return [ obj_Customer , obj_Pet , obj_Bath ] ;

} ;

// 美容
export const columns_Covert_Beauty = ( data : any ) => {

    // * 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    let payment_Type = data['current_Create_Service_Type'] ? data['current_Create_Service_Type'] : '' ;

    // 若付款方式為方案，付費類別改為 _ 方案備註 ( Ex. 包月洗澡 1 次 ... )
    if( data['payment_Method'] === '包月洗澡' || data['payment_Method'] === '包月美容' )  payment_Type = data['current_Plan_Note'] ;

    // ----------------------------------------------------------------------------------

        const beauty_fee         = data['beauty_Fee'] ;                                           // 美容費用
        const self_adjust_amount = data['self_Adjust_Amount'] ? data['self_Adjust_Amount'] : 0 ;  // 個體自行調整費用 ( input --> 需驗證 )
        const extra_service_fee  = data['extra_Service_Fee'] ;                                    // 加價項目 _ 費用
        const pickup_fee         = data['pickup_Fee'] ? data['pickup_Fee'] : 0 ;                  // 接送費用        ( input --> 需驗證 )    

        // 應收金額
        const amount_payable     = parseInt( beauty_fee ) +
                                   parseInt( self_adjust_amount ) +
                                   parseInt( extra_service_fee ) +
                                   parseInt( pickup_fee ) ;

                        
    // ----------------------------------------------------------------------------------


    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 美容單
    const obj_Beauty   = {

                            // * 基本資訊欄位 ( 9 個 )
                            service_status        : data['service_Status'] ,                                                            // 服務性質 ( 已到店、預約_今天、預約_明天 )

                            shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '尚未到店' ,                      // 到店狀態 ( 尚未到店、到店等候中、到店美容中 ... )

                            service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                            q_code                : data['shop_Q_Code']  ,                                                              // 到店處理碼 ( Q )

                            actual_arrive         : data['actual_Arrive'] ,                                                  // 實際 _ 到店時間
                            expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計 _ 到店時間
                            expected_leave        : data['expected_Leave'] ,                                                 // 預計 _ 離店時間

                            way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave             : data['way_Leave'] ,                                                      // 離店方式


                            // * 客戶資料 ( 1 個 )
                            customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料 ( 1 個 )
                            pet_id                : data['pet_Serial'] ,                                                     // 寵物編號


                            // * 主人自備物品、交代 ( 4 個 )

                            customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                            customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                            customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                            admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註

                            // * 資料欄位 ( 14 個 ) --------------------------------------------------------

                            basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,             // 基礎資料

                            // 洗澡資料欄位
                            bath_1                : data['bath_Option_1'] ,
                            bath_2                : data['bath_Option_2'] ,
                            bath_3                : data['bath_Option_3'] ,
                            bath_4                : data['bath_Option_4'] ,
                            bath_5                : data['bath_Option_5'] ,
                            bath_6                : data['bath_Option_6'] ,

                            extra_service         : data['extra_Item'] ? data['extra_Item'].join(',') : '' ,                // 加價項目 _ 資料 ( Ex. 梳廢毛、跳蚤/壁蝨 )

                            // 美容資料欄位
                            b_body                : data['beauty_Option_Body'] ,
                            b_head                : data['beauty_Option_Head'] ,
                            b_ear                 : data['beauty_Option_Ear'] ,
                            b_tail                : data['beauty_Option_Tail'] ,
                            b_foot                : data['beauty_Option_Foot'] ,
                            b_other               : data['beauty_Option_Other'] ,

                            //  * 費用欄位 ( 5 個 ) --------------------------------------------------------

                            beauty_fee            : beauty_fee ,                                                            // 美容費用
                            self_adjust_amount    : self_adjust_amount ,                                                    // 個體自行調整費用

                            beauty_month_fee      : data['current_Plan_Used_Fee'] ? data['current_Plan_Used_Fee'] : '' ,     // 使用單次 : 包月美容費用
                            extra_service_fee     : extra_service_fee ,                                                      // 加價項目 _ 費用

                            pickup_fee            : pickup_fee ,                                                             // 接送費用

                            // * 行政、明細 ( 8 個 ) --------------------------------------------------------
                            amount_payable        : amount_payable ,           // 應收金額
                            amount_paid           : data['amount_Paid'] ,                                                    // 實收金額
                            amount_discount       : data['amount_Discount'] ? data['amount_Discount'] : 0 ,                  // 優惠金額

                            payment_method        : data['payment_Method'] ,                                                 // 付款方式 ( Ex. 現金、贈送 ... )
                            payment_type          : payment_Type ,                                                           // 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )

                            admin_user            : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,               // 櫃台人員
                            admin_star            : data['admin_Rating'] ,                                                    // 櫃台人員評分
                            admin_service_note    : data['admin_Service_Note'] ,                                              // 櫃台人員備註


                            // * 美容師欄位 ( 6 個 ) ( NOTE : 美容師處理時，才會填寫 ) ------------------------
                            beautician_name       : '' ,                                                                      // 負責美容師
                            beautician_report     : '' ,                                                                      // 處理結果
                            wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                            wait_time             : '' ,                                                                      // 開始等候時間
                            beautician_star       : '' ,                                                                      // 評分
                            beautician_note       : '' ,                                                                      // 備註

                          } ;

    return [ obj_Customer , obj_Pet , obj_Beauty ] ;

} ;

// 安親
export const columns_Covert_Care = ( data : any ) => {

    // 安親價格
    let care_Price   = 0 ;
    const care_Type  = data['care_Type'] ;
    if( care_Type === '一般安親' )       care_Price = parseInt( data['care_Ordinary_Price'] ) ;
    if( care_Type === '住宿_提早抵達' )  care_Price = parseInt( data['care_Ahead_Price'] ) ;
    if( care_Type === '住宿_延後帶走' )  care_Price = parseInt( data['care_Postpone_Price'] ) ;
    
    const self_Adjust_Amount = data['self_Adjust_Amount'] ? data['self_Adjust_Amount'] : 0  ; // 個體自行調整費用 ( input --> 需驗證 )
    const pickup_Fee         = data['pickup_Fee'] ? data['pickup_Fee'] : 0 ;                  // 接送費          ( input --> 需驗證 )  


    // * 應收金額
    const amount_Payable     = care_Price + 
                               parseInt( self_Adjust_Amount ) + 
                               parseInt( pickup_Fee ) ;


    // 安親狀態 ( Ex. 當日安親、預約安親 )
    const today          = moment( new Date ).format('YYYY-MM-DD') ;                 // 今日
    const start_Date     = moment( data['care_Start_Date'] ).format('YYYY-MM-DD') ;  // 安親日期
    const service_status = start_Date === today ? '當日安親' : '預約安親' ;



    // -----------------------------------------------

    // 客戶
    const obj_Customer  = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet       = columns_Covert_Pet( data ) ;

    // 安親單
    const obj_Care     = {

                            // * 客戶資料 ( 1 個 )
                            customer_id            : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料 ( 1 個 )
                            pet_id                 : data['pet_Serial'] ,                                                     // 寵物編號

                            // * 到店、離店方式 ( 2 個 )
                            way_arrive             : data['way_Arrive'] === '請選擇' ? '' : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave              : data['way_Leave']  === '請選擇' ? '' : data['way_Leave'] ,                                                      // 離店方式

                            // * 主人自備物品、交代 ( 4 個 )
                            customer_object        : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                            customer_object_other  : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                            customer_note          : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                            admin_customer_note    : data['admin_Customer_Note'] ,                                            // 櫃代備註

                            // * 安親資料欄位 (  8 個 ) --------------------------------------------------------

                            q_code                 : data['shop_Q_Code'] ,
                            service_status         : service_status ,                                                          // 安親性質( Ex. 當日安親、預約安親 )
                            service_type           : care_Type ,                                                               // 安親類型( Ex. 一般安親、住宿_提早抵達、住宿_延後帶走 )
                            care_hours             : care_Type === '一般安親' ? parseInt( data['care_Hour'] ) :  0  ,                       // 安親時數( Ex. 4 小時、8 小時、12 小時 )

                            start_date             : start_Date ,                                                               // 開始日期

                            start_time             : data['care_Start_Time'] ,                                                  // 開始時間( Ex. 15:00 )
                            expect_end_time        : data['expect_Care_End_Time'] ,                                             // 預計 _ 結束時間 ( for 一般安親 )
                            end_time               : data['care_End_Time'] ,                                                    // 結束時間 ( Ex. 16:00 )

                            is_overdue             : 0 ,                                                                        // 是否逾期 ( 1 : 逾期 , 0 : 未逾期 )
                            overdue_time           : '' ,                                                                       // 逾期時間 ( Ex. 02:30 )           # 再檢查是否有用 ? 2021.08.13

                            // * 費用 ( 3 個 )
                            care_price             : care_Price ,                                                                // 安親費
                            self_adjust_amount     : self_Adjust_Amount ,                                                        // 個體自行調整費用
                            pickup_fee             : pickup_Fee ,                                                                // 接送費

                            // # 櫃台行政收費明細 ( 6 個 )
                            amount_payable         : amount_Payable ,                                                            // 應收金額小計 ( 再確認 2021.08.12 )

                            amount_paid            : data['amount_Paid'] ,                                                       // 實收金額小計

                            payment_method         : data['payment_Method'] ,                                                     // 付款方式

                            admin_user             : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,                  // 櫃台人員                                                        // 櫃台人員
                            admin_star             : data['admin_Rating'] ,                                                       // 櫃台人員評分
                            admin_service_note     : data['admin_Service_Note']                                                   // 櫃台人員服務備註

                          } ;

    return [ obj_Customer , obj_Pet , obj_Care ] ;

} ;

// 住宿
export const columns_Covert_Lodge = ( data : any ) => {

    // for Calendar 住宿標題說明 ( Ex. A01 大黃(秋田犬)
    const service_title  = ` ${ data['lodge_Room_Number'] } ( ${ data['lodge_Room_Type'] } ) - ${ data['pet_Name'] } ( ${ data['pet_Species'] } ) ` ;

    // 住宿狀態 ( Ex. 當日住宿、預約住宿 )
    const today          = moment( new Date ).format('YYYY-MM-DD') ;                   // 今日
    const checkIn        = moment( data['lodge_CheckIn_Date'] ).format('YYYY-MM-DD') ; // 入住日期
    const service_status = checkIn === today ? '當日住宿' : '預約住宿' ;

    // -----------------------------------------------

        const lodge_price        = data['lodge_Price'] ;        // 住宿費用

        const self_adjust_amount = data['self_Adjust_Amount'] ? data['self_Adjust_Amount'] : 0 ; // 個體自行調整費用 ( input --> 需驗證 )
        const pickup_fee         = data['pickup_Fee'] ? data['pickup_Fee'] : 0  ;                // 接送費          ( input --> 需驗證 )

        // 應收金額小計
        const amount_payable     = parseInt( lodge_price ) +
                                   parseInt( self_adjust_amount ) +
                                   parseInt( pickup_fee ) ;

    // ------------------------------------------------

    // 客戶
    const obj_Customer  = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet       = columns_Covert_Pet( data ) ;

    // 住宿單
    const obj_Lodge     = {

                                // * 客戶資料 ( 1 個 )
                                customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                                // * 寵物資料 ( 1 個 )
                                pet_id                : data['pet_Serial'] ,                                                     // 寵物編號

                                // * 主人自備物品、交代 ( 4 個 )
                                customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                                customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                                customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                                admin_customer_note   : data['admin_Customer_Note'] ,                                            // 櫃代備註

                                // * 住宿資料欄位 (  個 ) --------------------------------------------------------

                                contract_serial       : data['lodge_Serial'] ,      // 合約編號
                                service_title         : service_title ,             // for Calendar 住宿標題說明 ( Ex. A01 大黃(秋田犬)
                                service_status        : service_status ,            // 住宿狀態 ( Ex. 當日住宿、預約住宿 )

                                room_type             : data['lodge_Room_Type'] ,   // 房型 ( Ex. 大房、中房、小房 )
                                room_number           : data['lodge_Room_Number'] , // 房號 ( Ex. A01、B01、C01 )

                                // bath_number         : '' ,   // 洗澡次數
                                // beauty_number       : '' ,   // 美容次數

                                start_date             : moment( data['lodge_CheckIn_Date'] ).format('YYYY-MM-DD') ,  // 開始日期
                                start_time             : data['lodge_CheckIn_Time'] ,                                        // 開始時間( Ex. 15:00 )

                                end_date               : moment( data['lodge_CheckOut_Date'] ).format('YYYY-MM-DD') , // 結束日期
                                end_time               : data['lodge_CheckOut_Time'] ,                                       // 結束時間 ( Ex. 16:00 )

                                // # 費用
                                lodge_price            : lodge_price ,                                                       // 住宿費用
                                self_adjust_amount     : self_adjust_amount ,                                                // 個體自行調整費用
                                // lodge_bath_price    : 0 ,                                                                 // 洗澡費用
                                // lodge_beauty_price  : 0 ,                                                                 // 美容費用

                                pickup_fee             : pickup_fee ,                                                        // 接送費

                                // # 櫃台行政收費明細
                                amount_payable         : amount_payable ,                                                    // 應收金額小計

                                amount_paid            : data['amount_Paid'] ,                                               // 實收金額小計
                                amount_discount        : data['amount_Discount'] ? data['amount_Discount'] : 0 ,             // 優惠金額

                                payment_method         : data['payment_Method'] ,                                            // 付款方式

                                admin_user             : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,          // 櫃台人員                                                        // 櫃台人員
                                admin_star             : data['admin_Rating'] ,                                              // 櫃台人員評分

                                admin_service_note     : data['admin_Service_Note']                                          // 櫃台人員服務備註

    } ;

    return [ obj_Customer , obj_Pet , obj_Lodge ] ;

} ;

// 其他
export const columns_Covert_Other = ( data : any ) => {

    return { 
              type   : data['other_Type'] ,
              item   : data['other_Item'] ,
              amount : data['other_Amount']             
           }

}

// 價格( 各項服務 : for 依照 "個別項目" 新增 )
export const columns_Covert_Service_Prices = ( data : any ) => {

    return {
             service_type  : data['price_Type'] ,        // 服務類型

             service_plan  : data['price_Plan'] ,        // 指定方案
             species_id    : data['price_Species_Id'] === '請選擇' ? 0 : data['price_Species_Id'] ,  // species 資料表 id ( 指定品種 )

             service_name  : data['price_Item'] ,        // 服務名稱
             service_price : data['price_Amount'] ,      // 服務價格

             note          : data['price_Note'] ,        // 備註
          }  ;

} ;

// 價格( 各項服務 : for 依照 "寵物品種" 新增 )
export const columns_Covert_Service_Prices_SPECIES = ( data : any ) => {

    return [
             // 初次洗澡優惠
             {
                service_type  : '洗澡' ,                    // 服務類型

                service_plan  : '初次洗澡優惠' ,            // 指定方案
                species_id    : data['price_Species_Id'] , // species 資料表 id ( 指定品種 )

                service_name  : '初次洗澡優惠價格' ,         // 服務名稱
                service_price : data['price_Fist_Bath'] ,   // 服務價格

                note          : '' ,                        // 備註
             } ,

             // 單次洗澡
             {
                service_type  : '洗澡' ,

                service_plan  : '' ,
                species_id    : data['price_Species_Id'] ,

                service_name  : '單次洗澡價格' ,
                service_price : data['price_Single_Bath'] ,

                note          : '' ,
             } ,

             // 包月洗澡
             {
                service_type  : '洗澡' ,

                service_plan  : '包月洗澡' ,
                species_id    : data['price_Species_Id'] ,

                service_name  : '包月洗澡價格' ,
                service_price : data['price_Month_Bath'] ,

                note          : '' ,
             } ,

             // 單次美容
             {
                service_type  : '美容' ,

                service_plan  : '' ,
                species_id    : data['price_Species_Id'] ,

                service_name  : '單次美容價格' ,
                service_price : data['price_Single_Beauty'] ,

                note          : '' ,
             } ,

             // 包月美容
             {
                service_type  : '美容' ,

                service_plan  : '包月美容' ,
                species_id    : data['price_Species_Id'] ,

                service_name  : '包月美容價格' ,
                service_price : data['price_Month_Beauty'] ,

                note          : '' ,
             } ,

           ]

} ;

// 品種
export const columns_Covert_Pet_Species = ( data : any ) => {

    return {
             name      : data['species_Name'] ,
             serial    : data['species_Serial'] ,
             character : data['species_Character'] === '請選擇' ? '' : data['species_Character'] ,
             size      : data['species_Size'] === '請選擇' ? '' : data['species_Size'] ,
             fur       : data['species_Fur'] === '請選擇' ? '' : data['species_Fur'] ,
             note      : data['species_Note'] ,
           } ;

} ;

// 員工
export const columns_Covert_Employee = ( data : any ) => {

    return {

              // # 共同欄位

              employee_type              : data['employee_Type'] ,              // 員工類型( Ex. 管理員、美容師 ... )
              account                    : data['employee_Account'] ,           // 帳號
              password                   : data['employee_Password'] ,          // 密碼
              nickname                   : data['employee_Nickname'] ,          // 暱稱

             // # 帳號類別 : "工作人員" 欄位 -------------------------------------------------------------

              employee_serial            : data['employee_Serial'] ,            // 員工編號
              salary_type                : data['salary_Type'] ,                // 計薪類別 ( Ex. 正職 / 計時 )
              position_type              : data['position_Type'] ,              // 職位類別 ( Ex. 櫃台 / 美容 / 接送 )
              position_status            : data['position_Status'] ,            // 職位現況 ( Ex. 在職 / 離職 )
              brand                      : data['Brand'] ,                      // 所屬品牌 ( Ex. 狗狗公園 )
              shop                       : data['Shop'] ,                       // 所屬店別 ( Ex. 淡水店 )

              employee_name              : data['employee_Name'] ,              // 員工姓名
              employee_sex               : data['employee_Sex'] ,               // 員工性別
              employee_id                : data['employee_Id'] ,                // 員工身分證字號
              employee_mobile_phone      : data['employee_MobilePhone'] ,       // 員工手機號碼
              employee_tel_phone         : data['employee_TelPhone'] ,          // 員工家用電話
              employee_birthday          : data['employee_Birthday'] ,          // 員工生日
              employee_line              : data['employee_Line'] ,              // 員工 LINE
              employee_email             : data['employee_Email'] ,             // 員工 Email
              employee_transportation    : data['employee_Transportation'] ,    // 員工 接通工具
              employee_address           : data['employee_Address'] ,           // 員工 通訊地址
              employee_residence_address : data['employee_Residence_Address'] , // 員工 戶籍地址


              // # 工作人員的緊急聯絡人( 1、2、3 ) ---------------------------------------------------------

              relative_name_1            : data['relative_Name_1'] ,            // 姓名
              relative_family_1          : data['relative_Family_1'] ,          // 關係
              relative_mobile_phone_1    : data['relative_MobilePhone_1'] ,     // 手機號碼
              relative_tel_phone_1       : data['relative_TelPhone_1'] ,        // 家用電話
              relative_address_1         : data['relative_Address_1'] ,         // 通訊地址

              relative_name_2            : data['relative_Name_2'] ,            // 姓名
              relative_family_2          : data['relative_Family_2'] ,          // 關係
              relative_mobile_phone_2    : data['relative_MobilePhone_2'] ,     // 手機號碼
              relative_tel_phone_2       : data['relative_TelPhone_2'] ,        // 家用電話
              relative_address_2         : data['relative_Address_2'] ,         // 通訊地址

              relative_name_3            : data['relative_Name_3'] ,            // 姓名
              relative_family_3          : data['relative_Family_3'] ,          // 關係
              relative_mobile_phone_3    : data['relative_MobilePhone_3'] ,     // 手機號碼
              relative_tel_phone_3       : data['relative_TelPhone_3'] ,        // 家用電話
              relative_address_3         : data['relative_Address_3'] ,         // 通訊地址

           } ;

} ;

// 方案 ( 包月洗澡、包月美容、住宿券 )
export const columns_Covert_Service_Plans = ( data : any ) => {

    
    // # 方案 _ 基本價格 ( 預設、自訂 )

    let  plan_basic_price = 0 ;

    // * 預設
    if( data['plan_Type'] === '包月洗澡' ) plan_basic_price = data['month_Bath_Price'] ; 
    if( data['plan_Type'] === '包月美容' ) plan_basic_price = data['month_Beauty_Price'] ; 
       
    // * 自訂
    if( data['plan_Type'] !== '包月洗澡' && data['plan_Type'] !== '包月美容' ) plan_basic_price = data['custom_Plan_Price'] ; 


    // 方案 _ 自行增減金額
    const plan_Adjust_Amount = data['plan_Adjust_Amount'] ? parseInt( data['plan_Adjust_Amount'] ) : 0 ;

    // 方案 _ 接送費
    const plan_Pickup_Fee    = data['plan_Pickup_Fee'] ? parseInt( data['plan_Pickup_Fee'] ) : 0 ;

    // 客戶
    const obj_Customer       = columns_Covert_Customer( data ) ;

    // 方案
    const obj_Plan = {

                          // * 方案資料 ( 9 個 ) --------------------------------------------------------
                          plan_type           : data['plan_Type'] ,                // 方案類性 ( Ex.包月洗澡、包月美容、住宿券 )
                          customer_id         : data['customer_Id'] ,              // 客戶身分證字號
                          pet_species_id      : data['plan_Pet_Species'] ,         // 寵物資料表 ( pet_species ) id
                         
                          plan_basic_price    : plan_basic_price ,                 // 方案 _ 基本價格

                          apply_pet_serial    : data['plan_Apply_Pet'] ,           // 方案所適用的 "寵物編號"

                          plan_adjust_price   : plan_Adjust_Amount ,               // 自訂增 / 減 金額
                          pickup_fee          : plan_Pickup_Fee ,                  // 接送費

                          plan_fee_total      : plan_basic_price + plan_Adjust_Amount + plan_Pickup_Fee ,  // 方案價格共計 ( 基本價格 + 自訂增 / 減 金額 + 接送費  )

                          lodge_coupon_number : data['plan_Lodge_Coupon_Number'] ? data['plan_Lodge_Coupon_Number'] : null ,        // 住宿券本數
                          lodge_coupon_price  : data['plan_Lodge_Coupon_Number'] ? data['plan_Lodge_Coupon_Number'] * 4000 : null , // 住宿金額

                          // * 行政、明細 ( 5 個 ) --------------------------------------------------------
                          amount_payable      : plan_basic_price + plan_Adjust_Amount + plan_Pickup_Fee ,   // 應收金額 ( 同以上 : 方案價格共計 )
                          amount_paid         : data['amount_Paid'] ,                                       // 實收金額
                          payment_method      : data['payment_Method'] ,                                    // 付款方式 ( Ex. 現金、贈送 ... )

                          admin_user          : data['admin_User'] === '請選擇' ? '' : data['admin_User'] ,  // 櫃台人員
                          admin_service_note  : data['admin_Service_Note'] ,                                // 櫃台人員備註

                      }  ;


    return [ obj_Customer , obj_Plan ] ;

} ;





