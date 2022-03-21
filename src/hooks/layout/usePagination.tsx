
import React , { useEffect , useState } from "react" ;
import axios from "utils/axios" ;
import { set_Index_isLoading } from "store/actions/action_Index";
import { useDispatch } from "react-redux";

// Redux
import { set_Customer_isLoading } from 'store/actions/action_Customer'
import { set_Pet_isLoading } from 'store/actions/action_Pet'
import { set_Service_isLoading } from 'store/actions/action_Service'
import { set_Lodge_isLoading } from 'store/actions/action_Lodge'
import { set_Care_isLoading } from 'store/actions/action_Care'




/*  @ 分頁功能 _ 共用邏輯 */
const usePagination = ( api : string , type? : string ) => {

    const dispatch = useDispatch() ;

    let [ filteredItems , set_filteredItems ] = useState<any[]>( [] ) ; // 點選頁碼後 _ 所篩選項目
    let [ pageOfItems , set_pageOfItems ]     = useState( [3] ) ;       // 當前頁面 _ 顯示項目

    // 點選 : 分頁頁碼
    const click_Pagination = ( _pageOfItems : [] ) => { set_pageOfItems( _pageOfItems ) ; } ;


    // 取得、設定 : 資料
    useEffect(() => {

        axios.get( api ).then( res => {

            // # 排序資料
            const resData = res.data.sort(( a : any , b : any ) : any => {
                                return a['created_at'] < b['created_at'] ? 1 : -1
                            }) ;

            // # 設定 _ 回傳資料
            set_filteredItems( resData ) ;

            // 設定 _ 下載完畢狀態
            if( type === 'customer' ) dispatch( set_Customer_isLoading( false ) ) ; // 客戶頁
            if( type === 'pet' )      dispatch( set_Pet_isLoading( false ) ) ;      // 寵物頁
            if( type === 'service' )  dispatch( set_Service_isLoading( false ) ) ;  // 洗美頁

            if( type === 'lodge' )    dispatch( set_Lodge_isLoading( false ) ) ;    // 住宿頁
            if( type === 'care' )     dispatch( set_Care_isLoading( false ) ) ;     // 安親頁

        }) ;

    } ,[ api ] ) ;


    return { pageOfItems , filteredItems , click_Pagination } ;

};

export default usePagination