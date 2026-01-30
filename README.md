# Transport Carbon Tracker App
Mobile App Repository URL: <https://github.com/AY2025-S2-C346/c346-003-ca2mobileapp-c346-003_team5_mobileapp>

A mobile application that allows users to track their daily transport activities and calculate the carbon emissions of each trip.
This app helps users visualize their carbon footprint and encourages sustainable transportation choices.

---

## What is this app about?

The Transport Carbon Tracker is developed as part of a team project.
It connects to a backend C346_CA2webservice (API) to retrieve and store trip data, ensuring that users’ transport logs persist across sessions and devices.

Users can add trips, edit or delete trips, filter and sort trips, and view a summary of their total carbon emissions.

---

## Notable features of the app

- User-friendly mobile interface optimized for readability

- Integration with a backend web service via RESTful API calls

- Ability to log trips with transport mode, distance, and carbon emissions

- Edit and delete individual trips

- Delete all trips with confirmation

- Filter trips by transport mode and sort by date or carbon emissions

- Summary view showing total carbon footprint

- Responsive empty state for users with no trips logged

- Error handling and input validation

---

## Backend Web Service

This app communicates with a backend web service using HTTP requests.  
The table below documents the available API routes used by the mobile application.

Web Service Primary URL: <https://c346-ca2webservice.onrender.com>

Web Service Repository URL: <https://github.com/24021479-ChuaXinfang/C346_CA2webservice.git>

### API Routes Documentation

| Route        | HTTP Method | Description | Request Body / Parameters |
|--------------|-------------|-------------|----------------------------|
| `/alltrips`  | GET         | Retrieves all trips | None |
| `/addtrip`   | POST        | Adds a new trip| JSON (mode, distance_km, trip_date, carbon_kg) |
| `/deletetrip/:id`     | DELETE         | Deletes a single trip | URL param |
| `/deletealltrips` | DELETE         | Deletes all trips | None |
| `/updatetrip/:id` | PUT| Updates an existing trip | URL param + JSON body |

---

## Screenshots of the mobile app

The screenshots below showcase the key screens of the mobile application.

**Home Screen**  
<img src="./screenshots/Home.png" alt="Home Screen" width="200"/>

**Add Trip Screen**  
<img src="./screenshots/Add.png" alt="Add Trip Screen" width="200"/>

**Edit Trip Screen**  
<img src="./screenshots/Edit.png" alt="Summary Screen" width="200"/>

**Summary Screen**  
<img src="./screenshots/Summary.png" alt="Summary Screen" width="200"/>


---

## Video walkthrough of the app

A short video demonstrating the features and flow of the application:  
[▶ Watch App Demo](./video/DemoVideo.mp4)

---

## Team Contributions

As this is a team project, each member’s role and contributions are documented below.

| Name                           | Responsibilities                                                                                                                                                                                    |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CHUA XINFANG [24021479]        | Implemented and Styled UI screens (Home.js) and component (SortFilterModal.js), Added navigation (Home), Developed RESTful API routes (/alltrips, /deletealltrips), Designed MySQL database schema. |
| LIN PIN YAN [24019715]         | Implemented and Styled UI screens (Summary.js), Added navigation (Summary), Developed RESTful API route (/alltrips).                                                                                |
| GLENDA TAN XIN NING [24021152] | Implemented and Styled UI screens (Edit.js), Added navigation (Edit), Developed RESTful API routes (/updatetrip/:id, /deletetrip/:id).                                                              |
| TAN ZHI SHAN [24035177]        | Implemented and Styled UI screens (Add.js), Added navigation (Add), Developed RESTful API route (/addtrip).                                                                 |
| ALL MEMBERS                    | Researched on project idea, Created project plan, Maintained documentation (README.md), Reviewed and Tested code, Managed version control.                                                          |

---
