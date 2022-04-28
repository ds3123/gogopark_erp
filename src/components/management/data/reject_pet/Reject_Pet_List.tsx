

import { useState , useEffect } from 'react'
import usePagination from 'hooks/layout/usePagination'
import Pagination from 'utils/Pagination' 
import Reject_Pet_Row from './Reject_Pet_Row'
import { usePet_Is_Process_Reject } from 'hooks/data/usePet'
  

// @ 拒接客戶
const Reject_Pet_List = () => {

    // 取得 _ 分頁資料
    // const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/services/show_services_by_error/1' , 'service' ) ;

    const [ pageOfItems , set_pageOfItems ] = useState<any[]>( [] ) ;  // 當前頁面 _ 顯示項目

    
    // 點選 : 分頁頁碼
    const click_Pagination = ( _pageOfItems : [] ) => set_pageOfItems( _pageOfItems ) ; 


    // 所有 _ 寵物拒接狀態 : 審核中、通過、退回
    const filteredItems  = usePet_Is_Process_Reject();

    return <>
    
                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 區域別  </th> 
                            <th> 店 別   </th>  
                            <th> 寵物編號 </th>
                            <th> 寵物資訊 </th>
                            <th> 主人姓名 </th>
                            <th> 主人手機 </th>
                            <th> 處理狀態 </th>
                        </tr>
                    </thead>

                    <tbody>

                        { pageOfItems.map( ( item : any , index ) => <Reject_Pet_Row key={ index } data = { item } /> ) }

                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div className="m_Top_50 m_Bottom_150">
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

           </> 


} ;


export default Reject_Pet_List
       

