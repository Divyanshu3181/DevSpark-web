import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from '../utils/constants';

const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {verifyPremiumUser()},[]);

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", {
            withCredentials: true,
        });
        console.log("Premium verification response:", res.data);

        if (res.data.isPremium) {
            setIsUserPremium(true)
        }
    }



    const handleBuyClick = async (type) => {    

        const order = await axios.post(BASE_URL + "/payment/create", {
            membershipType: type,
        }, { withCredentials: true });


        // It should open the razorpay dialog box

        const { amount, keyId, currency, notes, orderId, } = order.data

        const options = {
            key: keyId,
            amount,
            currency,
            name: "DevSpark",
            description: 'Connect to other Developers',
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
            handler: function(response) {
                // Call verifyPremiumUser after payment is complete
                verifyPremiumUser();
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return isUserPremium ? (
        <h1 className="flex text-3xl">"You're already a premium user!!"</h1>
        
    ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-screen bg-gray-900 p-4">
            {/* Silver Membership */}
            <div className="relative w-80 p-6 rounded-3xl shadow-lg bg-gradient-to-br from-gray-600/40 to-gray-800/40 backdrop-blur-lg border border-gray-400/50 text-white">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 blur-2xl rounded-3xl"></div>

                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-gray-300">🥈 Silver Membership</h2>

                {/* Features */}
                <ul className="mt-4 space-y-3 text-center text-lg">
                    <li>💬 Chat with other people</li>
                    <li>🔗 100 Connection Requests per day</li>
                    <li>✅ Blue Tick</li>
                    <li>⏳ 3 Months</li>
                </ul>

                {/* Subscribe Button */}
                <button
                    onClick={() => handleBuyClick("silver")}
                    className="mt-6 w-full py-3 text-lg font-semibold bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-400 transition-all duration-300 transform hover:scale-105">
                    Get Silver 🚀
                </button>
            </div>
            <h1 className="block text-2xl">OR</h1>
            {/* Gold Membership */}
            <div className="relative w-80 p-6 rounded-3xl shadow-lg bg-gradient-to-br from-yellow-500/40 to-orange-500/40 backdrop-blur-lg border border-yellow-400/50 text-white">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 opacity-20 blur-2xl rounded-3xl"></div>

                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-yellow-300">🥇 Gold Membership</h2>

                {/* Features */}
                <ul className="mt-4 space-y-3 text-center text-lg">
                    <li>💬 Chat with other people</li>
                    <li>🔗 Infinite Connection Requests</li>
                    <li>✅ Blue Tick</li>
                    <li>⏳ 6 Months</li>
                </ul>

                {/* Subscribe Button */}
                <button
                    onClick={() => handleBuyClick("gold")}
                    className="mt-6 w-full py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
                    Get Gold ✨
                </button>
            </div>
        </div>
    )
};

export default Premium;
