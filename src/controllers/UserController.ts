import express, { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { User } from './../models/User'
import { isDate } from './../services/isDate'

const router = express.Router()

router.get('/api/users/:mode',
    [
        param('mode')
            .trim()
            .notEmpty()
            .isString()
            .custom(mode => {
                if (mode === 'true') {
                    return true
                } else if (mode === 'false') {
                    return true
                } else if (mode === 'all') {
                    return true
                } else {
                    throw new BadRequestError('mode must be true, false or all')
                }
            })
            .withMessage('You must supply a valid mode')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { mode } = req.params;
        try {
            if (mode === 'true') {
                const users = await User.findAll({
                    where: {
                        is_deleted: true
                    }
                })
                res.status(200).send(users);
            } else if (mode === 'false') {
                const users = await User.findAll({
                    where: {
                        is_deleted: false
                    }
                })
                res.status(200).send(users);
            } else if (mode === 'all') {
                const users = await User.findAll({})
                res.status(200).send(users);
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Cant retrieve users')
        }
    })


router.get('/api/user/:id',
    [
        param('id')
            .trim()
            .notEmpty()
            .isString()
            .withMessage('You must supply a valid UUID')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({
                where: {
                    is_deleted: false,
                    id: id
                }
            })
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Cant retrieve user!');
        }
        
    })

router.get('/api/user/auto-suggest', async (req: Request, res: Response) => {
    res.status(200).send('auto-suggest')
})

router.post('/api/user', [
    body('login')
        .trim()
        .notEmpty()
        .isString()
        .custom(date => {
            if (isDate(date)) {
                return true
            } else {
                throw new BadRequestError('login must be a valid date')
            }
        })
        .withMessage('You must supply login'),
    body('password')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a password'),
    body('age')
        .trim()
        .notEmpty()
        .isNumeric()
        .custom(age => {
            if (age >= 4 && age <= 130) {
                return true
            } else {
                throw new BadRequestError('age must be between 4 and 130')
            }
        })
        .withMessage('You must supply age')
],
    validateRequest, async (req: Request, res: Response) => {
        const { login, password, age } = req.body;
        try {
            const user = {
                login,
                password,
                age: +age,
                is_deleted: false
            }
            await User.create(user)
            res.status(201).send(user)
        } catch (e) {
            console.log(e)
            throw new BadRequestError('User could not get created!')
        }
    })

router.put('/api/user', [
    body('id')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply an id'),
    body('password')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('You must supply a password'),
    body('login')
        .trim()
        .notEmpty()
        .isString()
        .custom(date => {
            if (isDate(date)) {
                return true
            } else {
                throw new BadRequestError('login must be a valid date')
            }
        })
        .withMessage('You must supply login'),
    body('age')
        .trim()
        .notEmpty()
        .isNumeric()
        .custom(age => {
            if (age >= 4 && age <= 130) {
                return true
            } else {
                throw new BadRequestError('age must be between 4 and 130')
            }
        })
        .withMessage('You must supply age')
],
    validateRequest, async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const user = await User.update(req.body,{
                where: {
                    is_deleted: false,
                    id: id
                }
            })            
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Error updating the user');
        }
    })

router.delete('/api/user/:id',
    [
        param('id')
            .trim()
            .notEmpty()
            .isString()
            .withMessage('You must supply a valid UUID')
    ], async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.update({ is_deleted: true },{
                where: {
                    is_deleted: false,
                    id: id
                }
            })
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('User could not get deleted!')
        }
    })

export { router as UserController }
