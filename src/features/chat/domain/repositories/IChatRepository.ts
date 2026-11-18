import { Message } from "../entities/Message";
import { Room } from "../entities/Room";

export interface IChatRepository {
  getRooms(): Promise<Room[]>;
  createRoom(name: string, userId: string): Promise<Room>;
  getMessages(roomId: string): Promise<Message[]>;
  sendMessage(
    roomId: string,
    userId: string,
    content: string,
    imageUrl?: string,
  ): Promise<Message>;
  // Sube una imagen local (uri del dispositivo) y devuelve su URL pública
  uploadImage(
    roomId: string,
    userId: string,
    localUri: string,
    mimeType?: string,
  ): Promise<string>;
  // Devuelve la funcion unsubscribe, compatible con el return de useEffect
  subscribeToRoom(
    roomId: string,
    onMessage: (msg: Message) => void,
  ): () => void;
}
