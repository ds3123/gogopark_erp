import { FC , useState , useEffect , useContext} from "react" ;
import Custom_Single_Price from "components/plan/custom_plan/components/Custom_Single_Price" ;
import { useDispatch, useSelector } from "react-redux";
import { set_Current_Custom_Price_Method } from "store/actions/action_Plan"


import { ModalContext } from "templates/panel/Modal" ;



type price_Method = {

    setValue     : any ;
    register     : any ;
    isValid      : boolean ;

    edit_Type    : string ;

}

// @ 個別消費計價方式 : 平均計算 & 自行計算
const Plan_Price_Method : FC< price_Method > = ( { setValue , register , isValid , edit_Type  } ) => {

    const dispatch         = useDispatch();

    const bath_Num         = useSelector( ( state : any ) => state.Plan.current_Custom_Bath_Num ) ;     // 洗澡次數 
    const beauty_Num       = useSelector( ( state : any ) => state.Plan.current_Custom_Beauty_Num ) ;   // 美容次數
    const plan_Price       = useSelector( ( state : any ) => state.Plan.current_Custom_DefaultPrice ) ; // 方案預設價格

    // 取得 Moal 傳遞過來的資料 ( for 【 編輯 】 )
    const value            = useContext( ModalContext ) as any ;                                        // 取得 context 值
    const species_Data     = value.data ;                                                               // 寵物資料 
   // const custom_Plan_Name = species_Data ? species_Data['current_Custom_Plan']['plan_Name'] : '' ;     // 自訂方案名稱 
   
    const custom_Plan_Name = ''




    // 所有 : 自訂方案
    const custom_Plans     = useSelector( ( state : any ) => state.Plan.custom_Plans ) ;

    // 計價方式
    const [ price_Method , set_price_Method ] = useState< "平均計算" | "自行計算" >( "平均計算" )

    // 點選 _ 計價方式
    const click_Price_Method = ( method : "平均計算" | "自行計算" ) => {

        set_price_Method( method ) ; 
        dispatch( set_Current_Custom_Price_Method( method ) ) ;

    } 


    // 設回 : 預設值 ( for【 新增 】 )
    useEffect( () => { 

        if( edit_Type === "新增" ) dispatch( set_Current_Custom_Price_Method( "平均計算" ) ) ;
        
    } , [] ) ;


     // 篩選 _ 目前自訂方案 ( for 【 編輯 】 )
     useEffect( () => { 
        
        if( custom_Plan_Name ){

          const c_Plan = custom_Plans.filter( ( x : any ) => x['plan_name'] === custom_Plan_Name )[0] ;
        

          set_price_Method(  c_Plan['single_price_method'] )
          click_Price_Method( c_Plan['single_price_method'] ) ; // 點選 _ 計價方式

        }

      } , [ ] ) ;


      { /* 屬性 for 元件 : <Custom_Single_Price /> */ }
      const prices_Props = {
  
        setValue  : setValue ,
        register  : register ,
        edit_Type : edit_Type

      }


    return  <div className="relative" style={{top:"-20px"}}>

                          
                <label className="label relative" style={{ fontSize : "1.3em" }} >
            
                    <i className = "fas fa-calculator"></i> &nbsp; 個別消費 _ 計價方式 : &nbsp;   

                    { edit_Type === "新增" && 

                        <>  
                            <b className = { `tag is-medium is-warning ${ price_Method === '平均計算' ? '' : 'is-light' } pointer m_Right_15` } 
                            onClick   = { () => click_Price_Method( "平均計算" ) } > 平均計算 ( 總次數 : { bath_Num + beauty_Num } ) 
                            </b>  

                            <b className = { `tag is-medium is-warning ${ price_Method === '自行計算' ? '' : 'is-light' } pointer`}             
                            onClick   = { () => click_Price_Method( "自行計算" ) } > 自行計算 ( 總次數 : { bath_Num + beauty_Num } )  
                            </b>  
                        </>

                    } 

                    { edit_Type === "編輯" && 

                    <>  
                       { 
                          price_Method === "平均計算" &&
                            <b className = { `tag is-medium is-warning ${ price_Method === '平均計算' ? '' : 'is-light' } pointer m_Right_15` } > 平均計算 ( 總次數 : { bath_Num + beauty_Num } ) </b>  
                       }

                       { 
                          price_Method === "自行計算" &&                  
                           <b className = { `tag is-medium is-warning ${ price_Method === '自行計算' ? '' : 'is-light' } pointer`} > 自行計算 ( 總次數 : { bath_Num + beauty_Num } ) </b>  

                      } 
                    </>

} 
                    

                </label> 

                <div className="columns is-multiline is-mobile relative"> 
                
                    { price_Method === "平均計算" &&

                        <div className="column is-12-desktop relative"> 
                            <span className="tag is-medium is-white f_14 m_Left_30"> 
                                每次消費金額 : &nbsp;<b className="fRed"> ${ Math.round(  plan_Price / ( bath_Num + beauty_Num ) ) } </b>  
                            </span>  
                        </div>
                        
                    }  

                    { price_Method === "自行計算" &&  <Custom_Single_Price { ...prices_Props }  /> }
            
                </div>

                { /* 提交鈕 */ }   
                <div className="has-text-centered"  >
                    <button disabled = { !isValid } type="submit" className="button is-primary relative is-medium" > 
                        { edit_Type === "新增" ? "新增" : "編輯" }包月方案 
                    </button>
                </div>

            </div>   

} ;

export default Plan_Price_Method
       

