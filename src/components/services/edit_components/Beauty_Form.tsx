import React from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";
import {useSelector} from "react-redux";



interface IBeauty extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}



/* 美容單選項 */
const Beauty_Form = ({ register , current , editType , serviceData , setValue } : IBeauty ) => {


    // 目前在寵物資料欄位區，所選擇寵物品種
    const current_Pet = useSelector( ( state : any ) => state.Pet.current_Pet ) ;


    // 美容價格
    const price = useSelector( ( state : any ) => state.Beauty.Beauty_Price ) ;

    // 服務類型
    const type  = useSelector( ( state : any ) => state.Service.current_Create_Service_Type ) ;

    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;


    // 清空 _ 所有選項
    const clear_All_Options = () => {
    
        setValue( 'beauty_Option_Body' , null ) ;  
        setValue( 'beauty_Option_Head' , null ) ;
        setValue( 'beauty_Option_Ear' , null ) ;
        setValue( 'beauty_Option_Tail' , null ) ;
        setValue( 'beauty_Option_Foot' , null ) ;
        setValue( 'beauty_Option_Other' , null ) ;

    } ;


    // 清空 _ 特定列選項
    const clear_Row_Options = ( row_Type : 'Body' | 'Head' | 'Ear' | 'Tail' | 'Foot' | 'Other' ) => 
              setValue( 'beauty_Option_' + row_Type , null ) ;  


    const padding = { paddingLeft : "40px" } as const ;


   return <>

              <b className="tag is-large is-danger m_Right_20" >

                    <i className="fas fa-cut"></i> &nbsp; 美 容

                    { /* for 新增 */ }
                    { ( price !== 0 && !editType && current === '美容' ) &&

                        <>
                            &nbsp;&nbsp;
                            <b className="tag is-rounded is-white f_12"  > 
                                小計 : <span className="fRed"> &nbsp; 
                                            { /* 如果有調整 "單次美容" ( single_beauty_price )，以調整後的單次美容優先 */ }  
                                            { current_Pet?.single_beauty_price ? current_Pet?.single_beauty_price : price }      
                                            &nbsp;
                                        </span> 
                                    元 
                            </b> &nbsp;
                            { type && <span> ( { type } ) </span> }
                        </>

                    }

                    { /* 沒有預設價格 */ }
                    { (  current_Pet && !price && !editType && current === '美容' ) &&
                        <b className="tag is-rounded is-white m_Left_10 m_Right_10 f_12" >  
                            <i className="fas fa-exclamation"></i> &nbsp; 品種： <span className="fRed">  { current_Pet.species } </span> ，沒有設定預設價格 
                        </b>
                    }


                    { /* for 編輯 */ }
                    { ( editType && serviceData.payment_method === '現金' &&  current === '美容' ) &&
                    
                        <>  
                            <b className="tag is-rounded is-white f_12 m_Left_10 m_Right_10" > 小計 : <span style={{color:"red"}}> &nbsp; { serviceData.beauty_fee } &nbsp; </span> 元 </b>
                            ( { serviceData.payment_type } )   
                        </>

                    }

              </b>

              <b className="tag is-medium hover pointer"  onClick={ () => clear_All_Options() }> <i className="fas fa-redo"></i>&nbsp;重新填寫 </b>

              { /* 收折鈕 */ }
              <label className="label relative" style={{top:"-40px"}}> { Folding_Bt }  </label>

              <br/>

              { /* 新增 / 編輯 */ }
              { is_folding ||
             
                <div className="columns is-multiline  is-mobile">

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 身 體 </b>
                    </div>

                    <div className="column is-10-desktop">

                        ( 短 ) &nbsp; &nbsp;
                        <input type="radio" value="小電剪剃光"  {...register("beauty_Option_Body")} /> 小電剪剃光 &nbsp; &nbsp;
                        <input type="radio" value="1.5mm"     {...register("beauty_Option_Body")} /> 1.5mm      &nbsp; &nbsp;
                        <input type="radio" value="2mm"       {...register("beauty_Option_Body")} /> 2mm <br/>
                        ( 中 ) &nbsp; &nbsp;
                        <input type="radio" value="3mm"   {...register("beauty_Option_Body")} /> 3mm &nbsp; &nbsp;
                        <input type="radio" value="6.4mm" {...register("beauty_Option_Body")} /> 6.4mm &nbsp; &nbsp;
                        ( 長 ) &nbsp; &nbsp;
                        <input type="radio" value="9.6mm" {...register("beauty_Option_Body")} /> 9.6mm &nbsp; &nbsp;
                        <input type="radio" value="13mm"  {...register("beauty_Option_Body")} /> 13mm &nbsp; &nbsp; &nbsp; 
                        
                        <b className="delete" onClick={ () => clear_Row_Options( 'Body' )  } ></b>

                    </div>

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 頭 臉 </b>
                    </div>

                    <div className="column is-10-desktop">

                        <input type="radio" value="留頭"     {...register("beauty_Option_Head")} /> 留頭    &nbsp; &nbsp;
                        <input type="radio" value="修圓"     {...register("beauty_Option_Head")} /> 修圓    &nbsp; &nbsp;
                        <input type="radio" value="嘴邊修短" {...register("beauty_Option_Head")} /> 嘴邊修短  &nbsp; &nbsp;
                        <input type="radio" value="貴賓嘴"   {...register("beauty_Option_Head")} /> 貴賓嘴   &nbsp; &nbsp;
                        <input type="radio" value="雪納瑞頭" {...register("beauty_Option_Head")} /> 雪納瑞頭  &nbsp; &nbsp;
                        <input type="radio" value="比熊頭"   {...register("beauty_Option_Head")} /> 比熊頭   &nbsp; &nbsp; &nbsp; 

                        <b className="delete" onClick={ () => clear_Row_Options( 'Head' )  } ></b>
                        
                    </div>

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 耳 朵 </b>
                    </div>

                    <div className="column is-10-desktop">

                        <input type="radio" value="不剪"      {...register("beauty_Option_Ear")} /> 不剪       &nbsp; &nbsp;
                        <input type="radio" value="稍修"      {...register("beauty_Option_Ear")} /> 稍修       &nbsp; &nbsp;
                        <input type="radio" value="剪短至耳緣" {...register("beauty_Option_Ear")} /> 剪短至耳緣  &nbsp; &nbsp;
                        <input type="radio" value="剪短一半"   {...register("beauty_Option_Ear")} /> 剪短一半   &nbsp; &nbsp;
                        <input type="radio" value="耳罩"      {...register("beauty_Option_Ear")} /> 耳罩      &nbsp; &nbsp;
                        <input type="radio" value="三角耳"    {...register("beauty_Option_Ear")} /> 三角耳     &nbsp; &nbsp; &nbsp; 

                        <b className="delete" onClick={ () => clear_Row_Options( 'Ear' )  } ></b>

                    </div>

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 尾 巴 </b>
                    </div>

                    <div className="column is-10-desktop">

                        <input type="radio" value="留整條"   {...register("beauty_Option_Tail")} /> 留整條  &nbsp; &nbsp;
                        <input type="radio" value="留一小節" {...register("beauty_Option_Tail")} /> 留一小節  &nbsp; &nbsp;
                        <input type="radio" value="留尾球"   {...register("beauty_Option_Tail")} /> 留尾球   &nbsp; &nbsp;
                        <input type="radio" value="剃光"     {...register("beauty_Option_Tail")} /> 剃光  &nbsp; &nbsp; &nbsp; 

                        <b className="delete" onClick={ () => clear_Row_Options( 'Tail' )  } ></b>

                    </div>

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 腳 </b>
                    </div>

                    <div className="column is-10-desktop">

                        <input type="radio" value="靴子"         {...register("beauty_Option_Foot")} /> 靴子  &nbsp; &nbsp;
                        <input type="radio" value="腳球"         {...register("beauty_Option_Foot")} /> 腳球  &nbsp; &nbsp;
                        <input type="radio" value="貴賓腳"       {...register("beauty_Option_Foot")} /> 貴賓腳  &nbsp; &nbsp;
                        <input type="radio" value="腳跟全身一樣長" {...register("beauty_Option_Foot")} /> 腳跟全身一樣長  &nbsp; &nbsp;
                        <input type="radio" value="腳柱"         {...register("beauty_Option_Foot")} /> 腳柱  &nbsp; &nbsp; &nbsp; 

                        <b className="delete" onClick={ () => clear_Row_Options( 'Foot' )  } ></b>

                    </div>

                    <div className="column is-2-desktop" style={padding}>
                        <b className="tag is-large relative is-white"> 其 他 </b>
                    </div>

                    <div className="column is-10-desktop">

                        <input type="radio" value="頭、尾、腳、身體全光都不留"  {...register("beauty_Option_Other")} /> 頭、尾、腳、身體全光都不留  &nbsp; &nbsp;
                        <input type="radio" value="原造型縮短"  {...register("beauty_Option_Other")} /> 原造型縮短  &nbsp; &nbsp;
                        <input type="radio" value="手剪"  {...register("beauty_Option_Other")} /> 手剪  &nbsp; &nbsp; &nbsp; 

                        <b className="delete" onClick={ () => clear_Row_Options( 'Other' )  } ></b>

                    </div>

                </div>

              } 
              <hr/>

          </>

} ;

//export default React.memo( Beauty_Form , () => true ) ;
export default Beauty_Form
       