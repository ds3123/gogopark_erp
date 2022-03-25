import { useState , useEffect } from "react" ;

// 分頁套件、呼叫邏輯
import usePagination from "hooks/layout/usePagination" ;
import Pagination from "utils/Pagination" ;

// 資料列
import Pets_Rows from "components/pets/Pets_Rows" ;
import { useSelector } from "react-redux";

import { useSearch_Bar } from "hooks/data/useSearch";
import Data_List_Sum from "templates/search/Data_List_Sum";
import SearchBar from "templates/search/SearchBar";
import Search_Type_Note from "templates/search/Search_Type_Note";
import { set_State } from 'utils/data/set_data';
import { is_Downloading , no_Query_Data } from "templates/note/Query_Info";




// 可搜尋關鍵字類型
const search_Types = [ "寵物名字" , "寵物品種" , "寵物編號" , "客戶姓名" , "客戶身分證字號" , "客戶手機號碼" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 寵物 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

  return source.filter( ( x : any ) => {
            
             const pSerial = x['serial'].slice( 16 , 22 ) ;  
             
             // 先行驗證
             const f_Cus_Name     = x['customer'] ? x['customer']['name'] : '' ;
             const f_Cus_Id       = x['customer'] ? x['customer']['id'] : '' ; 
             const f_Mobile_Phone = x['customer'] ? x['customer']['mobile_phone'] : '' ;
             
             // # 設置 _ 多種查詢條件
             let cus_Name   = f_Cus_Name.match(new RegExp(searchKeyword, 'gi'));     // 客戶_姓名
             let cus_Id     = f_Cus_Id.match(new RegExp(searchKeyword, 'gi'));       // 客戶_身分證號
             let cus_Mobile = f_Mobile_Phone.match(new RegExp(searchKeyword, 'gi')); // 客戶_手機號碼

             let pet_Name    = x['name'].match(new RegExp(searchKeyword, 'gi'));                    // 寵物_名字
             let pet_Species = x['species'].match(new RegExp(searchKeyword, 'gi'));                 // 寵物_品種
             let pet_Serial  = pSerial.match(new RegExp(searchKeyword, 'gi'));                      // 寵物_編號
           
             return !!cus_Name || !!cus_Id || !!cus_Mobile || !!pet_Name || !!pet_Species || !!pet_Serial ;

         })

} ;



/* @ 寵物頁面 */
const Pets = () => {

    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 搜尋寵物資料
    const [ search_Pets , set_Search_Pets ] = useState( [] ) ;

    // 所有寵物資料
    const [ all_Pets , set_All_Pets ] = useState( [] ) ;

    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;

    // 寵物頁資料 _ 是否下載中
    const Pet_isLoading = useSelector( ( state : any ) => state.Pet.Pet_isLoading ) ;

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/pets/show_pets_customers_relatives/0/50' , 'pet' ) ;

    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data , dataSum } = useSearch_Bar( all_Pets.length === 0 ? search_Pets : all_Pets , filter_Data , searchKeyword ) ;


    // # 當進行查詢時，才取得所有客戶資料
    useEffect( () => {

      let api = '' ; 

      if( searchKeyword ){   // 搜尋所有資料

         api = '/pets/show_all_pets_customers_relatives/0' ;

         setTimeout( () => { 

           set_State( api , set_Search_Pets ) ;

         } , 500 )
  
      }else{                 // 搜尋最近 50 筆資料 

         api = '/pets/show_pets_customers_relatives/0/50' ;
         set_State( api , set_Search_Pets ) ; 
           
      }

    } , [ searchKeyword ] ) ;


    // # 取得、設定 _ 所有寵物資料
    useEffect( () => {
    
      set_State( '/pets/show_all_pets_customers_relatives/0' , set_All_Pets )
    
    } , []  )



  return <div className="relative">

            <div className="columns is-multiline is-variable is-12 m_Bottom_50">
                
                  <div className="column is-offset-8 is-4-desktop">

                      { /* 可搜尋類型提示 */ }  
                      <Search_Type_Note search_Types={ search_Types } />
                      
                      { /* 搜尋列 */ }
                      <SearchBar get_Search_Text = { get_Search_Text } />

                  </div>

            </div>  


            { /* 資料筆數 */ } 
            <Data_List_Sum data_Sum={ dataSum } all_Data_Sum={ all_Pets.length } />   

            <table className="table is-fullwidth is-hoverable">

              <thead>
                <tr>
                  <th> 寵物資訊 </th>
                  <th style={{ height : "10px" , width : "100px" }}> 寵物編號 </th>
                  <th> 主人姓名 </th>
                  <th> 主人手機 </th>
                  <th> 服務紀錄 </th> 
                  <th> 建檔日期 </th>
                  <th> 封 存  </th>
                </tr>
              </thead>

              <tbody>

                { Pet_isLoading ||

                  pageOfItems.map( ( item : any , index ) => {

                    return <Pets_Rows key={ index } data={ item } />

                  })

                }

              </tbody>

            </table>
            

            { /* 下載圖示  */ }
            { Pet_isLoading &&  is_Downloading() }


            { /* 查無相關資料  */ }
            { ( searchKeyword && dataSum === 0 && !Pet_isLoading )  && no_Query_Data() }  


            { /* 分頁按鈕 */ }
            <div className="m_Top_70 m_Bottom_150" >
               <Pagination items={ data ? data : [] } onChangePage={ click_Pagination } />
            </div>

         </div>


} ;

export default Pets ;
