const express = require('express')
const bodyParser = require('body-parser')
const students = [{
    name: "Devansh",
    rollNo: 11222896,
    dateOfBirth: "14/05/2004",
    city: "Hrayana",
    number: 6388339966,
    fatherNumber: 6388339977,
    roomNo: 23,
    hostelName: "B-2"
}]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/style.css', (req, res, next) => {
    res.type('text/css');
    next();
  });

app.get("/", function (req, res) {
    res.render("home", {
        data: students
    })
})

app.post("/", (req, res) => {
    const name = req.body.name
    const rollNo = req.body.rollNo
    const dateOfBirth = req.body.dateOfBirth
    const city = req.body.city
    const number = req.body.number
    const fatherNumber = req.body.fatherNumber
    const roomNo = req.body.roomNo
    const hostelName = req.body.hostelName

    students.push({
        name: name,
        rollNo: rollNo,
        dateOfBirth: dateOfBirth,
        city: city,
        number: number,
        fatherNumber: fatherNumber,
        roomNo: roomNo,
        hostelName: hostelName
    })

    res.render("home", {
        data: students
    })
})

app.post('/information', (req, res) => {
    var requestedRollNo = req.body.rollNo;
    students.forEach(student => {
        if (student.rollNo == requestedRollNo) {
            res.json(student)
        }
    })
})
const path = require('path');
app.use(express.static(path.join(__dirname, 'views')));

app.post('/update', (req, res) => {
    var requestedRollNo = req.body.rollNo;
    var newRoomNo = req.body.newroomno;
    students.forEach(student => {
        if (student.rollNo == requestedRollNo) {
            student.roomNo = newRoomNo;
        }
    })
    res.render("home", {
        data: students
    })
})

app.post('/delete', (req, res) => {
    var requestedRollNo = req.body.rollNo;
    var j = 0;
    students.forEach(student => {
        j = j + 1;
        if (student.rollNo === requestedRollNo) {
            students.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: students
    })
})

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})
