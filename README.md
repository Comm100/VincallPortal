# vincall.portal

vincall.portal is a frontend project mainly using react-admin and TypeScript. It builds the frontend of Vincall Portal. To customize it for your own use, you can refer to the following information and the documentation of react-admin.

Here is a brief description of the project directory:

```bash
src
  ├─Assets # images and icons
  ├─AuthProvider # authProvider of react-admin
  ├─Components # components
  ├─Components # dataProvider of react-admin
  ├─Runtime # runtime
  ├─Helpers # helpers, permissions and context providers
  ├─Layout # layout of UI
  ├─Pages # all pages of the project
  └─StyledComponents # styled React UI component.
```

# Initializing
To install dependencies, run below command in powershell:
  - npm install

# Running
To run project in local, run below command in powershell:
  - npm run start

If you want to customize your local server, you can modify file `.env.development`. By default, host is `localhost` and port is `3000`.

# Modifying configuration
1. Setting Up Proxy
  - You can modify file `setupProxy.js` to set up proxy.

2. Setting Up Domains For APIs
  - You can modify file `EnvConfig.js` to set up custom domain names.

3. Modifying APIs
  There are two recommended ways to modify APIs in vincall.portal. 
  - Modify `dataProvider.ts`, which is the way how you modify APIs in react-admin.
  - Use `customHttpClient` (path: src/DataProvider/customHttpClient.ts) to call APIs.