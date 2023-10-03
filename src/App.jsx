import { useEffect, useState } from 'react'
import './App.css'
import tree from '../assets/tree.jpg'
import bag from '../assets/bag.png'

function App() {
  const [quantity, setQuantity] = useState(1)
  const [inputValue, setInputValue] = useState("")
  const [todolist, setTodoList] = useState([])
  const [itemsPacked, setItemsPacked] = useState([])
  const [sortBy, setSortBy] = useState('');
  
  
 useEffect(()=>{
  if(todolist.length >0 ){
    const packed = todolist.filter((item) =>  item.isPacked)
    setItemsPacked(packed)
  }else{
    setItemsPacked([])
  }
 },[todolist])

 


 function clearListHandler(){
  const confirm = window.confirm("Do you wnat to delete all the items in the list?")
  if(confirm){
    setTodoList([])
  }
 }
 function addItemHandler(){
  if (!inputValue){
    return alert("Value is required")
  }else{
    const newItem ={
     item : `${quantity} ${inputValue}`,
     isPacked:false
    };
    
    setTodoList([...todolist, newItem])
    setInputValue("");
    }
 }
 function packItemsHandler(index){
  const updateList = [...todolist]
  updateList[index].isPacked = !updateList[index].isPacked;
  setTodoList(updateList)
}

 
const sortByPackedStatus = () => {
  const sortedList = [...todolist].sort((a, b) => {
    console.log(a)
    console.log(b)
    if (a.isPacked && !b.isPacked) return -1;
    if (!a.isPacked && b.isPacked) return 1;
    return 0;
  });
  console.log(sortedList)
  setTodoList(sortedList);
  setSortBy('Sort By Packed Status'); // Update sorting option
};

// Function to sort the list by input order
const sortByInputOrder = () => {
  const sortedList = [...todolist].sort((a, b) => {
    // Extract numbers from text and compare them
    const numA = parseInt(a.item.split(' ')[0]);
    const numB = parseInt(b.item.split(' ')[0]);
    
    return numA - numB;
     
  });
  setTodoList(sortedList);
  setSortBy('Sort By input order'); // Update sorting option
};

// Function to sort the list by description
const sortByDescription = () => {
  const sortedList = [...todolist].sort((a, b) => {
    const keywordA = a.item.split(' ').slice(1).join(' ');
    const keywordB = b.item.split(' ').slice(1).join(' ');
  

    return keywordA.localeCompare(keywordB);
  });
  setTodoList(sortedList);
  setSortBy('Sort By Description'); // Update sorting option
};

// Function to handle sorting option change
const handleSortChange = (e) => {
  const selectedSort = e.target.value;
  if (selectedSort === 'Sort By Packed Status') {
    sortByPackedStatus();
  } else if (selectedSort === 'Sort By input order') {
    sortByInputOrder();
  } else if (selectedSort === 'Sort By Description') {
    sortByDescription();
  } else {
    setSortBy(selectedSort); // Update sorting option
  }
};
  return (
    <div className="farAwayTodo">
      <div className="header">
        <div className='headerItem'>
        <img className='imageHeader' src={tree} alt="" />
        <h1 style={{color:'white'}}>FAR AWAY</h1>
        <img className='imageHeader' src={bag} alt="" />
        </div>
      </div>
      <div className="inputArea">
        <h3>What do you need for your 😍 trip?</h3>
        <select name="quantity" id="" className='options' value={quantity} onChange={(e)=> setQuantity(parseInt(e.target.value))}>
          {
            Array.from(Array(20).keys(),(x)=>(
              <option value={x+1} key={x}>{x+1}</option>
            ))
          }
        </select>
        <input type="text" placeholder='Add items...' className='input' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className='btn' onClick={() => addItemHandler()}>Add</button>
      </div>
      <div className="mainBody">
        {
          todolist.map((item, index) => (
            <div className='itemValues' key={index}>
              <input type="checkbox" onChange={() => {
                packItemsHandler(index)
              }} checked={item.isPacked} />
              <span style={{ textDecoration: item.isPacked ? "line-through" : "none" }}>{item.item}</span>
              <i
              className="crossBtn"
              onClick={() => {
                const updatedList = [...todolist];
                updatedList.splice(index, 1);
                setTodoList(updatedList);
              }}
            > X</i>
            </div>
          ))
        }
      </div>
      <div className="footer">
        <div className="footerTop">
          <select name="sortBy" value={sortBy} className='options' onChange={handleSortChange}>
            <option value="Sort By input order">Sort by order</option>
            <option value="Sort By Description">Sort by description</option>
            <option value="Sort By Packed Status">Sort by completed</option>
          </select>
          <button className='btn' onClick={clearListHandler}>Clear list</button>
        </div>
        <div className="footerBottom">
          <h3>You have {todolist.length} items on your list, and you already Packed {itemsPacked.length} {`(${(itemsPacked.length / todolist.length) * 100}%)` || `0%`}</h3>
        </div>
      </div>
    </div>
  )
}

export default App


