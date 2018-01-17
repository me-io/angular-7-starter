abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  };

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) {
        return console.error(err);
      }
      res.json(count);
    });
  };

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);

    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err && err.errors) {
        const errObj = this.makeError(err);
        res.sendStatus(errObj[0]);
      }

      if (err) {
        return console.error(err);
      }

      res.status(200).json(item);
    });
  };

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) {
        return console.error(err);
      }
      res.json(obj);
    });
  };

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };

  makeError = (err) => {
    let msg = 'Error';
    let errCode = 400;
    if (err && err.errors) {
      // mongoose error
      // console.log('Error Inserting New Data');
      Object.keys(err.errors).forEach(function (key) {
        const errObj = err.errors[key];
        // console.log(errObj);
        errCode = errObj['properties']['errorCode'] || erroCode;
        if (errObj.name === 'ValidatorError') {
          msg += ' - ' + errObj.message;
        }
      });
    } else {
      // db error etc...

    }
    return [errCode, msg];
  };
}

export default BaseCtrl;
