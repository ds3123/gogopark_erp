import React, {useCallback , useMemo} from 'react';
import { BrowserRouter , Switch , Route } from "react-router-dom";

import Container from 'containers/Container'

// 各個路徑下的主要頁面元件
import Index from 'components/index/Index'
import Customers from 'components/customers/Customers'
import Pets from 'components/pets/Pets'
import Services from 'components/services/Services'
import Lodge from 'components/lodge/Lodge'
import Beautician from 'components/beautician/Beautician';
import Management from 'components/management/Management'
import Sign_In from 'components/account/Sign_In';



function App(){

  // 利用 Children API，組合 : <Container/> 與 各個路徑下的頁面元件
  const make_Component = ( element : JSX.Element ) => ( <Container> { element } </Container> ) ;


  
  return <BrowserRouter>

            <Switch>

                { /* 登入頁 */ }
                <Route path="/" exact component = { Sign_In } />

                { /* 首頁 */ }
                <Route path="/index" component = { () => make_Component( <Index/> ) } />

                { /* 客戶 */ }
                <Route path="/customers" component = { () => make_Component( <Customers /> ) } />

                { /* 寵物 */ }
                <Route path="/pets" component = { () => make_Component( <Pets /> ) } />

                { /* 洗美 */ }
                <Route path="/services" component = { () => make_Component( <Services /> ) } />

                { /* 住宿 */ }
                <Route path="/lodge" component = { () => make_Component( <Lodge /> ) } />

                { /* 美容師 */ }
                <Route path="/beautician" component = { () => make_Component( <Beautician /> ) } />

                { /* 管理區 */ }
                <Route path="/management" component = { () => make_Component( <Management /> ) } />

            </Switch>

         </BrowserRouter> ;
}

export default App;
