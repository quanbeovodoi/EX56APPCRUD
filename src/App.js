import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import DefaultLayouts from './layouts/DefaultLayouts/DefaultLayouts';
import Globals from './components/Globals/Globals';
import { DataProvider } from './api/dataContext';

function App() {
  return (
    <Globals>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              {
                publicRoutes.map((route,index)=>{
                  const Page = route.component;
                  const Layout = DefaultLayouts;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element = {
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  )
                })
              }
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </Globals>
  );
}

export default App;
