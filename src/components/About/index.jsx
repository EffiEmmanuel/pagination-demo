import React from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import AboutMe from './AboutMe'
import AboutUs from './AboutUs'

function About() {
  return (
    <div>
        <h3>About</h3>
        <Link to='about-me'>About me</Link> <br />
        <Link to='about-us'>About us</Link>

        <Outlet />
    </div>
  )
}

export default About