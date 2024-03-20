import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COLLECTION, GET_COLLECTION } from "../utils/queries";

const DeleteCollection = ({ onClose, updateCollectionList, collectionId }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteCollection] = useMutation(DELETE_COLLECTION, {
        onCompleted: () => {
            onClose();
            window.location.reload(); // Refresh the page
        },
        refetchQueries: [{ query: GET_COLLECTION }],
    });

    // const { refetch } = useQuery(GET_COLLECTION);

    const handleDeleteCollection = async () => {
        try {
            await deleteCollection({
                variables: {
                    collectionId,
                },
            });
        } catch(error) {
            console.error('Error deleting collection:', error);
        }
    };

    const confirmDelete = () => {
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
        window.location.reload();
    };

    const handleConfirmedDelete = async () => {
        await handleDeleteCollection();
        updateCollectionList();
    };


    return (
        <div>
            <h2>Delete Collection</h2>
            <p>Are you sure you want to delete this collection?</p>
            {!showConfirmation && (
                <button onClick={confirmDelete}>Yes</button>
            )}
            {showConfirmation && (
                <div>
                    <button onClick={handleConfirmedDelete}>Confirm Delete</button>
                    <button onClick={cancelDelete}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default DeleteCollection;