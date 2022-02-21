
import React , { FC , useEffect , useState } from 'react' ;
import useServiceType from 'hooks/layout/useServiceType'
import {useUpdate_Data} from 'hooks/ajax_crud/useAjax_Update';
import {set_Current_Pet , set_Current_Pet_Is_Done} from 'store/actions/action_Beautician'
import {useDispatch, useSelector} from "react-redux";
import { string_Short } from "utils/string/edit_string"


interface ILeft {
   pet_Arr : any[] ;
}

{ /*  左側 : 等待中、處理中 面板   */ }
const Left_Cards : FC<ILeft>  = ( { pet_Arr } ) => {



    // 資料 _ 是否下載中 ( 與首頁使用同樣的 API )
    const Index_isLoading = useSelector( (state:any) => state.Index.Index_isLoading ) ;

    // 目前所點選寵物
    const data            = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;

    // 服務類型 ( 基礎、洗澡、> )
    const service_type    = data ? data['service_type'] : '' ;


    // 目前所點選寵物資訊 : 服務類型、服務單 id
    const [ current , set_Current ] = useState({
                                                 service_Type : '' ,
                                                 service_Id   : ''
                                               }) ;

    // 點選 _ "到店等候中"資料並更改為"到店處理中"後，改變其樣式
    const [ in_Process , set_In_Process ] = useState<any>( null ) ;


    // 計數 : 到店等候中、到店美容中
    const [ count , set_Count ] = useState({
                                             // 到店等候中
                                             wait_Basic      : 0 ,
                                             wait_Bath       : 0 ,
                                             wait_Beauty     : 0 ,

                                             // 到店美容中
                                             progress_Basic  : 0 ,
                                             progress_Bath   : 0 ,
                                             progress_Beauty : 0 ,
                                          }) ;



    const dispatch        = useDispatch() ;

    // 更新函式
    const update_Data     = useUpdate_Data() ;

    // 到店等候中
    const pets_Wait       = pet_Arr.filter( x => x['shop_status'] === '到店等候中' ) ;

    // 到店美容中
    const pets_Beauty     = pet_Arr.filter( x => x['shop_status'] === '到店美容中' ) ;

    // 取得 : 資料類型樣式
    const get_ServiceType = useServiceType( null , true , 'medium' ) ;


    // 點選 : 列表資料 --> 切換處理狀態
    const click_Pet = ( pet : any , index? : number ) => {

        // # 設定 _ "到店美容中" 列表，所點選、處理中的寵物
        set_In_Process( index ) ;

        // # 若為點選 _ "到店等候中" 列表資料，則更改 "到店狀態" ( shop_status ) : '到店等候中' --> '到店美容中'
        let service_Id = '' ;
        let api        = '' ;

        if( pet['service_type'] === '基礎' ){ service_Id = pet['basic_id'] ;  api = '/basics' } ;
        if( pet['service_type'] === '洗澡' ){ service_Id = pet['bath_id'] ;   api = '/bathes' } ;
        if( pet['service_type'] === '美容' ){ service_Id = pet['beauty_id'] ; api = '/beauties' } ;

        if( pet['shop_status'] === '到店等候中' ) update_Data( api , service_Id , { shop_status : '到店美容中' } , '/beautician' ) ;


        // # 顯示 _ 右側寵物資訊面版
        dispatch( set_Current_Pet( pet ) ) ;
        dispatch( set_Current_Pet_Is_Done( false ) ) ;


    } ;


    // 設定 _ 目前所點選寵物資訊 : 服務類型、服務單 id
    useEffect( ( ) => {

       if( service_type ){

           let service_Id = '' ;

           if( service_type === '基礎' ){ service_Id = data['basic_id'] ;   } ;
           if( service_type === '洗澡' ){ service_Id = data['bath_id'] ;    } ;
           if( service_type === '美容' ){ service_Id = data['beauty_id'] ;  } ;

           set_Current({  ...current ,
                                service_Type : service_type ,
                                service_Id   : service_Id ,
                             }) ;

       }

    } ,[ service_type ] ) ;


    // 計數 : 到店等候中、到店美容中
    useEffect(( ) => {

        const wait_Basic      = pets_Wait.filter( x => x['service_type'] === '基礎' ).length ;
        const wait_Bath       = pets_Wait.filter( x => x['service_type'] === '洗澡' ).length ;
        const wait_Beauty     = pets_Wait.filter( x => x['service_type'] === '美容' ).length ;

        const progress_Basic  = pets_Beauty.filter( x => x['service_type'] === '基礎' ).length ;
        const progress_Bath   = pets_Beauty.filter( x => x['service_type'] === '洗澡' ).length ;
        const progress_Beauty = pets_Beauty.filter( x => x['service_type'] === '美容' ).length ;

        set_Count({ ...count ,
                            wait_Basic      : wait_Basic ,
                            wait_Bath       : wait_Bath ,
                            wait_Beauty     : wait_Beauty ,

                            progress_Basic  : progress_Basic ,
                            progress_Bath   : progress_Bath ,
                            progress_Beauty : progress_Beauty ,
                        })

    } , [ pet_Arr ]) ;


    const status = {
                      marginBottom   : "0px" ,
                      display        : "flex" ,
                      justifyContent : "center" ,
                      left           : "13px"
                   } ;
    const left_Card = { height : "40vh" , overflow : "auto" , left : "13px" } ;
    const rS        = { width:"100%", marginBottom : "10px" , position:"relative" ,  justifyContent : "left" } as any ;


   return <>
       
               { /* 到店等候中  */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   到店等候中   </span>
                   <span className="tag is-medium is-link is-light f_11" >
                       基礎 &nbsp;<b> { count['wait_Basic'] }  </b>&nbsp;
                       洗澡 &nbsp;<b> { count['wait_Bath'] }   </b>&nbsp;
                       美容 &nbsp;<b> { count['wait_Beauty'] } </b>
                   </span>
               </div>

               <div className="card p_10 has-text-centered" style={ left_Card } >

                  { 

                     pets_Wait.map( ( x , y ) => {

                        try{

                            const pet     = x['pet'] ;
                            const {color} = get_ServiceType( x['service_type'] , true ) ;  // 取得樣式

                            return  <b className = { color } key = {y} style = {rS}  onClick = { () => click_Pet(x) } >
                                          Q{x['q_code']} &nbsp; { string_Short( pet['name'] ) } ( { string_Short( pet['species'] )  } )
                                          <b className = "tag is-rounded is-white absolute" style={{right: "10px"}}> {x['expected_leave']} </b>
                                    </b>

                        }catch( e ){

                            console.log( `資料錯誤 : 「到店等候中」區塊 / 錯誤資料索引號 : ${ y }` )

                        }

                     })

                  }

                  

               </div>

               { /* 到店美容中 */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   到店美容中   </span>
                   <span className="tag is-medium is-link is-light f_11" >
                       基礎 &nbsp;<b> { count['progress_Basic'] }  </b> &nbsp;
                       洗澡 &nbsp;<b> { count['progress_Bath'] }   </b> &nbsp;
                       美容 &nbsp;<b> { count['progress_Beauty'] } </b>
                   </span>
               </div>

               <div className="card p_10" style={ left_Card } >

                   { 

                       pets_Beauty.map( ( x , y ) => {

                           try {

                               // # 設定 _ 點選後資料列加深樣式
                               let is_Light = true ;

                               // * 點選 _ '到店美容中' 資料列
                               is_Light     = ( in_Process === y ) ? false : true ;

                               // * 點選 _ '到店等候中' 資料列
                               let service_Id = '' ;
                               if( x['service_type'] === '基礎' ){ service_Id = x['basic_id'] ;   } ;
                               if( x['service_type'] === '洗澡' ){ service_Id = x['bath_id'] ;    } ;
                               if( x['service_type'] === '美容' ){ service_Id = x['beauty_id'] ;  } ;

                               if( current['service_Type'] && current['service_Id'] ){

                                   if( x['service_type'] === current['service_Type'] && service_Id === current['service_Id'] )
                                       is_Light = false ;

                               }

                             // ---------------------------------------

                               const pet = x['pet'];
                               const { color } = get_ServiceType( x['service_type'] , is_Light );  // 取得樣式


                               return <b className={color} key={y} style={rS} onClick={() => click_Pet(x, y)}>
                                         Q{ x['q_code'] } &nbsp;  { string_Short( pet['name'] ) } ( { string_Short( pet['species'] )  } )
                                         <b className="tag is-rounded is-white absolute" style = {{ right: "10px" }} > { x['expected_leave'] } </b>
                                      </b>

                           }catch(e){

                               console.log( `資料錯誤 : 「到店美容中」區塊 / 錯誤資料索引號 : ${ y }` )

                           }

                       })

                   }

                  

               </div>

          </>

} ;


export default Left_Cards