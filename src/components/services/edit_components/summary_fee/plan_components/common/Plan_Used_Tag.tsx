
import { FC } from "react" ;
import { useDispatch , useSelector } from "react-redux";
import { click_Reset_Use_Plan_Tag , set_Click_Use_Plan_Tag , get_Plan_Used_Amount , get_Plan_Used_Num  } from "store/actions/action_Plan" ;
import { set_Modal } from "store/actions/action_Global_Layout" ;
import Plan_Used_Records from "components/services/edit_components/summary_fee/plan_components/Plan_Used_Records" ;


// 依照方案類型，回傳 _ 標籤樣式差異
const get_Tag_Style = ( plan : any , current_Tag_Index : number , index : number ) => {
  
    let tag_Color    = '' ;                                                                                           // 標籤樣式   
    let tag_Style    = 'tag is-medium m_Left_15 m_Bottom_15 is-light pointer ' ;                                      // 標籤顏色
    let used_Style   = `tag is-rounded m_Right_15 f_10 ${ current_Tag_Index === index ? 'is-black' : 'is-white' }` ;  // 點選使用樣式 
    const title_Type =  plan['plan_type']=== '包月洗澡' || plan['plan_type']=== '包月美容' ? '預設' : '自訂' ;           // 標籤類型 ( 預設 / 自訂 ) 

    if( plan['plan_type'] === '包月洗澡' ) tag_Color = 'is-success' ;
    if( plan['plan_type'] === '包月美容' ) tag_Color = 'is-danger' ;
    if( plan['plan_type'] !== '包月洗澡' && plan['plan_type'] !== '包月美容' ) tag_Color = 'is-warning' ;

    tag_Style += tag_Color ;

    return { tag_Style , title_Type , used_Style }

} ;  


// 取得 _ 方案使用額度
const get_Plan_Quota = ( current : string , plan : any ) => {


   // 預設方案
   if( current === '洗澡' && plan['plan_type'] === '包月洗澡' ) return 4 ;  
   if( current === '洗澡' && plan['plan_type'] === '包月美容' ) return 3 ;
   if( current === '美容' && plan['plan_type'] === '包月美容' ) return 1 ;
   
   // 自訂方案
   if( current === '洗澡' && plan['custom_plan'] ) return plan['custom_plan']['bath_num'] ;  
   if( current === '美容' && plan['custom_plan'] ) return plan['custom_plan']['beauty_num'] ;  
   
} ;


// --------------------------------------------------

type tag = {
    plan    : any ;
    current : string ;
    index   : number ;
}


// @ 方案點選使用標籤
const Plan_Used_Tag : FC< tag > = ( { current , plan , index } ) => {

    const dispatch                                = useDispatch() ; 

    const current_Tag_Index                       = useSelector( ( state : any ) => state.Plan.current_Plan_Tag_Index ) ;  // 目前 _ 點選使用方案標籤的索引號碼 
    const { tag_Style , title_Type , used_Style } = get_Tag_Style( plan , current_Tag_Index , index ) ;                    // 標籤樣式、title    
    const plan_Quota                              = get_Plan_Quota( current , plan ) ;                                     // 方案額度 
    const used_Amount                             = get_Plan_Used_Amount( plan['plan_used_records'] ) ;                    // 已使用 _ 全部金額     
    const used_Num                                = get_Plan_Used_Num( current , plan['plan_used_records'] ) ;             // 已使用 _ 方案次數 ( 資料表 : plan_used_records )

    console.log( 'plan_Quota' , plan_Quota ) 


    // 點選 _ 使用此方案標籤
    const click_Use_Plan_Tag = ( index : number , plan : any ) => {
      
        // 若已點選過，再次點選 : 復原 _ 點選使用時所觸發的多個動作
        if( current_Tag_Index === index ){
            dispatch( click_Reset_Use_Plan_Tag() ) ;  
            return false 
        } 

        // 彙整、觸發 _ 點選標籤後，所進行多個動作
        dispatch( set_Click_Use_Plan_Tag( current , plan , index ) ) ;

    } ;


    // 點選 _ 檢視 : 寵物資訊
    const click_Check_Used_Records = ( plan_Data : any ) => {

        dispatch( set_Modal( true , <Plan_Used_Records /> , { data : plan_Data , modal_Style : { width : "70%" , left : "15%" , bottom : "0px" } } )) ;

    } ;





   return  <b className = { tag_Style } style = { { boxShadow : "0px 1px 2px 1px rgba( 0 , 0 , 0 , .2 )" , borderRadius : "20px" } } >

              { title_Type }方案 : { plan['plan_type'] } &nbsp; <span className="f_10"> (  { plan['created_at'].slice( 0 , 10 ) } ) </span> &nbsp;&nbsp;

              { /*  # 使用 _ 【 未額滿 】  */ }
              { used_Num !== plan_Quota &&

                 <b className = { used_Style } onClick = {  plan_Quota ? () => click_Use_Plan_Tag( index , plan ) : ()=>{} } >

                    { /* 點選 _ 使用該方案  */ }  
                    {
                      ( current_Tag_Index !== index && plan_Quota ) &&


                            <span>
                                <b className="fBlue"> { current } </b> 使用情形 : <b className="fDblue"> { used_Num } / { plan_Quota } </b>  &nbsp;
                                ( 餘額 : { plan['plan_fee_total'] - used_Amount } 元 ) &nbsp; &nbsp; <i className="fas fa-hand-point-up"></i> &nbsp;點選使用 &nbsp;
                            </span>


                    }

                    { /* 方案資料，已從自訂方案資料表 [ custom_plans ] 刪除 */ }  
                    { !plan_Quota && <b className="fRed">  <i className="fas fa-exclamation"></i> &nbsp;查無自訂方案  </b> }


                    { /* 點選後，顯示已使用次數 */ }    
                    { current_Tag_Index === index && <span> 已使用{ current }&nbsp; : &nbsp; { used_Num + 1 } / { plan_Quota } &nbsp; </span> }

                 </b>

              }


             { /*  # 使用 _ 【 已額滿 】  */ }
             { used_Num === plan_Quota && <b className="tag is-rounded is-danger f_10 m_Right_15"> { used_Num } / { plan_Quota } &nbsp; 額度使用完畢 </b> }


             { /* # 點選顯示 _ 已使用列表 ( Modal )  */ }
             <span className="tag is-rounded is-primary" onClick = { () => click_Check_Used_Records( plan )  } > <i className="fas fa-list"></i>  </span>

                      
           </b> ;

} ;

export default Plan_Used_Tag
       