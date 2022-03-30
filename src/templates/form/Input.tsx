
import { FC } from "react" ;

type TI = {
    type     : string ;
    name     : string ;
    label    : string ;
    icon     : string ;
    register : any ;
    error?   : any ;
    note?    : string ; 
    asterisk : boolean ;
    columns  : string ;
    onChange? : any ;
    style?    : any ;
    min?      : string ;
    max?      : string ;
    
} ;

export const Input : FC<TI> = ({ register , type , name , label , icon , error , asterisk , columns, min , max , onChange = () => {} , style , note , ...inputProps }) => {

    return  <div className= { `column is-${columns}-desktop ${ ( asterisk ? "required" : "" ) }` }  >

               <p className="relative" > 
                    { label } &nbsp; 
                    
                    <b className="fRed"> { error?.message } </b>  

                    { error?.message ||
                         <b className="fDblue f_9 relative" style={{ left:"-10px" }}> { note } </b>
                    }

               </p>

               <div className="control has-icons-left" >

                  <span className="icon is-small is-left"> <i className={ icon }></i> </span>

                  <input className= {  error ? 'input is-danger' : 'input' }  type={ type } { ...register( name ) }  {...inputProps } onChange = { e => onChange( e ) } style={ style } min={min} max={max}  />

               </div>

            </div>


} ;


