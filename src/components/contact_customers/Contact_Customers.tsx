

import React from "react"
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";
import Contact_Customer_Row from "components/contact_customers/Contact_Customer_Row"

const data = [

  { type : '包月洗澡' , cus_Name : '李國豪' , cus_Mobile : '0915123012' , pet_Name : '大福' , pet_Species : '秋田犬' , contact_Reason : '方案自購買後，逾 7 天未使用 ( 0/4 )' , last_Contact : '尚未聯繫'  } ,
  { type : '包月美容' , cus_Name : '黃桂華' , cus_Mobile : '0923123011' , pet_Name : '小白' , pet_Species : '貴賓' , contact_Reason : '逾 14 天未使用 ( 2/3 , 1/1 )' , last_Contact : '2021-09-20 11:20' } ,
  { type : '包月美容' , cus_Name : '陳美華' , cus_Mobile : '0923123011' , pet_Name : 'BoBo' , pet_Species : '拉布拉多 ' , contact_Reason : '14 天內到期 ( 2/3 , 0/1 )' , last_Contact : '2021-10-01 15:30' } ,
  { type : '包月洗澡' , cus_Name : '張家瑛' , cus_Mobile : '0923123011' , pet_Name : 'Money' , pet_Species : '柴犬 ' , contact_Reason : '7 天內到期 ( 1/4 )' , last_Contact : '2021-10-03 18:30' } ,

] ;


const Contact_Customers = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/plans/show_all_with_customer_species_records" ) ;


    return <>

                <table className="table is-fullwidth is-hoverable relative" >

                    <thead>
                        <tr>
                            <th> 服務類型        </th>
                            <th> 客戶姓名        </th>
                            <th> 客戶手機號碼    </th>
                            <th> 寵物資訊        </th>
                            <th> 需聯繫原因      </th>
                            <th> 最近一次聯繫 </th>
                            <th> 處理方式 </th>
                            <th> 聯繫紀錄         </th>
                        </tr>
                    </thead>
                    <tbody>

                       {
                          data.map( ( x , y ) => {



                              return <Contact_Customer_Row key={y} data={x} />

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

export default Contact_Customers