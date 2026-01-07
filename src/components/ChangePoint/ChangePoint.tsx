import React, { useEffect, useState } from "react";
import { MapPin, Locate } from 'lucide-react';
import './ChangePoint.css';
export default function ChangePoint() {
    const [changePoints, setChangePoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState(true);


    return (
			<section className="changepoint">
				<div className="changepoint__container">
					<h2 className="changepoint__title">Changer d'itinéraire</h2>
					<form className="changepoint__form" action="">
						<div className="changepoint__start">
							<label htmlFor="start">
								<Locate color="#ff3838" />
							</label>
							<input
								type="text"
								id="start"
								name="start"
								placeholder="Point de départ"
							/>
						</div>
						<div className="changepoint__end">
							<label htmlFor="end">
								<MapPin color="#ff3838" />
							</label>
							<input
								type="text"
								id="end"
								name="end"
								placeholder="Point d'arrivée"
							/>
						</div>

						<button className="changepoint__btn" type="submit">
							Valider
						</button>
					</form>
				</div>
			</section>
		);

};