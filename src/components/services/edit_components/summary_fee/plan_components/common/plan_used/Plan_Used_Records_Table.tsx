
import { useEffect , useState } from 'react' ;
import axios from 'utils/axios';

// useContext
import { useContext } from "react" ;
import { ModalContext } from "templates/panel/Modal" ;
import { SidePanelContext } from "templates/panel/Side_Panel" ;


import Plan_Used_Records_Table_Row from './Plan_Used_Records_Table_Row'



type Plan_Used_Records_Table = {

    _plan_Used_Records : any[] ;
    data               : any ;

}



// @ 方案使用列表
const Plan_Used_Records_Table = ( { _plan_Used_Records , data } : Plan_Used_Records_Table  ) => {




   return <table className="table is-fullwidth is-hoverable">

         
                <thead>
                    <tr>
                        <th>  服務說明  </th>
                        {/* <th>  服務價格  </th> */}
                        <th>  加價項目  </th>
                        <th>  使用日期  </th>
                    </tr>
                </thead>

                <tbody>

                    {

                       _plan_Used_Records.map( ( x : any , y : number ) => 
                                    
                                            <Plan_Used_Records_Table_Row key={ y } record_Id={ x['id'] } />

                                       )

                    }

                </tbody>

           </table> 

} ;

export default Plan_Used_Records_Table
       