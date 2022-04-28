
import icon  from 'imgs/is_dead.png'
import { useState , useEffect } from 'react'
import axios from 'utils/axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set_Side_Panel } from 'store/actions/action_Global_Layout'




// @ 寵物已過世
const Pet_Is_Dead = ( { pet_Serial } : {  pet_Serial : undefined | string } ) => {

   
    const history  = useHistory();
    const dispatch = useDispatch();
 

    const [ is_Dead , set_Is_Dead ] = useState( false ) ; 


    // 點選 _ 切換 : 已過世狀態
    const click_Dead = () => {
   
       // 設定 state
       set_Is_Dead( !is_Dead ) ;


       // 更新資料表
       axios.put( `/pets/${ pet_Serial }` , { is_dead : is_Dead ? 0 : 1 } ).then( res => {


           // 設定 Toast 通知
           toast( `🦄 已更新寵物死亡狀態`, { position : "top-left" , autoClose:1500 , hideProgressBar : false, closeOnClick: true });
          
          
           // 關掉右側面板
           dispatch( set_Side_Panel( false , null , {} ) ) ;

           // 重導向
           history.push( '/wrongpath' ) ;
           history.push( '/pets' ) ;


       }).catch( err => {

           console.log( `更新錯誤 : ${ err }` )

       } )

    } ;


    // 取得 _ 寵物死亡狀態
    useEffect( () => {
      
      if( pet_Serial ){

        axios.get( `/pets/${ pet_Serial }` ).then( res => {
  
            const is_dead = res.data?.is_dead;
            
            set_Is_Dead( is_dead ? true : false ) ;  

        } )

    
      }  


    } , [ pet_Serial ] ) ;




   const str   = is_Dead ? '確認要回覆寵物已過世狀態？' : '確認要將此寵物設為 : "已過世"？' ;   
   const style = {} as any ;
     



   return <b className={ `tag is-medium relative m_Right_30 pointer ${ is_Dead ? 'is-primary' : 'hover' }` } style={ style } 
   
              onClick = { () => { if( window.confirm( str ) ) click_Dead() }  } >
           
              <img src={ icon } width='35px'/> 
             
              &nbsp; 已過世
             
          </b> 


} ;

export default Pet_Is_Dead
       