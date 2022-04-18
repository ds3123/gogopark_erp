
import React from "react"



// 分頁套件、呼叫邏輯
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";
import Customers_Rows from "components/customers/Customers_Rows";



// @ 客戶 _ 封存資料
const Customers = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/customers/show_customers_relatives_pets/1/100' , 'customer' ) ;

   
    return  <>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 客戶姓名   </th>
                            <th> 身分證字號 </th>
                            <th> 手機號碼   </th>
                            <th> 寵物資訊   </th>
                            <th> 通訊地址   </th>
                            <th> 消費歷史   </th>
                            <th> 建檔日期   </th>
                            <th> 復 原     </th>
                            <th> 刪 除     </th>
                        </tr>
                    </thead>

                    <tbody> 

                        { pageOfItems.map( ( item , index ) => <Customers_Rows key={ index } data={ item } /> ) }

                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

             </>

} ;

export default Customers