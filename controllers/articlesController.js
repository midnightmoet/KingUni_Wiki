const models = require("../models");

module.exports = {
	// --GET --//
	get: {
		// -- CREATE -- //
		create: (req, res) => {
			res.render("create");
		},

		//-- ALL ARTICLES -- //
		all: (req, res, next) => {
			models.Article.find()
				.select("title")
				.then((articles) => {
					res.render("all-articles", { articles }); 
				})
				.catch(next);
		},

		//--ARTICLE DETAILS -- //
		details: (req, res, next) => {
			const id = req.params.id;

			models.Article.findById(id)
				.then((article) => {
					article.paragraphs = article.description.split("\r\n\r\n");
					const isAuthor =
						req.user !== undefined
							? req.user._id.toString() ===
							  article.author.toString()
							: false;
					res.render("article-details", { article, isAuthor });
				})
				.catch(next);
		},

		//-- EDIT ARTICLES -- //
		edit: (req, res) => {
			const id = req.params.id;

			models.Article.findById(id)
				.select("title description")
				.then((article) => {
					res.render("edit", { article });
				});
		},
	},

	//--POST-- //
	post: {
		create: (req, res, next) => {
			const { title, description } = req.body;
			const userId = req.user._id;

			models.Article.create({ title,  description, author: userId })
				.then((article) => {
					req.user.articles.push(article._id);

					return models.User.findByIdAndUpdate(userId, req.user);
				})
				.then((user) => {
					res.redirect("/");
				})
				.catch((err) => {
					let errors = [];

					if (err.name === "ValidationError") {
						errors = Object.entries(err.errors).map(
							(e) => e[1].message
						);
					} else if (err.name === "MongoError") {
						errors = ["Article title is already used!"];
					}

					res.render("create", { errors });
				});
		},

		// -- EDIT POSTED ARTICLE -- //
		edit: (req, res, next) => {
			const id = req.params.id;
			const { description: newDescription } = req.body;

			models.Article.updateOne(
				{ _id: id },
				{ description: newDescription },
				{ runValidators: true }
			)
				.then((article) => {
					res.redirect("/article/details/" + id);
				})
				.catch((err) => {
					let errors = [];

					if (err.name === "ValidationError") {
						errors = Object.entries(err.errors).map(
							(e) => e[1].message
						);
					} else if (err.name === "MongoError") {
						errors = ["Article title is already used!"];
					}

					res.render("edit", { errors });
				});
		},
	},

	//-- DELETE YOUR ARTICLE -- //
	delete: (req, res, next) => {
		const id = req.params.id;

		models.Article.deleteOne({ _id: id })
			.then(() => {
				res.redirect("/");
			})
			.catch(next);
	},
};
