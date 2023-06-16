


import { Route, Routes } from "react-router-dom";
import Page1 from "./components/Page1";
import DataPrivacy from "./components/DataPrivacy";
import BotChat from "./components/BotChat"


function App() {
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Page1/>}/>
        <Route path="/dataprivacy" element={<DataPrivacy/>}/>
        <Route path="/botchat" element={<BotChat/>}/>
      </Routes>
    </> 
  );
}

export default App;
