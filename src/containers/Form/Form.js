import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Select from '../../Components/Inputs/Select';
import Input from '../../Components/Inputs/Input';
import styles from './Form.module.scss';

class Shipping extends Component {
  SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    address: Yup.string().max(100, 'Too Long!').required('Required'),
    phone: Yup.string().min(9, 'Invalid number!').max(9, 'Invalid number!'),
    email: Yup.string().email('Invalid email').required('Required'),
    shippingOption: Yup.string().required('Required'),
  });

  handleSubmit = (values, { setSubmitting }) => {
    console.log(
      'Contact data: ',
      values,
      'Checkout: ',
      this.props.products,
      'Total price: ',
      this.summarizeAllPrices(this.props.products)
    );
    setTimeout(() => {
      setSubmitting(false);
      alert('Form Submitted');
    }, 1000);
    return;
  };

  summarizeAllPrices = (products) => {
    let total = 0;
    products.forEach((item) => {
      total += Number(item.price) * Number(item.quantity);
    });
    return Number(total.toFixed(2));
  };
  render() {
    return (
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
          }}
          validationSchema={this.SignupSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched, isSubmitting, isValid }) => (
            <Form>
              <Input label="Name*" name="name" errors={errors} touched={touched} styles={styles} />

              <Input label="Address*" name="address" errors={errors} touched={touched} styles={styles} />

              <Input label="Phone" name="phone" errors={errors} touched={touched} placeholder="+48" styles={styles} />

              <Input label="Email*" name="email" errors={errors} touched={touched} styles={styles} />

              <Select
                errors={errors}
                touched={touched}
                products={this.props.products}
                summarizeAllPrices={this.summarizeAllPrices}
                shippingOptions={this.props.shippingOptions}
                styles={styles}
              />

              <Field
                className={[styles.btn, styles.active].join(' ')}
                name="submit"
                disabled={!isValid || isSubmitting}
                value="PAY"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  shippingOptions: state.checkout.shippingOptions,
});

export default connect(mapStateToProps)(Shipping);
