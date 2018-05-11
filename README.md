# surat-wasiat
simple uploader client with authorisation server using token

### POST /request-token

Create new user or return created user by email

required data
* email
* name

return data 
 * {User} 


### GET /api/image

Get all data of uploaded images

required data
* authorization (header)

return data
* [Image (populated `User`)]

### POST /api

Create and upload new Image or return created Image, but with new uploaded image

required data
* authorization (header)

return data
* Image (populated `User`)