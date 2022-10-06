- Clone git repository
- Download [node.js](https://nodejs.org/en/download/)
- get [MUI](https://mui.com/)
- react [tutorial](https://reactjs.org/tutorial/tutorial.html)
- to run do:
  - npm i (downloads node modules needed. only needed the first time you open)
  - npm start (starts the program)
  
  
 ```
 //in app.js
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
 //in specific tag
 
 import { useNavigate } from "react-router-dom";
 
 function Component(){
 const navigate = useNavigate();
 
 <Button onClick={() => navigate("<tagname>")}>
  
 }
 ```
