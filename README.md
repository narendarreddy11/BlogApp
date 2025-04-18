// project routes user.http### 
get http://localhost:4000/user-api/user


### user-regiter
post http://localhost:4000/user-api/user
Content-Type: application/json

{
    "userType":"user",
    "username":"ravi",
    "password":"ravi",
    "email":"ravi@gmail.com",
    "status":true
}


### user-login
post http://localhost:4000/user-api/login
    Content-Type: application/json

    {
        "userType":"user",
        "username":"ravi",
        "password":"ravi"
        
    }

### read articles of all users
get http://localhost:4000/user-api/articles


### writing comments
post http://localhost:4000/user-api/comment/1744569768
Content-Type: application/json

    {
       
        "username":"ravi",
       "comment":"amzing  content"
        
    }
 /// route for admin.http
 ### usersList
get http://localhost:4000/admin-api/usersList
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ0OTA3MzAxLCJleHAiOjE3NDQ5MTA5MDF9.2yuxp2Zxxu1Lkispk0ePVhQP0kQXbdFKezj_wBHOUUU

### authoList
get http://localhost:4000/admin-api/authorsList
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ0OTA3MzAxLCJleHAiOjE3NDQ5MTA5MDF9.2yuxp2Zxxu1Lkispk0ePVhQP0kQXbdFKezj_wBHOUUU


###  Article LIST
get http://localhost:4000/admin-api/AllArticles
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ0OTUyNzk3LCJleHAiOjE3NDQ5NTYzOTd9.ecX7iJDpvo5jj_jiqqXqtQ5cCIpiwhii3CbVDze0J4c


### admin login
post http://localhost:4000/admin-api/Adminlogin
Content-Type: application/json

{   
    "userType":"admin",
    "username":"admin",
    "password":"admin123"
}

###
put http://localhost:4000/admin-api/userblock
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ0OTYzOTY0LCJleHAiOjE3NDQ5Njc1NjR9.MJF3bGEitzshW-FlAixVsftSLtSOSB3kMRJ-ra1jCRA
Content-Type: application/json

{
    "username":"nan",
    "userType":"user"
}


###
put http://localhost:4000/admin-api/deletearticle
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ0OTY1MjIyLCJleHAiOjE3NDQ5Njg4MjJ9.NTfrsYUA5ft_MP32779wV0VfUfRIUdRfpW4Q3OYpXJI
Content-Type: application/json

{
  "articleId": 1744964171175
}


// routes for author.http


### register author
POST http://localhost:4000/author-api/user
Content-Type: application/json

{
    "userType": "author",
    "username": "ravikumar1",
    "password": "ravikumar",
    "email": "ravikumar@gmail.com",
    "status":true
}
### login author
POST http://localhost:4000/author-api/login
Content-Type: application/json

{
    "userType": "author",
    "username": "ravikumar1",
    "password": "ravikumar"
}

### add article by author
post http://localhost:4000/author-api/article
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhdmlrdW1hcjEiLCJpYXQiOjE3NDQ5MDAwODksImV4cCI6MTc0NDkwMzY4OX0.bq8nPt2SBDRL36dkSiXz_-NQ8Y8PmdJmN3bKYVadNfg

{
  "articleId": "1744569768",
  "title": "Exploring the Universe",
  "category": "Science",
  "content": " article dives into the mysteries of space exploration.",
  "dateOfCreation": "2025-04-13T18:42:48.725Z",
  "dateOfModification": "{{$datetime iso8601}}",
  "username": "ravikumar",
  "comments": [],
  "status": true
}


#### modify article
put http://localhost:4000/author-api/article
Content-Type: application/json

{
  "articleId": "1744569768",
  "title": "Exploring the Universe",
  "category": "Science",
  "content": "dives into the mysteries of space exploration.",
  "dateOfCreation": "2025-04-13T18:42:48.725Z",
  "dateOfModification": "{{$datetime iso8601}}",
  "username": "ravikumar",
  "comments": [],
  "status": true
}


### soft delet
put http://localhost:4000/author-api/article/1744569768
Content-Type: application/json
{
  "articleId": "1744569768",
  "title": "Exploring the Universe",
  "category": "Science",
  "content": "dives into the mysteries of space exploration.",
  "dateOfCreation": "2025-04-13T18:42:48.725Z",
  "dateOfModification": "{{$datetime iso8601}}",
  "username": "ravikumar",
  "comments": [],
  "status": true
}
### view articles 
get http://localhost:4000/author-api/articles/ravikumar
