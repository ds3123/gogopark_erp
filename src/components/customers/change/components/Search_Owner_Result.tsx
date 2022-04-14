


type Search_Owner = {

    filter_Owners     : any[] ;                 // 查詢篩選出主人結果
    selected_Owner_Id : string ;                // 所點選主人的身分證字號
    click_Owner       : ( data : any ) => void  // 點選主人

}



// @ 搜尋欲修改主人結果
const Search_Owner_Result = ( { filter_Owners , selected_Owner_Id , click_Owner } : Search_Owner ) => {


    return <div className="column is-12-desktop">

                <div style={ { width:"100%" , height:"40px" , overflow:"hidden" , paddingLeft:"10px" }}>

                    { 
                        filter_Owners?.map( ( item , index ) => <b key      = { index }  
                                                                    className = { `tag is-medium is-rounded m_Right_15 m_Bottom_15 pointer
                                                                                    ${ selected_Owner_Id === item.id ? 'is-danger' : '' } ` }
                                                                    onClick   = { () => click_Owner( item ) } > 
                                                                    { item.name } ( { item.mobile_phone } ) 
                                                                </b>  ) 
                    }

                </div>

           </div>


} ;


export default Search_Owner_Result
       