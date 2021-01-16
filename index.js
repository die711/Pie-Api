let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');
let errorHelper = require('./helpers/errorHelpers');

let router = express.Router();


router.get('/', function (req, res, next) {
    pieRepo.get(function (data) {

        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message:": "All pies retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });

});

router.get('/search', function (req, res, next) {

    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    }


    pieRepo.search(searchObject, function (data) {

        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });

    }, function (err) {
        next(err);
    });

});

router.get('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {

            if (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message:": "All pies retrieved",
                    "data": data
                });
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message:": `the pie  ${req.params.id} could not found`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message:": `the pie  ${req.params.id} could not found`
                    }
                });
            }
        },
        function (err) {
            next(err);
        }
    )
    ;

});
router.post('/', function (req, res, next) {

    pieRepo.Insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added",
            "data": data
        });
    }, function (err) {
        next(err);
    });


});

router.put('/:id', function (req, res, next) {

    pieRepo.getById(req.params.id, function (data) {

        if (data) {

            pieRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "Created",
                    "message": `Pie ${req.params.id} updated.`,
                    "data": data
                });

            });

        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": `The Pie ${req.params.id} could not be found.`,
                "error": {
                    "code": "NOT_FOUND",
                    "message": `The Pie ${req.params.id} could not be found.`
                }
            });
        }


    });


});

router.patch('/:id', function (req, res, next) {

    pieRepo.getById(req.params.id, function (data) {

        if (data) {

            pieRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "Created",
                    "message": `Pie ${req.params.id} updated.`,
                    "data": data
                });

            });

        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": `The Pie ${req.params.id} could not be found.`,
                "error": {
                    "code": "NOT_FOUND",
                    "message": `The Pie ${req.params.id} could not be found.`
                }
            });
        }


    });


});

router.delete('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {


        if (data) {
            pieRepo.delete(req.params.id, function (data) {

                res.status(200).json({
                    "status": 200,
                    "statusText": "Created",
                    "message": `The Pie ${req.params.id} is deleted`,
                    "data": `Pie ${req.params.id} deleted`

                });
            });
        }else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": `The Pie ${req.params.id} could not be found.`,
                "error": {
                    "code": "NOT_FOUND",
                    "message": `The Pie ${req.params.id} could not be found.`
                }

            });
        }


    }, function (err){
        next(err);
    });


});




app.use(express.json());
app.use('/api/', router);

app.use(errorHelper.logErrorsToConsole);
app.use(errorHelper.logErrorsToFile);
app.use(errorHelper.clientErroHandler);
app.use(errorHelper.errorHandler);




var server = app.listen(5000, function () {

    console.log('Node server is running');

});






