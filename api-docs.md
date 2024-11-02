{
  "openapi": "3.0.0",
  "paths": {
    "/": {
      "get": {
        "operationId": "AppController_getHello",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "App"
        ]
      }
    },
    "/users/whoami": {
      "get": {
        "operationId": "UsersController_whoami",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Successfully retrieved current user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "email": "test@example.com"
                    },
                    "summary": "Successfully retrieved current user"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "notAuthorized": {
                    "value": {
                      "message": "Unauthorized",
                      "error": "Unauthorized"
                    },
                    "summary": "You are not authorized to access this resource"
                  }
                }
              }
            }
          }
        },
        "summary": "get current user it is for testing",
        "tags": [
          "Users"
        ]
      }
    },
    "/users": {
      "get": {
        "operationId": "UsersController_getUsers",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Successfully retrieved users",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                },
                "examples": {
                  "success": {
                    "value": [
                      {
                        "id": 1,
                        "email": "test@example.com"
                      }
                    ],
                    "summary": "Successfully retrieved users"
                  }
                }
              }
            }
          }
        },
        "summary": "get all users",
        "tags": [
          "Users"
        ]
      }
    },
    "/users/{id}": {
      "get": {
        "operationId": "UsersController_getUser",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "email": "test@example.com"
                    },
                    "summary": "Successfully retrieved user"
                  }
                }
              }
            }
          },
          "404": {
            "description": "user not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "User not found",
                      "error": "Not Found"
                    },
                    "summary": "there is no user with this id"
                  }
                }
              }
            }
          }
        },
        "summary": "get specific user by id",
        "tags": [
          "Users"
        ]
      },
      "patch": {
        "operationId": "UsersController_updateUser",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updated user",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "email": "test123@test.com"
                    },
                    "summary": "Successfully updated user"
                  }
                }
              }
            }
          },
          "404": {
            "description": "user not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "User not found",
                      "error": "Not Found"
                    },
                    "summary": "there is no user with this id"
                  }
                }
              }
            }
          }
        },
        "summary": "update specific user by id",
        "tags": [
          "Users"
        ]
      },
      "delete": {
        "operationId": "UsersController_removeUser",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted user",
            "content": {
              "application/json": {
                "examples": {
                  "success": {
                    "value": {
                      "email": "test@example.com"
                    },
                    "summary": "Successfully deleted user"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "notAuthorized": {
                    "value": {
                      "message": "Unauthorized",
                      "error": "Unauthorized"
                    },
                    "summary": "You are not authorized to access this resource it is for admin"
                  }
                }
              }
            }
          },
          "404": {
            "description": "user not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "User not found",
                      "error": "Not Found"
                    },
                    "summary": "there is no user with this id"
                  }
                }
              }
            }
          }
        },
        "summary": "delete specific user by id",
        "tags": [
          "Users"
        ]
      }
    },
    "/users/{id}/reports": {
      "get": {
        "operationId": "UsersController_getUserReports",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved user reports",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserReportsDto"
                },
                "examples": {
                  "success": {
                    "value": [
                      {
                        "id": 1,
                        "price": 25000,
                        "make": "toyota",
                        "model": "camry",
                        "year": 2020,
                        "mileage": 50000,
                        "lng": -118,
                        "lat": 34
                      }
                    ],
                    "summary": "Successfully retrieved user reports"
                  }
                }
              }
            }
          },
          "404": {
            "description": "user not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "User not found",
                      "error": "Not Found"
                    },
                    "summary": "there is no user with this id"
                  }
                }
              }
            }
          }
        },
        "summary": "get reports of specific user by id",
        "tags": [
          "Users"
        ]
      }
    },
    "/reports": {
      "post": {
        "operationId": "ReportsController_createReport",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateReportDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "The report has been successfully created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReportDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "price": 25000,
                      "make": "toyota",
                      "model": "camry",
                      "year": 2020,
                      "mileage": 50000,
                      "lng": -118.2437,
                      "lat": 34.0522,
                      "user": {
                        "id": 1,
                        "email": "test@example.com"
                      },
                      "approved": false
                    },
                    "summary": "The report has been successfully created"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "unauthorized": {
                    "value": {
                      "message": "Unauthorized access",
                      "error": "Unauthorized"
                    },
                    "summary": "Unauthorized access"
                  }
                }
              }
            }
          }
        },
        "summary": "Create a new report",
        "tags": [
          "Reports"
        ]
      },
      "get": {
        "operationId": "ReportsController_findAll",
        "parameters": [
          {
            "name": "make",
            "required": false,
            "in": "query",
            "description": "The make of the car",
            "schema": {
              "example": "toyota",
              "type": "string"
            }
          },
          {
            "name": "model",
            "required": false,
            "in": "query",
            "description": "The model of the car",
            "schema": {
              "example": "camry",
              "type": "string"
            }
          },
          {
            "name": "year",
            "required": false,
            "in": "query",
            "description": "The year of the car",
            "schema": {
              "minimum": 1950,
              "maximum": 2024,
              "example": 2020,
              "type": "number"
            }
          },
          {
            "name": "mileage",
            "required": false,
            "in": "query",
            "description": "The mileage of the car",
            "schema": {
              "minimum": 0,
              "maximum": 1000000,
              "example": 50000,
              "type": "number"
            }
          },
          {
            "name": "lng",
            "required": false,
            "in": "query",
            "description": "The longitude of the car",
            "schema": {
              "example": -118.2437,
              "type": "number"
            }
          },
          {
            "name": "lat",
            "required": false,
            "in": "query",
            "description": "The latitude of the car",
            "schema": {
              "example": 34.0522,
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved reports",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReportDto"
                  }
                },
                "examples": {
                  "success": {
                    "value": [
                      {
                        "id": 1,
                        "price": 25000,
                        "make": "toyota",
                        "model": "camry",
                        "year": 2020,
                        "mileage": 50000,
                        "lng": -118.2437,
                        "lat": 34.0522,
                        "user": {
                          "id": 1,
                          "email": "test@example.com"
                        }
                      }
                    ],
                    "summary": "Successfully retrieved reports"
                  }
                }
              }
            }
          }
        },
        "summary": "Get all reports",
        "tags": [
          "Reports"
        ]
      }
    },
    "/reports/{id}": {
      "get": {
        "operationId": "ReportsController_findById",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved report",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReportDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "price": 25000,
                      "make": "toyota",
                      "model": "camry",
                      "year": 2020,
                      "mileage": 50000,
                      "lng": -118.2437,
                      "lat": 34.0522,
                      "user": {
                        "id": 1,
                        "email": "test@example.com"
                      }
                    },
                    "summary": "Successfully retrieved report"
                  }
                }
              }
            }
          },
          "404": {
            "description": "Report not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "Report not found",
                      "error": "Not Found"
                    },
                    "summary": "Report not found"
                  }
                }
              }
            }
          }
        },
        "summary": "Get a specific report by ID",
        "tags": [
          "Reports"
        ]
      },
      "patch": {
        "operationId": "ReportsController_updateReport",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateReportDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updated report",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReportDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "price": 25000,
                      "make": "toyota",
                      "model": "camry",
                      "year": 2020,
                      "mileage": 50000,
                      "lng": -118.2437,
                      "lat": 34.0522,
                      "user": {
                        "id": 1,
                        "email": "test@example.com"
                      },
                      "approved": false
                    },
                    "summary": "Successfully updated report"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "unauthorized": {
                    "value": {
                      "message": "Unauthorized access",
                      "error": "Unauthorized"
                    },
                    "summary": "Unauthorized access"
                  }
                }
              }
            }
          },
          "404": {
            "description": "Report not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "Report not found",
                      "error": "Not Found"
                    },
                    "summary": "Report not found"
                  }
                }
              }
            }
          }
        },
        "summary": "Update a specific report by ID",
        "tags": [
          "Reports"
        ]
      },
      "delete": {
        "operationId": "ReportsController_deleteReport",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted report",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReportDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "price": 25000,
                      "make": "toyota",
                      "model": "camry",
                      "year": 2020,
                      "mileage": 50000,
                      "lng": -118.2437,
                      "lat": 34.0522,
                      "user": {
                        "id": 1,
                        "email": "test@example.com"
                      },
                      "approved": false
                    },
                    "summary": "Successfully deleted report"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "unauthorized": {
                    "value": {
                      "message": "Unauthorized access",
                      "error": "Unauthorized"
                    },
                    "summary": "Unauthorized access"
                  }
                }
              }
            }
          },
          "404": {
            "description": "Report not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "Report not found",
                      "error": "Not Found"
                    },
                    "summary": "Report not found"
                  }
                }
              }
            }
          }
        },
        "summary": "Delete a specific report by ID",
        "tags": [
          "Reports"
        ]
      }
    },
    "/reports/{id}/approve": {
      "patch": {
        "operationId": "ReportsController_approveReport",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "number"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApproveReportDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully approved report",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReportDto"
                },
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "price": 25000,
                      "make": "toyota",
                      "model": "camry",
                      "year": 2020,
                      "mileage": 50000,
                      "lng": -118.2437,
                      "lat": 34.0522,
                      "user": {
                        "id": 1,
                        "email": "test@test.com"
                      },
                      "approved": true
                    },
                    "summary": "Successfully approved report"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "examples": {
                  "unauthorized": {
                    "value": {
                      "message": "Unauthorized access",
                      "error": "Unauthorized"
                    },
                    "summary": "Unauthorized access"
                  }
                }
              }
            }
          },
          "404": {
            "description": "Report not found",
            "content": {
              "application/json": {
                "examples": {
                  "notFound": {
                    "value": {
                      "message": "Report not found",
                      "error": "Not Found"
                    },
                    "summary": "Report not found"
                  }
                }
              }
            }
          }
        },
        "summary": "Approve a specific report by ID",
        "tags": [
          "Reports"
        ]
      }
    },
    "/auth/signup": {
      "post": {
        "operationId": "AuthController_createUser",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "the user has successfully created",
            "content": {
              "application/json": {
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "email": "test@test.com"
                    },
                    "summary": "The user has been successfully created"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Email already in use",
            "content": {
              "application/json": {
                "examples": {
                  "emailInUse": {
                    "value": {
                      "message": "Email already in use",
                      "error": "Bad Request"
                    },
                    "summary": "The email is already in use"
                  }
                }
              }
            }
          }
        },
        "summary": "Create a new user",
        "tags": [
          "Auth"
        ]
      }
    },
    "/auth/signin": {
      "post": {
        "operationId": "AuthController_signIn",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successfully signed in",
            "content": {
              "application/json": {
                "examples": {
                  "success": {
                    "value": {
                      "id": 1,
                      "email": "test@test.com"
                    },
                    "summary": "Successfully signed in"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad password",
            "content": {
              "application/json": {
                "examples": {
                  "badPassword": {
                    "value": {
                      "message": "Bad password",
                      "error": "Bad Request"
                    },
                    "summary": "The password is incorrect"
                  }
                }
              }
            }
          }
        },
        "summary": "Sign in",
        "tags": [
          "Auth"
        ]
      }
    },
    "/auth/signout": {
      "post": {
        "operationId": "AuthController_signOut",
        "parameters": [],
        "responses": {
          "201": {
            "description": "Successfully signed out"
          }
        },
        "summary": "Sign out",
        "tags": [
          "Auth"
        ]
      }
    }
  },
  "info": {
    "title": "Used Car Pricing API",
    "description": "",
    "version": "1.0",
    "contact": {}
  },
  "tags": [],
  "servers": [
    {
      "url": "http://localhost:3000/",
      "description": "Local environment"
    },
    {
      "url": "https://production.yourapi.com/",
      "description": "Production"
    }
  ],
  "components": {
    "schemas": {
      "UserDto": {
        "type": "object",
        "properties": {}
      },
      "UserReportsDto": {
        "type": "object",
        "properties": {}
      },
      "UpdateUserDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "example": "test123@test.com"
          },
          "password": {
            "type": "string",
            "example": "secret"
          }
        }
      },
      "CreateReportDto": {
        "type": "object",
        "properties": {
          "price": {
            "type": "number",
            "description": "The price of the car",
            "example": 25000,
            "minimum": 0,
            "maximum": 1000000
          },
          "make": {
            "type": "string",
            "description": "The make of the car",
            "example": "toyota"
          },
          "model": {
            "type": "string",
            "description": "The model of the car",
            "example": "camry"
          },
          "year": {
            "type": "number",
            "description": "The year of the car",
            "example": 2020,
            "minimum": 1950,
            "maximum": 2024
          },
          "mileage": {
            "type": "number",
            "description": "The mileage of the car",
            "example": 50000,
            "minimum": 0,
            "maximum": 1000000
          },
          "lng": {
            "type": "number",
            "description": "The longitude of the car",
            "example": -118.2437
          },
          "lat": {
            "type": "number",
            "description": "The latitude of the car",
            "example": 34.0522
          }
        },
        "required": [
          "price",
          "make",
          "model",
          "year",
          "mileage",
          "lng",
          "lat"
        ]
      },
      "ReportDto": {
        "type": "object",
        "properties": {}
      },
      "UpdateReportDto": {
        "type": "object",
        "properties": {
          "price": {
            "type": "number",
            "description": "The price of the car",
            "example": 25000,
            "minimum": 0,
            "maximum": 1000000
          },
          "make": {
            "type": "string",
            "description": "The make of the car",
            "example": "toyota"
          },
          "model": {
            "type": "string",
            "description": "The model of the car",
            "example": "camry"
          },
          "year": {
            "type": "number",
            "description": "The year of the car",
            "example": 2020,
            "minimum": 1950,
            "maximum": 2024
          },
          "mileage": {
            "type": "number",
            "description": "The mileage of the car",
            "example": 50000,
            "minimum": 0,
            "maximum": 1000000
          },
          "lng": {
            "type": "number",
            "description": "The longitude of the car",
            "example": -118.2437
          },
          "lat": {
            "type": "number",
            "description": "The latitude of the car",
            "example": 34.0522
          }
        }
      },
      "ApproveReportDto": {
        "type": "object",
        "properties": {
          "approved": {
            "type": "boolean",
            "description": "Approve or reject the report",
            "example": true
          }
        },
        "required": [
          "approved"
        ]
      },
      "CreateUserDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "example": "test@test.com"
          },
          "password": {
            "type": "string",
            "example": "1234578910"
          }
        },
        "required": [
          "email",
          "password"
        ]
      }
    }
  }
}
