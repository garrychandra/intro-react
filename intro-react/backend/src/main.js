"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 3000;
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World! Garry'
    });
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
