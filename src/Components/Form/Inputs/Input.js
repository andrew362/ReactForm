import React from 'react';
import { Field } from 'formik';

export default function Select({errors, touched, label, name, placeholder, styles}) {
    return (
        <div className={styles.row}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.inputField}>
                <Field placeholder={placeholder} label={name} name={name} type={name} />
                {errors[name] && touched[name] ? (
                    <div className={styles.error}>{errors[name]}</div>
                ) : null}
            </div>
        </div>
    )
}
