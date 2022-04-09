
import { useEffect , useState , useMemo } from "react"
import { get_H_M } from "utils/time/time";

// Hook ( Ajax )
import { useCreate_TimeRecord } from 'hooks/crud/create/useCreate_TimeRecord'
import { useDelete_TimeRecord } from 'hooks/ajax_crud/useAjax_Delete'
import { useSelector } from "react-redux";
import { useRead_TimeRecord_By_Id_Button } from "hooks/ajax_crud/useAjax_Read";
import axios from "utils/axios";


/*  @ 美容區頁面 : 美容師點選 _ 洗澡時間按鈕 */

const useBath_Time_Button = ( tag : string , required? : boolean ) => {


    // 資料庫中，某服務單，已有的點選時間紀錄
    const Existing_Time_Records = useSelector( ( state : any ) => state.Beautician.Existing_Time_Records ) ;

    // 目前處理 _ 美容師姓名
    const current_Beautician    = useSelector(( state : any ) => state.Beautician.Current_Beautician ) ;

    // 目前所點選 _ 寵物資訊
    const current_Service       = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;

    // 目前所點選 _ 寵物資訊 : 資料表 id
    const [ current_Service_Id , set_Current_Service_Id ] = useState('') ;


    // 初始時間
    const [ time , set_Time ] = useState('00 : 00') ;
    const [ user , set_User ] = useState( '' ) ;


    // 時間紀錄函式
    const create_TimeRecord = useCreate_TimeRecord();  // 新增
    const delete_TimeRecord = useDelete_TimeRecord();  // 刪除

    // 點選 _ 時間按鈕 : 設定時間、美容師
    const click_Time = ( user : string ) => {

      let _user = user ? user : '測試員' ; // 若非美容師點選，資料表欄位 beautician 設為 '測試員'

      if( time === '00 : 00' ){  // 點選

          set_User( _user ) ;
          set_Time( get_H_M() ) ;

          // 新增 _ 時間紀錄
          create_TimeRecord( current_Service_Id , current_Service['service_type'] , tag , get_H_M() , _user ) ;

      }else{                    // 取消

          set_User('' ) ;
          set_Time('00 : 00' ) ;

          // 刪除 _ 時間紀錄
          delete_TimeRecord( current_Service_Id , tag );

      }

    } ;


    const name = { top : '8px' , right : '-50px' , color : 'rgba(0,0,0,.5)' } ;


    // 設定 _ 目前所點的服務，其資料表 Id
    useEffect(( ) => {

        // * 先清除 _ 既有紀錄 ( 在左側切換服務持單時 )
        set_User( '') ;         // 所點選的美容師姓名
        set_Time( '00 : 00' ) ; // 時間按鈕


        // * 設定 _ 目前所點的服務，其資料表 Id
        let service_Id : any  ;  // 服務單資料表 id

        switch( current_Service['service_type'] ){
            case '基礎' : service_Id = current_Service['basic_id']  ; break ;
            case '洗澡' : service_Id = current_Service['bath_id']   ; break ;
            case '美容' : service_Id = current_Service['beauty_id'] ; break ;
        }

        set_Current_Service_Id( service_Id ) ;


        // * 設定 _ 是否已有點選時間紀錄 ----------------------

        // 取得、設定 _ 先前已點選時間紀錄
        const is_Exist = Existing_Time_Records.filter( ( x:any ) => ( x['button_name'] === tag && x['service_table_id'] === current_Service_Id.toString() ) )[0] ;

        if( is_Exist ){
            set_User( is_Exist['beautician'] ) ;
            set_Time( is_Exist['button_time'] ) ;
        }else{
            set_User( '' ) ;
            set_Time( '00 : 00' ) ;
        }


    } ,[ current_Service , Existing_Time_Records ] ) ;

    const tagStyle = { marginBottom : "15px" , position : "relative"  } as any ;

    const time_Tag = <span style   = { tagStyle }
                         className = { `tag relative is-large pointer ${ ( time !== '00 : 00'  ) ? 'is-link is-light' : 'hover' }` }
                         onClick   = { () => click_Time( current_Beautician ) } >

                         <b className = 'absolute f_10' style = { name } > { user } </b>  { /* 點選者 */ }

                         { required &&  <b className = 'absolute fRed' style = {{ left:"-13px" , top:"-13px" }} > * </b> }  { /* 必點選星號 */ }

                         { time }

                      </span> ;


    return { time_Tag , time }

} ;

export default useBath_Time_Button ;
