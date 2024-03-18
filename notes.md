<!-- Create project with a name --#proshop-- -->
<!-- Setup the front end environment using create-react-app -->
  1. npx create-react-app frontend
  2. Remove App.css, App.test.js, logo.svg and also clear codes inside App.js
  3. You can see a .git file which is the git repository and a .gitignore file inside the frontend folder. Using bash terminal you can see .git by typing 'ls -a' , delete the .git file using bash by typing 'rm rf .git'. Go to .gitignore and remove the slash before node_modules so that it can detect node_modules from all the folders including frontend and backend. Add .env to .gitignore file. Then put the .gitignore to the root of the project from frontend folder. And from the root of the project create a git repository by typing 'git init'.
  Now push this to the git repo by creating a new git repo
  from the terminal, 
   >> git add .
   >> git commit -m "initial commit"
   >> 
