import app from "./app";

app.listen('7000', () => {
    console.log('hi')
});

/*
import config from "./config/index";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
*/