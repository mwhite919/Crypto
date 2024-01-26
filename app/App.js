"use client"

import React from "react";

import { Coins, Portfolio, Summary } from "pages";
import { SubNavbar, Navbar, MobileHeader } from "components";
import { ThemeProvider, GlobalStyles } from "styled-components";
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';



const theme = {
    dark:{
        primary:'black',
        text: '#fff'
    },
    light:{
        primary: '#fff',
        text: '#000'
    }
}



 const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <div>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Page />}></Route>
          <Route path="/coininfo/:id" element={<Page />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      </div>
    </ThemeProvider>
  );
};

export default App