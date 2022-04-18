
import { FC , useEffect } from "react" ;
import Date_Picker from "templates/form/Date_Picker";

// React Hook Form
import { useForm } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type";
import { useDispatch , useSelector } from "react-redux";
import useSection_Folding from "hooks/layout/useSection_Folding";
import Service_Receivable_Table from "components/management/finance/components/Service_Receivable_Table"
import Deduct_Advance_Receipt_Table from "components/management/finance/components/Deduct_Advance_Receipt_Table"
import Advance_Receipt_Table from "components/management/finance/components/Advance_Receipt_Table"
import Lodge_Receivable_Table from "components/management/finance/components/Lodge_Receivable_Table"
import Other_Cash_Income_Table from "components/management/finance/components/Other_Cash_Income_Table";
import Other_Cash_Expenditure_Table from "components/management/finance/components/Other_Cash_Expenditure_Table";
import { get_Finance_Service_Records_By_Date } from "store/actions/action_Service"
import { get_Plans_By_Date } from "store/actions/action_Plan"
import { get_Others_By_Date } from "store/actions/action_Other"


type Title_Bar = {
    tag_Color        : string ; 
    service_Type     : string ;
    amount_Type      : string ;
    amount_Total     : number  | string  ;
    Folding_Bt_Type  : any    ;
}

// 各區塊標題列元件
const Section_Title_Bar : FC< Title_Bar > = ( { tag_Color , service_Type , amount_Type , amount_Total , Folding_Bt_Type  } ) => {

    const col_Mul = 'columns is-multiline is-mobile' ;
    const col_9   = 'column is-9-desktop' ;
    const col_3   = 'column is-3-desktop' ;
    const w_Tag   = 'tag is-large is-white' ;
    const l_Tag   = 'tag is-large is-light ' ;


    let amount_Color = '' ;
    if( amount_Type === '扣 _ 預收款' ) amount_Color = 'fGreen' ;
    if( amount_Type === '支 出' ) amount_Color = 'fBlue' ;
    if( amount_Type !== '扣 _ 預收款' && amount_Type !== '支 出' ) amount_Color = 'fRed' ;

   return   <div className={ col_Mul }>

                <div className={ col_9 }>
                    <b className={ l_Tag+tag_Color}> { service_Type } :&nbsp;<span className="fBlue"> { amount_Type } </span>  </b>
                </div>

                <div className={ col_3 }>

                     { /* 先隱藏扣_預收款的小計 */ }
                     { ( amount_Total === 0 || amount_Total > 0 ) &&
                        <b className={ w_Tag }> 小計 :&nbsp;<span className= { amount_Color } > { amount_Total } </span>&nbsp;元  </b>
                     } 
                        
                     { Folding_Bt_Type }

                 </div>
                
            </div>

} ;


/*  @ 日報表  */
const Daily_Report = () => {

    const dispatch     = useDispatch() ;
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;                            // 報表日期
    
    const service_Data = useSelector( ( state : any ) => state.Service.service_Finance_Records_By_Date ) ;      // 服務資料 ( 特定日期 )
    const plan_Data    = useSelector( ( state : any ) => state.Plan.plans_By_Date ) ;                           // 方案資料 ( 特定日期 )
    const other_Data   = useSelector( ( state : any ) => state.Other.others_By_Date ) ;                         // 其他收支 ( 特定日期 ) 

    // # 總計金額
    const service_Amount_Total     = useSelector( ( state : any ) => state.Service.service_Amount_Total ) ;     // 洗澡美容 _ 應收帳款
  
    // 方案扣預收款的計算方式，再確認 ( 2022.04.14 )
    // const deduct_Plan_Amount_Total = useSelector( ( state : any ) => state.Plan.deduct_Plan_Amount_Total ) ;    // 洗澡美容 _ 扣 _ 預收帳款
    const deduct_Plan_Amount_Total = '' ;    // 洗澡美容 _ 扣 _ 預收帳款
   
    const buy_Plan_Amount_Total    = useSelector( ( state : any ) => state.Plan.buy_Plan_Amount_Total ) ;       // 洗澡美容 _ 預收款  
    const lodge_Amount_Total       = useSelector( ( state : any ) => state.Service.care_Lodge_Amount_Total )  ; // 住宿安親 _ 應收款                                      
    
    const other_Income_Total       = useSelector( ( state : any ) => state.Other.others_Income_Total ) ;        // 其他收支 _ 收入
    const other_Expenditure_Total  = useSelector( ( state : any ) => state.Other.others_Expenditure_Total ) ;   // 其他收支 _ 支出

    // # 收折區塊
    const { is_folding : is_folding_Receivable ,        Folding_Bt : Folding_Bt_Receivable }        = useSection_Folding( false ) ;  // 應收款
    const { is_folding : is_folding_MinusPrepayment ,   Folding_Bt : Folding_Bt_MinusPrepayment }   = useSection_Folding( false ) ;  // 扣_預收款
    const { is_folding : is_folding_Prepayment ,        Folding_Bt : Folding_Bt_Prepayment }        = useSection_Folding( false ) ;  // 預收款
    const { is_folding : is_folding_LodgeCare ,         Folding_Bt : Folding_Bt_LodgeCare }         = useSection_Folding( false ) ;  // 住宿款 + 安親款
    const { is_folding : is_folding_Other_Income ,      Folding_Bt : Folding_Bt_Other_Income }      = useSection_Folding( false ) ;  // 其他收支 : 收入
    const { is_folding : is_folding_Other_Expenditure , Folding_Bt : Folding_Bt_Other_expenditure } = useSection_Folding( false ) ;  // 其他收支 : 收入


    // React Hook Form
    const { control } = useForm<ICustomer>({ mode : "all" }) ;


    // # 1. 取得 _ 各分區表單資料 ( 依 : 服務日期 )  2. 計算小計金額
    useEffect( () => { 
    
       // 主要服務( 基礎、洗澡、美容 ) / 洗澡美容 ( "應收款"、"扣_預收款" )、住宿安親( "應收款" ) 
       dispatch( get_Finance_Service_Records_By_Date( service_Date , dispatch ) ) ;
      
       // 購買方案( 洗澡美容 "預收款" ) 
       dispatch( get_Plans_By_Date( service_Date , dispatch ) ) ;
       
       // 其他收支
       dispatch( get_Others_By_Date( service_Date , dispatch ) ) ;

    } , [ service_Date ] ) ;


    const sum = { width:"100%" , top:'55px' , left:"25px" } ;

  return <div className="m_Bottom_200"> 

            { /* 查詢列  */ }
            <div className="columns is-multiline is-mobile m_Bottom_100">

                <div className="column is-6-desktop">
                    <div className="tag is-large is-white">
                       <b> 報表日期 : </b> &nbsp;
                       <Date_Picker control={ control } name="service_Date" default_Date={ new Date } />
                    </div>
                </div>

                <div className="column is-6-desktop relative">

                    <b className="tag is-large is-white relative" >
                        總 計 : &nbsp;
                        <span className="fRed"> 
                           { service_Amount_Total + buy_Plan_Amount_Total + lodge_Amount_Total + other_Income_Total - other_Expenditure_Total } 
                        </span> &nbsp; 元
                    </b> 

                    <div className="absolute" style={ sum }> 
                       ( 洗澡美容 : 應收款 ) + ( 洗澡美容 : 預收款 ) + ( 住宿安親 : 應收款 ) + 其他收入 <b className="f_16 fDred"> - </b> 其他支出 
                    </div>
                    
                </div>

            </div>
                    
            { /* 洗澡美容 : 應收款 */ }
            <Section_Title_Bar tag_Color='is-success' service_Type='洗澡美容' amount_Type='應收款' amount_Total={ service_Amount_Total } Folding_Bt_Type={ Folding_Bt_Receivable } />
            { is_folding_Receivable && <div className="m_Bottom_100"> <Service_Receivable_Table  data={ service_Data } /> </div>  }


            { /* 洗澡美容 : 扣 _ 預收款 */ }
            <Section_Title_Bar tag_Color='is-warning' service_Type='洗澡美容' amount_Type='扣 _ 預收款' amount_Total={ deduct_Plan_Amount_Total} Folding_Bt_Type={ Folding_Bt_MinusPrepayment } />
            { is_folding_MinusPrepayment && <div className="m_Bottom_100"> <Deduct_Advance_Receipt_Table  data={ service_Data } /> </div> }


            { /* 洗澡美容 ( 方案 _  包月洗澡、包月美容 ) : 預收款 */ }
            <Section_Title_Bar tag_Color='is-warning' service_Type='洗澡美容' amount_Type='預收款' amount_Total={ buy_Plan_Amount_Total } Folding_Bt_Type={ Folding_Bt_Prepayment } />
            { is_folding_Prepayment && <div className="m_Bottom_100"> <Advance_Receipt_Table data={ plan_Data } /> </div> }


            { /* 住宿 + 安親 */ }
            <Section_Title_Bar tag_Color='is-success' service_Type='住宿安親' amount_Type='應收款' amount_Total={ lodge_Amount_Total } Folding_Bt_Type={ Folding_Bt_LodgeCare } />
            { is_folding_LodgeCare && <div className="m_Bottom_100"> <Lodge_Receivable_Table data={ service_Data } /> </div> }


            { /* 其他收支 : 收入 */ }
            <Section_Title_Bar tag_Color='is-link' service_Type='其 他' amount_Type='收 入' amount_Total={ other_Income_Total } Folding_Bt_Type={ Folding_Bt_Other_Income } />
            { is_folding_Other_Income && <div className="m_Bottom_100"> <Other_Cash_Income_Table data={ other_Data } /> </div> }


            { /* 其他收支 : 支出 */ }
            <Section_Title_Bar tag_Color='is-link' service_Type='其 他' amount_Type='支 出' amount_Total={ other_Expenditure_Total } Folding_Bt_Type={ Folding_Bt_Other_expenditure } />
            { is_folding_Other_Expenditure && <div className="m_Bottom_100"> <Other_Cash_Expenditure_Table data={ other_Data } /> </div> }

         </div>

} ;

export default Daily_Report ;