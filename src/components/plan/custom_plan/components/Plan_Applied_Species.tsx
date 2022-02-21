
import { useState , FC } from "react" ;
import { useDispatch , useSelector } from "react-redux";
import { useRead_All_Species_With_Service_Prices } from "hooks/ajax_crud/useAjax_Read"
import { set_Plan_Applied_Species , set_Show_Applied_Species } from "store/actions/action_Plan"


type columnType = {
  filter_Data : any[] ;
}


// 資料欄位
const Data_Column : FC< columnType > = ( { filter_Data } ) => {


   const dispatch             = useDispatch() ; 
   
   // 方案所套用的寵物品種 
   const plan_Applied_Species = useSelector( ( state : any ) => state.Plan.plan_Applied_Species ) ; 


   // 點選 _ 寵物項目 
   const click_Speices_Item = ( species : any ) => {
   
      const fResult = plan_Applied_Species.filter( ( x : any ) => x['name'] === species['name'] ) ;

      if( fResult.length > 0 ){   // 有 --> 取消選取 ( 再點一次 )

        const _fResult = plan_Applied_Species.filter( ( x : any ) => x['name'] !== species['name'] ) ;

        dispatch( set_Plan_Applied_Species( _fResult ) ) ;

      }else{                      // 沒有 --> 加入選取

        dispatch( set_Plan_Applied_Species( [ ...plan_Applied_Species , species ] ) ) ;

      }

   }  


   return  <div className="column is-2-desktop">

               {
                  filter_Data.map( ( x:any , y:number ) => {

                    const fResult    = plan_Applied_Species.filter( ( _x : any ) => _x['name'] === x['name']  )
                    const is_Clicked = fResult.length > 0 ? true : false ;

                    return <b key={y} className={`tag is-medium m_Right_20 m_Bottom_10 pointer ${ is_Clicked ? "is-success" : ""  }`}  
                              onClick={ () => click_Speices_Item( x ) } > 
                                 <span className="tag is-white is-rounded"> { x['serial'] } </span> &nbsp;  { x['name'] } 
                            </b>     

                  })

               }
   
            </div>   

} ;



// @ 品種列表 ( for 選擇方案所要套用的品種 )
const Plan_Applied_Species = () => {

    const dispatch              = useDispatch() ;

    // 取得 _ 所有品種資料 ( species 資料表 )
    const species_Data          = useRead_All_Species_With_Service_Prices() ;

    // 是否 _ 取消全部選取
    const [ is_Clear_All , set_Is_Clear_All ] = useState( true ) ;

    
    // 某方案所套用的寵物品種 
    const plan_Applied_Species  = useSelector( ( state : any ) => state.Plan.plan_Applied_Species ) ; 

   
    // 點選 _ 取消全部選取
    const click_Clear_All       = () => {

      const species_Num = species_Data.length ; // 品種總數目

      if( plan_Applied_Species.length === species_Num ){

        set_Is_Clear_All( false ) ;
        dispatch( set_Plan_Applied_Species( [] ) ) ;

      }else{

        set_Is_Clear_All( true );
        dispatch( set_Plan_Applied_Species( species_Data ) ) ;

      }
    
    } 
 
    // 區分欄位
    const species_Section_1 = species_Data.filter( ( x : any , y : number ) => y < 10 )
    const species_Section_2 = species_Data.filter( ( x : any , y : number ) => y > 9 && y < 20 )
    const species_Section_3 = species_Data.filter( ( x : any , y : number ) => y > 19 && y < 30 )
    const species_Section_4 = species_Data.filter( ( x : any , y : number ) => y > 29 && y < 40 )
    const species_Section_5 = species_Data.filter( ( x : any , y : number ) => y > 39 && y < 50 )
    const species_Section_6 = species_Data.filter( ( x : any , y : number ) => y > 49 )
  
    const sBox = {
        width:"100%" , 
        height:"auto",
        padding : "20px 15px 20px 15px" , 
        border:"1px solid rgba(0,0,0,.1)" , 
    }

    const cAll = {
      top:"-33px",
      right:"-1px"
    }

   return <div className="relative m_Top_25 m_Bottom_80" style={sBox}>

             <b className={ `tag is-medium is-danger ${ is_Clear_All ? "" : "is-light" } absolute pointer` } 
                style={ cAll } onClick={ () => click_Clear_All() }>
               <i className="fas fa-list-alt"></i> &nbsp; 全部{ species_Data.length === plan_Applied_Species.length ? '取消' : '選取' } 
             </b>   

             <div className="columns is-multiline is-mobile">
               
                <Data_Column filter_Data = { species_Section_1 } />  
                <Data_Column filter_Data = { species_Section_2 } />  
                <Data_Column filter_Data = { species_Section_3 } />  
                <Data_Column filter_Data = { species_Section_4 } />  
                <Data_Column filter_Data = { species_Section_5 } />  
                <Data_Column filter_Data = { species_Section_6 } />  

             </div>  

          </div>

} ;

export default Plan_Applied_Species
       