// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { supabase } from "../../lib/supabase";
// import { Session } from "@supabase/supabase-js";

// interface AuthContextType {
//     session: Session | null;
//     user: any | null;
//     loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//     session: null,
//     user: null,
//     loading: true,
// })

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthContextProvider = ({ children }: AuthProviderProps) => {
//     const [session, setSession] = useState<Session | null>(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         // Get initial session
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session)
//             setLoading(false)
//         })

//         // Listen for auth state changes
//         const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session)
//             setLoading(false)
//         })

//         return () => {
//             subscription.unsubscribe()
//         }
//     }, [])

//     return (
//         <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const UserAuth = () => {
//     return useContext(AuthContext)
// }