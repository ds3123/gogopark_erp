import { FC , useEffect , useState} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {useDispatch} from "react-redux";
import { set_current_care_type , set_care_ordinary_price , set_care_ahead_price , set_care_postpone_price , set_expect_care_end_time } from "store/actions/action_Care"
import Date_Picker from "templates/form/Date_Picker";
import Time_Picker from "templates/form/Time_Picker";
import { get_H_M , get_Cal_Hour_Time } from "utils/time/time"
import moment from "moment";
import Qcode_Select_Options from "components/services/edit_components/Qcode_Select_Options";

interface ICare extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


{ /* 安親表單欄位 */ }
const Care_Form : FC<ICare> = ({ register  , control , setValue , errors , current, editType , serviceData } ) => {

    const dispatch = useDispatch() ;

    const today    = moment( new Date ).format('YYYY-MM-DD') ;     // 今日

    // 目前所選擇 : 安親類型
    const [ current_Care_Type , set_Current_Care_Type ] = useState('' ) ;

    // 安親日期、時間
    const [ Date_Time , set_Date_Time ] = useState<any>({

                                            // 開始 :
                                            care_Start_Date : today ,     // 日期
                                            care_Start_Time : get_H_M() , // 時間

                                            // 結束 :
                                            care_Expect_End_Time : '' , // 預計 _ 結束時間
                                            care_End_Time        : ''   // 實際 _ 結束時間

                                         }) ;


   // 手動調整 _ 安親費用 ( for Summary_Fee 中價格顯示 )
   const handle_Adjust_Price = ( type : '一般安親' | '住宿_提早抵達' | '住宿_延後帶走' , value : number ) => {

       // 驗證
       if( !value ){
           dispatch( set_care_ordinary_price( 0 )) ;
           return false
       }

       if( value < 0  ) return false ;

       if( type === '一般安親' )      dispatch( set_care_ordinary_price( value ) ) ;
       if( type === '住宿_提早抵達' ) dispatch( set_care_ahead_price( value )    ) ;
       if( type === '住宿_延後帶走' ) dispatch( set_care_postpone_price( value ) ) ;

   } ;


   // 變動處理 : 安親類別
   const handle_Care_Type = ( type : string ) => {

       // 設定 _ 安親類型
       set_Current_Care_Type(type === '請選擇' ? '' : type ) ; // state
       dispatch( set_current_care_type( type ) ) ;                  // redux

       if( type === '住宿_提早抵達' ){
           setValue( 'care_Ahead_Price' , 200 ) ;
           dispatch( set_care_ahead_price(200)) ;
       }

       if( type === '住宿_延後帶走' ){
           setValue( 'care_Postpone_Price' , 200 ) ;
           dispatch( set_care_postpone_price(200)) ;
       }

   } ;

   // 變動處理 : 安親時間
   const handle_Care_Hour = ( hour : number ) => {
       
       const startTime = moment( new Date() ).format('YYYY-MM-DD HH:mm') ;  // 目前時間

       // 設定 _ 安親時間
       setValue( 'care_Hour' , hour ) ;

       // 設定 _ "預計"結束時間
       set_Date_Time({ ...Date_Time , care_Expect_End_Time : get_Cal_Hour_Time( startTime , hour ) } ) ;
       dispatch( set_expect_care_end_time( get_Cal_Hour_Time( startTime , hour ) ) ) ;


       // 設定 _ 安親價格
       let price = 0 ;
       if( hour === 4 )  price = 200 ;
       if( hour === 8 )  price = 350 ;
       if( hour === 12 ) price = 500 ;

       setValue( 'care_Ordinary_Price' , price ) ;   // input
       dispatch( set_care_ordinary_price( price )) ; // Redux

   } ;

   // 取得 _ 安親 : 開始、結束 _ 日期
   const handle_Date = ( date : any , type : string ) => {

       const _date = moment( date ).format('YYYY-MM-DD' ) ;

       if( type === 'care_Start_Date' && _date < today ){
           alert('開始日期 不能選擇 過去日期') ;
           setValue( 'care_Start_Date' , new Date ) ;
           return false ;
       }

       set_Date_Time({ ...Date_Time , [ type ] : _date  }) ;

   } ;

   // 取得 _ 安親 : 開始、結束 _ 時間
   const handle_Time = ( time : any , type : string ) => {

      set_Date_Time({ ...Date_Time , [ type ] : time  }) ;

   } ;

   // 預先設定 : 安親類型、時間
   useEffect( ( ) : any => {


     // 【 新增 】 :

    

     const startTime = moment( new Date() ).format('YYYY-MM-DD HH:mm') ;  // 目前時間

     handle_Care_Type( '一般安親' ) ;
     handle_Care_Hour( 4 ) ;
     setValue( 'care_Ordinary_Price' , 200 ) ;

     // 設定 _ 安親結束時間
     set_Date_Time({ ...Date_Time , care_Expect_End_Time : get_Cal_Hour_Time( startTime , 4 ) } ) ;  // 設定 _ 安親結束時間
     dispatch( set_expect_care_end_time( get_Cal_Hour_Time( startTime , 4 ) ) ) ;


     // 【 編輯 】 :

     if( editType !== '編輯' ) return false ;

     // 離店方式未指定 --> 設為 '請選擇'
     if( !serviceData['way_leave'] ) setValue( 'way_Leave' , '請選擇' )


     // 設定 _ "預計"、"實際" 結束時間
     set_Date_Time({ ...Date_Time ,
                              care_Expect_End_Time : serviceData['expect_end_time'] ? serviceData['expect_end_time'] : '' ,
                              care_End_Time        : serviceData['end_time']        ? serviceData['end_time'] : ''
                   }) ;




   } , [ ] ) ;


   const way  = { fontSize : "11pt" , top : "-5px" , fontWeight : "bold" } ;
   const blue = { color : "rgb(30,30,180)" } ;

   return <>

             <b className="tag is-large is-link" > <i className="fas fa-baby-carriage"></i> &nbsp; 安 親 </b> <br/><br/><br/>

             { /* 安親 _ 性質、類型、時數、價格 */ }
             <div className="columns is-multiline is-mobile">

                  { /* 服務性質 : 當日安親 / 預約安親  */ }
                  <div className="column is-3-desktop ">

                      <div className="tag is-large is-white">
                          <span> 服務性質 : </span> &nbsp;

                          <span className="f_15 fGreen"> { Date_Time['care_Start_Date'] === today ? '當日安親' : '預約安親' } </span>

                      </div>

                 </div>

                  { /* 到店處理碼 Q */ }
                  <div className="column is-3-desktop">

                     { /* for 新增 */ }
                     { editType === '編輯' || <Qcode_Select_Options /> }


                     {/* for 編輯 */}
                      { editType === '編輯' &&

                          <div className="tag is-large is-white">

                              <span> 到店方式處理碼 :  <b style={ blue } > Q{ serviceData.q_code } </b>  </span>

                          </div>

                      }


                  </div>

                  { /* 到店方式 */ }
                  <div className="column is-3-desktop">

                     <div className="tag is-large is-white">

                         <span> 到店方式 : </span> &nbsp;

                         { /* for 新增 */ }
                         { editType === '編輯' ||

                             <div className="select is-small relative">
                                 <select {...register("way_Arrive")} style={way}>
                                     <option value="主人送來"> 主人送來</option>
                                     <option value="接送員接來"> 接送員接來</option>
                                     <option value="住宿轉來"> 住宿轉來</option>
                                 </select>
                             </div>

                         }

                         { /* for 新增 */ }
                         { editType === '編輯' &&  <b style={ blue } > { serviceData.way_arrive } </b> }

                     </div>

                 </div>

                  { /* 離店方式 */ }
                  <div className="column is-3-desktop">

                     <div className="tag is-large is-white">

                         <span> 離店方式 : </span> &nbsp;

                         <div className="select is-small relative">
                             <select {...register("way_Leave")} style={way}>
                                 <option value="主人接走"> 主人接走</option>
                                 <option value="接送員接送"> 接送員接送</option>
                                 <option value="轉回住宿"> 轉回住宿</option>
                             </select>
                         </div>

                     </div>

                  </div>

                  { /* 安親類型 */ }
                  <div className="column is-3-desktop ">

                      <div className="tag is-large is-white">

                          <span> 安親類型 : </span> &nbsp;

                          { /* for 新增 */ }
                          { editType === '編輯' ||

                              <div className="select is-small" >
                                  <select { ...register( "care_Type" ) } onChange={ e => handle_Care_Type( e.target.value ) } style={way}>
                                      <option value="一般安親"> 一般安親 </option>
                                      <option value="住宿_提早抵達"> 住宿 提早抵達 </option>
                                      <option value="住宿_延後帶走"> 住宿 延後帶走 </option>
                                  </select>
                              </div>

                          }

                          {/* for 編輯 */}
                          { editType === '編輯' &&  <b style={ blue } > { serviceData.service_type } </b> }

                      </div>

                  </div>

                  { /*  一般安親 : 時數、價格 ( 新增 / 編輯 )  */ }
                  { ( ( !editType && current_Care_Type === '一般安親' ) || ( editType === '編輯' && serviceData.service_type === '一般安親' ) ) &&

                     <>

                         <div className="column is-3-desktop">

                             <div className="tag is-large is-white">

                                 <span> 安親時間 : </span> &nbsp;

                                 { /* for 新增 */ }
                                 { editType === '編輯' ||

                                     <div className="select is-small">
                                         <select { ...register( "care_Hour" ) } onChange={ e => handle_Care_Hour( parseInt( e.target.value ) ) }  style={way}>
                                             <option value="4"> 4小時   </option>
                                             <option value="8"> 8小時   </option>
                                             <option value="12"> 12小時 </option>
                                         </select>
                                     </div>

                                 }

                                 {/* for 編輯 */}
                                 { editType === '編輯' && <span> <b style={ blue } > { serviceData.care_hours } </b> 小時 </span> }


                             </div>

                         </div>

                         { /* 價格 */ }
                         <div className="column is-3-desktop">

                             <div className="tag is-large is-white">

                                 <span> 安親費用 : </span> &nbsp;

                                 { /* for 新增 */ }
                                 { editType === '編輯' ||

                                     <>

                                          <span className='absolute f_9' style={{top: '60px', left: '30px'}}>
                                            * 4 小時 : 200 元 / 隻  &nbsp;，&nbsp; 8 小時 : 350 元 / 隻  &nbsp;，&nbsp; 12 小時 : 500 元 / 隻
                                          </span>

                                         <input className='input' type='number' {...register("care_Ordinary_Price")} min="0"
                                                onChange={e => handle_Adjust_Price('一般安親', parseInt(e.target.value))}/>

                                         <span className="relative" style={{ left:"15px" }}>元</span>

                                     </>

                                 }

                                 {/* for 編輯 */}
                                 { editType === '編輯' && <span> <b  className="fDred"> { serviceData.care_price } </b> 元 </span> }

                             </div>

                         </div>


                     </>

                  }

                  { /* 住宿 : 提早抵達 */ }
                  { ( current_Care_Type === '住宿_提早抵達' || ( editType === '編輯' && serviceData.service_type === '住宿_提早抵達' ) ) &&

                     <div className="column is-3-desktop relative">

                         { /* 費用  */ }
                         <div className="tag is-large is-white">

                             <span> 安親費用 : </span> &nbsp;

                             { /* for 新增 */ }
                             { editType === '編輯' ||

                                 <>

                                     <span className='absolute' style={{ top:'15px' , left:'250px' }}>
                                          元 &nbsp; &nbsp; <span className="f_9" > * 200 元 / 隻 ( 上限 500 元 ) </span>
                                     </span>

                                     <input className='input' type='number' {...register("care_Ahead_Price")} min="0"
                                            onChange={e => handle_Adjust_Price('住宿_提早抵達', parseInt(e.target.value))}/>

                                 </>

                             }

                             { /* for 編輯 */ }
                             { editType === '編輯' && <span>  <b className="fDred"> { serviceData.care_price } </b> 元 </span> }

                         </div>

                     </div>

                  }

                  { /* 住宿 : 延後帶走 */ }
                  { ( current_Care_Type === '住宿_延後帶走' || ( editType === '編輯' && serviceData.service_type === '住宿_延後帶走' )  )&&

                     <div className="column is-3-desktop relative">

                         { /* 費用 */ }
                         <div className="tag is-large is-white">

                             <span> 安親費用 : </span> &nbsp;

                             { /* for 新增 */ }
                             { editType === '編輯' ||

                                 <>

                                      <span className='absolute' style={{ top:'15px' , left:'250px' }}>
                                          元 &nbsp; &nbsp; <span className="f_9" > * 200 元 / 隻 ( 上限 500 元 ) </span>
                                     </span>

                                     <input className='input' type = 'number' { ...register("care_Postpone_Price") } min="0"
                                            onChange = { e => handle_Adjust_Price('住宿_延後帶走' , parseInt( e.target.value) ) }   />

                                 </>

                             }

                             { /* for 編輯 */ }
                             { editType === '編輯' && <span>  <b className="fDred"> { serviceData.care_price } </b> 元 </span> }

                         </div>

                     </div>

                  }

             </div>

             <br/><br/>

             { /* 安親日期、時間 */ }
             <div className="columns is-multiline  is-mobile">

                 { /* 安親日期 */ }
                 <div className="column is-3-desktop">

                    <div className="tag is-large is-white">

                       安親日期 : &nbsp;

                        {/*<Date_Picker control={control} name="service_Date" default_Date={ new Date }/>*/}

                        { /* for 新增 */ }
                        { editType === '編輯' ||

                            <Date_Picker control         = { control }
                                         name            = "care_Start_Date"
                                         default_Date    = { new Date }
                                         handle_OnChange = {(value: any) => handle_Date(value, 'care_Start_Date')}/>

                        }

                        {/* for 編輯 */}
                        { editType === '編輯' &&  <b style={ blue } > { serviceData.start_date } </b> }

                    </div>

                 </div>

                 { /* 時間 */ }
                 <div className="column is-3-desktop">

                    <div className="tag is-large is-white">

                        開始時間 : &nbsp;

                        { /* for 新增 */ }
                        { editType === '編輯' ||

                            <Time_Picker name            = "care_Start_Time"
                                         control         = { control }
                                         handle_OnChange = { ( value : any) => handle_Time( value ,'care_Start_Time' ) } />

                        }

                        { /* for 編輯 */ }
                        { editType === '編輯' &&  <b style={ blue } > { serviceData.start_time } </b> }

                    </div>

                 </div>

                 { /* 預計 _ 結束時間 */ }

                 { (  (  editType !== '編輯' && current_Care_Type === '一般安親' ) || ( editType === '編輯' && serviceData.service_type === '一般安親')) &&

                     <div className="column is-3-desktop">

                         <span className="tag is-large is-success is-light">

                             預計 _ 結束時間 &nbsp;
                             <b className="tag is-medium is-white is-rounded">
                                 { Date_Time['care_Expect_End_Time'] }
                             </b>

                         </span>

                     </div>

                 }


                 { /* 實際 _ 結束時間 */}
                 <div className="column is-3-desktop" >
                     {  Date_Time['care_End_Time'] }

                    <div className="tag is-large is-white">

                        { /* for 新增 */ }
                        { editType === '編輯' &&

                            <>

                                結束時間 : &nbsp;
                                <Time_Picker name            = "care_End_Time"
                                             control         = { control }
                                             default_Time    = { Date_Time['care_End_Time'] ? Date_Time['care_End_Time'] : '00:00'}
                                            // handle_OnChange = { ( value : any ) => handle_Time(value, 'care_End_Time') }
                                />

                            </>

                        }

                    </div>

                 </div>

             </div>

             <br/><hr/><br/>

          </>

} ;

export default Care_Form
