
import { useEffect }  from "react" ;
import Statistics_Rows from "components/index/components/Statistics_Rows"
import Status_Cards from "components/index/Status_Cards";
import useShopStatus_Sum from "hooks/data/useShopStatus_Sum";
import { useDispatch , useSelector } from "react-redux";
import moment from "moment";
import { get_Service_Records_By_Date } from "store/actions/action_Service"
import Customer_Confirm_Note from "./components/Customer_Confirm_Note";
import User_Info from "./components/User_Info";


const Index = () => {

    const dispatch = useDispatch() ;

    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector(( state : any ) => state.Index.is_Detail_Mode ) ;

    // 取得資料 : 服務、客戶、寵物 ( 並只顯示 "今日" 資料 )
    // const pet_Arr = useRead_Service_Cus_Pet().filter( x => x['service_date'] === today ) ;
    const pet_Arr = useSelector( ( state : any ) => state.Service.service_Records_By_Date ) ;
    
    // 到店個階段，基礎、洗澡、美容數量
    const numObj_1 = useShopStatus_Sum( "到店等候中"   , pet_Arr ) ;
    const numObj_2 = useShopStatus_Sum( "到店美容中"   , pet_Arr ) ;
    const numObj_3 = useShopStatus_Sum( "洗完等候中"   , pet_Arr ) ;
    const numObj_4 = useShopStatus_Sum( "已回家( 房 )" , pet_Arr ) ;


    // 每隔 3 秒，取得即時資料 ( 以使美容師資料與櫃台新增資料一致 )
    useEffect( () => { 

       let is_Mounted    = true ; 

       const today       = moment( new Date() ).format('YYYY-MM-DD') ;   // 今日

       const get_Records = setInterval( () => { 
           
                              if( is_Mounted ) dispatch( get_Service_Records_By_Date( today ) ) ;
                
                           } , 3000 )  
        
       return () => {

                      is_Mounted = false ;
                      
                      clearInterval( get_Records ) ;   // 元件掛載前，先清除 setInterval

                    } 

    } , [] ) ;
 

    const card = { padding : "5px" } ;


    return <div className="is-hidden-mobile">

                { /* 美容師請求櫃台確認訊息 */ }
                <Customer_Confirm_Note />

                { /*  今日值班人員  */ }
                <User_Info />

                { /* 今日來店、今日統計 */ }

                { is_Detail_Mode &&  <Statistics_Rows /> }


                {/* 今日服務 _ 各階段狀態  */}
                <div className="columns is-mobile is-multiline relative m_Top_100 m_Bottom_50" style={{ width:"110%" , left:"-4%" }}>

                    {/* 到店等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店等候中"  service_Sum = { numObj_1 } />
                    </div>

                    {/* 到店美容中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店美容中" service_Sum = { numObj_2 } />
                    </div>

                    {/* 洗完等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "洗完等候中" service_Sum = { numObj_3 } />
                    </div>

                    {/* 已回家( 房 )  */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "已回家( 房 )" service_Sum = { numObj_4 } />
                    </div>

                </div> 

           </div>

};

export default Index