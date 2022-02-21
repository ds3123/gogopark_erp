import { FC , useState } from "react" ;
import moment from "moment";
import { set_Current_Lodge_Type , set_Current_Lodge_Number } from "store/actions/action_Lodge"
import { useDispatch, useSelector } from "react-redux";


type lodgeForm = {

    editType    : string | undefined ;
    errors      : any ;
    register    : any ;
    serviceData : any ;
    
}

// 房間 ( 房型 / 房號 )
const lodge_Rooms = [
                        { type : '大房' , number : [ 'A01' , 'A02' , 'A03' , 'A04' , 'A05'  ] } ,
                        { type : '中房' , number : [ 'B01' , 'B02' , 'B03' , 'B04' , 'B05'  ] } ,
                        { type : '小房' , number : [ 'C01' , 'C02' , 'C03' , 'C04' , 'C05'  ] } ,
                        { type : '大籠' , number : [ 'D01' , 'D02' , 'D03' , 'D04' , 'D05'  ] } ,
                        { type : '中籠' , number : [ 'E01' , 'E02' , 'E03' , 'E04' , 'E05'  ] } ,
                        { type : '小籠' , number : [ 'F01' , 'F02' , 'F03' , 'F04' , 'F05'  ] } ,
                    ] ;


// @ 住宿基本資訊欄位 : 合約編號、房型、房號  
const Lodge_Form_Info : FC< lodgeForm > = ( { editType , register , serviceData } ) => {

    const dispatch = useDispatch();
    const today    = moment( new Date ).format('YYYY-MM-DD') ;                                // 今日 
    
    const [ currentNumbers , set_CurrentNumbers ] = useState<any[]>([]) ;                     // 目前房型下，相對應的房號     
    const check_In_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ; // 住房日期
    

    // 下拉變動 : 房型
    const handle_Lodge_Type = ( type : string ) => {

        // 設定 : 房型
        dispatch( set_Current_Lodge_Type( type === '請選擇' ? '' : type ) ) ;

        // 清空房號   
        if( type === '請選擇' ){ set_CurrentNumbers( [] ) ; return false ;  }

        // 設定 _ 此房型所有房號
        lodge_Rooms.forEach( x => { if( x['type'] === type ) set_CurrentNumbers( x['number'] ) ; } ) ;

    } ;


    // 下拉變動 : 房號
    const handle_Lodge_Number = ( number : string ) => {

        dispatch( set_Current_Lodge_Number( number === '請選擇' ? '' : number ) ) ;

    } ;
    

    // # 資料狀態
    const is_Create = editType !== '編輯' ;  // 新增
    const is_Update = editType === '編輯' ;  // 編輯

    const blue      = { color : "rgb(30,30,180)" } ; 
    const green     = "f_13 m_Top_5 fGreen" ;
    const column    = "column is-2-desktop" ;


  return  <div className="columns is-multiline is-mobile relative">

                { /* 合約編號 */ }
                <div className={ column }>

                    <p> <b>合約編號</b> </p>

                    { is_Create && <input className="input" type="text" { ...register( "lodge_Serial" ) }  /> }

                    { is_Update && <b style={ blue } > { serviceData.contract_serial }  </b> }

                </div>

                <div className={ column }>

                    <p> <b>性 質</b> </p>

                    { is_Create && <b className={ green }> { check_In_Date === today ? '當日住宿' : '預約住宿' } </b> }

                    { is_Update && <b className={ green }> { serviceData.service_status } </b> }

                </div>

                { /* 房 型  */ }
                <div className={ `${ column } required` }>

                    <p> <b>房 型</b> </p>

                    { is_Create && 
                        <div className="select">
                            <select { ...register( "lodge_Room_Type" ) } onChange={ e => handle_Lodge_Type( e.target.value ) } >
                                <option value="請選擇"> 請選擇 </option>
                                { lodge_Rooms.map( ( x : any , y : number ) => <option key={ y } value={ x['type'] }> { x['type'] } </option> ) }
                            </select>
                        </div>
                    }    

                    { is_Update && <b className={ green }> { serviceData.room_type } </b> }

                </div>

                { /* 房 號 */ }
                <div className={ `${ column } required` }>

                    <p> <b>房 號</b> </p>
                    
                    { is_Create && 
                        <div className="select">
                            <select { ...register( "lodge_Room_Number" ) } onChange={ e => handle_Lodge_Number( e.target.value ) }  >
                                <option value="請選擇"> 請選擇 </option>
                                { currentNumbers.map( ( x : any , y : number ) => <option key={ y } value={ x } > { x } </option> ) }
                            </select>
                        </div>
                    }  

                    { is_Update && <b className={ green }> { serviceData.room_number } </b> }
                    
                </div>

         </div>
                 
} ;

export default Lodge_Form_Info
       