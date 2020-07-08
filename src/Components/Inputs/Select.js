import React from 'react';
import { Field } from 'formik';

export default function Select({errors, touched, products, summarizeAllPrices, shippingOptions, styles}) {
    return (
        <div className={styles.row}>
            <label htmlFor="shippingOption">Shipping options</label>
            <div className={styles.inputField}>
                <Field label="shippingOption" name="shippingOption" component="select" placeholder="Favorite Color">
                    <option></option>
                    <option disabled={products.length > 3 ? true : false} value="ninjPost">ninjPost - FREE SHIPPING</option>
                    {shippingOptions.map((opt) => {
                        return (
                            <option key={opt.name} value={opt.name}> {opt.name} - {summarizeAllPrices(products) > 200 ? 'FREE SHIPPING' : `additional ${opt.price}`}</option>
                        );
                    })
                    }
                </Field>
                {errors.shippingOption && touched.shippingOption ? (
                    <div className={styles.error}>{errors.shippingOption}</div>
                ) : null}
            </div>
        </div>
    )
}
