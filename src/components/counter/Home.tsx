
import { useEffect } from "react" ;
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "store/actions/action_Test";



// @ 測試 :「 Redux 」( 練習用 : 尚未完成 2022.03.06  )

const Home = () => {

   const dispatch = useDispatch();

   useEffect( () => {

     dispatch( fetchUser() ) ; // 從 API 取得資料，完成後會更新 store 中的 user，顯示在以下的頁面中

   } , [] )


    return <>
              <h1> 首頁 </h1>
              <div>
                   { JSON.stringify( useSelector( ( state:any ) => state.Test.user ) ) }    
              </div>   
           </>

}

export default Home ;
       