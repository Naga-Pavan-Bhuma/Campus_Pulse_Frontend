import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const PostAnnouncementModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/annoucements`, {
                title,
                content, // or get dynamically from logged-in user
            }, { withCredentials: true });
            onClose();
        } catch (error) {
            console.error("Error posting announcement:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">Post Announcement</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows="4"
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PostAnnouncementModal;
