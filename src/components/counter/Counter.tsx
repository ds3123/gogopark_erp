
import { useState   } from "react" ;


// @ 測試 :「 元件 」( 練習用 2022.03.06 )

const Counter = () => {

    const [ count , setCount ] = useState( 0 ) ;
    
    return <div>
                 <div> 目前數字 : {count} </div>
                 <button onClick={ () => setCount( count + 1 ) } > 點我加一 </button>
           </div>


}

export default Counter ;
       