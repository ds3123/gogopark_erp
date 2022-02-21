
import React, {FC, useState , useEffect} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {Input} from "templates/form/Input";
import {useRead_Species, useRead_Species_By_Column} from "hooks/ajax_crud/useAjax_Read";
import { useSerial } from "hooks/data/useSerial";
import {useToastContainer} from "react-toastify";


{ /* 品種表單欄位  */ }
const Species_Form : FC<Edit_Form_Type> = ( { register , errors , current  } ) => {

    // 產生 _ 品種代碼 ( 01 ~ 100 )
    const serial = useSerial( 1 , 100 ) ;

    // 所有寵物品種資料
    const species_Data = useRead_Species();

    // 欲查詢是否已有該值的欄位
    const [ isExisting , set_IsExisting ] = useState({
                                                                  species_Character : '' ,  // 品種代號
                                                                  species_Name      : ''    // 品種名稱
                                                                }) ;

    const [ existing_Serial , set_Existing_Serial ] = useState<string[]>( [] ) ;  // 資料庫中，已使用過的品種代碼

    // # 查詢結果 : 特定欄位，是否有該輸入的值
    const { data : query_Species_Character } = useRead_Species_By_Column('character' , isExisting['species_Character'] ) ; // 品種代號
    const { data : query_Species_Name }      = useRead_Species_By_Column('name' , isExisting['species_Name'] ) ;           // 品種名稱


    // 欄位變動處理 : 身分證字號、姓名、手機號碼
    const handle_Change = ( e : any ) => {

        // 設定 _ state
        const { name , value } = e.target ;
        set_IsExisting( { ...isExisting , [name] : value } ) ;

    } ;

    // 設定 _ 資料庫中，已使用過的品種代碼
    useEffect(( ) => {

      if( species_Data.length > 0 ){

         let exiSerial : string[] = [] ;
         species_Data.forEach( x => {  exiSerial.push( x['serial'] ) });
         set_Existing_Serial( exiSerial ) ;

      }


    } , [ species_Data ] ) ;


    return <>

             <div className="columns is-multiline  is-mobile relative">

                { /* 品種代碼 */ }
                <div className="column is-3-desktop required">

                    <p> 品種代碼 &nbsp; <b style={{color: "red"}}> {errors.species_Serial?.message} </b></p>
                    <div className="control has-icons-left">

                        <div className="select">

                            <select { ...register("species_Serial") } >

                                <option value="請選擇">請選擇</option>

                                { /* for 新增 */ }
                                { current &&

                                    serial.map( (x,y) => {

                                        let num = x<10 ? '0'+(x.toString()) : x.toString() ;

                                        return existing_Serial.indexOf( num ) === -1 ?
                                                  <option key={y} value={ num }> { num } </option> : ''

                                    })
                                }

                                { /* for 修改 */ }
                                { current ||

                                    serial.map( (x,y) => {

                                        let num = x<10 ? '0'+(x.toString()) : x.toString() ;

                                        return  <option key={y} value={ num }> { num } </option>

                                    })

                                }

                            </select>

                        </div>

                        <div className="icon is-small is-left"><i className="fas fa-sort-numeric-down"></i> </div>

                    </div>

                </div>

                { /* 品種代號 */ }

                 { query_Species_Character.length > 0 &&
                     <b className="absolute" style={{top: "10px", left: "360px", color: "red"}}>已有此品種代號</b>
                 }

                 <Input type="text" name="species_Character" label="品種代號" register={register} error={errors.species_Character}
                        icon="fab fa-autoprefixer" asterisk={false} columns="3" onChange={ handle_Change } />

                 { /* 寵物體型 */ }
                 <div className="column is-3-desktop">

                     <p> 寵物體型 &nbsp; <b style={{color: "red"}}> {errors.species_Size?.message} </b></p>
                     <div className="control has-icons-left">

                         <div className="select">
                             <select { ...register("species_Size") } >
                                 <option value="請選擇">請選擇</option>
                                 <option value="大型">大 型</option>
                                 <option value="中型">中 型</option>
                                 <option value="小型">小 型</option>
                             </select>
                         </div>

                         <div className="icon is-small is-left"> <i className="fas fa-weight"></i> </div>

                     </div>

                 </div>

                 { /* 寵物體毛 */ }
                 <div className="column is-3-desktop">

                     <p> 寵物毛髮 &nbsp; <b style={{color: "red"}}> {errors.species_Fur?.message} </b></p>
                     <div className="control has-icons-left">

                         <div className="select">
                             <select { ...register("species_Fur") } >
                                 <option value="請選擇">請選擇</option>
                                 <option value="長毛"> 長 毛 </option>
                                 <option value="中毛"> 中 毛 </option>
                                 <option value="短毛"> 短 毛 </option>
                             </select>
                         </div>

                         <div className="icon is-small is-left"><i className="fas fa-feather-alt"></i> </div>

                     </div>

                 </div>

                 { /* 品種名稱 */ }
                 { query_Species_Name.length > 0 &&
                 　　<b className="absolute" style={{ top:"100px" , left:"90px" , color:"red" }}>已有此寵物名稱</b>
                 }
                 <Input type="text" name="species_Name" label="品種名稱" register={register} error={errors.species_Name}
                        icon="fas fa-paw" asterisk={true} columns="3" onChange={ handle_Change } />

                 { /* 備 註 */ }
                 <Input type="text" name="species_Note" label="備 註" register={register} error={errors.species_Note}
                        icon="fas fa-edit" asterisk={false} columns="8" />

             </div>

           </>


};

export default Species_Form



