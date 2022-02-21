
import React from "react" ;
import { Service_Type } from "utils/Interface_Type"



{ /* 依據不同服務單，回傳相對應的 _ 標籤顏色、icon */ }
const useServiceType = ( serviceType? : Service_Type | '包月洗澡' | '包月美容' | null | undefined , func? : boolean , size?:'large' | 'medium' | 'small' , light? : boolean  ) => {

   // 回傳 : 函式
   const get_ServiceType = ( _serviceType : Service_Type | '包月洗澡' | '包月美容' | undefined , is_Light? : boolean , service_Status? : string  ) => {

       let _obj = {} as any ;

       if( _serviceType === "基礎" ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-warning ${ is_Light ? 'is-light' : '' } pointer`  ;
           _obj.icon  = "far fa-list-alt"
       }

       if( _serviceType === "洗澡" || _serviceType === "包月洗澡" ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-success ${ is_Light ? 'is-light' : '' } pointer` ;
           _obj.icon  = "fas fa-bath"
       }

       if( _serviceType === "美容" || _serviceType === "包月美容"  ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-danger ${ is_Light ? 'is-light' : '' } pointer` ;
           _obj.icon  = "fas fa-cut"
       }

       if( _serviceType === "安親" || service_Status === '預約安親' ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-link ${ is_Light ? 'is-light' : '' } pointer` ;
           _obj.icon  = "fas fa-baby-carriage"
       }

       if( _serviceType === "住宿" ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-link ${ is_Light ? 'is-light' : '' } pointer` ;
           _obj.icon  = "fas fa-home"
       }

       if( _serviceType === "方案" ){
           _obj.color = `tag ${ size ? 'is-'+size : '' } is-primary ${ is_Light ? 'is-light' : '' } pointer` ;
           _obj.icon  = "fas fa-file-alt"
       }

       return _obj ;

   } ;

   if( func ) return get_ServiceType ;

   // 回傳 : 物件 -------------------------------

   let obj = {} as any ;

    if( serviceType === "基礎" ){
       obj.color =  size ? `tag is-${ size } is-warning ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-warning  pointer' ;
       obj.icon  = "far fa-list-alt"
   }

    if( serviceType === "洗澡" || serviceType === "包月洗澡" ){
       obj.color = size ? `tag is-${ size } is-success ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-success is-light pointer' ;
       obj.icon  = "fas fa-bath"
    }

    if( serviceType === "美容" || serviceType === "包月美容" ){
       obj.color = size ? `tag is-${ size } is-danger ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-danger is-light pointer' ;
       obj.icon  = "fas fa-cut"
    }

    if( serviceType === "安親" || serviceType === "一般安親" || serviceType === "住宿_提早抵達" || serviceType === "住宿_延後帶走"  ){
        obj.color = size ? `tag is-${ size } is-link ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-link is-light pointer' ;
        obj.icon  = "fas fa-baby-carriage"
    }

    if( serviceType === "住宿"  ){
        obj.color = size ? `tag is-${ size } is-link ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-link is-light pointer' ;
        obj.icon  = "fas fa-home"
    }

    if( serviceType === "方案"  ){
        obj.color = size ? `tag is-${ size } is-primary ${ !light ? 'is-light' : '' } pointer` : 'tag is-large is-primary is-light pointer' ;
        obj.icon  = "fas fa-file-alt"
    }


    return obj ;

} ;

export default useServiceType ;