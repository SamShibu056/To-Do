
import {  useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
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
  function doneHandler(event){
     deleteHandler(event);
     setfinished(prevFinished => [...prevFinished, {input: event.target.name, iscompleted: true}]);


  }

  function deleteHandler(event) {
    settodos(prevTodos => {
      const updatedTodos = prevTodos.filter((todo) => event.target.name !== todo.input);
      return updatedTodos;
    });

  }
  function deletefinishedHandler(event) {
    setfinished(prevfinished => {
      const updatedfinished = prevfinished.filter((todo) => event.target.name !== todo.input);
      return updatedfinished;
    });
  }
  function editHandler(event){
    setintput(event.target.name);
    deleteHandler(event);
  }
function checkHandler(){
  setchecked(!checked);
}
  return (
    <div className=" text-[#00adb5] App flex flex-col gap-5 justify-center items-center	w-screen h-screen bg-[#222831]">
      {/* <Navbar /> */}
      <h1 className="font-extrabold text-2xl">TO-DO LIST</h1>
      <div className=" border-red-400 border-2  box1 flex justify-center items-center flex-col w-96 p-5 rounded-lg">
      <h2 className="text-xl my-2 ">Add a todo</h2>
        <div className="h-96 flex flex-col w-full">
          
          <div className="relative flex items-center justify-center flex-col my-2">
          <input
            type="text"
            className="border-2 w-5/6 mx-auto p-2 rounded-2xl  bg-[#222831]"
            value={input}
            placeholder="Enter Text"
            onChange={(event) => setintput(event.target.value)}
            
          />
          <button className="absolute right-8" onClick={addHandler}>
          <IoMdAddCircle className="text-4xl text-[#00adb5]"/>
          </button>
          </div>
          
          <h1 className="mx-auto">Your Tods</h1>
          <div>
          <input type="checkbox" className="border-4" value={checked} onChange={checkHandler}/>
          <label htmlFor="">Show Finished</label>
          </div>
          
          
          <div className="flex gap-5 flex-col ">
            {
            checked ? (
              finished && finished.map((item,index)=>
                 (
                  <div className="w-full flex gap-10 border-2 min-h-10 bg-[#222831] items-center" key={index}> 
                    <div>{item.input}</div>
                    <button className=""  name= {item.input} onClick={deletefinishedHandler} > delete</button>
                  </div>
                 )
              )
            ):(
              todos && todos.map((item,index)=>
                 (
                  <div className="w-full flex gap-10 border-2 min-h-10 bg-[#222831] items-center" key={index}> 
                    <input type="checkbox" onChange={doneHandler} name= {item.input} checked= {item.isCompleted} />
                    <div>{item.input}</div>
                    <button  onClick = {editHandler} className=""  name= {item.input} >button</button>
                    <button className=""  onClick={deleteHandler} name={item.input}>
                    delete
                    {/* <IoMdAddCircle className="text-4xl text-[#00adb5]"/> */}
                  </button>
                  </div>
                 )
              )
            )
            } 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
