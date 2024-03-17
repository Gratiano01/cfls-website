var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var ejs = require('ejs')

var indexRouter = require('./routes/index')
var activeRouter = require('./routes/active')
var alumnusRouter = require('./routes/alumnus')
var teacherRouter = require('./routes/teacher')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/active', activeRouter)
app.use('/alumnus', alumnusRouter)
app.use('/teacher', teacherRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find()
    res.json(teachers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/teachers', async (req, res) => {
  const teacher = new Teacher(req.body)
  try {
    const newTeacher = await teacher.save()
    res.status(201).json(newTeacher)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.put('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.json(teacher)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.json({ message: 'Teacher deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/alumni', async (req, res) => {
  try {
    const alumni = await Alumnus.find()
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET a specific alumnus by ID
app.get('/alumni/:id', async (req, res) => {
  try {
    const alumnus = await Alumnus.findById(req.params.id)
    if (!alumnus) {
      return res.status(404).json({ message: 'Alumnus not found' })
    }
    res.json(alumnus)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST a new alumnus
app.post('/alumni', async (req, res) => {
  const alumnus = new Alumnus(req.body)
  try {
    const newAlumnus = await alumnus.save()
    res.status(201).json(newAlumnus)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update an existing alumnus
app.put('/alumni/:id', async (req, res) => {
  try {
    const alumnus = await Alumnus.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!alumnus) {
      return res.status(404).json({ message: 'Alumnus not found' })
    }
    res.json(alumnus)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE an alumnus
app.delete('/alumni/:id', async (req, res) => {
  try {
    const alumnus = await Alumnus.findByIdAndDelete(req.params.id)
    if (!alumnus) {
      return res.status(404).json({ message: 'Alumnus not found' })
    }
    res.json({ message: 'Alumnus deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = app
