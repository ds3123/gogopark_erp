
import { useState , useEffect, useCallback } from "react" ;
import { useDispatch } from "react-redux" ;
import axios from "utils/axios" ;
import { I_Pagination } from "utils/Interface_Type";



// Redux
import { set_Customer_isLoading } from 'store/actions/action_Customer'
import { set_Pet_isLoading } from 'store/actions/action_Pet'
import { set_Service_isLoading } from 'store/actions/action_Service'
import { set_Lodge_isLoading } from 'store/actions/action_Lodge'
import { set_Care_isLoading } from 'store/actions/action_Care'




/*

   @ 分頁功能 _ 共用邏輯
     1. 配合搜尋

*/


const usePagination_Search = ( { api_Num , api_All , data_Type , sort_Data_Type } : I_Pagination ) => {

    const dispatch = useDispatch();


    const [ is_All_Data_Done , set_Is_All_Data_Done ] = useState( false ) ;


    let [ filteredItems , set_filteredItems ] = useState<any[]>( [] ) ;  // 點選頁碼後 _ 所篩選項目
    let [ pageOfItems , set_pageOfItems ]     = useState<any[]>( [] ) ;  // 當前頁面 _ 顯示項目


    // 點選 : 分頁頁碼
    const click_Pagination = ( _pageOfItems : [] ) => set_pageOfItems( _pageOfItems ) ; 


    const callBack = ( data : any[] , is_All : boolean  ) => {


                        // 所有資料已下載完成 
                        if( is_All ) set_Is_All_Data_Done( true ) ;

                        const sort_Data = sort_Data_Type( data  , 'desc' ) ;
                        set_filteredItems( sort_Data ) ;
                
                        // 設定 _ 下載完畢狀態
                        if( data_Type === 'customer' ) dispatch( set_Customer_isLoading( false ) ) ; // 客戶頁
                        if( data_Type === 'pet' )      dispatch( set_Pet_isLoading( false ) ) ;      // 寵物頁
                        if( data_Type === 'service' )  dispatch( set_Service_isLoading( false ) ) ;  // 洗美頁
                        if( data_Type === 'lodge' )    dispatch( set_Lodge_isLoading( false ) ) ;    // 住宿頁
                        if( data_Type === 'care' )     dispatch( set_Care_isLoading( false ) ) ;     // 安親頁
                        
                    } ;

                    

    useEffect( () => {

        axios.get( api_Num ).then( res => callBack( res.data , false ) ) ;
        axios.get( api_All ).then( res => callBack( res.data , true ) ).catch( err => { 
           //console.log( err ) 
           window.location.reload(); // 發生錯誤，Relaod 視窗，重新載入
        }) ;

    } , [ ] )


    return { pageOfItems , filteredItems , click_Pagination , is_All_Data_Done } ;

}

export default usePagination_Search