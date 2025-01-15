import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const TabsPanel = ({ activeTabs, activeTab, setActiveTab, removeTab }) => {
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#f4f4f4", padding: "20px" }}>
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
                            <Box
                                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                            >
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
            <Box sx={{ marginTop: "20px" }}>
                {activeTabs.map((tab) => (
                    <div
                        key={tab.id}
                        style={{
                            display: activeTab === tab.id ? "block" : "none",
                        }}
                    >
                        <h2>{tab.label} Content</h2>
                        <p>This is the content of {tab.label}.</p>
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default TabsPanel;
