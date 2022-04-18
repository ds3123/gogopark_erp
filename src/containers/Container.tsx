import { useLocation } from "react-router";
import Nav from "templates/nav/Nav"
import Side_Panel from "templates/panel/Side_Panel";
import Not_Support_Mobile from "components/mobile/Not_Support_Mobile";


// 容器元件
const Container = ( props : any ) => {

   const { pathname } = useLocation() ; // 頁面路徑

   return <article className = { pathname === '/' ? "container is-fluid" : "container" }  style = {{ top : "120px" }} >
          
            <Nav />                  { /* 導覽列 */ } 
            <Side_Panel />           { /* 右側滑動面板 */ } 
            <Not_Support_Mobile />   { /* 目前系統尚未支援手機版本 */ }
           
            { props.children }       { /* 各個 URL 路徑下，頁面主要元件 */ } 

          </article> ;


} ;

export default Container ;
