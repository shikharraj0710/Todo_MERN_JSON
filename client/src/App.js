import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import { Routes, Route} from "react-router-dom"
import AddTodo from "./components/AddTodo";

function App() {
  return (
  <>
   <Header />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/addTodo" element={<AddTodo />} />
   </Routes>
  </>);
}

export default App;