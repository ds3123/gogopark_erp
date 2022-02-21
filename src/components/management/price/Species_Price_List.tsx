
import { useState } from "react"
import { useRead_All_Species_With_Service_Prices } from "hooks/ajax_crud/useAjax_Read"
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Species from "../setting/species/edit/Update_Species";
import { useDispatch , useSelector } from "react-redux";
import Update_Price from "../../prices/edit/Update_Price";
import { useGet_All_Custom_Plans } from "hooks/data/usePlan"
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Create_Custom_Plan from "components/plan/custom_plan/Create_Custom_Plan"
import Update_Custom_Plan from "components/plan/custom_plan/Update_Custom_Plan";



/* @ 各種務 【 品種 】 _ 價格清單範本 */
const Species_Price_List = () => {

    const dispatch     = useDispatch() ;

    // 取得 _ 所有 : 自訂方案
    const custom_Plans = useGet_All_Custom_Plans();

    // 目前 : 自訂方案
    const [ current_Custom_Plan , set_Current_Custom_Plan ] = useState({
                                                                         plan_Name       : '',  // 方案名稱
                                                                         bath_Num        : 0 ,  // 洗澡次數
                                                                         beauty_Num      : 0 ,  // 美容次數
                                                                         plan_Period     : 0 ,  // 使用期限
                                                                         default_Price   : 0 ,  // 預設價格
                                                                         applied_Species : ''   // 方案套用品種
                                                                       })


    // 顯示 : 方案
    const [ is_PlanInfo , set_Is_PlanInfo ] = useState( false ) ;


    // 取得 species 資料表所有資料
    const data = useRead_All_Species_With_Service_Prices() ;

   
    // 點選 _ 品種名稱
    const click_Species = ( species : any ) =>
          dispatch( set_Side_Panel( true , <Update_Price /> , { preLoadData : species , source_Create_Way : '寵物品種' } ) ) ;


    // 切換 _ 自訂方案
    const handle_Custom_Plan_Change = ( plan_Name : string ) => {
   
       if( plan_Name === "請選擇" ){
         set_Is_PlanInfo( false ) ;
         return false
       }else{
         set_Is_PlanInfo( true ) ;
       }
 
       // 目前方案   
       const current_Plan = custom_Plans.filter( ( x : any ) => x['plan_name'] === plan_Name )[0] ;

       set_Current_Custom_Plan({ ...current_Custom_Plan ,

                                    plan_Name       : current_Plan['plan_name'] ,          // 方案名稱   
                                    bath_Num        : current_Plan['bath_num'] ,           // 洗澡次數
                                    beauty_Num      : current_Plan['beauty_num'] ,         // 美容次數

                                    plan_Period     : current_Plan['plan_period'] ,        // 使用期限
                                    default_Price   : current_Plan['default_price'] ,      // 預設價格

                                    applied_Species : current_Plan['plan_applied_species'] // 方案套用品種
      
                                })
 


    } ;      
    
    
    const left  = { textAlign  : "left" } as any ;
    const bt    = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;
    const blue  = { color:"rgb(0,0,160)" } ;
    const blown = { color:"rgb(180,130,0)" } ;
    const info  = { top:"-45px" , left:"50px" , width:"400px" , textAlign:"left" , color:"grey" } as const ;

    return <table className="table is-fullwidth is-hoverable relative" style={{ marginBottom:"150px" , width:"108%" , left:"-4%" }} >

               <thead>

                  <tr>
                     <th> 品種名稱 </th>
                     <th> 代 碼    </th>
                     <th> 代 號    </th>
                     <th> <span style={ blown }>初次洗澡</span> </th>
                     <th> <span style={ blue }>單次</span>洗澡  </th>
                     <th> <span style={ blue }>包月</span>洗澡  </th>
                     <th> <span style={ blue }>單次</span>美容  </th>
                     <th> <span style={ blue }>包月</span>美容  </th>
                     <th className="relative"> 

                         { /* 方案說明 */ }
                         { is_PlanInfo &&

                             <b className="absolute f_11" style={ info }> 
                                 洗澡次數 : <b className="fRed">  { current_Custom_Plan['bath_Num'] ? current_Custom_Plan['bath_Num'] : 0 }      </b> 次  &nbsp; &nbsp; &nbsp;
                                 美容次數 : <b className="fRed">  { current_Custom_Plan['beauty_Num'] ? current_Custom_Plan['beauty_Num'] : 0 }  </b> 次  <br/>
                                 使用期限 : <b className="fBlue"> { current_Custom_Plan['plan_Period'] }                                         </b> 天  &nbsp; &nbsp;
                                 預設價格 : <b className="fBlue"> { current_Custom_Plan['default_Price'] }                                       </b> 元
                             </b>  
                           
                          } 

                          自訂方案 : &nbsp;     
 
                          <div className="select is-small f_11 relative" style={{ top:"-5px" }}>

                             <select onChange={ e => { handle_Custom_Plan_Change( e.target.value ) } }>
                                <option value="請選擇"> 請選擇  </option>
                                { custom_Plans.map( ( x : any , y : number ) => <option key={y} value={ x['plan_name'] }> { x['plan_name'] } </option> ) }
                             </select>

                          </div>   

                     </th>
                  </tr>

               </thead>

               <tbody>

                  {

                     data.map( ( x : any , y : number ) => {

                        const service_prices  = x['service_prices'] as any ;
                        const first_Bath      = service_prices.filter( (x:any) => ( x['service_name'] === '初次洗澡優惠價格' ) )[0] ;
                        const single_Bath     = service_prices.filter( (x:any) => ( x['service_name'] === '單次洗澡價格' ) )[0] ;
                        const month_Bath      = service_prices.filter( (x:any) => ( x['service_name'] === '包月洗澡價格' ) )[0] ;
                        const single_Beauty   = service_prices.filter( (x:any) => ( x['service_name'] === '單次美容價格' ) )[0] ;
                        const month_Beauty    = service_prices.filter( (x:any) => ( x['service_name'] === '包月美容價格' ) )[0] ;

                        x.current_Custom_Plan = current_Custom_Plan ;  // 加入 _ 客製方案

                        return <tr key = { y } >

                                 <td style={left}>
                                    <b className="tag is-medium pointer" style={bt} onClick={ () => click_Species( x ) }>
                                          { x['name'] }
                                    </b>
                                 </td>
                                 <td> { x['serial'] }                                          </td>
                                 <td> { x['character'] }                                       </td>
                                 <td> { first_Bath ? first_Bath['service_price'] : '' }        </td>
                                 <td> { single_Bath ? single_Bath['service_price'] : '' }      </td>
                                 <td> { month_Bath ? month_Bath['service_price'] : '' }        </td>
                                 <td> { single_Beauty ? single_Beauty['service_price'] : '' }  </td>
                                 <td> { month_Beauty ? month_Beauty['service_price'] : '' }    </td>
                                 <td>   

                                      { /* 有套用品種 */ } 
                                      { ( is_PlanInfo && current_Custom_Plan['applied_Species'].includes( x['serial'] ) ) && 
                                             // <b className="tag is-medium pointer" style={ bt }  onClick={ () => click_Update_Custom_Plan( x ) } > 
                                             //     { current_Custom_Plan['default_Price'] } 
                                             // </b> 
                                             <span> { current_Custom_Plan['default_Price'] } </span> 
                                      } 

                                      { /* 未套用品種 */ } 
                                      { ( is_PlanInfo && !current_Custom_Plan['applied_Species'].includes( x['serial'] ) ) && 
                                             // <b className="tag is-medium pointer fDred" style={ bt }  onClick={ () => click_Update_Custom_Plan( x ) } > 
                                             //      未套用
                                             // </b> 
                                             <span>  未套用 </span> 
                                      }  

                                 </td>
                              </tr>

                     })

                  }

               </tbody>

             </table>
            
} ;

export default Species_Price_List ;

