export interface Message {
  id:           string;
  roomId:       string;
  userId:       string;
  content:      string;
  imageUrl?:    string;  // URL pública en Supabase Storage (bucket chat-images)
  createdAt:    Date;
  authorUsername?: string; // Desnormalización controlada para la UI
}
