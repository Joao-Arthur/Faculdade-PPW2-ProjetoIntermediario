import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('bandas de rock');
});

export default router;
