
import { useEffect , memo , useState } from "react" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useDispatch , useSelector} from "react-redux";
import Service_Error from "components/index/list/Service_Error";
import Appointment_Record from "components/index/list/Appointment_Record";

import { useRead_Service_Reservations } from "hooks/ajax_crud/useAjax_Read"
import moment from "moment";
import { get_Error_Delete_By_Date } from "store/actions/action_Error"

import useShopStatus_Sum from "hooks/data/useShopStatus_Sum";

import { set_Modal } from "store/actions/action_Global_Layout" ;
import Lodge_Calendar from "components/lodge/edit/Lodge_Calendar";

import axios from "utils/axios" ;



/* @ 今日預約、今日統計 */
const Statistics_Rows = () => {

    const dispatch = useDispatch() ;

    // 今日
    const today    = moment( new Date ).format( 'YYYY-MM-DD' ) ;


    // 取得資料 : 基礎、洗澡、美容 ，今日資料 ( 排除 : 安親、住宿 )
    const pet_Arr  = useSelector( ( state : any ) => state.Service.service_Records_By_Date ).filter( ( x:any ) => x['service_date'] === today ) ;


    // 服務完成數 
    const [ completed_Num , set_Completed_Num ]     = useState( 0 ) ;

    // 服務完成率
    const [ ratio_Completed , set_Ratio_Completed ] = useState<any>();



     // 已回家( 房 ) 情況下，應付金額 與 實付金額 不符合  
     const [ is_GoHome_UnPaid , set_Is_GoHome_UnPaid ] = useState( [] ) ;



    // 取得 _ 已完成服務
    const sConmpleted = useShopStatus_Sum( "已回家( 房 )" , pet_Arr ) ;


    // 特定日期資料數量 : 異常 + 銷單
    const error_Delete_By_Date_Num = useSelector( ( state : any ) => state.Error.error_Delete_By_Date ).length ;


    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector(( state : any ) => state.Index.is_Detail_Mode ) ;


    // 各類服務，今日預約次數
    const [ service_Num , set_Service_Num ] = useState({
                                                        'basic'  : 0 ,
                                                        'bath'   : 0 ,
                                                        'beauty' : 0 ,
                                                        'care'   : 0 ,
                                                        'lodge'  : 0 ,
                                                       }) ;


    // 取得 : 所有今日開始，所有【 預約 】資料
    const data = useRead_Service_Reservations( today ) ;

    // 顯示 _ 預約紀錄
    const click_Appointments_List = () => dispatch( set_Side_Panel( true , <Appointment_Record /> , {} ) ) ;

    // 顯示 _ 服務異常
    const click_Service_Error     = () => dispatch( set_Side_Panel( true , <Service_Error /> , {} ) ) ;

    
    // 點選 _ 檢視住宿情形
    const click_Check_Lodge_Calendar = () => {

        dispatch( set_Modal( true , <Lodge_Calendar /> , { data : null , modal_Style : { height:"150vh" , width : "80%" , left : "10%" , bottom : "0px" } } )) ;

    } ;



    // 依據 _ 特定查詢日期，篩選預約資料
    useEffect( () => {

        const data_Today = data.filter( x => x['service_date'] === today ) ;
        const num_Basic  = data_Today.filter( x => x['service_type'] === '基礎' ).length ;
        const num_Bath   = data_Today.filter( x => x['service_type'] === '洗澡' ).length ;
        const num_Beauty = data_Today.filter( x => x['service_type'] === '美容' ).length ;
       
        set_Service_Num({ ...service_Num ,
                            'basic'  : num_Basic ,
                            'bath'   : num_Bath ,
                            'beauty' : num_Beauty ,  
                        }) ;

    } , [ data ] ) ;


    useEffect( () => {

      // 查詢 _ 今日 : 異常 + 銷單 ( for 設定以上 error_Delete_By_Date_Num --> 再修改為使用 useHook 直接回傳該值 2022.02.12  )
      dispatch( get_Error_Delete_By_Date( today ) ) ;

    } , [] ) ;


    // 設定 _ 完成數、完成率
    useEffect( () => { 

      const sCompleted_Num = sConmpleted['basic_Num'] + sConmpleted['bath_Num'] + sConmpleted['beauty_Num'] ;
      const rCompleted     = Math.round( ( sCompleted_Num / pet_Arr.length ) * 100 ) ;

      set_Completed_Num( sCompleted_Num ) ;
      set_Ratio_Completed( rCompleted ) ;
        
    } , [ pet_Arr ] ) ;




    // 取得、篩選出 : 在 '已回家(房)' 情況下，'應付金額' 與 '實付金額' 不符合 ( 即 : 實付金額為 0，或僅付部分實付金額 ) --> for 加總 _ 服務異常   
    useEffect( () => { 
    
        axios.get( `services/show_services_is_gohome_by_date/${ today }` ).then( res => {
  
           const is_GoHome_Unpaid = res.data.filter( ( x : any ) => x['amount_payable'] !== x['amount_paid'] ) ;
  
           set_Is_GoHome_UnPaid( is_GoHome_Unpaid ) ;
         
        }) ;
      
    } , [] ) ;




    const cS = { top:"70px" , right:"-40px" } ;

    return <>

               <b className="tag is-medium is-link is-light pointer absolute" style={cS} onClick={ click_Check_Lodge_Calendar }> 
                   <i className="far fa-calendar-alt"></i> &nbsp; 檢視住宿 
               </b>  

               <div className="columns is-mobile  is-multiline relative" style={{ top:"10px" , left:"-5%" }} >

                  { /* 今日預約 */ }
                  <div className="column is-12-desktop">

                      <div className="tags has-addons" >

                          <b className= "tag is-large is-primary">
                              <i className="fas fa-phone"></i> &nbsp; 今日預約
                          </b>

                          <span className="tag is-large is-light">
                              基礎 : &nbsp; <b className='fDred'> { service_Num['basic'] }  </b> &nbsp;&nbsp;
                              洗澡 : &nbsp; <b className='fDred'> { service_Num['bath'] }   </b> &nbsp;&nbsp;
                              美容 : &nbsp; <b className='fDred'> { service_Num['beauty'] } </b> &nbsp;&nbsp;
                          </span>

                          <span className="tag is-primary is-large is-light pointer" onClick={ click_Appointments_List } >
                              <i className="fas fa-list"></i> &nbsp; 預約紀錄 &nbsp;
                              <b className="tag is-medium is-white relative" style={{ top:"4px" }}>
                                 洗澡 + 美容 &nbsp; : &nbsp;
                                 <span className='fRed f_14'> { service_Num['bath'] + service_Num['beauty'] } </span>
                              </b>
                          </span>

                      </div>

                  </div>

                  { /* 今日統計 */ }
                  <div className="column is-12-desktop">

                      <div className="tags has-addons" >

                          <b className= "tag is-large is-link" >
                              <i className="fas fa-calculator"></i> &nbsp; 
                              
                                今日統計 &nbsp;
                              
                               <b className="tag is-white relative f_12" style={{ borderRadius:"30px", top:"4px" }}>  
                                  預約 : { service_Num['basic'] + service_Num['bath'] + service_Num['beauty'] } &nbsp;  
                                  現場 : { pet_Arr.length - ( service_Num['basic'] + service_Num['bath'] + service_Num['beauty'] ) } 
                               </b>
                            
                          </b>

                          <span className="tag is-large is-light">

                              <i className="fas fa-list-alt"></i> &nbsp; 基礎&nbsp;<b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> { sConmpleted['basic_Num'] } </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <i className="fas fa-bath"></i> &nbsp; 洗澡&nbsp;<b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> { sConmpleted['bath_Num'] } </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <i className="fas fa-cut"></i> &nbsp; 美容&nbsp;<b>完</b> &nbsp;: &nbsp;
                              <b className='fDred'> { sConmpleted['beauty_Num'] }  </b> &nbsp; &nbsp;

                              <b className="tag is-white f_13 relative" style={{borderRadius:"20px" , top:"4px"}}> 
                                <i className="fas fa-tasks"></i> &nbsp;  
                                完成率 : &nbsp; <span className="fRed"> { ratio_Completed ? ratio_Completed : 0 } % </span> &nbsp; 
                                <span className="f_10"> ( { completed_Num } / { pet_Arr.length } ) </span>
                              </b> 

                          </span>

                          <span className="tag is-large is-light is-danger pointer" onClick={ click_Service_Error } >
                              <i className="fas fa-exclamation"></i> &nbsp; 服務異常 : &nbsp;
                              <b>  { error_Delete_By_Date_Num + ( is_GoHome_UnPaid.length ) } </b>
                          </span>

                      </div>

                  </div>

               </div>

         </>

} ;

export default memo( Statistics_Rows ) ;