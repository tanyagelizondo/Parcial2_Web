const mariadb = require('mariadb');
mariadb
 .createConnection({
   host: 'myHost.com', 
   ssl: true, 
   user: 'myUser', 
   password:'MyPwd', 
   database:'db_name'
 }).then(conn => {})