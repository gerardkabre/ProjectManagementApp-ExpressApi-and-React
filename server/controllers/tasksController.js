const Task = require('../models').Task;

let getAll = (req, res) => {
  Task.findAll({})
    .then(tasks => res.send(tasks))
    .catch(e => console.error(e));
};

let create = (req, res) => {
  const Task = Task.create({
    text: req.body.text,
    ProjectID: req.body.ProjectID
  })
    .then(task => res.send(task))
    .catch(e => console.error(e));
};

let find = (req, res) => {
  Task.find({ id: req.body.id })
    .then(task => res.send(task))
    .catch(e => console.error(e));
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.find = find;
