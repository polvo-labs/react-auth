# @polvo-labs/react-auth

This is a React module for Laravel's OAuth2 authentication.

It's written in Typescript and it provides:

* `<AuthProvider />` component. You can have multiples AuthProviders in your app;
* `useAuth()` hook;
* `<AuthConsumer>` component;
* `<Logout />` component;
* React Native support;
* `<Fetch />` component for doing common or authenticated requests;
* `<PrivateArea />` component for protecting components that requires authentication;
* `<GuestArea />` component for protecting components that requires unauthenticated users;
* and more...

## Installation

It depends on axios, so you need to install it too.

```
yarn add @polvo-labs/react-auth axios
```

```
npm install @polvo-labs/react-auth axios --save
```

You also need to install the storage adapter for each platform you want to use:

React for web (Local Storage):

```
yarn add @polvo-labs/react-auth-local-storage-adapter
```

React Native (Async Storage):

```
yarn add @polvo-labs/react-auth-async-storage-adapter
```

## Usage

### AuthProvider

Firstly, import the AuthProvider component and wrap your app with it.

```js
import React from 'react'
import { AuthProvider } from '@polvo-labs/react-auth'
import storageAdapter from '@polvo-labs/react-auth-local-storage-adapter' // for react-native, you must import the `@polvo-labs/react-auth-async-storage-adapter` module.

export default function App () {
  return (
    <AuthProvider
      storageAdapter={storageAdapter}
      config={{
        baseURL: 'http://localhost/your-api/public',
        clientId: 2,
        clientSecret: 'wvhxGLHv1yhn32ASASDsEp3adqwernREusX5Ig7DynFANhP3o',
        grantType: 'password',
        namespace: 'app' // this is important because you can have multiple authentications in your app
      }}
      handleUnauthorizedPrivateAccess={() => {
        // What you should do if an unauthenticated user access a component that requires authentication?
      }}
      handleUnauthorizedGuestAccess={() => {
        // What you should do if an authenticated user access a component that is only for guest (unauthenticated) users such as a login form?
      }}
      loader={<YourSpinner />}
    >
      <YourAppContentHere />
    </AuthProvider>
  )
}
```
