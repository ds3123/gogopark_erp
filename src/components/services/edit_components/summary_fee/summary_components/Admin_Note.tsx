import React , { FC , useContext } from "react" ;

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";


// @ 櫃台備註
const Admin_Note : FC< { editType : any , register : any } > = ( { editType , register } ) => {

    const value = useContext( SidePanelContext ) ;                      // 取得 context 值  
    const data  = value.preLoadData ?  value.preLoadData : value.data ; // 預先取得資料



   return <>

            <div className="column is-2-desktop">
                <span className="tag is-large is-white"> <b> 櫃台備註 : </b> </span>
            </div>

            <div className="column is-6-desktop relative">

                { /* for 新增  */ }
                { editType !== '編輯' &&

                    <div className="control has-icons-left" style={{left: "-60px"}}>
                        <input className="input" type="text" {...register("admin_Service_Note")} />
                        <span className="icon is-small is-left"> <i className="fas fa-edit"></i> </span>
                    </div>

                }

                { /* for 編輯  */ }
                { editType !== '編輯' ||

                    <b className="absolute f_15" style={{ left : "-46px" , top:"17px" }} >
                        <b className="fDblue"> { data.admin_service_note ? data.admin_service_note : '無'  }  </b>
                    </b>

                }
                
            </div>

          </>          

} ;

export default Admin_Note
       