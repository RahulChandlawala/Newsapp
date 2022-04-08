import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
	state = {
		progress: 0,
	};

	setProgress = (progress) => {
		this.setState({ progress: progress });
	};
	render() {
		return (
			// <>
			// 	<Navbar />
			// 	<News pageSize={5} country="in" catagory="general" />
			// </>
			<div>
				<Navbar />
				<LoadingBar
					color="#f11946"
					progress={this.state.progress}
					height={3}
					// onLoaderFinished={() => setProgress(0)}
				/>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<News
								setProgress={this.setProgress}
								key="general"
								pageSize={8}
								country="in"
								catagory="general"
							/>
						}
					></Route>
					<Route
						exact
						path="/business"
						element={
							<News
								setProgress={this.setProgress}
								key="business"
								pageSize={8}
								country="in"
								catagory="business"
							/>
						}
					></Route>
					<Route
						exact
						path="/entertainment"
						element={
							<News
								setProgress={this.setProgress}
								key="entertainment"
								pageSize={8}
								country="in"
								catagory="entertainment"
							/>
						}
					></Route>
					<Route
						exact
						path="/general"
						element={
							<News
								setProgress={this.setProgress}
								key="general"
								pageSize={8}
								country="in"
								catagory="general"
							/>
						}
					></Route>
					<Route
						exact
						path="/health"
						element={
							<News
								setProgress={this.setProgress}
								key="health"
								pageSize={8}
								country="in"
								catagory="health"
							/>
						}
					></Route>
					<Route
						exact
						path="/science"
						element={
							<News
								setProgress={this.setProgress}
								key="science"
								pageSize={8}
								country="in"
								catagory="science"
							/>
						}
					></Route>
					<Route
						exact
						path="/sports"
						element={
							<News
								setProgress={this.setProgress}
								key="sports"
								pageSize={8}
								country="in"
								catagory="sports"
							/>
						}
					></Route>
					<Route
						exact
						path="/technology"
						element={
							<News
								setProgress={this.setProgress}
								key="technolog"
								pageSize={8}
								country="in"
								catagory="technology"
							/>
						}
					></Route>
					<Route
						exact
						path="/technology"
						element={
							<News
								setProgress={this.setProgress}
								key="technolog"
								pageSize={8}
								country="in"
								catagory="technology"
							/>
						}
					></Route>
				</Routes>
			</div>
		);
	}
}
