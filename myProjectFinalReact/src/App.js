
import './App.css';
import Therpists from './Components/Therpists';
import Stars from './Components/Stars.js';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Logo from './Components/Logo.js';
import HomePage from './Components/HomePage.js';
import SignIn from './Components/SignIn.js';
import { Category, ImportContacts, TwentyOneMpOutlined } from '@mui/icons-material';
import { configureStore } from '@reduxjs/toolkit';
import NavBar from './Components/NavBar.js';
import Questions from './Components/Questions.js';
import { ThemeProvider } from '@emotion/react';
import theme from './Components/CreateTheme.js';
import TherpistDetails from './Components/TherpistDetails.js';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/Store.js';
import TherpistCard from './Components/TherpistsCard.js';
import React, { useEffect } from 'react';
import Layout from './Components/Layout.js';
import AddComment from './Components/AddComment.js';
import MyAccountPersonalArea from './Components/PersonalArea/MyAccountPersonalArea.js';
import CategoryTherpists from './Components/CategoryTherpists.js';
import SignUpPatient from './Components/SignUpPatient.js';
import CategoryAreas from './Components/CategoryAreas.js';
import { fetchCategory } from './Redux/CategorySlice.js';
import AllTherpistFilter from './Components/AllTherpistFilter.js';
import Chat from './Components/Chat.js';
import { fetchTherpist } from './Redux/TherpistsSlice.js';
import MyAccountTherpist from './Components/PersonalArea/MyDetailsTherpist.js';
import MyDetailsPatient from './Components/PersonalArea/MyDetailsPatient.js';
import CommentsById from './Components/PersonalArea/CommentsById.js';
import MyAppealsPatient from './Components/PersonalArea/MyAppealsPatient.js';
import MyAppealsTherpist from './Components/PersonalArea/MyAppealsTherpist.js';
import LoginForm from './Components/LoginForm.js';
import MyProfiletherpist from './Components/PersonalArea/MyProfiletherpist.js';
import MyProfilePatient from './Components/PersonalArea/MyProfilePatient.js';
import About from './Components/About.js';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchTherpist());
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="TherpistDetails" element={<TherpistDetails />} />
            <Route path="TherpistCard" element={<TherpistCard />} />
            <Route path="MyAccountPersonalArea" element={<MyAccountPersonalArea />} />
            <Route path="CategoryTherpists" element={<CategoryTherpists />} />
            <Route path="CategoryTherpists/TherpistCard" element={<TherpistCard />} />
            <Route path="MyAccountTherpist" element={<MyAccountTherpist />} />
            <Route path="MyDetailsPatient" element={<MyDetailsPatient />} />
            <Route path="About" element={<About />} />

            <Route path="MyProfiletherpist" element={<MyProfiletherpist />} />
            <Route path="MyProfilePatient" element={<MyProfilePatient />} />

            <Route path="MyAppealsPatient" element={<MyAppealsPatient />} />
            <Route path="MyAppealsTherpist" element={<MyAppealsTherpist />} />


            <Route path="CategoryAreas" element={<CategoryAreas />} />

            <Route path="Questions" element={<Questions />} />
            <Route path="SignUpPatient" element={<SignUpPatient />} />


            <Route path="SignIn" element={<SignIn />} />
            <Route path="Therpists" element={<Therpists />} />
            <Route path="Stars" element={<Stars />} />
            <Route path="AllTherpistFilter" element={<AllTherpistFilter />} />
            <Route path="LoginForm" element={<LoginForm />} />


            <Route path="AddComment/:id" element={<AddComment />} />
            <Route path="AddComment" element={<AddComment />} />
            <Route path="Chat" element={<Chat />} />

            <Route path="CategoryTherpists/AddComment/:id" element={<AddComment />} />
            <Route path="AllTherpistFilter/AddComment/:id" element={<AddComment />} />

            <Route path="Therpists" element={<Therpists />} />
            <Route path="Therpists/AddComment/:id" element={<AddComment />} />

            <Route path="*" element={<div><div><br/><br/><br/><br/><br/></div><img src={`/Assets/Images/4042.jpg`} width="480" height="426" top='50%' alt="Not Found" /></div>} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
