import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM, GET_COLLECTION } from '../utils/queries';
import { useNavigate } from 'react-router-dom';


const DeleteItem = ({ itemId, collectionId, onClose }) => {
    const navigate = useNavigate();
    const [deleteItem] = useMutation(DELETE_ITEM, {
        onCompleted: () => {
            onClose();
            navigate(`/collection/${collectionId}`);

        },
        refetchQueries: [{ query: GET_COLLECTION, variables: { collectionId } }],
    });

    const handleDeleteItem = async () => {
        try {
            await deleteItem({
                variables: {
                    itemId: itemId,
                },
            });
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h2>Delete Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={handleDeleteItem}>Delete</button>
        </div>
    );
};

export default DeleteItem;