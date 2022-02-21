import { FC , useState , useEffect } from "react" ;

// React Hook Form
import { useForm } from "react-hook-form" ;
import Date_Picker from "templates/form/Date_Picker";
import moment from "moment";



type date = {
    checkIn_Date  : any 
    checkOut_Date : any
}


type date_Period = {
  get_Check_In_Date  : ( date : string ) => void ; // 取得 _ 住房日期
  get_Check_Out_Date : ( date : string ) => void ; // 取得 _ 退房日期
}



// 日期 ( 住房、退房日期 )
const Date_Period : FC<date_Period> = ( { get_Check_In_Date , get_Check_Out_Date } ) => {

    const { control , setValue } = useForm<date>({ mode : "all" }) ;     // React Hook Form

    const today = moment( new Date ).format('YYYY-MM-DD') ;              // 今日

    const [ check_In_Date , set_Check_In_Date ]   = useState( today ) ;  // 住房日期
    const [ check_Out_Date , set_Check_Out_Date ] = useState( today ) ;  // 退房日期


    // 變更 : 住房日期
    const handle_CheckIn_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD') ; 
    
        // 住房日期、晚於退房日期 --> 將退房日期，設為 _ 住房日期
        if( _date > check_Out_Date ){
            set_Check_Out_Date( _date ) ;         // State         
            setValue( 'checkOut_Date' , date ) ;  // Input
        } 

        // 設定 _ 住房日期
        set_Check_In_Date( _date ) ;

    } ;


    // 變更 : 退房日期
    const handle_CheckOut_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD') ; 

        // 日期檢查
        if( _date < check_In_Date ){
            alert('退房日期，不能早於住房日期') ;
            // 設為今日
            set_Check_Out_Date( check_In_Date ) ;
            setValue( 'checkOut_Date' , new Date( check_In_Date ) ) ; 
            return false ;
        }

        // 設定 _ 退房日期 
        set_Check_Out_Date( _date ) ;

    } ;


    // 讓父元件取得 _ 住房、退房日期
    useEffect( () => { 
    
        get_Check_In_Date( check_In_Date ) ;
        get_Check_Out_Date( check_Out_Date ) ;

    } , [ check_In_Date , check_Out_Date ] ) ;

    const date = { display : "block" , float : "left"  } as const ;

    return <>   

              <div style= { date }>

                <b> 住房日期 </b>   
                <Date_Picker control        = { control }
                            name            = "checkIn_Date"
                            default_Date    = { new Date }
                            handle_OnChange = { ( value : any ) => handle_CheckIn_Date( value ) }  />   

              </div>

              <div className="tag is-white relative" style={{ float:"left" , top:"30px" }}> ---- </div>

              <div style= { date }>

                <b> 退房日期 </b>   
                <Date_Picker control        = { control }
                            name            = "checkOut_Date"
                            default_Date    = { new Date }
                            handle_OnChange = { ( value : any ) => handle_CheckOut_Date( value ) }  />   
            
              </div>

           </> 

} ;


export default Date_Period
       