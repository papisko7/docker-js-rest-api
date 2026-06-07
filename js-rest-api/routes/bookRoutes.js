const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Pobiera listę wszystkich książek
 *     responses:
 *       200:
 *         description: Sukces
 *       500:
 *         description: Blad serwera
 *   post:
 *     summary: Dodaje nową książkę
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utworzono książkę
 *       400:
 *         description: Brak wymaganych danych
 *       500:
 *         description: Blad serwera
 */
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Pobiera jedną książkę po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukces
 *       400:
 *         description: Niepoprawne ID
 *       404:
 *         description: Nie znaleziono książki
 *   put:
 *     summary: Aktualizuje dane książki
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Zaktualizowano
 *       400:
 *         description: Niepoprawne ID lub dane
 *       404:
 *         description: Nie znaleziono książki
 *       500:
 *         description: Błąd serwera
 *   delete:
 *     summary: Usuwa książkę
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usunięto
 *       400:
 *         description: Niepoprawne ID
 *       404:
 *         description: Nie znaleziono książki
 *       500:
 *         description: Błąd serwera
 */
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;