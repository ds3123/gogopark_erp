
import React from "react"
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";
import Lodge_Rows from "../../../../lodge/Lodge_Rows";
import {useSelector} from "react-redux";


// @ 客戶 _ 封存資料
const Lodge = ( ) => {

    // 住宿頁資料 _ 是否下載中 ( 再修改為 住宿 2021.08.12 )
    const Lodge_isLoading = useSelector( ( state:any ) => state.Lodge.Lodge_isLoading ) ;

    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/lodges/show_with_cus_relative_pet/1" , 'lodge' ) ;



    return   <>

                <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                    <thead>
                        <tr>

                            <th> 寵物資訊 </th>
                            <th> 客戶姓名 </th>
                            <th> 房號 ( 房型 ) </th>
                            <th> <span className="fDblue" >入住</span> : 日期 / 時間 </th>
                            <th> <span className="fDblue" >退房</span> : 日期 / 時間 </th>
                            <th> 總天數   </th>
                            <th> 住宿價   </th>
                            <th> 個體調整 </th>
                            <th> 接送費   </th>
                            <th> 應 收    </th>
                            <th> 實 收    </th>
                            <th> 復 原    </th>
                            <th> 刪 除     </th>

                        </tr>
                    </thead>

                    <tbody>

                    { Lodge_isLoading ||

                    pageOfItems.map( ( item : any , index ) => {

                        if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                        return <Lodge_Rows key={ index } data={ item } /> ;

                    })

                    }

                    </tbody>

                </table>

                { /* 下載圖示  */ }
                { Lodge_isLoading &&

                    <div className="has-text-centered" >
                        <br/><br/><br/><br/><br/><br/>
                        <button className="button is-loading is-white"></button>
                    </div>

                }

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

             </>

};

export default Lodge