# VotePH API Documentation

## Base URL

```
http://{API_HOST}:{API_PORT}/api/v1
```

## Authentication

Most endpoints require authentication via headers:

- `apikey`: API key for service authentication
- `token`: JWT token for user authentication (obtained from login/register)

---

## Endpoints

### Home

#### Get API Status

```http
GET /api/v1/
```

**Headers:** None required

**Response:**

```json
{
  "message": "VotePH API is Running!",
  "controller": "Home"
}
```

---

### Account

#### Register User

```http
POST /api/v1/account
```

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "email": "user@example.com",
  "fullname": "John Doe",
  "password": "password123",
  "verifyPassword": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "token": "jwt_token_here"
  }
}
```

#### Login

```http
POST /api/v1/account/login
```

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "identifier": "user@example.com", // or VIN
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here"
  }
}
```

#### Request Password Reset

```http
POST /api/v1/account/reset
```

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "identifier": "user@example.com" // or VIN
}
```

**Response:**

```json
{
  "success": true,
  "message": "If this email exists, a password reset link has been sent.",
  "data": "otp_code_or_email_result"
}
```

#### Get User Profile

```http
GET /api/v1/account
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "vin": "VIN123456",
    "fullname": "John Doe",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile

```http
PATCH /api/v1/account
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "fullname": "Jane Doe",
  "email": "newemail@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "token": "new_jwt_token_here"
  }
}
```

---

### Election

#### Get Current Active Election

```http
GET /api/v1/election
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Response:**

```json
{
  "success": true,
  "election": {
    "electionId": 1,
    "title": "2024 National Elections",
    "startTime": "2024-01-01T00:00:00.000Z",
    "endTime": "2024-01-31T23:59:59.000Z",
    "status": "active"
  }
}
```

#### Get Election History

```http
GET /api/v1/election/history
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "electionId": 1,
      "title": "2024 National Elections",
      "startTime": "2024-01-01T00:00:00.000Z",
      "endTime": "2024-01-31T23:59:59.000Z",
      "status": "ended"
    }
  ]
}
```

#### Create Election

```http
POST /api/v1/election
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "title": "2024 National Elections",
  "startTime": "2024-01-01T00:00:00.000Z",
  "endTime": "2024-01-31T23:59:59.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "electionId": 1
}
```

#### End Election

```http
PATCH /api/v1/election
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "electionId": 1
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    /* MySQL result object */
  }
}
```

---

### Position

#### Get All Positions by Election

```http
GET /api/v1/position?electionId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `electionId` (required): Election ID

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "positionId": 1,
      "electionId": 1,
      "fullname": "President"
    },
    {
      "positionId": 2,
      "electionId": 1,
      "fullname": "Vice President"
    }
  ]
}
```

#### Get Position by ID

```http
GET /api/v1/position/:positionId
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Response:**

```json
{
  "success": true,
  "result": {
    "positionId": 1,
    "electionId": 1,
    "fullname": "President"
  }
}
```

#### Create Position

```http
POST /api/v1/position
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "electionId": 1,
  "fullname": "President"
}
```

**Response:**

```json
{
  "success": true,
  "positionId": 1
}
```

#### Update Position

```http
PATCH /api/v1/position
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "positionId": 1,
  "fullname": "Vice President"
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    /* MySQL result object */
  }
}
```

#### Delete Position

```http
DELETE /api/v1/position
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "positionId": 1
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    /* MySQL result object */
  }
}
```

---

### Candidate

#### Get All Candidates by Position

```http
GET /api/v1/candidate?positionId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `positionId` (required): Position ID

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "candidateId": 1,
      "positionId": 1,
      "fullname": "Juan Dela Cruz",
      "description": "Candidate description",
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

#### Get Candidate by ID

```http
GET /api/v1/candidate/:candidateId
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Response:**

```json
{
  "success": true,
  "result": {
    "candidateId": 1,
    "positionId": 1,
    "fullname": "Juan Dela Cruz",
    "description": "Candidate description",
    "imageUrl": "https://example.com/image.jpg"
  }
}
```

#### Create Candidate

```http
POST /api/v1/candidate
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "positionId": 1,
  "fullname": "Juan Dela Cruz",
  "description": "Candidate description",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "candidateId": 1
}
```

#### Update Candidate

```http
PATCH /api/v1/candidate
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "candidateId": 1,
  "fullname": "Juan Dela Cruz Updated",
  "description": "Updated description",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    /* MySQL result object */
  }
}
```

#### Delete Candidate

```http
DELETE /api/v1/candidate
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "candidateId": 1
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    /* MySQL result object */
  }
}
```

---

### Vote

#### Cast Vote (Batch)

```http
POST /api/v1/vote
```

**Headers:**

- `apikey`: API key
- `token`: JWT token
- `Content-Type: application/json`

**Body:**

```json
{
  "electionId": 1,
  "userId": 1,
  "votes": [
    {
      "positionId": 1,
      "candidateId": 1
    },
    {
      "positionId": 2,
      "candidateId": 3
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully submitted 2 vote(s)."
}
```

**Error Response (if already voted):**

```json
{
  "success": false,
  "message": "Already voted for position(s): 1, 2"
}
```

**Error Response (invalid request):**

```json
{
  "success": false,
  "message": "Invalid request. Provide electionId, userId, and votes array."
}
```

#### Get Tally (All Candidates)

```http
GET /api/v1/vote?electionId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `electionId` (required): Election ID

**Response:**

```json
{
  "success": true,
  "tally": [
    {
      "positionId": 1,
      "candidateId": 1,
      "voteCount": 150,
      "candidateName": "Juan Dela Cruz",
      "positionName": "President",
      "votePercentage": 75.0
    },
    {
      "positionId": 1,
      "candidateId": 2,
      "voteCount": 50,
      "candidateName": "Maria Santos",
      "positionName": "President",
      "votePercentage": 25.0
    }
  ]
}
```

#### Get Candidate Tally

```http
GET /api/v1/vote/candidate?electionId=1&candidateId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `electionId` (required): Election ID
- `candidateId` (required): Candidate ID

**Response:**

```json
{
  "success": true,
  "data": {
    "positionId": 1,
    "candidateId": 1,
    "voteCount": 150,
    "candidateName": "Juan Dela Cruz",
    "positionName": "President",
    "votePercentage": 75.0
  }
}
```

**Error Response (if not found):**

```json
{
  "success": false,
  "message": "No votes for candidate or candidate not found."
}
```

#### Check if User Has Voted for Position

```http
GET /api/v1/vote/hasVoted?electionId=1&positionId=1&userId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `electionId` (required): Election ID
- `positionId` (required): Position ID
- `userId` (required): User ID

**Response:**

```json
{
  "success": true,
  "voted": true
}
```

#### Check if User Has Voted in Election

```http
GET /api/v1/vote/hasVotedAll?electionId=1&userId=1
```

**Headers:**

- `apikey`: API key
- `token`: JWT token

**Query Parameters:**

- `electionId` (required): Election ID
- `userId` (required): User ID

**Response:**

```json
{
  "success": true,
  "voted": true
}
```

**Note:** This endpoint checks if the user has voted at least once in the entire election, not per position.

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- JWT tokens expire after 1 day
- Users can only vote once per position per election
- Vote percentages are calculated per position (total votes for that position)
- All authenticated endpoints require both `apikey` and `token` headers
