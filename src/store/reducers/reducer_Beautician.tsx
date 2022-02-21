
import React from "react"



/* @ 美容師專區  */
interface IBeautician {

    Existing_Time_Records : any[] ;   // 資料庫中，某服務單，已有的點選時間紀錄

    Current_Beautician    : string ;  // 目前處理美容師姓名
    Current_Pet           : any ;     // 美容師目前所點選寵物

    Current_Pet_Is_Done   : boolean ; // 目前寵物已處理完畢

}

const initState = {

    Existing_Time_Records : [] ,

    Current_Beautician    : '' ,

    Current_Pet           : {

                                basic_data : '' ,
                                basic_foot : '' ,
                                pet        : {
                                                name    : '' ,
                                                serial  : '' ,
                                                species : '' ,
                                                sex     : '' ,
                                                color   : '' ,
                                                age     : '' ,
                                                note    : ''
                                              } ,

                             } ,  // 所點選寵物

    Current_Pet_Is_Done    : false

} ;


const reducer_Beautician = ( state : IBeautician = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 所點選 : 寵物
        case  "SET_CURRENT_PET" : return { ...state , Current_Pet : action.currentPet } ;

        // # 設定 _ 所點選 : 美容師
        case  "SET_CURRENT_BEAUTICIAN" : return { ...state , Current_Beautician : action.currentBeautician } ;

        // # 設定 _ 資料庫中，某服務單，已有的點選時間紀錄
        case  "SET_EXISTING_TIME_RECORDS" : return { ...state , Existing_Time_Records : action.Existing_Time_Records } ;


        // # 設定 _ 所點選 : 寵物 --> 已處理完畢
        case  "SET_CURRENT_PET_IS_DONE" : return { ...state , Current_Pet_Is_Done : action.Current_Pet_Is_Done } ;


        default : return state ;

    }


} ;

export default reducer_Beautician ;