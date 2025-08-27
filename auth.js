import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import mongoClientPromise from "./database/mongoClientPromise";

import { User } from "./model/user-model";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (credentials == null) return null;

                try {
                    const user = await User.findOne({email: credentials?.email});
                    console.log({user, credentials}, "user and credentials in auth.js");
                    if (user) {
                        const isMatch = credentials.password ===  user?.password;
                        
                        if(isMatch) {
                            return user;
                            
                        } else {
                            throw new Error('Email or password mismatch');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch(error) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
    ]
})