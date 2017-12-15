module.exports = (rogue) => {

    const router = rogue.express.Router();

    router.get('/hello', rogue.action('main', 'index'));

    return router;
};