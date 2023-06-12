# koyofes2023-reception-system-frontend
## Overview
2023年度こうよう祭の一般来場者受付システム
## Usage
1. Clone this repository and submodule.
```
git clone --recursive https://github.com/shun-harutaro/koyofes2023-reception-system-frontend.git
```
2. `npm install` to install dependencies.
3. Create .env.local and enter the base URL for backend server.
```
touch .env.local
echo "REACT_APP_API_URL=http://localhost:3001"
```
4. Start development server with `npm run all`
## Advanced Usage
- Start only frontend's development server: `npm run start`
- Start only backend's mock server: `npm run mockapi`
## Backend server
https://github.com/GoRuGoo/koyofes2023-reception-system-backend