import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM, GET_ITEM } from '../utils/queries';
import { useNavigate } from 'react-router-dom';


const DeleteItem = ({ itemId, collectionId, onClose, updateItems }) => {
    const navigate = useNavigate();
    const [deleteItem] = useMutation(DELETE_ITEM, {
        refetchQueries: [{ query: GET_ITEM }],
        onCompleted: () => {
            onClose();
            navigate(`/collection/${collectionId}`);

            updateItems();
        },
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