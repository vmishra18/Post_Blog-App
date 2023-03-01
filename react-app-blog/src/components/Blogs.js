import React from 'react'
import {MDBCol,
MDBCard, MDBCardTitle, 
MDBCardBody, MDBCardText, MDBBtn, MDBIcon
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import Badge from './Badge';



const Blogs = ({title, category, description, id, excerpt, handleDelete}) => {
  return (
        <MDBCol size="4">
            <MDBCard className='h-100 mt-2' style={{maxWidth:"22rem"}}>
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>{excerpt(description)}
                    <Link to={`/blog/${id}`}> Read More</Link>
                    </MDBCardText>
                    <Badge>{category}</Badge>
                    <span>
                        <MDBBtn className='mt-1' tag="a" color="none" onClick={() => handleDelete(id)}>
                            <MDBIcon
                            fas
                            icon='trash'
                            style={{color:"#dd3939"}}
                            size="1g"/>
                        </MDBBtn>
                        <Link to={`/editBlog/${id}`}>
                        <MDBIcon
                            fas
                            icon='edit'
                            style={{color:"#55acaa", marginLeft:"10px"}}
                            size="1g"/>
                        </Link>
                    </span>
                </MDBCardBody>
            </MDBCard>

        </MDBCol>
  )
}

export default Blogs
