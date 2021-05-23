import express from 'express';
import routes from './routes';
const PORT = process.env.PORT || 8080;
const app = express();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
