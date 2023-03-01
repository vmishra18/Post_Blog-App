import axios from "axios";
import React, {useState, useEffect}from "react";
import { toast } from "react-toastify";
import {MDBRow, MDBCol, MDBTypography, MDBContainer} from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";

const Home = () => {

    const [data, setData] = useState([]);
    const [searchValue,setSearchValue] = useState("");
    useEffect(() => {
      loadBlogData();
    },[])

    const loadBlogData = async () =>{
      const response = await axios.get('http://localhost:5000/blogs');
        if(response.status === 200){
          setData(response.data);
        }
        else{
          toast.error("Something went wrong...");
        }
    } 

    console.log("data", data);

    const handleDelete = async(id) => {
      if(window.confirm("Are you sure that you wanted to delete that blog")){
        const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
        if(response.status === 200){
          toast.success("Blog deleted seccessfully");
          loadBlogData();
        }
        else{
          toast.error("Something went wrong...");
        }
      }
    };

    const excerpt = (str) => {
      if(str.length > 50){
        str = str.substring(0,50) + "..."
      }
      return str;
    }

    const onInputChange = (e) =>{
      if(!e.target.value){
        loadBlogData();
      }
      setSearchValue(e.target.value);
    }

    const handleSearch = async(e) => {
      e.preventSearch();
      const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
      if(response.status === 200){
        setData(response.data)
      }
      else{
        toast.error('Something went wrong');
      }
    };


  return (
      <>
      {/* <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/> */}
      <MDBRow>
          {data.length === 0 && (
              <MDBTypography className="text-center mb-0" tag="h2">
                    No Blog Found
              </MDBTypography>
          )}
          <MDBCol>
            <MDBContainer>
              <MDBRow>
                  {data && data.map((item, index) => (
                    <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                    />
                  ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
      </MDBRow>

      </>
  );
}

export default Home
