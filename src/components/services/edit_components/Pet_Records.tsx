
import { useContext , useEffect , useState } from "react"

// useContext
import { ModalContext } from "templates/panel/Modal" ;
import axios from "utils/axios";
import usePagination from "hooks/layout/usePagination";
import Pagination from "utils/Pagination";
import { useSpecies_Name_Prices } from "hooks/data/useSpecies_Prices"




// @ 特定寵物 _ 紀錄列表 ( 基本品種價格、各種服務消費歷史 )
const Pet_Records = ( ) => {

    const value = useContext( ModalContext ) as any ;  // 取得 context 值

    // 目前所點選 _ 服務項目
    const [ current_Service , set_current_Service ] = useState( '基礎' ) ;

    // 依照 '寵物品種名稱" ( Ex. 秋田犬 ) ，查詢相對應服務 : 基本價格
    const {
              bath_First ,     // 初次洗澡
              bath_Single ,    // 單次洗澡
              bath_Month ,     // 包月洗澡
              beauty_Single ,  // 單次美容
              beauty_Month     // 包月美容
          } = useSpecies_Name_Prices( value['data']['species'] );


    // ---------------------------------------------------------------------------------------

        // 基礎資料
        const [ basic_Data , set_Basic_Data ]                 = useState([]) ;

        // 洗澡( 初次 )資料
        const [ bath_First_Data , set_Bath_First_Data ]       = useState([]) ;

        // 洗澡( 單次 )資料
        const [ bath_Single_Data , set_Bath_Single_Data ]     = useState([]) ;

        // 洗澡( 包月 )資料
        const [ bath_Month_Data , set_Bath_Month_Data ]       = useState([]) ;

        // 美容( 單次 )資料
        const [ beauty_Single_Data , set_Beauty_Single_Data ] = useState([]) ;

        // 美容( 包月 )資料
        const [ beauty_Month_Data , set_Beauty_Month_Data ]   = useState([]) ;


    // ----------------------------------------------------------------------------------------


    // 點選 _ 服務
    const click_Service   = ( type : string ) => set_current_Service( type ) ;

    // 根據特定服務，取得 _ 相對應 url
    const get_Service_Url = ( service_Type : string ) => {

        if( service_Type === '基礎' ) return 'basics' ;
        if( service_Type === '初次洗澡優惠' || service_Type === '單次洗澡' || service_Type === '包月洗澡' ) return 'bathes' ;
        if( service_Type === '單次美容' || service_Type === '包月美容' ) return 'beauties' ;
        return '' ;

    } ;

    type service_Url       = 'basics' | 'bathes' | 'beauties' ;
    type service_Type      = '基礎小美容' | '初次洗澡優惠' | '單次洗澡' | '單次美容' ;

    // 取得 _ 該寵物相對應 : 服務單 ( 資料表 : basic、bath、beauty ... ) 資料
    const get_Service_Data = ( service_Url : service_Url , pet_Serial : string , type : service_Type ) => {

        axios.get( `/${ service_Url }/show_pet/${ pet_Serial }/${ type }` ).then(res => {

           let data = res.data ;

           if( service_Url === 'basics' ) set_Basic_Data( data ) ;

           if( service_Url === 'bathes' && type === '初次洗澡優惠' ){
               const _data = data.filter( ( x : any ) => x['payment_type'] === '初次洗澡優惠' ) ;
               set_Bath_First_Data( _data ) ;
           }

           if( service_Url === 'bathes' && type === '單次洗澡' ){
               const _data = data.filter( ( x : any ) => x['payment_type'] === '單次洗澡' ) ;
               set_Bath_Single_Data( _data ) ;
           }

           if( service_Url === 'beauties' ) set_Beauty_Single_Data( res.data ) ;

        }) ;


    } ;

    // 取得 _ 該寵物相對應 : 方案 ( 資料表 : plans ) 資料
    const get_Plan_Data    = ( pet_Serial : string , plan_Type : '包月洗澡' | '包月美容' ) => {

        axios.get( `/plans/show_pet_plans/${ pet_Serial }/${ plan_Type }` ).then(res => {
           if( plan_Type === '包月洗澡' ) set_Bath_Month_Data( res.data ) ;
           if( plan_Type === '包月美容' ) set_Beauty_Month_Data( res.data ) ;
        }) ;

    } ;


    // # 取得資料 ( usePagination )----------------------------

    let api_Url = '' ;


    if(   // * show_pet 查詢參數 : 寵物編號、付款類別( payment_type )
        current_Service === '基礎' ||
        current_Service === '初次洗澡優惠' ||
        current_Service === '單次洗澡' ||
        current_Service === '單次美容'
    ){
        api_Url = `/${ get_Service_Url( current_Service ) }/show_pet/${ value['data']['serial'] }/${ current_Service }` ;
    }

    if( current_Service === '包月洗澡' || current_Service === '包月美容'  ){
        api_Url = `/plans/show_pet_plans/${ value['data']['serial'] }/${ current_Service }` ;
    }


    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( api_Url ) ;

    // ----------------------------


    // 查詢 _ 該寵物 : 【 服務 】、【 方案 】資料
    useEffect( ( ) => {

        const pet_Serial = value['data']['serial'] ;

        if( pet_Serial ){

           // # 取得 _ 該寵物 : 各種服務單資料
           get_Service_Data( 'basics'   , pet_Serial , '基礎小美容' ) ;
           get_Service_Data( 'bathes'   , pet_Serial , '初次洗澡優惠' ) ;
           get_Service_Data( 'bathes'   , pet_Serial , '單次洗澡' ) ;
           get_Service_Data( 'beauties' , pet_Serial , '單次美容' ) ;

           // # 取得 _ 該寵物 : 方案資料
           get_Plan_Data( pet_Serial , '包月洗澡' ) ;
           get_Plan_Data( pet_Serial , '包月美容' ) ;

        }

    } , [] ) ;


    // 顯示 _ 服務 ( 單次洗澡、包月洗澡、單次美容、包月美容 ) 最近一次消費金額
    const show_First_Record = ( data : any ) => {

        const sum = data.length ;
        if( sum < 1 ) return '' ;

        return <span className="absolute" style={ { top:"30px" , color:"black" } }>
                    最近一次  <b className="fRed"> ${ data[ ( sum - 1 ) ]['amount_paid'] } </b>
               </span>

    } ;

    // 顯示 _ 服務 ( 初次洗澡優惠、單次洗澡、包月洗澡、單次美容、包月美容 ) 基本消費金額
    const show_Service_Basic_Price = ( type : string , data : any[] ) => {

        // 服務基本金額
        let price = 0 ;

        // 最近一次消費金額
        const latest_Record = type !== '初次洗澡優惠' ? show_First_Record( data ) : null ;

        if( type === '初次洗澡優惠' ) price = bath_First ;
        if( type === '單次洗澡' )     price = bath_Single ;
        if( type === '包月洗澡' )     price = bath_Month ;
        if( type === '單次美容' )     price = beauty_Single ;
        if( type === '包月美容' )     price = beauty_Month ;

        let tag_Style = '' ;
        if( current_Service === type && ( type === '初次洗澡優惠' || type === '單次洗澡' || type === '包月洗澡'  ) ) tag_Style = 'is-success' ;
        if( current_Service === type && ( type === '單次美容' || type === '包月美容'  ) )                            tag_Style = 'is-danger' ;

        return  <b className={ `tag is-rounded f_10 relative pointer ${ current_Service === type ? tag_Style : 'is-white' }` }
                   onClick={ ( ) => click_Service( type ) } >

                    { latest_Record }   { /* 最近一次消費金額 */ }

                    { type } : &nbsp; <span className = { `${ current_Service === type ? '' : 'fDblue' }` } >
                                               { price }
                                         </span> &nbsp; 元

                    { /*   */ }
                    { data.length > 0 &&  <b style={dot}> { data.length } </b> }

                </b>

    } ;

    const dot = {
                   position     : "absolute" ,
                   textAlign    : "center",
                   fontSize     : "9pt",
                   top          : "-12px" ,
                   right        : "-5px" ,
                   background   : "red" ,
                   color        : "white" ,
                   padding      : "0px 6px",
                   borderRadius : "10px"
    } as any ;

    const fist = { background : "rgba(150,150,150,.1)" } as any ;

   return <>

              <b className="tag is-large is-primary relative" style={{top:"-20px"}}>

                 <i className="fas fa-dog"></i> &nbsp;&nbsp;
                 { value['data']['name'] } ( { value['data']['species'] } ) &nbsp;
                 { value['data']['sex']   && <> <b className="tag is-medium is-white is-rounded"> { value['data']['sex'] }   </b> &nbsp; &nbsp; </> }
                 { value['data']['color'] && <> <b className="tag is-medium is-white is-rounded"> { value['data']['color'] } </b> &nbsp; &nbsp; </> }

              </b>

              <br/><br/>

              { /* 品種基本價格 */ }

                   <b className={ `tag is-medium is-warning pointer is-rounded relative ${ current_Service === '基礎' ? '' : 'is-light' }` } onClick={ ( ) => click_Service('基礎') } >
                       <i className="far fa-list-alt"></i> &nbsp; 基礎
                       { basic_Data.length > 0 && <b style={ dot } > { basic_Data.length } </b> }
                   </b> &nbsp; &nbsp;

                   { /* 洗澡 */ }
                   <b className="tag is-medium is-success is-light is-rounded">

                       <i className="fas fa-bath"></i> &nbsp; 洗澡 &nbsp;

                       {  show_Service_Basic_Price( '初次洗澡優惠' , bath_First_Data )  } &nbsp;&nbsp;
                       {  show_Service_Basic_Price( '單次洗澡' , bath_Single_Data )  } &nbsp;&nbsp;
                       {  show_Service_Basic_Price( '包月洗澡' , bath_Month_Data )  }

                   </b> &nbsp; &nbsp;

                   { /* 美容  */ }
                   <b className="tag is-medium is-danger is-light is-rounded">

                       <i className="fas fa-cut"></i> &nbsp; 美容 &nbsp;

                       {  show_Service_Basic_Price( '單次美容' , beauty_Single_Data ) } &nbsp;&nbsp;
                       {  show_Service_Basic_Price( '包月美容' , beauty_Month_Data ) }

                   </b> &nbsp; &nbsp;

                   <b className={ `tag is-medium pointer is-rounded relative is-link ${ current_Service === '安親' ? '' : 'is-light' }` } onClick={ ( ) => click_Service('安親') } >
                       <i className="fas fa-baby-carriage"></i> &nbsp;安親
                   </b> &nbsp; &nbsp;

                   <b className={ `tag is-medium pointer is-rounded relative is-link ${ current_Service === '住宿' ? '' : 'is-light' }` } onClick={ ( ) => click_Service('住宿') } >
                       <i className="fas fa-home"></i> &nbsp; 住宿
                   </b>

               <br/><br/><br/>

               <table className="table is-fullwidth is-hoverable relative" style={{ left:"3%",width:"94%" }}>

                   <thead>
                       <tr>
                           <th> 服務說明 </th>
                           <th>

                               { ( current_Service !== '包月洗澡' && current_Service !== '包月美容') &&
                                  <> 服務價格 <b className="fDblue f_10"> ( {current_Service} ) </b> </>
                               }

                               { ( current_Service !== '包月洗澡' && current_Service !== '包月美容') ||
                                  <> 方案基本價格  </>
                               }

                           </th>

                           <th> 個體調整 </th>

                           { ( current_Service !== '包月洗澡' &&  current_Service !== '包月美容' ) &&
                               <>
                                   <th> 加價項目 </th>
                                   <th> 加價美容 </th>
                               </>
                           }


                           <th> 接送費   </th>
                           <th> 小計     </th>
                           <th>

                              { ( current_Service === '包月洗澡' || current_Service === '包月美容' ) ? '購買方案日期' : '來店日期' }

                           </th>
                       </tr>
                   </thead>

                   <tbody>

                     { /* --------------- # 初次洗澡優惠  --------------- */ }

                         {  current_Service === '初次洗澡優惠' &&

                            pageOfItems.filter((x:any) => x['payment_type'] === '初次洗澡優惠' ).map( ( x : any , y) => {

                               const bath_Fee           = x['bath_fee'] ? x['bath_fee'] : 0 ;
                               const self_Adjust_Amount = x['self_adjust_amount'] ? x['self_adjust_amount'] : 0 ; // 個體調整金額
                               const extra_service_fee  = x['extra_service_fee'] ? x['extra_service_fee'] : 0 ;   // 加價項目費用
                               const extra_beauty_fee   = x['extra_beauty_fee'] ? x['extra_beauty_fee'] : 0 ;     // 加價美容費用
                               const pickup_Fee         = x['pickup_fee'] ? x['pickup_fee'] : 0 ;                 // 接送費

                               return  <tr key = { y } >

                                   <td> { x['payment_type'] }                     </td>
                                   <td> <b className="fDblue"> { bath_Fee } </b>  </td>
                                   <td> { self_Adjust_Amount }                    </td>
                                   <td> { extra_service_fee }                     </td>
                                   <td> { extra_beauty_fee }                      </td>
                                   <td> { pickup_Fee }                            </td>
                                   <td>
                                       <b className="fDred">
                                           { bath_Fee + self_Adjust_Amount + extra_service_fee + extra_beauty_fee + pickup_Fee }
                                       </b>
                                   </td>
                                   <td> { x['service_date'] } </td>

                               </tr>

                           })

                         }

                     { /* --------------- # 基礎、單次洗澡、單次美容  --------------- */ }

                         { ( current_Service === '基礎' || current_Service === '單次洗澡' || current_Service === '單次美容' ) &&

                             pageOfItems.map( ( x : any , y) => {

                                let service_Fee  = 0 ;                                      // 服務價格
                                const basic_Fee  = x['basic_fee'] ? x['basic_fee'] : 0 ;
                                const bath_Fee   = x['bath_fee'] ? x['bath_fee'] : 0 ;
                                const beauty_Fee = x['beauty_fee'] ? x['beauty_fee'] : 0 ;

                                if( current_Service === '基礎' )    service_Fee = basic_Fee ;
                                if( current_Service === '單次洗澡' ) service_Fee = bath_Fee ;
                                if( current_Service === '單次美容' ) service_Fee = beauty_Fee ;

                                const self_Adjust_Amount = x['self_adjust_amount'] ? x['self_adjust_amount'] : 0 ; // 個體調整金額
                                const extra_service_fee  = x['extra_service_fee'] ? x['extra_service_fee'] : 0 ;   // 加價項目費用
                                const extra_beauty_fee   = x['extra_beauty_fee'] ? x['extra_beauty_fee'] : 0 ;     // 加價美容費用
                                const pickup_Fee         = x['pickup_fee'] ? x['pickup_fee'] : 0 ;                 // 接送費

                                return  <tr key = { y }  style = { y === 0 ? fist : {} }>

                                           <td> { x['payment_type'] }                       </td>
                                           <td> <b className="fDblue"> { service_Fee } </b> </td>
                                           <td> { self_Adjust_Amount }                      </td>
                                           <td> { extra_service_fee }                       </td>
                                           <td> { extra_beauty_fee }                        </td>
                                           <td> { pickup_Fee }                              </td>
                                           <td>
                                               <b className="fDred">
                                                   { service_Fee + self_Adjust_Amount + extra_service_fee + extra_beauty_fee + pickup_Fee }
                                               </b>
                                           </td>
                                           <td> { x['service_date'] }                        </td>

                                         </tr>

                             })

                         }

                     { /* --------------- # 包月洗澡、包月美容  --------------- */ }

                         { ( current_Service === '包月洗澡' || current_Service === '包月美容' ) &&

                             pageOfItems.map( ( x : any , y) => {

                                 const plan_Fee           = x['plan_basic_price'] ? x['plan_basic_price'] : 0 ;    // 服務價格( 方案基本價格 )

                                 const self_Adjust_Amount = x['plan_adjust_price'] ? x['plan_adjust_price'] : 0 ;  // 個體調整費用
                                 const pickup_Fee         = x['pickup_fee'] ? x['pickup_fee'] : 0 ;                // 接送費

                                 return  <tr key = { y } style = { y === 0 ? fist : {} }>

                                             <td> { x['plan_type'] }                       </td>
                                             <td> <b className="fDblue"> { plan_Fee } </b> </td>
                                             <td> { self_Adjust_Amount }                   </td>
                                             <td> { pickup_Fee }                           </td>
                                             <td>
                                                  <b className="fDred"> { plan_Fee + self_Adjust_Amount + pickup_Fee } </b>
                                             </td>
                                             <td> { x['created_at'].slice( 0 , 10 ) }      </td>

                                          </tr>

                             })

                         }



                   </tbody>

               </table>

               { /* 頁碼  */ }
               <div style={{ marginTop:"50px", marginBottom:"50px" }}>
                   <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
               </div>

          </>

} ;


export default Pet_Records