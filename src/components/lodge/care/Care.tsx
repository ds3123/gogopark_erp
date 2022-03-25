
import { useState } from "react"
import {useSelector} from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Care_Rows from "components/lodge/care/Care_Rows";
import Pagination from "utils/Pagination";

import { useSearch_Bar } from "hooks/data/useSearch";
import Data_List_Sum from "templates/search/Data_List_Sum";
import SearchBar from "templates/search/SearchBar";
import Search_Type_Note from "templates/search/Search_Type_Note";


// 可搜尋關鍵字類型
const search_Types = [ "寵物名字","寵物品種","客戶姓名","客戶身分證字號","客戶手機號碼" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

     return source.filter( ( x : any ) => {

                // # 設置 _ 多種查詢條件
                let pet_Name    = x['pet']['name'].match(new RegExp(searchKeyword, 'gi'));              // 寵物_名字
                let pet_Species = x['pet']['species'].match(new RegExp(searchKeyword, 'gi'));           // 寵物_品種

                let cus_Name    = x['customer']['name'].match(new RegExp(searchKeyword, 'gi'));         // 客戶_姓名
                let cus_Id      = x['customer']['id'].match(new RegExp(searchKeyword, 'gi'));           // 客戶_身分證號
                let cus_Mobile  = x['customer']['mobile_phone'].match(new RegExp(searchKeyword, 'gi')); // 客戶_手機號碼
    
                return !!pet_Name || !!pet_Species || !!cus_Name || !!cus_Id || !!cus_Mobile ;
   
            })
  
} ;


/* @ 安親頁面 */
const Care = ( ) => {


   // 所輸入 : 搜尋關鍵字
   const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

   // 取得 _ 搜尋框中的文字
   const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;

   // 安親頁資料 _ 是否下載中
   const Care_isLoading = useSelector( ( state:any ) => state.Care.Care_isLoading ) ;

   // 取得 _ 分頁資料
   const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/cares/show_with_cus_relative_pet/0" , 'care' ) ;


   // 篩選資料 ( 依搜尋框輸入關鍵字 )
   const { data , dataSum } = useSearch_Bar( filteredItems , filter_Data , searchKeyword ) ;


   return  <>
 
               { /* 搜尋區塊*/ }   
               <div className="columns is-multiline is-variable is-12 m_Bottom_50">
            
                  <div className="column is-offset-7 is-5-desktop">

                     { /* 可搜尋類型提示 */ }  
                     <Search_Type_Note search_Types={ search_Types } />

                     { /* 搜尋欄位 */ }
                     <SearchBar get_Search_Text = { get_Search_Text } /> 

                  </div>
            
               </div>   

               { /* 資料筆數 */ } 
               <Data_List_Sum data_Sum={ dataSum } />  

               <table className="table is-fullwidth is-hoverable relative" style={{width:"110%",left:"-5%"}} >

                  <thead>
                     <tr>
                        <th> 寵物資訊 </th>
                        <th> 客戶姓名 </th>
                        <th> 安親類別 </th>
                        <th> 來店日期 </th>
                        <th> 來店時間 </th>
                        <th> 來店方式 </th>
                        <th> 離店方式 </th>
                        <th> 安親價格 </th>
                        <th> 個體調整 </th>
                        <th> 接送費   </th>
                        <th> 應 收    </th>
                        <th> 實 收    </th>
                        <th> 封 存    </th>
                     </tr>
                  </thead>

                  <tbody>

                  { Care_isLoading ||

                     pageOfItems.map( ( item : any , index ) => {

                        return <Care_Rows key={ index } data={ item } /> ;

                     })

                  }

                  </tbody>

               </table>

               { /* 下載圖示  */ }
               { Care_isLoading &&

                  <div className="has-text-centered" >
                     <br/><br/><br/><br/><br/><br/>
                     <button className="button is-loading is-white"></button>
                  </div>

               }

               { /* 分頁按鈕 */ }
               <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                  <Pagination items={ data ? data : [] } onChangePage={ click_Pagination } />
               </div>

         </>

} ;


export default Care