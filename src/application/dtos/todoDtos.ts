import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTodoDTO:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your book
 *       example:
 *         title: Complete your portfolio website for once
 */
export class CreateTodoDTO {
  constructor(public readonly title: string, public readonly description: string) {
    const { error } = createTodoSchema.validate({ title, description });
    if (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }

    this.title = title;
  }
}

// validation schema for the create todo dto
const createTodoSchema = Joi.object({
  title: Joi.string().required().min(1),
  description: Joi.string().optional(),
});
