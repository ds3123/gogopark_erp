
import { FC , useEffect , useState } from "react" ;
import { useDispatch , useSelector } from "react-redux";
import { set_Current_Species_Select_Id } from "store/actions/action_Pet"
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { usePlan_Query_Custom_Plan_By_Name } from "hooks/data/usePlan"



type sType = {
    register    : any ;
    errors      : any ;
    editType    : string | undefined ;
    serviceData : any ;
}


// @ 寵物品種 ( 下拉選單 for 方案所要套用的品種 )
const Applied_Species_Select : FC< sType > = ( { register , errors , editType , serviceData } ) => {


     const dispatch = useDispatch() ;

     const all_Pet_Species                           = useRead_Species() ;                       // 取得 _ 所有寵物品種資料   
     const { custom_Plan , get_Custom_Plan_By_Name } = usePlan_Query_Custom_Plan_By_Name();      // 查詢 _ 自訂方案 ( 依 : 方案名稱 )   
     
     const current_Plan_Name = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇 : 方案類型

     const [ species_Options , set_Species_Options ] = useState( [] ) ;                          // 設定 _ 寵物品種下拉選項                          


     // 設定 _ 品種 id ( 在 species 資料表的 id ) -->  
     const get_Species_Id = ( id : string ) => dispatch( set_Current_Species_Select_Id( id ) ) ; 
 


     // for 【 預設方案 】 --> 設定 _ 品種下拉選項
     useEffect( () => { 

       // 依方案名稱，查詢方案資料
       get_Custom_Plan_By_Name( current_Plan_Name ) ;

       // 設定 _ 預設方案 : 下拉選項 ( 包月洗澡 / 包月美容 )
       if( current_Plan_Name === '包月洗澡' || current_Plan_Name === '包月美容' )  set_Species_Options( all_Pet_Species ) ;

       
     } , [ current_Plan_Name , all_Pet_Species ] ) ;



     // for 【 自訂方案 】 --> 設定 _ 品種下拉選項 
     useEffect( () => { 

      if( custom_Plan ){

        // 自訂方案所套用的品種 : 序號 ( serial )
        const customPlan_Applied_Species    = custom_Plan['plan_applied_species'] ? custom_Plan['plan_applied_species'].split(',') : [] ;       

        // 從所有品種中，篩選出 _ 自訂方案
        const custom_Plan_Available_Species = all_Pet_Species.filter( ( x ) => customPlan_Applied_Species.includes( x['serial'] ) ) ;

        // 設定 _ 自訂方案 : 下拉選項 
        set_Species_Options( custom_Plan_Available_Species ) ;

      }

     } , [ custom_Plan ] ) ;


  
    return <>

                { /* for 新增 */ }
                { editType === '編輯' ||

                    <div className="column is-3-desktop">

                        <p> <b> 寵物品種 </b> &nbsp; <b style={{ color: "red" }} > { errors.plan_Pet_Species?.message } </b> </p>

                        <div className="select">

                            <select { ...register("plan_Pet_Species") } onChange={ e => get_Species_Id( e.target.value ) }>

                                <option value="請選擇"> 請選擇 </option>
                                { 

                                   species_Options.map( ( x , y ) => { 
                                   
                                      return <option value={ x['id'] } key={ y }> { x['serial'] } _ { x['name'] ? x['name'] : '' } </option>
                                   
                                   }) 
                                   
                                }
                          
                            </select>

                        </div>

                    </div>

                }

                { /* for 編輯 */ }
                { 
                    editType === '編輯' &&  
                            <div className="column is-3-desktop f_14"> 寵物品種 : 
                                <b className="fDblue"> { serviceData.pet ? serviceData.pet.species :  <span className="fRed"> 已刪除 </span>  }  </b> 
                            </div>  
                }


            </>



} ;


export default Applied_Species_Select
       



