import React, { Component } from "react";

export default class NewsItem extends Component {
	render() {
		let { title, description, imageUrl, newsUrl, author, date, source } =
			this.props;
		return (
			<div>
				<div className="card shadow-sm">
					<span
						className="position-absolute top-0  translate-middle badge rounded-pill bg-info text-dark"
						style={{ zIndex: "1", left: "90%" }}
					>
						{source}
					</span>
					<img
						src={
							!imageUrl
								? "https://images.moneycontrol.com/static-mcnews/2021/09/Sensex_Nifty-2-770x433.jpg"
								: imageUrl
						}
						className="card-img-top"
						style={{ width: "auto", height: "15rem" }}
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">{title}...</h5>
						<p className="card-text">{description}...</p>
						<a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
							Read More
						</a>
						<p className="card-text  my-2">
							<small className="text-muted">
								By {!author ? "Unknown" : author} on{" "}
								{new Date(date).toGMTString()}
							</small>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
