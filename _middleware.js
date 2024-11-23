import { NextResponse } from "next/server";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export async function middleware(req) {
  const supabase = createMiddlewareSupabaseClient(
    {
      req: request,
      res,
    },
    { supabaseUrl: SUPABASE_URL, supabaseKey: SUPABASE_KEY }
  );

  const { data: session } = await supabase.auth.getSession(req.headers);

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
