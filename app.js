const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cons = require('consolidate');
const logger = require('./logger');
const config = require('./model/config');
const index = require('./routes/index');
var morgan = require('morgan');
var mongoose = require('mongoose');
const user = require('./routes/user/user_master');
const country = require('./routes/master/country_master');
const state = require('./routes/master/state_master');
const changePsw = require('./routes/user/change_password');
const addDonor = require('./routes/project/addDonor');
const campaign = require('./routes/master/campaign_master');
const payment = require('./routes/master/payment_master');
const role = require('./routes/master/role_master');
const searchpopup = require('./routes/master/search_popup');
const TemplateList = require('./routes/master/notification_master');
const projectCategory = require('./routes/project/category.js');
const maintenancetype = require('./routes/project/ProMainType');
const maintenancesubtype = require('./routes/project/ProMainSubType');
const addProjects = require('./routes/project/projects');
const annualMaintenance = require('./routes/project/annualMaintenance.js');
const facilityManagement = require('./routes/project/facilityManagement');
const generaldonation = require('./routes/project/general_donation');
const landdonor = require('./routes/project/landdonor');
const dashboard = require('./routes/master/Dashboard');
const navigation = require('./routes/master/navigation_master');
const rolemapping = require('./routes/master/role_user_map');
const addBuilding = require('./routes/project/buildingDonor.js');

var app = express();

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use('/', index);
app.use('/state', state);
app.use('/donor', addDonor);
app.use('/changePsw', changePsw);
app.use('/country', country);
app.use('/campaign', campaign);
app.use('/payment', payment);
app.use('/user', user);
app.use('/role', role);
app.use('/template', TemplateList);
app.use('/searchpopup', searchpopup);
app.use('/category', projectCategory);
app.use('/ProMainType', maintenancetype);
app.use('/ProMainSubType', maintenancesubtype);
app.use('/project', addProjects);
app.use('/annual', annualMaintenance);
app.use('/facility', facilityManagement);
app.use('/generaldonation', generaldonation);
app.use('/landdonor', landdonor);
app.use('/dashboard', dashboard);
app.use('/navigation', navigation);
app.use('/rolemapping', rolemapping);
app.use('/buildingdonor', addBuilding);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;