import React from 'react';

function Transaction(props){
    // console.log(props.item)
    return(
        <main>
            <section className= "item-profile">
                <img className = 'item-img' src={props.item.image_url} alt={props.item.product_name}/>
                <h3>{props.item.product_name}</h3>
                <h3>{props.item.description}</h3>
                <h3>{props.item.price}</h3>
                
                <button>Add to Cart</button>
            </section>
        </main>
    )
}
export default Transaction;