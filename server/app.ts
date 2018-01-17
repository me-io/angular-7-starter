import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cacheManager from 'cache-manager';
import * as fsStore from 'cache-manager-fs';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI + process.env.MONGODB_TEST_DB;
} else {
  mongodbURI = process.env.MONGODB_URI + process.env.MONGODB_DB;
  app.use(morgan('dev'));
}

(<any>mongoose).Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });

mongodb
  .then(() => {
    console.log('Connected to MongoDB on', mongodbURI);

    setRoutes(app);

    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + app.get('port'));
      });
    }

  })
  .catch((err) => {
    console.error(err);
  });


app.locals.memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 10/*seconds*/ });

app.locals.diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    ttl: 60 * 60 /* seconds */,
    maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
    path: 'diskcache',
    preventfill: true,
  },
});


export { app };
