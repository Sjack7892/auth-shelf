const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
//  GET call is to /api/shelf 
router.get('/', rejectUnauthenticated, (req, res) => {
    queryString = `SELECT * FROM "item";`;
    pool.query(queryString)
        .then(result => {
            console.log('Get this info from database', result.rows);
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
        })
    // res.sendStatus(200); // For testing only, can be removed
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    console.log('id is:', req.user.id);
    // console.log('name is:', req.user.username);
    let item = req.body.item
    let user = req.user.id
    queryString = `INSERT INTO item (description, user_id) VALUES ($1, $2) ;`;
    pool.query(queryString, [item, user])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            res.sendStatus(500);
        
            console.log('ERROR in server');
        })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    console.log(req.user.id);
    let id = req.params.id;
    let user = req.user.id
    console.log(id);
    let queryString = `DELETE FROM "item" WHERE "id" = ${id} AND "user_id" = ${user};`;
    pool.query(queryString)
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
        // alert('You did not make this, you can not delete it. Sorry');
        console.log(error);
    })

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;