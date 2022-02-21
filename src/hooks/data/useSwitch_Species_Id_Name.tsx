
import React, { useEffect , useState } from "react"
import axios from "utils/axios";

/*
*  @ 轉換 _ 寵物品種id ( 資料表: pet_species 的 id )、品種名稱 :
*    品種 id <-> 品種名稱
*
*/


// "品種 id"( 資料表 : pet_species 的 id ) 轉換為 "品種名稱" ( Ex. 吉娃娃 )
export const useSpecies_Id_To_Name = ( species_Id : string | number ) => {

   const [ speciesName , set_SpeciesName ] = useState( '' );

   useEffect(( ) : any => {

       set_SpeciesName( '' ) ; // 回復預設值

       let is_Mounted = true ;

       if( species_Id && species_Id !== '請選擇' ){

           axios.get( `/pet_species/show_by_col_param/id/${ species_Id }` ).then(res => {

               if( !is_Mounted ) return false ;

               if( res.data.length < 1 ){
                   set_SpeciesName('' ) ;
                   return false ;
               }

               set_SpeciesName( res.data[0]['name'] ) ;

           }) ;

       }else{

           set_SpeciesName('' ) ;

       }

       return () => ( is_Mounted = false )



   } ,[ species_Id ] ) ;


   return speciesName

} ;


// "品種 名稱"( Ex. 吉娃娃 ) 轉換為 "品種名稱" ( 資料表 : pet_species 的 id )
export const useSpecies_Name_To_Id = ( species_Name : string  ) => {

    const [ speciesId , set_SpeciesId ] = useState( '' );

    useEffect(( ) : any => {

        let is_Mounted = true ;

        if( species_Name && species_Name !== '請選擇' ){

            axios.get( `/pet_species/show_by_col_param/name/${ species_Name }` ).then(res => {

                if( !is_Mounted ) return false ;

                if( res.data.length < 1 ){
                    set_SpeciesId('' ) ;
                    return false ;
                }

                set_SpeciesId( res.data[0]['id'] ) ;

            }) ;

        }else{

            set_SpeciesId( '' ) ;

        }

        return () => is_Mounted = false

    } ,[ species_Name ] ) ;

    return speciesId



} ;
