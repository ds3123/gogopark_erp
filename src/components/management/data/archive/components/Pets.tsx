
import React from "react"


// 分頁套件、呼叫邏輯
import usePagination from "hooks/layout/usePagination" ;
import Pagination from "utils/Pagination" ;

// 資料列
import Pets_Rows from "components/pets/Pets_Rows" ;


// @ 寵物 _ 封存資料
const Pets = ( ) => {

   // 取得 _ 分頁資料
   const { pageOfItems , filteredItems , click_Pagination } = usePagination('/pets/show_pets_customers_relatives/1' , 'pet' ) ;


    return <>

                <table className="table is-fullwidth is-hoverable relative" >

                    <thead>
                    <tr>
                        <th> 寵物資訊 </th>
                        <th style={{height:"10px",width:"100px"}}> 寵物編號 </th>

                        <th> 主人姓名 </th>
                        <th> 主人手機 </th>
                        {/*<th style={{width:"100px"}}> <b className="fBlue">單次</b>洗澡 </th>*/}
                        {/*<th style={{width:"100px"}}> <b className="fBlue">單次</b>美容 </th>*/}
                        {/*<th style={{width:"100px"}}> <b className="fBlue">包月</b>洗澡 </th>*/}
                        {/*<th style={{width:"100px"}}> <b className="fBlue">包月</b>美容 </th>*/}
                        <th> 消費歷史 </th>
                        <th> 復 原    </th>
                        <th> 刪 除     </th>
                    </tr>
                    </thead>

                    <tbody>

                        {

                            pageOfItems.map( ( item : any , index ) => {

                                if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                                return <Pets_Rows key={ index } data={ item } />

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

export default Pets