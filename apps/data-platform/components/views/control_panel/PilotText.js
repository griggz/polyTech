const PilotText =
`
# HFC Tool: Pilot Guidance

## Goals: 
This pilot is intended to perform the following functions: 
- Test the overall functionality of the application.
- Gauge what additions (if any) can be added to the application.
- Fine tune backend engine of the application to better address the application's traffic and overall usage. 

## Background: 
The HFC Tool originated as an excel spreadsheet developed and maintained by the State of California. The HFC Tool Application was built to streamline data input, manage access, and increase analysis efficiency.

## Rolling Pilot:
To increase the availability of the application, a rolling pilot will begin on May 18th, 2020. This method of testing will enable users to actively test new features and bug fixes as they are released. Users will be able to read the new "release notes" as they are updated throughout the lifespan of the pilot. The pilot phase will end on August 1, 2020.

## Feedback: 
As users are interacting with the application, they are more than welcome to provide feedback. In the top right corner of the application's navigation bar, there is a "Contact Us" button. This button will create a modal window that users can use to provide detailed feedback regarding bugs, errors, or general thoughts about the application's features. 

## Existing Limitations:
- **Database Users**: The application database can only maintain 20 concurrent users. This amount is due to the web hosting database plan the application currently subscribes to. This threshold can be changed if it looks like this application requires more. 
- **Processing Power**: The web server itself is using an entry-level plan, meaning it has certain limitations on memory and processing types. So if after the pilot begins and we notice the server is running a bit too close to established limitations, we can increase it. 
- **Other Sever Limitations**:
  - 512 MB RAM │ 10 Process Types
  - Not currently scalable 

## Updates & Server Maintenance:
If updates exist, updates to the application's source code will be performed daily @ 6PM EST and 10PM EST. This event will temporarily put the website into "Maintenance Mode". When in "Maintenance Mode" the application will be unreachable.

## Features and Testing: 
As users interact with the application, the following functions must be thoroughly tested: 

### Dashboard
The dashboard is the landing page for all users who access the HFC Tool. The dashboard maintains three visualizations as well as two separate data tables. 

#### Testing Parameters
- **Line Chart**: Confirm the line chart at the top of the page fully loads, and tooltips appear. 
- **Sub Charts**: Confirm both sub-charts load and the hover actions work. If these visuals are not relevant or can be improved, please provide feedback. 
- **Data Tables**: There are two data tables at the bottom of the page. You can shift views of the data by selecting the  "Toggle Data Set" button in the top right portion of the table window. 
  - Ensure the export button exports the correct data set. 
  - Ensure you can add a new record if there is new data to add.
  - Ensure you can edit an existing record. 
  - Ensure you can search for existing records.

### Reports
The reports module is intended to provide an ability to create cuts of the data for different purposes. We are looking for recommendations on what would be the most useful reports for USCA personnel and State partners. These recommendations could potentially be built into the site as a report. 

#### Testing Parameters
- No current testing parameters

### Data Comparison Tool
This tool allows users to compare emissions & mitigation options by State and Year. 

#### Testing Parameters
- **Line Chart**: Ensure the top line chart loads and the hover functions show the appropriate tooltips
- **Data Table**: 
  - Ensure the data table shows the correct home State data.
  - Ensure the export data button exports the current data set. 
  - Ensure the "Reset Table" button resets the table back to its original state.
  - Ensure the Year dropdown changes the data in the table to the appropriate Year. 

- **Functions**: Ensure that the "State Addition" drop-down loads the new State's data into the table as well as the line chart at the top of the page. 

### Region Analysis
This tool provides end-users with an ability to display the data via Region. This application currently uses the [Census Bureau-designated regions and divisions](https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf) as the basis for bucketizing the data. 

#### Testing Parameters
- **Geo Chart**: Ensure the Geo Chart appears, and all hover functions appear. 
- **Geo Chart Functions**: 
  - Ensure the region toggle drop-down in the top right corner changes the data displayed on the geo visual correctly. 
  - Ensure the Year drop-down changes the data on the chart correctly. 
  - Ensure the Measurement drop-down changes the data correctly.
  - Ensure the reset data button changes the data correctly. 
- **Data Table**: The data table illustrates all data as it appears in the Geo Chart at the top of the page. **Modifying this data does not modify the data in the database, but rather reshapes the data table to suit the user's needs**. 
  - Ensure all data that is illustrated in the Geo Chart exists in the data table. 
  - Ensure data records can be removed. 
  - Ensure data records can be added. 
  - Ensure the download button exports the data correctly. 
  - Ensure the add button correctly appends data to the bottom of the data set. 
  - Ensure the search function works.
`

export default PilotText
