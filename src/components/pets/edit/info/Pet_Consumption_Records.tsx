
import { useEffect , useState , FC } from "react"
import axios from "utils/axios";
import Pet_Service_Card from "templates/card/Pet_Service_Card"
import Service_Info_Tab from "templates/tab/Service_Info_Tab"


type pet_Records = { 
    pet_Data : any ;  // 寵物資料 
}
  
type sType = 'basics' | 'bathes' | 'beauties' | 'cares' | 'lodges' | 'plans' ;



// @ 寵物所有服務紀錄 ( for 列表點選 _ 服務紀錄，右側滑動面板 )
const Pet_Consumption_Records : FC< pet_Records > = ( { pet_Data } ) => {



    // # 各類服務資料
    const [ basics , set_Basics ]     = useState([]) ; // 基礎
    const [ bathes , set_Bathes ]     = useState([]) ; // 洗澡
    const [ beauties , set_Beauties ] = useState([]) ; // 美容
    const [ cares , set_Cares ]       = useState([]) ; // 安親
    const [ lodges , set_Lodges ]     = useState([]) ; // 住宿
    const [ plans , set_Plans ]       = useState([]) ; // 方案

    // 依客戶身份證字號，取得 _ 各種服務資料
    const get_Service = ( service_Type : sType , pet_Serial : string ) => {

        axios.get( `/${ service_Type }/show_pet_records/${ pet_Serial }` ).then( res => {

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

        const pet_Serial = pet_Data['serial'] ;

        if( pet_Serial ){
            get_Service( 'basics' , pet_Serial ) ;
            get_Service( 'bathes' , pet_Serial ) ;
            get_Service( 'beauties' , pet_Serial ) ;
            get_Service( 'cares' , pet_Serial ) ;
            get_Service( 'lodges' , pet_Serial ) ;
            get_Service( 'plans' , pet_Serial ) ;
        }
  
    } , [ pet_Data['serial'] ] ) ;


    const col_2 = "column is-2-desktop" ; 
    const cols  = "columns is-multiline is-mobile" ;
    const color = { color:"rgba(0,0,0,.3)" } ;


    return <div style={{ position:"relative" , top:"20px" }}>

                <b className="tag is-large m_Bottom_40"> <i className="fas fa-dog"></i> &nbsp; { pet_Data['name'] } ( { pet_Data['species'] } ) </b>   

                {/* 
                    <label className="label m_Bottom_30"> 
                        <i className="far fa-calendar-alt m_Right_10"></i>
                        首次來店日 : <span className="m_Right_30" style={color}> </span> 
                        最後來店日 : <span style={color}>  </span>
                    </label> 
                */}

                { /* 服務類別標籤 */ }
                <div className={ cols }>
                    <Service_Info_Tab type='基礎' num={ basics.length }   />
                    <Service_Info_Tab type='洗澡' num={ bathes.length }   />
                    <Service_Info_Tab type='美容' num={ beauties.length } />
                    <Service_Info_Tab type='安親' num={ cares.length }    />
                    <Service_Info_Tab type='住宿' num={ lodges.length }   />
                    <Service_Info_Tab type='方案' num={ plans.length }    />
                </div>

                { /* 服務卡片 */ }
                <div className="columns is-multiline is-mobile m_Bottom_100">

                    { /* 基礎 */ }
                    <div className={ col_2 }>
                        {  basics.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 洗澡 */ }
                    <div className={ col_2 }>
                        {  bathes.map( ( x , y
                             ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 美容 */ }
                    <div className={ col_2 }>
                        {  beauties.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 安親 */ }
                    <div className={ col_2 }>
                        {  cares.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 住宿 */ }
                    <div className={ col_2 }>
                        {  lodges.map( ( x , y ) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                    { /* 方案 */ }
                    <div className={ col_2 }>
                        {  plans.map( ( x , y) => <Pet_Service_Card key={y} data={x} pet={ x['pet'] } type='寵物' /> )  }
                    </div>

                </div>

           </div>

} ;


export default Pet_Consumption_Records
       