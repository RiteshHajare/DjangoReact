import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import csrfToken from 'django-react-csrftoken';


function App() {

  const [table, setTable] = useState({
    col1:"",
    col2:"",
    col3:""
  })
  const [data, setData] = useState([]);

  const handleChange = (e)=>{
    setTable(prev=>{
      return{
        ...prev,[e.target.name]:e.target.value
      }
    })
  }

  const handleSubmit = async ()=>{
  
  
    await axios.post('http://127.0.0.1:8000/form/',table).then(()=>{
      getData()
    })
      
    // console.log(response);
      
      
  }

  useEffect(() => {
    getData()
  }, [])
  
  async function getData(){
    await axios.get('http://127.0.0.1:8000/form/')
    .then(res=>{
      console.log(res);
      setData(res.data.data)
    })
    .catch(err=>{
      console.log(err);
    }) 
  }

  async function handleDelete(id){
    await axios.post('http://127.0.0.1:8000/deleteform/',{id}).then(()=>{
      getData()
    })
  }

  return (
    <div className="app">
      <section>
      <table border="1">
        <tr>
          <td>col1</td>
          <td>col2</td>
          <td>col3</td>
        </tr>
            <tr>
              <td><input name='col1' onChange={handleChange} type="text" /> </td>
              <td><input name='col2' onChange={handleChange} type="text" /> </td>
              <td><input name='col3' onChange={handleChange} type="text" /> </td>
              <button onClick={handleSubmit}>Submit</button>
            </tr>
        {data && data.map(row=>{
          return(
            <tr>
              <td>{row.col1} </td>
              <td>{row.col2} </td>
              <td>{row.col3} </td>
              <button onClick={()=>{handleDelete(row.id)}}>delete</button>
              
            </tr>
          )
        })}
    
      </table>
      <div style={{display:"flex",width:"10rem",justifyContent:"center",margin:"0rem auto"}}>
        
        
      </div>
      </section>
    
    </div>
  );
}

export default App;
