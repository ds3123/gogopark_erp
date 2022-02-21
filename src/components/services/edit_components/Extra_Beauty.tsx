
import React, {FC, useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";

import { set_Extra_Beauty_Fee } from "store/actions/action_Extra_Service_Fee"
import {useDispatch, useSelector} from "react-redux";
import useSection_Folding from "hooks/layout/useSection_Folding";

import axios from "utils/axios";



interface IExtra_Beauty extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}

/* 加價美容 ( 僅 "洗澡" 有 ) */
const Extra_Beauty : FC< IExtra_Beauty > = ({ register , editType, serviceData  } )=>{


    // 目前 寵物區塊 ( Pet_Form.tsx ) 所選擇 : "體型" 下拉選項
    const current_Pet_Size = useSelector( ( state : any ) => state.Pet.current_Pet_Size ) ;

    const dispatch = useDispatch() ;

    const { is_folding , Folding_Bt }            = useSection_Folding( !editType ? true : false ) ;  // 收折區塊


     // 讀取 _ 所有服務價格
     const all_Service_Prices                    = useRead_Service_Prices( ) ; 

    // 讀取 _ "加價美容" 所有價格
    const extra_Beauty_Prices                    = useRead_Service_Prices( '加價美容' ) ;

    // 所點選的服務名稱 ( for 新增 )
    const [ beauty_Picked , set_Beauty_Picked ]  = useState<string[]>( [] ) ;


     // 所點選的服務名稱 ( for 編輯 )
     const [ services_Data , set_Services_Data ] = useState<any>( [] ) ;

    
    // 加價美容費用小計
    const [ price , set_Price ] = useState( 0 ) ;


    // 欄位變動處理
    const handle_Change = ( service : string ) => {

        if( beauty_Picked.indexOf( service ) !== -1 ){  // * 重複點選同樣選項 --> 刪除

            const _beauty_Picked = [...beauty_Picked] ;

            // 刪除
            _beauty_Picked.splice( beauty_Picked.indexOf( service ) , 1 ) ;

            // 設定
            set_Beauty_Picked( _beauty_Picked ) ;

        }else{                                            // * 尚未點選 --> 加入

            set_Beauty_Picked([ ...beauty_Picked , service ] ) ;

        }


    } ;


    // 計算 : 加價美容小計價格
    useEffect(( ) => {

        let _price = 0 ;

        if( beauty_Picked.length > 0 ){

            beauty_Picked.forEach( x => {

                extra_Beauty_Prices.forEach( y => {

                    if( parseInt(x) === y['id'] )  _price += y['service_price'] ;

                } )

            })

        }

        // 設定 _ 價格小計
        set_Price( _price ) ;
        dispatch( set_Extra_Beauty_Fee( _price ) ) ;

    } , [ beauty_Picked ] ) ;



    // 取得 _ 新增資料時，所選擇的服務名稱 ( for【 編輯 】 )
    useEffect( () => { 
    
        let service_Arr : any = []  

        // 從所有價格資料，依照 id，篩選出所點選服務名稱
        if( editType === '編輯' && serviceData.extra_beauty ){

           const arr = serviceData.extra_beauty.split(',') ;

           service_Arr = all_Service_Prices.filter( x => { 
               
             const str_Id = ( x['id'] as string ).toString() ; // 轉為字串

             return arr.indexOf( str_Id ) !== -1
        
           } )

        }

        // 將物件轉為僅含 _ 服務名稱陣列
        const _service_Arr = service_Arr.map( ( x : any ) => x['service_name'] ) ;
    
        set_Services_Data( _service_Arr ) ;


    } , [ serviceData , all_Service_Prices ] ) ;





  return <>

              { /* 是否已選擇 _ 寵物體型 ( for 新增 ) */ }  
              { editType === undefined &&

                <>     

                    <i className="fas fa-dog"></i>&nbsp;寵物體型 : 
                    { ( current_Pet_Size === '請選擇' || !current_Pet_Size ) ?
                        <b className="fDred"> 尚未選擇寵物體型</b> :
                        <b style={{color:"rgb(30,150,0)"}}> { current_Pet_Size }  </b>
                    } <br/><br/>

                </>   

              }


              <b className="tag is-large is-link is-light">

                  <i className="fas fa-plus-circle"></i> &nbsp; 加價美容

                  { /* # 加價項目價格 */ }

                  { /* for 新增 */ }
                  { ( editType !== '編輯' && price !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 :
                              <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元
                          </b>
                      </>

                  }

                  { /* for 編輯 */ }
                  { ( editType === '編輯' && serviceData.extra_beauty_fee !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{fontSize: "12pt"}} > 小計 :
                              <span style={{color: "red"}}> &nbsp; { serviceData.extra_beauty_fee } &nbsp; </span> 元
                          </b>
                      </>

                  }



              </b>

              { /* 收折按鈕 */ }
              <b className="relative" style={{ right : "10px" }}> { Folding_Bt } </b>  <br/>

              { /* 新增 */ }
              { ( !is_folding && editType === undefined ) &&

                  <>

                      <br/><br/>

                      <div className="columns is-multiline is-mobile relative" style={{left: "20px"}}>


                          {

                              extra_Beauty_Prices.map((x, y) => {

                                 const note         = x['note'] as string ;         // 備註
                                 const service_name = x['service_name'] as string ; // 服務項目名稱

                                  // for 修腳緣( 針對寵物 "體型"，只顯示相對應的修腳緣選項 )
                                  if( ( current_Pet_Size === '特大型犬' || current_Pet_Size === '大型犬' ) && service_name.indexOf('飾毛') !== -1  && note.indexOf('大狗') === -1  ) return null ;
                                  if(  current_Pet_Size === '中型犬'  && service_name.indexOf('飾毛') !== -1  && note.indexOf('中狗') === -1  ) return null ;
                                  if(  current_Pet_Size === '小型犬'  && service_name.indexOf('飾毛') !== -1  && note.indexOf('小狗') === -1  ) return null ;


                                  return <div key={y} className="column is-2-desktop relative">

                                              { note &&
                                                  <span className="absolute f_10 "
                                                        style={{top: "-5px", left: "30px", color: "rgb(0,0,180)"}}>  {x['note']}  </span>
                                              }

                                              <input type="checkbox" value={ x['id'] }  {...register("extra_Beauty")}
                                                     onChange={ e => handle_Change(e.target.value) }/>
                                              <b> { service_name } </b>

                                          </div>

                              })

                          }


                          {/*<div className = 'column is-2-desktop' >*/}
                          {/*    <input type="checkbox" value = "頭臉"  { ...register( "beauty_Extra_Option" ) } onChange={ handle_Change } /> <b>頭臉</b>*/}
                          {/*</div>*/}


                          {/*<b style={{ color:"rgb(0,0,150)" }}> 腿部</b> 飾毛 &nbsp;*/}
                          {/*<div className="select">*/}
                          {/*    <select { ...register( "beauty_Extra_Option_3" ) }  onChange={ handle_Change } >*/}
                          {/*        <option value="請選擇">請選擇</option>*/}
                          {/*        <option value="大狗">大狗</option>*/}
                          {/*        <option value="中狗">中狗</option>*/}
                          {/*        <option value="小狗">小狗</option>*/}
                          {/*    </select>*/}
                          {/*</div>*/}

                      </div>

                  </>

              }


              { /* 編輯 */ }
              { ( !is_folding && editType === '編輯' ) &&

                <>
                    <br/>  
                   
                    <b className="tag is-large is-white" >

                        &nbsp;&nbsp; 點選項目 :  
                        <span className="fDblue"> &nbsp;
                          {  services_Data.join(',') ?  services_Data.join(',') : '無' }
                        </span>   

                    </b>    

                    <br/>

                </> 

              }



              <br/><hr/>

         </>

};

export default React.memo( Extra_Beauty , ( ) => true )