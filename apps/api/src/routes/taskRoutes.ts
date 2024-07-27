import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id/change-status', taskController.changeStatus);

export default router;
