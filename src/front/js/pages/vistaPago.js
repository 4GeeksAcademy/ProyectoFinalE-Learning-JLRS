//VistaPago: Se carga la vista de pago con el formulario de Stripe. Al cargar, se solicita al backend que cree un PaymentIntent.

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js'; //permite integrar el formulario de pago de manera sencilla.
import { CheckoutForm } from "../component/checkout.jsx";


const VistaPago = () => {
	const { store, actions } = useContext(Context);
	//la clave en .env!!! ----------- esta de abajo es la clave publica
	const stripePromise = loadStripe(process.env.STRIPE_PROMISE); //carga la clave pública de Stripe desde las variables de entorno .env
	
	
	return (
		<div className="text-center mt-5">
			<h1> Bienvenid@ </h1>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};
export default VistaPago