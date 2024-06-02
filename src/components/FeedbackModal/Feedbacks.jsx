import React, { useState } from 'react';
import Modal from './FeedbackModel';

const Feedbacks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Feedbacks</button>
            {isModalOpen && <Modal onClose={closeModal} />}
        </div>
    );
};

export default Feedbacks;