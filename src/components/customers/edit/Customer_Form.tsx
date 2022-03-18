
import { FC , useEffect , useState , useContext } from "react"
import { ReachHookFormContext } from "containers/Create_Data_Container"
import { Input } from "templates/form/Input";
import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_Customer_By_Column } from "hooks/ajax_crud/useAjax_Read"

import useSection_Folding from "hooks/layout/useSection_Folding";

// Redux
import { useDispatch , useSelector, useStore } from "react-redux";
import { get_Current_Customer_Pets , set_Current_Customer_Pets , set_IsExisting_Customer ,
         set_Current_Customer_Name , set_Current_Customer_Id , get_Customer_Relatives 
       } from "store/actions/action_Customer";

import { set_Is_Show_Section_Pet } from "store/actions/action_Global_Layout"
import { get_Today } from "utils/time/date";
import { get_RandomInt } from "utils/number/number";
import Customer_Services_Records from "components/customers/edit/info/Customer_Services_Records"
import Customer_Types_Query from "components/customers/edit/info/Customer_Types_Query"
import { useFetch_Customer_Service_Records } from "hooks/data/useCustomer_Records"
import { Service_Type } from "utils/Interface_Type"
import { useVerify_Required_Columns_Customer } from "hooks/layout/useVerify_Columns"
import Customer_Relatives_Columns from "./info/Customer_Relatives_Columns";
import { useTocuh_Button_Numbers } from "hooks/layout/useTouch"


// 取得 _ 客戶所有服務資料 ( 傳遞給子元件 : <Customer_Services_Records /> )
const fetch_Data = ( current_Tab : string | undefined , customer_Id : string , fetch_Fun : any ) => {

     // 【 基礎 】
     if( current_Tab === '基礎' )  fetch_Fun( 'basics' , customer_Id ) ;

     // 【 洗澡 】 
     if( current_Tab === '洗澡' )  fetch_Fun( 'bathes' , customer_Id ) ;

     // 【 美容 】
     if( current_Tab === '美容' )  fetch_Fun( 'beauties' , customer_Id ) ;

}


interface ICustomer_Form {

    register  : any ;
    watch     : any ;
    setValue? : any ;
    errors    : any ;

    current?  : string ;

}


{ /* 客戶表單欄位 */ }
const Customer_Form : FC< ICustomer_Form >= ( { register , watch , setValue , errors , current } ) => {

    const dispatch = useDispatch() ;

    // # for 觸控輸入數字 ---------------------------------------------------------------------------

    // 是否顯示 : 觸控數字按鈕  
    const [ is_Show_NumButton , set_Is_Show_NumButton ] = useState( false ) ;

    // 存放
    const [ num_Arr , set_Num_Arr ] = useState<any[]>( [] ) ;


    // 取得、設定 _ 所點選數字
    const get_Tab_Numbers = ( num : number ) =>  set_Num_Arr( [ ...num_Arr , num.toString() ] ) ;


    // 清空 _ 所點選數字
    const clear_Number = () => {
        setValue( 'customer_Cellphone' , ''  ) ;
        set_Num_Arr( [] ) ;
    } ;

    // 觸控數字按鈕
    const { num_Buttons } = useTocuh_Button_Numbers( get_Tab_Numbers , clear_Number ) ;  

    // 觸控輸入手機號碼
    useEffect( () => { 

      if( num_Arr.length > 0 ){

         let num_Str = ''
         num_Arr.forEach( (x)=>{ num_Str +=x })
         setValue( 'customer_Cellphone' , num_Str  ) ;

         set_Query({ ...query , 'customer_Cellphone' : num_Str } ) ;
         set_IsQuerying( num_Str ? true : false ) ;  // 設定 _ 是否 "正在查詢" : 手機號碼
          
      }else{

        set_IsQuerying( false )

      }  

    } , [ num_Arr ] ) ;


    // # ---------------------------------------------------------------------------


    // # 監看 _ 必填欄位
    useVerify_Required_Columns_Customer( watch ) ;

    const { cus_Service_Records , fetch_Service_Records } = useFetch_Customer_Service_Records() ;

    // 收折區塊
    //const { is_folding , Folding_Bt } = useSection_Folding(current === '客戶' ? false : true ) ;
    const { is_folding , Folding_Bt }     = useSection_Folding( false ) ;

    // 是否已開始查詢 : 身分證字號、手機號碼
    const [ isQuerying , set_IsQuerying ] = useState( false ) ;

    // 查詢 _ 欄位
    const [ query , set_Query ]           = useState({
                                                         customer_Id        : '' , // 身分證字號
                                                         customer_Name      : '' , // 姓名
                                                         customer_Cellphone : ''   // 手機號碼
                                                      }) ;


    // # 以特定欄位，查詢 _ 客戶資料表 ( 確認是否有該客戶 )
    const { data : query_Result_Id }        = useRead_Customer_By_Column('id'           , query['customer_Id'] ) ;        // 身分證字號
    const { data : query_Result_CellPhone } = useRead_Customer_By_Column('mobile_phone' , query['customer_Cellphone'] ) ; // 手機號碼


    // 欄位變動處理 : 身分證字號、姓名、手機號碼
    const handle_Change = ( e : any ) => {

          // 設定 _ state
          const { name , value } = e.target ;
          set_Query({ ...query , [ name ] : value } ) ;

          // 設定 _ 是否 "正在查詢"  : 身分證字號、姓名、手機號碼
          if( name === 'customer_Id' || name === 'customer_Cellphone' ) set_IsQuerying(true ) ;
          if( name && !value ) set_IsQuerying( false ) ;

          // 設定 _ 目前填寫 : 客戶姓名 ( for 左側 _ 服務資訊參考面板 )
          if( name === 'customer_Name' ) dispatch( set_Current_Customer_Name( value ) ) ;

          // @ 查詢 _ 客戶相關紀錄 ---------------------

          // 設定 _ 客戶單，目前所填入客戶 _ 所有寵物 ( for 寵物表單，查詢客戶寵物用 )
          if( name === 'customer_Id' && value ){
              dispatch( get_Current_Customer_Pets( value ) ) ;
              dispatch( set_Current_Customer_Id( value ) ) ;
          }
        
          // # 以 "客戶身分證字號"，查詢 _ 在各種服務資料表單 ( 基礎 : basic、洗澡 : bath 、 美容 : beauty ) 相關紀錄 ------------------------------------
          if( name !== 'customer_Id' || !value ) return false ;   // Early Return 不符合以下需要條件

    } ;


    // 點選 _ 帶入舊客戶資料
    const set_Cus_Data = ( data : any ) => {

        // 取得 _ 客戶單，目前所填入客戶 _ 所有寵物 ( for 寵物表單，查詢客戶寵物用 )
        dispatch( get_Current_Customer_Pets( data['id'] ) ) ;

        // 取得 _ 客戶單，目前所填入客戶 _ 所有關係人
        dispatch( get_Customer_Relatives( data['id'] ) ) ;

        // 設定 _ 目前填寫 : 客戶身分證字號 ( for 服務紀錄面板 )
        dispatch( set_Current_Customer_Id( data['id'] ) ) ;

        // 設定 _ 目前填寫 : 客戶姓名 ( for 左側 _ 服務資訊參考面板 )
        dispatch( set_Current_Customer_Name( data['name'] ) ) ;

        // 設定 _ 顯示 : 寵物區塊 ( 新增表單 )
        dispatch( set_Is_Show_Section_Pet( true ) ) ; 
         
        // 取得 _ 客戶所有服務資料 ( 傳遞給子元件 : <Customer_Services_Records /> )
        fetch_Data( current , data['id'] , fetch_Service_Records ) ;

        const config = { shouldValidate : true , shouldDirty : true } ;

        // 客戶
        setValue( "customer_Id"        , data['id']           , config ) ;
        setValue( "customer_Name"      , data['name']         , config ) ;
        setValue( "customer_Cellphone" , data['mobile_phone'] , config ) ;
        setValue( "customer_Telephone" , data['tel_phone']    , config ) ;
        setValue( "customer_Line"      , data['line']         , config ) ;
        setValue( "customer_Email"     , data['email']        , config ) ;
        setValue( "customer_Address"   , data['address']      , config ) ;
        
        setValue( "customer_Sex"       , data['sex']          , config ) ;
        setValue( "customer_P_Note"    , data['note']         , config ) ;

    } ;

    // 設定 _ 隨機身分證字號
    const set_Random_Id = () => {

        const randomId = `C_${ get_Today() }_${ get_RandomInt(100) }` ;
        setValue( "customer_Id" , randomId , { shouldValidate: true  } ) ;

    } ;

    // 檢查 _ 資料庫是否有該客戶 ( 依 : 身分證字號 / 手機號碼 )
    useEffect( () => {

      // * 檢查 _ 資料庫中是否有該客戶紀錄( for 提交表單時，是否要新增該客戶 )
      if( query_Result_Id.length > 0 || query_Result_CellPhone.length > 0 ){
          dispatch( set_IsExisting_Customer(true ) ) ;
      }else{
          dispatch( set_IsExisting_Customer(false ) ) ;
      }

    } , [ query_Result_Id , query_Result_CellPhone ] ) ;

    useEffect( () => {

       // 清除還原 _ 目前客戶所擁有寵物標籤 ( 顯示於 : 寵物資料標題列 )
       dispatch( set_Current_Customer_Pets( [] ) ) ;

    } , [] ) ;

    // 取得 _ 客戶所有服務資料 ( 傳遞給子元件 : <Customer_Services_Records /> )
    useEffect( () => { 
    
      if( query['customer_Id'] ) fetch_Data( current , query['customer_Id'] , fetch_Service_Records ) ;

    } , [ current , query['customer_Id'] ] ) ;

    

    const nS = { left:"730px" , top:"58px" , zIndex:555 } as const ;


    return <div className="relative">

                { /* 數字按鈕( for 觸控輸入手機號碼 ) */ }  
                { is_Show_NumButton && num_Buttons } 

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em" }} >

                    <i className="fas fa-user"></i> &nbsp; 客戶資料

                    { Folding_Bt } { /* 收折鈕 */ }

                    { /* 過去服務紀錄、資料數 ( 基礎、洗澡、美容 )  */ }
                    <Customer_Services_Records current={ current as Service_Type } cus_Records={ cus_Service_Records }  />

                    { /*  顯示 _ 查詢客戶 : "身分證字號"、"手機號碼" 結果 ( 顯示 : 客戶姓名、新客戶 在標題列右上方 )  */ }
                    <Customer_Types_Query isQuerying={ isQuerying } query_Result_Id={ query_Result_Id } query_Result_CellPhone={ query_Result_CellPhone } set_Cus_Data={ set_Cus_Data } />

                </label> <br/>


                { /* 是否收折 : 客戶資料 */ }
                { is_folding ||

                   <>
                     { /* 顯示 : 數字按鈕  */ }  
                     <b className={ `tag is-medium absolute pointer ${ is_Show_NumButton ? 'is-success is-light' : 'is-white'  }` }
                       style={ nS } onClick = { () => set_Is_Show_NumButton( !is_Show_NumButton ) }> 
                         <i className="far fa-keyboard"></i> 
                     </b>

                     <div className="columns is-multiline  is-mobile relative">

                        <b className="tag is-light is-success absolute f_10 pointer" style={{ top:"8px",left:"180px" , zIndex:222 }} onClick={ set_Random_Id }>
                            自動產生
                        </b>

                        <Input type="text" name="customer_Id"        label="身分證字號" register={register} error={errors.customer_Id}        icon="fas fa-id-card-alt" asterisk={true} columns="3" onChange={ handle_Change} />
                        <Input type="text" name="customer_Name"      label="姓 名"      register={register} error={errors.customer_Name}      icon="fas fa-user" asterisk={true} columns="3" onChange={handle_Change} />
                        <Input type="text" name="customer_Cellphone" label="手機號碼"   register={register} error={errors.customer_Cellphone} icon="fas fa-mobile-alt" asterisk={true} columns="3" onChange={handle_Change} />
                        <Input type="text" name="customer_Telephone" label="家用電話"   register={register} error={errors.customer_Telephone} icon="fas fa-phone" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Line"      label="Line ID"   register={register} error={errors.customer_Line}      icon="fab fa-line" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Email"     label="E-mail"    register={register} error={errors.customer_Email}     icon="fas fa-envelope-open-text" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Address"   label="通訊地址"   register={register} error={errors.customer_Address}   icon="fas fa-home" asterisk={false} columns="6" />

                        <div className="column is-2-desktop">

                            <p> 性 別 &nbsp; <b style={{color: "red"}}> {errors.customer_Sex?.message} </b></p>

                            <div className="control has-icons-left">

                                <div className="select">
                                    <select {...register("customer_Sex")}  >
                                        <option value="請選擇">請選擇</option>
                                        <option value="男"> 男 </option>
                                        <option value="女"> 女 </option>
                                    </select>
                                </div>

                                <div className="icon is-small is-left">
                                    <i className="fas fa-venus-mars"></i>
                                </div>

                            </div>

                        </div>

                        <Input type="text" name="customer_P_Note"   label="備 註"   register={register} error={errors.customer_Note}   icon="fas fa-edit" asterisk={false} columns="10" />
                        
                     </div> <br/>


                     { /* 關係人欄位 */ }
                     <Customer_Relatives_Columns  current = { current } register = { register } setValue = { setValue }  />

                   </>

                }

           </div>

} ;

// export default React.memo( Customer_Form , () => true )
export default Customer_Form