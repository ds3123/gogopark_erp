
import { useContext , useEffect , useState } from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {IService_Price} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema_Price} from "utils/validator/form_validator";
import Price_Form from "components/prices/edit/Price_Form" ;
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import {SidePanelContext} from "templates/panel/Side_Panel";
import axios from "utils/axios";
import cookie from "react-cookies";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";



const Update_Price = ( ) => {

    const dispatch                   = useDispatch() ;
    const history                    = useHistory() ;
    const value                      = useContext( SidePanelContext ) ;  // 取得 context 值
    const data                       = value.preLoadData ;               // 預載資料
    const source_Create_Way          = value.source_Create_Way ;         // 新增寵物價格方式 ( Ex. 依照 : 個別項目 or 寵物品種 )
    const service_prices             = data.service_prices ? data.service_prices : [] ;  // 品種 5 種價格資料 ( 初次洗澡、單次、.... / for 寵物品種 )
    const [ data_Id , set_Data_Id ]  = useState( '' ) ;                  // 資料表 id

    // React Hook Form
    const { register , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<IService_Price>({

            mode          : "all" ,
            resolver      : yupResolver( schema_Price ) ,
            defaultValues : {

                               /*
                               *
                               *   NOTE ~ 以下欄位 "預設值"，改在 【 Price_Form 】 中設定 :
                               *
                               *      # 指定品種     ( price_Species_Id ) -> 因其由 Ajax 取得資料
                               *
                               *      # 初次洗澡優惠 ( price_Fist_Bath )
                               *      # 單次洗澡     ( price_Single_Bath )
                               *      # 包月洗澡     ( price_Month_Bath )
                               *
                               *      # 單次美容     ( price_Single_Beauty )
                               *      # 包月美容     ( price_Month_Beauty )
                               *
                               */

                               price_Type          : data['service_type'] ,     // 服務類別
                               price_Plan          : data['service_plan'] ,     // 指定方案
                               price_Item          : data['service_name'] ,     // 服務名稱
                               price_Amount        : data['service_price'] ,    // 服務價格
                               price_Note          : data['note'] ,             // 備 註

                             }

        }) ;



    const props = {

                      register : register ,
                      setValue : setValue ,
                      errors   : errors ,
                      isDirty  : isDirty ,
                      isValid  : isValid ,

                      // source_Create_Way : source_Create_Way ,  // 新增寵物價格方式 ( Ex. 依照 : 個別項目 or 寵物品種 )
                      species_Id : data['species_id'] ,           // 寵物品種資料表(pet_species) id
                      data       : data

                   } ;


    // 更新函式
    const update_Data = useUpdate_Data() ;

    // 提交表單
    const onSubmit : SubmitHandler<IService_Price> = ( data : any ) => {

        /*
        *    NOTE
        *     1. 更新資料表為 : service_prices
        *     2. 因 【新增】價格時，包含 : 寵物品種、個別項目 2 種，【更新】價格時，也需採用不同更新方式
        *        (1) 寵物品種 : 需更新該品種下 5 筆價格資料 ( 新增時，一次 insert 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 5 筆資料 )
        *        (2) 個別項目 : 較單純、直接更新
        *
        */


        // * 更新 _ 寵物品種價格
        if( source_Create_Way === '寵物品種' ){

            // 取得 5 種價格物件
            const first_Bath    = service_prices.filter( ( x:any ) => x['service_name'] === '初次洗澡優惠價格' )[0] ;
            const single_Bath   = service_prices.filter( ( x:any ) => x['service_name'] === '單次洗澡價格' )[0] ;
            const month_Bath    = service_prices.filter( ( x:any ) => x['service_name'] === '包月洗澡價格' )[0] ;
            const single_Beauty = service_prices.filter( ( x:any ) => x['service_name'] === '單次美容價格' )[0] ;
            const month_Beauty  = service_prices.filter( ( x:any ) => x['service_name'] === '包月美容價格' )[0] ;

            // 重組 _ 欲更新的 id 與 欄位
            const obj_First_Bath    = { id : first_Bath['id']  ,   obj : { service_price : data['price_Fist_Bath'] ? data['price_Fist_Bath'] : 0  } } ;
            const obj_Single_Bath   = { id : single_Bath['id'] ,   obj : { service_price : data['price_Single_Bath'] ? data['price_Single_Bath'] : 0 } } ;
            const obj_Month_Bath    = { id : month_Bath['id']  ,   obj : { service_price : data['price_Month_Bath'] ? data['price_Month_Bath'] : 0 } } ;
            const obj_Single_Beauty = { id : single_Beauty['id'] , obj : { service_price : data['price_Single_Beauty'] ? data['price_Single_Beauty'] : 0 } } ;
            const obj_Month_Beauty  = { id : month_Beauty['id']  , obj : { service_price : data['price_Month_Beauty'] ? data['price_Month_Beauty'] : 0 } } ;

            let arr = [] ;
            arr.push( obj_First_Bath , obj_Single_Bath , obj_Month_Bath , obj_Single_Beauty , obj_Month_Beauty ) ;

            let count = 0 ;

            // 更新 5 種價錢
            arr.forEach( x => {

                 count++ ;

                 axios.put( `/service_prices/${ x['id'] }` , x['obj'] ).then( res => {

                     if( count === 5 ){

                         dispatch( set_Side_Panel( false , null , {} ) ) ;

                         cookie.save( 'after_Updated_Prices' , '價格管理_品種價格' , { path : '/' , maxAge : 5 } ) ;

                         history.push( "/wrongpath" );  // 錯誤路徑
                         history.push( "/management" ); // 正確路徑

                     }

                 }) ;

            }) ;

            toast( `🦄 價格更新成功`, { position: "top-left", autoClose : 1500 , hideProgressBar : false , closeOnClick : true } );

        }

        // * 更新 _ 個別項目價格
        if( source_Create_Way === '個別項目' ){

            update_Data( "/service_prices" , data_Id , data , "/management" , "服務價格" ) ;

        }

    } ;

    // 設定 _ 資料表 id
    useEffect( () => {

       set_Data_Id( data['id'] ) ;   // 資料表 id

    } , [] );



    return <form onSubmit = { handleSubmit( onSubmit ) } >

             { /* 標題 */ }
             <label className="label relative" > <i className="fas fa-dollar-sign"></i> &nbsp;價格資料 </label> <br/>
            
             <> 
                { /* 欄位表單 */ }  
                <Price_Form  { ...props } /> 
            
                { /* 提交按鈕 ( 有新增品種 5 向 ) */ }
                { ( ( source_Create_Way === '寵物品種' && service_prices.length > 0 ) || ( source_Create_Way === '個別項目' && service_prices.length === 0 ) ) &&
 
                    <div className="has-text-centered m_Top_50" >
                        <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                            提交表單 
                        </button>
                    </div> 

                }  
             </>

          </form>

} ;

export default Update_Price