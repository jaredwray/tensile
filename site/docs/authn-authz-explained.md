# Authentication (Authn) vs. Authorization (Authz)

Authentication (Authn) and Authorization (Authz) are distinct concepts in security, each serving a unique purpose. Here’s a breakdown of the difference:

---

## **Authentication (Authn)**

### **What it does**  
Authentication is the process of verifying the identity of a user, system, or device.

### **Key Questions It Answers**
- **Who are you?**
- **Are you really who you claim to be?**

### **How it works**
1. The user provides credentials (e.g., username and password, biometrics, or tokens).
2. The system checks if these credentials are valid.
3. Once verified, the user is authenticated and granted access to the system as an identified entity.

### **Examples**
- Logging in with a username and password.
- Using a fingerprint or facial recognition to unlock a phone.
- Providing a one-time passcode (OTP) sent to an email or phone.

---

## **Authorization (Authz)**

### **What it does**  
Authorization determines what resources and actions an authenticated user or system is allowed to access or perform.

### **Key Questions It Answers**
- **What can you do?**
- **Do you have permission to access this resource?**

### **How it works**
1. After authentication, the system checks the user’s permissions or roles.
2. Based on these permissions, the user is granted or denied access to specific resources or operations.

### **Examples**
- A logged-in user can access their own account information but not other users’ data.
- A manager can approve timesheets, but a regular employee cannot.
- Restricting API endpoints to only certain users based on their roles (e.g., admin vs. regular user).

---

## **Key Differences**

| **Aspect**          | **Authentication (Authn)**         | **Authorization (Authz)**           |
|----------------------|------------------------------------|-------------------------------------|
| **Purpose**          | Verifies identity                 | Determines access and permissions  |
| **Questions Answered**| "Who are you?"                   | "What are you allowed to do?"      |
| **Occurs When?**     | First step in security process     | After successful authentication    |
| **Focus**            | Identity verification             | Permission management              |
| **Result**           | Authenticated session             | Access control decision            |

---

## **Summary**

- **Authentication** ensures you are who you say you are.
- **Authorization** determines what you are allowed to do after that.
