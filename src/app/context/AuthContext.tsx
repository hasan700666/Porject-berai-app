import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../uilts/supabase';

const AuthContext = createContext<{ session: Session | null; user: any | null }>({
    session: null,
    user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);