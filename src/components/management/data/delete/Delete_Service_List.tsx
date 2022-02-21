
import React from "react"
import Delete_Service_Rows from "../delete/Delete_Service_Rows";

import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";


// @ 銷單紀錄
const Delete_Service_List = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/services/show_services_by_delete/1' , 'service' ) ;

    return <>

                <table className="table is-fullwidth is-hoverable relative" >

                    <thead style={{textAlign:"center"}} >
                       <th> 服務類別 </th>
                       <th> 寵物資訊 </th>
                       <th> 客戶姓名 </th>
                       <th> 提出人員 </th>
                       <th> 提出時間 </th>
                       <th> 解除銷單 </th>
                    </thead>

                    <tbody>

                        {
                            pageOfItems.map( ( item : any , index ) => {

                               if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10
                               return <Delete_Service_Rows key={ index } data={ item } /> ;

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


export default Delete_Service_List