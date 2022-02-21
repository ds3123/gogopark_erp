
import React from "react"
import {useSelector} from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Care_Rows from "../../../../lodge/care/Care_Rows";
import Pagination from "utils/Pagination";




// @ 安親 _ 封存資料
const Care = ( ) => {

    // 安親頁資料 _ 是否下載中
    const Care_isLoading = useSelector( ( state:any ) => state.Care.Care_isLoading ) ;

    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/cares/show_with_cus_relative_pet/1" , 'care' ) ;


    return  <>

                <table className="table is-fullwidth is-hoverable relative" style={{width:"110%",left:"-5%"}} >

                    <thead>
                        <tr>
                            <th> 寵物資訊 </th>
                            <th> 客戶姓名 </th>
                            <th> 安親類別 </th>
                            <th> 來店日期 </th>
                            <th> 來店時間 </th>
                            <th> 來店方式 </th>
                            <th> 離店方式 </th>
                            <th> 安親價格 </th>
                            <th> 個體調整 </th>
                            <th> 接送費   </th>
                            <th> 應 收   </th>
                            <th> 實 收   </th>
                            <th>  復 原   </th>
                            <th>  刪 除   </th>
                        </tr>
                    </thead>

                    <tbody>

                    { Care_isLoading ||

                        pageOfItems.map( ( item : any , index ) => {

                            if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                            return <Care_Rows key={ index } data={ item } /> ;

                        })

                    }

                    </tbody>

                </table>

                { /* 下載圖示  */ }
                { Care_isLoading &&

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





} ;

export default Care