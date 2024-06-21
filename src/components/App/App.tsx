import React from 'react';
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Header from "../Header/Header";
import MainPosts from "../MainPosts/MainPosts";
import Post from "../Post/Post";
import PostAdd from "../PostAdd/PostAdd";
import SingIn from "../SingIn/SingIn";
import SingUp from "../SingUp/SingUp";
import Profile from "../Profile/Profile";
import HomePage from "../HomePage/HomePage";

function App() {
  return (
    <div className={styles.app_container}>
      <Header/>
      <Routes>
        <Route path={'/'} element = {<HomePage/>}/>
        <Route path={'/posts'} element = {<MainPosts/>}/>
        <Route path={'/post/:id'} element = {<Post/>}/>
        <Route path={'/post/add'} element = {<PostAdd/>}/>
        <Route path={'/login'} element = {<SingIn/>}/>
        <Route path={'/register'} element = {<SingUp/>}/>
        <Route path={'/profile/:id'} element = {<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;