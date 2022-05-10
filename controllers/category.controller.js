import categoryModel from "../model/category.js";

export const getAllCategory = async(req, res) => {
	const category = await categoryModel.find({});
	res.send(category);
}

export const postCategory = async(req, res) => {
	const name = req.body.name;
	const urlPath = req.body.urlPath;

	const category = new categoryModel({name: name, urlPath: urlPath});
	category.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json("Create category successfully!");
		}
	})
}

export const getCategorybyId = async(req, res) => {
	const _id = req.params.id;
	const category = await categoryModel.findById(_id);
	res.send(category);
}

export const editCategory = async(req, res) => {
	const _id = req.params.id;
	const name = req.body.name;
	const urlPath = req.body.urlPath;
	const category = await categoryModel.findById(_id);
	category.name = name;
	category.urlPath = urlPath;
	category.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json("Update category successfully!");
		}
	})
}

export const deleteCategory = async(req, res) => {
	const _id = req.params.id;
	const category = await categoryModel.findByIdAndDelete(_id);
	res.json("Delete category successfully!");
}