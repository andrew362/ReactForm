import React from 'react'
import Bin from './Controls/Bin';
import Quantity from './Controls/Quantity';
import PriceDisplay from './Controls/PriceDisplay';
import styles from './Product.module.scss';

const Product = ({id, title, subtitle, image, price, quantity, removeItemFromCardHandler}) => {
    return (
        <div className={quantity <= 0 ? [styles.card, styles.faded].join(' ') : styles.card} >
            <div className={styles.cardPicture}>
                <a href="#">
                    <img alt="thumbnail" src={image} />
                </a>
            </div>
            <div className={styles.cardContent}>
                <a href="#">
                    <h3>
                        {title}
                    </h3>
                </a>
                <p> 
                    {subtitle} 
                </p>
            </div>
            <div className={styles.cardControls}>
                <div  className={styles.cardControlsTop}>
                    <div onClick={() => removeItemFromCardHandler(id)}>
                        <Bin  />  
                    </div>
                </div>       
                <div className={styles.cardControlsBottom}>
                    <Quantity styles={styles} id={id} quantity={quantity}/>
                    <PriceDisplay styles={styles} price={price}/>
                </div>
            </div>
        </div>
    )
}

export default Product;
