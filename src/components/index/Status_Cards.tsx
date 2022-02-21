

import { Shop_Status  } from 'utils/Interface_Type'
import Service_Rows from "components/index/Service_Rows";
import {useSelector} from "react-redux";


interface IStatus {

    shop_Status : Shop_Status ;
    pet_Arr     : {}[] ;
    service_Sum : { basic_Num : number ; bath_Num : number ; beauty_Num : number }

}


/* @ 到店狀態  */
const Status_Cards = ( props : IStatus ) => {


    // 首頁資料 _ 是否下載中
    const Index_isLoading = useSelector( ( state:any ) => state.Index.Index_isLoading ) ;

    const { shop_Status , pet_Arr , service_Sum } = props ;
    const { basic_Num , bath_Num , beauty_Num }   = service_Sum ;

    // 各階段標題 Icon
    let title_Icon  ;
    if( shop_Status === '到店等候中' ){   title_Icon = <i className="fas fa-store"></i> ; }
    if( shop_Status === '到店美容中' ){   title_Icon = <i className="fas fa-cut"></i> ;  }
    if( shop_Status === '洗完等候中' ){   title_Icon = <i className="fas fa-dog"></i> ; }
    if( shop_Status === '已回家( 房 )' ){ title_Icon = <i className="fas fa-store-alt"></i> ; }

    const boxShadow = { boxShadow : "1px 1px 4px 1px rgba(0,0,0,.2)" , position : "absolute" , top : "-35px" } as const ;
    const way_Leave = { paddingLeft : "65px" , marginBottom : "3px" , fontSize : "10pt" , color:"gray"} as const ;



    return  <div className="card" style={{ width:"100%" , height:"550px" , marginTop:"20px" }}>

              <div className="card-content" style={{ padding : "10px" }}>

                  { /* 標題統計 */ }
                  <div className="media" style={{ paddingTop : "20px" }}>

                      <div className="media-content" >

                          <div className="level" >

                              <span className="level-item" >

                                <span className="tag is-large" style={ boxShadow } >

                                  { title_Icon } &nbsp;&nbsp; <b> { shop_Status } </b> </span>

                                  <div className="relative" >

                                    <b className="tag is-medium is-light is-rounded"> 基 礎 &nbsp; <b className="tag is-rounded is-warning"> { basic_Num }  </b> </b> &nbsp;
                                    <b className="tag is-medium is-light is-rounded"> 洗 澡 &nbsp; <b className="tag is-rounded is-success"> { bath_Num }   </b> </b> &nbsp;
                                    <b className="tag is-medium is-light is-rounded"> 美 容 &nbsp; <b className="tag is-rounded is-danger">  { beauty_Num } </b> </b>

                                  </div>

                                </span>

                          </div>

                      </div>

                  </div>

                  { /* 項目內容 */ }
                  <div className="media" style={{ height:"450px" }}>

                      <div className="media-content" style={{ height:"100%" }}>

                          <div className="card-frame" style={{ height:"100%" }}>

                              { Index_isLoading ||

                                  pet_Arr.map( ( x : any , y : number ) => {

                                      // 依據 到店狀態( shop_status ) , 區分 4 個到店狀態區塊內容
                                      if( x['shop_status'] !== shop_Status ) return ;

                                      let service_id = '' ;  // 資料表( 基礎、洗澡、美容 )
                                      if( x['service_type'] === '基礎' ) service_id = x['basic_id'] ;
                                      if( x['service_type'] === '洗澡' ) service_id = x['bath_id'] ;
                                      if( x['service_type'] === '美容' ) service_id = x['beauty_id'] ;

                                      return <div key={y}>

                                                  { /* 等候方式 & 離店方式 ( for 洗完等候中 ) */ }
                                                  <div style={ way_Leave } >
                                                      { (  x['shop_status'] === '洗完等候中' &&  x['wait_time'] ) &&
                                                          <div>
                                                              <b style = { { color : "rgb(180,120,60)" } }>
                                                                  { x['wait_way'] } ( { x['wait_time'] } )
                                                              </b>
                                                          </div>
                                                      }
                                                  </div>

                                                  { /*  離店方式 ( for 已回家( 房 ) ) */ }  
                                                  <div style={ way_Leave } >
                                                      {  x['shop_status'] === '已回家( 房 )' &&
                                                        <div>
                                                            <b style = { { color : "rgb(180,120,60)" } }  >
                                                                <b> { x['way_leave'] } </b>
                                                            </b>
                                                        </div>
                                                      }
                                                  </div>

                                                  { /* 服務項目 */ }
                                                  <Service_Rows data = { x } />

                                             </div>

                                  })

                              }

                             <div  className="has-text-centered" style={{ width:"100%" }}>

                                { /* 下載圖示  */ }
                                { Index_isLoading &&

                                    <div className="has-text-centered" >
                                        <button className="button is-loading is-white m_Top_100"></button>
                                    </div>

                                }

                             </div>

                          </div>

                      </div>

                  </div>

              </div>

           </div> ;


} ;

export default Status_Cards ;