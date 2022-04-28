

import Pagination from "utils/Pagination";
import usePagination from "hooks/layout/usePagination";

import Error_Rows from "components/management/data/error/Error_Rows";

// @ 服務異常清單
const Error_List = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/services/show_services_by_error/1' , 'service' ) ;
    



    return <>

               <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                  <thead>
                      <tr>
                      <th> 區域別  </th> 
                            <th> 店 別   </th>   
                          <th> 服務類別 </th>
                          <th> 寵物資訊 </th>
                          <th> 客戶姓名 </th>
                          <th> 異常原因 </th>
                          <th> 提出人員 </th>
                          <th> 提出時間 </th>
                          <th> 處理狀態 </th>
                          <th> 解除異常 </th>
                      </tr>
                  </thead>

                  <tbody>

                    { pageOfItems.map( ( item : any , index ) => <Error_Rows key={ index } data={ item } /> ) }

                  </tbody>

              </table>

              { /* 分頁按鈕 */ }
              <div className="m_Top_50 m_Bottom_150">
                  <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
              </div>

          </>


} ;

export default Error_List