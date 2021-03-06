const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  const query = `SELECT * from "item"`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
  // For testing only, can be removed
  // pool. query(sqlTxt)
});
/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3)`;
  pool
    .query(queryText, [
      req.body.description,
      req.body.image_url,
      req.body.user_id,
    ])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
// endpoint functionality

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log("Deleting favorite at id:", id);
  const queryText = `DELETE FROM "item" WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then(() => {
      console.log(`Deleted at id: ${id} successfully`);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in delete", err);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
