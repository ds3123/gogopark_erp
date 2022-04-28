
import { useState , useEffect } from 'react'

import usePagination from 'hooks/layout/usePagination'
import Pagination from 'utils/Pagination' 
import Reject_Customer_Row from './Reject_Customer_Row'
import {  useCustomer_Is_Process_Reject } from 'hooks/data/useCustomer'
 

// @ 拒接客戶
const Reject_Customer_List = () => {

    // 取得 _ 分頁資料
    // const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/services/show_services_by_error/1' , 'service' ) ;


    const [ pageOfItems , set_pageOfItems ] = useState<any[]>( [] ) ;  // 當前頁面 _ 顯示項目

    
    // 點選 : 分頁頁碼
    const click_Pagination = ( _pageOfItems : [] ) => set_pageOfItems( _pageOfItems ) ; 


    // 所有 _ 客戶拒接狀態 : 審核中、通過、退回
    const filteredItems  = useCustomer_Is_Process_Reject();


    return <>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 區域別  </th> 
                            <th> 店 別   </th> 
                            <th> 客戶姓名 </th>
                            <th> 手機號碼 </th>
                            <th> 寵物資訊 </th>
                            <th> 通訊地址 </th>
                            <th> 拒接處理狀態 </th>
                        </tr>
                    </thead>

                    <tbody>

                        { pageOfItems.map( ( item : any , index ) => <Reject_Customer_Row key={ index } data = { item } /> ) }

                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div className="m_Top_50 m_Bottom_150">
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

            </> 


} ;


export default Reject_Customer_List
       

