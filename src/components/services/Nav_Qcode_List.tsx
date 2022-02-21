
import { useEffect , useState } from "react"

import Date_picker from "utils/time/Date_picker";
import { get_Week_Day , get_Date_Cal } from "utils/time/date";
import moment from "moment";
import { useDispatch , useSelector} from "react-redux";
import { useRead_Date_Services , useRead_After_Date_Services } from "hooks/ajax_crud/useAjax_Read";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { string_Short } from "utils/string/edit_string"
import Update_Service from "components/services/edit/Update_Service";
import Usage_Note from "templates/note/Usage_Note";


const note_Str = `此區塊僅顯示 : 「基礎」、「洗澡」、「美容」、「安親」，當日業務項目。`;



{ /* 導覽列 _ Q 碼列表 */}
const Nav_Qcode_List = ( ) => {

    const dispatch      = useDispatch();

    // 預設今日
    const _service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;

    // Data_Picker 查詢日期 : 預設今日
    let [ service_Date , set_Service_Date ] = useState( _service_Date );

    // 查詢期間 : 當天、隔天、後天 等 3 個日期 ( 星期 )
    let date_1    = moment( service_Date ).format( 'YYYY-MM-DD' ) ;
    let date_1_W  = get_Week_Day( date_1 ) ;

    let date_2    = moment( get_Date_Cal( date_1 , 1 ) ).format( 'YYYY-MM-DD' ) ;
    let date_2_W  = get_Week_Day( date_2 ) ;

    let date_3    = moment( get_Date_Cal( date_1 , 2 ) ).format( 'YYYY-MM-DD' ) ;
    let date_3_W  = get_Week_Day( date_3 ) ;

    let date_next = moment( get_Date_Cal( date_1 , 3 ) ).format( 'YYYY-MM-DD' ) ;
    let date_prev = moment( get_Date_Cal( date_1 , -3 ) ).format( 'YYYY-MM-DD' ) ;


    // 取得 _ 特定日期，服務單資料
    const date_Services_1  = useRead_Date_Services( date_1 ) ;
    const date_Services_2  = useRead_Date_Services( date_2 ) ;
    const date_Services_3  = useRead_Date_Services( date_3 ) ;

    // 排除住宿後，服務單資料
    const [ service_Data_1 , set_Service_Data_1 ] = useState( [] ) ;
    const [ service_Data_2 , set_Service_Data_2 ] = useState( [] ) ;
    const [ service_Data_3 , set_Service_Data_3 ] = useState( [] ) ;


    // 取得 _ 特定日期 【 之後 】，所有服務單資料
    const date_After_Services = useRead_After_Date_Services( date_3 ) ;


    // 下一個查詢期間
    const next = () => { set_Service_Date( date_next ); } ;

    // 上一個查詢期間
    const prev = () => { set_Service_Date( date_prev );  } ;

    // 點選 _ 資料單
    const show_Service = ( data : any ) => {

        dispatch( set_Side_Panel( true , <Update_Service /> ,
                                        { source_Page : 'Q_Code_List' , service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string }
                                 )) ;

    } ;

    // 生成 _ 預設 Qcode ( Q01 ~ Q60 )
    const set_Default_Arr = () => {

        const arr = [] ;

        for( let i=1 ; i<=60 ; i++ ){
            let num = ( i < 10 ) ? '0'+ i.toString() : i.toString() ;
            arr.push( num ) ;
        }

        return arr

    } ;

    // 設定 _ 服務標籤 : 內容
    const set_Tag_Service = ( date_Service : any[] , x : string ) => {

        let service : any = null ;

        // 為預設特 Q 碼，配上 服務內容
        date_Service.forEach( y => { if( y['q_code'] === x ){ service = y } }) ;

        return service

    } ;

    // 設定 _ 服務標籤 : icon、顏色
    const set_Tag_Style = ( service : { service_type : string } ) => {

        let style = { icon : '' , color : 'is-gray' } ;

        if( service && service['service_type'] === '基礎' ){
            style.icon  = 'fas fa-list-alt' ;
            style.color = 'is-warning' ;
        }

        if( service && service['service_type'] === '洗澡' ){
            style.icon  = 'fas fa-bath' ;
            style.color = 'is-success' ;
        }

        if( service && service['service_type'] === '美容' ){
            style.icon  = 'fas fa-cut' ;
            style.color = 'is-danger' ;
        }

        if( service && ( service['service_type'] === '一般安親' || service['service_type'] === '住宿_提早抵達' || service['service_type'] === '住宿_延後帶走' ) ){
            style.icon  = 'fas fa-baby-carriage' ;
            style.color = 'is-link' ;
        }

        return style ;

    } ;

    // 生成 _ Qcode 服務列表
    const set_Qcode_List = ( date_Service : any[] ) => {

       const arr = set_Default_Arr() ;

       return arr.map( ( x , i ) => {

                       const service = set_Tag_Service( date_Service , x ) ;  // 為預設特定 Q 碼，配上服務內容
                       const style   = set_Tag_Style( service ) ;             // 設定 _ 服務標籤 icon、顏色

                       let type      = '' ;
                       if( service && service['service_status'] === '已到店' ) type = '到店' ;
                       if( service && ( service['service_status'] === '預約_今天' || service['service_status'] === '預約_未來' ) ) type = '預約' ;


                       return <div className="title is-6" key={ i } >

                                   <b className="tag is-medium is-white pointer"> Q{ x } </b> &nbsp; &nbsp;

                                   { /* 服務標籤 */ }
                                   { ( service && service['service_type'] && service['pet'] ) &&

                                       <b className = { `tag relative is-medium is-light ${ style['color'] } pointer` } onClick={ () => show_Service( service ) } >

                                           <b className = "tag is-rounded absolute is-white fDblue" style={{top:"-12px" , left:"-20px"}}> { type } </b>  &nbsp; &nbsp;
                                           
                                           <i className = { style['icon'] }></i> &nbsp; { service['service_type'] } &nbsp;

                                           {  string_Short( service['pet']['name'] ) } ( { string_Short( service['pet']['species'] ) } )

                                       </b>

                                   }

                               </div> ;

              })

    } ;


    useEffect( ( ) => {

      // 設定 _ 特定查詢日期
      set_Service_Date( _service_Date ) ;

    } , [ _service_Date ] ) ;



    // 排除 _ 住宿
    useEffect( () => { 
    
        const filter_Date_Services_1 = date_Services_1.filter( ( x:any ) => ( x['service_status'] !== '當日住宿' && x['service_status'] !== '預約住宿' ) ) ;
        const filter_Date_Services_2 = date_Services_2.filter( ( x:any ) => ( x['service_status'] !== '當日住宿' && x['service_status'] !== '預約住宿' ) ) ;
        const filter_Date_Services_3 = date_Services_3.filter( ( x:any ) => ( x['service_status'] !== '當日住宿' && x['service_status'] !== '預約住宿' ) ) ;
    
        set_Service_Data_1( filter_Date_Services_1 ) ;
        set_Service_Data_2( filter_Date_Services_2 ) ;
        set_Service_Data_3( filter_Date_Services_3 ) ;

    } , [ date_Services_1 , date_Services_2 , date_Services_3 ] ) ;


    const black = { color : "black" } ;

   return <>

             
              { /* 日期、前後調整 */ }
              <div className="columns is-mobile is-multiline m_Top_30">

                  { /* 查詢日期 */ }
                  <div className="column is-8-desktop">

                      <div className="tag is-large is-white">
                          <b> 查詢日期 : </b> &nbsp; <Date_picker no_Past = { false } set_Service_Date = { set_Service_Date } />
                      </div>

                      { /* 此區塊說明 */ }  
                      <div className="m_Left_15 m_Top_10"> <Usage_Note note={ note_Str } />  </div>    

                  </div>
            
                  { /* 向前、向後 調整日期 */ }
                  <div className="column is-4-desktop">

                      <span className="m_Right_40 m_Top_30" style={{ float : "right" }}>

                          <span className="tag is-large is-success pointer m_Right_50" onClick={ () => prev() }> &lt; </span>
                          <span className="tag is-large is-success pointer relative" onClick={ () => next() }>
                               <b className="absolute f_11 " style={{ top:"-27px" , left:"-10px" , color:"gray" }}> 尚有 { date_After_Services.length } 筆 </b>
                              &gt;
                          </span>

                      </span>

                  </div>

              </div>


              { /* 3 個日期 Q 碼欄 ( Q1 ~ Q60 )  */ }
              <div className="columns is-mobile is-multiline m_Top_30 m_Bottom_100">

                  { /*  第 1 天 */ }
                  <div className="column is-4-desktop" >

                       <span className="tag is-large relative m_Bottom_30" style={black} >
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;
                           <b> { date_1 }&nbsp;( { date_1_W } ) &nbsp;
                              <span className="tag is-medium is-white is-rounded"> { service_Data_1.length } </span>
                           </b>
                       </span> 

                       { set_Qcode_List( service_Data_1 ) }

                  </div>

                  { /*  第 2 天 */ }
                  <div className="column is-4-desktop ">

                      <span className="tag is-large m_Bottom_30" style={black}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;
                          <b> { date_2 }&nbsp;( { date_2_W } ) &nbsp;
                             <span className="tag is-medium is-white is-rounded">  { service_Data_2.length } </span>
                          </b>
                      </span>   

                      { set_Qcode_List( service_Data_2 ) }

                  </div>

                  { /*  第 3 天 */ }
                  <div className="column is-4-desktop">

                      <span className="tag is-large m_Bottom_30" style={black}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;
                          <b> { date_3 }&nbsp;( { date_3_W } ) &nbsp;
                             <span className="tag is-medium is-white is-rounded"> { service_Data_3.length }  </span>
                          </b>
                      </span> 

                      { set_Qcode_List( service_Data_3 ) }

                  </div>

              </div>
        
          </>

} ;

export default Nav_Qcode_List