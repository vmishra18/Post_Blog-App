import React, {useEffect, useState} from 'react';
import {MDBValidation, MDBInput, MDBBtn} from "mdb-react-ui-kit";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import {toast} from "react-toastify";

const initialSate = {
  title:"",
  description:"",
  category:"",
  imageUrl:""
}
const options = ["Travel","Fashion","Fitness","Sports","Food","Tech"];
// Add edit Blog
const AddEditBlog = () => {                                               
  const[formValue, setFormValue] = useState(initialSate);
  const[categoryErrMsg, setCategoryErrMsg]=useState(null);
  const[editMode, setEditMode] = useState(false);
  const{title,description,category} = formValue;
  const navigate = useNavigate();

  const {id} = useParams();
  useEffect(() => {
    if(id){
      setEditMode(true);
      getSingleBlog(id);
    }
    else
    {
      setEditMode(false)
      setFormValue({...initialSate});
    }
  },[id]);
  const getSingleBlog = async(id) =>{
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`)
    if(singleBlog.status === 200){
      setFormValue({...singleBlog.data});
    }
    else{
      toast.error("Something went wrong");
    }
    
  }
  const getDate = () =>{
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth()+1).padStart(2, "0"); //January is 0
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" +yyyy;
      return today;
  };
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!category){
      setCategoryErrMsg("Please select a category");
    }
    if(title && description && category){
      const currentDate = getDate();
      if(!editMode){
          const updateBlogDate = {...formValue, date: currentDate};
          const response = await axios.post('http://localhost:5000/blogs',updateBlogDate);
        if(response.status === 201){
          toast.success("Blog created Successfully");
        }
        else{
          toast.error("Something went wrong");
        }
      }
      else
      {
        const response = await axios.put(`http://localhost:5000/blogs/${id}`,formValue);
        if(response.status === 200){
          toast.success("Blog updated Successfully");
        }
        else{
          toast.error("Something went wrong");
        }
      }
      
      
      setFormValue({title:"", description:"", category:""});
      navigate("/");
    }
  };
  const onInputChange = (e) =>{
    let {name,value} = e.target;
    setFormValue({...formValue,[name]: value});
  };
  const onCategoryChange = (e) =>{
    setCategoryErrMsg(null);
    setFormValue({...formValue,category: e.target.value});
  };
  return (
    <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}>
        <p className='fs-2 fw-bold'>{editMode? "Update Blog":"Add Blog"}</p>
        <div style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}>
              <MDBInput
              value={title || ""}
              name="title"
              type="text"
              onChange={onInputChange}
              required
              label="Title"
              validation="Please provide a title"
              invalid/>
              <br/>
              <MDBInput
              value={description || ""}
              name="description"
              type="text"
              onChange={onInputChange}
              required
              label="Description"
              validation="Please provide a description"
              textarea
              rows={4}
              invalid/>
              <br/>
              <select className='categoryDropdown' onChange={onCategoryChange} value={category}>
                <option>Please select category</option>
                {options.map((option, index)=>(
                    <option value={option || ""} key={index}>{option}</option>
                ))}
              </select>
              {categoryErrMsg &&(<div className='categoryErrorMsg'>{categoryErrMsg}</div>)}
              <br/>
              <br/>
              <MDBBtn type="submit" style={{marginRight:"10px", borderRadius:"25px"}}>{editMode? "Update":"Add"}</MDBBtn>
              <MDBBtn color='danger' style={{marginRight:"10px", borderRadius:"25px"}} onClick={() => navigate("/")}>Go Back</MDBBtn>
            </div>
    </MDBValidation>
  );
}

export default AddEditBlog
