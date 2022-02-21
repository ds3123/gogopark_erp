
import React from "react" ;


// @ 個別方案 _ 使用情形 ( 版面類似 : Plan_Used_Records.tsx )
const Plan_Used_List = () => {

  
   const plan_Type = '包月洗澡'
   const data = {} as any ;

   const applied_Species_Name = ''

   return   

          <> 

            <br/>

            { /* 標題列 */ }   

            <b className={ `tag is-medium is-rounded is-large is-light ${ plan_Type === '包月洗澡' ? 'is-success' : 'is-danger' }` } >

                { plan_Type === '包月洗澡' ? <i className="fas fa-bath"></i> : <i className="fas fa-cut"></i> } &nbsp;

                { plan_Type } ( { applied_Species_Name } ) &nbsp; &nbsp;

                <b className="tag is-white is-medium is-rounded">
                    基本價格 : &nbsp; <span className="fBlue"> ${ data ? data['plan_basic_price'] : 0 }  </span> &nbsp;&nbsp;
                    個體調整 : &nbsp; <span className="fBlue"> ${ data ? data['plan_adjust_price'] : 0 } </span> &nbsp;&nbsp;
                    接送費   : &nbsp; <span className="fBlue"> ${ data ? data['pickup_fee'] : 0 }        </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    小 計    : &nbsp; <span className="fRed">  ${ data ? data['plan_fee_total'] : 0 }    </span> &nbsp;&nbsp;
                </b>

            </b>

            <br/><br/><br/>

            
                    <table className="table is-fullwidth is-hoverable">

                        <thead>
                            <tr>
                                <th>  服務說明  </th>
                                <th>  服務價格  </th>
                                <th>  剩餘額度  </th>
                                <th>  使用日期  </th>
                            </tr>
                        </thead>

                        <tbody>
                            
                        </tbody>

                    </table>
   
          </>


} ;


export default Plan_Used_List 
       