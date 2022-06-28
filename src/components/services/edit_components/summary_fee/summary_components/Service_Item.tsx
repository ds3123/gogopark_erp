


type Item = {

    current           : undefined | string ; 
    editType          : undefined | string ; 
    current_Plan_Type : string ;
    current_Care_Type : string ;

}


// @ 服務項目
const Service_Item = ( { current , editType , current_Care_Type , current_Plan_Type } : Item ) => {


    return <div className="column is-4-desktop">

                <span className="tag is-large is-white">

                    <b> 服務項目 :&nbsp;

                        <span className="fDblue" > 

                            { current } &nbsp;

                            <span className='f_10'>
                                { ( current === '方案' && !editType && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                { ( current === '安親' && !editType && current_Care_Type ) && `( ${ current_Care_Type } )` }
                            </span>

                        </span>
                    </b>
                </span>

          </div>  


} ;

export default Service_Item
       