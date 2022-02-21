
import React, {useContext , FC} from "react"

import usePagination from "hooks/layout/usePagination" ;
import useServiceType from "hooks/layout/useServiceType" ;

// useContext
import { ModalContext } from "templates/panel/Modal" ;

import Pagination from "utils/Pagination" ;
import { useSelector } from "react-redux";

import { get_Service_Url } from "utils/data/switch"


type sType = '客戶' | '寵物' ;




// API : 取得客戶或寵物服務資料
const get_Data_API = ( type : sType , current_Tab : string , Current_Customer_Id : string , pet_Serial : string ) => {

   // 客戶 ( 所有服務資料 )
   if( type === '客戶' ) return `/${ get_Service_Url( current_Tab ) }/show_customer_id/${ Current_Customer_Id }`

   // 寵物 ( 基礎 or 洗澡 or 美容 服務資料 )
   return `/${ get_Service_Url( current_Tab ) }/show_pet_records/${ pet_Serial }`

} ;




// @ 服務歷史紀錄列表 ( 基礎、洗澡、美容、安親、住宿 )
const Service_Records:FC< { type : sType } > = ( { type  }) => {

    const value       = useContext( ModalContext ) as any ;  // 取得 context 值
    const current_Tab = value['current_Tab'] ;               // 目前 _ 新增服務區塊 ( Ex. 基礎、洗澡、美容... ) 


    // 目前客戶身分證字號
    const Current_Customer_Id = useSelector( ( state : any ) => state.Customer.Current_Customer_Id ) ;


    // 目前所點選寵物資料
    const current_Pet     = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
    const cur_Pet_Serial  = current_Pet ? current_Pet['serial'] : ''  // 編號
    const cur_Pet_Name    = current_Pet ? current_Pet['name'] : ''    // 名字
    const cur_Pet_Species = current_Pet ? current_Pet['species'] : '' // 品種
    

    // API : 取得客戶或寵物服務資料
    const data_API       = get_Data_API( type , current_Tab , Current_Customer_Id , cur_Pet_Serial )


    // 服務標題樣式
    const { color , icon } = useServiceType( current_Tab , false , 'medium' , true );


    // 根據特定服務，取得 _ 相對應服務價格
    const get_Service_Price = ( service_Type : string , data : any ) => {

        if( service_Type === '基礎' ) return data['basic_fee'] ;
        if( service_Type === '洗澡' ) return data['bath_fee'] ;
        if( service_Type === '美容' ) return data['beauty_fee'] ;

        return 0 ;

    } ;


    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( data_API , 'service' ) ;


    // 洗美頁資料 _ 是否下載中
    const Service_isLoading = useSelector(( state : any ) => state.Service.Service_isLoading ) ;

    const tL = { "textAlign" : "left" } as any ;

  return <>

              <b className = { color } style={{ position : "absolute" , top:"-20px"}}>
                  <i className={ icon }></i> &nbsp; &nbsp; { value['current_Tab'] } _ 資料筆數 &nbsp;
                  <b className="tag is-white is-rounded">  { filteredItems.length }  </b>
              </b>

              <br/>

              <table className="table is-fullwidth is-hoverable">

                  <thead>
                      <tr>
                          <th>  寵物資訊  </th>
                          <th>  付款方式  </th>
                          <th>  服務說明  </th>
                          <th>  服務價格  </th>
                          <th>  個體調整  </th>
                          <th>  加價項目  </th>
                          <th>  加價美容  </th>
                          <th>  接送費    </th>
                          <th>  小 計     </th>
                          <th>  來店日期  </th>
                      </tr>
                  </thead>

                  <tbody>

                    {

                        pageOfItems.map( (x : any ,y) => {

                            if( !x['service_type'] ) return null ;


                            // # 寵物資訊
                            let pet_Info = ''
                            if( type === '客戶' ) pet_Info =  `${ x['pet']['name'] } ( ${ x['pet']['species'] } )` ;
                            if( type === '寵物' ) pet_Info =  `${ cur_Pet_Name } ( ${ cur_Pet_Species } )` ;


                            // # 價格
                            let service_Price      = get_Service_Price( x['service_type'] , x ) ;            // 服務價格
                           
                            let self_adjust_amount = x['self_adjust_amount'] ? x['self_adjust_amount'] : 0 ; // 個體調整

                            let plus_Item_Price    = x['extra_service_fee'] ? x['extra_service_fee'] : 0 ;   // 加價項目
                            let plus_Beauty_Price  = x['extra_beauty_fee'] ? x['extra_beauty_fee'] : 0  ;    // 加價美容

                            let pickup_fee         = x['pickup_fee'] ? x['pickup_fee'] : 0 ;                 // 接送費

                            // # 小計
                            const total            =  service_Price + self_adjust_amount + plus_Item_Price + plus_Beauty_Price + pickup_fee ;

                         
                                return <tr key={y} >
                                          <td style={tL}> { pet_Info }                      </td>
                                          <td> { x['payment_method'] }                      </td>
                                          <td style={tL}> { x['payment_type'] }             </td>
                                          <td> <b className="fDblue">{ service_Price } </b> </td>
                                          <td> { self_adjust_amount }                       </td>
                                          <td> { plus_Item_Price }                          </td>
                                          <td> { plus_Beauty_Price }                        </td>
                                          <td> { pickup_fee }                               </td>
                                          <td> <b className="fDred"> { total } </b>         </td>
                                          <td> { x['service_date'] }                        </td>
                                       </tr>
                                       

                        })

                    }

                  </tbody>

              </table>


              { /* 下載圖示  */ }
              { Service_isLoading &&

                  <div className="has-text-centered" >
                      <br/><br/><br/><br/><br/><br/>
                      <button className="button is-loading is-white"></button>
                  </div>

              }


              { /* 頁碼  */ }
              <div style={{ marginTop:"50px", marginBottom:"150px" }}>
                  <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
              </div>

         </>

} ;

export default Service_Records