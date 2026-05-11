# AUTH_NOTES.md

# JWT + Database Token Authentication Notes

This project implements two authentication mechanisms:

1. JWT authentication
2. Database-stored token authentication

---

# 1. Obtaining Credentials and Logging In

Users log in using their email and password.

Example request:

POST http://localhost:3000/api/auth/login-token

Request body:

{
  "email": "jaasol.ali@gmail.com",
  "password": "123456"
}

If credentials are valid, the server returns:

{
  "token": "random_generated_token"
}

The token is stored in the `auth_tokens` database table.

---

# 2. Using the Authentication Mechanism

Protected routes require an Authorization header.

Format:

Authorization: Bearer <token>

Example:

Authorization: Bearer abc123token

The server:

1. Reads the Authorization header
2. Extracts the token
3. Looks up the token in the database
4. Attaches the authenticated user to `req.user`

If the token is:

- missing → returns 401
- invalid → returns 401
- expired (optional) → returns 401

---

# 3. Protected Endpoints

Examples of protected routes:

POST http://localhost:3000/api/snippets
PUT  http://localhost:3000/api/snippets/2
DELETE http://localhost:3000/api/snippets/23

Only authenticated users can access them.

Additionally:

- all users can view snippets
- logged-in users can create snippets
- only snippet owners can delete their own snippets

Ownership is verified using:

snippet.user_id === req.user.id

---

# 4. Logging Out / Invalidating Access

Logout endpoint:

POST http://localhost:3000/api/auth/logout-token

The current token is deleted from the `auth_tokens` table.

After logout:

- the token becomes invalid
- protected endpoints return 401 Unauthorized

---

# 5. Error Handling

The authentication middleware distinguishes between:

- Missing token
- Invalid token
- Unauthorized access

Example responses:

401 Unauthorized
403 Forbidden

---

# 6. Swagger Authentication

Swagger UI stores the token locally after clicking "Authorize".

Even after logout, Swagger may still display the token visually.

However:

- the token is no longer valid in the database
- protected routes will reject it with 401 Unauthorized


# 7. Reflection

## SPA web app with many users
I would use JWT (ideally with OAuth2/OpenID Connect). It is stateless, scalable, and works well with APIs used by SPAs.

## Microservice-to-microservice communication
I would use service-to-service JWT. This is secure, scalable, and avoid database dependency.

## Internal admin tool (small team)
I would use simple database-stored token/session authentication. It is easy to implement, revoke, and maintain for small trusted teams.

## Why not the other mechanisms?
JWT is overkill for small internal tools. Database sessions/tokens do not scale well for SPAs or microservices. Each method should match the system size and architecture.

## Next security improvement
I would add refresh tokens with short-lived access tokens to improve security and reduce risk if a token is compromised.