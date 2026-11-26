const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const http = require("http");

const router = express.Router();

router.get("/debug/ping", (req, res) => {
    const host = req.query.host;
    exec("ping -c 1 " + host, (err, out) => res.send(out));
});

router.get("/debug/log", (req, res) => {
    const file = req.query.file;
    fs.readFile("/var/log/dvna/" + file, "utf8", (err, data) => res.send(data));
});

router.get("/debug/fetch", (req, res) => {
    const target = req.query.url;
    http.get(target, (upstream) => upstream.pipe(res));
});

router.get("/debug/echo", (req, res) => {
    const msg = req.query.msg;
    res.send("<h1>" + msg + "</h1>");
});

module.exports = router;
