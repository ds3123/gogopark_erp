import { useEffect } from "react"
import { useController } from "react-hook-form"
import DatePicker from "react-datepicker"
import moment from "moment"
import { set_Info_Column } from "store/actions/action_Info"
import { useDispatch } from "react-redux"


type DType = {

    control          : any ;
    name             : string ;
    default_Date?    : any ;
    handle_OnChange? : any ;      // 自訂 onChange 函式

}

// 配合 React-Hook-Form，製作可重複使用 _ 日期套件
const Date_Picker = ( { control , name , default_Date , handle_OnChange } : DType ) => {

    const dispatch = useDispatch() ;

    
    const { field : { onChange , value } } = useController({
                                                             name ,
                                                             control ,
                                                             rules        : { required : true },
                                                             defaultValue : default_Date ,
                                                           }) ;

    // 自訂、由屬性注入的 onChange 函式
    const handle_External_OnChange = ( value : any ) => {

        if( handle_OnChange )  handle_OnChange( value ) ;  // 如果有定義 onChange 屬性

    } ;


  
    useEffect(() => {


        // 所選擇日期
        const p_Date = moment( value ).format('YYYY-MM-DD' ) as any ;    
        
        // 服務日期( 到店日期 ) / 安親開始日期
        if( name === "service_Date" || name === "care_Start_Date" ) dispatch( set_Info_Column( "service_Date" , p_Date ) ) ;   
        
        

    } ,[ value ] ) ;


    const dStyle = { width  :"150px" , zIndex:"10" } as any ;


    return <div className="control has-icons-left" style={dStyle}>

                <span className="icon is-small is-left"> <i className="far fa-calendar-alt"></i> </span>

                <DatePicker className = "input"
                            onChange  = {
                                           e => {
                                                  onChange(e) ;                   // useController 內建 _傳送所擷取到的值
                                                  handle_External_OnChange( e ) ; // 自訂 onChange 處理
                                                }  
                                        }
                            selected  = { value } />

           </div>


} ;

export default Date_Picker