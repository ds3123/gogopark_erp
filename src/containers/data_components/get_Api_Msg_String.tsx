
import React from "react"


// @ 根據目前位置 ( current )，回傳 : api( for 進行不同的新增動作 )、msg 字串 ( for 新增後彈跳訊息 )
export const get_Api_Msg_String = ( current : string ) => {

    let api = '' ;
    let msg = '' ;

    if( current === "客戶" ){  api = "/customers" ;      msg = "客戶" ;  }
    if( current === "寵物" ){  api = "/pets"      ;      msg = "寵物" ;  }
    if( current === "基礎" ){  api = "/basics"    ;      msg = "基礎" ;  }
    if( current === "洗澡" ){  api = "/bathes"    ;      msg = "洗澡" ;  }
    if( current === "美容" ){  api = "/beauties"  ;      msg = "美容" ;  }
    if( current === "安親" ){  api = "/cares"     ;      msg = "安親" ;  }
    if( current === "住宿" ){  api = "/lodges"    ;      msg = "住宿" ;  }
    if( current === "其他" ){  api = "/others"    ;      msg = "其他" ;  }
    if( current === "方案" ){  api = "/plans"     ;      msg = "方案" ;  }
    if( current === "價格" ){  api = "/service_prices" ; msg = "價格" ;  }
    if( current === "品種" ){  api = "/pet_species" ;    msg = "品種" ;  }
    if( current === "員工" ){  api = "/employees" ;      msg = "員工" ;  }

    return { api , msg }

} ;