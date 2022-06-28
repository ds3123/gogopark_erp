

import { useState , useEffect } from 'react'
import Plan_Used_Records_Table_Row from './Plan_Used_Records_Table_Row'
import axios from 'utils/axios'


type Plan_Used_Records_Table = {

    _plan_Used_Records : any[] ;
    data               : any ;

}


type Row = {

    service_Type : string ;
    q_Code       : string ;
    service_Note : string ;  // 服務
    extra_Item   : string ;  // 加價項目 
    created_Date : string ;  // 開店日期
    service_Date : string ;  // 到店日期

}



// @ 方案使用列表
const Plan_Used_Records_Table = ( { _plan_Used_Records , data } : Plan_Used_Records_Table ) => {

    

    // 以下再看看是否需保留 2022.06.23

    // const [ row_Data , set_Row_Data ] = useState< any[] >( [] )


    // useEffect( () => {
      
    //     _plan_Used_Records.forEach( x => {

            
    //         axios.get( `/plan_records/show_sigle_plan_used_record_with_service/${ x['id'] }` )
    //              .then( res => { 
               
    //                       const record = res.data ;   
                        
    //                       set_Row_Data( [ ...row_Data , record ] ) ;

       
    //                   })
    //              .catch( err => console.log( err ) ) ; 

    //      })

    // } , [ _plan_Used_Records ] ) ;



   return <table className="table is-fullwidth is-hoverable">
         
                <thead>

                    <tr>
                        
                        <th>  服務類型  <span className="f_10"> ( 使用紀錄 id ) Q碼 </span> </th>  
                        <th>  服務說明  </th>
                        <th>  加價項目  </th>
                        <th>  開單日期  </th>
                        <th>  到店日期  </th>
                        <th className="relative">  
                              洗美單 id  
                        </th>

                    </tr>

                </thead>

                <tbody>

                   {
                     _plan_Used_Records.map( ( x : any , y : number ) =>  
                                                   <Plan_Used_Records_Table_Row key={ y } record_Id={ x['id'] } service_Id={ x['service_id'] } /> )
                   }

                </tbody>

           </table> 

} ;

export default Plan_Used_Records_Table
       