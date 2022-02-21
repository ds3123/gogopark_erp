
import React, {FC} from "react"
import Date_Picker from "templates/form/Date_Picker";

import { Edit_Form_Type } from "utils/Interface_Type";



// @ 使用者 _ 操作紀錄
const Operation_Log : FC< Edit_Form_Type >  = ( { register  , errors , setValue , control } ) => {




    const left = { textAlign : "left" } as const ;

    return   <div className="columns is-multiline is-mobile">

                <div className="column is-2-desktop">

                    <br/>

                    <p> <b> 操作日期 </b> <b style={{color: "red"}}>{errors.employee_Type?.message}</b> </p>
                    <Date_Picker control      = { control }
                                 name         = "employee_Birthday"
                                 default_Date = { new Date } />

                    <br/>

                </div>

                <div className="column is-10-desktop"></div>

                <div className="column is-12-desktop">

                    <table className="table is-fullwidth is-hoverable">

                        <thead>

                            <tr>
                                <th>序 號</th>
                                <th>執行時間</th>
                                <th>功能區塊</th>
                                <th>執行內容</th>
                                <th>備 註</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr><td> 1 </td><td> 10:30 </td><td> 洗澡單 </td><td>新增 _ 洗澡單</td><td style={left}>客戶 : 陳國祥 &nbsp;/&nbsp; 寵物 : 大福 ( 德國狼犬 )</td></tr>
                            <tr><td> 2 </td><td> 13:15 </td><td> 洗澡單 </td><td>編輯 _ 洗澡單</td><td style={left}>客戶 : 李慧芬 &nbsp;/&nbsp; 寵物 : 小白 ( 長毛吉娃娃 )</td></tr>
                            <tr><td> 3 </td><td> 14:15 </td><td> 美容單 </td><td>新增 _ 美容單</td><td style={left}>客戶 : 黃珮君 &nbsp;/&nbsp; 寵物 : BoBo ( 貴賓 )</td></tr>
                            <tr><td> 4 </td><td> 15:00 </td><td> 安親單 </td><td>新增 _ 安親單</td><td style={left}>客戶 : 李明華 &nbsp;/&nbsp; 寵物 : 胖胖 ( 貴賓 )</td></tr>
                            <tr><td> 5 </td><td> 16:25 </td><td> 住宿單 </td><td>新增 _ 住宿單</td><td style={left}>客戶 : 陳建國 &nbsp;/&nbsp; 寵物 : 招財 ( 秋田 )</td></tr>
                            <tr><td> 6 </td><td> 18:47 </td><td> 美容單 </td><td>新增 _ 美容單</td><td style={left}>客戶 : 張慧芸 &nbsp;/&nbsp; 寵物 : Money ( 拉布拉多 )</td></tr>

                        </tbody>

                    </table>


                </div>

    </div>


} ;


export default Operation_Log