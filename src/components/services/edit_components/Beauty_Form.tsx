import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";
import {useSelector} from "react-redux";




/* 美容單選項 */
const Beauty_Form : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } ) => {

    // 美容價格
    const price = useSelector( ( state:any ) => state.Beauty.Beauty_Price ) ;

    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;


    const padding = { paddingLeft : "70px" } as const ;


   return <>

              <b className="tag is-large is-danger" >

                  <i className="fas fa-cut"></i> &nbsp; 美 容

                  { /* 顯示 : 洗澡價格 */ }
                  { price !== 0 &&

                      <>
                          &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 : <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元 </b>
                      </>

                  }

              </b>

              { /* 收折鈕 */ }
              <label className="label relative" style={{top:"-40px"}}> { Folding_Bt }  </label>

              <br/>

              { /* 是否收折 : 客戶資料 */ }
              { is_folding ||

                   <div className="columns is-multiline  is-mobile">

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative "> 身 體 </b>
                       </div>

                       <div className="column is-10-desktop">

                           ( 短 ) &nbsp; &nbsp;
                           <input type="radio" value="小電剪剃光" {...register("beauty_Option_Body")} /> 小電剪剃光 &nbsp; &nbsp;
                           <input type="radio" value="1.5mm"     {...register("beauty_Option_Body")} /> 1.5mm      &nbsp; &nbsp;
                           <input type="radio" value="2mm"       {...register("beauty_Option_Body")} /> 2mm <br/>
                           ( 中 ) &nbsp; &nbsp;
                           <input type="radio" value="3mm"   {...register("beauty_Option_Body")} /> 3mm &nbsp; &nbsp;
                           <input type="radio" value="6.4mm" {...register("beauty_Option_Body")} /> 6.4mm &nbsp; &nbsp;
                           ( 長 ) &nbsp; &nbsp;
                           <input type="radio" value="9.6mm" {...register("beauty_Option_Body")} /> 9.6mm &nbsp; &nbsp;
                           <input type="radio" value="13mm"  {...register("beauty_Option_Body")} /> 13mm

                       </div>

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative"> 頭 臉 </b>
                       </div>

                       <div className="column is-10-desktop">

                           <input type="radio" value="留頭"     {...register("beauty_Option_Head")} /> 留頭    &nbsp; &nbsp;
                           <input type="radio" value="修圓"     {...register("beauty_Option_Head")} /> 修圓    &nbsp; &nbsp;
                           <input type="radio" value="嘴邊修短" {...register("beauty_Option_Head")} /> 嘴邊修短 &nbsp; &nbsp;
                           <input type="radio" value="貴賓嘴"   {...register("beauty_Option_Head")} /> 貴賓嘴   &nbsp; &nbsp;
                           <input type="radio" value="雪納瑞頭" {...register("beauty_Option_Head")} /> 雪納瑞頭  &nbsp; &nbsp;
                           <input type="radio" value="比熊頭"   {...register("beauty_Option_Head")} /> 比熊頭

                       </div>

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative"> 耳 朵 </b>
                       </div>

                       <div className="column is-10-desktop">

                           <input type="radio" value="不剪"  {...register("beauty_Option_Ear")} /> 不剪    &nbsp; &nbsp;
                           <input type="radio" value="稍修"  {...register("beauty_Option_Ear")} /> 稍修    &nbsp; &nbsp;
                           <input type="radio" value="剪短至耳緣"  {...register("beauty_Option_Ear")} /> 剪短至耳緣 &nbsp; &nbsp;
                           <input type="radio" value="剪短一半"  {...register("beauty_Option_Ear")} /> 剪短一半     &nbsp; &nbsp;
                           <input type="radio" value="耳罩"  {...register("beauty_Option_Ear")} /> 耳罩   &nbsp; &nbsp;
                           <input type="radio" value="三角耳"  {...register("beauty_Option_Ear")} /> 三角耳

                       </div>

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative"> 尾 巴 </b>
                       </div>

                       <div className="column is-10-desktop">

                           <input type="radio" value="留整條"  {...register("beauty_Option_Tail")} /> 留整條  &nbsp; &nbsp;
                           <input type="radio" value="留一小節"  {...register("beauty_Option_Tail")} /> 留一小節  &nbsp; &nbsp;
                           <input type="radio" value="留尾球"  {...register("beauty_Option_Tail")} /> 留尾球   &nbsp; &nbsp;
                           <input type="radio" value="剃光"  {...register("beauty_Option_Tail")} /> 剃光

                       </div>

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative"> 腳 </b>
                       </div>

                       <div className="column is-10-desktop">

                           <input type="radio" value="靴子"  {...register("beauty_Option_Foot")} /> 靴子  &nbsp; &nbsp;
                           <input type="radio" value="腳球"  {...register("beauty_Option_Foot")} /> 腳球  &nbsp; &nbsp;
                           <input type="radio" value="貴賓腳"  {...register("beauty_Option_Foot")} /> 貴賓腳  &nbsp; &nbsp;
                           <input type="radio" value="腳跟全身一樣長"  {...register("beauty_Option_Foot")} /> 腳跟全身一樣長  &nbsp; &nbsp;
                           <input type="radio" value="腳柱"  {...register("beauty_Option_Foot")} /> 腳柱

                       </div>

                       <div className="column is-2-desktop" style={padding}>
                           <b className="tag is-white is-large relative"> 其 他 </b>
                       </div>

                       <div className="column is-10-desktop">

                           <input type="radio"
                                  value="頭、尾、腳、身體全光都不留"  {...register("beauty_Option_Other")} /> 頭、尾、腳、身體全光都不留  &nbsp; &nbsp;
                           <input type="radio" value="原造型縮短"  {...register("beauty_Option_Other")} /> 原造型縮短  &nbsp; &nbsp;
                           <input type="radio" value="手剪"  {...register("beauty_Option_Other")} /> 手剪  &nbsp; &nbsp;

                       </div>


                   </div>

              }

              <hr/>

          </>

} ;

export default React.memo( Beauty_Form , () => true ) ;