
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";



// @ 洗美 _ 封存資料
const Services = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_relative_pet/1/1000" , 'service' ) ;


    return <div className="relative" style={{width:"114%" , left:"-7%"}}>

        <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                    <th>  服務類別  </th>
                    <th>  寵物資訊  </th>
                    <th>  客戶姓名  </th>
                    <th>  服務說明  </th>
                    <th>  服務價格  </th>
                    <th>  個體調整  </th>
                    <th>  加價項目  </th>
                    <th>  加價美容  </th>
                    <th>  接送費    </th>
                    <th>  應 收     </th>
                    <th>  實 收     </th>
                    <th>  來 店     </th>
                    <th>  復 原     </th>
                    <th>  刪 除     </th>
                </tr>
            </thead>

            <tbody>

                {

                    pageOfItems.map( ( item : any , index ) => {

                        if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                        return <Services_Rows key={ index } data={ item } /> ;

                    })

                }

            </tbody>

        </table>

        { /* 分頁按鈕 */ }
        <div style={{ marginTop:"70px", marginBottom:"150px" }}>
            <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
        </div>

    </div>



} ;

export default Services
