import { express } from 'express';

let router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello, World!');
  res.status(200).send({ message: 'deu bom'});
});

export default router;  