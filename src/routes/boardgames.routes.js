const { Router } = require('express');
const { authenticate, authorizeAdmin} = require('../middlewares/auth');

const {
    getBoardgamesController,
    getBoardgameByIdController,
    createBoardgameController,
    updateBoardgameController,
    deleteBoardgameController,
    restoreBoardgameController,
    getBoardgameByQueryController
} = require('../controllers/boardgames.controller');

const {
    validateBoardgameData,
    validateBoardgameId,
    validateBoardgameSearchQuery
} = require('../validations/boardgames.validation');

const router = Router();

/**
 * @openapi
 * /boardgames:
 *  get:
 *    tags:
 *      - Boardgame
 *    summary: Obtiene todos los juegos de mesa
 *    responses:
 *      200:
 *       description: Muestra los primeros 15 juegos de mesa devueltos con éxito.
 *      404:
 *       description: No se encontraron juegos de mesa.
 */
router.get('/', getBoardgamesController);


/**
 * @openapi
 * /boardgames/search:
 *   get:
 *     tags:
 *       - Boardgame
 *     summary: Buscar juegos de mesa por un término general
 *     description: Realiza una búsqueda que coincide tanto con el nombre como con el género del juego de mesa.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda para el nombre o el género.
 *     responses:
 *       200:
 *         description: Muestra los juegos de mesa que coinciden con la búsqueda con éxito.
 *       400:
 *         description: Término de búsqueda inválido o vacío.
 *       404:
 *         description: No se encontraron juegos de mesa que coincidan con la búsqueda.
 */
router.get('/search', validateBoardgameSearchQuery, getBoardgameByQueryController);


/**
 * @openapi
 * /boardgames/{id}:
 *   get:
 *     tags:
 *       - Boardgame
 *     summary: Obtiene un juego de mesa por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego de mesa
 *     responses:
 *       200:
 *         description: Juego de mesa encontrado con éxito.
 *       400:
 *         description: ID provisto no es válido.
 *       404:
 *         description: El juego de mesa no existe.
 */
router.get('/:id', validateBoardgameId, getBoardgameByIdController);

/**
 * @openapi
 * /boardgames:
 *   post:
 *     tags:
 *       - Boardgame
 *     summary: Crear un nuevo juego de mesa
 *     description: Permite registrar un juego de mesa con su imagen y traducciones. Requiere privilegios de administrador.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageURL
 *               - translations
 *             properties:
 *               imageURL:
 *                 type: string
 *                 format: uri
 *                 description: URL de la imagen del juego de mesa.
 *                 example: "https://example.com/images/catan.jpg"
 *               translations:
 *                 type: array
 *                 description: Lista de traducciones para el juego (nombre, descripción, etc., según tu modelo).
 *                 items:
 *                   type: object
 *                   properties:
 *                     language:
 *                       type: string
 *                       example: "es"
 *                     name:
 *                       type: string
 *                       example: "Catan"
 *                     description:
 *                       type: string
 *                       example: "Un juego de estrategia sobre colonización."
 *     responses:
 *       201:
 *         description: Juego de mesa creado con éxito.
 *       400:
 *         description: Datos de entrada inválidos o faltantes.
 *       401:
 *         description: No autorizado. Token JWT faltante, expirado o inválido.
 *       403:
 *         description: Prohibido. Se requieren permisos de administrador (authorizeAdmin).
 */
router.post('/', authenticate, authorizeAdmin, validateBoardgameData, createBoardgameController);

/**
 * @openapi
 * /boardgames/{id}:
 *   put:
 *     tags:
 *       - Boardgame
 *     summary: Actualizar un juego de mesa existente
 *     description: Actualiza la imagen y/o las traducciones de un juego de mesa específico por su ID. Requiere privilegios de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del juego de mesa a modificar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageURL:
 *                 type: string
 *                 format: uri
 *                 description: Nueva URL de la imagen del juego de mesa.
 *                 example: "https://example.com/images/catan-premium.jpg"
 *               translations:
 *                 type: array
 *                 description: Lista de traducciones actualizadas o nuevas para el juego.
 *                 items:
 *                   type: object
 *                   properties:
 *                     language:
 *                       type: string
 *                       example: "es"
 *                     name:
 *                       type: string
 *                       example: "Catan Edición Especial"
 *                     description:
 *                       type: string
 *                       example: "Una versión mejorada del clásico juego de estrategia."
 *     responses:
 *       200:
 *         description: Juego de mesa actualizado con éxito.
 *       400:
 *         description: ID inválido o datos del cuerpo de la petición mal estructurados.
 *       401:
 *         description: No autorizado. Token JWT faltante, expirado o inválido.
 *       403:
 *         description: Prohibido. Se requieren permisos de administrador.
 *       404:
 *         description: El juego de mesa con el ID provisto no existe.
 */
router.put('/:id', authenticate, authorizeAdmin, validateBoardgameId, validateBoardgameData, updateBoardgameController);

/**
 * @openapi
 * /boardgames/{id}:
 *   delete:
 *     tags:
 *       - Boardgame
 *     summary: Eliminar de forma lógica un juego de mesa
 *     description: Desactiva un juego de mesa del sistema utilizando borrado lógico para conservar la integridad del registro y su ID. Requiere privilegios de administrador.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del juego de mesa a eliminar lógicamente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Juego de mesa desactivado con éxito (borrado lógico aplicado).
 *       400:
 *         description: ID provisto no es válido.
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       403:
 *         description: Prohibido. Se requieren permisos de administrador.
 *       404:
 *         description: El juego de mesa no existe o ya ha sido eliminado.
 */

router.delete('/:id', authenticate, authorizeAdmin, validateBoardgameId, deleteBoardgameController);

/**
 * @openapi
 * /boardgames/{id}/restore:
 *   patch:
 *     tags:
 *       - Boardgame
 *     summary: Restaurar un juego de mesa eliminado lógicamente
 *     description: Reactiva un juego de mesa que fue desactivado previamente, manteniendo su ID original sin cambios. Requiere privilegios de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del juego de mesa a restaurar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Juego de mesa restaurado y reactivado con éxito.
 *       400:
 *         description: ID provisto inválido.
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       403:
 *         description: Prohibido. Se requieren permisos de administrador.
 *       404:
 *         description: El juego de mesa no existe o no se encuentra eliminado.
 */
router.patch('/:id/restore', authenticate, authorizeAdmin, validateBoardgameId, restoreBoardgameController);


module.exports = router;