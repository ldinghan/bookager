"use client";

import React, { useEffect } from 'react'
import { auth, rtdb } from '@/firebase';
import { ref, get, child } from 'firebase/database';

function AnalyticsPage() {
    const getStats = () => {
        if (auth.currentUser) {
            const dbRef = ref(rtdb);
            get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        } else {
            console.log("not logged in")
        }
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getStats();
            }
        });

        return () => {
            // Cleanup the subscription when the component unmounts
            unsubscribe();
        };
    }, []);

    return (
        <></>
    )
}

export default AnalyticsPage