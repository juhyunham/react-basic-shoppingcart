import React, { useState } from "react";
import Nav from "./components/Nav";
import ItemListContainer from "./pages/ItemListContainer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import { initialState } from "./assets/state";

function App() {
    const [items, setItems] = useState(initialState.items);
    const [cartItems, setCartItems] = useState(initialState.cartItems);

    const handleItem = (newItem) => {
        // id가 중복되어 있다면,,
        // let newQuan = 1;
        // for (let i = 0; i < cartItems.length; i++) {
        //     console.log(cartItems[i].itemId === newItem);
        //     if (cartItems[i].itemId === newItem) {
        //         newQuan = cartItems[i].quantity + 1;
        //     }
        // }
        // setCartItems([...cartItems, { itemId: newItem, quantity: newQuan }]);

        let newQuan = 1;
        let newCartItems;

        const plusCartItems = cartItems.map((item) => {
            if (item.itemId === newItem) {
                newQuan = item.quantity + 1;
                return { itemId: newItem, quantity: newQuan };
            } else {
                return item;
            }
        });

        if (newQuan === 1) {
            newCartItems = { itemId: newItem, quantity: newQuan };
            setCartItems([...cartItems, newCartItems]); //추가
        } else {
            setCartItems(plusCartItems); // 수량증가
        }
    };

    const handleDeleteItem = (deleteItem) => {
        setCartItems(cartItems.filter((item) => item.itemId !== deleteItem));
    };

    return (
        <Router>
            <Nav cartItems={cartItems} />
            <Switch>
                <Route exact={true} path="/">
                    <ItemListContainer items={items} handleItem={handleItem} />
                </Route>
                <Route path="/shoppingcart">
                    <ShoppingCart
                        cartItems={cartItems}
                        items={items}
                        handleDeleteItem={handleDeleteItem}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
