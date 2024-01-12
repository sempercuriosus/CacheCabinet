import React from 'react';
import Logout from '../../components/Logout';
import Collection from '../../components/collection';
import CreateItem from '../../components/CreateItem';
import Collections from '../../components/collections';
import Item from '../../components/item';

export default function CabinetPage() {
    return (
        <>
        <Collections />
        <Collection />
        <Item />
        <CreateItem />
        <Logout />
        </>
    );
}

