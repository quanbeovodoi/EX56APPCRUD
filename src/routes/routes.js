import config from "../config/config"
import Home from "../layouts/Home/Home"
import Customer from "../layouts/Customers/Customer"
import Errors404 from "../layouts/Errors/Errors";

const publicRoutes = [
    {path: config.routes.home,component: Home,layout:'unset'},
    {path: config.routes.customer,component: Customer},
    {path: config.routes.error404,component: Errors404}
];

const privateRoutes = [];
export {publicRoutes,privateRoutes};