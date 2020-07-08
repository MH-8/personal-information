const router = require("express").Router();

let info = require("../models/info.model");

router.route("/").get((req, res) => {
  info
    .find()
    .then((info) => res.json(info))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const Email = req.body.Email;
  const Phone = Number(req.body.Phone);
  const CV = Number(req.body.CV);
  const newInfo = new info({
    username,
    Email,
    Phone,
    CV,
  });

  newInfo
    .save()
    .then(() => res.json("information added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  info
    .findById(req.params.id)
    .then((info) => res.json(info))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  info

    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Inforamtion deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  info

    .findById(req.params.id)
    .then((info) => {
      info.username = req.body.username;
      info.Email = req.body.Email;
      info.Phone = Number(req.body.Phone);
      info.CV = Number(req.body.cv);

      info
        .save()
        .then(() => res.json("information updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
