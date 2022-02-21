
import { FC } from "react" ;
import Plan_Price_Method from "components/plan/custom_plan/components/Plan_Price_Method";
import { set_Show_Applied_Species  } from "store/actions/action_Plan"
import { useDispatch , useSelector } from "react-redux";
import Plan_Applied_Species from "components/plan/custom_plan/components/Plan_Applied_Species"
import { useRead_All_Species_With_Service_Prices } from "hooks/ajax_crud/useAjax_Read"
import Plan_Basic_Info from "./components/Plan_Basic_Info"



type form_Type = {
    register  : any ;
    errors    : any ;
    setValue  : any ;
    isValid   : any ;
    edit_Type : string ;
}

const Custom_Plan_Form : FC< form_Type > = ( { register , errors , setValue , isValid , edit_Type } ) => {

      const dispatch              = useDispatch() ;
      const show_Applied_Species  = useSelector( ( state : any ) => state.Plan.show_Applied_Species ) ;        // 是否顯示 : 套用寵物品種列表 
      const plan_Applied_Species  = useSelector( ( state : any ) => state.Plan.plan_Applied_Species ) ;        // 某方案所套用的寵物品種 
      const plan_Price            = useSelector( ( state : any ) => state.Plan.current_Custom_DefaultPrice ) ; // 方案預設價格 

      const all_Species_Data      = useRead_All_Species_With_Service_Prices() ;                                // 取得 _ 所有品種資料 ( species 資料表 )
      const click_Applied_Species = () => dispatch( set_Show_Applied_Species( !show_Applied_Species ) ) ;      // 點選 _ 套用寵物品種 
     
      
    
      { /* 屬性 for 元件 : <Plan_Basic_Info /> */ }
      const info_Props = {
        register  : register ,
        setValue  : setValue ,
        errors    : errors ,
        edit_Type : edit_Type
      }


      { /* 屬性 for 元件 : <Plan_Price_Method /> */ }
      const method_Props = {
        register  : register ,
        setValue  : setValue ,
        isValid   : isValid ,  
        edit_Type : edit_Type
      }

      const sT = { top : "4px" , left : "250px" }

      const pT = {
        display:"inline-block" ,
        width:"160px" ,
        position:"relative" ,
        top:"-6px"
      } as const ;

      
            
    return  <div className="relative" style={{ padding:"0px 15px" , top:"-30px" }}>

                  <label className="label relative" style={{ fontSize : "1.3em" }} >
                      <i className="fas fa-file-alt"></i> &nbsp; 包月方案資料 &nbsp;   
                  </label> 

                  { /* 按鈕 : 套用品種 ( for 新增 ) */ }
                  { edit_Type === "新增" &&

                    <div className="absolute f_13" style = { sT } >

                        <b className= { `tag is-medium pointer ${ show_Applied_Species ? "is-warning" : "" }` }  onClick={ click_Applied_Species }> 

                            <i className="fas fa-dog"></i> &nbsp; 套用寵物品種 
                          
                            { plan_Applied_Species.length !== 0 && <span> &nbsp; ( { all_Species_Data.length === plan_Applied_Species.length ? '全部' : plan_Applied_Species.length }  )</span> }
                            { plan_Applied_Species.length === 0 && <> &nbsp; <b className="tag is-white fRed is-rounded f_10"> &nbsp; <i className="fas fa-exclamation"></i> &nbsp; 尚未指定套用品種 </b>  </> }
                          
                        </b>
                      
                    </div> 

                  }

                  { /* 套用品種列表 */ }
                  { show_Applied_Species && <Plan_Applied_Species /> }  <br/>


                  { /* 欄位 : 名稱、洗澡/美容次數、期限、預設價格 */ }  
                  <Plan_Basic_Info { ...info_Props } /> 

                  { /*  個別消費 _ 計價方式 */ }     
                  { ( plan_Price > 0 || edit_Type === "編輯" ) && <Plan_Price_Method { ...method_Props } />  } 

            </div>

} ;

export default Custom_Plan_Form
       