
import { useState , useEffect} from "react" ;
import { createContext } from "react" ;

// React Hook Form
import { useForm , useWatch , SubmitHandler , Controller } from "react-hook-form" ;

// 各分類標籤元件
import Create_Customer from "components/customers/edit/Create_Customer";
import Create_Pet from "components/pets/edit/Create_Pet";
import Create_Service from "components/services/edit/Create_Service";
import { yupResolver } from "@hookform/resolvers/yup";
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs";
import Create_Employee from "components/management/employee/edit/Create_Employee";
import Create_Price from "components/prices/edit/Create_Price";
import Create_Species from "components/management/setting/species/edit/Create_Species";
import Create_Other from "components/other/Create_Other";

// Interface
import { IService } from "utils/Interface_Type" ;
import Service_Info from "components/services/edit_components/Service_Info" ;

// Hook
import { useCreate_Data , useCreate_Customer_Relatives } from "hooks/ajax_crud/useAjax_Create";
import { useDispatch , useSelector } from "react-redux" ;
import { useHelper_Prices } from "hooks/data/usePrice"
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { useEmployee_Validator , useLodge_Validator , usePrice_Validator } from "hooks/data/useForm_Validator"
import { set_Side_Info } from "store/actions/action_Global_Layout"
import { get_Validator_Schema } from "containers/data_components/get_Validator_Schema"
import { get_Api_Msg_String } from "containers/data_components/get_Api_Msg_String"
import { useAdd_Data_Obj_Extra_Props } from "containers/data_components/Data_Obj_Extra_Props"
import { useMatch_Obj } from "containers/data_components/Condition_for_Currnet_Tab"
import Debug_Button from "templates/note/Debug_Button";




// 欲透過 Context 傳遞的 props 型別
interface ReachHookFormContext {

    register : any ,
    setValue : any ,
    watch    : any ,
    control  : any ,
    errors   : any ,
    isDirty  : any ,
    isValid  : any ,

    current  : string
   
}


// 建立欲傳遞 React Hook Form 的 Context
export const ReachHookFormContext = createContext<ReachHookFormContext>( {} as ReachHookFormContext ) ;


/* @ 新增資料 */
const Create_Data_Container = () => {

    const dispatch                              = useDispatch() ;

    // -------------------------------

    // * 新增提交按鈕 _ 是否有效啟用 ( 加上 : 自訂 _ 表單驗證邏輯 --> 因欲驗證值 / 邏輯，有些區塊無法僅透過 RHF 表單欄位值表示 )
    const [ disabled_Form , set_Disabled_Form ] = useState( true ) ;

    // 住宿 : 條件不符合 
    const lodge_Validator                       = useLodge_Validator() ;

    // 方案 : 包月洗澡 _ 條件不符 
    const invalid_To_Plan                       = useSelector( ( state : any ) => state.Form.invalid_To_Plan ) ;
   
    // 價格 : 條件不符合
    const price_Validator                       = usePrice_Validator() ;

    // 員工
    const invalid_To_Employee                   = useSelector( ( state : any ) => state.Form.invalid_To_Employee ) ;

    // 員工 : 工作人員 _ 條件不符
    const employee_Validator                    = useEmployee_Validator() ;

    
    // -------------------------------

    // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Species() ;

    // 目前點選 _ 新增項目 : 頁籤 ( Ex. 基礎、洗澡、美容 )
    const current    = useSelector( ( state : any ) => state.Service.current_Create_Tab  ) ;     

    // # 依照目前所點選 : 頁籤 ( current )，判斷 _ 是否顯示/符合條件
    const is_Obj     = useMatch_Obj( current ) ;

    // # 依照不同服務類型，切換 : 驗證條件
    let validator    = get_Validator_Schema( current ) ;


    // React Hook Form
    const { register , watch , setValue , handleSubmit , control , formState : { errors , isDirty , isValid } } =
                  useForm< IService >({
                                         mode     : "all" ,
                                         resolver : yupResolver( validator ) ,
                                      }) ;                                               

    // 欲傳遞屬性
    const props = {
                    register : register ,
                    setValue : setValue ,
                    watch    : watch ,
                    control  : control ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    
                    current  : current
                  }  ;

    const create_Data              = useCreate_Data() ;               // 新增 _ 一般資料
    const create_Cus_Relatives     = useCreate_Customer_Relatives() ; // 新增 _ 客戶關係人
    const add_Data_Obj_Extra_Props = useAdd_Data_Obj_Extra_Props() ;  // 新增 _ 提交資料物件( data ) 屬性、屬性值

    // 提交表單 ( IService 再確認 2021.07.23 )
    const onSubmit : SubmitHandler<IService> = ( data : any ) => {


        // 將 "寵物品種 pet_species 資料表 id"， 改為 : "寵物品種名稱"
        if( data['pet_Species'] && data['pet_Species'] !== '請選擇' ){  // 有寵物區塊欄位
            const pet        = petSpecies.filter( x => x['id'] === parseInt( data['pet_Species'] ) )[0] ;
            data.pet_Species = pet['name'] ;
        }

        // --------------------------------

        // 新增驗證 : 寵物欄位 ( 是否會咬人 )  2022.03.21 先取消
        // if( is_Obj.is_Check_Pet_Bite_Column && data['bite'] === null ){
        //     alert('請勾選 : 寵物是否會咬人選項') ;
        //     return false ;
        // }


        // 新增驗證 : 住宿
        if( current === '住宿' ){
            const bool = lodge_Validator( data ) ;
            if( !bool ) return false ;
        }

        // 新增驗證 : 價格 price_Validator
        if( current === '價格' ){
            const bool = price_Validator( data ) ;
            if( !bool ) return false ;
        }

        // 新增驗證 : 員工 ( 工作人員 ) 欄位
        if( current === '員工' && data['employee_Type'] === '工作人員' ){
            const bool = employee_Validator( data ) ;
            if( !bool ) return false ;
        }

        // --------------------------------

        // api : 新增資料 API 路徑 ( 並用以判斷 : 新增何種類型的資料  )  /  msg : 新增成功後訊息
        const { api , msg } = get_Api_Msg_String( current ) ;

        // 經處理後 ( 某些區塊，Ex. 基礎、洗澡... ，需額外附加 data 物件的屬性、屬性值 ) 提交新增的資料物件
        const submit_Data   = add_Data_Obj_Extra_Props( current , data ) ;

        // # 新增資料
        create_Data( api , submit_Data , msg ) ; // 所有資料

        // 僅針對 _ 客戶關係人 ( 再確認 2021.07.05 / 改為若有 "新增客戶" 情況下，即新增關係人 --> 寫在 useAjax_Create 中，目前以下條件判斷，容易漏掉  )
        if( is_Obj.is_Customer_Relatives ) create_Cus_Relatives( '/customers/store_relation' , data ) ;

        // # 關閉 _ 左側資訊面板 ( 右側滑動、遮罩，是否也統一集中於此 ?　09.06 )
        dispatch( set_Side_Info( false ) ) ;    // 開啟左側資訊面板
 
    } ;


    // 設定 _ 表單新增按鈕 : 驗證邏輯
    useEffect( ( ) => {

      const is_RHF_Valid = isValid ;  // React Hook Form 本身的驗證機制

      // # 決定 _ 提交按鈕是否有作用的 : 條件組合 [ RHF 本身 + 其他額外條件 ( Ex. invalid_To_Plan ) ]
      const is_Disabled_Form = !is_RHF_Valid || invalid_To_Plan || invalid_To_Employee  ;

      set_Disabled_Form( is_Disabled_Form ? true : false ) ;

    } , [ isValid , invalid_To_Plan , invalid_To_Employee ] ) ;

    return <>

             <Debug_Button />

             <ReachHookFormContext.Provider value = { props } >

                { /* 表單標籤 */ }
                <Edit_Form_Tabs />

                <hr/>

                <form onSubmit = { handleSubmit( onSubmit ) } className="m_Top_50">

                    { /* 服務單 : 基礎、洗澡、美容 */ }
                    { is_Obj.is_Show_Create_Service  && <Create_Service /> }

                    { /* 價格項目 */ }
                    { current === "價格" && <Create_Price    { ...props } />  }

                    { /* 品種項目 */ }
                    { current === "品種" && <Create_Species  { ...props } />  }

                    { /* 員工項目 */ }
                    { current === "員工" && <Create_Employee { ...props } />  }
                    
                    { /* 其他 */ } 
                    { current === "其他" && <Create_Other    { ...props } />  }
        
                    { /* 提交按鈕 */ }
                    <div className="has-text-centered m_Top_100"  >
                        <button disabled={ disabled_Form } type="submit" className="button is-primary is-medium">
                            新增{ current }
                        </button>
                    </div>

                </form>

             </ReachHookFormContext.Provider>

           </>

} ;

export default Create_Data_Container ;