
import { useRead_Employees } from 'hooks/ajax_crud/useAjax_Read'
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useDispatch } from "react-redux";
import Update_Employee from "components/management/employee/edit/Update_Employee";



/* 管理區 _ 員工 */
const Employees = ( ) => {

    
    const dispatch = useDispatch() ;
    const data     = useRead_Employees() ;  // 取得資料


    // 點選 _ 服務單
    const click_Type = ( employee : any ) => dispatch( set_Side_Panel( true , <Update_Employee /> , { preLoadData : employee } ) ) ;

    const left = { textAlign:'left'} as const ;

   return <>

            <table className="table is-fullwidth is-hoverable">

               <thead>
                   <tr>
                       <th> 帳號類別   </th>
                       <th> 帳 號      </th>
                       <th> 密 碼      </th>
                       <th> 姓 名      </th>
                       <th> 計薪類別   </th>
                       <th> 職位類別   </th>
                       <th> 身分證字號 </th>
                       <th> 手機號碼   </th>
                       <th> 暱 稱      </th>
                       <th> 通訊地址   </th>
                       <th> 封 存      </th>
                   </tr>
               </thead>

               <tbody>

                   {
                       data.map( (x,y) => {

                           let tag = '' ;
                           if( x['employee_type'] === '管理帳號' ) tag = 'is-warning' ;
                           if( x['employee_type'] === '測試帳號' ) tag = 'is-danger' ;
                           if( x['employee_type'] === '工作人員' ) tag = 'is-success' ;

                           return <tr key={y}>
                                       <td>
                                           <span className={ `tag is-medium ${ tag } is-light pointer`}  onClick={ () => click_Type( x ) }>
                                               { x['employee_type'] }
                                           </span>
                                       </td>
                                       <td> { x['account'] }        </td>
                                       <td> { x['password'] }       </td>
                                       <td> { x['employee_name'] }         </td>
                                       <td> { x['salary_type'] }    </td>
                                       <td> { x['position_type'] }  </td>
                                       <td style={left}> { x['employee_id'] }           </td>
                                       <td style={left}> { x['employee_mobile_phone'] } </td>
                                       <td> { x['nickname'] }       </td>
                                       <td style={left}> { x['employee_address'] } </td>
                                       <td> <i className="fas fa-download pointer"></i> </td>
                                  </tr>

                       })
                   }

               </tbody>

            </table>

          </>

} ;

export default Employees


