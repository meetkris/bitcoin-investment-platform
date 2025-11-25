"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ComposePage() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            to: formData.get("to"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/webmail/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send email");

            setStatus("success");
            setTimeout(() => {
                router.push("/webmail");
            }, 1500);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
                <h1 className="text-xl font-bold">Compose Email</h1>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                    Cancel
                </button>
            </header>
            <div className="flex-grow p-6 overflow-auto">
                <form onSubmit={handleSend} className="max-w-3xl mx-auto space-y-6">
                    <div>
                        <label htmlFor="to" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">To</label>
                        <input
                            type="email"
                            name="to"
                            id="to"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="recipient@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Subject"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={12}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {status === "loading" ? "Sending via Gmail..." : status === "success" ? "Sent!" : "Send Email"}
                        </button>
                        {status === "error" && (
                            <p className="text-red-500 text-sm">Failed to send email. Please try again.</p>
                        )}
                        {status === "success" && (
                            <p className="text-green-500 text-sm">Email sent successfully!</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
