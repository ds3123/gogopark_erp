
import { useState , useEffect } from "react";
import Lodge_Rows from "components/lodge/Lodge_Rows";
import Pagination from "utils/Pagination";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Care from 'components/lodge/care/Care';
import cookie from "react-cookies";
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Lodge_Calendar from "./edit/Lodge_Calendar";
import { useSearch_Bar } from "hooks/data/useSearch";
import Data_List_Sum from "templates/search/Data_List_Sum";
import SearchBar from "templates/search/SearchBar";
import Search_Type_Note from "templates/search/Search_Type_Note";
import Date_Period from "./components/Date_Period";
import moment from "moment";


const lodgeArr = [

    { title : "住 宿" , icon : "fas fa-home" } ,
    { title : "安 親" , icon : "fas fa-baby-carriage" } 

] ;


// 可搜尋關鍵字類型
const search_Types = [ "房型","房號","寵物名字","寵物品種","客戶姓名","客戶身分證字號","客戶手機號碼" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 客戶 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

     return source.filter( ( x : any ) => {

                // # 設置 _ 多種查詢條件
                let room_Type   = x['room_type'].match(new RegExp(searchKeyword, 'gi'));                // 房型
                let room_Number = x['room_number'].match(new RegExp(searchKeyword, 'gi'));              // 房號

                let pet_Name    = x['pet']['name'].match(new RegExp(searchKeyword, 'gi'));              // 寵物_名字
                let pet_Species = x['pet']['species'].match(new RegExp(searchKeyword, 'gi'));           // 寵物_品種

                let cus_Name    = x['customer']['name'].match(new RegExp(searchKeyword, 'gi'));         // 客戶_姓名
                let cus_Id      = x['customer']['id'].match(new RegExp(searchKeyword, 'gi'));           // 客戶_身分證號
                let cus_Mobile  = x['customer']['mobile_phone'].match(new RegExp(searchKeyword, 'gi')); // 客戶_手機號碼
    

                return !!room_Type || !!room_Number || !!pet_Name || !!pet_Species || !!cus_Name || !!cus_Id || !!cus_Mobile ;
   
            })
  
} ;


/* @ 住宿頁面 ( 住宿資料、安親資料 ) */
const Lodge = () => {

    const dispatch = useDispatch() ;


    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;

    // 住宿頁資料 _ 是否下載中 ( 再修改為 住宿 2021.08.12 )
    const Lodge_isLoading = useSelector( ( state:any ) => state.Lodge.Lodge_isLoading ) ;

    // 取得 _ 分頁資料 ( 再修改為 住宿 2021.08.12  )
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/lodges/show_with_cus_relative_pet/0" , 'lodge' ) ;

    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( lodgeArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;

    // 點選 _ 檢視住宿情形
    const click_Check_Lodge_Calendar = () => {

        dispatch( set_Modal( true , <Lodge_Calendar /> , { data : null , modal_Style : { height:"150vh" ,width : "80%" , left : "10%"   , bottom : "0px"  } } )) ;

    } ;


    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data , dataSum } = useSearch_Bar( filteredItems , filter_Data , searchKeyword ) ;


    // -------------------------------------------------


    // 二次篩選資料( 加入住房期間 )
    const [ fData , set_fData ] = useState( [] ) ;

    // 是否顯示 _ 所有資料
    const [ is_Show_All_Data , set_Is_Show_All_Data ] = useState( true ) ; 
    

    const today = moment( new Date ).format('YYYY-MM-DD') ;                                  // 今日

    const [ check_In_Date , set_Check_In_Date ]   = useState( today ) ;                      // 住房日期
    const [ check_Out_Date , set_Check_Out_Date ] = useState( today ) ;                      // 退房日期

    const get_Check_In_Date  = ( checke_In : string ) => set_Check_In_Date( checke_In ) ;    // 取得 _ 住房日期
    const get_Check_Out_Date = ( checke_Out : string ) => set_Check_Out_Date( checke_Out ) ; // 取得 _ 退房日期

    const click_Data_Type    = () => set_Is_Show_All_Data( !is_Show_All_Data ) ;             // 點選 _ 所有資料 / 住房期間


    // 是否加入 _ 住房期間篩選條件
    useEffect( () => { 

        // 依照住房日期篩選   
        const fDate = data.filter( ( x : any ) => x['start_date'] >= check_In_Date && x['end_date'] <= check_Out_Date ) ;    
        
        // 判斷採取
        const _data = is_Show_All_Data ? data : fDate ; 

        set_fData( _data ) ;
  
    } , [ is_Show_All_Data , check_In_Date , check_Out_Date , data ] ) ; 


    // 【 新增、封存 】 "安親" 後，藉由 cookie，重導向、點選 _ 安親頁籤
    useEffect( () => {

        // Cookie
        const create  = cookie.load('after_Created_Care') ;
        const archive = cookie.load('after_Archive_Care') ;

        // * 點選 _ 安親頁籤
        if( ( create && create === '住宿_安親' ) || ( archive && archive === '住宿_安親' ) ){
            click_Second( '安 親' ) ;
        }
 
    } , [] ) ;


    const cS = { top:"40px" , right:"-20px" } ;

    return <>

                { currentSecond === '住 宿' && 

                   <b className="tag is-medium is-link is-light pointer absolute" style={cS} onClick={ click_Check_Lodge_Calendar }> 
                      <i className="far fa-calendar-alt"></i> &nbsp; 檢視住宿 
                   </b> 

                }


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


                <br/><br/><br/><br/>


                { /* 搜尋區塊*/ }   
                { currentSecond === '住 宿' &&    

                    <div className="columns is-multiline is-variable is-12 m_Bottom_50">

                       
                        { /* 所有資料 / 住房、退房日期  */ }
                        <div className="column is-offset-3 is-4-desktop">

                            <div className="relative" style={{ top:"-32px" }}> 

                                <div className="m_Bottom_5" >

                                    <b className = { `tag is-medium  pointer ${ is_Show_All_Data ? 'is-primary' : '' }` } 
                                        onClick  = { click_Data_Type } > 
                                        所有資料 
                                    </b>   

                                    &nbsp; &nbsp; &nbsp;  

                                    <b className = { `tag is-medium m_Left_15 m_Bottom_5 pointer ${ !is_Show_All_Data ? 'is-primary' : '' }` } 
                                       onClick  = { click_Data_Type } > 
                                       住房期間
                                    </b>     

                               </div>  

                               { !is_Show_All_Data && <Date_Period get_Check_In_Date = { get_Check_In_Date } get_Check_Out_Date = { get_Check_Out_Date } />  }   

                            </div>
    
                        </div>
                    
                        { /* 關鍵字搜尋  */ }
                        <div className="column is-5-desktop">

                            { /* 可搜尋類型提示 */ }  
                            <Search_Type_Note search_Types={ search_Types } />

                            { /* 搜尋欄位 */ }
                            <SearchBar get_Search_Text={ get_Search_Text } /> 

                        </div>
                    
                    </div>   

                }         

               { /* 住宿資料 */ }
               { currentSecond === lodgeArr[0].title &&

                    <>
                            
                        { /* 資料筆數 */ } 
                        <Data_List_Sum data_Sum={ fData.length } />       

                        <table className="table is-fullwidth is-hoverable relative" style={{ width:"116%" , left:"-8%" }}>

                            <thead>

                                <tr>

                                    <th> 寵物資訊 </th>
                                    <th> 客戶姓名 </th>
                                    <th> 房號 ( 房型 ) </th>
                                    <th> <span className="fDblue" >入住</span> : 日期 / 時間 </th>
                                    <th> <span className="fDblue" >退房</span> : 日期 / 時間 </th>
                                    <th> 總天數   </th>
                                    <th> 住宿價 </th>
                                    <th> 個體調整 </th>
                                    <th> 接送費   </th>
                                    <th> 應 收    </th>
                                    <th> 實 收    </th>
                                    <th> 封 存    </th>

                                </tr>

                            </thead>

                            <tbody>

                                { Lodge_isLoading ||

                                    pageOfItems.map( ( item : any , index ) => {

                                        return <Lodge_Rows key={ index } data={ item } /> ;

                                    })

                                }

                            </tbody>

                        </table>

                        { /* 下載圖示  */ }
                        { Lodge_isLoading &&

                            <div className="has-text-centered" >
                                <br/><br/><br/><br/><br/><br/>
                                <button className="button is-loading is-white"></button>
                            </div>

                        }

                        { /* 分頁按鈕 */ }
                        <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                            <Pagination items={ fData ? fData : [] } onChangePage={ click_Pagination } />
                        </div>

                    </>

                }


               { /* 安親資料 */ }
               { currentSecond === lodgeArr[1].title &&  <Care />  }


           </>

};

export default Lodge ;
