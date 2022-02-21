
import React , { useState , useEffect } from  "react" ;
import { useForm , SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { get_H_M } from "utils/time/time"
import {useDispatch, useSelector} from "react-redux";
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import { useRating_Options } from "hooks/layout/useRating"
import Pet_Info_Title from "components/beautician/main_components/pet_info/Pet_Info_Title"

import { set_Current_Pet_Is_Done } from "store/actions/action_Beautician"



type Inputs = {

    entanglement : string ;
    dog_Hair     : string ;
    aggressive   : string ;
    eye          : string ;
    ear          : string ;
    skin         : string ;
    body         : string ;
    way          : string ;
    star         : string ;

    beautician_Note : string ;

} ;


{ /*  處理結果面板  */ }
const Inform_Customer_Options = () => {

    const dispatch = useDispatch() ;

    // 目前處理 _ 美容師姓名
    const current_Beautician = useSelector(( state : any ) => state.Beautician.Current_Beautician ) ;

    // 目前所點選 _ 寵物 / 服務
    const Current_Pet        = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;

    // 更新函式
    const update_Data        = useUpdate_Data() ;

    // 開始等待時間
    const [ time , set_Time ]               = useState('00 : 00' ) ;

    // 所有檢查項目皆正常
    const [ is_All_Good , set_Is_All_Good ] = useState(false ) ;


    // React Hook Form
    const { register  , handleSubmit , setValue , formState: { errors , isDirty , isValid } } =
        useForm<Inputs>({
                          mode : "all" ,
                        }) ;


    // 評分選項
    const rating_Options = useRating_Options('美容師評分', 'beautician_Rating', register , setValue ) ;

    // ---------------------------------------------------------------------

    // 點選 _ 所有檢查項目皆正常
    const click_Is_All_Good = ( bool : boolean ) => set_Is_All_Good( !bool ) ;

    // 點選 _ 時間
    const click_Time = () => set_Time(time === '00 : 00' ? get_H_M() : '00 : 00'  ) ;

    // 提交 _ 表單 ( 有問題 2016.06.16  )
    const onSubmit : SubmitHandler<Inputs> = ( data : any ) => {

            if( !Current_Pet['service_type'] ){
               alert('尚未選擇左側處理項目') ;
               return false ;
            }

        // ---------------------------------------------------------


            let check_Items = [ ] ;  // 檢查項目
            let service_Id  = '' ;   // 服務單 id
            let api         = '' ;   // api 路徑


        // ----------------------------------------------------------------------------------

            // 單選
            if( data['entanglement'] ) check_Items.push( data['entanglement'] ) ;
            if( data['dog_Hair'] )     check_Items.push( data['dog_Hair'] ) ;
            if( data['ear'] )          check_Items.push( data['ear'] ) ;
            if( data['eye'] )          check_Items.push( data['eye'] ) ;


            // 複選
            if( data['body'] )       check_Items.push( data['body'].join(',') ) ;
            if( data['skin'] )       check_Items.push( data['skin'].join(',') ) ;
            if( data['aggressive'] ) check_Items.push( data['aggressive'].join(',') ) ;


            // 設定 : service_Id、api
            if( Current_Pet['service_type'] === '基礎' ){ service_Id = Current_Pet['basic_id'] ;  api = '/basics'   } ;
            if( Current_Pet['service_type'] === '洗澡' ){ service_Id = Current_Pet['bath_id'] ;   api = '/bathes'   } ;
            if( Current_Pet['service_type'] === '美容' ){ service_Id = Current_Pet['beauty_id'] ; api = '/beauties' } ;


            // 驗證是否點選 _ 檢查項目
            if( check_Items.length === 0  && !is_All_Good ){
                alert('請點選確認 :　檢查項目')　;
                return false ;
            }

            if( time === '00 : 00' ){
                alert( '請點選時間' ) ;
                return false ;
            }

            // 美容師檢查項目
            const beautician_Report = is_All_Good ? '所有檢查項目皆正常' : check_Items.join(',') ;

            // 更新欄位
            const obj = {

                          beautician_name   : current_Beautician ? current_Beautician : '測試員' ,
                          beautician_report : beautician_Report ,

                          wait_way          : data['way'] ,
                          wait_time         : time ,

                          beautician_star   : data['beautician_Rating']  ,
                          beautician_note   : data['beautician_Note'] === '請選擇' ? '' : data['beautician_Note'] ,

                          shop_status       : '洗完等候中'

                        } ;


        // 更改欄位
        update_Data( api , service_Id , obj , '/beautician' , null , '處理結果已提交櫃台'  ) ;

        // 關掉 _ 右側滑動面板
        dispatch( set_Side_Panel(false , null ,{} ) ) ;

        // 關掉 _ 右側寵物資訊主畫面
        dispatch( set_Current_Pet_Is_Done( true ) );


    } ;


    // 若所點選 "所有檢查項目皆正常" -> 清除點選項目
    useEffect( ( ) => {

       if( is_All_Good ){

           setValue('entanglement' , '' ) ;
           setValue('dog_Hair'     , '' ) ;
           setValue('eye'          , '' ) ;
           setValue('ear'          , '' ) ;

           setValue('body'         , '' ) ;
           setValue('skin'         , '' ) ;
           setValue('aggressive'   , '' ) ;

       }


    } ,[ is_All_Good ] ) ;



   return <div className="relative">

               <b className="absolute f_14" style={{ top:"5px" , right : "70px" }}>
                   美容師 : <span className="fDred"> { current_Beautician ? current_Beautician : '測試員'  } </span>
               </b>

               { Current_Pet['service_type'] ? <Pet_Info_Title />  : <b className="tag is-large is-danger"> <i className="fas fa-exclamation"></i> &nbsp; 尚未選擇服務 </b>  }

               <br/><hr/><br/>

               <form onSubmit = { handleSubmit( onSubmit ) } >

                   <div className="columns is-multiline is-mobile" >

                       { /* 所有項目皆正常 */ }
                       <div className="column is-12-desktop" >

                           <div className = { is_All_Good ? 'tag is-large is-success' : 'tag is-large hover' }
                                style     = {{ width:"100%" }}
                                onClick   = { () => click_Is_All_Good( is_All_Good ) } >
                               <b> <i className="fas fa-check-circle" ></i> &nbsp; 所 有 檢 查 項 目 皆 正 常 </b>
                           </div>

                       </div>

                       { /* 檢查項目 */}
                       { is_All_Good ||

                           <>
                               <div className="column is-6-desktop">
                                   <b className="tag is-medium is-white"> 打 結 : </b> &nbsp; &nbsp;
                                   <input type="radio" value="打結_輕"  {...register("entanglement")} /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="打結_中"  {...register("entanglement")} /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="打結_重"  {...register("entanglement")} /> 重
                               </div>

                               <div className="column is-6-desktop">
                                   <b className="tag is-medium is-white"> 廢 毛 : </b> &nbsp; &nbsp;
                                   <input type="radio" value="廢毛_輕"  {...register("dog_Hair")} /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="廢毛_中"  {...register("dog_Hair")} /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="廢毛_重"  {...register("dog_Hair")} /> 重
                               </div>

                               <div className="column is-6-desktop">
                                   <b className="tag is-medium is-white"> 眼 睛 : </b> &nbsp; &nbsp;
                                   <input type="radio" value="左眼"     {...register("eye")} /> 左眼 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="右眼"     {...register("eye")} /> 右眼 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="兩眼"     {...register("eye")} /> 兩眼
                               </div>

                               <div className="column is-6-desktop">
                                   <b className="tag is-medium is-white"> 耳 朵 : </b> &nbsp; &nbsp;
                                   <input type="radio" value="左耳"     {...register("ear")} /> 左耳 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="右耳"     {...register("ear")} /> 右耳 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="radio" value="兩耳"     {...register("ear")} /> 兩耳
                               </div>

                               <div className="column is-12-desktop">
                                   <b className="tag is-medium is-white"> 身 體 : </b> &nbsp; &nbsp;
                                   <input type="checkbox" value="身體_壁蝨"     {...register("body")} /> 壁蝨 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="身體_跳蚤"     {...register("body")} /> 跳蚤 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="身體_建議點藥" {...register("body")} /> 建議點藥 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <span className="fDblue"> ( 可複選 ) </span>
                               </div>

                               <div className="column is-12-desktop">
                                   <b className="tag is-medium is-white"> 皮 膚 : </b> &nbsp; &nbsp;
                                   <input type="checkbox" value="皮膚_略紅"   {...register("skin")} /> 略紅 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="皮膚_紅點"   {...register("skin")} /> 紅點 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="皮膚_結痂"   {...register("skin")} /> 結痂 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="皮膚_傷口"   {...register("skin")} /> 傷口 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="皮膚_建議看醫生"   {...register("skin")} /> 建議看醫生 &nbsp; &nbsp; &nbsp; &nbsp;

                                   <span className="fDblue"> ( 可複選 ) </span>

                               </div>

                               <div className="column is-12-desktop">

                                   <b className="tag is-medium is-white"> 會 兇 : </b> &nbsp; &nbsp;
                                   <input type="checkbox" value="會兇_擠肛門腺" {...register("aggressive")} /> 擠肛門腺 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="會兇_碰頭"     {...register("aggressive")} /> 碰頭 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="會兇_剪指甲"   {...register("aggressive")} /> 剪指甲 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="會兇_清耳朵"   {...register("aggressive")} /> 清耳朵 &nbsp; &nbsp; &nbsp; &nbsp;
                                   <input type="checkbox" value="會兇_其他"     {...register("aggressive")} /> 其他 &nbsp; &nbsp; &nbsp; &nbsp;

                                   <span className="fDblue"> ( 可複選 ) </span>

                               </div>

                           </>

                       }

                   </div>

                   <br/> <hr/> <br/><br/>

                   { /* 美容師後續處理 */ }
                   <div className="columns is-multiline is-mobile" >

                       <div className="column is-12-desktop" >

                           <i className="fas fa-door-open"></i>&nbsp;<b className="tag is-medium is-white"> 洗澡 / 美容後處理方式 : </b> &nbsp; &nbsp;

                           <div className="select is-normal relative" >
                               <select { ...register( "way" ) }>
                                   <option value = "進籠子_等候" > 進籠子 _ 等候 </option>
                                   <option value = "運動場_等候" > 運動場 _ 等候 </option>
                                   <option value = "美容桌_等候">  美容桌 _ 等候 </option>
                               </select>
                           </div>  &nbsp; &nbsp; &nbsp; &nbsp;

                           <b className= { time === '00 : 00' ? "tag is-large hover" : "tag is-large is-success" }  onClick={ click_Time } > { time } </b>

                       </div>

                       { /* 評分選項 */ }
                       { rating_Options }

                       <div className="column is-12-desktop" >

                           <i className="fas fa-pencil-alt"></i>&nbsp;<b className="tag is-medium is-white"> 美容師備註 : </b> &nbsp; &nbsp;

                           <div className="select is-normal realtive" >
                               <select { ...register( "beautician_Note" ) }>
                                   <option value="請選擇"> 請選擇 </option>
                                   <option value="會咬人"> 會咬人 </option>
                                   <option value="廢毛太多"> 廢毛太多 </option>
                                   <option value="過動、不好處理"> 過動、不好處理 </option>
                               </select>
                           </div>  &nbsp; &nbsp; &nbsp; &nbsp;

                       </div>

                   </div>

                   <br/><br/><br/>

                   <div className="has-text-centered" >
                       <button  type="submit" className="button is-primary relative is-medium" style={{ top: "-10px" }} >
                           提交表單
                       </button>
                   </div> <br/>

               </form>

            </div>



};

export default Inform_Customer_Options