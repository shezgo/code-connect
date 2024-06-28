# CondeConnect Backend Server
Welcome to CodeConnect backend server. It is using express web framework and sequelize ORM!

## How to run
1. Rename .envexample file to .env and modifiy all values accordingly
2. Navigate to this folder 
3. Run following commands to install dependencies
```
npm install
```
4. Run following command to sync database if required
```
npm run sync
```
5. Run following command to start server
```
npm run start
```
6. Run following command to start the server in background
```
pm2 start index.js
```

Make sure the databse is running before starting or syncing !!