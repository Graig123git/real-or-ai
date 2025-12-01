# CLINE_HANDBOOK_AUTH.md
## Real or AI? — Authentication Handoff (Email, Google, Apple)

This document provides Cline with everything required to implement **authentication** for the Real or AI? mobile app using **Email + Password**, **Google Login**, and **Apple Login**.  
Guest login and phone login are not included.

---

# 1. Authentication Methods (Final)

### ✓ Email + Password (Cognito User Pools)  
### ✓ Google Login (OAuth Provider)  
### ✓ Apple Login (OAuth Provider)  

All users **must be authenticated** to play the game.  
No anonymous or guest gameplay.

---

# 2. AWS Architecture

### Services Used
- Amazon **Cognito User Pool**
- Cognito **Hosted UI** for OAuth
- **AppSync** (JWT Auth)
- **Lambda** (validation, mutations)
- DynamoDB (User profiles)
- S3/CloudFront (media)
- Secure token storage on device

---

# 3. Mobile UI Requirements

## /auth/login
Buttons in this exact order:
1. Sign in with **Google**
2. Sign in with **Apple** (iOS only)
3. Sign in with **Email**
4. “Don’t have an account? Sign up”

## /auth/register
Fields:
- Name  
- Email  
- Password  
- Confirm Password  

Buttons:
- Create Account
- Already have an account? Login

## /auth/forgot-password
Input:
- Email  
Button:  
- Send Reset Link

---

# 4. Cognito Setup (Cline Must Build)

### User Pool: `RealOrAIUsers`
- Required attributes: `email`, `name`
- Password policy: **min 8 chars**
- Email verification: **ON**
- Refresh token validity: **30 days**

### OAuth Providers

#### Google  
Cline must configure:
- Google iOS Client ID  
- Google Android Client ID  
- Google Web Client ID (for Cognito Hosted UI)

#### Apple  
Cline must configure:
- Apple Service ID  
- Apple Private Key (.p8)  
- Apple Team ID  
- Apple Key ID  
- Redirect URLs to Cognito domain  

### App Client
```
Allowed callback URLs: <app-scheme>://auth
Allowed signout URLs: <app-scheme>://signout
Allowed OAuth flows: Authorization code
Allowed scopes: email, profile, openid
```

---

# 5. AppSync Auth Rules

All API access requires Cognito JWT:

```graphql
directive @auth(
  rules: [{ allow: private }]
) on OBJECT | FIELD_DEFINITION
```

No unauthenticated access.

---

# 6. DynamoDB User Schema

User is stored as:

**PK:** USER#<cognito-sub>  
**SK:** PROFILE

```json
{
  "pk": "USER#1234-5678",
  "sk": "PROFILE",
  "email": "test@gmail.com",
  "name": "Kay",
  "avatarUrl": null,
  "level": 1,
  "xp": 0,
  "coins": 0,
  "country": "CA",
  "createdAt": 1731500000000
}
```

---

# 7. Token Handling (Mobile Requirements)

### Stored in Secure Storage:
```
auth_id_token
auth_refresh_token
auth_access_token
```

### Behavior
- Auto-refresh tokens  
- Logout clears all secure entries  
- Expired tokens → silent refresh  
- If refresh fails → force sign out  

---

# 8. Post-Login Navigation

After successful login:
→ `/home`

App should load:
- User profile  
- Streak status  
- Daily challenge state  
- Leaderboard (daily)

---

# 9. Required Packages (Mobile)

```
expo-auth-session
expo-secure-store
amazon-cognito-identity-js
aws-amplify (Auth ONLY)
@react-native-google-signin/google-signin
expo-apple-authentication
```

---

# 10. Test Cases (Cline Must Validate)

### Email
- Create account  
- Login  
- Wrong password  
- Forgot password  
- Sign out  

### Google Login
- Success  
- Cancel flow  
- Invalid token  

### Apple Login
- Success  
- Cancel flow  
- Private relay email  

### Tokens
- Expired → refresh  
- Logout → secure storage cleared  

---

# 11. Folder Structure

```
/app/api/auth.ts
/app/state/authStore.ts
/app/components/auth/
/infra/lib/cognito-stack.ts
/docs/CLINE_HANDBOOK_AUTH.md
```

---

# 12. Final Cline Steps

1. Set up Cognito User Pool + Hosted UI  
2. Configure Google & Apple OAuth  
3. Build all authentication screens  
4. Implement secure token storage  
5. Connect Auth → AppSync  
6. Protect all APIs with Cognito  
7. Test login flows on iOS + Android  

---

This file contains everything Cline needs to begin implementing authentication.
