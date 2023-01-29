const { query } = require('express');
var express = require('express');
var app = express();
const sql = require('mssql');
const {
    selectAll,
    selectAllDetails,
    selectAllTypes,
    insertIntoDetails,
    lastCreatedDetailID,
    insertIntoBlips,
    deleteBlip,
    selectOneBlip,
    selectOneDetails,
    updateBlipType,
    updateBlipDetails,
    connectionString
} = require('./queries')

let request;

app.use(express.json());
app.use(express.urlencoded());

async function sqlConnect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(connectionString());
        console.log('SQL Connection Successful');
        request = new sql.Request();
    } catch (err) {
        console.log(err)
    }
}

sqlConnect();

app.set('view engine', 'ejs');


app.use( express.static( "public" ) );

app.get('/', (req, res) => {
    let queryResult = [];
    let blip_types = [];
    request.query(selectAll(), (err, result) => {
        if (err) throw err;
        result.recordset.forEach(element => {
            console.log(element)
            queryResult.push(element);
        });
        request.query(selectAllTypes(), (err, result) => {
            result.recordset.forEach(element => {
                blip_types.push(element);
            });
            console.dir(blip_types);
            let blip_details = [];
            request.query(selectAllDetails(), (err, result) => {
                if (err) throw err;
                result.recordset.forEach(element => {
                    console.log(element)
                    blip_details.push(element);
                });
                res.render('pages/index.ejs', {
                    results: queryResult,
                    blipTypes: blip_types,
                    blipDetails: blip_details
                });
            })
        })
    })
})

app.post('/addBlip', (req, res) => {
    let coords = JSON.parse(req.body.coords);
    let blip_types = [];
    console.log(coords);
    request.query(selectAllTypes(), (err, result) => {
        result.recordset.forEach(element => {
            blip_types.push(element);
        });
        res.render('pages/addBlip.ejs', {
            coords: coords,
            blipTypes: blip_types
        })
    }) 
})

app.post('/createBlip', (req, res) => {
    request.query(insertIntoDetails(req.body.title, req.body.description), (err, result) => {
        if (err) throw err;
        request.query(lastCreatedDetailID(), (err, result) => {
            if (err) throw err;
            //console.log(result.recordset[0].id)
            let id = result.recordset[0].id;
            console.log(`x: ${req.body.posx}, y: ${req.body.posy}, type: ${req.body.blipType}, id: ${id}`);
            request.query(insertIntoBlips(req.body.posx, req.body.posy, req.body.blipType, id), (err ,result) => {
                if (err) throw err;
                res.redirect('/');
            })
            
        })
    });
})

app.post('/deleteBlip', (req, res) => {
    let blipid = Number(req.body.blipid);
    request.query(deleteBlip(blipid), (err, result) => {
        if (err) throw err;
        res.redirect('/');
    })
})

app.post('/editBlip', (req, res) => {
    let blipid = Number(req.body.blipid);
    let blip_types = [];
    let blip_data;
    let blip_details;
    request.query(selectAllTypes(), (err, result) => {
        result.recordset.forEach(element => {
            blip_types.push(element);
        });
        request.query(selectOneBlip(blipid), (err, results)=> {
            if (err) throw err;
            blip_data = results.recordset[0];
            console.dir(blip_data);
            request.query(selectOneDetails, (err, detailsResult) => {
                if (err) throw err;
                blip_details = detailsResult.recordset[0];
                console.log(blip_details);
                res.render('pages/editblip', {
                    blipTypes: blip_types,
                    blipData: blip_data,
                    blipDetails: blip_details
                })
            })
        })
    })
})

app.post('/editblipQuery', (req, res) => {
    let blipid = Number(req.body.blipid);
    let blip_type = Number(req.body.blipType);
    let detailsid = Number(req.body.detailsid)
    request.query(updateBlipType(blip_type, blipid), (err, result) => {
        if (err) throw err;
        request.query(updateBlipDetails(req.body.title, req.body.description, detailsid), (err, results) => {
            if (err) throw err;
            res.redirect('/');
        })
    })
})

const port = 8080

app.listen(port);
console.log('Server is listening on port ' + port);