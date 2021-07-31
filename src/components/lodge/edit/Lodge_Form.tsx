
import React, {FC, useEffect, useState} from "react"
import {Edit_Form_Type, ILodge_Data, room_Type} from "utils/Interface_Type";
import Date_Picker from "templates/form/Date_Picker";
import Lodge_Query  from 'components/lodge/edit/Lodge_Query'
import Lodge_Calendar from "components/lodge/edit/Lodge_Calendar";
import Lodge_Price from "components/lodge/edit/Lodge_Price";
import moment from "moment";
import Time_Picker from "templates/form/Time_Picker";
import {get_Date_Cal, get_Interval_Dates, get_InUse_Days} from "utils/time/date";




// 房間 ( 房型 / 房號 )
const lodge_Rooms = [
                      { type : '大房' , number : [ 'A01' , 'A02' , 'A03' , 'A04' , 'A05'  ] } ,
                      { type : '中房' , number : [ 'B01' , 'B02' , 'B03' , 'B04' , 'B05'  ] } ,
                      { type : '小房' , number : [ 'C01' , 'C02' , 'C03' , 'C04' , 'C05'  ] } ,
                      { type : '大籠' , number : [ 'D01' , 'D02' , 'D03' , 'D04' , 'D05'  ] } ,
                      { type : '中籠' , number : [ 'E01' , 'E02' , 'E03' , 'E04' , 'E05'  ] } ,
                      { type : '小籠' , number : [ 'F01' , 'F02' , 'F03' , 'F04' , 'F05'  ] } ,
                    ] ;


// NOTE :
//    1. 月份需要加 1，才是目前月份
//    2. ' 顯示 ' 日期範圍 : 開始日期( startDate ) ~ 結束日期( endDate ) 前 1天
const appointments : ILodge_Data[] = [

    {
        title       : 'A01 ( 大房 ) - 招財 ( 秋田犬 )' ,
        startDate   : new Date(2021 ,5 , 27 ) ,
        endDate     : new Date(2021 ,5 , 29 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A01'
    } ,

    {
        title       : 'A02 ( 大房 ) - DDD ( 獒犬 )' ,
        startDate   : new Date(2021 ,5 , 30 ) ,
        endDate     : new Date(2021 ,6 , 2 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A02'
    } ,

] ;


{ /* @ 住宿表單欄位  */}
const Lodge_Form : FC<Edit_Form_Type> = ( { register  , control , setValue , errors , current } ) => {

   const today = moment( new Date ).format('YYYY-MM-DD') ; // 今日


   // 是否顯示 : 住宿情形
   const [ show_LodgeCalendar , set_Show_LodgeCalendar ] = useState(false ) ;

   // 是否顯示 : 住宿查詢
   const [ show_LodgeQuery , set_Show_LodgeQuery ]       = useState(false ) ;

   // 是否顯示 : 住宿價格
   const [ show_LodgePrice , set_Show_LodgePrice ]       = useState(false ) ;

   // 住宿相關資訊
   const [ lodgeInfo , set_LodgeInfo ]                   = useState<any>({

                                                               lodgeData          : [] ,    // 住宿資料

                                                               lodgeType          : '' ,    // 房型
                                                               lodgeNumber        : '' ,    // 房號

                                                               // 住房
                                                               lodgeCheckIn_Date  : today , // 日期
                                                               lodgeCheckIn_Time  : '' ,    // 時間

                                                               // 退房
                                                               lodgeCheckOut_Date : today , // 日期
                                                               lodgeCheckOut_Time : ''      // 時間

                                                             }) ;

    // 目前房型下，相對應的房號
   const [ currentNumbers , set_CurrentNumbers ]         = useState<any[]>([]) ;

   // 該房間，是否在選定的時間內，已被使用
   const [ is_Room_InUse , set_Is_Room_InUse ]           = useState( false ) ;

   // --------------------------------------------------------------------------------

    // 變更 : 房型
    const handle_Lodge_Type = ( type : string ) => {

       // 設定 _ state
       set_LodgeInfo({ ...lodgeInfo , lodgeType : type === '請選擇' ? '' : type }) ;


       if( type === '請選擇' ){ set_CurrentNumbers( []) ; return false ;  }

       // 設定 _ 此房型所有房號
       lodge_Rooms.forEach( x => {
           if( x['type'] === type ) set_CurrentNumbers( x['number'] ) ;
       }) ;


   } ;

    // 變更 : 房號
    const handle_Lodge_Number = ( number : string ) => {

       set_LodgeInfo({ ...lodgeInfo , lodgeNumber : number === '請選擇' ? '' : number }) ;

   } ;

   // --------------------------------------------------------------------------------

    // 變更 : 住房日期
    const handle_CheckIn_Date = ( date : any ) => {

       // 所選擇日期( 轉換格式 )
       const _date = moment( date ).format('YYYY-MM-DD' ) ;

        if( _date < today ){
           alert('住房日期，不能早於今日') ;
           setValue( 'lodge_CheckIn_Date' , new Date ) ; // 設回今天
           return false ;
        }

       // 日期檢查
       // if( _date > lodgeInfo['lodgeCheckOut_Date'] ){
       //    alert('住房日期，不能晚於退房日期') ;
       //    setValue( 'lodge_CheckIn_Date' , new Date ) ; // 設回今天
       //    return false ;
       // }

       set_LodgeInfo({ ...lodgeInfo , lodgeCheckIn_Date : _date }) ;

   } ;

    // 變更 : 住房時間
    const handle_CheckIn_Time = ( time : any ) => {

       set_LodgeInfo({ ...lodgeInfo , lodgeCheckIn_Time : time }) ;

   } ;

    // 變更 : 退房日期
    const handle_CheckOut_Date = ( date : any ) => {

        // 所選擇日期( 轉換格式 )
        const _date = moment( date ).format('YYYY-MM-DD' ) ;

        // 日期檢查
        if( _date < lodgeInfo['lodgeCheckIn_Date'] ){
            alert('退房日期，不能早於住房日期') ;
            setValue( 'lodge_CheckOut_Date' , new Date ) ; // 設回今天
            return false ;
        }

        set_LodgeInfo({ ...lodgeInfo , lodgeCheckOut_Date  :  _date }) ;

    } ;

    // 變更 : 退房時間
    const handle_CheckOut_Time = ( time : any ) => {

        console.log( time ) ;
        set_LodgeInfo({ ...lodgeInfo , lodgeCheckOut_Time : time }) ;

   } ;

   // --------------------------------------------------------------------------------

    // 該房間，是否在選定的時間內，已被使用
    const check_Is_Room_InUse = ( lodgeNumber : string , checkIn_Date : string , checkOut_Date : string  , lodgeData : ILodge_Data[] ) => {

        let bool = false ;

        // 所選擇時間區段，所包含日期
        // 須先減 1 天 ( 再檢查 get_Interval_Dates 2021.06.28 )
        const _lodgeCheckIn_Date  = moment( get_Date_Cal( checkIn_Date , -1 ) ).format('YYYY-MM-DD') ;
        const _lodgeCheckOut_Date = moment( get_Date_Cal( checkOut_Date , -1 ) ).format('YYYY-MM-DD') ;
        const selected_Days       = get_Interval_Dates( _lodgeCheckIn_Date , _lodgeCheckOut_Date ) ;

        // 所選擇房號，已有被使用紀錄
        lodgeData.forEach( x => {

            if( x['lodgeNumber'] === lodgeNumber ){

                // 該房號使用期間，所包含天數
                const days_InUse = get_InUse_Days( x['startDate'] , x['endDate'] ) ;

                // 篩選 : 已使用天數
                const days_Selected_InUse = selected_Days.filter(x => ( days_InUse.indexOf( x ) !== -1 ) ) ;

                // 所選擇時間區段內，有已使用過的紀錄
                if( days_Selected_InUse.length > 0 ) bool = true ;

            }

        });

        return bool ;

    } ;

   // --------------------------------------------------------------------------------

   // 點選 : 顯示 / 隱藏 _  住宿查詢
   const click_Show_LodgeQuery = ( ) => set_Show_LodgeQuery( !show_LodgeQuery ) ;

   // 點選 : 顯示 / 隱藏 _  住宿情形
   const click_Show_LodgeClendar = ( ) => set_Show_LodgeCalendar( !show_LodgeCalendar ) ;

   // 點選 : 顯示 / 隱藏 _  住宿價格
   const click_Show_LodgePrice = ( ) => set_Show_LodgePrice( !show_LodgePrice ) ;

   // --------------------------------------------------------------------------------

   // 取得 : 目前住宿資料
   useEffect(() => {

      set_LodgeInfo({ ...lodgeInfo , lodgeData : appointments } ) ;

   } ,[appointments] ) ;

   // 檢查 : 某房號，在某時間區段下，是否已被使用
   useEffect(( ) => {

       const { lodgeNumber , lodgeCheckIn_Date ,  lodgeCheckOut_Date } = lodgeInfo ;
       set_Is_Room_InUse( check_Is_Room_InUse( lodgeNumber , lodgeCheckIn_Date , lodgeCheckOut_Date , appointments ) ) ;

   } ,[ lodgeInfo ] ) ;


   return <>

            { /* 標題列  */ }
            <label className="label " style={{ fontSize : "1.3em" }} >

                <b className="tag is-large is-link" > <i className="fas fa-home"></i> &nbsp; 住 宿 </b> &nbsp; &nbsp; &nbsp;

                { /* 計算 _ 住房價格 */ }
                <b className = { `tag is-medium pointer is-rounded ${ show_LodgePrice ? 'is-black' : '' }` }  onClick = { click_Show_LodgePrice } >
                    <b className="relative" style={{fontSize:"10pt",top:"3px" }}> <i className="fas fa-calculator"></i> </b> &nbsp; 試算
                </b> &nbsp; &nbsp; &nbsp;

                { /* 查詢 _ 住房資料 */ }
                <b className = { `tag is-medium pointer is-rounded ${ show_LodgeQuery ? 'is-black' : '' }` }  onClick = { click_Show_LodgeQuery } >
                    <b className="relative" style={{fontSize:"10pt",top:"3px" }}> <i className="fas fa-search"></i></b> &nbsp; 查詢
                </b> &nbsp; &nbsp; &nbsp;

                { /* 檢視 _ 住房情形 */ }
                <b className = { `tag is-medium pointer is-rounded ${ show_LodgeCalendar ? 'is-black' : '' }` }   onClick = { click_Show_LodgeClendar } >
                    <b className="relative" style={{fontSize:"10pt",top:"2px" }} > <i className="far fa-calendar-alt"></i> </b> &nbsp; 檢視
                </b> &nbsp; &nbsp; &nbsp;

            </label> <br/>

            { /* 合約編號、房 型、房 號  */ }
            <div className="columns is-multiline is-mobile relative">

                <span className='absolute' style={{ top:'80px' , right:'130px' , fontSize:"10pt" }}> * 住宿期間，洗澡、美容 300 元 / 次 </span>

                { /* 合約編號 */ }
                <div className="column is-2-desktop">

                    <p> <b>合約編號</b> &nbsp; <b style={{ color:"red" }}> { errors.lodge_Room_Type?.message } </b> </p>

                    {/*<div className="control has-icons-left" >*/}
                    {/*    /!*<span className="icon is-small is-left"> <i className="fas fa-list-ol"></i> </span>*!/*/}
                        <input className="input" type="text" value="L_20210621_55"  { ...register( "lodge_Serial" ) } disabled={ true } />
                    {/*</div>*/}

                </div>

                <div className="column is-2-desktop">

                    <p> <b>性 質</b> </p>
                    <b className="f_13 m_Top_5 fGreen"> { lodgeInfo['lodgeCheckIn_Date'] === today ? '當日住宿' : '預約住宿' } </b>

                </div>

                { /* 房 型  */ }
                <div className="column is-2-desktop required">
                    <p> <b>房 型</b> &nbsp; <b style={{color:"red"}}> { errors.lodge_Room_Type?.message } </b> </p>
                    <div className="select">
                        <select { ...register( "lodge_Room_Type" ) }
                                onChange={ ( e ) => handle_Lodge_Type( e.target.value ) } >

                            <option value="請選擇"> 請選擇 </option>

                            {
                                lodge_Rooms.map( ( x : any , y : number )=>{
                                   return  <option key={ y } value={ x['type'] }> { x['type'] } </option>
                                })
                            }

                        </select>
                    </div>
                </div>

                { /* 房 號 */ }
                <div className="column is-2-desktop required">
                    <p> <b>房 號</b> &nbsp; <b style={{color:"red"}}> { errors.lodge_Room_Number?.message } </b> </p>
                    <div className="select">
                        <select { ...register( "lodge_Room_Number" ) }
                                onChange={ ( e ) => handle_Lodge_Number( e.target.value ) }  >

                               <option value="請選擇">請選擇</option>

                                {
                                   currentNumbers.map( (x,y)=>{
                                       return  <option key={ y } value={ x } > { x } </option>
                                   })
                                }

                        </select>
                    </div>
                </div>

                { /* 洗澡 */ }
                <div className="column is-1-desktop ">
                    <b> 洗 澡 </b>
                    <input className='input' type='number'{ ...register( "lodge_Bath" ) }  min="0" step="1" />
                </div>

                { /* 美容 */ }
                <div className="column is-1-desktop">
                    <b> 美 容 </b>
                    <input className='input' type='number'{ ...register( "lodge_Beauty" ) }  min="0" step="1" />
                </div>

            </div>

            { ( is_Room_InUse && !show_LodgeQuery ) &&

               <div className='has-text-centered' >
                 <br/>  <b className="tag is-medium is-danger"> <i className="fas fa-exclamation"></i> &nbsp;  所選擇房間，在目前時段下，已被使用 ( 詳細資訊，請點選 : 查詢 ) </b> <br/>
               </div>

            }

            <br/>

            { /* 住房/退房 : 日期、時間  */ }
            <div className="columns is-multiline  is-mobile">

                <div className="column is-1-desktop relative required">
                   <b className="absolute" style={{top:"20px"}}> 住房時間 : </b>
                </div>

                { /* 日期 */ }
                <div className="column is-2-desktop">

                    <p> <b style={{color:"red"}}> { errors.lodge_CheckIn_Date?.message } </b> </p>
                    <Date_Picker control         = { control }
                                 name            = "lodge_CheckIn_Date"
                                 default_Date    = { new Date }
                                 handle_OnChange = { ( value : any ) => handle_CheckIn_Date( value ) }  />

                </div>

                { /* 時間 */ }
                <div className="column is-2-desktop">

                    <p> <b style={{color:"red"}}> { errors.lodge_CheckIn_Time?.message } </b> </p>
                    <Time_Picker name            = "lodge_CheckIn_Time"
                                 control         = { control }
                                 handle_OnChange = { ( value : any ) => handle_CheckIn_Time( value ) } />

                </div>

                <div className="column is-1-desktop">  <span className="relative" style={{ top:"7px" }}> { '---------' } </span> </div>

                <div className="column is-1-desktop relative required">
                    <b className="absolute" style={{top:"20px"}}> 退房時間 : </b>
                </div>

                { /* 日期 */ }
                <div className="column is-2-desktop">

                    <p> <b style={{ color:"red" }}> { errors.lodge_CheckOut_Date?.message } </b> </p>
                    <Date_Picker control         = { control }
                                 name            = "lodge_CheckOut_Date"
                                 default_Date    = { new Date }
                                 handle_OnChange = { ( value : any ) => handle_CheckOut_Date( value ) } /> &nbsp;

                </div>

                { /* 時間  */ }
                <div className="column is-2-desktop">

                    <p> <b style={{color:"red"}}> { errors.lodge_CheckOut_Time?.message } </b> </p>
                    <Time_Picker name            = "lodge_CheckOut_Time"
                                 control         = { control }
                                 handle_OnChange = { ( value : any ) => handle_CheckOut_Time( value ) }  />

                </div>

            </div>

            { /* 住宿價格試算 */ }
            { show_LodgePrice &&

                <div className="columns is-multiline is-mobile">
                    <div className="column is-offset-1-desktop is-10-desktop relative">
                      <Lodge_Price { ...lodgeInfo } />
                    </div>
                </div>

            }

           { /* 住宿查詢 */ }
           { show_LodgeQuery &&  <Lodge_Query { ...lodgeInfo } />  }

           <br/>

            { /* 住宿情形 */ }
            { show_LodgeCalendar &&

                <div className="columns is-multiline is-mobile">
                   <div className="column is-12-desktop relative">
                       <Lodge_Calendar { ...lodgeInfo } />
                   </div>
                </div>

            }

            <hr/><br/>

          </>

} ;

export default React.memo( Lodge_Form , () => true ) ;