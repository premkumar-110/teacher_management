
# PRESIDIO – ROUND 2
## CONSOLE-BASED CRUD/BACKEND PROBLEM STATEMENTS

## Teacher Management Application


USER INTERFACE DESIGN : https://www.figma.com/file/Q9KLMvlVna64aREcOAB8oJ/Teacher-Management-UI-Design?type=design&node-id=0%3A1&mode=design&t=lqvV1UZjDRKA8FFM-1

FRONTEND : https://teacher-management-frontend.vercel.app/

BACKEND : https://teacher-management-backend.vercel.app/

End user features:
Landing/Home Page : 
 
 ![Screenshot 2023-11-19 130156](https://github.com/premkumar-110/teacher_management/assets/122764871/91ee360e-491d-4e76-874b-3f50bb5d46bd)
        
1. SHOW ALL TEACHERS

   - **Endpoint:** `GET /api/teachers/getTeachers`
   
   - **Description:** Retrieves a list of all teachers from the database.
   
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Array of teacher objects

              
![Screenshot 2023-11-19 130502](https://github.com/premkumar-110/teacher_management/assets/122764871/e3e7b2b1-4719-4fb4-b7c5-16d076a72ffb)

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


![Screenshot 2023-11-19 131100](https://github.com/premkumar-110/teacher_management/assets/122764871/3a908a38-306a-41ff-b95c-8b272badb821)

3. FILTER TEACHERS BASED ON CRITERIA

   **Endpoint:** `POST /api/teachers/filter`
   
   **Description:** Filters teachers based on specified criteria.
