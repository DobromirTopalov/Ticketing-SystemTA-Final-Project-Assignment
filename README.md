# DRT - Ticketing System
**Angular2+ Project developed by team DR**

# Team DR
| Team member         | Username                                                                    |
| -------------       | :--------:                                                                  |
| Dobromir Topalov    | [**DobromirTopalov**](https://github.com/DobromirTopalov)                   |
| Rusi Rusev          | [**roruroru**](https://github.com/roruroru)                                 |

## Video:
   * https://www.youtube.com/watch?v=lHaZ3lQ1KJM&feature=youtu.be

## Guide to try it out
  * download the repository
  * run it in VS Code
  * open both directories in different terminals and don't forget to 'npm install'
  ### Run server
  * change dir to '.\server' folder, find 'database\config\config', and change 'development' settings or try to match the same
  * if you use different OS, change paths strings in 'database\models\index' , example: use correct slashes('\' or '/')
  * go to 'package.json' and look at 'scripts', there you will find commands, you might have some issues with paths again so try to change them if needed.
  * use commands in terminal in such order: go to 'database' folder and '../node_modules/.bin/sequelize db:migrate', as you are already in the correct folder use the next command '../node_modules/.bin/sequelize db:seed:all', then 'npm start' to run the server
  ### Run client
  * change dir to '.\client' and type 'ng serve -o' as a command in the terminal
  * wait a few moments
  * browser should open and app be ready to use, remember - you should start both the server and the angular app
  
## Project Description
Welcome to DRT - Ticketing System, your new ticketing system app! Register and you will have full access to our features - create teams, add members, create tickets and assign them to your colleagues. Our applications will help you be more productive and organized.
Start optimizing your tasks now - join us and enjoy!
