
import { useEffect , useState } from "react"
import { useDispatch } from "react-redux";
import usePagination from "hooks/layout/usePagination";
import usePagination_Search from "hooks/layout/usePagination_Search";
import Plans_Rows from "components/plan/Plans_Rows";
import Pagination from "utils/Pagination";

import { set_current_plan_type } from 'store/actions/action_Plan'
import { set_Current_Species_Select_Id } from "store/actions/action_Pet"
import Data_List_Sum from "templates/search/Data_List_Sum";
import { useSearch_Bar } from "hooks/data/useSearch";
import Search_Type_Note from "templates/search/Search_Type_Note";
import SearchBar from "templates/search/SearchBar";

import { sort_Data_By_CreatedDate } from "utils/data/sort_data";
import { I_Pagination } from "utils/Interface_Type";



// 可搜尋關鍵字類型
const search_Types = [ "方案名稱","客戶姓名","客戶身分證字號","客戶手機號碼", "寵物名字", "寵物品種" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

    return source.filter( ( x : any ) => {

               const customer  = x['customer'] ;
               const pet       = x['pet'] ;

               // # 設置 _ 多種查詢條件
               let plan_Type   = x['plan_type'].match(new RegExp(searchKeyword, 'gi'));          // 方案類型 / 名稱

               let cus_Name    = customer?.name.match(new RegExp(searchKeyword, 'gi'));          // 客戶_姓名
               let cus_Id      = customer?.id.match(new RegExp(searchKeyword, 'gi'));            // 客戶_身分證號
               let cus_Mobile  = customer?.mobile_phone.match(new RegExp(searchKeyword, 'gi'));  // 客戶_手機號碼
   
               let pet_Name    = pet?.name.match(new RegExp(searchKeyword, 'gi'));               // 寵物_名字
               let pet_Species = pet?.species.match(new RegExp(searchKeyword, 'gi'));            // 寵物_品種

               return !!plan_Type || !!cus_Name || !!cus_Id || !!cus_Mobile || !!pet_Name || !!pet_Species ;
  
           })
 
} ;



/* @ 方案 ( 預設、自訂 ) */
const Plans = ( ) => {

    const dispatch = useDispatch() ;


    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

 
    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;


    // -------------------------------

    const page_Config : I_Pagination = {
        api_Num        : "/plans/show_with_customer_species_records/50" ,   // 僅搜尋部分筆數資料的 api
        api_All        : "/plans/show_all_with_customer_species_records" ,  // 搜尋全部筆數資料的 api
        data_Type      : "plan" ,                                           // 資料類型 ( Ex. customer,pet,services,lodge,care,plan )
        sort_Data_Type : sort_Data_By_CreatedDate                           // 資料排序方式
    }


    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination , is_All_Data_Done } = usePagination_Search( page_Config ) ;
  
    
    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data , dataSum } = useSearch_Bar( filteredItems , filter_Data , searchKeyword ) ;



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
                    <SearchBar get_Search_Text={ get_Search_Text } /> 

                </div>
            
            </div>   

            { /* 資料筆數 */ } 
            <Data_List_Sum data_Sum={ dataSum } is_All_Data_Done = { is_All_Data_Done } />       

            <table className="table is-fullwidth is-hoverable relative" style={{ width:"124%" , left:"-12%" }}>

                <thead>
                   <tr>
                      <th> 類 型     </th>
                      <th> 客 戶     </th>
                      <th> 寵 物 </th>
                      <th style={{ width:"250px" }}> 小 計 (元)     </th>
                      <th style={{ width:"230px" }}> <b className="fDred">建檔</b>日期 </th>
                      <th style={{ width:"230px" }}> <b className="fDred">收款</b>日期 </th>
                      <th style={{ width:"250px" }}> <b className="fDblue">開始</b>日期 </th>
                      <th style={{ width:"250px" }}> <b className="fDblue">結束</b>日期 </th>
                      <th style={{ width:"340px" }}> 方案期限 (天)   </th>
                      <th style={{ width:"100px" }}> 使用情形 </th>
                      <th style={{ width:"90px" }}> 刪 除 </th> 
                      { /* <th>  封 存  </th> */ }
                    </tr>
                </thead>

                <tbody>

                    {
                        pageOfItems.map( ( item : any , index ) => {

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