
import { useEffect , useState } from "react"
import { useDispatch } from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Plans_Rows from "components/plan/Plans_Rows";
import Pagination from "utils/Pagination";

import { set_current_plan_type } from 'store/actions/action_Plan'
import { set_Current_Species_Select_Id } from "store/actions/action_Pet"
import Data_List_Sum from "templates/search/Data_List_Sum";
import { useSearch_Bar } from "hooks/data/useSearch";
import Search_Type_Note from "templates/search/Search_Type_Note";
import SearchBar from "templates/search/SearchBar";


// 可搜尋關鍵字類型
const search_Types = [ "方案名稱","客戶姓名","客戶身分證字號","客戶手機號碼", "寵物名字", "寵物品種" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

    return source.filter( ( x : any ) => {

               // # 設置 _ 多種查詢條件
               let plan_Type   = x['plan_type'].match(new RegExp(searchKeyword, 'gi'));                // 方案類型 / 名稱

               let cus_Name    = x['customer']['name'].match(new RegExp(searchKeyword, 'gi'));         // 客戶_姓名
               let cus_Id      = x['customer']['id'].match(new RegExp(searchKeyword, 'gi'));           // 客戶_身分證號
               let cus_Mobile  = x['customer']['mobile_phone'].match(new RegExp(searchKeyword, 'gi')); // 客戶_手機號碼
   
               let pet_Name    = x['pet']['name'].match(new RegExp(searchKeyword, 'gi'));              // 寵物_名字
               let pet_Species = x['pet']['species'].match(new RegExp(searchKeyword, 'gi'));           // 寵物_品種

               return !!plan_Type || !!cus_Name || !!cus_Id || !!cus_Mobile || !!pet_Name || !!pet_Species ;
  
           })
 
} ;



/* @ 方案 ( 預設、自訂 ) */
const Plans = ( ) => {

    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;
   

    // 取得 _ 分頁資料
    // const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" ) ;
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/plans/show_all_with_customer_species_records" ) ;

    

    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data , dataSum } = useSearch_Bar( filteredItems , filter_Data , searchKeyword ) ;


    const dispatch = useDispatch();


    // 先清空 : 目前方案類型( 名稱 )、寵物品種 id --> 點選方案類型時，才會顯示 : 編輯狀態版面
    useEffect( () => { 
    
        dispatch( set_current_plan_type( '' ) ) ;
        dispatch( set_Current_Species_Select_Id( '' ) ) ; 

    } , [] ) ;



    return <>

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

            <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                <thead>
                   <tr>
                      <th> 方案類型     </th>
                      <th> 客戶資訊     </th>
                      <th> 方案適用寵物 </th>
                      <th> 價格小計     </th>
                      <th> <b className="fDred">收款</b>  日期 </th>
                      <th> <b className="fDblue">開始</b> 日期 </th>
                      <th> <b className="fDblue">結束</b> 日期 </th>
                      <th> 使用情形 </th>
                      { /* <th> 封 存  </th> */ }
                    </tr>
                </thead>

                <tbody>

                    {
                        pageOfItems.map( ( item : any , index ) => {

                            if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                            return <Plans_Rows key={ index } data={ item } /> ;

                        })
                    }

                </tbody>

            </table>

            { /* 分頁按鈕 */ }
            <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                <Pagination items={ data ? data : [] } onChangePage={ click_Pagination } />
            </div>


           </>

} ;

export default Plans