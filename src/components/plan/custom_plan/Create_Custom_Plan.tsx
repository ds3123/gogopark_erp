
import { useEffect, useState } from "react"

import { useHistory } from "react-router-dom";

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form" ;

// 表單驗證
import { yupResolver } from "@hookform/resolvers/yup" ;

// Interface
import { schema_Plan_Type } from "utils/validator/form_validator" ;
import { ICustom_Plan } from "utils/Interface_Type" ;
import { useDispatch, useSelector } from "react-redux";
import { verify_Self_Pricing_Plan , create_Custom_Plan } from "store/actions/action_Plan"
import Custom_Plan_Form from "components/plan/custom_plan/Custom_Plan_Form" ;

import { useRead_All_Species_With_Service_Prices } from "hooks/ajax_crud/useAjax_Read"

import { set_Current_Custom_Bath_Num , set_Current_Custom_Beauty_Num , set_Current_Custom_DefaultPrice , 
  set_Current_Custom_SpeciesPrice , set_Show_Applied_Species , set_Plan_Applied_Species } from "store/actions/action_Plan"





// @ 新增 _ 自訂方案
const Create_Custom_Plan = () => {

    const dispatch             = useDispatch() ;
    const history              = useHistory() ;
  
    const bath_Num             = useSelector( ( state : any ) => state.Plan.current_Custom_Bath_Num ) ;     // 洗澡次數 
    const beauty_Num           = useSelector( ( state : any ) => state.Plan.current_Custom_Beauty_Num ) ;   // 美容次數
    const plan_Price           = useSelector( ( state : any ) => state.Plan.current_Custom_DefaultPrice ) ; // 方案預設價格

    const price_Method         = useSelector( ( state : any ) => state.Plan.current_Custom_Price_Method ) ; // 計價方法
  
    const plan_Applied_Species = useSelector( ( state : any ) => state.Plan.plan_Applied_Species ) ;        // 方案所套用的寵物品種 


     // 取得 _ 所有品種資料 ( species 資料表 )
     const all_Species_Data    = useRead_All_Species_With_Service_Prices() ;


    // 方案目前所套用的寵物品種
    const [ current_Applied_Species , set_Current_Applied_Species ] = useState( '' ) ;


    // React Hook Form
    const { register , setValue , handleSubmit , formState : { errors , isValid } } =
                    useForm< ICustom_Plan >({
                                              mode     : "all" ,
                                              resolver : yupResolver( schema_Plan_Type ) ,
                                            }) ;       


    // 提交資料                                 
    const onSubmit : SubmitHandler< ICustom_Plan > = ( data : any ) => { 

      let bath_Prices    = "" ;
      let beauty_Prices  = "" ;

      if( price_Method === "自行計算" ){  // 是否有必要 ??

         const obj_Arr : any = verify_Self_Pricing_Plan( bath_Num , beauty_Num , plan_Price , data  ) ;

         if( obj_Arr ){
           bath_Prices   = obj_Arr['bathArr'] ? obj_Arr['bathArr'].join(',')  : "" ;
           beauty_Prices = obj_Arr['bathArr'] ? obj_Arr['beautyArr'].join(',') : "" ;
         }else{
           return false
         }
        
      }


      if( plan_Applied_Species.length === 0 ){
         alert("方案未套用任何品種") ;
         return false
      }


       // 新增 Post 物件
       const obj = {

          plan_name            : data['plan_Type_Name'] ,

          bath_num             : data['plan_Type_Bath_Num'] ,
          beauty_num           : data['plan_Type_Beauty_Num'] ,

          plan_period          : data['plan_Type_Period'] ,
          default_price        : data['plan_Type_Price'] ,
          plan_note            : data['plan_Type_Note'] ,

          single_price_method  : price_Method ,

          average_price        : price_Method === '平均計算' ? Math.round(  plan_Price / ( bath_Num + beauty_Num ) ) : null , // 平均價格 
          self_bath_prices     : price_Method === '自行計算' ? bath_Prices   : null , // 自行訂價 : 洗澡
          self_beauty_prices   : price_Method === '自行計算' ? beauty_Prices : null , // 自行訂價 : 美容 

          plan_applied_species : current_Applied_Species  // 方案目前所套用的品種     

       }

       // 新增 _ 自訂方案  
       dispatch( create_Custom_Plan( obj , history ) ) ;

      
    }

    
    { /* 屬性 for 元件 : <Plan_Price_Method /> */ }
    const form_Props = {

      setValue  : setValue ,
      register  : register ,
      errors    : errors  , 
      isValid   : isValid , 

      edit_Type : "新增" ,

    }



    // 設回 : 預設值
    useEffect( () => { 

        dispatch( set_Current_Custom_Bath_Num( 0 ) ) ;             // 洗澡次數     
        dispatch( set_Current_Custom_Beauty_Num( 0 )  ) ;          // 美容次數
        dispatch( set_Current_Custom_DefaultPrice( 0 )  ) ;        // 預設價格
        dispatch( set_Current_Custom_SpeciesPrice( 0 ) ) ;         // 品種價格

        dispatch( set_Show_Applied_Species( false ) ) ;            // 是否顯示 : 套用寵物品種列表 
        dispatch( set_Plan_Applied_Species( all_Species_Data ) ) ; // 預設選取 _ 所有套用品種資料
            
      
    } , [ all_Species_Data ] ) ;



    // 設定 _ 方案所套用品種的序號 ( pet_species 資料表 serial 欄位  )
    useEffect( () => { 

      const applied_Species_Serials = plan_Applied_Species.map( ( x : any ) => x['serial'] ) ;
    
      set_Current_Applied_Species( applied_Species_Serials.join(',') )

    
    } , [ plan_Applied_Species ] ) ;


   return  <form onSubmit = { handleSubmit( onSubmit ) } >

              <Custom_Plan_Form { ...form_Props } />  <br/>

           </form>

} ;

export default Create_Custom_Plan
       