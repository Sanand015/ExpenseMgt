//import Login from "./component/Login";
import Login from "./component/Login/Login"
import Home from "./component/HomePage/Home";
import Report from "./component/Report/Report";
import { Route, Routes} from "react-router-dom";


function App() {
  return (
    <>
   

<Routes  > 
    <Route exact path="/" element={<Login/>} />
    <Route exact path="/home" element={<Home/>} />
    <Route exact path="/report-view" element={<Report/>} />
  </Routes>
    
    </>
  )  
}

export default App;
//import axios from "axios";
//npm i bootstrap
//router