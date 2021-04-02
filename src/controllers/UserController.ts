import express, { Request, Response } from 'express'
import { body, param, query } from 'express-validator'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { User, UserAttrs } from './../models/User'
import { v4 as uuidv4 } from 'uuid';
import { isDate } from './../services/isDate'

const router = express.Router()

router.delete('/api/user/:id',
    [
        param('id')
            .trim()
            .notEmpty()
            .isString()
            .withMessage('You must supply a valid UUID')
    ], async (req: Request, res: Response) => {
        const { id } = req.params;
        let userIndex = User.findIndex((u => u.id === id && !u.isDeleted));
        if (userIndex !== -1) {
            User[userIndex].isDeleted = true
            res.status(200).send(User[userIndex]);
        }
        throw new BadRequestError('User does not exist!!!')
    })

export { router as UserController }
