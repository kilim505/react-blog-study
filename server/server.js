//
import app from './app';
import config from './config/index';

//import path from ‘path’
//import greenlock from ‘greenlock-express’

const { PORT } = config;

/*
greenlock
  .init({
       packageRoot: path.join(__dirname,"../"),
       configDir: path.join(__dirname,"../", "server/config/greenlock.d"),
       maintainEamil: "liki5@nate.com",
       cluster: false,
  })
  .serve(app, ()=> {
       console.log("greenlock work");
  });
*/

app.listen(PORT, () => {
  console.log(`Blog Server started on Port ${PORT}`);
});
