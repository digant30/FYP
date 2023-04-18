import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./pages/LoginUser";
import Register from "./pages/RegisterUser";
import AddProduct from "./pages/AddProduct";
import AddSeller from "./pages/AddSeller";
import ChangeProdOwner from "./pages/ChangeOwnership";
import AuthenticateProduct from "./pages/AuthenticateProd";
import HomePage from "./pages/HomePage";
import QueryAllProducts from "./pages/QueryAllProducts";
import QueryProduct from "./pages/QueryProduct";
import AddConsumer from "./pages/AddConsumer";
import QueryOwnerProduct from "./pages/QueryOwnerProducts";
import QuerySeller from "./pages/QuerySeller";
import QueryConsumer from "./pages/QueryConsumer";
import QueryConsumerManu from "./pages/QueryConsumerManu";
import QueryAllConsumersManu from "./pages/QueryAllConsumersManu";
import QueryTransaction from "./pages/QueryTransaction";
import QueryAsset from "./pages/QueryHistoryAsset";
import QueryAllConsumers from "./pages/QueryAllConsumers";
import QueryAllSellers from "./pages/QueryAllSellers";
import QueryConsumerByContactNumber from "./pages/QueryConsumerByContactNumber";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/addproduct" exact component={AddProduct} />
        <Route path="/addseller" exact component={AddSeller} />
        <Route path="/changeowner" exact component={ChangeProdOwner} />
        <Route path="/authenticate" exact component={AuthenticateProduct} />
        <Route path="/queryall" exact component={QueryAllProducts} />
        <Route path="/queryprod" exact component={QueryProduct} />
        <Route path="/addconsumer" exact component={AddConsumer} />
        <Route path="/queryownerprod" exact component={QueryOwnerProduct} />
        <Route path="/queryseller" exact component={QuerySeller} />
        <Route path="/queryconsumer" exact component={QueryConsumer} />
        <Route path="/querytransaction" exact component={QueryTransaction} />
        <Route path="/queryassethistory" exact component={QueryAsset} />
        <Route path="/queryallconsumers" exact component={QueryAllConsumers} />
        <Route path="/queryallconsumersmanu" exact component={QueryAllConsumersManu} />
        <Route path="/queryconsumermanu" exact component={QueryConsumerManu} />
        <Route path="/queryallsellers" exact component={QueryAllSellers} />
        <Route path="/queryconsumercontact" exact component={QueryConsumerByContactNumber} />     
        
      </BrowserRouter>
    </div>
  );
};

export default App;