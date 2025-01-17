import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const TabsPanel = ({ activeTabs, activeTab, setActiveTab, removeTab }) => {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box  sx={{
      backgroundColor: "#ffffff",
      padding: "10px",
      position: "sticky",
      top: "0",
      zIndex: "999",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adjust the shadow to your preference
    }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {activeTabs.map((tab) => (
          <Tab
            key={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {tab.label}
                <span
                  style={{ color: "red", cursor: "pointer" }}
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
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPanel;
