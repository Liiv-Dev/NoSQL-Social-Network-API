const router = require('express').Router();
const {
    getThoughts,
    getThoughtByid,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThoughtByid).put(updateThought).delete(deleteThought);

module.exports = router;