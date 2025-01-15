// import React, { useState } from "react";
// import SideMenu from "./SideMenu";
// import TabsPanel from "./TabsPanel";
// import { Box } from "@mui/material";

// function App() {
//   const [activeTabs, setActiveTabs] = useState([]);

//   const addTab = (tabId, label) => {
//     if (!activeTabs.find((tab) => tab.id === tabId)) {
//       setActiveTabs((prevTabs) => [...prevTabs, { id: tabId, label }]);
//     }
//     setActiveTab(tabId);
//   };

//   const removeTab = (tabId) => {
//     setActiveTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
//     if (activeTabs.length > 1 && activeTabs[0]?.id === tabId) {
//       setActiveTab(activeTabs[1]?.id);
//     }
//   };

//   const [activeTab, setActiveTab] = useState(null);

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <SideMenu addTab={addTab} />
//       <TabsPanel
//         activeTabs={activeTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         removeTab={removeTab}
//       />
//     </Box>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { adminRoutes, authRoutes } from "./routes/index";
import LoginLayout from "./layout/Login";
import { Fragment } from "react";

function AdminRoutes() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<div>Not Found</div>} />
        {authRoutes &&
          authRoutes.map((route, key) => (
            <Route
              path={route.path}
              element={
                <LoginLayout>
                  <route.component />
                </LoginLayout>
              }
              key={key}
            />
          ))}
      </Routes>
    </Fragment>
  );
}





const MainApp = () => (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/test" element={<Test />} /> */}
      <Route path="admin/*" element={<AdminRoutes />} />
      {/* <Route path="distributor/*" element={<DistributorRoutes />} />
      <Route path="customer/*" element={<CustomerRoutes />} /> */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default MainApp;
