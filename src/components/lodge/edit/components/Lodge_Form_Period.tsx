

import { FC , useState } from "react" ;
import Date_Picker from "templates/form/Date_Picker";
import Time_Picker from "templates/form/Time_Picker";
import moment from "moment";
import { set_Lodge_Check_In_Date , set_Lodge_Check_Out_Date } from "store/actions/action_Lodge"
import { useDispatch } from "react-redux";


type lForm = {
    control     : any ;
    setValue    : any;
    editType    : string | undefined ;
    serviceData : any ;
}


// @ 住宿期間 : 日期、時間 
const Lodge_Form_Period : FC< lForm > = ( { control  , setValue , editType , serviceData } ) => {

    const dispatch = useDispatch() ;
    const today    = moment( new Date ).format('YYYY-MM-DD') ;           // 今日

    const [ check_In_Date , set_Check_In_Date ]   = useState( today ) ;  // 住房日期
    const [ check_Out_Date , set_Check_Out_Date ] = useState( today ) ;  // 退房日期

    // 變更 : 住房日期
    const handle_CheckIn_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD' ) ; 

        // 所選擇日期( 轉換格式 )
        if( _date < today ){
            alert( '住房日期，不能早於今日' ) ;
            setValue( 'lodge_CheckIn_Date' , new Date ) ; // 設回今天
            return false ;
        }

        // 住房日期、晚於退房日期 --> 將退房日期，設為 _ 住房日期
        if( _date > check_Out_Date ){
            dispatch( set_Lodge_Check_Out_Date( _date ) )  ;  // Redux
            set_Check_Out_Date( _date ) ;                     // State         
            setValue( 'lodge_CheckOut_Date' , date ) ;        // Input
        } 

        // 設定 _ 住房日期
        dispatch( set_Lodge_Check_In_Date( _date ) ) ;
        set_Check_In_Date( _date ) ;

    } ;


    // 變更 : 退房日期
    const handle_CheckOut_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD' ) ; 

        // 日期檢查
        if( _date < check_In_Date ){
        
            alert('退房日期，不能早於住房日期') ;
            dispatch( set_Lodge_Check_Out_Date( _date ) )  ;  // Redux
            set_Check_Out_Date( _date ) ;                     // State    
            setValue( 'lodge_CheckOut_Date' , date ) ;        // 設為住房日期
          
            return false ;
        }

        // 設定 _ 退房日期 
        dispatch( set_Lodge_Check_Out_Date( _date ) )  
        set_Check_Out_Date( _date ) ;

    } ;

    // # 資料狀態
    const is_Create = editType !== '編輯' ;  // 新增
    const is_Update = editType === '編輯' ;  // 編輯

    const green     = "relative f_13 m_Top_5 fGreen" ;
    const t_6       = { top:"6px" } ;
    const time_t_6  = { top:"6px" , left:"-60px" } ;


  return    <>

                {/* 住 ( S ) : { check_In_Date } / 退 ( S ) : { check_Out_Date } */}
                   
                
                <div className="columns is-multiline is-mobile">

                    <div className="column is-1-desktop relative required">
                        <b className="absolute" style={{top:"20px"}} > 住房時間 : </b>
                    </div>

                    { /* 住房日期 */ }
                    <div className="column is-2-desktop">

                        { is_Create && <Date_Picker control         = { control }
                                                    name            = "lodge_CheckIn_Date"
                                                    default_Date    = { new Date }
                                                    handle_OnChange = { ( value : any ) => handle_CheckIn_Date( value ) }  />
                        }  

                        { is_Update && <b className={ green } style={ t_6 }> { serviceData.start_date } </b> }
                        
                    </div>

                    { /* 住房時間 */ }
                    <div className="column is-2-desktop">

                        { is_Create && <Time_Picker name    = "lodge_CheckIn_Time"
                                                    control = { control } />
                        }      

                        { is_Update && <b className={ green } style={ time_t_6 }> { serviceData.start_time } </b> }

                    </div>

                    <div className="column is-1-desktop"> { is_Create && <span className="relative" style={{ top:"7px" }}> { '----->' } </span> } </div> 

                    <div className="column is-1-desktop relative required">
                        <b className="absolute" style={{top:"20px"}}> 退房時間 : </b>
                    </div>

                    { /* 退房日期 */ }
                    <div className="column is-2-desktop">
        
                        { is_Create && <Date_Picker control         = { control }
                                                    name            = "lodge_CheckOut_Date"
                                                    default_Date    = { new Date }
                                                    handle_OnChange = { ( value : any ) => handle_CheckOut_Date( value ) } /> 
                        }         

                        { is_Update && <b className={ green } style={ t_6 }> { serviceData.end_date } </b> }                    

                    </div>

                    { /* 退房時間  */ }
                    <div className="column is-2-desktop">
                    
                        { is_Create && <Time_Picker name    = "lodge_CheckOut_Time"
                                                    control = { control }  />
                        }     

                        { is_Update && <b className={ green } style={ time_t_6 } > { serviceData.end_time } </b> }    

                    </div>

                </div>

            </>

    
} ;


export default Lodge_Form_Period
       