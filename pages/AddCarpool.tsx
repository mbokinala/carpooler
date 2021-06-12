import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import React from 'react';

function AddCarpool() {

	return (
		<>
			<Head>
				<title>Add Carpool</title>
				<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLr5qel5Lbjw7IfPaIX2ORcn4Qn_7_3mA&libraries=places" />
				{/* <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places‌​&sensor=false"/> */}
				<script src="/google-maps-api.js"/>
			</Head>

			<input style={{width: "100%"}} id="ship-address"></input><br></br>
			<input id="address2"></input>
			<input id="postcode"></input>
			<input id="locality"></input>
			<input id="state"></input>
			<input id="country"></input>
		</>
	)
}

export default withPageAuthRequired(AddCarpool);