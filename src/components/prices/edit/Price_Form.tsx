
import  { FC , useState , useEffect , useContext } from "react"
import { Edit_Form_Type } from "utils/Interface_Type";
import { Input } from "templates/form/Input";
import { useRead_Species , useRead_Service_Prices } from "hooks/ajax_crud/useAjax_Read";
import {SidePanelContext} from "templates/panel/Side_Panel";


type species = {

    species_Id?        : number ;
    source_Create_Way? : string ;
    data?              : any ;

}

type Price = Edit_Form_Type & species ;


{ /* 價格表單欄位  */ }
const Price_Form : FC<Price> = ( { register  , errors , setValue , current , species_Id , data } ) => {
   
    const value                           = useContext( SidePanelContext ) ;                         // 取得 context 值
    const source_Create_Way               = value.source_Create_Way ;                                // 新增寵物價格方式 ( Ex. 依照 : 個別項目 or 寵物品種 )
    const servcie_Prices                  = data && data.service_prices ? data.service_prices : [] ; // 品種 5 種價格資料 ( 初次洗澡、單次、.... / for 寵物品種 )

    // 取得 _ 所有寵物品種
    const petSpecies                      = useRead_Species() ;

    // 取得 _ 所有服務價格
    const servicePrices                   = useRead_Service_Prices() ;

    // 新增方式
    const [ create_Way , set_Create_Way ] = useState< '寵物品種' | '個別項目' >( '寵物品種' ) ;


    // 點選 _ 新增方式
    const click_Way = ( way : '寵物品種' | '個別項目' ) => {

        set_Create_Way( way ) ;
        setValue( 'service_Price_Create_Way' , way ) ;  // 設定 hidden Input ( 辨別何種新增方式 )

    } ;

    useEffect( () => {

      /*
         # for 編輯 _ 價格時 ， 設定 : "指定品種" 下拉選項( Ajax 取得 )
           * 因 Price_Form 載入時，Ajax 資料尚未取得( 若以 React Hook Form 的 defaultValues，無法成功設定 _ 預設值 )
           * 需取得資料後，再以 setValue() 單獨設定預設值
      */
      if( !current && species_Id && petSpecies.length > 0 ){

         setValue( 'price_Species_Id' , species_Id ) ;

      }

    } , [ petSpecies ] ) ;


    // 初始設定 hidden Input ( for 辨別何種 "新增方式" )
    useEffect( () => {

       setValue( 'service_Price_Create_Way' , '寵物品種' ) ;

    } , [] ) ;


    // 【 for 編輯 】
    useEffect( () : any => {

       if( current ) return false ;  // 【 新增 】不執行

       // # 依照傳送過來 ( create_Way ) 的值，決定要顯示 : 個別項目 or 寵物品種
       if( source_Create_Way === '個別項目' )  set_Create_Way('個別項目') ;
       if( source_Create_Way === '寵物品種' )  set_Create_Way('寵物品種') ;


       // # 設定 _ 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 5 種價格 "初始值"
       if( source_Create_Way === '寵物品種' ){

           // 所點選寵物品種下，初次洗澡、單次洗澡、... 等 5 種價格
           const prices_Arr    = data['service_prices'] ;
           const first_Bath    = prices_Arr.filter( ( x:any ) => x['service_name'] === '初次洗澡優惠價格' )[0] ;
           const single_Bath   = prices_Arr.filter( ( x:any ) => x['service_name'] === '單次洗澡價格' )[0] ;
           const month_Bath    = prices_Arr.filter( ( x:any ) => x['service_name'] === '包月洗澡價格' )[0] ;
           const single_Beauty = prices_Arr.filter( ( x:any ) => x['service_name'] === '單次美容價格' )[0] ;
           const month_Beauty  = prices_Arr.filter( ( x:any ) => x['service_name'] === '包月美容價格' )[0] ;

           setValue( 'price_Fist_Bath' ,     first_Bath    ? first_Bath['service_price']    : 0 ) ;
           setValue( 'price_Single_Bath' ,   single_Bath   ? single_Bath['service_price']   : 0 ) ;
           setValue( 'price_Month_Bath' ,    month_Bath    ? month_Bath['service_price']    : 0 ) ;
           setValue( 'price_Single_Beauty' , single_Beauty ? single_Beauty['service_price'] : 0 ) ;
           setValue( 'price_Month_Beauty' ,  month_Beauty  ? month_Beauty['service_price']  : 0 ) ;

       }
    
    } , [ current ] ) ;



   return <>

            { /* 【 新增 】服務價格時，作為區分何種新增方式 */ }
            <input type="hidden" { ...register( "service_Price_Create_Way" ) }  />

            { /* 新增選項 */ }
            { current &&

                <div className="columns is-multiline is-mobile m_Bottom_50">

                    <div className="column is-12-desktop">

                        <span className="relative" style={{left: "-12px"}} >

                              <b className="tag is-medium is-white"> 新增價格方式 :</b> 

                              <b className={ `tag pointer m_Right_30 is-medium is-success ${ create_Way === '寵物品種' ? '' : 'is-light' }` }
                                   onClick={ () => click_Way('寵物品種') } >
                                   <i className="fas fa-cat"></i> &nbsp; 寵物品種
                              </b>

                              <b className={ `tag pointer is-medium is-success ${ create_Way === '個別項目' ? '' : 'is-light' }` }
                                   onClick={ () => click_Way('個別項目') } > 
                                   <i className="fas fa-list"></i> &nbsp; 個別項目
                              </b>

                        </span>

                    </div>

                </div>

            }

            { /* @ 寵物品種 ( 有初始價格 )  */ }
            { ( ( !current && create_Way === '寵物品種' && servcie_Prices.length > 0 ) || ( current && create_Way === '寵物品種' && servcie_Prices.length === 0 ) ) &&

                    <div className="columns is-multiline is-mobile m_Bottom_50 relative" >

                        { /* 指定品種 */ }
                        <div className="column is-12-desktop required">

                            { /* for 新增  */ }
                            { current &&

                                <>

                                    <p> 指定<span style={{color:'rgb(0,0,180)'}}>品種</span> &nbsp; <b className="fRed"> {errors.price_Species_Id?.message} </b></p>

                                    <div className="control has-icons-left">

                                        <div className="select">

                                            <select {...register("price_Species_Id")} >
                                                <option value="請選擇" > 請選擇 </option>
                                                {

                                                    petSpecies.map((x:any, y:any) => {

                                                        /* @ 判斷是否要顯示品種選項 ( 以避免同一品種，重複新增價格 )  */
                                                        const p_Id     = x['id'] ;

                                                        let is_Created = false ;
                                                        let num        = 0 ;
                                                        const nArr     = [ '初次洗澡優惠價格' , '單次洗澡價格' , '包月洗澡價格' , '單次美容價格' , '包月美容價格' ] ;

                                                        servicePrices.forEach( _x => {

                                                            if( p_Id === _x['species_id'] && nArr.indexOf( _x['service_name']  ) !== -1 )  num += 1 ;

                                                            if( num === 5 ) is_Created = true ;   // 目前規則 : 累計 5 次，即視為已利用 "寵物品種" 方式新增過 ( 再確認 2021.07.16 )

                                                        }) ;

                                                        return is_Created ? '' : <option value = { p_Id }  key   = { y } >
                                                                                    {x['serial']} _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                                                </option> ;

                                                    })

                                                }

                                            </select>

                                        </div>

                                        <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                                    </div>

                                </>

                            }

                            { /* for 編輯 */ }
                            { !current &&

                                <b> 指定品種 : <span className="fDred" >  { data['name'] } </span> </b>

                            }

                        </div>

                        <Input type="number" name="price_Fist_Bath" label="初次洗澡優惠" register={register} error={errors.price_Fist_Bath}
                                icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                        <Input type="number" name="price_Single_Bath" label="單次洗澡" register={register} error={errors.price_Single_Bath}
                                icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                        <Input type="number" name="price_Month_Bath" label="包月洗澡" register={register} error={errors.price_Month_Bath}
                                icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                        <div className="column is-1-desktop"></div>

                        <Input type="number" name="price_Single_Beauty" label="單次美容" register={register} error={errors.price_Single_Beauty}
                                icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                        <Input type="number" name="price_Month_Beauty" label="包月美容" register={register} error={errors.price_Month_Beauty}
                                icon="fas fa-dollar-sign" asterisk={true} columns="2" />


                        <span className="m_Left_10"> <i className="fas fa-exclamation-circle"></i>&nbsp;若無該項服務金額，請填寫 0 </span>      


                    </div>

            }

            { /* @ 寵物品種 ( 沒有初始價格 )  */ }
            { ( !current && create_Way === '寵物品種' && servcie_Prices.length === 0 ) && 
               
                <b className="tag is-large is-danger m_Bottom_70"> <i className="fas fa-exclamation"></i> &nbsp; 請先至 : 新增 / 價格 頁籤中，新增該品種初始價格 </b>

            }

            { /*  -----------------------------------------------------------------------------  */ }


            { /* @ 個別項目 */ }
            { create_Way === '個別項目' &&

                <div className="columns is-multiline  is-mobile">

                    { /* 服務類別 */ }
                    <div className="column is-3-desktop required">

                        <p> 服務類別 &nbsp;
                            <b style={{ color: "red" }}> { errors.price_Type?.message } </b>
                        </p>

                        <div className="control has-icons-left">

                            <div className="select">
                                <select { ...register("price_Type") } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="基礎">基 礎</option>
                                   <option value="洗澡">洗 澡</option>
                                   <option value="美容">美 容</option>
                                   <option value="安親">安 親</option>
                                   <option value="住宿">住 宿</option>
                                   <option value="接送">接 送</option>
                                   <option value="加價項目">加價項目</option>
                                   <option value="加價美容">加價美容</option>
                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-globe"></i> </div>

                        </div>

                    </div>

                    { /* 指定方案 */ }
                    <div className="column is-3-desktop">

                        <p> 指定<span style={{color:'rgb(0,0,180)'}}>方案</span> &nbsp; <b style={{color: "red"}}> {errors.price_Plan?.message} </b></p>
                        <div className="control has-icons-left">

                            <div className="select">
                                <select { ...register("price_Plan") } >
                                    <option value="無">無</option>
                                    <option value="包月洗澡">包月洗澡</option>
                                    <option value="包月美容">包月美容</option>
                                    <option value="初次洗澡優惠"> 初次洗澡優惠 </option>
                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-file-alt"></i> </div>

                        </div>

                    </div>

                    { /* 指定品種 */ }
                    <div className="column is-6-desktop">

                        <p> 指定<span style={{color:'rgb(0,0,180)'}}>品種</span> &nbsp; <b style={{color: "red"}}> {errors.price_Species_Id?.message} </b></p>
                        <div className="control has-icons-left">

                            <div className="select">
                                <select {...register("price_Species_Id")} >
                                    <option value={ 0 } >無</option>
                                    {

                                        petSpecies.map((x:any, y:any) => {

                                            return <option value = {x['id']}
                                                           key   = {y} >
                                                    {x['serial']} _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                   </option> ;

                                        })

                                    }

                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                        </div>

                    </div>

                    <Input type="text" name="price_Item" label="服務名稱" register={register} error={errors.price_Item}
                           icon="fas fa-cut" asterisk={true} columns="3" />

                    <Input type="number" name="price_Amount" label="服務價格" register={register} error={errors.price_Amount}
                           icon="fas fa-dollar-sign" asterisk={true} columns="3" />

                    <Input type="text" name="price_Note" label="備 註" register={register} error={errors.price_Note}
                           icon="fas fa-edit" asterisk={false} columns="6" />

                </div>

            }

          </>


};

export default Price_Form



