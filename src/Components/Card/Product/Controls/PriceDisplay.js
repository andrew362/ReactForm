import React from 'react'

export default function PriceDisplay({price, styles}) {
    return (
        <div className={styles.cardPrice}>
            {price.toFixed(2)}
            <span className={styles.currencySymbol}>&#8364;</span>
        </div>
    )
}

