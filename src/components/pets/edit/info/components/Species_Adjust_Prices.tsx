
import { Input } from "templates/form/Input";

/*

  @ 品種調整後價格

*/


type Adjust = {

    register : any ;

} 


const Species_Adjust_Prices = ( { register } : Adjust ) => {


   return <div className="columns is-multiline is-mobile relative m_Top_10" style={{ left : "90px" }}>

                <div className="column is-2-desktop relative"> 
                    <b className="absolute f_15" style={{ top:"40px" , left : "-60px" }}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;個別調整價格
                    </b>
                </div>

                <Input type="number" name="price_Single_Bath" label="單次洗澡"  register={ register }  error={ null }
                                     icon="fas fa-shower" asterisk={false} columns="2"  />

                <Input type="number" name="price_Month_Bath"  label="包月洗澡"  register={ register }  error={ null }
                                     icon="fas fa-shower" asterisk={false} columns="2" note="4 次洗澡" />
                
                <Input type="number" name="price_Single_Beauty"  label="單次美容"  register={ register }  error={ null }
                                     icon="fas fa-cut" asterisk={false} columns="2" />

                <Input type="number" name="price_Month_Beauty"  label="包月美容"  register={ register }  error={ null }
                                     icon="fas fa-cut" asterisk={false} columns="2" note="含 1 大美"  />                    

           </div>

} ;

export default Species_Adjust_Prices 
       


