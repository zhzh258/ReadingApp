# How to run
```bash
docker-compose up --build
```
- The frontend is running on :80
- The backend is running on :3001


# Database Schema


This document outlines the database schema.

## Collections

### User
Stores information about the users, including their login credentials and lists.

```json
{
  "_id": "ObjectId",
  "username": "String",
  "passwordHash": "String",
  "myLists": ["ObjectId(List)"]
}
```

### List
Contains the lists created by users, with references to books, ownership information, and public/private status.
```json
{
  "_id": "ObjectId",
  "ownerId": "ObjectId(User)",
  "title": "String",
  "introduction": "String",
  "isPublic": "Boolean",
  "stars": "Int32",
  "createdAt": "Date",
  "lastUpdatedAt": "Date",
  "books": [
    {
      "bookId": "ObjectId(Book)",
      "status": "String" // "reading" or "complete"
    }
  ]
}
```

### Book
TODO: If normalized, this collection will store unique book data, reducing duplication across lists.
```json
{
  "_id": "ObjectId",
  "title": "String",
  "author": "String",
  "description": "Mixed"
}
```

