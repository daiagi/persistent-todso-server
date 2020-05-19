### Read - GET
- **/api/todos**
    * 200 returns todo[] (can be empty)
- **/api/todos/:todoId**
    * 200 return single todo
    * 404 - not found
    * 401 -unauthorized
### Create - POST
- **/api/todos/**
    - 201 returns new todoID
- **/api/todos/:todoId**
    - 405 not allowed
  
### Update - PUT
- **/api/todos/**
    - 405 not allowed
- **/api/todos/:todoId**
    - *pre op* - make sure data from user has all needed fields (title, content,...)
        - 400 - bad request if not all fields are present
    - 200 - update todo (replaces all todo attributes)
    - 404 - todo not found
    - 401 -unauthorized

### Delete - DELETE
- **/api/todos/**
    - 405 not allowed
- **/api/todos/:todoId**
    - 200 - delete todo
    - 404 - todo not found
    - 401 -unauthorized
