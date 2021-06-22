
import React, {useState} from "react" ;
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";
import {useSelector} from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Care from 'components/lodge/care/Care'


const lodgeArr = [

    { title : "住 宿" , icon : "fas fa-home"  } ,
    { title : "安 親" , icon : "fas fa-baby-carriage"  } ,

] ;


/* @ 住宿頁面 ( 住宿資料、安親資料 ) */
const Lodge = () => {

    // 洗美頁資料 _ 是否下載中 ( 修改 )
    const Service_isLoading = useSelector( ( state:any ) => state.Service.Service_isLoading ) ;

    // 取得 _ 分頁資料 ( 修改 )
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" , 'service' ) ;


    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( lodgeArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;

    return <>

                { /* 第 2 層選項 */
                    lodgeArr.map( ( item , index ) => {

                        return <b key       = {index}
                                  className = { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >

                                  <i className={ item.icon }></i> &nbsp; { item.title }

                               </b>

                    })
                }

               <br/><br/><br/>

               { /* 住宿資料 */ }
               { currentSecond === lodgeArr[0].title &&

                    <>

                        <table className="table is-fullwidth is-hoverable">

                            <thead>
                            <tr>
                                <th> 消費類別                          </th>
                                <th> 寵物資訊                          </th>
                                <th style={{ width:"80px" }}> 價 格    </th>
                                <th > 來店日期 </th>
                                <th style={{ width:"80px" }}> Q 碼     </th>
                                <th style={{ width:"150px" }}> 到店狀態 </th>
                                <th style={{ width:"110px" }}> 來店方式 </th>
                                <th> 消費歷史                          </th>
                                <th>  封 存  </th>
                            </tr>
                            </thead>

                            <tbody>

                            { Service_isLoading ||

                            pageOfItems.map( ( item : any , index ) => {

                                if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                                return <Services_Rows key={ index } data={ item } /> ;

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

                        { /* 分頁按鈕 */ }
                        <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                            <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                        </div>

                    </>

                }

               { /* 安親資料 */ }
               { currentSecond === lodgeArr[1].title && <Care />

               }


           </>

};

export default Lodge ;
