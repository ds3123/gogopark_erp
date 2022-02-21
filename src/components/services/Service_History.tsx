
import React, {useContext} from "react" ;


{ /* 各種服務 _ 消費歷史 */ }
const Service_History = ( ) => {


    const user    = {

        position : "absolute" ,
        top: "-20px" ,
        left : "0px"

    } as any ;

    const tag     = {

        position : "absolute" ,
        top: "-20px" ,
        left : "100px"

    } as any ;

    const date    = {

        position : "absolute" ,
        bottom: "10px" ,
        right : "20px" ,
        color : "rgba(0,0,0,.2)"

    } as any ;

    const content = {
        height : "250px" ,
        overflow : "auto"
    } as any ;


    return  <div style={{ position:"relative",top:"20px" }}>

                <label className="label" style={ { fontSize : "1.3em" } }> <i className="far fa-calendar-alt"></i>

                    &nbsp; 首次來店日 : <span style={{color:"rgba(0,0,0,.3)"}}> 2019-05-20 </span> &nbsp; &nbsp; &nbsp; &nbsp;
                    最後來店日 :<span style={{color:"rgba(0,0,0,.3)"}}> 2020-03-10 </span>

                </label> <br/>

                <div className="columns is-multiline  is-mobile" >

                    { /*  洗澡單  */ }
                    <div className="column is-3-desktop " >

                        <span className="tag is-success is-info is-large is-light"> <i className="fas fa-bath"></i> &nbsp; <b>洗澡單</b> </span> <br/><br/><br/>

                        <div className="card">

                                  <span className="tag  is-medium is-rounded" style={ user }>
                                      <i className="fas fa-user-md"></i> &nbsp; <b> 晨薇 </b>
                                  </span>

                            <span className="tag is-link is-light is-medium is-rounded" style={ tag }>
                                      <i className="fas fa-tag"></i>  &nbsp; <b> 第一道 護色</b>
                                  </span>

                            <div className="card-content" style={ content }>

                                <b> (3) 兩耳咖啡 </b>

                                <br/><br/>
                                <b style={ date }> 2020-05-20 </b>
                            </div>

                        </div> <br/>

                        <div className="card">

                                  <span className="tag  is-medium is-rounded" style={ user }>
                                      <i className="fas fa-user-md"></i> &nbsp; <b> 晨薇 </b>
                                  </span>

                            <span className="tag is-link is-light is-medium is-rounded" style={ tag }>
                                      <i className="fas fa-tag"></i>  &nbsp; <b> 第一道 淡雅</b>
                                  </span>

                            <div className="card-content" style={ content } >
                                <b>
                                    頭跟耳剃3MM. 身體.腳.尾巴剃1.5MM
                                    兩耳咖啡
                                    第一道+護色 </b>
                                <br/><br/>
                                <b style={ date }> 2020-05-20 </b>
                            </div>

                        </div> <br/>

                    </div>

                    { /*  美容單  */ }
                    <div className="column is-3-desktop " >

                        <span className="tag is-success is-danger is-large is-light"> <i className="fas fa-cut"></i> &nbsp; <b>美容單</b> </span>  <br/><br/><br/>

                        <div className="card">

                                  <span className="tag  is-medium is-rounded" style={ user }>
                                      <i className="fas fa-user-md"></i> &nbsp; <b> 宜芳 </b>
                                  </span>

                            <span className="tag is-link is-light is-medium is-rounded" style={ tag }>
                                      <i className="fas fa-tag"></i>  &nbsp; <b> 修剪 </b>
                                  </span>

                            <div className="card-content" style={ content }>
                                <b> 頭尾腳身體全光.順毛推.臉盡量短   </b>
                                <br/><br/>
                                <b style={ date }> 2020-02-18 </b>
                            </div>

                        </div>

                    </div>

                    { /*  基礎單  */ }
                    <div className="column is-3-desktop " >

                        <span className="tag is-success is-warning is-large is-light"> <i className="far fa-list-alt"></i> &nbsp; <b>基礎單</b> </span> <br/><br/><br/>



                    </div>


                    { /* 住 宿  */ }
                    <div className="column is-3-desktop " >

                        <span className="tag is-info is-large is-light"> <i className="fab fa-houzz"></i>   &nbsp; <b>住 宿</b> </span> <br/><br/><br/>

                        <div className="card">

                                   <span className="tag  is-medium is-rounded" style={ user }>
                                      <i className="fas fa-user-md"></i> &nbsp; <b> 小婷 </b>
                                   </span>

                            <div className="card-content " style={ content }>

                                <b className="m_Bottom_5"> 房 號 : </b> A03    <br/>
                                <b className="m_Bottom_5"> 住 房 : </b> 05-30  <br/>
                                <b className="m_Bottom_5"> 退 房 : </b> 06-06  <br/>
                                <b className="m_Bottom_5"> 費 用 : </b> 2000 元  <br/>
                                <b className="m_Bottom_5"> 合 約 : </b> <b className="tag is-warning"> Lodge_053020</b>  <br/>

                                <br/><br/>
                                <b style={ date }> 2020-05-30 </b>
                            </div>

                        </div> <br/>

                    </div>

                </div>

             </div>

} ;

export default Service_History ;
