

import { useEffect , FC } from "react" ;
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";

import Update_Plan from "components/plan/edit/Update_Plan";



// @ 表單 : 預收款 ( 方案 : 包月洗澡、包月美容 )
const Advance_Receipt_Table : FC< { data : any } > = ( { data } ) => {

  const dispatch = useDispatch(); 

  // 點選 _ 方案
  const click_Plan_Type = ( plan : any ) => dispatch( set_Side_Panel( true , <Update_Plan /> , {  preLoadData : plan } ) ) ;


  return <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                  <th> 項 目    </th>
                  <th> 寵物資訊 </th>
                  <th> 金 額  <span className="f_10 fDblue"> ( 應 收 ) </span>  </th>
                  <th> 期 數    </th>
                  <th> 折 扣    </th>
                  <th> 應收帳款 <span className="f_10 fDblue"> ( 實 收 ) </span> </th>
                  <th> 備 註    </th>
                </tr>
            </thead>

            <tbody>

                {

                  data.map( ( x : any , y : number ) => {

                      return <tr key = { y }>
                                <td className="td_Left"> 
                                    <b className="tag is-medium pointer" onClick={ () => click_Plan_Type( x ) } > 
                                       { x['plan_type'] } 
                                    </b>  
                                </td>
                                <td className="td_Left"> { x['pet'] ? x['pet']['name'] : '' } ( { x['pet'] ? x['pet']['species'] : '' } )  </td>
                                <td> { x['amount_payable'] }                         </td>
                                <td> 1                                               </td>
                                <td> { x['amount_payable'] - x['amount_paid'] }      </td>
                                <td> { x['amount_paid'] }                            </td>
                                <td className="td_Left"> { x['admin_service_note'] } </td>
                             </tr>

                  }) 
                
                }

            </tbody>

        </table>

} ;


export default Advance_Receipt_Table
       