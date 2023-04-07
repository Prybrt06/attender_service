POST: http://localhost:3001/signin
{
    "userName":"-----",
    "password":"_____"
}

POST: http://localhost:3001/signup
{
    "name": "-----",
    "scholarId": "-----",
    "userName": "-----",
    "password": "-----"
}

GET: http://localhost:3001/subject

POST: http://localhost:3001/subject
{
    "subjectName": "______",
    "subjectCode": "______",
    "totalClasses": "______",
    "attendedClasses": "______"
}

PUT: http://localhost:3001/subject/:id
{
    "totalClasses": "_____",
    "attendedClasses": "_____"
}

DELETE: http://localhost:3001/subject/:id
