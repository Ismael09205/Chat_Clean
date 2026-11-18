import { ChatError } from "../../../shared/domain/errors/AppError";
import { Message } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class SendImageUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}
  async execute(
    roomId: string,
    userId: string,
    localUri: string,
    mimeType?: string,
    caption = "",
  ): Promise<Message> {
    if (!localUri) throw new ChatError("No se seleccionó ninguna imagen");
    try {
      const imageUrl = await this.chatRepo.uploadImage(roomId, userId, localUri, mimeType);
      return await this.chatRepo.sendMessage(roomId, userId, caption.trim(), imageUrl);
    } catch (error) {
      throw new ChatError("No se pudo enviar la imagen", error);
    }
  }
}
