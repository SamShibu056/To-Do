
import {  useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function App() {
  const [input, setintput] = useState("");
  const [todos,settodos] = useState([]);
  const [finished,setfinished] = useState([]);
  const [checked,setchecked] = useState(false);

  useEffect(() => {
      let todos = JSON.parse(localStorage.getItem("todos")) 
      if(todos && todos.length>0){
        settodos(todos)
      }
      let fin = JSON.parse(localStorage.getItem("finished")) 
      if(fin&& fin.length>0){
        setfinished(fin)
      }
  }, [])
  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])
  useEffect(()=>{
    localStorage.setItem("finished", JSON.stringify(finished));
  },[finished])
 

  function addHandler() {
    settodos(prevTodos => [...prevTodos, {input, isCompleted: false}]);
    console.log(todos);
  setintput("");

  }
  function doneHandler(item){
     deleteHandler(item);
     setfinished(prevFinished => [...prevFinished, {input: item.input, iscompleted: true}]);


  }

  function deleteHandler(item) {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if(isConfirmed){
      settodos(prevTodos => {
        const updatedTodos = prevTodos.filter((todo) => item.input !== todo.input);
        return updatedTodos;
      });
    } 
    else {
      alert('Deletion canceled.');
    }
    
  }
  function deletefinishedHandler(item) {
    setfinished(prevfinished => {
      const updatedfinished = prevfinished.filter((todo) => item.input !== todo.input);
      return updatedfinished;
    });
  }                 
  function editHandler(item){
    console.log(item.input);
    setintput(item.input);
    deleteHandler(item);
  }
function checkHandler(){
  setchecked(!checked);
}
  return (
    <div className="  App flex flex-col gap-5 justify-center items-center	w-screen h-screen bg-white">
      {/* <Navbar /> */}
      <h1 className="font-extrabold text-2xl">TO-DO LIST</h1>
      <div className="  border-2  box1 flex justify-center items-center flex-col w-96 p-5 rounded-lg shadow-2xl">
      <h2 className="text-xl my-2 ">Add a todo</h2>
        <div className="h-96 flex flex-col w-full">
          
          <div className="relative flex items-center justify-center flex-col my-2">
          <input
            type="text"
            className="border-2 w-5/6 mx-auto p-2 rounded-2xl  "
            value={input}
            placeholder="Enter Text"
            onChange={(event) => setintput(event.target.value)}
            
          />
          <button className="absolute right-8" onClick={addHandler}>
          <IoMdAddCircle className="text-4xl "/>
          </button>
          </div>
          
          <h1 className="mx-auto">Your Tods</h1>
          <div>
          <input type="checkbox" className="border-4" value={checked} onChange={checkHandler}/>
          <label htmlFor="">Show Finished</label>
          </div>
          
          
          <div className="flex gap-5 flex-col overflow-y-auto ">
            {
            checked ? (
              finished && finished.map((item,index)=>
                 (
                  <div className="justify-start w-full flex   bg-white items-center rounded-lg shadow-md hover:shadow-lg hover:border-black border-solid border transition-all" key={index}> 
                    <div className="mr-auto min-h-20 flex items-center max-w-48	">{item.input}</div>
                    <button className=""  name= {item.input} onClick={() => deletefinishedHandler(item)} > <MdDeleteForever className="text-3xl "/></button>
                  </div>
                 )
              )
            ):(
              todos && todos.map((item,index)=>
                 (
                  <div className="justify-start w-full flex   bg-white items-center rounded-lg shadow-md hover:shadow-lg hover:border-black border-solid border transition-all" key={index}> 
                    <input type="checkbox" className="mx-3" onChange={() => doneHandler(item)} name= {item.input} checked= {item.isCompleted} />
                    <div className="mr-auto min-h-20 flex items-center max-w-48	">{item.input}</div>
                    <button  onClick={() => editHandler(item)} className="ml-auto"  name= {item.input} ><FaRegEdit className=" text-3xl "/></button>
                    <button className=""  onClick={() => deleteHandler(item)} name={item.input}>
                    <MdDeleteForever className="text-3xl "/>
                
                  </button>
                  </div>
                 )
              )
              
            )
            }
            <div></div> 
          </div>
          
        </div>
      </div>
    
    </div>
  );
}

export default App;
