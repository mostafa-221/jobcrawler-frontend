# Use cases front end: Searches on specific items

## MVP (Minimum viable product)

## Use case example

A user searches for vacancies that are within a range of 50 km of Almere. The vacancies must include the words: "Java" and "Postgres".

After filling in this information and pressing the search button, the returned vacancies all adhere to the following:
- Working location is 50 km or less away from Almere
- The keywords "Java" and "Postgres" are present in the skills and/or description texts
- List is sorted from lowest distance to highest
- Each returned vacancy in the list can be clicked to open the originating broker vacancy detail page

### Available search parameters
The following parameters are all optional. 
Sites are searched for any IT vacancy. This is implied by the URL that is used to find the vacancies for a certain site.
Within this URL, it is usually possible to limit the searches for IT vacancies only.

- Location
    - The work location the found vacancies are in (only if distance parameter is empty)
- Distance
    - A maximum distance around the given work location, which the found vacancies must be in (only if location parameter is filled)
- Keywords
    - Words that must be found in the data of the found vacancies

### Technical approach
The goal of the frontend is to show all vacancies the scrapers have collected, while applying user defined filters.

- Who will do the filtering, frontend or backend?
    - Filtering will be done in the backend. That way it is not needed to send all data to the frontend, but only the required data.
    Another reason is that most of us in this project want to gain more java knowledge. 
    Frontend work will be a bit easier if filtering is done backend.
    - At this moment `mat-table` is being used from the Material UI. Changing the table from `mat-table` to `datatables` gives any user additional possibilities to filter and search within the table.


#### Location filtering

##### Frontend
- Suggest locations to prevent typos?
    - Material UI makes it possible to add autocomplete to any input. Suggestions can be added in the typescript file in a string array. It is a possibility to hardcode all cities into the typescript file or we request those from the backend. More information about retrieving them from the backend can be found below. 

##### Backend
- How to filter on location?
    - If we simply want to retrieve vacancies based on a location (request with an empty distance field), we need to have a method/query that selects all vacanacies that match the entered location.

#### Distance filtering
- How to determine which vacancy locations lie within the range?
    - Using an API, either Google API or OpenStreetMap api comes with some limitations. If we want to be able to filter on distances we need to add an additional entity named, for example, city. This entity has got the following fields: `location`, `longitude`, `latitude`. The relationship between the vacancies entity and the city entity is a ManyToOne relationship as multiple vacancies can be located in the same city.
    - It is not a big deal to retrieve the longitude and latitude from a city using https://mapquest.com, which is using the OpenStreetMap api. On a monthly basis we can do 15.000 requests to this api for free.
    - When adding vacancies we need to check if a record of the location already exists in the city entity (including coordinates). If not, a record should be added including the coordinates. Vacancies that are being added with the same location can use the existing record from the city entity.
        - Using another api this way saves lots of requests and makes us less dependent from an external source.
    - To actually filter on distance, the coordinates from both the entered location and vacancy locations are needed. Using some maths makes it possible to calculate the distance in kilometers between these two.
    - Exisiting locations in the city entity can be retrieved using an api call, which can be used in the `suggest locations to prevent typos (frontend)`.
        - Keep in mind that when starting the application for the first time, the city entity will be pretty much empty and therefore not return a lot of locations for the suggest locations / autocomplete.

#### Keywords filtering
- What vacancy data fields to scan?
    - At this moment all data from a vacancy is stored in different fields. Some fields aren't going to be used, but the data might still be needed to scan. Therefor it is useful to store the entire vacancy body in a single field.
        - This makes scraping a page easier. As the vacancy body can look different per vacancy.
        - Scanning will be easier as there will be less fields to scan.
    Keywords will first look into the vacancy titles. After that it will look into the vacancy body to see if there is a match on the given keyword(s). Vacancies that match using the title field will be placed above vacancies that match using the body.
    
**_Need to discuss which fields we're actually going to show within our application to the user. If we use an icon/button to link to the original vacancy it might be a good idea to remove some fields and store the entire vacancy body in a single field._**

### Edge cases
- Sometimes the internet may not be accessible. 
   - What will be returned? 
   - Does the user get an intelligible error message?
   
 - Sometimes the database may not be accessible or connection cannot be made
   - What will be returned? 
   - Does the user get an intelligible error message?

- When the user does not fill in any parameters
    - All stored vacancies are returned

- When a stored vacancy is missing parameters (such as location for example)
    - Show it anyway, but on the bottom of the list with an indication that it lacks this certain search parameter

- When distance parameter is filled in but location is not
    - Block the search button and indicate the user that this is an invalid input and the location parameter must also be filled in.
    - [OPTIONAL] Block the distance input field when location is not filled

## Possible improvements

### Search parameters

- Hours
    - Weekly work hours indicated in the found vacancies
- Salary
    - Minimal amount of salary indicated in the found vacancies
    
### General

- Sorting
    - Being able to sort the found vacancies by their posting date or salary

- In case the internet is not accessible it might be an option to not clear the database but to return results from the database that are stored from previous scraping. (NB. This would imply an unfiltered search from the back end scrapers, all vacancies being stored in the database for each scraping session)



