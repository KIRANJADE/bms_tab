import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const TabsPanel = ({ activeTabs, activeTab, setActiveTab, removeTab }) => {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F5F8",
        padding: "30px 30px 5px",
        position: "sticky",
        top: "0",
        zIndex: "999",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "30px",
          },
        }}
      >
        {activeTabs.map((tab) => (
          <Tab
            key={tab.id}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {tab.label}
                <span
                  style={{
                    color: "#F44336",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                >
                  ×
                </span>
              </Box>
            }
            value={tab.id}
            sx={{
              textTransform: "none",
              padding: "6px 16px",
              minWidth: "auto",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E0E0E0",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
              // "&.Mui-selected": {
              //   color: "white",
              //   backgroundColor: "#4c79f8",
              //   fontWeight: "bold",
              //   border: "none",
              //   boxShadow: "none",
              //   borderBottom:"none"
              // },
              // "&:hover": {
              //   backgroundColor: "#4c79f8",
              // },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPanel;
