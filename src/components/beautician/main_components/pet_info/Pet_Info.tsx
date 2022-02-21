
import React , { useState , useEffect }  from "react" ;
import Pet_Info_Title from "components/beautician/main_components/pet_info/Pet_Info_Title"
import {useSelector} from "react-redux";
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";



{ /* 寵物基本資訊 */}
const Pet_Info = () => {

  // 目前所點選寵物
  const data                 = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;

  // 讀取 _ "加價項目" 所有價格
  const extra_Service_Prices = useRead_Service_Prices( '加價項目' ) ;

  // 讀取 _ "加價美容" 所有價格
  const extra_Beauty_Prices  = useRead_Service_Prices( '加價美容' ) ;

  const [ serviceData , set_ServiceData ] = useState<any>({
                                                            basicItems    : [] , // 小美容項目
                                                            beautyItems   : [] , // 大美容項目
                                                            extraServices : [] , // 加價項目
                                                            extraBeauty   : [] , // 加價美容
                                                          }) ;



  // 取得、設定 _ 各項服務項目( 小美容、大美容、加價項目 .. )
  useEffect(() => {

        let basicItems   = [] as any ;  // 小美容項目 ( basicItems )
        let beautyItems  = [] as any ;  // 大美容項目 ( beautyItems )
        let eServiceData = [] as any ;  // 加價項目   ( extraService )
        let eBeautyData  = [] as any ;  // 加價美容   ( extraBeauty )

        // 小美容項目
        if( data['basic_data'] ){
            basicItems = data['basic_data'].split(',') ;
        }

        // 大美容項目
        if( data['service_type'] === '美容' ){
            if( data['b_body'] )  beautyItems.push( '身體 : '+data['b_body'] ) ;
            if( data['b_ear'] )   beautyItems.push( '耳朵 : '+data['b_ear'] ) ;
            if( data['b_foot'] )  beautyItems.push( '腳 : '+data['b_foot'] ) ;
            if( data['b_head'] )  beautyItems.push( '頭 : '+data['b_head'] ) ;
            if( data['b_tail'] )  beautyItems.push( '尾巴 : '+data['b_tail'] ) ;
            if( data['b_other'] ) beautyItems.push( '其他 : '+data['b_other'] ) ;
        }

        // 加價項目
        if( data['extra_service'] ){
            const eServiceArr = data['extra_service'].split(',') ; // 將加價項目 id，轉成陣列
            eServiceData = extra_Service_Prices.filter( ( x:any ) => eServiceArr.indexOf( x['id'].toString() ) !== -1  ) ;   // 與加價項目價格比對，取得 _ 加價項目資料
        }

        // 加價美容
        if( data['extra_beauty'] ){
            const eBeautyArr = data['extra_beauty'].split(',') ; // 將加價項目 id，轉成陣列
            eBeautyData = extra_Beauty_Prices.filter( ( x:any ) => eBeautyArr.indexOf( x['id'].toString() ) !== -1  ) ;   // 與加價項目價格比對，取得 _ 加價項目資料
        }

        // 設定 state
        set_ServiceData({ ...serviceData ,
                                    basicItems    : basicItems ,
                                    beautyItems   : beautyItems ,
                                    extraServices : eServiceData ,
                                    extraBeauty   : eBeautyData
                              }) ;


  } ,[ data , extra_Service_Prices , extra_Beauty_Prices ] ) ;


  return <>

            <div className="columns is-multiline  is-mobile" >

                  { /* 標題資訊 */ }
                  <div className = "column is-12-desktop relative" >  <Pet_Info_Title />  </div>

                  { /* 到店時間、期望離店時間 */ }
                  <div className = "column is-12-desktop relative" >
                      <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  到店時間 : </b>
                      <b> { data['actual_arrive'] } </b>  &nbsp; &nbsp;
                      <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  期望離店時間 : </b>
                      <b className="fRed" > { data['expected_leave'] } </b>
                  </div>

                  { /* 自備物品 */ }
                  <div className = "column is-12-desktop relative" >
                      <b className="tag is-medium is-white"> <i className="fas fa-gavel"></i>  &nbsp; 自備物品 : </b>
                      <b className="fDred"> 
                       
                         { data['customer_object'] }
                         { data['customer_object_other'] ? ','+data['customer_object_other'] : '' }
                      
                      </b>
                  </div>

                  

                  { /* 主人交代  */ }
                  <div className = "column is-6-desktop relative"  >
                      <b className="tag is-medium is-white"> <i className="fas fa-user-tag"></i> &nbsp; 主人交代 : </b>
                      <b className="fDred"> { data['customer_note'] } </b>
                  </div>

                  { /*  櫃台備註  */ }
                  <div className = "column is-6-desktop relative"  >
                      <b className="tag is-medium is-white"> <i className="fas fa-pencil-alt"></i> &nbsp; 櫃台備註 : </b>
                      <b className="fDred"> { data['admin_customer_note'] } </b>
                  </div>

            </div>

            <br/>

            <div className="columns is-multiline  is-mobile" >

                  { /* 小美容項目 */ }
                  {  serviceData['basicItems'].length > 0 &&

                      <div className="column is-12-desktop relative">

                          <b className="tag is-medium is-warning is-light"> <i className="far fa-list-alt"></i> &nbsp; 小美容項目  &nbsp; : &nbsp;

                              {
                                  serviceData['basicItems'].map( ( x : string , y : number ) => {

                                    let slash = y === ( serviceData['basicItems'].length - 1 ) ? '' : '/' ;  // 區隔斜線

                                    return <span className="f_12" style={{color:'black'}}  key = {y} >
                                             {x}  &nbsp; <span style={{color:"rgba(0,0,0,.3)"}}> { slash } </span>  &nbsp; &nbsp;
                                           </span>
                                 })
                              }

                          </b> &nbsp;

                          <br/>

                      </div>

                  }

                  { /* 大美容項目 */ }
                  {  serviceData['beautyItems'].length > 0  &&

                     <div className = "column is-12-desktop relative" >

                       <b className = "tag is-medium is-danger is-light" > <i className="fas fa-cut"></i> &nbsp; 大美容項目 &nbsp; : &nbsp;

                           {
                               serviceData['beautyItems'].map( ( x : string , y : number ) => {

                                   let slash = y === ( serviceData['beautyItems'].length - 1 ) ? '' : '/' ;  // 區隔斜線

                                   return <span className="f_12" style={{color:'black'}}  key = {y} >
                                                {x} &nbsp; <span style={{color:"rgba(0,0,0,.3)"}}> { slash } </span> &nbsp; &nbsp;
                                          </span>

                               })
                           }

                       </b>  <br/>

                     </div>

                  }


                  { /* 加價美容( 僅洗澡 ) */ }
                  { serviceData['extraBeauty'].length > 0 &&

                      <div className="column is-6-desktop relative">

                        <b className="tag is-medium is-danger is-light"> <i className="fas fa-plus"></i> &nbsp; 加價美容 &nbsp; : &nbsp;

                            {
                                serviceData['extraBeauty'].map( ( x : any , y : number ) => {

                                    let slash = y === ( serviceData['extraBeauty'].length - 1 ) ? '' : '/' ;  // 區隔斜線

                                    return <span className="f_12" style={{ color:"black" }}  key = {y} >
                                              { x['service_name'] }  &nbsp; <span style={{color:"rgba(0,0,0,.3)"}}> { slash } </span>  &nbsp; &nbsp;
                                            </span>
                                })
                            }

                        </b> <br/>

                      </div>

                  }

                  { /* 加價項目 */ }
                  {  serviceData['extraServices'].length > 0  &&

                      <div className = "column is-12-desktop relative" >

                        <b className="tag is-medium is-primary is-light"> <i className="fas fa-plus"></i> &nbsp; 加價項目 &nbsp; : &nbsp;

                            {
                                serviceData['extraServices'].map( ( x : any , y : number ) => {

                                    let slash = y === ( serviceData['extraServices'].length - 1 ) ? '' : '/' ;  // 區隔斜線

                                    return <span className="f_12" style={{ color:"black" }}  key = {y} >
                                               { x['service_name'] }  &nbsp; <span style={{color:"rgba(0,0,0,.3)"}}> { slash } </span>  &nbsp; &nbsp;
                                           </span>

                                })
                            }

                        </b>  <br/>

                      </div>

                  }

            </div>

            <br/><br/>

         </>

} ;


export default Pet_Info