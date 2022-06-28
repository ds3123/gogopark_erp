

import { useSelector } from "react-redux"


type Title_Bar = {
    tag_Color        : string ; 
    service_Type     : string ;
    amount_Type      : string ;
    amount_Total     : number  | string  ;
    Folding_Bt_Type  : any    ;
}




// @ 各區塊標題
const Section_Title_Bar = ( { tag_Color , service_Type , amount_Type , amount_Total , Folding_Bt_Type  } : Title_Bar ) => {


     // 所點選 _ 日期類型 ( 付款日期 / 到店日期 )
     const date_Type : '付款日期' | '到店日期' =  useSelector( ( state : any ) => state.Finance.finance_Query_Date_Type ) ; 


    const col_Mul = 'columns is-multiline is-mobile' ;
    const col_9   = 'column is-9-desktop' ;
    const col_3   = 'column is-3-desktop' ;
    const w_Tag   = 'tag is-large is-white' ;
    const l_Tag   = 'tag is-large is-light ' ;


    let amount_Color = '' ;
    if( amount_Type === '扣 _ 預收款' ) amount_Color = 'fGreen' ;
    if( amount_Type === '支 出' ) amount_Color = 'fBlue' ;
    if( amount_Type !== '扣 _ 預收款' && amount_Type !== '支 出' ) amount_Color = 'fRed' ;



    return <div className={ col_Mul }>

                <div className={ col_9 }>
                    
                    <b className={ l_Tag+tag_Color }> { service_Type } :&nbsp;<span className="fBlue"> { amount_Type } </span>  </b>
                
                </div>

                <div className={ col_3 }>

                    { /* 先隱藏扣_預收款的小計 */ }
                    { ( ( amount_Total === 0 || amount_Total > 0  ) && amount_Type !== '扣 _ 預收款' ) &&
                        <b className={ w_Tag }> 小計 :&nbsp;<span className= { amount_Color } > { amount_Total } </span>&nbsp;元  </b>
                    } 
                        
                    { Folding_Bt_Type }

                </div>
    
          </div> 


} ;

export default Section_Title_Bar
       