
import { FC , useEffect , useState } from "react"
import { get_Interval_Dates, get_Week_Day , get_InUse_Days ,  get_Date_Type , get_Date_Cal } from "utils/time/date";
import { ILodge , room_Type } from 'utils/Interface_Type'
import { ILodge_Data } from "utils/Interface_Type";
import moment from  "moment";
import { useSelector } from "react-redux"


// 房間 ( 房型 / 房號 )
interface ILodge_Rooms {
    type   : string ;
    number : string[] ;
}

// 房型價格
interface ILodge_Price{
    room_Type        : string ; // 房型
    ordinary_Day     : number ; // 平日
    ordinary_Holiday : number ; // 假日
    national_Holiday : number ; // 國定假日
}

// -------------------------------------


// 房間 ( 房型 / 房號 )
const lodge_Rooms : ILodge_Rooms[] = [
    { type : '大房' , number : [ 'A01' , 'A02' , 'A03' , 'A04' , 'A05'  ] } ,
    { type : '中房' , number : [ 'B01' , 'B02' , 'B03' , 'B04' , 'B05'  ] } ,
    { type : '小房' , number : [ 'C01' , 'C02' , 'C03' , 'C04' , 'C05'  ] } ,
    { type : '大籠' , number : [ 'D01' , 'D02' , 'D03' , 'D04' , 'D05'  ] } ,
    { type : '中籠' , number : [ 'E01' , 'E02' , 'E03' , 'E04' , 'E05'  ] } ,
    { type : '小籠' , number : [ 'F01' , 'F02' , 'F03' , 'F04' , 'F05'  ] } ,
] ;



// 房型價格 ( 平日、假日、國定假日 )
const lodge_Price : ILodge_Price[] = [

    { room_Type : '大房' , ordinary_Day : 800 , ordinary_Holiday : 900 , national_Holiday : 1000 } ,
    { room_Type : '中房' , ordinary_Day : 640 , ordinary_Holiday : 720 , national_Holiday : 800 } ,
    { room_Type : '小房' , ordinary_Day : 560 , ordinary_Holiday : 630 , national_Holiday : 700 } ,

    { room_Type : '大籠' , ordinary_Day : 480 , ordinary_Holiday : 540 , national_Holiday : 600 } ,
    { room_Type : '中籠' , ordinary_Day : 400 , ordinary_Holiday : 450 , national_Holiday : 500 } ,
    { room_Type : '小籠' , ordinary_Day : 320 , ordinary_Holiday : 360 , national_Holiday : 400 } ,

];


// 國定假日
const national_Holidays_Setting = [
    { title : '端午節' , date : '2021-06-14' }
] ;



const lodgeData : ILodge_Data[] = [

    {
        title       : 'A01 ( 大房 ) - 招財 ( 秋田犬 )' ,
        startDate   : new Date(2022 ,1 , 1 ) ,
        endDate     : new Date(2022 ,1 , 3 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A01'
    } ,

    {
        title       : 'A02 ( 大房 ) - DDD ( 獒犬 )' ,
        startDate   : new Date(2022 ,1 , 5 ) ,
        endDate     : new Date(2022 ,1 , 6 ) ,
        lodgeType   : '大房' ,
        lodgeNumber : 'A02'
    } ,

] ;



{ /* @ 住宿查詢、 */ }
const Lodge_Query : FC<ILodge> = () => {
    
   
    // const lodgeData      = useSelector( ( state : any ) => state.Lodge.lodge_Reservation_Data ) ;  // 已住房資料
   
    // # 目前欄位所選擇 :
    const lodgeType      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;   // 房型 ( 下拉 )
    const lodgeNumber    = useSelector( ( state : any ) => state.Lodge.current_Lodge_Number ) ; // 房號 ( 下拉 ) 

    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;  // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ; // 退房日期


    const [ lodge_Numbers , set_Lodge_Numbers ]               = useState<string[]>( [] ) ;      // 房型變動時，取得設定 : 所有房號

    const [ currentNumber_InUse , set_CurrentNumber_InUse ]   = useState<any[]>([]) ; // 所選擇的房號 _ 已被使用天數
    const [ current_Available , set_Current_Available ]       = useState<any[]>([]) ; // 所選擇的房號 _ 可被使用天數

    // 調整 _ 狀態為 ' 已使用' 房間的資訊 :
    const [ currentAdjust_Date , set_CurrentAdjust_Date ]     = useState( '' ) ; // 日期
    const [ currentAdjust_Number , set_CurrentAdjust_Number ] = useState( '' ) ; // 房號
    const [ currentAdjust_Price , set_CurrentAdjust_Price ]   = useState( 0 ) ;  // 價格


    // 點選 : 確認修改
    const click_Confirm_Adjust = () => {

        // 刪除 _ 已使用
        const _currentNumber_InUse = currentNumber_InUse.filter( x => x['date'] !== currentAdjust_Date ) ;
        set_CurrentNumber_InUse( _currentNumber_InUse ) ;

        //  加入 _ 修改後可使用陣列
        set_Current_Available( pre => [...pre , { date : currentAdjust_Date , type :'' , number : currentAdjust_Number , price : currentAdjust_Price }  ] )

    } ;

    // 檢查 : 某日期，是否已被使用
    const check_Date_InUse  = ( date : string , number : string , lodgeData : ILodge_Data[] ) : boolean => {

        let bool = false ;
        let num  = 0 ;

        // * 所選擇房號，已有被使用紀錄
        lodgeData.forEach( x => {

           if( x['lodgeNumber'] === number ){
              num += 1 ;
              const days_InUse = get_InUse_Days( x['startDate'] , x['endDate'] ) ;  // 該房號使用期間，所包含天數
              if( days_InUse.indexOf( date ) === -1 ) bool = true ;                 // 所檢查房號，沒有在已使用紀錄中
           }

        }) ;

        // * 所選擇房號，沒有被使用紀錄 ( 一律可以 )
        if( num === 0 ) return true ;

        return bool

    } ;

    // 變更 : 房號 ( for '已使用' )
    const handle_Lodge_Number = ( number : string , date : string  ) => {

        // 取得房號，相對應的房型
        let room_Type    = lodge_Rooms.filter(x => x['number'].indexOf( number ) !== -1 )[0]['type'] ;

        // 取得房型，相對應的價錢
        const price      = get_LodgeType_Price( date , room_Type as room_Type , lodge_Price ) ;

        // 設定 _ 目前選擇調整的 :
        set_CurrentAdjust_Date( date  ) ;      // 日期
        set_CurrentAdjust_Number( number  ) ;  // 房號
        set_CurrentAdjust_Price( price ) ;     // 價格

        // 檢查此房號，是否已被使用
        const isAvaiable = check_Date_InUse( date , number , lodgeData ) ;

        // 修改所選擇房號下，該日期相對應的價錢
        const _currentNumber_InUse = currentNumber_InUse.map( x => {
            if( x['date'] === date ) return { date : x['date'] , number : x['number'] , price : price , type : x['type'] , isAvaiable : isAvaiable } ;
            return x ;
        }) ;

        // 渲染畫面
        set_CurrentNumber_InUse( _currentNumber_InUse ) ;   // 已使用天數

    } ;

    // 將 lodge_Rooms，轉換為僅包含房號的陣列
    const get_Lodge_Numbers = ( lodge_Rooms : ILodge_Rooms[]) => {

        let arr = [] as any [] ;

        lodge_Rooms.forEach( x => {
            x['number'].forEach( y => { arr.push( y ) });
        });

        return arr ;

    } ;

    // 針對特定房型，在特定日期下，相對應的價格
    const get_LodgeType_Price = ( date : string , room_Type : room_Type , lodge_Price : ILodge_Price[]  ) => {

        let room_Price  = 0 ;
        const date_Type = get_Date_Type( date , national_Holidays_Setting ) ; // 日期屬於何種類型( 平日、假日、國定假日 )

        lodge_Price.forEach( x => {

            const is_Type = ( x['room_Type'] === room_Type ) ;

            if( is_Type && date_Type === '平日' )     room_Price = x['ordinary_Day'] ;
            if( is_Type && date_Type === '假日' )     room_Price = x['ordinary_Holiday'] ;
            if( is_Type && date_Type === '國定假日' ) room_Price = x['national_Holiday'] ;

        }) ;


        return room_Price ;

    } ;

    // 針對特定房號，取得相對應的房型
    const get_LodgeNumber_Type = ( number : string , lodge_Rooms : ILodge_Rooms[] ) => {

       let type = '' ;

        lodge_Rooms.forEach( x => {
           if( x['number'].indexOf(number) !== -1 ) type = x['type'] ;
        }) ;

       return type ;

    } ;


    // 取得 _ 所選擇房號、日期區段下日期 : 已使用、可使用
    useEffect( ( ) => {

        // 取得、設定 : 所有房號
        set_Lodge_Numbers( get_Lodge_Numbers( lodge_Rooms ) ) ;

        // 所選擇時間區段，所包含日期
        // 須先減 1 天 ( 再檢查 get_Interval_Dates 2021.06.28 )
        const _lodgeCheckIn_Date  = moment( get_Date_Cal( check_In_Date , -1 ) ).format('YYYY-MM-DD') ;
        const _lodgeCheckOut_Date = moment( get_Date_Cal( check_Out_Date , -1 ) ).format('YYYY-MM-DD') ;
        const selected_Days       = get_Interval_Dates(  _lodgeCheckIn_Date  , _lodgeCheckOut_Date ) ;

        // 先清空
        set_CurrentNumber_InUse([] ) ;
        set_Current_Available([] ) ;

        // -------------------------------------------------------------

        // * 設定房間資料( 房號、其使用日期 ) --> 已在使用過的紀錄中
        if( lodgeData && lodgeData.length > 0 ){

            let num  = 0 ;

            lodgeData.forEach( ( x : any ) => {

                // 所選擇房號，已有被使用紀錄
                if( lodgeNumber && x['lodgeNumber'] === lodgeNumber ){

                    num += 1 ;

                    // 該房號使用期間，所包含天數
                    const days_InUse = get_InUse_Days( x['startDate'] , x['endDate'] ) ;

                    // 篩選 :
                    const days_Selected_InUse    = selected_Days.filter( x => ( days_InUse.indexOf( x ) !== -1 ) ) ; // 已使用天數
                    const days_Selected_Avaiable = selected_Days.filter( x => ( days_InUse.indexOf( x ) === -1 ) ) ; // 可使用天數

                    // 轉換 : 物件陣列
                    const arr_InUse    = days_Selected_InUse.map( x => ( { date : x , number : lodgeNumber , price : get_LodgeType_Price( x , lodgeType as room_Type , lodge_Price ) , isAvaiable : false } ) ) ;
                    const arr_Avaiable = days_Selected_Avaiable.map( x => ( { date : x , number : lodgeNumber , price : get_LodgeType_Price( x , lodgeType as room_Type , lodge_Price )} ) ) ;

                    // * 設定 _ 所選擇的房號
                    set_CurrentNumber_InUse( arr_InUse ) ;   // 已使用天數
                    set_Current_Available( arr_Avaiable ) ;  // 可使用天數

                }

            });

            // 所選擇房號，沒有被使用紀錄 ( 全部可以 )
            if( num === 0 ){
                const arr_Avaiable = selected_Days.map( x => ( { date : x , number : lodgeNumber , price : get_LodgeType_Price( x , lodgeType as room_Type , lodge_Price )} ) ) ;
                set_Current_Available( arr_Avaiable ) ;  // 可使用天數
            }

        
        }

    } ,[ check_In_Date , check_Out_Date , lodgeNumber ]) ;



    return   <div className="columns is-multiline  is-mobile">


               <div className="column is-offset-1-desktop is-10-desktop">

                   { currentNumber_InUse.length > 0 &&
                       <b className="tag is-medium is-rounded is-danger">
                           <i className="fas fa-exclamation"></i> &nbsp; 請調整 : 已使用的房間的房號
                       </b>
                   }

                   { ( lodgeNumber && currentNumber_InUse.length === 0 && current_Available.length > 0 ) &&
                       <b className="tag is-medium is-rounded is-success">
                           <i className="fas fa-check"></i> &nbsp; 所有日期，皆可使用
                       </b>
                   }

               </div>

               { lodgeNumber &&

                   <div className="column is-offset-1-desktop is-10-desktop">

                     <table className="table is-fullwidth is-hoverable">

                       <thead>
                           <tr>
                               <th>  狀 態   </th>
                               <th>  日 期   </th>
                               <th>  房 號   </th>
                               <th>  價 格   </th>
                               { currentNumber_InUse.length > 0 &&  <th>  確 認   </th> }
                           </tr>
                       </thead>

                       <tbody>

                        { /* 已使用日期 */ }
                        {
                           currentNumber_InUse.map( ( x , y ) => {

                              return <tr key={y} >

                                       { /* 狀態 */ }
                                       <td> <b className="fDred" >已使用</b> </td>
                                       { /* 日期  */ }
                                       <td> <b className="tag is-medium is-danger is-light"> { x['date'] } ( { get_Week_Day( x['date'] ) } ) </b> </td>

                                       { /* 房號 */ }
                                       <td className="relative">

                                           <div className="select">
                                               <select defaultValue={ lodgeNumber } onChange={ ( e) => handle_Lodge_Number( e.target.value , x['date'] ) }>
                                                   <option value="請選擇"> 請選擇 </option>
                                                   {
                                                       lodge_Numbers.map( ( x , y) => {
                                                         return  <option key={ y } value={ x } > { x } ( { get_LodgeNumber_Type( x , lodge_Rooms ) } ) </option>
                                                       })
                                                   }
                                               </select>
                                           </div>

                                           &nbsp; &nbsp;

                                           { /* 所調整的房號，是否可以使用  */ }
                                           { x['isAvaiable'] ?
                                              <span className="absolute" style={{ top: '15px' , right : '30px' , color:'green' }}> <i className="fas fa-check-circle"></i> </span> : ''

                                           }

                                       </td>

                                       { /* 價格 */ }
                                       <td> <span className="relative" style={{top:"8px"}}> { x['price'] } </span> </td>

                                       { currentNumber_InUse.length > 0 &&

                                           <td>
                                               { x['isAvaiable'] || <b className= 'tag is-medium pointer'> 確認修改 </b> }
                                               { x['isAvaiable'] && <b className = 'tag is-medium pointer is-success' onClick = { click_Confirm_Adjust } > 確認修改 </b> }
                                           </td>

                                       }

                                     </tr>

                           } )

                        }

                        { /* 可使用日期 */ }
                        {
                           current_Available.map( ( x, y ) => {

                               return <tr key={y} >
                                        <td> <b className="fGreen" > 可使用</b>                         </td>
                                        <td> <b className="tag is-medium is-success is-light"> {x['date']} ( { get_Week_Day(x['date']) } ) </b> </td>
                                        <td> <b className="fGreen m_Top_5" > { x['number'] } ( { get_LodgeNumber_Type( x['number'] , lodge_Rooms ) } ) </b>  </td>
                                        <td>  <span className="relative m_Top_5">  { x['price'] }  </span>   </td>
                                       { currentNumber_InUse.length > 0 &&  <td></td> }
                                      </tr>

                           } )
                        }

                       </tbody>

                   </table>

                   </div>

               }

               { !lodgeNumber &&

                  <div className="column is-offset-1-desktop is-10-desktop">
                      <b className="tag is-warning is-medium is-rounded"> <i className="fas fa-comment-dots"></i> &nbsp; 請選擇 : 房型、房號，以查詢檔期。</b>
                  </div>

               }


               <br/><br/>

          </div>

} ;

export default Lodge_Query