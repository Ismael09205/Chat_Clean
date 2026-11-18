import { supabase } from "../../../shared/infrastructure/supabase/client";
import { User } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class SupabaseAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) throw error;

    let { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", data.user.id)
      .maybeSingle();

    // Crear el perfil pendiente si el registro requirió confirmar el correo
    const metaUsername = data.user.user_metadata?.username;
    if (!profile && metaUsername) {
      await supabase
        .from("profiles")
        .upsert({ id: data.user.id, username: metaUsername });
      profile = { username: metaUsername, avatar_url: null };
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      username: profile?.username ?? "",
      avatarUrl: profile?.avatar_url ?? undefined,
    };
  }

  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) throw error;
    if (!data.user) throw new Error("No se pudo crear el usuario");
    // Sin sesión = Supabase exige confirmar el correo antes de iniciar sesión
    if (!data.session)
      throw new Error(
        "Cuenta creada. Confirma tu correo y luego inicia sesión.",
      );
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: data.user.id, username });
    if (profileError) throw new Error(profileError.message);
    return { id: data.user.id, email: data.user.email!, username };
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();
    return {
      id: user.id,
      email: user.email!,
      username: profile?.username ?? "",
    };
  }
}

