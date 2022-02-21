
import { FC } from "react"
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Price from "components/prices/edit/Update_Price" ;
import { useDelete_Service_Price } from "hooks/ajax_crud/useAjax_Delete";



/* @ 各項服務 ( 基礎、洗澡、美容 ) _ 清單範本 */
const Service_Price_List : FC< { data : any[] } > = ( { data } ) => {

  const dispatch      = useDispatch() ;

  // 點選 _ 服務名稱
  const click_Service = ( service : string ) => dispatch( set_Side_Panel( true , <Update_Price /> , { preLoadData : service , source_Create_Way : '個別項目' } ) ) ;

  // 刪除函式
  const delete_Service_Price = useDelete_Service_Price() ;

  // 點選 _ 刪除鈕
  const click_Delete = ( price_Id : string ) => delete_Service_Price( price_Id ) ;


  const left = { textAlign  : 'left' } as const ;
  const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;


  return <>
            
           <table className="table is-fullwidth is-hoverable" style={{marginBottom:"150px"}}>

              <thead>
                  <tr>
                    <th> 服務類別 </th>
                    <th> 項目名稱 </th>
                    <th> 指定方案 </th>
                    <th> 指定品種 </th>
                    <th> 項目價格 </th>
                    <th> 備 註    </th>
                    <th> 刪 除    </th>
                  </tr>
              </thead>

              <tbody>

                  {
                      data.map( (x,y)=>{

                          return  <tr key={y}>
                                      <td> { x['service_type'] }                                   </td>
                                      <td style={left}>
                                          <b className="tag is-medium pointer" style={bt} onClick={ () => click_Service( x ) }>
                                             { x['service_name'] }
                                          </b>
                                      </td>
                                      <td> { x['service_plan'] === '無' ? '' : x['service_plan'] } </td>
                                      <td> { x['pet_species'] ? x['pet_species']['name'] : '' }    </td>
                                      <td> { x['service_price'] }                                  </td>
                                      <td style={left}> { x['note'] }                              </td>
                                      <td>
                                          <b className="delete relative" style={{ top:"7px" }}
                                             onClick={ () => { if( window.confirm("確認要刪除此價錢 ?") ) click_Delete( x['id'] ) } }>
                                          </b>
                                      </td>
                                  </tr>

                      })
                  }

              </tbody>

           </table>

         </>
         
} ;

export default Service_Price_List ;

