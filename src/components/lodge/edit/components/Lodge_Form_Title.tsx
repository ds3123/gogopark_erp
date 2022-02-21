
import { useState } from "react" ;
import { useSelector } from "react-redux";
import Lodge_Form_Function from "./Lodge_Form_Function";



// @ 住宿表單 _ 標題 
const Lodge_Form_Title = ( { editType } : { editType : string | undefined } ) => {

   // 住宿價格小計
   const current_Lodge_Price_Sum = useSelector( (state : any ) => state.Lodge.current_Lodge_Price_Sum ) 

   // 是否顯示 : 住宿情形
   const [ show_LodgeCalendar , set_Show_LodgeCalendar ] = useState( false ) ;

   // 是否顯示 : 住宿查詢
   const [ show_LodgeQuery , set_Show_LodgeQuery ]       = useState( false ) ;
  
   // 是否顯示 : 住宿價格
   const [ show_LodgePrice , set_Show_LodgePrice ]       = useState( false ) ;  
   
   // 點選 : 顯示 / 隱藏 _  住宿查詢
   const click_Show_LodgeQuery   = () => set_Show_LodgeQuery( !show_LodgeQuery ) ;

   // 點選 : 顯示 / 隱藏 _  住宿情形
   const click_Show_LodgeClendar = () => set_Show_LodgeCalendar( !show_LodgeCalendar ) ;

   // 點選 : 顯示 / 隱藏 _  住宿價格
   const click_Show_LodgePrice   = () => set_Show_LodgePrice( !show_LodgePrice ) ;


   const function_Props = {
                            show_LodgePrice    : show_LodgePrice ,
                            show_LodgeQuery    : show_LodgeQuery ,
                            show_LodgeCalendar : show_LodgeCalendar 
                          }


   const icon = { fontSize:"10pt",top:"3px" } as const ;
   const tag  = 'tag is-medium pointer is-rounded' ;

   return <>    

             <label className="label " style={{ fontSize : "1.3em" }} >

                <b className="tag is-large is-link m_Right_30" > <i className="fas fa-home"></i> &nbsp; 住 宿

                  { current_Lodge_Price_Sum !== 0 &&
                       <b className="tag is-rounded m_Left_20 is-white f_12" > 小計 : <span  className="fRed" > &nbsp; { current_Lodge_Price_Sum } &nbsp; </span> 元 </b>
                  }

                </b>

                 { !editType && 

                    <> 

                        { /* 計算 _ 住房價格 */ }
                        <b className = { `${ tag } m_Right_30  ${ show_LodgePrice ? 'is-black' : '' }` }  onClick = { click_Show_LodgePrice } >
                            <b className="relative" style={ icon }> <i className="fas fa-calculator"></i> </b> &nbsp; 試算
                        </b> 

                        { /* 查詢 _ 住房資料 */ }
                        {/* <b className = { `${ tag } m_Right_30  ${ show_LodgeQuery ? 'is-black' : '' }` }  onClick = { click_Show_LodgeQuery } >
                            <b className="relative" style={ icon }> <i className="fas fa-search"></i></b> &nbsp; 查詢
                        </b>  */}

                        { /* 檢視 _ 住房情形 */ }
                        <b className = { `${ tag } ${ show_LodgeCalendar ? 'is-black' : '' }` }  onClick = { click_Show_LodgeClendar } >
                            <b className="relative" style={ icon } > <i className="far fa-calendar-alt"></i> </b> &nbsp; 檢視
                        </b> 

                    </>

                }    

             </label>   <br/>


             { /* 功能 : 試算、查詢、檢視 */ } 
             <Lodge_Form_Function { ...function_Props } />          

   
          </>   
} ;

export default Lodge_Form_Title
       