
import React from "react"



// 分頁套件、呼叫邏輯
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";
import Customers_Rows from "components/customers/Customers_Rows";



// @ 客戶 _ 封存資料
const Customers = ( ) => {


    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/customers/show_customers_relatives_pets/1' , 'customer' ) ;

    const blue = { color : "rgb(0,0,170)" } ;

    return  <>

        <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                    <th> 客戶姓名 </th>
                    <th> 手機號碼 </th>
                    <th> 寵物資訊 </th>
                    <th> <b style={ blue }>預付</b>方案 </th>
                    <th> <b style={ blue }>優惠</b>方案 </th>
                    <th> <b style={ blue }>贈送</b>方案 </th>
                    <th style={{ width:"100px" }}> 消費歷史 </th>
                    <th> 復 原    </th>
                    <th> 刪 除     </th>
                </tr>
            </thead>

            <tbody>

            {

                pageOfItems.map( ( item : any , index ) => {

                    if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10
                    return <Customers_Rows key={ index } data={ item } /> ;

                })

            }

            </tbody>

        </table>



        { /* 分頁按鈕 */ }
        <div style={{ marginTop:"70px", marginBottom:"150px" }}>
            <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
        </div>

    </>




} ;

export default Customers