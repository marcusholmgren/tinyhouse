import React, { useState, useCallback } from "react";
import { Layout, Typography, Button, Upload, message } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

// Define interfaces for our data structure
interface Waypoint {
    name: string;
    latitude: number;
    longitude: number;
}

interface Route {
    name: string;
    waypoints: Waypoint[];
}

interface WaypointData {
    waypoints: Waypoint[];
    routes: Route[];
}

export function Settings() {
    const [data, setData] = useState<WaypointData>({ waypoints: [], routes: [] });

    const handleImport = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content === 'string') {
                    const importedData = JSON.parse(content) as WaypointData;
                    // Basic validation
                    if (importedData && Array.isArray(importedData.waypoints) && Array.isArray(importedData.routes)) {
                        setData(importedData);
                        message.success(`${file.name} imported successfully!`);
                    } else {
                        message.error("Invalid file format.");
                    }
                }
            } catch (error) {
                message.error("Failed to parse JSON file.");
                console.error("Import error:", error);
            }
        };
        reader.onerror = () => {
            message.error(`Failed to read file ${file.name}.`);
        };
        reader.readAsText(file);
        return false; // Prevent default upload behavior
    }, []);

    const handleExport = useCallback(() => {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "waypoints-routes.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            message.success("Data exported successfully!");
        } catch (error) {
            message.error("Failed to export data.");
            console.error("Export error:", error);
        }
    }, [data]);

    return (
        <Content style={{ padding: "20px" }}>
            <Title level={2}>Settings</Title>

            <div style={{ marginBottom: "20px" }}>
                <Title level={4}>Import Waypoints/Routes</Title>
                <Upload
                    beforeUpload={handleImport}
                    showUploadList={false}
                    accept=".json"
                >
                    <Button icon={<UploadOutlined />}>Select JSON File</Button>
                </Upload>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <Title level={4}>Export Waypoints/Routes</Title>
                <Button icon={<DownloadOutlined />} onClick={handleExport} disabled={data.waypoints.length === 0 && data.routes.length === 0}>
                    Export Data
                </Button>
            </div>

            {/* Management UI */}
            <div style={{ marginTop: "30px" }}>
                <Title level={3}>Manage Data</Title>

                {/* Manage Waypoints */}
                <div style={{ marginBottom: "20px" }}>
                    <Title level={4}>Waypoints</Title>
                    {data.waypoints.map((wp, index) => (
                        <div key={index} style={{ marginBottom: "5px", padding: "5px", border: "1px solid #eee" }}>
                            {wp.name} ({wp.latitude}, {wp.longitude})
                            <Button
                                type="link"
                                danger
                                onClick={() => setData(prev => ({ ...prev, waypoints: prev.waypoints.filter((_, i) => i !== index) }))}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                    {/* Add Waypoint Form (Simplified) */}
                    <div style={{ marginTop: "10px" }}>
                        <input type="text" placeholder="Name" id="wp-name" style={{ marginRight: "5px" }} />
                        <input type="number" placeholder="Latitude" id="wp-lat" style={{ marginRight: "5px" }} />
                        <input type="number" placeholder="Longitude" id="wp-lon" style={{ marginRight: "5px" }}/>
                        <Button onClick={() => {
                            const name = (document.getElementById("wp-name") as HTMLInputElement).value;
                            const lat = parseFloat((document.getElementById("wp-lat") as HTMLInputElement).value);
                            const lon = parseFloat((document.getElementById("wp-lon") as HTMLInputElement).value);
                            if (name && !isNaN(lat) && !isNaN(lon)) {
                                setData(prev => ({ ...prev, waypoints: [...prev.waypoints, { name, latitude: lat, longitude: lon }] }));
                                (document.getElementById("wp-name") as HTMLInputElement).value = "";
                                (document.getElementById("wp-lat") as HTMLInputElement).value = "";
                                (document.getElementById("wp-lon") as HTMLInputElement).value = "";
                            } else {
                                message.error("Invalid waypoint input.");
                            }
                        }}>Add Waypoint</Button>
                    </div>
                </div>

                {/* Manage Routes */}
                <div>
                    <Title level={4}>Routes</Title>
                    {data.routes.map((route, index) => (
                        <div key={index} style={{ marginBottom: "5px", padding: "5px", border: "1px solid #eee" }}>
                            {route.name} ({route.waypoints.length} waypoints)
                            <Button
                                type="link"
                                danger
                                onClick={() => setData(prev => ({ ...prev, routes: prev.routes.filter((_, i) => i !== index) }))}
                            >
                                Delete
                            </Button>
                            <ul>
                                {route.waypoints.map((wp, wpIndex) => (
                                    <li key={wpIndex}>{wp.name} ({wp.latitude}, {wp.longitude})</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {/* Add Route Form (Simplified) - For simplicity, routes will be empty and can be populated by editing exported JSON and re-importing */}
                    <div style={{ marginTop: "10px" }}>
                        <input type="text" placeholder="Route Name" id="route-name" style={{ marginRight: "5px" }} />
                        <Button onClick={() => {
                            const name = (document.getElementById("route-name") as HTMLInputElement).value;
                            if (name) {
                                setData(prev => ({ ...prev, routes: [...prev.routes, { name, waypoints: [] }] }));
                                (document.getElementById("route-name") as HTMLInputElement).value = "";
                                message.info("Route added. Edit exported JSON to add waypoints to this route and re-import.");
                            } else {
                                message.error("Route name cannot be empty.");
                            }
                        }}>Add Route</Button>
                    </div>
                </div>

                <Title level={4} style={{marginTop: "20px"}}>Current Data (JSON)</Title>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </Content>
    );
}
