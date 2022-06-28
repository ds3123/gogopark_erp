
import { useEffect , useState } from "react" ;
import { useRead_Qcode_Service_Date } from "hooks/ajax_crud/useAjax_Read";

// Redux
import { useDispatch } from "react-redux";
import { set_Current_Q_Code } from "store/actions/action_Info"


// 建立 _ 預設 : Q 碼編號 ( 1 ~ 60 )
let default_Q_arr = [] as any[] ;

for( let i = 1 as any ; i <= 60 ; i++ ){
    if( i<10 ){ i = '0'+i ; }                 // 小於 10 , 加 "0"
    default_Q_arr.push( i.toString() ) ;
}

/*
*
*   # 表單提交時，Q 碼下拉選單值，改由 Redux 傳送 ~
*     * 原先為欄位 shop_Q_Code，透過 React Hook Form 傳遞 。但因一開始載入，"讀不到值"，遂改為 Redux 傳遞至 Create_Data_Container
*
*/

const Qcode_Select_Options = ( ) => {

    const dispatch = useDispatch();

    // 特定日期 ( 日期由 Redux 取得 )，所有服務，"已被使用" 的 Q 碼
    const Qcodes_Used_By_Date                   = useRead_Qcode_Service_Date() as string[] ;

    // 可供使用的 Q_code
    let [ available_Qcode , set_Ava_Q ]         = useState<any[]>([] );

    // 目前所選擇 Qcode
    const [ current_Qcode , set_Current_Qcode ] = useState( '' ) ;


    // 變動處理
    const handle_Change = ( qCode : string ) => {

        set_Current_Qcode( qCode ) ;
        dispatch( set_Current_Q_Code( qCode ) );

    } ;

    useEffect( () => {

        // 取得 : 當天 /  目前可供使用 Q 碼
        const avaiable_Q_Arr = default_Q_arr.filter( x => Qcodes_Used_By_Date.indexOf( x ) === -1 ) ;

        set_Ava_Q( avaiable_Q_Arr ) ;

    } ,[ Qcodes_Used_By_Date ] ) ;


    useEffect(( ) => {

       // 設定 _ Q 碼初始值
       set_Current_Qcode( available_Qcode[0] ) ;

       // 設定 _ Redux ( 供 Create_Data_Container 提交時，設定 shop_Q_Code 欄位用 )
       if( current_Qcode ) dispatch( set_Current_Q_Code( available_Qcode[0] ) );


    } , [ available_Qcode ] ) ;


    const way = {  fontSize : "11pt" , top : "-3px" , fontWeight : "bold" , color : "rgb(150,0,0)"  } as const ;

    return  <div className="tag is-large is-white">

                <span> 到店處理碼 ( Q ) : </span> &nbsp;
                <div className="select is-small" >

                   <select  style = { way }  onChange = { e => handle_Change( e.target.value ) } >
                       {
                         available_Qcode.length > 0 &&
                            available_Qcode.map( ( x , y) => <option key={ y } value={ x } > { x } </option> )
                       }
                   </select>

                </div>

             </div>

} ;

export default Qcode_Select_Options