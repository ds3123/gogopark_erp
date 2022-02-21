
import React, {useContext, useEffect, useState} from "react"
import {SidePanelContext} from "templates/panel/Side_Panel";
import {SubmitHandler, useForm} from "react-hook-form";
import {IEmployee} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";
import { schema_Employee }  from "utils/validator/form_validator" ;
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";

import Operation_Log from "components/management/employee/edit/tabs/Operation_Log";
import Statistic_Chart from "components/management/employee/edit/tabs/Statistic_Chart";
import Employee_Form from "components/management/employee/edit/Employee_Form";




{ /*  編輯客戶 */}
const Update_Employee = ( ) => {

    const value = useContext( SidePanelContext ) ;                  // 取得 context 值
    const data  = value.preLoadData ;

    const [ data_Id , set_Data_Id ]   = useState('' ) ;   // 資料表 id


    // 表單類型
    const [ formType , set_FormType ] = useState<'基本資料'|'操作紀錄'|'績效紀錄'>('基本資料') ;


    // React Hook Form
    const { register , control , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<IEmployee>({

            mode          : "all" ,
            resolver      : yupResolver( schema_Employee ) ,
            defaultValues : {

                               employee_Type              : data['employee_type'] ,
                               employee_Account           : data['account'] ,
                               employee_Password          : data['password'] ,
                               employee_Nickname          : data['nickname'] ,

                               // # 帳號類型 : 工作人員
                               employee_Serial            : data['employee_serial'] ,            // 員工編號
                               salary_Type                : data['salary_type'] ,                // 計薪類別 ( Ex. 正職 / 計時 )
                               position_Type              : data['position_type'] ,              // 職位類別 ( Ex. 櫃台 / 美容 / 接送 )
                               position_Status            : data['position_status'] ,            // 職位現況 ( Ex. 在職 / 離職 )
                               Brand                      : data['brand'] ,                      // 所屬品牌 ( Ex. 狗狗公園 )
                               Shop                       : data['shop'] ,                       // 所屬店別 ( Ex. 淡水店 )

                               employee_Name              : data['employee_name'] ,              // 員工姓名
                               employee_Sex               : data['employee_sex'] ,               // 員工性別
                               employee_Id                : data['employee_id'] ,                // 員工身分證字號
                               employee_MobilePhone       : data['employee_mobile_phone'] ,      // 員工手機號碼
                               employee_TelPhone          : data['employee_tel_phone'] ,         // 員工家用電話

                               employee_Line              : data['employee_line'] ,              // 員工 LINE
                               employee_Email             : data['employee_email'] ,             // 員工 Email
                               employee_Transportation    : data['employee_transportation'] ,    // 員工 交通工具
                               employee_Address           : data['employee_address'] ,           // 員工通訊地址
                               employee_Residence_Address : data['employee_residence_address'] , // 員工戶籍地址

                               // # 緊急聯絡人(1、2、3)
                               relative_Name_1            : data['relative_name_1'] ,            // 姓名
                               relative_Family_1          : data['relative_family_1'] ,          // 關係
                               relative_MobilePhone_1     : data['relative_mobile_phone_1'] ,    // 手機號碼
                               relative_TelPhone_1        : data['relative_tel_phone_1'] ,       // 家用電話
                               relative_Address_1         : data['relative_address_1'] ,         // 通訊地址

                               relative_Name_2            : data['relative_name_2'] ,
                               relative_Family_2          : data['relative_family_2'] ,
                               relative_MobilePhone_2     : data['relative_mobile_phone_2'] ,
                               relative_TelPhone_2        : data['relative_tel_phone_2'] ,
                               relative_Address_2         : data['relative_address_2'] ,

                               relative_Name_3            : data['relative_name_3'] ,
                               relative_Family_3          : data['relative_family_3'] ,
                               relative_MobilePhone_3     : data['relative_mobile_phone_3'] ,
                               relative_TelPhone_3        : data['relative_tel_phone_3'] ,
                               relative_Address_3         : data['relative_address_3'] ,

                            }

        }) ;

        const props = {

            register     : register ,
            setValue     : setValue ,
            errors       : errors ,
            isDirty      : isDirty ,
            isValid      : isValid ,
            control      : control ,

            editType     : '編輯' ,
            employeeData : data ,

        } ;

    // ---------------------------------------------------------------------------------------------------

    // 更新函式
    const update_Data = useUpdate_Data() ;



    // 取得 _ 員工類別
    const get_Form_Type = ( type : '基本資料'|'操作紀錄'|'績效紀錄' ) =>  set_FormType( type ) ;


    // 提交表單
    const onSubmit : SubmitHandler<IEmployee> = ( data : any ) => {

       // 更新 _ 客戶
       update_Data( "/employees" , data_Id , data , "/management" , "員工" ) ;

    } ;


    // 設定 _ 資料表 id 、員工類型
    useEffect(( ) => {

       set_Data_Id( data['id'] ) ;                 // 資料表 id


    } ,[]);



    return <form onSubmit = { handleSubmit( onSubmit ) } >

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em" }} >
                    <i className="fas fa-user"></i> &nbsp; 員工資料 &nbsp;
                </label> <br/>

                { /* 功能標籤 */ }
                <>

                    { /* 表單類型頁籤  */ }
                    <b className = { `tag is-medium is-success pointer ${ formType === '基本資料' ? '' : 'is-light' }` }  onClick={ () => get_Form_Type('基本資料') } >
                        <i className="fas fa-file-alt"></i> &nbsp; 基本資料
                    </b> &nbsp; &nbsp; &nbsp;

                    <b className = { `tag is-medium is-success pointer ${ formType === '操作紀錄' ? '' : 'is-light' }` } onClick={ () => get_Form_Type('操作紀錄') } >
                        <i className="fas fa-edit"></i> &nbsp; 操作紀錄
                    </b> &nbsp; &nbsp; &nbsp;

                    <b className = { `tag is-medium is-success pointer ${ formType === '績效紀錄' ? '' : 'is-light' }` } onClick={ () => get_Form_Type('績效紀錄') } >
                        <i className="fas fa-chart-pie"></i> &nbsp; 績效紀錄
                    </b>

                </>

                <br/><br/>

                { /*  員工資料  */ }

                { formType === '基本資料' && <Employee_Form { ...props  } />  }

                { /* 操作紀錄  */ }
                { formType === '操作紀錄' && <Operation_Log { ...props } /> }


                { /* 績效紀錄  */ }
                { formType === '績效紀錄' && <Statistic_Chart />  }


                <br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
                </div> <br/><br/>


            </form>


} ;

export default Update_Employee