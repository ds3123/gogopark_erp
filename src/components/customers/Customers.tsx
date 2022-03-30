import { useEffect, useState } from "react" ;

// 分頁套件、呼叫邏輯｀
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";

// 資料列
import Customers_Rows from "components/customers/Customers_Rows";
import {useSelector } from "react-redux";

import { useSearch_Bar } from "hooks/data/useSearch";
import Data_List_Sum from "templates/search/Data_List_Sum";
import SearchBar from "templates/search/SearchBar";
import Search_Type_Note from "templates/search/Search_Type_Note";
import { set_State } from 'utils/data/set_data'

import { is_Downloading , no_Query_Data } from "templates/note/Query_Info";



// 可搜尋關鍵字類型
const search_Types = [ "客戶姓名" , "客戶身分證字號" , "客戶手機號碼" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

     return source.filter( ( x : any ) => {

                // # 設置 _ 多種查詢條件
                let cus_Name   = x['name'].match( new RegExp(searchKeyword, 'gi') );         // 客戶_姓名
                let cus_Id     = x['id'].match( new RegExp(searchKeyword, 'gi') );           // 客戶_身分證號
                let cus_Mobile = x['mobile_phone'].match( new RegExp(searchKeyword, 'gi') ); // 客戶_手機號碼
    
                return !!cus_Name || !!cus_Id || !!cus_Mobile ;
   
            })
  
} ;


/* @ 客戶頁面  */
const Customers = () => {

    // 客戶頁資料 _ 是否下載中
    const Customer_isLoading = useSelector( ( state : any ) => state.Customer.Customer_isLoading ) ;


    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 搜尋客戶資料
    const [ search_Customers , set_Search_Customers ] = useState( [] ) ;

    // 所有客戶資料
    const [ all_Customers , set_All_Customers ] = useState( [] ) ;


    // -----------------------


    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;

    
    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/customers/show_customers_relatives_pets/0/50' , 'customer' ) ;


    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data , dataSum } = useSearch_Bar( all_Customers.length === 0 ? search_Customers : all_Customers , filter_Data , searchKeyword ) ;
 

    
    // # 取得、設定 _ 資料
    useEffect( () => { 

       // 初始取得部份資料( 50 筆 )
       if( !searchKeyword ) set_State( '/customers/show_customers_relatives_pets/0/50' , set_Search_Customers ) ; 

       // 取得所有資料
       set_State( '/customers/show_all_customers_relatives_pets/0' , set_All_Customers )
        
    } , [] ) ;


    return  <div className="relative">

              <div className="columns is-multiline is-variable is-12 m_Bottom_50">

                { all_Customers.length !== 0  &&

                    <div className="column is-offset-8 is-4-desktop">

                        { /* 可搜尋類型提示 */ }  
                        <Search_Type_Note search_Types = { search_Types } />

                        { /* 搜尋列 */ }
                        <SearchBar get_Search_Text = { get_Search_Text } /> 

                    </div>

                }
                
              </div>  

              
              { /* 資料筆數 */ } 
              <Data_List_Sum data_Sum={ dataSum } all_Data_Sum={ all_Customers.length } />   


              { /* 資料列表 */ }  
              <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                        <th> 客戶姓名   </th>
                        <th> 身分證字號 </th>
                        <th> 手機號碼   </th>
                        <th> 寵物資訊   </th>
                        <th> 通訊地址   </th>
                        <th style={{ width:"100px" }}> 消費歷史 </th>
                        <th> 建檔日期 </th>
                        <th> 封 存    </th>
                    </tr>
                </thead>

                <tbody>

                    { Customer_isLoading ||

                       pageOfItems.map( ( item : any , index ) => {

                          return <Customers_Rows key={ index } data={ item } /> ;

                       })

                    }

                </tbody>

              </table>


              { /* 下載圖示  */ }
              {  Customer_isLoading  && is_Downloading() }

              { /* 查無相關資料  */ }
              { ( searchKeyword && dataSum === 0 && !Customer_isLoading )  && no_Query_Data() }  


              { /* 分頁按鈕 */ }
              <div className="m_Top_70 m_Bottom_150" >
                  <Pagination items={ data ? data : [] } onChangePage={ click_Pagination } />
              </div>

            </div>

};

export default Customers ;


