const router = require('express').Router();
const userRoutes = require('./user');
const cardsRoutes = require('./cards');
const authRoutes = require('./auth');
const authMiddlewares = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError'); // 404

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('', authRoutes);
router.use('/users', authMiddlewares, userRoutes);
router.use('/cards', authMiddlewares, cardsRoutes);
router.use('/*', (req, res, next) => next(new NotFoundError('Несуществующая страница')));

module.exports = router;
