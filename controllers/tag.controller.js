import tagModel from "../model/tag.js";

export const getAllTag = async(req, res) => {
	const tag = await tagModel.find({});
	res.send(tag);
}

export const postTag = async(req, res) => {
	const name = req.body.name;
	const tag = new tagModel({name: name});
	tag.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json("Create category successfully!");
		}
	})
}

export const getTagbyId = async(req, res) => {
	const _id = req.params.id;
	const tag = await tagModel.findById(_id);
	res.send(tag);
}

export const editTag = async(req, res) => {
	const _id = req.params.id;
	const name = req.body.name;
	const tag = await tagModel.findById(_id);
	tag.name = name;
	tag.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json("Update category successfully!");
		}
	})
}

export const deleteTag = async(req, res) => {
	const _id = req.params.id;
	const tag = await tagModel.findByIdAndDelete(_id);
	res.json("Delete category successfully!");
}