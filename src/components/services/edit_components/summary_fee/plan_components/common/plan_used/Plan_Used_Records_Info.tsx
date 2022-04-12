



type Plan_Used_Records_Info = {

    plan_Start_Date       : string ;
    plan_End_Date         : string ;
    rest_Num_Of_End_Dates : number ;    

}


// @ 基本資訊 : 方案使用
const Plan_Used_Records_Info = ( { plan_Start_Date , plan_End_Date , rest_Num_Of_End_Dates } : Plan_Used_Records_Info ) => {


    return <>

                <b className="tag is-medium is-white m_Right_30 m_Top_50">
                    使用起始日期 : <span className="fDred"> &nbsp; { plan_Start_Date } </span>
                </b>

                <b className="tag is-medium is-white m_Right_30 relative">
                    <span className="f_10 absolute" style={{top:"-17px" , left:"15px" , color:"gray"}} > * 方案須在 90 天內，使用完畢 </span>
                    使用截止日期 : <span className="fDred"> &nbsp; { plan_End_Date } </span>
                </b>

                <b className="tag is-medium is-white">
                    距離使用截止日期，尚有 : <span className="fRed"> &nbsp; { rest_Num_Of_End_Dates } </span> &nbsp; 天
                </b>
    
           </> 

} ;

export default Plan_Used_Records_Info
       