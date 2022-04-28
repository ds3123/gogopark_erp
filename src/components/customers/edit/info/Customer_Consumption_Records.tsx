import { useEffect , useState  } from "react"
import axios from "utils/axios";
import Pet_Service_Card from "templates/card/Pet_Service_Card"
import Service_Info_Tab from "templates/tab/Service_Info_Tab"


type cus_Records = {
  customer_Id : string | undefined ; // 客戶身分證字號
}

type sType = 'basics' | 'bathes' | 'beauties' | 'cares' | 'lodges' | 'plans' ;



// @ 客戶所有消費紀錄 ( for 列表點選 _ 消費歷史，右側滑動面板 )
const Customer_Consumption_Records = ( { customer_Id } : cus_Records ) => {

    // # 各類服務資料
    const [ basics , set_Basics ]     = useState([]) ; // 基礎
    const [ bathes , set_Bathes ]     = useState([]) ; // 洗澡
    const [ beauties , set_Beauties ] = useState([]) ; // 美容
    const [ cares , set_Cares ]       = useState([]) ; // 安親
    const [ lodges , set_Lodges ]     = useState([]) ; // 住宿
    const [ plans , set_Plans ]       = useState([]) ; // 方案


    // 依客戶身份證字號，取得 _ 各種服務資料
    const get_Service = ( service_Type : sType , customer_Id : string ) => {

          axios.get( `/${ service_Type }/show_customer_id/${ customer_Id }` ).then( res => {

              // # 排序資料
              const sData = res.data.sort(( a : any , b : any ) : any => a['created_at'] < b['created_at'] ? 1 : -1 ) ;

              if( service_Type === 'basics' )   set_Basics( sData ) ;
              if( service_Type === 'bathes' )   set_Bathes( sData ) ;
              if( service_Type === 'beauties' ) set_Beauties( sData ) ;
              if( service_Type === 'cares' )    set_Cares( sData ) ;
              if( service_Type === 'lodges' )   set_Lodges( sData ) ;
              if( service_Type === 'plans' )    set_Plans( sData ) ;

          }) ;

    } ;



    // 依客戶身份證字號，取得 _ 服務資料
    useEffect( () => {

      if( customer_Id ){
          get_Service( 'basics' , customer_Id ) ;
          get_Service( 'bathes' , customer_Id ) ;
          get_Service( 'beauties' , customer_Id ) ;
          get_Service( 'cares' , customer_Id ) ;
          get_Service( 'lodges' , customer_Id ) ;
          get_Service( 'plans' , customer_Id ) ;
      }

    } , [ customer_Id ] ) ;
    

    const col_2 = "column is-2-desktop" ; 
    const cols  = "columns is-multiline is-mobile" ;
    const color = { color:"rgba(0,0,0,.3)" } ;

   return <div style={{ position:"relative" , top:"20px" }}>

            <label className="label m_Bottom_30"> 
                <i className="far fa-calendar-alt m_Right_10"></i>
                首次來店日 : <span className="m_Right_30" style={color}>  </span> 
                最後來店日 : <span style={color}>  </span>
            </label> 

            { /* 服務類別標籤 */ }
            <div className={ cols }>
                <Service_Info_Tab type='基礎' num = { basics.length } />
                <Service_Info_Tab type='洗澡' num = { bathes.length } />
                <Service_Info_Tab type='美容' num = { beauties.length } />
                <Service_Info_Tab type='安親' num = { cares.length } />
                <Service_Info_Tab type='住宿' num = { lodges.length } />
                <Service_Info_Tab type='方案' num = { plans.length } />
            </div>

            { /* 服務卡片 */ }
            <div className="columns is-multiline is-mobile m_Bottom_100">

               { /* 基礎 */ }
               <div className={ col_2 }>
                 {  basics.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
               </div>

               { /* 洗澡 */ }
               <div className={ col_2 }>
                 {  bathes.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
               </div>

               { /* 美容 */ }
               <div className={ col_2 }>
                 {  beauties.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
               </div>

                { /* 安親 */ }
                <div className={ col_2 }>
                  {  cares.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
                </div>

                { /* 住宿 */ }
                <div className={ col_2 }>
                  {  lodges.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
                </div>

                { /* 方案 */ }
                <div className={ col_2 }>
                  {  plans.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='客戶' /> )  }
                </div>

            </div>

          </div>

} ;

export default Customer_Consumption_Records