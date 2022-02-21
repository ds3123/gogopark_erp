

import {
         schema_Basic,
         schema_Bath,
         schema_Beauty, schema_Care,
         schema_Customer, schema_Employee, schema_Lodge, schema_Other ,
         schema_Pet, schema_Plan, schema_Price, schema_Species
       } from "utils/validator/form_validator" ;


// @ 根據目前位置 ( current )，回傳 :不同的表單驗證邏輯
export const get_Validator_Schema  = ( current : string ) => {

        if( current === "客戶" ) return schema_Customer ;
        if( current === "寵物" ) return schema_Pet ;

        if( current === "基礎" ) return schema_Basic ;
        if( current === "洗澡" ) return schema_Bath ;
        if( current === "美容" ) return schema_Beauty ;

        if( current === "安親" ) return schema_Care ;
        if( current === "住宿" ) return schema_Lodge ;
        if( current === "其他" ) return schema_Other ;

        if( current === "方案" ) return schema_Plan ;
        if( current === "價格" ) return schema_Price ;
        if( current === "品種" ) return schema_Species ;

        if( current === "員工" ) return schema_Employee ;

        return schema_Customer

} ;