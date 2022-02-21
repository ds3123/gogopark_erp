

import { FC, useState , useEffect , useContext } from "react"
import {  Input } from "templates/form/Input";
import { set_Customer_Relatives_Num } from "store/actions/action_Customer"
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify" ;


import axios  from "utils/axios";


type cRel = { 
    current  : string | undefined ;
    register : any ;
    setValue : any ;
}


// @ 關係人區塊
const Customer_Relatives_Columns : FC< cRel > = ( { current , register , setValue  } ) => {

    const dispatch = useDispatch() ; 

    // 目前客戶 : 所有關係人 
    const Current_Customer_Relatives = useSelector( ( state : any ) => state.Customer.Current_Customer_Relatives )

    // 預設關係人數
    const [ rel_Arr , set_Rel_Arr ]  = useState( [ 1 ] ) ;

    // 點選 _ 新增 : 關係人 
    const click_Add_Relatives = () => {
    
        set_Rel_Arr( [ ...rel_Arr , rel_Arr.length + 1 ] ) ;

    } ;

    // 點選 _ 刪除 : 關係人 
    const click_Delete_Relatives = ( table_Id : string , customer_Id : string ) => {

        axios.put( `/customers/update_relation/${ table_Id }` , { is_archive : 1 } ).then( res => {

            toast( `🦄 資料已封存。如欲恢復，請洽詢管理員。`, { position: "top-left", autoClose: 1500, hideProgressBar: false, closeOnClick: true });

            // 查詢 _ 客戶關係人、刷新頁面
            axios.get( `/customers/show_relations/${ customer_Id }` ).then( res => { 
                set_Rel_Arr( res.data )
            })  

        })
    
    } ;

    // 點選 _ 關係人列表按鈕
    const click_Relatives_Btn = ( data : any ) => {

        set_Rel_Arr( [1] ) ;  // 設定 _ 顯示一個關係人欄位區塊

        setValue( "customer_Relative_Name_1"      , data['name'] ) ;
        setValue( "customer_Relative_Type_1"      , data['type'] ) ;
        setValue( "customer_Relative_Family_1"    , data['tag'] ) ;
        setValue( "customer_Relative_Cellphone_1" , data['mobile_phone'] ) ;
        setValue( "customer_Relative_Telephone_1" , data['tel_phone'] ) ;
        setValue( "customer_Relative_Sex_1"       , data['sex'] ) ;
        setValue( "customer_Relative_Id_1"        , data['id'] ) ;
        setValue( "customer_Relative_Address_1"   , data['address'] ) ;
        
    }

    // @ 是否處於 _ 帶入舊關係人資料
    const is_Setting_Existing_Data  = current && Current_Customer_Relatives.length > 0 ;

    // @ 是否處於 _ 編輯客戶資料
    const is_Editting_Customer_Data = !current && Current_Customer_Relatives.length > 0 ;

    // 設定 _ 關係人 : 數目 
    useEffect( ( ) => { 
    
       dispatch( set_Customer_Relatives_Num( rel_Arr.length ) )
      
    } , [ rel_Arr ] ) ;


    useEffect( () => { 

       // 【 新增 】帶入客戶資料 _ 先清除預設 ( 關係人 ) 填寫欄位
       if( is_Setting_Existing_Data ) set_Rel_Arr( [] ) ;  

       // 【 編輯 】設定 _ 關係人
       if( is_Editting_Customer_Data ) set_Rel_Arr( Current_Customer_Relatives ) ; 

    } , [ current , Current_Customer_Relatives ] ) ;


    const rel = { display:"inline-block" , width:"80%" , height:"40px" , overflow : "hidden" , top:"15px" }

    return <>

                <label className="label" style={{ fontSize : "1.3em" }} >

                    <i className = "fas fa-users"></i> &nbsp; 關係人 &nbsp;

                    { /* 關係人列 */ }  
                    <span className="relative" style={ rel }>

                        { ( current && Current_Customer_Relatives.length > 0 ) && 
                        
                            Current_Customer_Relatives.map( ( x:any , y:number ) => {

                                    return <b key={y} className="tag is-medium m_Right_20 pointer" onClick = { () => click_Relatives_Btn( x ) } > 
                                                { x['name'] } ( { x['tag'] } / { x['type'] } ) 
                                           </b>    

                            })
                            
                        } 

                    </span> 
                    

                    { /* 新增鈕  */ }

                    { !is_Setting_Existing_Data &&
                    
                      <b className = "tag is-medium is-success is-light hover relative" 
                        style     = {{ float : "right" }}
                        onClick   = { () => click_Add_Relatives() } > 新 增 </b> 
                    
                    }


                </label> <br/>

                { 

                  rel_Arr.map( ( x : any , y : number ) => { 


                      if( x['is_archive'] === 1 ) return null ;  // 封存資料

                      const index = ( y+1 ).toString()  // 索引數字

                      return  <div className="relative" key={ y } >

                                { /* 索引 */ }

                                { !is_Setting_Existing_Data &&
                                   <b className="tag is-medium m_Bottom_20 relative" style={{ left:"-10px" }}>  關係人 _ { index }   </b> 
                                }

                                { /* 封存鈕 */ }
                                { y === 0 || 
                                     
                                    <b className="relative pointer" style={{ float:"right" , top:"10px" }} 
                                       onClick = { () => { if( window.confirm("確認要 : 封存此關係人資料 ?") ) click_Delete_Relatives( x['relation_id'] , x['customer_id'] ) }  }>
                                       <i className="fas fa-download"></i>
                                    </b> 

                                }

                            
                                { /* ----- 關係人欄位 -----  */ } 
                                <div className="columns is-multiline  is-mobile">

                                    <Input type="text" name={ `customer_Relative_Name_${ index }` } label="姓 名" register={register} error={ null } icon="fas fa-user" asterisk={true} columns="3" />
                
                                    { /* 類型 */ }    
                                    <div className="column is-3-desktop required">
                
                                        <p> 類 型 </p>
                
                                        <div className="control has-icons-left">
                
                                            <div className="select" >
                                                <select { ...register( `customer_Relative_Type_${ index}` ) } >
                                                    <option value="緊急連絡人"> 緊急連絡人 </option>
                                                    <option value="介紹人">    介紹人    </option>
                                                </select>
                                            </div>
                
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-globe"></i>
                                            </div>
                
                                        </div>
                
                                    </div>
                
                                    { /* 關係 */ }
                                    <div className="column is-2-desktop required">
                
                                        <p> 關 係 </p>
                
                                        <div className="control has-icons-left">
                
                                            <div className="select">
                                                <select { ...register( `customer_Relative_Family_${ index }` ) }  >
                                                    <option value="請選擇"> 請選擇 </option>
                                                    <option value="父"> 父 </option>
                                                    <option value="母"> 母 </option>
                                                    <option value="兄"> 兄 </option>
                                                    <option value="弟"> 弟 </option>
                                                    <option value="姊"> 姊 </option>
                                                    <option value="妹"> 妹 </option>
                                                    <option value="夫妻"> 夫妻 </option>
                                                    <option value="同學"> 同學 </option>
                                                    <option value="朋友"> 朋友 </option>
                                                    <option value="其他"> 其他 </option>
                                                </select>
                                            </div>
                
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-user-friends"></i>
                                            </div>
                
                                        </div>
                
                                    </div>
                
                                    <Input type="text" name={ `customer_Relative_Cellphone_${ index }` }  label="手機號碼" register={register} error={ null } icon="fas fa-mobile-alt" asterisk={true} columns="2" />
                                    <Input type="text" name={ `customer_Relative_Telephone_${ index }` }  label="家用電話" register={register} error={ null } icon="fas fa-phone" asterisk={false} columns="2" />
                
                                    { /* 性別 */ }  
                                    <div className="column is-2-desktop">
                
                                        <p> 性 別 </p>
                
                                        <div className="control has-icons-left">
                
                                            <div className="select">
                                                <select {...register( `customer_Relative_Sex_${ index }` )}  >
                                                    <option value="請選擇">請選擇</option>
                                                    <option value="男"> 男 </option>
                                                    <option value="女"> 女 </option>
                                                </select>
                                            </div>
                
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-venus-mars"></i>
                                            </div>
                
                                        </div>
                
                                    </div>
                
                                    <Input type="text" name={ `customer_Relative_Id_${ index }` }      label="身分證字號" register={register} error={ null } icon="fas fa-id-card-alt" asterisk={ false } columns="3"  />
                                    <Input type="text" name={ `customer_Relative_Address_${ index }` } label="通訊地址"   register={register} error={ null } icon="fas fa-home"        asterisk={ false } columns="7"  />
    
                                </div>   

                                <br/><br/>
                              
                             </div> 


                  }) 
                  
                }   


           </>
    
} ;


export default Customer_Relatives_Columns
       