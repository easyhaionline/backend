const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    standardCreate,
    standardGetActive,
    standardGetAll,
    standardToggle,
    StandardById,
    standardUpdate,
    Standardremove,
    searchStandard
} = require('../controllers/standard')

const router = express.Router()

// @route: POST /api/standard
// @desc: To create a new standard
// @access: Private
router.post('/', protectAdmin, standardCreate)
// router.post('/',  standardCreate)

// @route: DELETE /api/standard/:standardID
// @desc: To toggle an existing standard
// @access: Private
router.delete('/:standardID', protectAdmin, standardToggle)
// router.delete('/:standardID', standardToggle)


// @route: DELETE /api/standard/:standardID
// @desc: To toggle an existing standard
// @access: Private
router.delete('/delete/:id', protectAdmin, Standardremove)
// router.delete('/delete/:id', Standardremove)

// @route: GET /api/standard
// @desc: To get all the standards
// @access: Private
router.get('/', protectAdmin, standardGetAll)
// router.get('/',  standardGetAll)

// @route: GET /api/standard/active
// @desc: To get the ACTIVE standards
// @access: Public
router.get('/active', standardGetActive)


// @route: GET /api/standard
// @desc: To get the standard by id
// @access: Private
router.get('/by-id/:id', StandardById)

// @route: PUT /api/standard
// @desc: To update a standard
// @access: Private
// router.put('/',  standardUpdate)
router.put('/', protectAdmin, standardUpdate)
// router.put('/', standardUpdate)

router.get("/Searchstandard/:key", searchStandard)

module.exports = router
