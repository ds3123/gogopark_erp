
import Delete_Service_Rows from "../delete/Delete_Service_Rows";
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";


import { sort_Data_By_UpdatedDate } from "utils/data/sort_data"
import { useState , useEffect } from "react";



// @ 銷單紀錄
const Delete_Service_List = ( ) => {

   
    const [ p_Items , set_P_Items ] = useState<any[]>( [] ) ;
    const [ f_Items , set_F_Items ] = useState<any[]>( [] ) ;



    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/services/show_services_by_delete/1' , 'service' ) ;


    // 排序 
    useEffect( () => {

      set_P_Items( sort_Data_By_UpdatedDate( pageOfItems , 'desc' ) ) ;
      set_F_Items( sort_Data_By_UpdatedDate( filteredItems , 'desc' ) ) ;         

    } , [ pageOfItems , filteredItems  ] ) ;



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

                      {  p_Items.map( ( item : any , index ) => <Delete_Service_Rows key={ index } data={ item } /> ) }
                    
                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ f_Items } onChangePage={ click_Pagination } />
                </div>

         </>

} ;


export default Delete_Service_List