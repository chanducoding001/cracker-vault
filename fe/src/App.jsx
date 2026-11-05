import React from 'react';
import Navbar from './navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRedirect from '../routing/HomeRedirect';
import LoginComponent from './auth/LoginComponent';
import UnAuthorized from './pages/UnAuthorized';
import Authenticated from '../routing/Authenticated';
import UploadCsvData from './pages/UploadCsvData';
import DisplayCrackersData from './pages/DisplayCrackersData';
import { navigationLocations } from './utils/utils';
import Home from './pages/Home';
import SettingsData from './pages/SettingsData';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeRedirect/>}>
            <Route path="/login" element={<LoginComponent />} />
          </Route>
          <Route element={<Authenticated/>}>
            <Route path={navigationLocations?.home} element={<Navbar/>}>
              <Route index element={<Home />} />
              <Route path={navigationLocations?.uploadCsv} element={<UploadCsvData />} />
              <Route path={navigationLocations?.displayCrackers} element={<DisplayCrackersData />} />
              <Route path={navigationLocations?.settings} element={<SettingsData />} />
            </Route>
          </Route>
              <Route path="*" element={<UnAuthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
      
export default App;
