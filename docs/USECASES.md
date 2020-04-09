# Use cases front end: specifiek zoeken

## MVP (Minimum viable product)

## Use case example

A user searches for vacancies that are within a range of 50 km of Almere. The vacancies must include the words: "Java" and "Postgres".

After filling in this information and pressing the search button, the returned vacancies all adhere to the following:
- Working location is 50 km or less away from Almere
- The keywords "Java" and "Postgres" are present in the skills and/or description texts
- List is sorted from lowest distance to highest
- Each returned vacancy in the list can be clicked to open the originating broker vacancy detail page

### Available search parameters
- Location
    - The work location the found vacancies are in (only if distance parameter is empty)
- Distance
    - A maximum distance around the given work location, which the found vacancies must be in (only if location parameter is filled)
- Keywords
    - Words that must be found in the data of the found vacancies

### Technical approach
The goal of the frontend is to show all vacancies the scrapers have collected, while applying user defined filters.

**_- Who will do the filtering, frontend or backend?_**

Here the technical approach for every search parameter is explained:

#### Location filtering

##### Frontend
**_- Suggest locations to prevent typos?_**

##### Backend
**_- How to filter on location?_**

#### Distance filtering
**_- How to determine which vacancy locations lie within the range? (Google API?)_**

#### Keywords filtering
**_- What vacancy data fields to scan?_**

### Edge cases
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
