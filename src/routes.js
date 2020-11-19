"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("You did it! I am now running:) ").end();
    });


    app.get('/api', async (req, res) => {
        console.log("=================");
        let query;
 
            query = database.query(
                'SELECT * FROM course'
            );
        
        console.log(query);
        const emps = await query;

        res.status(200).send(JSON.stringify(emps)).end();
    });



    app.get('/api/emp/:id', async (req, res) => {
        let _id = req.params.id;
        const query = database.query(
            'select * from course where id = ?',
            [_id]
        );
        const emps = await query;
        res.status(200).send(JSON.stringify(emps)).end();
    });



    app.post('/api/emp', async (req, res) => {
        let _id = req.body.id;
        let _name = req.body.name;
        let _description = req.body.description;
        

        const query = database.query(
            'insert into course(id, name, description) values (?, ?, ?)',
            [_id, _name, _description]
        );
        const emps = await query;
        res.status(200).send('Course added successfully!').end();
    });

    app.post('/api/emp', async (req, res) => {
        let _id = req.body.id;
        let _description = req.body.description;
        const query = database.query(
            'REPLACE INTO course(description) SELECT description FROM couse WHERE id = ? values (?)',
            [_id, _description]
        );
        const emps = await query;
        res.status(200).send('Course updated successfully').end();
    });



};