
# PRESIDIO – ROUND 2
## CONSOLE-BASED CRUD/BACKEND

## Teacher Management Application


USER INTERFACE DESIGN : https://www.figma.com/file/Q9KLMvlVna64aREcOAB8oJ/Teacher-Management-UI-Design?type=design&node-id=0%3A1&mode=design&t=lqvV1UZjDRKA8FFM-1

FRONTEND : https://teacher-management-frontend.vercel.app/

BACKEND : https://teacher-management-backend.vercel.app/

End user features:
Landing/Home Page : 

![Screenshot_2023-11-20-07-25-19-21_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/premkumar-110/teacher_management/assets/122764871/3f416da0-03bd-43a1-be03-02ef88a8c2e8)
        
1. SHOW ALL TEACHERS

   - **Endpoint:** `GET /api/teachers/getTeachers`
   
   - **Description:** Retrieves a list of all teachers from the database.
   
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Array of teacher objects

2. ADD A TEACHER

   **Endpoint:** `POST /api/teachers/addTeacher`
   
   **Description:** Adds a new teacher to the system.
   
   **Request:**
     - **Body:** JSON object with the following properties:
       - `FirstName` (String): First name of the teacher.
       - `Lastname` (String): Last name of the teacher.
       - `age` (Number): Age of the teacher.
       - `dateOfBirth` (String): Date of birth of the teacher.
       - `Monday Classes` (Number): classes on Monday the teacher teaches.
       - `Tuesday Classes` (Number): classes on Tuesday the teacher teaches.
       - `Wednesday Classes` (Number): classes on Wednesday the teacher teaches.
       - `Thursday Classes` (Number): classes on Thursday the teacher teaches.
       - `Friday Classes` (Number): classes on Friday the teacher teaches.
   
   **Response:**
     - **Status Code:** 201 Created
     - **Body:** JSON object with the added teacher's information.


3. FILTER TEACHERS BASED ON CRITERIA

   **Endpoint:** `POST /api/teachers/filter`
   
   **Description:** Filters teachers based on specified criteria.
   
   **Request:**
     - **Body:** JSON object with the following properties:
       - `ageRange` (Number): Age to filter by. Set to -1 if not filtering by age.
       - `classRange` (Number): Number of classes to filter by. Set to -1 if not filtering by classes.
       - `ageFilters` (Array of Strings): Age ranges for additional filtering.
       - `classFilters` (Array of Strings): Class ranges for additional filtering.
   
   **Response:**
     - **Status Code:** 200 OK
     - **Body:** Array of filtered teacher objects

4. SEARCH FOR A TEACHER

   **Endpoint:** `POST /api/teachers/search`
   
   **Description:** Searches for teachers based on a provided search value.
   
   **Request:**
     - **Body:** JSON object with the following property:
       - `searchValue` (String): Value to search for in teacher names.
   
   **Response:**
     - **Status Code:** 200 OK
     - **Body:** Array of teacher objects that match the search criteria.

5. UPDATE A TEACHER'S RECORD

   **Endpoint:** `PUT /api/teachers/update/id`
   
   **Description:** Updates the information of a specific teacher.
   
   **Request:**
     - **Params:** `id` (String) - The ID of the teacher to update.
     - **Body:** JSON object with the properties to update.
   
   **Response:**
     - **Status Code:** 200 OK
     - **Body:** JSON object with the updated teacher's information.

6. DELETE A TEACHER

   **Endpoint:** `DELETE /api/teachers/delete/id`
   
   **Description:** Deletes a specific teacher from the system.
   
   **Request:**
     - **Params:** `id` (String) - The ID of the teacher to delete.
   
   **Response:**
     - **Status Code:** 200 OK
     - **Body:** JSON object with a success message.
