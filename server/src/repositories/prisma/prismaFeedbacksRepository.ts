import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepositiry } from "../feedbacksRepostitory";

export class PrismaFeedbacksRepository implements FeedbacksRepositiry {
   async create({type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    }
}