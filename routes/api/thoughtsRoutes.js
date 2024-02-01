const router = require('express').Router();
const {
    getThoughts,
    getThoughtByid,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThoughtByid).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;