
import React, {useContext, useEffect, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {ISpecies} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema_Species} from "utils/validator/form_validator";

import Species_Form from "components/management/setting/species/edit/Species_Form";
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import {SidePanelContext} from "templates/panel/Side_Panel";


const Update_Species = ( ) => {


    const value = useContext( SidePanelContext ) ;                               // 取得 context 值
    const data            = value.preLoadData ;

    const [ data_Id , set_Data_Id ]           = useState('' ) ;        // 資料表 id


    // React Hook Form
    const { register , control , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<ISpecies>({

            mode          : "all" ,
            resolver      : yupResolver( schema_Species ) ,
            defaultValues : {
                               species_Serial    : data['serial'] ,
                               species_Character : data['character'] ,
                               species_Size      : data['size'] ,
                               species_Fur       : data['fur'] ,
                               species_Name      : data['name'] ,
                               species_Note      : data['note'] ,
                            }

        }) ;

    const props = {
                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,

                  } ;


    // 更新函式
    const update_Data = useUpdate_Data() ;

    // 提交表單
    const onSubmit : SubmitHandler<ISpecies> = ( data : any ) => {

        // 更新 _ 客戶
        update_Data( "/pet_species" , data_Id , data , "/management" , "品種" ) ;

    } ;

    // 設定 _ 資料表 id
    useEffect(( ) => {

      set_Data_Id( data['id'] ) ;   // 資料表 id

    } ,[]);



    return <form onSubmit = { handleSubmit( onSubmit ) } >

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em"  }} >
                    <i className="fas fa-cat"></i> &nbsp; 品種資料 &nbsp;
                </label> <br/>

                <Species_Form {...props}  />

                <br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
                </div> <br/><br/>

           </form>

} ;

export default Update_Species