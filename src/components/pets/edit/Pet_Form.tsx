import { FC , useEffect , useState } from "react"

import { Edit_Form_Type } from "utils/Interface_Type"
import { Input } from "templates/form/Input";
import { useRead_Sort_Species } from "hooks/ajax_crud/useAjax_Read";

import useSection_Folding from "hooks/layout/useSection_Folding" ;

// Redux
import { useDispatch , useSelector } from "react-redux";
import { set_IsExisting_Pet , 
         set_Current_Species_Select_Id , 
         set_Current_Pet_Size , 
         get_Current_Pet_Species_Num ,
         set_Pet_Serial_Input ,
         get_Pet_Service_Records , 
         set_Current_Pet
        } from "store/actions/action_Pet" ;

import { set_Is_Show_Section_Services } from "store/actions/action_Global_Layout"
import Customer_Pets from "components/pets/edit/info/Customer_Pets";
import Pet_Services_Records from "components/pets/edit/info/Pet_Services_Records";
import { useVerify_Required_Columns_Pet } from "hooks/layout/useVerify_Columns" 
import { Service_Type } from "utils/Interface_Type"
import { set_Pet_Service_Records } from "store/actions/action_Pet"

import Pet_Prices_Status from "components/pets/edit/info/Pet_Prices_Status"



type serviceType = '基礎' | '洗澡' | '美容' | '安親' | '住宿'


{ /* 寵物表單欄位  */ }
const Pet_Form : FC< Edit_Form_Type > = ( { register , watch , setValue , errors , current  , pet_Species_id , pet_Serial } ) => {

    const dispatch = useDispatch() ;

    // 是否顯示 : 詳細選項
    const [ is_Detial , set_Is_Detial ] = useState( current ? false : true ) ;

    // 寵物序號
    const [ pet_Num , set_Pet_Num ] = useState( '' ) ;

    // 寵物品種名稱
    const [ pet_Species_Name , set_Pet_Species_Name ] = useState( '' ) ;

    // # 監看 _ 必填欄位
    useVerify_Required_Columns_Pet( watch ) ;

    // 目前 資料表中( pet ) 已有某 "寵物品種" 數量
    const current_Pet_Species_Num = useSelector( ( state : any ) => state.Pet.current_Pet_Species_Num ) ;

    // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Sort_Species() ;

    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;

    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets = useSelector( ( state : any ) => state.Customer.Current_Customer_Pets ) ;

    // 變動處理 _ "品種" 下拉選單 
    const get_Species_Id = ( species_Id : string ) => { 
  
       // 設定 _ 寵物品種 : 序號、名稱 
       const mPet = petSpecies.filter( x => x['id'] === parseInt( species_Id ) )[0] as any ;  // 篩選出該寵物 
       
       if( mPet ){
         set_Pet_Num( mPet['serial'] ) ;                                                         
         set_Pet_Species_Name( mPet['name'] ) ;
       }else{
         set_Pet_Num( '' ) ; 
       }

       // 先清空特定寵物的服務紀錄 ( 避免殘留，影響 Pet_Services_Records.tsx 中的 service_Records  )
       dispatch( set_Pet_Service_Records( [] ) ) ;
       
       // 設定 _ 目前下拉選擇的品種 Id ( store )
       dispatch( set_Current_Species_Select_Id( species_Id ) ) ;  

    } 
        
    // 變動處理 _ "體型" 下拉選單
    const get_Pet_Size = ( size : string ) => dispatch( set_Current_Pet_Size( size ) ) ;


    // 帶入 _ 寵物欄位舊資料
    const fill_Pet_Columns = ( pet : any ) => {
        
        // * 取得 _ 該寵物 pet_species 資料表資料 ( 為取得品種 id )
        const _pet   = petSpecies.filter( x => x['name'] === pet['species'] )[0] ; 
        const config = { shouldValidate : true , shouldDirty : true } ;

        // 基本資料
        setValue( "pet_Serial"   , pet['serial']  , config ) ;
        setValue( "pet_Name"     , pet['name']    , config ) ;

        setValue( "pet_Species"  , _pet ? _pet['id'] : '' , config ) ;

        setValue( "pet_Sex"      , pet['sex']     , config ) ;
        setValue( "pet_Color"    , pet['color']   , config ) ;
        setValue( "pet_Weight"   , pet['weight']  , config ) ;
        setValue( "pet_Age"      , pet['age']     , config ) ;
        setValue( "pet_Size"     , pet['size'] ? pet['size'] : '請選擇' , config ) ;

        // 調查資料 ( 單選 )
        setValue( "injection" , pet['injection'] , config ) ;
        setValue( "flea"      , pet['flea']      , config ) ;
        setValue( "ligate"    , pet['ligate']    , config ) ;
        setValue( "chip"      , pet['chip']      , config ) ;
        setValue( "infection" , pet['infection'] , config ) ;
        setValue( "together"  , pet['together']  , config ) ;
        setValue( "drug"      , pet['drug']      , config ) ;
        setValue( "bite"      , pet['bite']      , config ) ;

        // 調查資料 ( 複選 : 轉為陣列 ) 
        setValue( "health"       , pet['health']       ? pet['health'].split(',')       : [] , config ) ;
        setValue( "feed"         , pet['feed']         ? pet['feed'].split(',')         : [] , config ) ;
        setValue( "toilet"       , pet['toilet']       ? pet['toilet'].split(',')       : [] , config ) ;
        setValue( "ownerProvide" , pet['ownerProvide'] ? pet['ownerProvide'].split(',') : [] , config ) ;

        // 備註
        setValue( "pet_Note" , pet['note'] , config ) ;


    } ;  


    // 點選 _ 寵物按鈕
    const click_Pet_Button = ( pet : any ) => {
    
        // * 取得 _ 該寵物 pet_species 資料表資料 ( 為取得品種 id )
        const _pet   = petSpecies.filter( x => x['name'] === pet['species'] )[0] ;
        const pet_Id = _pet ? _pet['id'] : '' ;
        
        // 帶入 _ 寵物欄位舊資料
        fill_Pet_Columns( pet ) ;

        // 查詢 _ 該寵物特定服務的紀錄
        dispatch( get_Pet_Service_Records( current as serviceType , pet['serial'] , pet_Id ) ) ;

        // 設定 : 目前所點選 : 寵物
        dispatch( set_Current_Pet( pet ) ) ;

        // 設定 : 資料庫，有 _ 該寵物
        dispatch( set_IsExisting_Pet( true ) ) ;

        // for Summary_Fee 付款方式為 "包月洗澡"、"包月美容" 時，設定 _ 所選擇品種 ( 資料表 id )
        dispatch( set_Current_Species_Select_Id( pet_Id ) ) ;

        // 設定 _ 顯示 : 服務整體區塊 ( 新增表單 )
        dispatch( set_Is_Show_Section_Services( true ) ) ;    

    } ;


    // 點選 _ 顯示詳細選項
    const click_Detail_Mode = ( bool : boolean ) => set_Is_Detial( !bool )
  

    // 設定 _ 寵物編號 ( for【 新增 】 )
    useEffect( () => {

        if( current && pet_Num ){

           // 設定 store : 資料庫，沒有 _ 該寵物
           dispatch( set_IsExisting_Pet( false ) ) ; 

           // 設定 _ 寵物編號 
           dispatch( set_Pet_Serial_Input( pet_Num , current_Pet_Species_Num , setValue ) ) ;

        }

        // 新增狀態，且下拉品種為 "請選擇" --> 清空寵物編號
        if( current && !pet_Num ) setValue( "pet_Serial" , "" ) ;
        

    } , [ pet_Num , current_Pet_Species_Num ] ) ;


    useEffect( () => { 
    
      if( pet_Species_Name ){

         dispatch( get_Current_Pet_Species_Num( pet_Species_Name ) ) ;

      }  

    } , [ pet_Species_Name ] ) ;

    /*
         # 【 編輯 】設定 : " 品種 " 下拉選項( Ajax 取得 )
           * 因 Pet_Form 載入時，Ajax 資料尚未取得( 若以 React Hook Form 的 defaultValues，無法成功設定 _ 預設值 )
           * 需取得資料後，再以 setValue() 單獨設定預設值
    */
    useEffect( () => {

       if( !current && pet_Species_id ){

           // 延後 300 ms 設定 _ 品種預設值
           setTimeout( () => {

              setValue( 'pet_Species' , pet_Species_id ,  { shouldValidate : true }  ) ;

           } , 300 ) ;

       }

    } , [ pet_Species_id ] ) ;


   return <>
               <hr/>

               { /* 寵物基本資料 */ }
               <label className="label m_Top_70">

                   <i className="fas fa-dog"></i> &nbsp; 寵物資料

                   { Folding_Bt } { /* 收折鈕 */ } &nbsp; &nbsp;

                   { /* 寵物服務紀錄 */ }  
                   <Pet_Services_Records current = { current as Service_Type } />  

                   { /* 客戶所有寵物 */ }
                   <Customer_Pets current={ current } current_Customer_Pets={ current_Customer_Pets } click_Pet_Button = { click_Pet_Button } />

               </label> <br/>

               { /* 是否收折 */ }
               { is_folding ||

                   <>

                       <div className="columns is-multiline  is-mobile">

                            { /* 名字 */ }
                            <Input type="text" name="pet_Name" label="名 字" register={register} error={errors.pet_Name}
                                   icon="fas fa-paw" asterisk={true} columns="3" />

                            { /* 品種 */ }
                            <div className="column is-3-desktop required">

                               <p> 品 種 &nbsp; <b className="fRed"> {errors.pet_Species?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">

                                       <select { ...register("pet_Species") } onChange={ e => get_Species_Id( e.target.value  ) } >

                                           <option value="請選擇"> 請選擇 </option>
                                           {
                                               petSpecies.map( ( x , y ) => <option value = { x['id'] } key = { y } >
                                                                               { x['serial'] } _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                                            </option> 

                                                             )
                                           }

                                       </select>

                                   </div>

                                   <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                               </div>

                            </div>

                            { /* 編號 */ }
                            <div className=  'column is-4-desktop required'  >

                               <p className="relative"> 編號 ( 由左側 <b>品種</b> 下拉選項自動產生 )  </p>

                               { current &&

                                    <div className="control has-icons-left" >
                                        <span className="icon is-small is-left"> <i className="fas fa-list-ol"></i> </span>
                                        <input className="input" type='text' { ...register( 'pet_Serial' ) } />
                                    </div>

                               }

                                { !current &&

                                      <b className="fDblue f_13 relative" style={{ top:"3px" }}> { pet_Serial } </b>

                                }

                            </div>

                            { /* 性別  */ }
                            <div className="column is-2-desktop">

                               <p> 性 別 &nbsp; <b style={{color: "red"}}> {errors.pet_Sex?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">
                                       <select {...register("pet_Sex")}  >
                                           <option value="請選擇">請選擇</option>
                                           <option value="公">公</option>
                                           <option value="母">母</option>
                                           <option value="不確定">不確定</option>
                                       </select>
                                   </div>

                                   <div className="icon is-small is-left">
                                       <i className="fas fa-venus-mars"></i>
                                   </div>

                               </div>

                            </div>

                            <Input type="text"   name="pet_Color"  label="毛 色"      register={register} error={errors.pet_Color}
                                    icon="fas fa-eye-dropper" asterisk={false} columns="3" />

                            <Input type="number" name="pet_Age"    label="年 紀 (歲)" register={register} error={errors.pet_Age}
                                    icon="fas fa-pager"       asterisk={false} columns="3" />

                            <Input type="number" name="pet_Weight" label="體 重 (kg)" register={register} error={errors.pet_Weight}
                                    icon="fas fa-weight"      asterisk={false} columns="3" />


                            { /* 體型 */ }
                            <div className="column is-3-desktop">

                               <p> 體 型 &nbsp; <b className="fRed"> {errors.pet_Size?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">

                                       <select {...register("pet_Size")} onChange = { ( e ) => get_Pet_Size( e.target.value ) }>
                                           <option value="請選擇"> 請選擇                   </option>
                                           <option value="小型犬"> 小型犬 ( 3 kg 以下 )     </option>
                                           <option value="中型犬"> 中型犬 ( 3-10 kg )       </option>
                                           <option value="大型犬"> 大型犬 ( 11-15 kg )      </option>
                                           <option value="特大型犬"> 特大型犬 ( 16 kg 以上 ) </option>
                                       </select>

                                   </div>

                                   <div className="icon is-small is-left"> <i className="fas fa-expand"></i> </div>

                               </div>

                            </div>

                       </div>

                       <br/>
                    
                       { /* Radio 單選 */}
                       <div className="columns is-multiline  is-mobile">

                           <div className="column is-11-desktop required">

                               <b className="fDred relative">
                                   <b className="fRed absolute" style={{ top:"-25px" }}> {errors.bite?.message} </b>
                                   是否會咬人 :
                               </b> &nbsp;
                               <input type="radio" value="會"     {...register("bite")} /> 會    &nbsp; &nbsp;
                               <input type="radio" value="不會"   {...register("bite")} /> 不會  &nbsp; &nbsp;
                               <input type="radio" value="不一定" {...register("bite")} /> 不一定，須小心  &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("bite")} /> 不確定

                                

                           </div>

                           <div className="column is-1-desktop ">

                           <b className="f_18 relative pointer" style={{  top:"-5px" }} onClick={ () => click_Detail_Mode( is_Detial ) }>
                                { is_Detial  && <i className="fas fa-toggle-on"></i>   }
                                { !is_Detial && <i className="fas fa-toggle-off"></i>  }
                            </b>   
                           
                           
                           </div>

                       </div>


                       { /* 寵物價格 ：標準、個別定價  */ }
                       { pet_Serial && 
                           <> 
                              <Pet_Prices_Status register = { register } setValue = { setValue } /> <br/>
                           </>  
                       }
                      
                       { is_Detial &&
                       
                            <>

                                    <div className="columns is-multiline  is-mobile">

                                        <div className="column is-6-desktop">
                                            <b> 每年預防注射 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("injection")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("injection")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("injection")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 滴除蚤 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("flea")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("flea")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="代送獸醫除蚤" {...register("flea")} /> 代送獸醫除蚤 &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("flea")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 結 紮 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("ligate")} /> 有     &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("ligate")} /> 無     &nbsp; &nbsp;
                                            <input type="radio" value="發情中" {...register("ligate")} /> 發情中 &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("ligate")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 晶 片 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("chip")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("chip")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("chip")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 傳染病 : </b> &nbsp;
                                            <input type="radio" value="有"     {...register("infection")} /> 有    &nbsp; &nbsp;
                                            <input type="radio" value="無"     {...register("infection")} /> 無    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("infection")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 與其他狗共處 : </b> &nbsp;
                                            <input type="radio" value="可"     {...register("together")} /> 可    &nbsp; &nbsp;
                                            <input type="radio" value="否"     {...register("together")} /> 否    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("together")} /> 不確定
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 服藥中 : </b> &nbsp;
                                            <input type="radio" value="是"     {...register("drug")} /> 是    &nbsp; &nbsp;
                                            <input type="radio" value="否"     {...register("drug")} /> 否    &nbsp; &nbsp;
                                            <input type="radio" value="不確定" {...register("drug")} /> 不確定
                                        </div>

                                    </div>

                                    <b style={{color: "rgb(0,0,150)"}} > * 以下選項可複選 --- </b>

                                    { /* Checkbox 複選、備註 */}
                                    <div className="columns is-multiline is-mobile">

                                        <div className="column is-6-desktop">
                                            <b> 健 康 : </b> &nbsp;
                                            <input type="checkbox" value="良好" {...register("health")} /> 良好 &nbsp; &nbsp;
                                            <input type="checkbox" value="關節" {...register("health")} /> 關節 &nbsp; &nbsp;
                                            <input type="checkbox" value="皮膚" {...register("health")} /> 皮膚 &nbsp; &nbsp;
                                            <input type="checkbox" value="過敏" {...register("health")} /> 過敏 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("health")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 餵食方式 : </b> &nbsp;
                                            <input type="checkbox" value="飼料" {...register("feed")} /> 飼料 &nbsp; &nbsp;
                                            <input type="checkbox" value="罐頭" {...register("feed")} /> 罐頭 &nbsp; &nbsp;
                                            <input type="checkbox" value="鮮食" {...register("feed")} /> 鮮食 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("feed")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-6-desktop">
                                            <b> 如廁方式 : </b> &nbsp;
                                            <input type="checkbox" value="戶外" {...register("toilet")} /> 戶外 &nbsp; &nbsp;
                                            <input type="checkbox" value="室內" {...register("toilet")} /> 室內 &nbsp; &nbsp;
                                            <input type="checkbox" value="尿布" {...register("toilet")} /> 尿布 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("toilet")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-12-desktop">
                                            <b> 飼主提供 : </b> &nbsp;
                                            <input type="checkbox" value="飼料" {...register("ownerProvide")} /> 飼料 &nbsp; &nbsp;
                                            <input type="checkbox" value="罐頭" {...register("ownerProvide")} /> 罐頭 &nbsp; &nbsp;
                                            <input type="checkbox" value="零食" {...register("ownerProvide")} /> 零食 &nbsp; &nbsp;
                                            <input type="checkbox" value="睡墊" {...register("ownerProvide")} /> 睡墊 &nbsp; &nbsp;
                                            <input type="checkbox" value="項圈" {...register("ownerProvide")} /> 項圈 &nbsp; &nbsp;
                                            <input type="checkbox" value="胸背" {...register("ownerProvide")} /> 胸背 &nbsp; &nbsp;
                                            <input type="checkbox" value="牽繩" {...register("ownerProvide")} /> 牽繩 &nbsp; &nbsp;
                                            <input type="checkbox" value="提籃" {...register("ownerProvide")} /> 提籃 &nbsp; &nbsp;
                                            <input type="checkbox" value="玩具" {...register("ownerProvide")} /> 玩具 &nbsp; &nbsp;
                                            <input type="checkbox" value="其他" {...register("ownerProvide")} /> 其他 &nbsp; &nbsp;
                                        </div>

                                        <div className="column is-12-desktop">

                                            <textarea rows="8" className="textarea" {...register("pet_Note")} placeholder="備註事項"
                                                        style={{color: "rgb(0,0,180)", fontWeight: "bold"}}/>

                                        </div>

                                    </div>

                            </>  
                       
                       }   

                        
                       <br/> 

                   </>

               }

          </>

} ;

export default Pet_Form ;
