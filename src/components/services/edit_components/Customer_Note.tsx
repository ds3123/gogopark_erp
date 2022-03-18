import React , { FC } from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";


interface ICustomer_Note extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


{ /*  自備物品、主人交代、櫃台備註  */ }
const Customer_Note : FC<ICustomer_Note> = ({ register , editType } ) => {

   const { is_folding , Folding_Bt }     = useSection_Folding( !editType ? true : false ) ;  // 收折區塊

   return <>
               <hr/> 

               { /* 標題 */ }
               <label className="label relative m_Top_50"  >

                   <i className="fas fa-edit"></i> &nbsp; 客戶交代、物品 &nbsp;

                   { Folding_Bt } { /* 收折鈕 */ }

               </label> <br/>

               { /* 是否收折 : 客戶資料 */ }
               { is_folding ||

                  <>

                    <div className="columns is-multiline  is-mobile">

                       { /* 自備物品 */}
                       <div className="column is-2-desktop" style={{textAlign:'right'}}>
                           <span className="tag is-large is-white p_Bottom_10"> 自備物品 : </span>
                       </div>

                       <div className="column is-7-desktop">
                           <input type="checkbox" value="項圈_胸背"  {...register("customer_Object")} /> 項圈_胸背 &nbsp; &nbsp;
                           <input type="checkbox" value="牽繩"       {...register("customer_Object")} /> 牽繩     &nbsp; &nbsp;
                           <input type="checkbox" value="提籠_提袋"  {...register("customer_Object")} /> 提籠_提袋 &nbsp; &nbsp;
                           <input type="checkbox" value="衣服"       {...register("customer_Object")} /> 衣服     &nbsp; &nbsp;
                           <input type="checkbox" value="口罩"       {...register("customer_Object")} /> 口罩     &nbsp; &nbsp;
                           <input type="checkbox" value="洗劑"       {...register("customer_Object")} /> 洗劑     &nbsp; &nbsp;
                           <input type="checkbox" value="耳藥"       {...register("customer_Object")} /> 耳藥     &nbsp; &nbsp;
                           <input type="checkbox" value="眼藥"       {...register("customer_Object")} /> 眼藥     &nbsp; &nbsp; <br/>
                       </div>

                       <div className="column is-1-desktop" style={{textAlign: "right"}}> 其他 :</div>

                       <div className="column is-2-desktop">
                           <input type="text" className="input" {...register("customer_Object_Other")} />
                       </div>

                       { /* 主人交代 */}
                       <div className="column is-2-desktop" style={{textAlign:'right'}}>
                           <span className="tag is-large is-white p_Bottom_10"> 主人交代 : </span></div>
                       <div className="column is-10-desktop">
                           <input type="checkbox" value="給水"   {...register("customer_Note")} /> 給水   &nbsp; &nbsp;
                           <input type="checkbox" value="遛"     {...register("customer_Note")} /> 遛     &nbsp; &nbsp;
                           <input type="checkbox" value="老犬"   {...register("customer_Note")} /> 老犬   &nbsp; &nbsp;
                           <input type="checkbox" value="心臟病" {...register("customer_Note")} /> 心臟病 &nbsp; &nbsp;
                           <input type="checkbox" value="會兇狗" {...register("customer_Note")} /> 會兇狗 &nbsp; &nbsp;
                           <input type="checkbox" value="會咬繩" {...register("customer_Note")} /> 會咬繩 &nbsp; &nbsp;
                       </div>

                       { /* 櫃台備註 */}
                       <div className="column is-2-desktop" style={{textAlign:'right'}}>
                           <span className="tag is-large is-white"> 櫃台備註 : </span>
                       </div>

                       <div className="column is-10-desktop">
                           <input type="text" className="input" {...register("admin_Customer_Note")} />
                       </div>

                   </div>

                   <br/>

                  </>
               }

               <hr/><br/>

          </>
} ;


export default Customer_Note ;

