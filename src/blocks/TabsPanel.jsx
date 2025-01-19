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
        // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevated appearance
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "30px", // Add spacing between tabs
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
                    color: "#F44336", // Red close icon
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering tab change on close
                    removeTab(tab.id);
                  }}
                >
                  ×
                </span>
              </Box>
            }
            value={tab.id}
            sx={{
              textTransform: "none", // Prevent uppercase text
              padding: "6px 16px", // Adjust spacing for a balanced look
              minWidth: "auto", // Shrink to fit content
              borderRadius: "6px", // Rounded edges for every tab
              backgroundColor: "#FFFFFF", // Background color for all tabs
              border: "1px solid #E0E0E0", // Border around all tabs
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow
              "&.Mui-selected": {
                color: "#1976D2", // Blue text for active tab
                backgroundColor: "#F4F5F8", // Light gray background for active tab
                fontWeight: "bold",
                border: "1px solid #1976D2", // Blue border for active tab
                boxShadow: "none", // Remove shadow for active tab
              },
              "&:hover": {
                backgroundColor: "#F9F9F9", // Slightly darker on hover
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPanel;
