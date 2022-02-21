
import React from "react"
import usePagination from "hooks/layout/usePagination";
import Error_Rows from "../error/Error_Rows";
import Pagination from "utils/Pagination";



// @ 專案 ( 包月洗澡、包月美容 ) 紀錄
const Plan_Return_List = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/services/show_services_by_error/1' , 'service' ) ;


    return <>

                <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                    <thead>
                        <tr>
                            <th> 方案類型     </th>
                            <th> 客戶資訊     </th>
                            <th> 方案適用寵物 </th>
                            <th> 價格小計     </th>
                            <th> 收款日期	 </th>
                            <th> 退費金額     </th>
                            <th> 退費原因     </th>
                            <th> 處理方式     </th>
                            <th> 處理狀態     </th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                           <td> <b className="tag is-medium pointer"> 包月洗澡 </b> </td>
                           <td> <b className="tag is-medium pointer"> 李國豪 </b> </td>
                           <td> <b className="tag is-medium pointer"> 大福( 秋田犬 ) </b>  </td>
                           <td> <b className="fDblue"> 4700 </b> 元 </td>
                           <td> 2021-07-20 </td>
                           <td> <b className="fDred"> 1125 </b> 元 </td>
                           <td> <b className="fDblue"> 客戶態度不好，無法接受服務內容，執意要退費 </b> </td>
                           <td>
                                <b className="tag is-medium is-success is-light pointer"> 核 准 </b> &nbsp; &nbsp;
                                <b className="tag is-medium is-danger is-light pointer"> 退 回 </b>
                           </td>
                           <td> <b className="tag is-medium is-danger"> 未處理 </b> </td>
                       </tr>
                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>


         </>

} ;


export default Plan_Return_List