


import { useState , useEffect } from "react" 
import axios from "utils/axios"
import { sort_Data_By_CreatedDate } from 'utils/data/sort_data'



// 藉由名稱，查詢方案 ( 回傳 : Boolean )
export const usePlan_isExisting = () => {

   const [ is_Plan_Name_Existing , set_Is_Plan_Existing ] = useState( false ) ;

   const get_Plan_By_Name = ( plan_Name : string ) => {

      if( plan_Name ){

        axios.get( `/custom_plans/show_by_plan_name/${ plan_Name }` ).then( res => {

            set_Is_Plan_Existing( res.data.length > 0 ? true : false )

        }) ;

      }
   
   } ;

   const set_Is_Plan_Name_Existing = ( is_Exist : boolean  ) => set_Is_Plan_Existing( is_Exist ) ;

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


// 取得 _ 自訂方案的相關訊息 ( 依方案名稱  /  資料表 : custom_plans )
export const usePlan_Custom_Info = ( plan_Name : string ) => {

    const [ plan , set_Plan ] = useState( null ) ;


    useEffect( () => {

      if( plan_Name ){

          axios.get( `/custom_plans/show_by_plan_name/${ plan_Name }` ).then( res => {

              const custom_Plan = res.data[0] ; 

              set_Plan( custom_Plan ) ;

          }).catch( err => {

              console.log( `取得自訂方案錯誤 : ${ err }` )

          }) ;

      }

    } , [ plan_Name ] ) ;


    return plan 

  
} ;


// 取得 _ 特定日期( 到店日期 )，所有購買方案單
export const usePlan_Get_By_Date = ( date : string ) => {

  const [ plans , set_Plans ] = useState< any[] >( [] ) ;

  useEffect( () => {

      axios.get( `/plans/show_plans_by_date/${ date }` ).then( res => {

          // 排序 
          const data = sort_Data_By_CreatedDate( res.data , 'desc' ) ;

          set_Plans( data ) ;

      }).catch( err => {
  
          console.log( `資料錯誤 : ${ err }` ) ;
  
      }) ; 
    
  } , [ date ] ) ;

  return plans 

}


// 取得 _ 特定日期 ( 付款日期 )，所有購買方案單
export const usePlan_Get_By_Payment_Date = ( date : string ) => {

    const [ plans , set_Plans ] = useState< any[] >( [] ) ;
  
    useEffect( () => {
  
        axios.get( `/plans/show_plans_by_paymentdate/${ date }` ).then( res => {
  
            set_Plans( res.data ) ;
  
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [ date ] ) ;
  
    return plans 
  
  }


// 
export const usePlan_Bath_Beauty_Num = ( serviceData : any ) => {


    // 洗澡次數、美容次數
    const [ service_Num , set_Service_Num ] = useState({ 'bath' : 0 , 'beauty' : 0 }) ;


    useEffect( () => {
      
        const pType = serviceData['plan_type'] ;   // 方案類型
        const cPlan = serviceData['custom_plan'] ; // 自訂方案

        
        if( pType === '包月洗澡' ){

           set_Service_Num( { ...service_Num , 'bath' : 4  , 'beauty' : 0 } ) ; 

        }else if( pType === '包月美容' ){

           set_Service_Num( { ...service_Num , 'bath' : 3  , 'beauty' : 1 } ) ; 

        }else{  // 自訂方案

           if( cPlan ) set_Service_Num( { ...service_Num , 'bath' : cPlan['bath_num']  , 'beauty' : cPlan['beauty_num'] } ) ; 

        } 

           
    } , [ serviceData ] ) ;

    return service_Num

}
