import { FC , useEffect , useState , useMemo , useCallback } from 'react' ; 
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler , DayView , WeekView , MonthView , Appointments , DateNavigator ,  TodayButton , Toolbar, ViewSwitcher,} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment' ;
import { ILodge } from 'utils/Interface_Type'
import { useRead_All_Lodges } from "hooks/ajax_crud/useAjax_Read"


const today = moment( new Date ).format('YYYY-MM-DD') ;  // 今日


type ICalendar = {}


{ /* @ 住宿空間使用情形  */ }
const Lodge_Calendar : FC<ICalendar> = () => {

    const [ data , set_Data ] = useState<any[]>( [] ) ; // 目前住宿資料 ( for Calendar )
    const lodge_Data          = useRead_All_Lodges() ;  // 取得 _ 目前所有住宿資料

    // 轉換日期格式
    const convert_Date = useCallback( ( date : string , is_End : boolean ) => {

        const year  = parseInt( date.slice( 0 , 4 ) ) ; // 年
        const month = date.slice( 5 , 7 ) ;             // 月
        const day   = date.slice( 8 , 10 ) ;            // 日

        // 去掉 '0'
        const _month = month[0] === '0' ? parseInt( month[1] ) - 1 : parseInt( month ) - 1 ; 
       
        let _day ;
        if( !is_End ) _day = day[0] === '0' ? parseInt( day[1] ) : parseInt( day ) ; 
        if( is_End )  _day = day[0] === '0' ? parseInt( day[1] ) + 1 : parseInt( day ) + 1 ;  // 結束日期需加 1   
        
        return { year , _month , _day }   
    
    } , [] ) ; 



    
    // 轉換資料格式
    const convert_Data = ( lodge_Data : any[] ) => {

        const arr = lodge_Data.map( ( x : any ) => {

                       const service_Title = x['service_title'] ; // 標題
                       const room_Type     = x['room_type'] ;     // 房型
                       const room_Number   = x['room_number'] ;   // 房號 
                     
                       const { year : s_Year , _month : s_Month , _day : s_Day } = convert_Date( x['start_date'] , false ) ;
                       const { year : e_Year , _month : e_Month , _day : e_Day } = convert_Date( x['end_date'] , true ) ;

                       return {
                                title       : service_Title ,
                                startDate   : new Date( s_Year , s_Month , s_Day ) ,
                                endDate     : new Date( e_Year , e_Month , e_Day ) ,
                                lodgeType   : room_Type ,
                                lodgeNumber : room_Number    
                              }

                    })

        return arr             
    
    } ;


    // 設定 _ 住宿資料 ( for Calendar )
    useEffect( () => { 
           
      const data = convert_Data( lodge_Data ) ;
      set_Data( data ) ;

    } , [ lodge_Data ] ) ;

    return  <>

                  <Paper>

                    <Scheduler data={ data } height={ 640 } >

                        <ViewState defaultCurrentDate={ today } defaultCurrentViewName="Month" />

                        <MonthView />
                        <WeekView startDayHour={9} endDayHour={21} />
                        <DayView  startDayHour={9} endDayHour={21} />

                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <Appointments />

                    </Scheduler>

                 </Paper>

           </>

} ;

export default Lodge_Calendar