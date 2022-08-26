import { MailAdapter } from "../adapters/mailAdapte";
import { FeedbacksRepositiry } from "../repositories/feedbacksRepostitory";

//dados para enviar um novo feedback
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

//submissão de um novo feedback
export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepositiry,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    // necessário preencher type, caso contrário retornará um erro
    if (!type) {
      throw new Error("Type is required");
    }

    // necessário preencher comment, caso contrário retornará um erro
    if (!comment) {
      throw new Error("Comment ir required");
    }

    // verifica o formato da screenshot, caso for diferente da condição, retornará um erro.
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
