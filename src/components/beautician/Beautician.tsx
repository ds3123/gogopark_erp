
import React, {useEffect, useState} from "react" ;
import Main_Card from "components/beautician/Main_Card";
import Left_Cards from "components/beautician/Left_Cards";
import Inform_Cutomer from "components/beautician/main_components/inform_customer/Inform_Customer"

// Hook ( Ajax )
import { useRead_Service_Cus_Pet } from 'hooks/ajax_crud/useAjax_Read'
import {useDispatch, useSelector} from "react-redux";

// Redux
import { set_Current_Beautician } from 'store/actions/action_Beautician' ;
import axios from "utils/axios" ;
import cookie from "react-cookies";
import moment from "moment";

import { get_Service_Records_By_Date } from "store/actions/action_Service"


/* @ 美容師頁面  */
const Beautician = () => {

    const dispatch = useDispatch();

    // 取得 _ 今日 : 服務資料
    const service_Records_By_Date = useSelector( ( state : any ) => state.Service.service_Records_By_Date ) ;


    // 所有美容師資料
    const [ beauticians , set_Beauticians ] = useState<any[]>([]) ;

    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ userInfo , set_UserInfo ] = useState<any>( {} ) ;

    // 目前所點選寵物
    const Current_Pet         = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;
    const current_Pet_Id      = Current_Pet ? Current_Pet['pet_id'] : null ;

    // 目前寵物是否已處理完畢
    const Current_Pet_Is_Done = useSelector( ( state : any ) => state.Beautician.Current_Pet_Is_Done ) ;

    // 判斷是否有點選寵物
    const [ has_PetData , set_Has_PetData ] = useState(false) ;

    
    // 今日
    const today   = moment( new Date() ).format('YYYY-MM-DD' ) ;

    // 篩選出 _ 到店狀態( shop_status ) 為 : "到店等候中" & "到店美容中"
    const shop_Wait  = service_Records_By_Date.filter( ( x:any ) => { return ( x['shop_status'] === '到店等候中' || x['shop_status'] === '到店美容中' )  ;  } ) ;


    // 點選 _ 美容師姓名
    const click_Beautician = ( beautician : string ) => {

        // 設定 state
        set_UserInfo( { ...userInfo , employee_name : beautician } ) ;

        // Redux 設定 _ 目前美容師
        dispatch( set_Current_Beautician( beautician ) ) ;

    } ;


    // 設定 _ 判斷是否有點選寵物狀態
    useEffect( ( ) => {

        set_Has_PetData( current_Pet_Id ? true : false ) ;

    } ,[ current_Pet_Id ] ) ;


    // 設定 _ Cookie
    useEffect(( ) => {

        const _cookie = cookie.load('userInfo') ;

        if( _cookie ){

            // 設定 _ 使用者資訊
            set_UserInfo( _cookie ) ;

            // Redux 設定 _ 目前美容師
            dispatch( set_Current_Beautician( _cookie['employee_name'] ) ) ;

        }

    } , [] ) ;


    // 取得 _ 美容師資料
    useEffect( () : any => {

       let is_Mounted = true ;

       axios.get( '/employees' ).then( res => {

          // 篩選出 : 職位類型( position_type ) 為 "美容"、"計時美容"
          if( is_Mounted && res.data.length > 0 ){
             const beauticianArr = res.data.filter( ( x : any ) => x['position_type'] && ( x['position_type'] === '美容' || x['position_type'] === '計時美容' ) ) ;
             set_Beauticians( beauticianArr ) ;
          }

       }).catch( error => {

          // console.error( error.response.data ) ; // 顯示詳細錯誤訊息
     
       }) ;

       return () => is_Mounted = false

    } , [] ) ;


    // 每隔 5 秒取得資料，以美容師資料與櫃台新增資料一致
    useEffect( () => { 

      let is_Mounted    = true ;   
        
      const get_Records = setInterval( () => {
          
                      if( is_Mounted ) dispatch( get_Service_Records_By_Date( today ) ) ;
                    
                    } , 5000  ) 

      return () => {

                     is_Mounted = false ;

                     clearInterval( get_Records )   // 元件掛載前，先清除 setInterval

                   } 

    } , [ ] ) ;



    return <div className="relative" style={{ top:"-40px" }}>

                <div className="columns is-multiline  is-mobile">

                    { /* 美容師列表 */}
                    <div className="column is-8-desktop relative">

                        <b className="tag is-medium is-white"> <i className="fas fa-user"></i> &nbsp; 美容師列表 &nbsp; : &nbsp; &nbsp;

                            {
                                beauticians.map( ( x , y) => {

                                    return <span key={y}>

                                              <b className = { `tag pointer is-medium ${ userInfo['employee_name'] === x['employee_name'] ? 'is-success' : 'hover' }`}
                                                 onClick   = { () => click_Beautician( x['employee_name'] ) } >  { x['employee_name'] }
                                              </b> &nbsp; &nbsp; &nbsp;

                                           </span>

                                })
                            }

                        </b>

                    </div>

                    { /* 告知主人、主人確認 */}
                    <div className="column is-4-desktop relative">
                         <Inform_Cutomer />
                    </div>

                    { /* 左側 : 等待中、處理中 面板 */}
                    <div className="column is-3-desktop relative">
                         <Left_Cards pet_Arr={ shop_Wait } />
                    </div>

                    { /* 右側 : 主要面板 */}
                    { ( has_PetData && !Current_Pet_Is_Done ) &&

                       <div className="column is-9-desktop relative">
                          <Main_Card/>
                       </div>

                    }

                </div>



           </div>

};

export default Beautician ;
