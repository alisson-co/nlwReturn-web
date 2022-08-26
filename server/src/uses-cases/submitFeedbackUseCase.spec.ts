import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

// Spy = espião | jest.fn() = função espiã no jest, onde não executa nenhuma ação, apenas verifica se a função foi chamada ou não
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const SubmitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () =>{
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        // eu espero que as funções tenham sido chamadas
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    // test type
    it('should not able to submit feedback without type', async () =>{
        await expect(SubmitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    });

    // test comment
    it('should not able to submit feedback without comment', async () =>{
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    });

    // test screenshot
    it('should not able to submit feedback with an invalid screenshot', async () =>{
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'image.jpg'
        })).rejects.toThrow();
    });
});