const Project = require('../models').Project;

let getAll = (req, res) => {
  Project.findAll({
    where: {
      UserID: req.user.ID
    }
  }).then(result => res.send({ success: true, message: result }));
};

let create = (req, res) => {
  Project.create({
    title: req.body.title,
    UserID: req.user.ID
  })
    .then(projectCreated => res.send(projectCreated))
    .catch(error => console.error(error));
};

let find = (req, res) => {
  Project.findAll({
    include: [
      {
        model: Task,
        where: {
          projectID: Sequelize.col('project.ID'),
          UserID: req.user.ID,
          id: req.params.id
        }
      }
    ]
  })
    .then(projects => res.send(projects))
    .catch(error => console.error(error));
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.find = find;
