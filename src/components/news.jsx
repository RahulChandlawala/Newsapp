import PropTypes from "prop-types";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";

// import PropTypes from "prop-types";

export default class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 8,
		catagory: "general",
	};

	upperCaseFirst = (str) => {
		return str.charAt(0).toUpperCase() + str.substring(1);
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		catagory: PropTypes.string,
	};
	constructor(props) {
		super(props);
		// console.log("this is from news componet");
		this.state = {
			articles: [],
			loading: false,
			page: 1,
			totalArticles: 0,
		};
		document.title = `${this.upperCaseFirst(this.props.catagory)} - NewsMonkey`;
		// console.log(this.state);
	}

	async updateNews(pageNo) {
		this.props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=8b093d3750a44505897de33335c006b0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

		let data = await fetch(url);
		this.props.setProgress(30);
		this.setState({ loading: true });
		let parsedData = await data.json();
		this.props.setProgress(50);
		// console.log(parsedData);
		this.setState({
			articles: parsedData.articles,
			totalArticles: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	}

	async componentDidMount() {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=8b093d3750a44505897de33335c006b0&page=1&pageSize=${this.props.pageSize}`;

		// let data = await fetch(url);
		// this.setState({ loading: true });
		// let parsedData = await data.json();
		// // console.log(parsedData);
		// this.setState({
		// 	articles: parsedData.articles,
		// 	totalArticles: parsedData.totalResults,
		// 	loading: false,
		// });
		this.updateNews();
	}
	handleNextClick = async () => {
		// console.log(this.state);
		// let url = `https://newsapi.org/v2/top-headlines?country=${
		// 	this.props.country
		// }&category=${
		// 	this.props.catagory
		// }&apiKey=8b093d3750a44505897de33335c006b0&page=${
		// 	this.state.page + 1
		// }&pageSize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// // console.log(parsedData);

		// this.setState({
		// 	articles: parsedData.articles,
		// 	page: this.state.page + 1,
		// 	loading: false,
		// });
		this.setState({ page: this.state.page + 1 });
		this.updateNews();
	};
	handlePreviousClick = async () => {
		// let url = `https://newsapi.org/v2/top-headlines?country=${
		// 	this.props.country
		// }&category=${
		// 	this.props.catagory
		// }&apiKey=8b093d3750a44505897de33335c006b0&page=${
		// 	this.state.page - 1
		// }&pageSize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// // console.log(parsedData);
		// this.setState({
		// 	articles: parsedData.articles,
		// 	page: this.state.page - 1,
		// 	loading: false,
		// });
	};
	fetchMoreData = async () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		this.setState({ page: this.state.page + 1 });
		// this.setState({ page: this.state.page - 1 });
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=8b093d3750a44505897de33335c006b0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

		let data = await fetch(url);
		// this.setState({ loading: true });
		let parsedData = await data.json();
		// console.log(parsedData);
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalArticles: parsedData.totalResults,
		});
	};
	render() {
		return (
			<div className="container my-3">
				<h1 className="my-5 text-center">
					NewsMonkey - Top {this.upperCaseFirst(this.props.catagory)} Headlines
				</h1>
				{this.state.loading && <Spinner />}
				<InfiniteScroll
					style={{ overflow: "inherit" }}
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalArticles}
					loader={<Spinner />}
				>
					<div className="row gy-3">
						{this.state.articles.map((e) => {
							return (
								<div className="col-md-3" key={e.url}>
									<NewsItem
										title={e.title ? e.title.slice(0, 45) : ""}
										description={
											e.description ? e.description.slice(0, 88) : ""
										}
										imageUrl={e.urlToImage}
										newsUrl={e.url}
										author={e.author}
										date={e.publishedAt}
										source={e.source.name}
									/>
								</div>
							);
						})}
					</div>
				</InfiniteScroll>
				{/* <div className="container my-5 d-flex justify-content-between">
					<button
						type="button"
						onClick={this.handlePreviousClick}
						className="btn btn-dark"
						disabled={this.state.page <= 1}
					>
						&larr; Previous
					</button>
					<button
						type="button"
						onClick={this.handleNextClick}
						className="btn btn-dark"
						disabled={
							this.state.page + 1 >
							Math.ceil(this.state.totalArticles / this.props.pageSize)
						}
					>
						Next &rarr;
					</button>
				</div> */}
			</div>
		);
	}
}
