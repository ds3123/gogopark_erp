

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form";

// 各表單驗證條件
import { schema_Pet } from "utils/validator/form_validator"
import { IPet } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

// useContext
import { useContext } from "react"
import { SidePanelContext } from "templates/panel/Side_Panel";

import Pet_Form from "components/pets/edit/Pet_Form";
import {useRead_Species} from "hooks/ajax_crud/useAjax_Read";

// Hook
import { useUpdate_Data } from "hooks/ajax_crud/useAjax_Update";
import{ useLocation } from "react-router" ;




{ /*  編輯寵物  */ }
const Update_Pet = () => {

    const value       = useContext( SidePanelContext ) ;              // 取得 context 值
    const pet         = value.preLoadData ? value.preLoadData : {} ;
    const current_Url = useLocation().pathname;                       // 取得目前 url  例如 :  ~ /pets


    // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Species() ;

    // 將 "寵物品種名稱" ，改為 : "寵物品種 pet_species 資料表 id"
    const _pet = petSpecies.filter( x => x['name'] === pet['species'] )[0] ;



    // React Hook Form
    const { register , watch , setValue , handleSubmit , formState : { errors , isDirty , isValid } } =
                useForm<IPet>({
                    mode          : "all" ,
                    resolver      : yupResolver( schema_Pet ) ,
                    defaultValues : {

                                        // # NOTE "品種" ( pet_Species ) 預設值，於 Pet_Form 設定 ( 因其由 Ajax 取得資料 )

                                        // # 寵物資料
                                        pet_Serial   : pet.serial ,
                                        pet_Name     : pet.name ,
                                        // pet_Specie: _pet ? _pet['id'] : '' ,
                                        pet_Sex      : pet.sex ,
                                        pet_Color    : pet.color ,
                                        pet_Weight   : pet.weight ,
                                        pet_Size     : pet.size ,
                                        pet_Age      : pet.age ,

                                        // * 調查資料 ( 單選 )
                                        injection    : pet.injection ,
                                        flea         : pet.flea ,
                                        ligate       : pet.ligate ,
                                        chip         : pet.chip ,
                                        infection    : pet.infection ,
                                        together     : pet.together ,
                                        drug         : pet.drug ,
                                        bite         : pet.bite ,

                                        // * 調查資料 ( 複選 : 轉為陣列 )
                                        health       : pet.health ? pet.health.split(',') : [] ,
                                        feed         : pet.feed ? pet.feed.split(',') : [] ,
                                        toilet       : pet.toilet ? pet.toilet.split(',') : [] ,
                                        ownerProvide : pet.ownerProvide ? pet.ownerProvide.split(',') : [] ,

                                        pet_Note     : pet.note ,

                                        // 價格 ( 針對寵物自行調整價格 )
                                        price_Single_Bath   : pet?.single_bath_price ? pet.single_bath_price : '' ,     // 單次洗澡
                                        price_Month_Bath    : pet?.month_bath_price ? pet.month_bath_price : '' ,       // 包月洗澡  
                                        price_Single_Beauty : pet?.single_beauty_price ? pet.single_beauty_price : '' , // 單次美容
                                        price_Month_Beauty  : pet?.month_beauty_price ? pet.month_beauty_price : ''     // 包月美容
                                        
                                    }
                }) ;


    const props = {

        register : register ,
        setValue : setValue ,
        errors   : errors ,
        watch    : watch ,

        pet_Serial     : pet.serial ,             // 寵物編號  
        pet_Species_id : _pet ? _pet['id'] : ''   // 寵物資料表( pet_species ) id

    } ;


    const update_Data = useUpdate_Data() ;


    // 提交表單
    const onSubmit : SubmitHandler< IPet > = data => {

        // 將 "寵物品種 pet_species 資料表 id" ，改為 : "寵物品種名稱"  
        const mPet       = petSpecies.filter( x => x['id'] === parseInt( data.pet_Species ) )[0] as any ;  // 篩選出該寵物
        data.pet_Species = mPet.name ;    // 將品種資料表 id ， 改為 : "寵物品種名稱"  


        // 更新 _ 寵物
        update_Data( "/pets" , data.pet_Serial , data , current_Url , "寵物" ) ;
        
    } ;

    return <form onSubmit = { handleSubmit( onSubmit ) }>

              { /* 寵物表單欄位  */ }
              <Pet_Form  { ...props }  />

              { /* 提交按鈕 */ }
              <div className="has-text-centered m_Top_50 m_Bottom_100" >
                  <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                       提交表單
                  </button>
              </div> 

           </form>

} ;

export default Update_Pet