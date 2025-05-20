# 🔐 Secretly - Secure Credential Management

**Secretly** is a secure, team-oriented credential and secrets management platform built for developers and DevOps teams. It enables seamless sharing of API keys, tokens, and passwords inside organizations, with fine-grained access controls powered by Clerk and intelligent automation powered by AI.

Credentials are securely stored using [**Supabase Vault**](https://supabase.com/docs/guides/database/vault), a native encryption service that ensures sensitive data is protected at rest and only accessible with the proper permissions.

## 🌐 Live Demo

[👉 Try the live demo](https://secretly-lovat.vercel.app)

## 📸 Screenshots

<div align="center">
  <img src='https://secretly-lovat.vercel.app/images/login.png' width="100%" alt="Login" />
  <img src='https://secretly-lovat.vercel.app/images/select-org.png' width="100%" alt="Select org" />
  <img src='https://secretly-lovat.vercel.app/images/credentials-screen.png' width="100%" alt="Credentials Screen" />
  <img src='https://secretly-lovat.vercel.app/images/members.png' width="100%" alt="Members Screen" />
  <img src='https://secretly-lovat.vercel.app/images/invitations.png' width="100%" alt="Invitations Screen" />
  <img src='https://secretly-lovat.vercel.app/images/ai.png' width="100%" alt="AI Screen" />
</div>

## 🔐 Clerk Integration

Secretly deeply integrates Clerk to handle identity and access control. Here’s how Clerk is used:

### ✅ Authentication

- Sign up / sign in flow powered by Clerk prebuilt UI.
- Sessions and tokens managed securely.

### 👥 Organizations

- Users can create or join organizations (e.g., "Developers").
- Each organization is isolated with its own members and credentials.

### 🔑 Roles & Permissions

- Roles follow the format: `org:developer`, `org:admin`, etc.
- Permissions follow the format: `org:credentials:view`, `org:credentials:edit`, etc.
- Role and permission management is configured via the Clerk Dashboard and accessed programmatically through Clerk’s API.

### 📧 Inviting Members

- Owners can invite users to join their organization.
- Members join with limited or no access until assigned a role.

### 🔄 Switching Organizations

- Users can change organizations.
- Clerk context updates automatically to reflect the selected org.

## 🧠 AI Chat Bot Integration

Secretly integrates a custom chatbot that uses natural language to trigger actions via the Clerk API.

### Examples of AI Features

- Add an organization
- Show my profile
- List current organization members
- Chat-based role modification (e.g., "Change jhon.cena@gmail.com role to developer")