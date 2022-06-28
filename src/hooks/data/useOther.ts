import { useState , useEffect } from 'react'
import axios from 'utils/axios'
import { sort_Data_By_CreatedDate } from 'utils/data/sort_data'




// 取得 _ 特定日期，所有其他( 收入、支出 )
export const useOther_Get_By_Date = ( date : string ) => {

    const [ others , set_Others ] = useState< any[] >( [] ) ;

    useEffect( () => {

        axios.get( `/others/show_others_by_date/${ date }` ).then( res => {

            // 排序 
            const data = sort_Data_By_CreatedDate( res.data , 'desc' ) ;

            set_Others( data ) ;


        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [ date ] ) ;

    return others 

}