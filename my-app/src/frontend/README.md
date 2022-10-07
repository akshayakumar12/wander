- Clone git repository
- Download [node.js](https://nodejs.org/en/download/)
- get [MUI](https://mui.com/)
- react [tutorial](https://reactjs.org/tutorial/tutorial.html)
- to run do:
  - npm i (downloads node modules needed. only needed the first time you open)
  - npm start (starts the program)
  
  
 ```
 //in app.js
 //import all components
 import { Route, Routes } from "react-router-dom";
 function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/<tagname>" element={<tagname/>}></Route>
    </Routes>
  );
 }
 ```
 
 ```
 //in a tag
 
 import { useNavigate } from "react-router-dom";
 
 function Component(){
 const navigate = useNavigate();
 
 <Button onClick={() => navigate("<tagname>")}>
  
 }
 ```
