


import { useState , useEffect } from "react" ;
import axios from "utils/axios";


// 藉由名稱，查詢方案 ( 回傳 : Boolean )
export const usePlan_isExisting = () => {

   const [ is_Plan_Name_Existing , set_Is_Plan_Existing ] = useState< boolean | null >( null ) ;

   const get_Plan_By_Name = ( plan_Name : string ) => {

      if( plan_Name ){

        axios.get( `/custom_plans/show_by_plan_name/${ plan_Name }` ).then( res => {

            set_Is_Plan_Existing( res.data.length > 0 ? true : false )

        }) ;

      }
   
   } ;

   const set_Is_Plan_Name_Existing = ( is_Exist : boolean | null  ) => set_Is_Plan_Existing( is_Exist ) ;

   return { is_Plan_Name_Existing , set_Is_Plan_Name_Existing , get_Plan_By_Name }

} ;


// 藉由名稱，查詢 : 自訂方案 ( 資料表 : custom_plans ) 
export const usePlan_Query_Custom_Plan_By_Name = (  ) => {

    
    const [ custom_Plan , set_Custom_Plan ] = useState<any>( {} )

    const get_Custom_Plan_By_Name = ( plan_Name : string ) => {

      if( plan_Name ){

        axios.get( `/custom_plans/show_by_plan_name/${ plan_Name }` ).then( res => {

            set_Custom_Plan( res.data[0] )
          
        }) ;

      }  

    } ;


    return { custom_Plan , get_Custom_Plan_By_Name }

} ;


// 取得 _ 所有 : 自訂方案 ( 資料表 : custom_plans ) 
export const useGet_All_Custom_Plans =  () => {

    const [ custom_Plans , set_Custom_Plans ] = useState( [] ) ;

    useEffect( () => { 
            
       axios.get( "/custom_plans" ).then( res => { 

          // 排序 
          const data = res.data.sort( ( a : any , b : any ) : any => a['created_at'] < b['created_at'] ? 1 : -1 ) ;

          set_Custom_Plans( data ) ;
      
       })
    
    } , [] ) ;


    return custom_Plans 

} ;



