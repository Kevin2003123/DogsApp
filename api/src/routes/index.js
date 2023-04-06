const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require("express");
const getDogs = require("../controllers/getDogs");
const fillTemperaments = require("../controllers/fillTemperaments");
const fillDogs = require("../controllers/fillDogs");
const getDogByIdRace = require("../controllers/getDogByIdRace");
const getDogsByName = require("../controllers/getDogsByName");
const createDog = require("../controllers/createDog");
const getTemperaments = require("../controllers/getTemperaments");
const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogs);
router.get("/dogs/name", getDogsByName);
router.post("/dogs", createDog);
router.get("/dogs/fillDogs", fillDogs);
router.get("/dogs/:idRaza", getDogByIdRace);
router.get("/temperaments", getTemperaments);

module.exports = router;
