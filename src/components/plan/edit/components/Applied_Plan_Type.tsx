import { useEffect } from "react" ;
import { useDispatch, useSelector} from "react-redux";
import { set_month_bath_price , set_month_beauty_price , set_current_plan_type , set_Self_Adjust_Amount , set_Service_Pickup_Fee , set_Custom_Plan_Basic_Price } from 'store/actions/action_Plan'
import { usePlan_Query_Custom_Plan_By_Name } from "hooks/data/usePlan"

import { useGet_All_Custom_Plans } from "hooks/data/usePlan"


type sType = {
    register    : any ;
    setValue    : any ;
    editType    : string | undefined ;
    serviceData : any ;
}


// @ 方案類型 ( 下拉選單 )
const Applied_Plan_Type = ( { register , setValue , editType , serviceData } : sType ) => {

     const dispatch          = useDispatch(); 
       
     const custom_Plans      = useGet_All_Custom_Plans();  // 取得 _ 所有 : 自訂方案

     const current_Plan_Name = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇 : 方案類型( 名稱 )

     const { custom_Plan , get_Custom_Plan_By_Name } = usePlan_Query_Custom_Plan_By_Name();      // 查詢 _ 自訂方案 ( 依 : 方案名稱 )   


     // 初始、回復 _ 各項數據
     const set_Back_To_Default = () => {
     
        setValue( 'plan_Pet_Species' , '請選擇' ) ;   
        setValue( 'plan_Apply_Pet' , '' ) ;   
        setValue( 'plan_Adjust_Amount' , '' ) ;   
        setValue( 'plan_Pickup_Fee' , '' ) ;   
       
        // # 費用
        dispatch( set_month_bath_price( 0 )   ) ;      // 預設方案 ( 包月洗澡 )
        dispatch( set_month_beauty_price( 0 ) ) ;      // 預設方案 ( 包月美容 )
        dispatch( set_Custom_Plan_Basic_Price( 0 ) ) ; // 自訂方案   

        dispatch( set_Self_Adjust_Amount( 0 ) ) ;      // 自訂增、減費用
        dispatch( set_Service_Pickup_Fee( 0 ) ) ;      // 接送費
     
     } ;

     
     // 變動處理 : 方案類型 ( 名稱 )
     const handle_Plan_Type_Change = ( type : string ) => {

        // 初始化 
        set_Back_To_Default() ;
       
        // 設定 _ 目前方案類型 ( 名稱 )
        dispatch( set_current_plan_type( type ) ) ;
       

    } ;


    useEffect( () => { 

      // 自訂方案 ( 先取得自訂方案資料 )
      if( current_Plan_Name !== '包月洗澡' && current_Plan_Name !== '包月美容' ) get_Custom_Plan_By_Name( current_Plan_Name ) ;

    } , [ current_Plan_Name ] ) ;


    // for【 自訂方案 】 設定 _ 基本價格 ( 依照以上 get_Custom_Plan_By_Name 取得資料設定 )
    useEffect( () => { 

       if( custom_Plan ) dispatch( set_Custom_Plan_Basic_Price( custom_Plan['default_price'] ) ) ; 
  
    } , [ custom_Plan ] ) ;
   

    const is_Edit = editType === '編輯' ;


   return  <div className="column is-3-desktop">

                { /* for 新增  */ }
                { is_Edit ||

                    <>

                        <p> <b> 方案類型 </b> </p>

                        <div className="select">

                            <select { ...register( "plan_Type" ) } onChange={ e => handle_Plan_Type_Change( e.target.value ) } >

                                <option value="請選擇">   請選擇    </option>
                                <option value="包月洗澡"> 包月洗澡  </option>
                                <option value="包月美容"> 包月美容  </option>
                                
                                { /* 自訂方案 */ } 
                                { custom_Plans.map( ( x : any , y : number ) => <option key={y} value={ x['plan_name'] } > { x['plan_name'] }  </option> ) }
                                
                            </select>

                        </div>

                    </>

                }
                
                
                { /* for 編輯 */ }
                { is_Edit &&  <div className="f_14"> 方案類型 : <b className="fDblue"> { serviceData.plan_type }  </b> </div>  }

          </div>

} ;


export default Applied_Plan_Type 
       