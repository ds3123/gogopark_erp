import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";
import { useSelector } from "react-redux";


interface IBath extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 洗澡單選項 */
const Bath_Form = ( { register , current , editType, serviceData , setValue } : IBath ) => {


    // 目前在寵物資料欄位區，所選擇寵物品種
    const current_Pet = useSelector( ( state : any ) => state.Pet.current_Pet ) ;


    // 洗澡價格
    const price = useSelector( ( state : any ) => state.Bath.Bath_Price ) ;

    // 服務類型
    const type  = useSelector( ( state : any ) => state.Service.current_Create_Service_Type ) ;
    

    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding( false ) ; 


    // 清空 _ 所有選項
    const clear_All_Options = () => {
    
        setValue( 'bath_Option_1' , null ) ;  
        setValue( 'bath_Option_2' , null ) ;
        setValue( 'bath_Option_3' , null ) ;
        setValue( 'bath_Option_4' , null ) ;
        setValue( 'bath_Option_5' , null ) ;
        setValue( 'bath_Option_6' , null ) ;

    } ;


    // 清空 _ 特定列選項
    const clear_Row_Options = ( row_Num : '1' | '2' | '3' | '4' | '5' | '6' ) => 
              setValue( 'bath_Option_' + row_Num , null ) ;  
       

    return <>

                <b className="tag is-large is-success m_Right_20"> 
                
                    <i className="fas fa-bath"></i> &nbsp; 洗 澡

                    { /* 顯示 : 洗澡價格 */ }

                    { /* for 新增 */ }
                    { ( price !== 0 && !editType && current === '洗澡' ) &&

                        <>
                            <b className="tag is-rounded is-white m_Left_10 m_Right_10 f_12" > 
                                    小計 : <span className="fRed" > 
                                            &nbsp; 
                                                { /* 如果有調整 "單次洗澡" ( single_bath_price )，以調整後的單次洗澡優先 */ }  
                                                { ( type === "單次洗澡" && current_Pet?.single_bath_price ) ? current_Pet?.single_bath_price : price } 
                                            &nbsp; </span> 元 
                            </b>
                            { type && <span> ( { type } ) </span> }
                        </>

                    }

                    { /* 沒有預設價格 */ }
                    { (  current_Pet && !price && !editType && current === '洗澡' ) &&
                        <b className="tag is-rounded is-white m_Left_10 m_Right_10 f_12" >  
                            <i className="fas fa-exclamation"></i> &nbsp; 品種： <span className="fRed">  { current_Pet.species } </span> ，沒有設定預設價格 
                        </b>
                    }

                    { /* for 編輯 */ }
                    { ( editType && serviceData.payment_method === '現金' &&  current === '洗澡' ) &&
                    
                        <>  
                            <b className="tag is-rounded is-white f_12 m_Left_10 m_Right_10" > 
                                小計 : <span className="fRed"> &nbsp; { serviceData.bath_fee } &nbsp; </span> 元 
                            </b>
                            ( { serviceData.payment_type } )   
                        </>

                    }

                </b>

                <b className="tag is-medium hover pointer" onClick={ () => clear_All_Options() }> <i className="fas fa-redo"></i>&nbsp;重新填寫 </b>
    
                { /* 收折鈕 */ }
                <label className="label relative"   style={{top:"-40px"}}> { Folding_Bt }  </label>
            

                { /* 新增 / 編輯 */ }
                { is_folding ||

                    <div className="columns is-multiline is-mobile m_Top_30 m_Bottom_30">

                        <div className="column is-2-desktop"> <b className="tag is-large is-white"> 第一次洗澡 </b> </div>
                        <div className="column is-10-desktop">

                            <input type="radio" value="第一道"         { ...register("bath_Option_1")} /> 第一道  &nbsp; &nbsp;
                            <input type="radio" value="伊斯特除蚤_皮膚"  { ...register("bath_Option_1")} /> 伊斯特除蚤_皮膚   &nbsp; &nbsp;
                            <input type="radio" value="貓咪"           { ...register("bath_Option_1")} /> 貓咪 &nbsp; &nbsp;
                            <input type="radio" value="自備"           { ...register("bath_Option_1")} /> 自備 &nbsp; &nbsp; &nbsp;

                            <b className="delete" onClick={ () => clear_Row_Options( '1' )  } ></b>

                        </div>

                        <div className="column is-2-desktop"><b className="tag is-large is-white"> 第二次洗澡 </b></div>

                        <div className="column is-10-desktop">

                            <input type="radio" value="第一道"         {...register("bath_Option_2")} /> 第一道  &nbsp; &nbsp;
                            <input type="radio" value="伊斯特除蚤_皮膚" {...register("bath_Option_2")} /> 伊斯特除蚤_皮膚 &nbsp; &nbsp;
                            <input type="radio" value="抗氧"  {...register("bath_Option_2")} /> 抗氧  &nbsp; &nbsp;
                            <input type="radio" value="白色"  {...register("bath_Option_2")} /> 白色  &nbsp; &nbsp;
                            <input type="radio" value="護色"  {...register("bath_Option_2")} /> 護色  &nbsp; &nbsp;
                            <input type="radio" value="澎毛"  {...register("bath_Option_2")} /> 澎毛  &nbsp; &nbsp;
                            <input type="radio" value="淡雅"  {...register("bath_Option_2")} /> 淡雅  &nbsp; &nbsp;
                            <input type="radio" value="貓咪"  {...register("bath_Option_2")} /> 貓咪  &nbsp; &nbsp;
                            <input type="radio" value="潤絲"  {...register("bath_Option_2")} /> 潤絲  &nbsp; &nbsp;
                            <input type="radio" value="自備"  {...register("bath_Option_2")} /> 自備  &nbsp; &nbsp; &nbsp;
                           
                            <b className="delete" onClick={ () => clear_Row_Options( '2' )  } ></b>

                        </div>

                        <div className="column is-2-desktop"><b className="tag is-large is-white"> 第一次浸泡 </b></div>

                        <div className="column is-10-desktop">

                            <input type="radio" value="滴食鹽水"  {...register("bath_Option_3")} /> 滴食鹽水 &nbsp; &nbsp; &nbsp; 
                          
                            <b className="delete" onClick={ () => clear_Row_Options( '3' )  } ></b>

                        </div>

                        <div className="column is-2-desktop"><b className="tag is-large is-white"> 第三次洗澡 </b> <br/>
                            <span className="fDred"> ( 必要時 或 重洗 ) </span>
                        </div>

                        <div className="column is-10-desktop">

                            <input type="radio" value="第一道"  {...register("bath_Option_4")} /> 第一道  &nbsp; &nbsp;
                            <input type="radio" value="伊斯特除蚤_皮膚"  {...register("bath_Option_4")} /> 伊斯特除蚤_皮膚  &nbsp; &nbsp;
                            <input type="radio" value="白色"  {...register("bath_Option_4")} /> 白色  &nbsp; &nbsp;
                            <input type="radio" value="護色"  {...register("bath_Option_4")} /> 護色  &nbsp; &nbsp;
                            <input type="radio" value="澎毛"  {...register("bath_Option_4")} /> 澎毛  &nbsp; &nbsp;
                            <input type="radio" value="貓咪"  {...register("bath_Option_4")} /> 貓咪  &nbsp; &nbsp;
                            <input type="radio" value="潤絲"  {...register("bath_Option_4")} /> 潤絲  &nbsp; &nbsp;
                            <input type="radio" value="自備"  {...register("bath_Option_4")} /> 自備  &nbsp; &nbsp; &nbsp; 

                            <b className="delete" onClick={ () => clear_Row_Options( '4' )  } ></b>

                        </div>

                        <div className="column is-2-desktop"><b className="tag is-large is-white"> 第二次浸泡 </b></div>

                        <div className="column is-10-desktop">

                            <input type="radio" value="滴食鹽水"  {...register("bath_Option_5")} /> 滴食鹽水  &nbsp; &nbsp; &nbsp;

                            <b className="delete" onClick={ () => clear_Row_Options( '5' )  } ></b>

                        </div>

                        <div className="column is-2-desktop"><b className="tag is-large is-white"> 烘 乾 </b></div>
                        
                        <div className="column is-10-desktop">

                            <input type="radio" value="進烘箱" {...register("bath_Option_6")} /> 進烘箱  &nbsp; &nbsp;
                            <input type="radio" value="手吹"  {...register("bath_Option_6")} /> 手吹 &nbsp; &nbsp; &nbsp;

                            <b className="delete" onClick={ () => clear_Row_Options( '6' )  } ></b>

                        </div>

                    </div>

                }
                 
                <hr/><br/>

           </>
} ;



// export default React.memo( Bath_Form , () => true ) ;
 export default Bath_Form ;