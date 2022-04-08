
import { FC , useEffect, useState  } from "react"
import { Edit_Form_Type } from "utils/Interface_Type";
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { useDispatch, useSelector} from "react-redux";
import { set_month_bath_price , set_month_beauty_price } from 'store/actions/action_Plan'
import { set_Species_Service_Prices } from 'store/actions/action_Service'
import { set_Current_Pet } from "store/actions/action_Pet" ;
import Customer_Pets from "../../pets/edit/info/Customer_Pets";
import Plan_Type_Columns from "./components/Plan_Type_Columns"

import Applied_Species_Select from "./components/Applied_Species_Select"
import Applied_Plan_Type from "./components/Applied_Plan_Type"




interface IPlan extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


{ /* @ 方案表單欄位  */}
const Plan_Form : FC< IPlan > = ( { register , setValue , errors , current, editType, serviceData  } ) => {


     const dispatch               = useDispatch() ;

     const petSpecies             = useRead_Species() ;                                                      // 取得 _ 所有寵物品種資料   
     const current_Customer_Pets  = useSelector( ( state:any )   => state.Customer.Current_Customer_Pets ) ; // 客戶單，目前所填入客戶的所有寵物

     const species_Service_Prices = useSelector( ( state : any ) => state.Service.species_Service_Prices ) ; // 特定品種，所有 ( 5種 ) 基本服務價格
     const current_Species_Id     = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;         // 目前 "寵物品種" 下拉選項所選擇 id ( species 資料表的 id )    

     const current_Plan_Type      = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;         // 目前所選擇 : 方案類型 ( 名稱 )


     // 方案基本價格 ( for 編輯 )
     const [ plan_Fee , set_Plan_Fee ] = useState( 0 ) ;

    
     // 點選 _ 客戶寵物標籤，以帶入所欲適用的 : 寵物編號
     const click_Pet_Button = ( pet : any ) => {

        // 設定所點選的寵物資料
        dispatch( set_Current_Pet( pet ) ) ;  


        if( !current_Plan_Type || current_Plan_Type === '請選擇' ){
            alert('請先選擇 : 方案類型') ;
            return false ;
        }

        if( !current_Species_Id || current_Species_Id === '請選擇' ){
            alert('請先選擇 : 寵物品種') ;
            return false ;
        }

        // 目前 "寵物品種" 下拉選單，所選擇寵物品種
        const species_Selected = petSpecies.filter( x => x['id'] === parseInt( current_Species_Id ) )[0]  ;

        if( species_Selected['name'] !== pet['species'] ){
            alert( `目前下拉所選擇寵物品種為 : ${ species_Selected['name'] }，不符合所欲適用寵物品種 : ${ pet['species'] } ` ) ;
            return false ;
        }

        // 帶入寵物編號 ( 並啟動驗證 : shouldValidate )
        setValue( 'plan_Apply_Pet' , pet['serial'] , { shouldValidate : true  } ) ;

     } ;


     // 設定 _ 預設方案 ( 包月洗澡、包月美容 ) 價格
     const set_Default_Plan_Prices = ( species_Service_Prices : any[] ) => {

          // 包月洗澡
          const bath_Month   = species_Service_Prices.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_plan'] === '包月洗澡' )[0] ;

          // 包月美容
          const beauty_Month = species_Service_Prices.filter( ( x : any ) => x['service_type'] === '美容' && x['service_plan'] === '包月美容' )[0] ;

          // * 設定 _ 包月洗澡、美容價格
          dispatch( set_month_bath_price( bath_Month['service_price'] ) ) ;
          dispatch( set_month_beauty_price( beauty_Month['service_price'] ) ) ;

     }


     // 取得 _ 基本價格
     const get_Edit_Plan_Basic_Price = ( data : any ) => {

         if( !data ) return 0 ;

         const pet       = data['pet'] ;
         const plan_Type = data[ 'plan_type' ] ;  // 方案類型( Ex. 包月洗澡、包月美容... )
 
         // 包月洗澡下，有自訂價錢
         if( plan_Type === '包月洗澡' && pet['month_bath_price'] )   return pet['month_bath_price'] ;
         
         // 包月美容下，有自訂價錢
         if( plan_Type === '包月美容' && pet['month_beauty_price'] ) return pet['month_beauty_price'] ;
         
         return data['plan_basic_price'] ;

     } ;


    
     // 設定 _ 所選擇品種，其所有 ( 5種 ) 基本服務價格
     useEffect( ( ) => {

        if( current_Species_Id && current_Species_Id !== '請選擇' )
             dispatch( set_Species_Service_Prices( current_Species_Id ) ) ;

     } , [ current_Species_Id ] ) ;


     // 設定 _ 預設方案 ( 包月洗澡、包月美容 ) 價格 ( 取得以上由 set_Species_Service_Prices 設定的價格後 )
     useEffect( () => { 
     
        if( species_Service_Prices.length > 0 ) set_Default_Plan_Prices( species_Service_Prices ) ;
           
     } , [ species_Service_Prices ] ) ;



     // 設定 _ 方案基本價格 ( for 編輯 )
     useEffect( () => {

        if( editType ) set_Plan_Fee( get_Edit_Plan_Basic_Price( serviceData ) )

     } , [ serviceData ] ) ;
     

     return <div className="relative">

                { !editType && <span className="absolute" style={{ top:"-30px" }}> <i className="fas fa-exclamation-circle"></i> &nbsp;需先新增客戶及其寵物，才能購買方案 。 </span> }
 
                { /* 標題 */ }
                <label className="label " style={{ fontSize : "1.3em" }} >

                    <b className="tag is-large is-danger" > <i className="fas fa-file-alt"></i> &nbsp; 方 案 </b> &nbsp; &nbsp;

                    { /* 客戶所有寵物 ( 新增時顯示 ) */ }
                    { !editType && <Customer_Pets current={ current } current_Customer_Pets={ current_Customer_Pets } click_Pet_Button={ click_Pet_Button } /> }

                </label>

                <br/>

                <div className="columns is-multiline is-mobile">

                     { /* 方案類型 ( 下拉選單 ) */ }
                     <Applied_Plan_Type register = { register } setValue = { setValue } editType = { editType} serviceData = { serviceData } /> 


                     { /* 寵物品種 ( 下拉選單 ) */ }
                     { ( current_Plan_Type && current_Plan_Type !== '請選擇' || editType === '編輯' ) &&  
                              <Applied_Species_Select register = { register } errors = { errors } editType = { editType } serviceData = { serviceData } /> }

                     { /* # for 【 新增 】 */ }
                     { ( current_Species_Id &&  current_Species_Id !== '請選擇' ) &&  
                              <Plan_Type_Columns register = { register } errors = { errors }  /> }
                    
                        
                     { /* # for 【 編輯 】 */ }
                     { editType === '編輯' &&

                        <>

                            { /* 基本價格 */ }
                            <div className="column is-6-desktop">
                                <div className="f_14"> 基本價格 : 
                                    <b className="fDred"> { plan_Fee } </b> 元 
                                </div>
                            </div>

                            { /* 自訂 : 加 / 減 金額 */ }
                            <div className="column is-3-desktop">
                                <div className="f_14"> 自訂加 / 減 金額 : <b className="fDred"> { serviceData.plan_adjust_price } </b> 元 </div>
                            </div>

                            { /* 接送費 */ }
                            <div className="column is-3-desktop">
                                <div className="f_14"> 接送費 : <b className="fDred"> { serviceData.pickup_fee } </b> 元 </div>
                            </div>

                        </>

                     }

                </div>

                 <br/>

            </div>

} ;

export default Plan_Form