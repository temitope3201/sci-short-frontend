import 'bootstrap/dist/css/bootstrap.min.css';
    import React from 'react'
import ReactDOM  from 'react-dom'
import NavBar from './components/navbar';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import HomePage from './components/home';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import ShortenUrlPage from './components/shorten_url';
import RedirectURL from './components/redirect';
import "./styles/main.css"

// export const baseUrl = "http://localhost:5000"
// export const domain = "http://localhost:3000"

export const domain = "https://sci-short.onrender.com"
export const baseUrl = "https://sci-short-api.onrender.com/"
export const usernameRegex = /^[a-zA-Z0-9_]{3,25}$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const customUrlRegex = /^[a-zA-Z0-9_]{5,20}$/;
export const urlRegex = /^(https?:\/\/)/;

const App =()=>{
    
    return(
        <Router> 
        
            <div className=''>
                <NavBar/>
                <Routes>
                    <Route path="/:short_url" element={<RedirectURL />} />
                    <Route path='/' element = {<HomePage/>}/>
                    <Route path='/signup' element = {<SignUpPage/>}/>
                    <Route path='/login'  element = {<LoginPage/>}/>
                    <Route path='/shorten_url'  element = {<ShortenUrlPage/>}/>
                </Routes>
            
            </div>
        </Router>
    )
  
}

ReactDOM.render(<App/>, document.getElementById('root'))
