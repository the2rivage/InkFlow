# InkFlow — Blog Application using React

A full-featured blog platform built with React, Redux Toolkit, Appwrite (BaaS), and Tailwind CSS. Users can sign up, log in, create posts with rich text content, upload images, and manage their own posts.

---
<img width="1352" height="595" alt="image" src="https://github.com/user-attachments/assets/5eca241b-a503-4876-b01c-4ce2be75e75d" />


## Live Demo & Repository

- **Live Application**: [https://inkflow-black.vercel.app](https://inkflow-black.vercel.app)
- **GitHub Repository**: [https://github.com/the2rivage/InkFlow](https://github.com/the2rivage/InkFlow)

---

## Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit
- **Backend / Database / Storage**: Appwrite (Backend as a Service)
- **Styling**: Tailwind CSS (with dark mode via `class` strategy)
- **Routing**: React Router v6
- **Rich Text Editor**: TinyMCE (via `react-hook-form` + `RTE` component)
- **Form Handling**: React Hook Form

---

## Project Structure

```
src/
├── appwrite/
│   ├── auth.js          # AuthService class (login, signup, logout)
│   └── config.js        # Service class (posts, files)
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── PostCard.jsx
│   ├── PostForm.jsx
│   ├── AuthLayout.jsx   # Route protection wrapper
│   ├── LogoutBtn.jsx
│   ├── ToggleButton.jsx
│   ├── RTE.jsx          # TinyMCE rich text editor
│   ├── Input.jsx
│   └── Select.jsx
├── pages/
│   ├── Home.jsx
│   ├── AllPosts.jsx
│   ├── Post.jsx         # Single post view
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── store/
│   ├── store.js         # Redux store
│   ├── authSlice.js     # Auth state
│   └── themeSlice.js    # Theme state
├── App.jsx
└── main.jsx
```

---

## Application Flow
<img width="2816" height="1536" alt="Gemini_Generated_Image_87v9tr87v9tr87v9" src="https://github.com/user-attachments/assets/6684947c-b109-41ae-a4dd-006662fa2345" />

```
main.jsx
│
├── Redux Provider (store)
│   ├── authSlice  → { status: bool, userData: object }
│   └── themeSlice → { themeMode: "light" | "dark" }
│
└── RouterProvider
    └── App (root layout)
        ├── App.jsx loads → calls getCurrUser() on mount
        │   ├── if user found → dispatch(login(userData))
        │   └── if not found → dispatch(logout())
        │
        ├── <Header />  (sticky, shows nav based on authStatus)
        ├── <Outlet />  (renders current route's page)
        └── <Footer />
```

### Route Map

```
/                  → Home          (public)
/login             → Login         (AuthLayout authentication=false)
/signup            → Signup        (AuthLayout authentication=false)
/all-posts         → AllPosts      (AuthLayout authentication=true)
/add-post          → AddPost       (AuthLayout authentication=true)
/edit-post/:slug   → EditPost      (AuthLayout authentication=true)
/post/:slug        → Post          (public)
```

---

## Appwrite — Backend as a Service

Appwrite is a self-hosted backend platform that provides a database, file storage, and user authentication out of the box. Instead of building your own server and APIs, Appwrite gives you ready-made SDKs to interact with these services directly from the frontend.

In this project, Appwrite handles three things:
- **Authentication** — sign up, log in, log out, get current user
- **Database** — store and retrieve blog posts
- **Storage** — upload, delete, and preview post images

### Why Use Classes for Appwrite Configuration?

Both `auth.js` and `config.js` use JavaScript classes (`AuthService` and `Service`). Here is why this is the right approach:

**1. Single client instance (constructor pattern)**

The Appwrite `Client` object needs to be configured once with your endpoint URL and project ID. If you just exported plain functions, you would have to configure the client inside every function, which means repeated setup code. By putting the setup inside a `constructor`, it runs exactly once when the class is instantiated.

```js
constructor() {
  this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
  this.account = new Account(this.client);
}
```

**2. Encapsulation — related methods stay together**

All authentication actions (login, logout, createAccount, getCurrUser) live inside one `AuthService` class. All post and file actions live inside one `Service` class. This makes the code organized and easy to find.

**3. Single exported instance**

At the bottom of each file, one instance is created and exported:

```js
const authService = new AuthService();
export default authService;
```

This means the same configured client is reused everywhere in the app. You import `authService` in any component and call its methods without any extra setup.

---

## Auth Service (`appwrite/auth.js`)

### `createAccount({ email, password, name })`
Creates a new Appwrite user account using `ID.unique()` to generate a unique user ID. If the account is created successfully, it immediately calls `this.login()` so the user is logged in right away without a separate step.

### `login({ email, password })`
Creates an email/password session using Appwrite's `createEmailPasswordSession`. Returns a session object on success.

### `getCurrUser()`
Calls `this.account.get()` which returns the currently active user's data from Appwrite. This is called on app startup inside `App.jsx` to check if a user is already logged in (from a previous session stored in the browser).

### `logout()`
Calls `this.account.deleteSessions()` which deletes ALL active sessions for the current user, logging them out on all devices.

---

## Post & File Service (`appwrite/config.js`)

### `createPost({ title, slug, content, featuredImage, status, userID, username })`
Creates a new row in the Appwrite database table. The `slug` (auto-generated from the title) is used as the `rowId`, which means it also acts as the unique identifier for each post.

### `updatePost(slug, { title, content, featuredImage, status })`
Updates an existing row by its slug. Note: `userID` and `username` are not updated — only content fields.

### `deletePost(slug)`
Deletes the database row by slug. Returns `true` on success and `false` on failure.

### `getPost(slug)`
Fetches a single post by its slug (rowId).

### `listPosts(queries)`
Fetches all posts matching the query. By default, it only returns posts where `status === "active"` using `Query.equal("status", "active")`. Inactive posts are hidden from the public listing.

### `uploadFile(file)`
Uploads an image to the Appwrite storage bucket and returns the file object (including its `$id`). The `$id` is then saved into the post as `featuredImage` so it can be retrieved later.

### `deleteFile(id)`
Deletes a file from the storage bucket by file ID.

### `getFilePreview(id)`
Returns a direct URL to view/preview the file. This URL is used directly as the `src` of `<img>` tags throughout the app.

---

## Redux — State Management

Redux Toolkit is used to manage two pieces of global state: authentication and theme.

### Why Redux?

When a user logs in, multiple components need to know about it simultaneously — the Header (to show/hide nav links), AuthLayout (to allow/block routes), Post (to show Edit/Delete buttons), and so on. Passing this information through props would be deeply nested and messy. Redux puts it in a global store that any component can read from directly.

### `authSlice.js`

```
State shape:
{
  status: false,      ← is the user logged in?
  userData: null      ← the Appwrite user object (has $id, name, email, etc.)
}
```

**`login` action** — sets `status: true` and stores the user object in `userData`. Called from `App.jsx` on startup (if session exists) and from `Login`/`Signup` pages after successful authentication.

**`logout` action** — resets `status: false` and `userData: null`. Called from `LogoutBtn` after Appwrite session is deleted.

### `themeSlice.js`

```
State shape:
{
  themeMode: "light"   ← "light" or "dark"
}
```

**`light` action** — sets `themeMode: "light"`
**`dark` action** — sets `themeMode: "dark"`

The `ToggleButton` component dispatches these actions when clicked. A `useEffect` inside `ToggleButton` watches `themeMode` and adds/removes the `dark` class on the `<html>` element, which activates Tailwind's `dark:` variant classes across the entire app.

```js
useEffect(() => {
  document.querySelector("html").classList.remove("light", "dark");
  document.querySelector("html").classList.add(themeMode);
}, [themeMode]);
```

### `useSelector` hook

`useSelector` reads values out of the Redux store inside any component:

```js
const authStatus = useSelector((state) => state.auth.status);
const themeMode = useSelector((state) => state.theme.themeMode);
```

When the store value changes, React automatically re-renders any component using `useSelector` with that value.

### `useDispatch` hook

`useDispatch` gives you the `dispatch` function, which is how you trigger Redux actions:

```js
const dispatch = useDispatch();
dispatch(login(userData));   // updates Redux store
dispatch(dark());            // switches theme
```

---

## AuthLayout (Route Protection) — Complete Explanation

`AuthLayout` (also called `Protected` in the code) is a wrapper component that controls access to routes based on whether the user is logged in or not.

### The Component

```jsx
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
```

### The `authentication` Prop

This prop is a boolean that describes what kind of route this is:

- `authentication={true}` — this is a **protected route** (requires login)
- `authentication={false}` — this is a **guest-only route** (only for logged-out users)

### How the Logic Works

The `useEffect` runs whenever `authStatus` changes and checks two conditions:

**Condition 1: `authentication && authStatus !== authentication`**

This fires when:
- The route requires login (`authentication = true`)
- AND the user is NOT logged in (`authStatus = false`)
- `true && false !== true` → `true && true` → redirect to `/login`

In plain English: "This page needs a logged-in user, but there isn't one. Send them to login."

**Condition 2: `!authentication && authStatus !== authentication`**

This fires when:
- The route is guest-only (`authentication = false`)
- AND the user IS logged in (`authStatus = true`)
- `!false && true !== false` → `true && true` → redirect to `/`

In plain English: "This page is only for logged-out users (like login/signup), but the user is already logged in. Send them home."

### The `loader` State

There is a brief moment when the app starts where `authStatus` hasn't been determined yet (it starts as `false` by default while `App.jsx` is fetching the current user from Appwrite). Without the loader, a logged-in user visiting `/all-posts` on a fresh page load would be briefly redirected to `/login` before the auth check completes.

The loader starts as `true` and shows a loading state. After the `useEffect` runs (which happens after the auth status is known), it sets `loader` to `false` and renders the children.

### Usage in `main.jsx`

```jsx
// Protected route — user must be logged in
{ path: "/all-posts", element: (
  <AuthLayout authentication={true}>
    <AllPosts />
  </AuthLayout>
)}

// Guest-only route — user must NOT be logged in
{ path: "/login", element: (
  <AuthLayout authentication={false}>
    <Login />
  </AuthLayout>
)}
```

### Flow Diagram

```
User visits /all-posts
      │
      ▼
AuthLayout renders (loader = true → shows "Loading...")
      │
      ▼
useEffect runs
      │
      ├── authStatus = true (logged in)?
      │     └── authentication matches → render <AllPosts />
      │
      └── authStatus = false (not logged in)?
            └── authentication doesn't match → navigate("/login")
```

---

## PostForm — How It Works

`PostForm` is used for both creating and editing posts. It receives a `post` prop — if `post` exists, it's in edit mode; if not, it's in create mode.

### Slug Auto-Generation

The slug is the unique URL identifier for each post (e.g., `my-first-post`). It is automatically generated from the title using the `slugTransform` function wrapped in `useCallback`:

```js
const slugTransform = useCallback((value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/[^a-z0-9-]/g, "") // remove special characters
    .replace(/-+/g, "-");       // collapse multiple hyphens
}, []);
```

A `watch` subscription listens for changes to the `title` field and pipes it through `slugTransform`, then updates the `slug` field automatically:

```js
const subscription = watch((value, { name }) => {
  if (name === "title") {
    setValue("slug", slugTransform(value.title));
  }
});
```

The slug input is `readOnly` — users cannot type in it directly.

### Submit Flow

**Create mode (no `post` prop):**
1. Upload image to Appwrite storage → get back `file.$id`
2. Save `file.$id` as `featuredImage` in the data
3. Call `createPost()` with all form data + `userID` + `username`
4. Navigate to the new post's page on success

**Edit mode (`post` prop exists):**
1. If a new image was selected, upload it and delete the old one
2. Call `updatePost()` with changed fields
3. Navigate to the updated post's page on success

### `useCallback` Hook

`useCallback` memoizes a function so it is not recreated on every render. `slugTransform` is wrapped in `useCallback` because it is used inside a `useEffect` dependency array — without memoization, a new function reference would be created on every render, causing the effect to re-run infinitely.

### `useForm` and `watch`

`useForm` from React Hook Form manages all form state, validation, and submission without requiring controlled `useState` for each field. `watch` creates a real-time subscription to field value changes, which is how the slug stays in sync with the title.

---

## Dark Mode Implementation

Tailwind is configured with `darkMode: 'class'` in `tailwind.config.js`. This means dark mode is activated by adding the `dark` class to the `<html>` element.

```
User clicks ToggleButton
      │
      ▼
dispatch(dark()) or dispatch(light())
      │
      ▼
themeSlice updates themeMode in Redux store
      │
      ▼
useSelector in ToggleButton re-renders
      │
      ▼
useEffect runs → classList.add("dark") or classList.add("light") on <html>
      │
      ▼
All Tailwind dark: classes activate across the entire app
```

Every component uses paired classes like:
```
bg-white dark:bg-gray-900
text-gray-900 dark:text-gray-100
border-gray-200 dark:border-gray-700
```

---

## Environment Variables

Create a `.env` file in the root of the project:

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

These are accessed in `conf/conf.js` and passed into the Appwrite service classes.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Key Concepts Summary

| Concept | What it does in this project |
|---|---|
| `AuthService` class | Wraps Appwrite auth SDK, configured once, reused everywhere |
| `Service` class | Wraps Appwrite database + storage SDK |
| `authSlice` | Stores login status and user data globally |
| `themeSlice` | Stores light/dark mode preference globally |
| `AuthLayout` | Redirects users based on login status before rendering a page |
| `useSelector` | Reads values from Redux store inside components |
| `useDispatch` | Sends actions to update Redux store |
| `useCallback` | Memoizes functions to prevent unnecessary re-renders |
| `watch` (RHF) | Subscribes to real-time form field changes |
| `slug` | Auto-generated URL-safe string from the post title, used as the post's database row ID |
| `getFilePreview` | Returns a direct Appwrite URL for an image, used as `<img src>` |
