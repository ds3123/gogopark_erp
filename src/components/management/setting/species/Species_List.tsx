
import React , { useEffect , useState } from "react"
import {useRead_Sort_Species } from "hooks/ajax_crud/useAjax_Read"
import {useDispatch} from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Species from "components/management/setting/species/edit/Update_Species";
import { useDelete_Pet_Species } from "hooks/ajax_crud/useAjax_Delete"


// Axios
import axios from "utils/axios";
import cookie from "react-cookies";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";


/* 寵物品種清單  */
const Service_List = ( ) => {

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    // 取得 _ 所有寵物品種資料 ( 連結 _ 排序資料表 : species_sorts )
    const data     = useRead_Sort_Species();

    // 目前品種資料排序現況
    const [ species , set_Species ] = useState( [] ) ;


    // 點選 _ 品種名稱
    const click_Species = ( species : any ) => dispatch( set_Side_Panel(true , <Update_Species /> , { preLoadData : species } ) ) ;

    // 刪除函式
    const delete_Pet_Species = useDelete_Pet_Species() ;


    // 點選 _ 刪除鈕
    const click_Delete = ( species_Id : string ) => delete_Pet_Species( species_Id) ;


    // # 更新 _ 介面排序

    // 點選 _ 向上排序
    const click_Up   = ( index : number ) => {

        if( index === 0 ){ alert( '已為第一個項目' ) ; return false ; }

        // # 前端排序 --------------------------

        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index-1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index+1 , 0 , deleteItem[0] ) ;


        // 設定、渲染畫面
        set_Species( _species ) ;


    } ;

    // 點選 _ 向下排序
    const click_Down = ( index : number ) => {

        const maxIndex = ( species.length ) - 1 ;
        if( index === maxIndex ){ alert( '已為最後一個項目' ) ; return false ; }

        // # 前端排序  --------------------------
        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index+1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index , 0 , deleteItem[0] ) ;

        // 設定、渲染畫面
        set_Species( _species ) ;

    } ;


    // # 更新 _ 資料庫排序
    const refresh_Data = ( species_Data : any[] ) => {

        // 依照資料表( species_sorts )欄位，重組資料
        const postArr = species_Data.map( ( x:any ) => {
            return { pet_id : x['id'] , pet_name : x['name'] } ;
        }) ;


        // 以 POST 方法，傳送 ( 大量 / 陣列 ) 資料
        axios.post( `/species_sorts/create_multi_data` , postArr ).then( res => {

            // 新增成功通知
            toast(`🦄 ${ res.data } ` ,{ position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

            // 設定 cookie ( for 前往 : 系統設定 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/management" ) ; // 正確路徑

        })

    } ;


    // 取得、設定資料
    useEffect( ( ) => {

      if( data.length > 0 ){

          set_Species( data );

      }

    } , [ data ] ) ;

    // -------------------------------------------------------------

    const left = { textAlign : 'left' } as const ;
    const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;

    return <>

              <table className="table is-fullwidth is-hoverable" style={{marginBottom:"150px"}}>

                    <thead>
                        <tr>
                            {/* <th className="relative">
                                <b className="tag is-medium relative pointer"
                                   style={{ background:"rgb(150,0,0)" , color:"white" }}
                                   onClick = { ( ) => refresh_Data( species )  } >
                                   <i className="fas fa-stream"></i> &nbsp; 排 序
                                </b>
                            </th> */}
                            <th> 名 稱 </th>
                            <th> 代 號 </th>
                            <th> 代 碼 </th>
                            <th> 體 型 </th>
                            <th> 毛 髮 </th>
                            <th> 備 註 </th>
                            <th> 刪 除 </th>
                        </tr>
                    </thead>

                    <tbody>

                       {

                           species.map( (x:any,y:any) => {

                              return <tr key={y} style={{ lineHeight : "40px" }}>

                                        {/* <td className='relative'>
                                            <b className="tag is-medium relative is-white" onClick={ () => click_Up(y) }>
                                                <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                                    <i className="fas fa-sort-up pointer"   ></i>
                                                </span>
                                            </b> &nbsp;&nbsp;
                                            <b className="tag is-medium is-white" onClick={ () => click_Down(y) }>
                                               <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                                   <i className="fas fa-sort-down" ></i>
                                               </span>
                                            </b>
                                        </td> */}
                                        <td style={ left }>
                                            <b className="tag is-medium pointer" style={bt} onClick={ () => click_Species( x ) }>  { x['name'] }  </b>
                                        </td>
                                        <td> { x['serial'] }              </td>
                                        <td> { x['character'] }           </td>
                                        <td> { x['size'] }                </td>
                                        <td> { x['fur'] }                 </td>
                                        <td style={ left }> { x['note'] } </td>
                                        <td>
                                            <b className="delete relative" style={{ top:"7px" }}
                                               onClick={ () => { if( window.confirm("確認要刪除此品種 ?") ) click_Delete( x['id'] ) } }>
                                            </b>
                                        </td>

                                     </tr>

                           })

                       }

                    </tbody>

              </table>


           </>

} ;

export default Service_List ;

