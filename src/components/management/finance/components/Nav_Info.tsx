
import Date_Picker from "templates/form/Date_Picker"
import { useForm } from "react-hook-form" 
import { IService } from "utils/Interface_Type" 
import { useState , useEffect } from 'react'
import { useDispatch } from "react-redux"
import { set_Finance_Query_Date_Type } from 'store/actions/action_Finance'



type Nav = {
   total_Amount : number ; // 總計金額 
   total_Note   : any ;    // 計算方式說明
}


type Date = '付款日期' | '到店日期' ;


// @ 上方導覽區域 ( 報表日期、總計 )
const Nav_Info = ( { total_Amount , total_Note } : Nav ) => {


   const dispatch = useDispatch() ;


   // 查詢日期類型 
   const [ date_Type , set_Date_Type ] = useState< Date >( '付款日期' ) ;  


   // 點選 _ 日期類型 
   const click_Date_Type = ( type : Date ) => {

      set_Date_Type( type ) ;
      dispatch( set_Finance_Query_Date_Type( type ) ) ;
   
   } 


   // React Hook Form
   const { control } = useForm< IService >({ mode : 'all' }) ;
   const sum         = { width:'100%' , top:'55px' , left:'25px' } ;

   return  <div className="columns is-multiline is-mobile m_Bottom_100">

                <div className="column is-6-desktop">

                    <div className="tag is-large is-white">
                        
                             <b className = { `tag is-medium is-rounded f_14 pointer  ${ date_Type === '付款日期' ? 'is-black' : 'hover' }` }
                                onClick   = { () => click_Date_Type( '付款日期' ) } > 
                                 付款日期 
                             </b>  
                             
                             &nbsp;&nbsp;

                             <b className = { `tag is-medium is-rounded f_14 pointer  ${ date_Type === '到店日期' ? 'is-black' : 'hover' }` }
                                onClick   = { () => click_Date_Type( '到店日期' ) } > 
                                 到店日期 
                             </b> &nbsp;
                             
                        &nbsp;
                        
                        <Date_Picker control={ control } name="service_Date" default_Date={ new Date } />

                    </div>
                    
                </div>

                {/* { date_Type === '付款日期' && */}

                    <div className="column is-6-desktop relative">


                        <b className="tag is-large is-white relative" >
                            總 計 : &nbsp; <span className="fRed"> { total_Amount } </span> &nbsp; 元
                        </b> 

                        <div className="absolute" style={ sum }> 
                            { total_Note }
                        </div>
                        
                    </div>

                {/* } */}

           </div>



} ;

export default Nav_Info
       