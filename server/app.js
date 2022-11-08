const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error-handler');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.use(cors());
// global error handler
// app.use(errorHandler);


app.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>HMS</title>
        </head>
        <body>
            <h1>HMS</h1>
            <p>API is ready to use</p>
        </body>
        </html>
        `;
    res.send(html);
});

// api routes
const routePrefix = '/api';
app.use(`${routePrefix}/user`, require('./controllers/userController'));
app.use(`${routePrefix}/seat`, require('./controllers/seatController'));
app.use(`${routePrefix}/notice`, require('./controllers/noticeController'));
app.use(`${routePrefix}/payment`, require('./controllers/paymentController'));


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));