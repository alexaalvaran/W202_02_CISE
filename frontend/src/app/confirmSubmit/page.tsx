import React from "react";

const ConfirmSubmit = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-blue-500">
            <div>
                <h2>Thank you for submitting an article!</h2>
                <p>We will send you an email once your article is moderated</p>
            </div>
        </main>
    )
}

export default ConfirmSubmit;