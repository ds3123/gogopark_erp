import React , { useState , useEffect } from "react" ;
import {useDispatch, useSelector} from "react-redux";
import useBath_Time_Button from "hooks/layout/useBath_Time_Button";
import axios from "utils/axios"
import { set_Existing_Time_Records } from 'store/actions/action_Beautician'
import { time_Interval_Minutes } from 'utils/time/time'
import {toast} from "react-toastify";



/* 洗澡紀錄_點選按鈕 */
const Bath_Time_Records = () => {

    const dispatch = useDispatch();


    // 目前所點選寵物
    const data     = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;



    // 目前左側所點選 _ 寵物資訊
    const current_Service    = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;

    const [ current_Service_Id , set_Current_Service_Id ]             = useState('') ;

    const [ current_Existing_Records , set_Current_Existing_Records ] = useState<any[]>( [] ) ;

    const [ time_Status , set_Time_Status ] = useState({ 
        
                                                                    // 前置作業
                                                                    pre_Start   : false  ,
                                                                    pre_End     : false ,
                                                            
                                                                    // 基礎 / 小美容
                                                                    basic_Start : false ,
                                                                    basic_End   : false ,
                                                            
                                                                    // # 洗澡 --------------------------
                                                            
                                                                    // 第一次洗澡
                                                                    bath_1_Start : false ,
                                                                    bath_1_End   : false ,
                                                            
                                                                    // 第二次洗澡
                                                                    bath_2_Start : false ,
                                                                    bath_2_End   : false ,
                                                            
                                                                    // 第一次浸泡
                                                                    bath_3_Start : false ,
                                                                    bath_3_End   : false ,
                                                            
                                                                    // 第三次洗澡
                                                                    bath_4_Start : false ,
                                                                    bath_4_End   : false ,
                                                            
                                                                    // 第二次浸泡
                                                                    bath_5_Start : false ,
                                                                    bath_5_End   : false ,
                                                            
                                                                    // # 美容 --------------------------
                                                                    beauty_Start : false ,
                                                                    beauty_End   : false ,
                                                            
                                                                    // # 進烘箱 --------------------------
                                                                    dry_Start    : false ,
                                                                    dry_End      : false ,

                                                                  }) ;


    // 點選 _ 開始、結束時間 : 間格時間 ( 分 )
    const [ interval , set_Interval ] = useState({
                                                               // # 前置作業
                                                               pre    : 0 ,

                                                               // # 基礎
                                                               basic  : 0 ,

                                                               // # 洗澡
                                                               bath_1 : 0 ,
                                                               bath_2 : 0 ,
                                                               bath_3 : 0 ,
                                                               bath_4 : 0 ,
                                                               bath_5 : 0 ,

                                                               // # 美容
                                                               beauty : 0 ,

                                                               // # 烘乾
                                                               dry    : 0
                                                            }) ;


    // 洗澡按鈕上下拉選單
    const [ select , set_Select ] = useState({
                                                           bath_1 : '' ,
                                                           bath_2 : '' ,
                                                           bath_3 : '' ,
                                                           bath_4 : '' ,
                                                           bath_5 : '' ,
                                                           bath_6 : '' ,
                                                        }) ;


    // 前置作業
    const { time_Tag : pre_Start  , time : pre_Start_Time }      = useBath_Time_Button( 'pre_Start' ,true );
    const { time_Tag : pre_End    , time : pre_End_Time   }      = useBath_Time_Button( 'pre_End' );

    // 基礎 / 小美容
    const { time_Tag : basic_Start  , time : basic_Start_Time }  = useBath_Time_Button( 'basic_Start' );
    const { time_Tag : basic_End    , time : basic_End_Time }    = useBath_Time_Button( 'basic_End' );


    // # 洗澡 -------------------------------------------------

    // 第一次洗澡
    const { time_Tag : bath_1_Start , time : bath_1_Start_Time } = useBath_Time_Button( 'bath_1_Start' );
    const { time_Tag : bath_1_End   , time : bath_1_End_Time }   = useBath_Time_Button( 'bath_1_End' );

    // 第二次洗澡
    const { time_Tag : bath_2_Start , time : bath_2_Start_Time } = useBath_Time_Button( 'bath_2_Start' );
    const { time_Tag : bath_2_End   , time : bath_2_End_Time }   = useBath_Time_Button( 'bath_2_End' );

    // 第一次浸泡
    const { time_Tag : bath_3_Start , time : bath_3_Start_Time } = useBath_Time_Button( 'bath_3_Start' );
    const { time_Tag : bath_3_End   , time : bath_3_End_Time }   = useBath_Time_Button( 'bath_3_End' );

    // 第三次洗澡
    const { time_Tag : bath_4_Start , time : bath_4_Start_Time } = useBath_Time_Button( 'bath_4_Start' );
    const { time_Tag : bath_4_End   , time : bath_4_End_Time }   = useBath_Time_Button( 'bath_4_End' );

    // 第二次浸泡
    const { time_Tag : bath_5_Start , time : bath_5_Start_Time } = useBath_Time_Button( 'bath_5_Start' );
    const { time_Tag : bath_5_End   , time : bath_5_End_Time }   = useBath_Time_Button( 'bath_5_End' );

    // # 美容 ---------------------------
    const { time_Tag : beauty_Start , time : beauty_Start_Time } = useBath_Time_Button( 'beauty_Start' , true );
    const { time_Tag : beauty_End   , time : beauty_End_Time }   = useBath_Time_Button( 'beauty_End' );

    // # 進烘箱 --------------------------
    const { time_Tag : dry_Start    , time : dry_Start_Time }    = useBath_Time_Button( 'dry_Start' , true );
    const { time_Tag : dry_End      , time : dry_End_Time }      = useBath_Time_Button( 'dry_End'  );


    // ----------------------------------------------------------------------------------------------------

    // 取得 _ 服務單資料 ( for 取得最新資料，已更新洗澡下拉選單 )
    const get_Update_Select = ( service : string , id : string ) => {

        // 取得更新後的資料，並更新畫面
        axios.get( `${ service }/${ id }` ).then( res => {

            const service = res.data ;

            set_Select({ ...select ,
                        bath_1 : service['bath_1'] ? service['bath_1'] : '' ,
                        bath_2 : service['bath_2'] ? service['bath_2'] : '' ,
                        bath_3 : service['bath_3'] ? service['bath_3'] : '' ,
                        bath_4 : service['bath_4'] ? service['bath_4'] : '' ,
                        bath_5 : service['bath_5'] ? service['bath_5'] : '' ,
                        bath_6 : service['bath_6'] ? service['bath_6'] : '' ,
            })

        }) ;


    } ;




    // 下拉選單變動處理
    const handle_Select = ( e : any , type : string , id : string  ) => {

        const { name , value } = e.target ;

        let service_url = '' ;

        if( type === '基礎' ) service_url = '/basics' ;
        if( type === '洗澡' ) service_url = '/bathes' ;
        if( type === '美容' ) service_url = '/beauties' ;

        // 更新資料
        axios.put(`${ service_url }/${ id }` ,{ [ name ] : value } ).then( res => {

           // 更新成功通知
           toast(`🦄 已更新 : ${ type }單`, { position: "top-left", autoClose: 1500, hideProgressBar: false,});

           // 取得更新後的資料，並更新畫面
           get_Update_Select( service_url , id ) ;

        });


    } ;


     useEffect(( ) => {

         let service_Id : any  ;  // 服務單資料表 id

         switch( current_Service['service_type'] ){

             case '基礎' : service_Id = current_Service['basic_id']  ; break ;
             case '洗澡' : service_Id = current_Service['bath_id']   ; break ;
             case '美容' : service_Id = current_Service['beauty_id'] ; break ;

         }

         set_Current_Service_Id( service_Id ) ;


         // 取得 _ 該服務類型、服務單 id 下，已存在的時間記錄
         axios.get( `/time_records/show_by_type_id/${ current_Service['service_type'] }/${ service_Id.toString() }` ).then(res => {

            if( res.data.length > 0 ){
               set_Current_Existing_Records( res.data ) ;
               dispatch( set_Existing_Time_Records( res.data ) ) ;
            }else{
               set_Current_Existing_Records([] ) ;
               dispatch( set_Existing_Time_Records( [] ) ) ;
            }

         }) ;

     } ,[ current_Service ] ) ;


     // 尚未完成 ( 如何實現 _ "限制點選" 2021.07.12 )
     // 目前服務單，已點選時間紀錄
     useEffect(( ) => {

       if( current_Existing_Records.length > 0 ){

         const pre_Start = current_Existing_Records.filter(x => ( x['button_name'] === 'pre_Start' ) ).length ;
         const pre_End   = current_Existing_Records.filter(x => ( x['button_name'] === 'pre_End' ) ).length ;

         set_Time_Status(pre_Start > 0  ? { ...time_Status , pre_Start : true } : { ...time_Status , pre_Start : false }) ;

       }


     } ,[ ] ) ;


     useEffect( ( ) => {

        if( pre_Start_Time !== '00 : 00' && pre_End_Time !== '00 : 00' ) set_Interval({ ...interval , pre : time_Interval_Minutes( pre_Start_Time , pre_End_Time )  } )

     } ,[ pre_Start_Time , pre_End_Time ] ) ;


     // 設定 _ 洗澡下拉選單預設值
     useEffect( ( ) => {

         let service_Id  = '' ;  // 服務單 id
         let service_url = '' ;  // 服務單 url

         if( data['service_type'] === '基礎' ){ service_Id = data['basic_id'] ;  service_url = '/basics'  } ;
         if( data['service_type'] === '洗澡' ){ service_Id = data['bath_id'] ;   service_url = '/bathes'  } ;
         if( data['service_type'] === '美容' ){ service_Id = data['beauty_id'] ; service_url = '/beauties' } ;

         // 取得資料，並更新畫面
         get_Update_Select( service_url , service_Id ) ;


     } , [ data ] ) ;

    // ----------------------------------------------------------------------------------------------------

    const t_Center = { textAlign : "center" , marginBottom : "30px" } as any ;
    const p_Title  = {
                       width      : "100%" ,
                       position   : "absolute" ,
                       top        : "-60px" ,
                       left       : "0px" ,
                       fontWeight : "bold" ,
                       fontSize   : "13pt" ,
                     } as any ;



   return  <div className="columns is-multiline is-mobile relative" style={{ top : "10px" }} >

               {/*<span className="absolute" style={{top:"-60px",left:"30px"}}> 資料表 ID : { current_Service_Id } </span>*/}

               { /* 前置作業 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span style={ { color : "rgb(80,80,200)" } } > <br/> 前置作業 </span> </div>
                   { pre_Start }
                   { pre_End }
                   <br/><br/><br/>

                   <span className="absolute f_10" style={{top:"110px",left:"60px" , color:"rgba(0,0,0,.5)"}}> { interval['pre'] } mins </span> { /* 間隔時間 */ }

               </div>

               { /* 小美容 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span> <br/> 小美容 </span> </div>
                   { basic_Start }
                   { basic_End }
                   <br/><br/><br/>

               </div>

               { ( current_Service['service_type'] === '洗澡' || current_Service['service_type'] === '美容' ) &&

                 <>

                   { /* 第一次洗澡 */ }
                   <div className="column is-2-desktop relative" style={ t_Center } >

                       <div style = { p_Title } >

                           <div className="select is-small m_Bottom_5">
                               <select name="bath_1" value={ select['bath_1'] } className="fDred f_10"
                                       onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="第一道">第一道</option>
                                   <option value="伊斯特除蚤_皮膚">伊斯特除蚤_皮膚</option>
                                   <option value="貓咪">貓咪</option>
                                   <option value="自備">自備</option>
                               </select>
                           </div>

                           <br/>

                           第一次洗澡

                       </div>

                       { bath_1_Start }
                       { bath_1_End }

                   </div>

                   { /* 第二次洗澡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>

                          <div className="select is-small m_Bottom_5">
                             <select name="bath_2" value={ select['bath_2'] } className="fDred f_10"
                                     onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                <option value="請選擇">請選擇</option>
                                <option value="第一道">第一道</option>
                                <option value="伊斯特除蚤_皮膚">伊斯特除蚤_皮膚</option>
                                <option value="抗氧">抗氧</option>
                                <option value="白色">白色</option>
                                <option value="護色">護色</option>
                                <option value="澎毛">澎毛</option>
                                <option value="淡雅">淡雅</option>
                                <option value="貓咪">貓咪</option>
                                <option value="潤絲">潤絲</option>
                                <option value="自備">自備</option>
                             </select>
                          </div> <br/>

                          第二次洗澡

                       </div>

                       { bath_2_Start }
                       { bath_2_End }

                   </div>

                   { /* 第一次浸泡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>

                           <div className="select is-small m_Bottom_5">
                               <select name="bath_3" value={ select['bath_3'] } className="fDred f_10"
                                       onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="滴食鹽水">滴食鹽水</option>
                               </select>
                           </div> <br/>

                            第一次浸泡

                       </div>

                       { bath_3_Start }
                       { bath_3_End }

                   </div>

                   { /* 第三次洗澡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>

                           <div className="select is-small m_Bottom_5">

                               <select name="bath_4" value={ select['bath_4'] } className="fDred f_10"
                                       onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="第一道">第一道</option>
                                   <option value="伊斯特除蚤_皮膚">伊斯特除蚤_皮膚</option>
                                   <option value="白色">白色</option>
                                   <option value="護色">護色</option>
                                   <option value="澎毛">澎毛</option>
                                   <option value="貓咪">貓咪</option>
                                   <option value="潤絲">潤絲</option>
                                   <option value="自備">自備</option>
                               </select>

                           </div> <br/>

                           第三次洗澡

                       </div>

                       { bath_4_Start }
                       { bath_4_End }

                   </div>

                   { /* 第二次浸泡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>

                           <div className="select is-small m_Bottom_5">
                               <select name="bath_5" value={ select['bath_5'] } className="fDred f_10"
                                       onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="滴食鹽水">滴食鹽水</option>
                               </select>
                           </div> <br/>

                           第二次浸泡

                       </div>

                       { bath_5_Start }
                       { bath_5_End }

                   </div>

                   { /* 進烘箱 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select name="bath_6" value={ select['bath_6'] } className="fDred f_10"
                                       onChange = { e => handle_Select( e , current_Service['service_type'] , current_Service_Id ) } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="進烘箱">進烘箱</option>
                                   <option value="手吹">手吹</option>
                               </select>
                           </div> <br/>
                           進烘箱
                       </div>

                       { dry_Start }
                       { dry_End }

                   </div>

                 </>

                }

                { /* 大美容 */}
                { current_Service['service_type'] === '美容' &&

                   <div className="column is-2-desktop relative" style = {t_Center} >

                       <div style={p_Title} > <span > <br/>  大美容 </span> </div>

                       { beauty_Start }
                       { beauty_End   }

                       <br/><br/><br/>

                   </div>

               }

           </div>




} ;

export default Bath_Time_Records