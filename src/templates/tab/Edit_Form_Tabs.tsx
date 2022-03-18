
import { useState , FC , useEffect , useContext  } from "react" ;
import { ReachHookFormContext } from "containers/Create_Data_Container"
import { useDispatch , useSelector } from "react-redux";
import { set_Current_Create_Tab } from "store/actions/action_Service"
import { set_Side_Info } from "store/actions/action_Global_Layout"
import { set_All_States_To_Default } from "store/actions/action_Global_Setting"
import { set_Is_Show_Section_Services } from "store/actions/action_Global_Layout"
import { set_Customer_Columns_Empty } from "store/actions/action_Customer"
import moment from "moment";

import {set_Info_Column} from "store/actions/action_Info";



interface ITabs {
    title : string ;
    style : string ;
    icon  : string ;
}

// 頁面選項
const tabsArr : ITabs[] = [
    { title : "客戶" , style : "pointer tag is-large is-warning" , icon : "fas fa-user" } ,
    { title : "寵物" , style : "pointer tag is-large is-warning" , icon : "fas fa-dog"  } ,
    { title : "基礎" , style : "pointer tag is-large is-success" , icon : "far fa-list-alt"  } ,
    { title : "洗澡" , style : "pointer tag is-large is-success" , icon : "fas fa-bath"  } ,
    { title : "美容" , style : "pointer tag is-large is-success" , icon : "fas fa-cut"  } ,
    { title : "安親" , style : "pointer tag is-large is-info"    , icon : "fas fa-id-card-alt"  } ,
    { title : "住宿" , style : "pointer tag is-large is-info"    , icon : "fas fa-home"  } ,
    { title : "其他" , style : "pointer tag is-large is-link"    , icon : "fas fa-donate"  } ,
    { title : "方案" , style : "pointer tag is-large is-danger"  , icon : "fas fa-file-alt"  } ,
    { title : "價格" , style : "pointer tag is-large is-danger"  , icon : "fas fa-dollar-sign"  } ,
    { title : "品種" , style : "pointer tag is-large is-danger"  , icon : "fas fa-cat"  } ,
    { title : "員工" , style : "pointer tag is-large is-primary"  , icon : "fas fa-user-circle"  } ,
    // { title : "權限" , style : "pointer tag is-large is-primary"  , icon : "fas fa-layer-group"  } ,
    // { title : "品牌" , style : "pointer tag is-large is-primary"  , icon : "fas fa-store"  } ,
] ;

const Edit_Form_Tabs : FC = ( ) => {

    const dispatch  = useDispatch();
    const today     = moment( new Date ).format( 'YYYY-MM-DD' ) ; // 今日
    const props_RHF = useContext( ReachHookFormContext ) ;        // 取得 context 值 : React Hook Form 屬性  

    // 分類標籤
    const [ current , set_Current ] = useState( '' ) ;            // 目前點選標籤


    // 點選 _ 標籤
    const click_Tab = ( title : string ) => {

        // 先將 service_Date 設回今天 ( 避免在其他地方設為之前日期，而出現 <Service_Info /> 中 "不能選擇 : 過去日期" Alert 警告 )
        dispatch( set_Info_Column( "service_Date" , today ) ) ;

        // 回復 _ Store 預設值
        dispatch( set_All_States_To_Default() ) ;

        // 回復、隱藏 : 新增表單區塊 ( Ex. 寵物、整體服務 )
        // dispatch( set_Is_Show_Sections( false ) ) ;   

        // 清空 _ 所有客戶欄位值
        dispatch( set_Customer_Columns_Empty( props_RHF.setValue ) ) ; 

        // 方案時，直接顯示整體服務區塊 ( 因為沒有寵物區塊觸發 )
        if( title === '方案' ) dispatch( set_Is_Show_Section_Services( true ) ) ; 
        
        // State
        set_Current( title ) ;

        // Redux
        dispatch( set_Current_Create_Tab( title ) ) ;  // 目前所點選頁籤
        dispatch( set_Side_Info(true ) ) ;             // 開啟左側資訊面板


    } ;

    // 初始先點選第一個頁籤：客戶
    useEffect(()=>{

        click_Tab( '客戶' )
  
    } , [ ] ) ;


    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    return <>

                <span> <i className="fas fa-plus-circle"></i> &nbsp;請選擇 : <b >新增資料類型</b>  </span> <br/><br/>

                <div className="columns is-multiline  is-mobile" >

                    <div className="column is-12-desktop">
                        {
                            tabsArr.map( ( tab , index )=>{

                                const _style = tab['title'] === current ? tab['style'] : tab['style'] + " is-light";

                                return <b key       = { index }
                                          className = { _style }
                                          style     = {{ marginBottom:"15px" , marginRight:"15px" }}
                                          onClick   = { () => click_Tab( tab['title']) }  >
                                          <i className={ tab['icon'] }></i> &nbsp; { tab['title'] }
                                       </b>

                            } )
                        }
                    </div>

                </div>

             { /*{ IsExisting_Customer ? <b> 舊客戶 </b> : <b> 新客戶 </b> }  &nbsp; &nbsp; &nbsp;*/}
             { /*{ IsExisting_Pet ? <b> 舊寵物 </b> : <b> 新寵物 </b> }    &nbsp; &nbsp; &nbsp;*/}

           </>

} ;


export default Edit_Form_Tabs ;