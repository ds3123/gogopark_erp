
import { FC , useEffect , useState } from "react" ;
import { useSelector } from "react-redux";
import { get_Interval_Dates , get_Type_Dates , get_Week_Day } from "utils/time/date" ;



// 房型價格
export interface ILodge_Price{
    room_Type        : string ; // 房型
    ordinary_Day     : number ; // 平日
    ordinary_Holiday : number ; // 假日
    national_Holiday : number ; // 國定假日
}


// 國定假日 / 熱門時段
export const national_Holidays_Setting = [
    { title : '端午節' , date : '2021-06-14' }
] ;


// 各種房型 ( 大、中、小 房 / 籠 )，於不同時段( 平日、假日、國定假日 ) : 價格
export const lodge_Price : ILodge_Price[] = [

    { room_Type : '大房' , ordinary_Day : 800 , ordinary_Holiday : 900 , national_Holiday : 1000 } ,
    { room_Type : '中房' , ordinary_Day : 640 , ordinary_Holiday : 720 , national_Holiday : 800 } ,
    { room_Type : '小房' , ordinary_Day : 560 , ordinary_Holiday : 630 , national_Holiday : 700 } ,

    { room_Type : '大籠' , ordinary_Day : 480 , ordinary_Holiday : 540 , national_Holiday : 600 } ,
    { room_Type : '中籠' , ordinary_Day : 400 , ordinary_Holiday : 450 , national_Holiday : 500 } ,
    { room_Type : '小籠' , ordinary_Day : 320 , ordinary_Holiday : 360 , national_Holiday : 400 } ,

] ;




type lodgePrice = {


}



{ /* @ 住宿價格計算 */ }
const Lodge_Price : FC<lodgePrice> = ( ) => {


    const lodge_Type     = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;    // 房型
    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;   // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ;  // 退房日期

    const [ national_Holidays , set_National_Holidays ] = useState( [] ) ; // 國定假日( 系統設定 )
    const [ holidays          , set_Holidays ]          = useState( [] ) ; // 假日 ( 五、六、日 )
    const [ ordinary_Days     , set_Ordinary_Days ]     = useState( [] ) ; // 平日 ( 一、二、三、四 )

    // 目前所選擇房間類型，所相對應的相關價格
    const [ currentPrice , set_CurrentPrice ] = useState({
                                                            room_Type        : '' ,

                                                            ordinary_Day     : 0 ,   // 平日
                                                            ordinary_Holiday : 0 ,   // 假日
                                                            national_Holiday : 0 ,   // 國定假日

                                                            total            : 0 ,   // 共計金額

                                                         }) ;


    // 取得、設定 : 平日、假日、國定假日
    useEffect( () => {

        // 取得 _ 兩個日期之間，所包含的日期(陣列)  Ex. [ '2021-08-11','2021-08-12' , ...   ]
        const interval  = get_Interval_Dates( check_In_Date , check_Out_Date ) ;
        
        // 取得 : 某日期，所屬型態( 平日、假日、國定假日 )
        const typeDates = get_Type_Dates( interval , national_Holidays_Setting ) as any;

        // 設定 : 平日、假日、國定假日
        set_National_Holidays( typeDates['國定假日'] ) ;
        set_Holidays( typeDates['假日'] ) ;
        set_Ordinary_Days( typeDates['平日'] ) ;

    } ,[ check_In_Date , check_Out_Date ]) ;


    // 設定 : 所選擇房間類型，其對應的相關價格
    useEffect( () => {

        lodge_Price.forEach( x => {

           // 房型符合
           if( x['room_Type'] === lodge_Type ){

               // 共計金額
               const total =  ( x['ordinary_Day']     * ( ordinary_Days.length ) ) +
                              ( x['ordinary_Holiday'] * ( holidays.length ) ) +
                              ( x['national_Holiday'] * ( national_Holidays.length ) ) ;

               // 設定 state
               set_CurrentPrice({ ...currentPrice ,

                                    room_Type        : x['room_Type'] ,        // 房型

                                    ordinary_Day     : x['ordinary_Day'] ,     // 平日
                                    ordinary_Holiday : x['ordinary_Holiday'] , // 假日
                                    national_Holiday : x['national_Holiday'] , // 國定假日

                                    total            : total                   // 共計金額

                                }) ;


           }

        })


    } , [ lodge_Type , check_In_Date , check_Out_Date , ordinary_Days , holidays , national_Holidays  ] ) ;



    const blue = { color : "darkblue" } ;
    const row  = { fontWeight:"normal" , fontSize:"13pt" , color:"rgb(100,150,100)" } as const  ; 

    return  <div>

                { /* 房型定價列 */ }
                { lodge_Type &&

                    <>
                        <b className="tag is-medium is-rounded relative" style={{ left:"-20px" }}> &nbsp; &nbsp;

                                        <>  
                                           房型定價  &nbsp; <b style={blue}> { lodge_Type } </b> &nbsp; :
                                           <span style={ row }> &nbsp;&nbsp;
                                                平日 :     <b> { currentPrice['ordinary_Day'] }     </b> ( 元 / 日 ) 、
                                                假日 :     <b> { currentPrice['ordinary_Holiday'] } </b> ( 元 / 日 ) 、
                                                熱門時段 : <b> { currentPrice['national_Holiday'] } </b> ( 元 / 日 )
                                           </span>   &nbsp; &nbsp;
                                        </>

                        </b> <br/><br/>
                    </>
                }

                <br/>

                { /* 平 日 */ }
                { ordinary_Days.length > 0 &&

                    <>
                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 平 日</span> &nbsp;
                            <span style={{ color:"gray" , fontSize:"11pt" }}>( 一 ~ 四 ) </span> &nbsp; &nbsp;
                        </b>

                        { lodge_Type &&
                            <span style={{float:"right"}}>
                                平日共 <b style={{ color:"darkblue" }}> { ordinary_Days.length } </b> 天 ，
                                小計 : <b style={{ color:"red" }}>{ currentPrice['ordinary_Day'] * ( ordinary_Days.length ) }</b> 元
                            </span>
                        }


                        <br/>

                        {
                          ordinary_Days.map( (x,y)=>{
                            return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                          })
                        }

                        <br/><br/>

                    </>

                }

                { /* 假 日 */ }
                { holidays.length > 0 &&

                    <>

                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 假 日</span> &nbsp;
                            <span style={{ color:"gray" , fontSize:"11pt" }}>( 五 ~ 日 ) </span> &nbsp; &nbsp;
                        </b>

                        { lodge_Type &&
                            <span style={{float: "right"}}>
                                假日共 <b style={{color: "darkblue"}}> {holidays.length} </b> 天 ，
                                小計 : <b style={{color: "red"}}>{currentPrice['ordinary_Holiday'] * (holidays.length)}</b> 元
                            </span>
                        }

                        <br/>
                        {
                            holidays.map( (x,y)=>{
                                return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                            })
                        }

                        <br/><br/>

                    </>

                }

                { /* 熱門時段 */ }
                { national_Holidays.length > 0 &&

                    <>

                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 熱門時段 </span> &nbsp; &nbsp;
                        </b>

                        { lodge_Type &&
                            <span style={{float: "right"}}>
                               熱門時段共 <b style={{color: "darkblue"}}> {national_Holidays.length} </b> 天 ，
                                小計 : <b
                                style={{color: "red"}}>{currentPrice['national_Holiday'] * (national_Holidays.length)}</b> 元
                            </span>
                        }


                        <br/>
                        {
                            national_Holidays.map( (x,y)=>{
                                return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                            })
                        }

                        <br/><br/>


                    </>

                }

                { lodge_Type &&

                    <b className="tag is-medium is-warning is-rounded" style={{float: "right"}}>

                        &nbsp; 住宿日期共 &nbsp; <b style={{color: "darkblue"}}>
                                            <span className="tag is-white is-rounded f_10">
                                            { ( ordinary_Days.length ) + ( holidays.length ) + ( national_Holidays.length ) }
                                            </span>
                                        </b> &nbsp; 天，

                        金額共計 &nbsp; <b style={{color: "red"}}>

                                <b className="tag is-white is-rounded fRed">

                                    <span style={{ fontSize:"12pt" }}>
                                        { currentPrice['total'] }
                                    </span>

                                </b>

                                </b> &nbsp; 元 &nbsp;

                    </b>

                }

            </div>

} ;

export default Lodge_Price