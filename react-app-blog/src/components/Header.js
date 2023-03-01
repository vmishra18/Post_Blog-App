import React, {useState} from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav,
    MDBInputGroup
  } from 'mdb-react-ui-kit';


const Header = () => {
    const [show, setShow] = useState(false);
  return (
    <div>
      <MDBNavbar expand='lg' light style={{backgroundColor:"#541b1b"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
                <img src='./images/logo.JPG' alt="logo" style={{height:"30px"}}/>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='#navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            style={{color:'#fff'}}
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={show}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/' style={{color:'#fff'}}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addBlog' style={{color:'#fff'}}>
                    Add Blog</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about' style={{color:'#fff'}}>
                    About</MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                  Disabled
                </MDBNavbarLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
            {/* <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
              <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
              <MDBBtn outline>Search</MDBBtn>
            </MDBInputGroup> */}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
