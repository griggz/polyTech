const AppVersionText =
`
# Changelog
## v 1.0.0

Released on July 31, 2020.

### Features
- Added new Bulk Upload feature, enabling users to upload data via .csv files - #70
- Added interactive line chart on the Dashboard to allow users to modify parameters without reloading the page - #86
- Added new interactive Mixed Bar/Line chart to dashboard depicting some growth statistics by State - #102
- Added new data edit dialog function so users can update data inline without leaving the page - #97
- All records can now be deleted by authenticated users - #97

### Enhancements
- Bulk Upload: Automated data checks to prevent incorrect data uploads and errors - #70
- Bulk Upload: Interactive table to enable users to modify data and correct errors without leaving the page - #70
- Bulk Upload: Users can upload large data sets 2k+ records - #70
- Polar Chart: Updated polar chart on dashboard to inlcude year scroll and scenario choice menu - #100

### Fixes
- API: Fixed issue where APIs were unreachable via the web by authenticated users - #103
- Region Analysis: Fixed issue where certain scenarios were not populating data to geo chart - #96

### Deprecations
None

### Breaking Changes
None

--------------------------

# Changelog
## v 0.2.3

Released on July 9, 2020.

### Enhancements
- Updated numeric values to use common styles (7,000 rather than 7000) - #87
- Updated value names to remove '_web' from all value names - #80
- Updated all forms to contain choice fields where possible - #88
- Updated Region data export to export ALL data as opposed to just displayed data - #91
- All Region Table data mirros whichever region is selected in the chart - #75
- Redesigned the data comparison tool to enable a more fluid comparison experience *
- Added Scenerio options for the data comparison chart - #89
- Added year options for the data comparison table - #89
- Data Comparison data export now exports ALL relevant data in csv or pdf
- Data Comparison State toggles are now more distinct and provide a higher number of states to compare *
- Added a new Logout feature to the left hand menu - #66
- All Data exports now provide the option to export csv or pdf *
- Enlarged Contact Us text field - #94
- Added new account retrieval API to increase application security *
- Updated various colors and styles *

### Fixes
- Fixed issue where region chart and data could not reset, added an "All" data choice - #93

### Deprecations
None

### Breaking Changes
None

--------------------------

# Changelog
## v 0.2.2

Released on June 11, 2020.

### Enhancements
- Added various tooltips to menu items, adding additional context - #46
- Replaced transition effects library to remove lag in render - #72

### Fixes
- Fixed issue where data exports were exporting the wrong dataset - #69
- Fixed issue where data toggle became out of sync - #69
- Reduced visual representation of numeric values from 4 decimal places to 2 for the line chart, radar chart and table - #72
- Added end_use data to dashboard - #71
- Built a custom label in order to add additoinal context to Y-axis for primary Line Chart used throughout the app - #78

### Deprecations
- Forms no longer have their own urls. All data edits/additions are handled on the same page with the same '/portal/' url.

### Breaking Changes
None

--------------------------

# Changelog
## v 0.2.1

Released on May 26, 2020.

### Enhancements
- Celery Task Manager Concurrency Optimized
- Generic State Report Sample Complete
- Landing Dashboard table embed without additional bordering component
- All task logs are now available in admin

### Fixes
- Email formatting (state lowercased) fix - #63
- Fixed material-tables not collapsing page size when data swap occurs - #64
- Fixed potential problem where celery worker was utilizing 80% Memory - #65

### Deprecations
None

### Breaking Changes
None

--------------------------

## v 0.2.0

Released on May 12, 2020.

### Features
- Material-UI Design Implementation
- Data Comparison Tool: Data tool to enable State comparisons
- Region Tool: Data tool to enable Region analysis
- Report Module established
- New Celery Task Manager
- Standardized Tables with Material-Tables
- Feedback Model and Form
- Production Server Ready
- Password Reset Flow
- Email Notifications

### Enhancements
- Login/Logout/Register Redesign to mirror the overall site theme
- Email User Backend Task to notify users when they register and are approved
- Email Admins Backend Task to notify admins when someone has requested access
- Data Calculations are now performed via celery task
- Added USCA and US as options to data drop downs
- Expanded API to create Region data set
- Added logout icon to navbar
- Added search to data tables

### Fixes
- Email formatting fix - #60
- Fix material-tables to highlighting items regardless of selection - #50

### Deprecations
None

### Breaking Changes
None
`

export default AppVersionText
